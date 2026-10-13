import { generateKeyPairSync } from 'node:crypto'
import { Account, Key } from 'porto/viem'
import { hashMessage, hashTypedData, recoverAddress } from 'viem'
import { beforeEach, expect, test, vi } from 'vitest'
import { authorizationMessage } from '../src/lib/onramp-authorization'
import app from '../src/onramp'
import { onrampApp } from '../src/routes/onramp'

const keyPair = generateKeyPairSync('ed25519')
const privateJwk = keyPair.privateKey.export({ format: 'jwk' })
const keySecret = Buffer.concat([
  Buffer.from(privateJwk.d!, 'base64url'),
  Buffer.from(privateJwk.x!, 'base64url'),
]).toString('base64')
const origin = 'https://id-staging.localprotocol.xyz'
const address = '0x1111111111111111111111111111111111111111'
const limit = vi.fn(async () => ({ success: true }))
const env = {
  CB_API_KEY_ID: 'test-key',
  CB_API_KEY_SECRET: keySecret,
  ONRAMP_ALLOWED_ORIGINS: origin,
  ONRAMP_CHAIN_ID: '84532',
  ONRAMP_DESTINATION_NETWORK: 'base',
  ONRAMP_ENABLED: 'true',
  ONRAMP_RELAY_URL: 'https://relay-staging.localprotocol.xyz',
  ONRAMP_SANDBOX: 'true',
  ONRAMP_SECRET: 'test-secret',
  RATE_LIMITER: { limit },
}
const fetchMock = vi.fn()
const body = () => ({
  address,
  amount: '10.00',
  chainId: 84532,
  issuedAt: Math.floor(Date.now() / 1000),
  signature: '0x1234',
})
const request = (data = body(), bindings = env, requestOrigin = origin) =>
  onrampApp.request(
    '/orders',
    {
      body: JSON.stringify(data),
      headers: {
        'CF-Connecting-IP': '192.0.2.1',
        'Content-Length': String(Buffer.byteLength(JSON.stringify(data))),
        'Content-Type': 'application/json',
        Origin: requestOrigin,
      },
      method: 'POST',
    },
    bindings as never,
  )
beforeEach(() => {
  vi.stubGlobal('fetch', fetchMock)
  fetchMock.mockReset()
  limit.mockResolvedValue({ success: true })
  fetchMock.mockImplementation(async (url, init) => {
    const data = JSON.parse(init.body)
    if (String(url).includes('relay-staging')) {
      const result =
        data.method === 'wallet_verifySignature'
          ? { valid: true }
          : {
              email: 'verified@example.test',
              emailVerifiedAt: Math.floor(Date.now() / 1000),
              phone: '+12025550123',
              phoneVerifiedAt: Math.floor(Date.now() / 1000),
            }
      return Response.json({ id: 1, jsonrpc: '2.0', result })
    }
    return Response.json({
      order: { orderId: 'order-1' },
      paymentLink: {
        paymentLinkType: 'PAYMENT_LINK_TYPE_APPLE_PAY_BUTTON',
        url: 'https://pay.coinbase.com/v2/api-onramp/apple-pay?sessionToken=test',
      },
    })
  })
})
test('disabled and production modes fail closed without outbound requests', async () => {
  expect(
    (await request(body(), { ...env, ONRAMP_ENABLED: 'false' })).status,
  ).toBe(503)
  expect(
    (await request(body(), { ...env, ONRAMP_SANDBOX: 'false' })).status,
  ).toBe(503)
  expect(fetchMock).not.toHaveBeenCalled()
})
test('exact origins and preflight are enforced', async () => {
  expect((await request(body(), env, `${origin}.evil.test`)).status).toBe(403)
  const response = await onrampApp.request(
    '/orders',
    {
      headers: { 'Access-Control-Request-Method': 'POST', Origin: origin },
      method: 'OPTIONS',
    },
    env as never,
  )
  expect(response.status).toBe(204)
  expect(response.headers.get('Access-Control-Allow-Origin')).toBe(origin)
  expect(fetchMock).not.toHaveBeenCalled()
})
test('rejects expired authorization, wrong chain and client mode overrides', async () => {
  expect((await request({ ...body(), issuedAt: 1 })).status).toBe(401)
  expect((await request({ ...body(), chainId: 1 })).status).toBe(400)
  expect((await request({ ...body(), sandbox: false } as never)).status).toBe(
    400,
  )
  expect(fetchMock).not.toHaveBeenCalled()
})
test('rejects invalid ownership before reading contact information', async () => {
  fetchMock.mockResolvedValueOnce(Response.json({ result: { valid: false } }))
  expect((await request()).status).toBe(401)
  expect(fetchMock).toHaveBeenCalledTimes(1)
})
test('rate limit stops calls before signature verification', async () => {
  limit.mockResolvedValue({ success: false })
  expect((await request()).status).toBe(429)
  expect(fetchMock).not.toHaveBeenCalled()
})
test('verifies ownership then reads contacts only from configured Relay and forces sandbox', async () => {
  const response = await request()
  expect(response.status).toBe(200)
  const calls = fetchMock.mock.calls.map(([url, init]) => [
    String(url),
    JSON.parse(init.body),
  ])
  expect(calls[0][1].method).toBe('wallet_verifySignature')
  expect(calls[1][1].method).toBe('account_getOnrampContactInfo')
  expect(calls[0][0]).toBe(`${env.ONRAMP_RELAY_URL}/`)
  expect(calls[2][1]).toMatchObject({
    destinationNetwork: 'base',
    domain: 'id-staging.localprotocol.xyz',
    partnerUserRef: `sandbox-${address}`,
    paymentAmount: '10.00',
  })
  expect(calls[2][1]).not.toHaveProperty('purchaseAmount')
  expect(await response.json()).toMatchObject({
    orderId: 'order-1',
    sandbox: true,
    url: expect.stringContaining('useApplePaySandbox=true'),
  })
})

test('missing or stale contacts never reach Coinbase', async () => {
  for (const result of [
    {},
    {
      email: 'verified@example.test',
      emailVerifiedAt: Math.floor(Date.now() / 1000),
      phone: '+12025550123',
      phoneVerifiedAt: 1,
    },
  ]) {
    fetchMock.mockClear()
    fetchMock.mockResolvedValueOnce(Response.json({ result: { valid: true } }))
    fetchMock.mockResolvedValueOnce(Response.json({ result }))
    expect((await request()).status).toBe(409)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  }
})
test('provider failures and hostile URLs are sanitized', async () => {
  for (const response of [
    Response.json({ secret: 'private-marker' }, { status: 403 }),
    Response.json({
      order: { orderId: '1' },
      paymentLink: {
        paymentLinkType: 'PAYMENT_LINK_TYPE_APPLE_PAY_BUTTON',
        url: 'https://evil.test/payment',
      },
    }),
  ]) {
    fetchMock.mockResolvedValueOnce(Response.json({ result: { valid: true } }))
    fetchMock.mockResolvedValueOnce(
      Response.json({
        result: {
          email: 'verified@example.test',
          emailVerifiedAt: Math.floor(Date.now() / 1000),
          phone: '+12025550123',
          phoneVerifiedAt: Math.floor(Date.now() / 1000),
        },
      }),
    )
    fetchMock.mockResolvedValueOnce(response)
    const result = await request()
    expect(result.status).toBe(502)
    expect(await result.text()).not.toMatch(
      /private-marker|verified@example|evil.test/,
    )
  }
})
test('rejects oversized requests and malformed service configuration', async () => {
  expect(
    (await request({ ...body(), signature: `0x${'00'.repeat(20_000)}` }))
      .status,
  ).toBe(413)
  expect(
    (await request(body(), { ...env, ONRAMP_RELAY_URL: 'not a URL' })).status,
  ).toBe(503)
  expect(fetchMock).not.toHaveBeenCalled()
})

test('dialog raw admin signature matches the Relay ERC1271 digest and binds order details', async () => {
  const key = Key.createSecp256k1({ role: 'admin' })
  const account = Account.from({ address, keys: [key] })
  const input = { ...body(), origin }
  const digest = hashMessage(authorizationMessage(input))
  const signature = await Account.sign(account, {
    key,
    payload: digest,
    wrap: false,
  })
  const replaySafeDigest = (message: string) =>
    hashTypedData({
      domain: { verifyingContract: address },
      message: { digest: hashMessage(message) },
      primaryType: 'ERC1271Sign',
      types: { ERC1271Sign: [{ name: 'digest', type: 'bytes32' }] },
    })
  const signer = await recoverAddress({
    hash: replaySafeDigest(authorizationMessage(input)),
    signature,
  })
  expect(signature.length).toBe(132)
  for (const changed of [
    { amount: '11.00' },
    { origin: 'https://evil.test' },
    { chainId: 1 },
    { address: '0x2222222222222222222222222222222222222222' },
  ]) {
    expect(
      await recoverAddress({
        hash: replaySafeDigest(authorizationMessage({ ...input, ...changed })),
        signature,
      }),
    ).not.toBe(signer)
  }
  fetchMock.mockImplementationOnce(async (_url, init) => {
    const params = JSON.parse(init.body).params[0]
    expect(params).toMatchObject({ chainId: '0x14a34', digest, signature })
    return Response.json({ result: { valid: true } })
  })
  expect(
    (await request({ ...body(), issuedAt: input.issuedAt, signature })).status,
  ).toBe(200)
})
test('dedicated Worker handles preflight and does not expose unrelated service routes', async () => {
  expect((await app.request('/health', {}, env as never)).status).toBe(200)
  const response = await app.request(
    '/onramp/orders',
    {
      headers: { 'Access-Control-Request-Method': 'POST', Origin: origin },
      method: 'OPTIONS',
    },
    env as never,
  )
  expect(response.headers.get('Access-Control-Allow-Origin')).toBe(origin)
  expect((await app.request('/verify', {}, env as never)).status).toBe(404)
})

test('old Relay unverified email fallback and future email attestations fail closed', async () => {
  for (const emailVerifiedAt of [
    undefined,
    null,
    Math.floor(Date.now() / 1000) + 100,
  ]) {
    fetchMock.mockClear()
    fetchMock.mockResolvedValueOnce(Response.json({ result: { valid: true } }))
    fetchMock.mockResolvedValueOnce(
      Response.json({
        result: {
          email: 'unverified@example.test',
          emailVerifiedAt,
          phone: '+12025550123',
          phoneVerifiedAt: Math.floor(Date.now() / 1000),
        },
      }),
    )
    expect((await request()).status).toBe(409)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  }
})
