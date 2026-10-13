import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { bodyLimit } from 'hono/body-limit'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { importJWK, type JWTPayload, SignJWT } from 'jose'
import { hashMessage } from 'viem'
import { z } from 'zod'
import { authorizationMessage } from '../lib/onramp-authorization'

const host = 'api.cdp.coinbase.com'
const onrampApp = new Hono<{ Bindings: Cloudflare.Env }>()

onrampApp.use('*', async (c, next) => {
  c.header('Cache-Control', 'no-store')
  if (c.env.ONRAMP_ENABLED !== 'true' || c.env.ONRAMP_SANDBOX !== 'true')
    throw new HTTPException(503, { message: 'Sandbox onramp is not enabled.' })
  const origin = c.req.header('Origin')
  const allowed = (c.env.ONRAMP_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((s) => s.trim())
  if (!origin || !allowed.includes(origin))
    throw new HTTPException(403, { message: 'Origin is not allowed.' })
  return cors({
    allowHeaders: ['Content-Type'],
    allowMethods: ['POST', 'OPTIONS'],
    origin,
  })(c, next)
})
onrampApp.options('/orders', (c) => c.body(null, 204))
onrampApp.post(
  '/orders',
  bodyLimit({ maxSize: 16_384 }),
  zValidator(
    'json',
    z
      .object({
        address: z
          .string()
          .regex(/^0x[a-fA-F0-9]{40}$/)
          .transform((s) => s.toLowerCase()),
        amount: z
          .string()
          .regex(/^(?:0|[1-9]\d{0,3})(?:\.\d{1,2})?$/)
          .refine((s) => Number(s) >= 1 && Number(s) < 10_000),
        chainId: z.number().int().positive(),
        issuedAt: z.number().int().positive(),
        signature: z
          .string()
          .regex(/^0x(?:[a-fA-F0-9]{2})+$/)
          .max(12_000),
      })
      .strict(),
  ),
  async (c) => {
    const input = c.req.valid('json')
    const env = c.env
    const origin = c.req.header('Origin')!
    const now = Math.floor(Date.now() / 1000)
    if (
      input.chainId !== 84532 ||
      input.chainId !== Number(env.ONRAMP_CHAIN_ID)
    )
      throw new HTTPException(400, { message: 'Unsupported chain.' })
    if (input.issuedAt > now || now - input.issuedAt > 120)
      throw new HTTPException(401, {
        message: 'Authorization expired. Please try again.',
      })
    const relayConfig = z.url().safeParse(env.ONRAMP_RELAY_URL)
    const relayUrl = relayConfig.success ? new URL(relayConfig.data) : undefined
    if (
      !relayUrl ||
      relayUrl.protocol !== 'https:' ||
      relayUrl.username ||
      relayUrl.password ||
      !env.CB_API_KEY_ID ||
      !env.CB_API_KEY_SECRET ||
      !env.ONRAMP_SECRET ||
      env.ONRAMP_DESTINATION_NETWORK !== 'base' ||
      !env.RATE_LIMITER
    )
      throw new HTTPException(503, {
        message: 'Sandbox onramp configuration is incomplete.',
      })
    for (const key of [
      `onramp:ip:${c.req.header('CF-Connecting-IP') ?? 'unknown'}`,
      `onramp:account:${input.address}`,
    ]) {
      const { success } = await env.RATE_LIMITER.limit({ key })
      if (!success)
        throw new HTTPException(429, {
          message: 'Too many requests. Try again later.',
        })
    }
    try {
      async function rpc(method: string, params: object) {
        const response = await fetch(relayUrl!.href, {
          body: JSON.stringify({
            id: 1,
            jsonrpc: '2.0',
            method,
            params: [params],
          }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          signal: AbortSignal.timeout(10_000),
        })
        if (!response.ok) throw new Error('Relay unavailable')
        const data = z
          .object({ error: z.unknown().optional(), result: z.unknown() })
          .parse(await response.json())
        if (data.error) throw new Error('Relay request failed')
        return data.result
      }
      const ownership = z.object({ valid: z.boolean() }).parse(
        await rpc('wallet_verifySignature', {
          address: input.address,
          chainId: `0x${input.chainId.toString(16)}`,
          digest: hashMessage(authorizationMessage({ ...input, origin })),
          signature: input.signature,
        }),
      )
      if (!ownership.valid)
        throw new HTTPException(401, {
          message: 'Account authorization failed.',
        })
      const contact = z
        .object({
          email: z.email().nullish(),
          emailVerifiedAt: z.number().int().positive().nullish(),
          phone: z.string().nullish(),
          phoneVerifiedAt: z.number().nullish(),
        })
        .parse(
          await rpc('account_getOnrampContactInfo', {
            address: input.address,
            secret: env.ONRAMP_SECRET,
          }),
        )
      if (
        !contact.email ||
        !contact.emailVerifiedAt ||
        contact.emailVerifiedAt > now ||
        !contact.phone ||
        !/^\+[1-9]\d{7,14}$/.test(contact.phone.replaceAll(' ', '')) ||
        !contact.phoneVerifiedAt ||
        contact.phoneVerifiedAt > now ||
        now - contact.phoneVerifiedAt >= 60 * 86400
      )
        throw new HTTPException(409, {
          message: 'Verify your email and phone before continuing.',
        })
      const path = '/platform/v2/onramp/orders'
      const jwt = await generateCoinbaseJwt({
        keyId: env.CB_API_KEY_ID,
        keySecret: env.CB_API_KEY_SECRET,
        request: { method: 'POST', path },
      })
      const response = await fetch(`https://${host}${path}`, {
        body: JSON.stringify({
          agreementAcceptedAt: new Date(input.issuedAt * 1000).toISOString(),
          clientIp: c.req.header('CF-Connecting-IP'),
          destinationAddress: input.address,
          destinationNetwork: env.ONRAMP_DESTINATION_NETWORK,
          domain: new URL(origin).hostname,
          email: contact.email,
          partnerUserRef: `sandbox-${input.address}`,
          paymentAmount: input.amount,
          paymentCurrency: 'USD',
          paymentMethod: 'GUEST_CHECKOUT_APPLE_PAY',
          phoneNumber: contact.phone.replaceAll(' ', ''),
          phoneNumberVerifiedAt: new Date(
            contact.phoneVerifiedAt * 1000,
          ).toISOString(),
          purchaseCurrency: 'USDC',
        }),
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        signal: AbortSignal.timeout(15_000),
      })
      if (!response.ok) throw new Error('Order provider unavailable')
      const data = z
        .object({
          order: z.object({ orderId: z.string() }),
          paymentLink: z.object({
            paymentLinkType: z.literal('PAYMENT_LINK_TYPE_APPLE_PAY_BUTTON'),
            url: z.url(),
          }),
        })
        .parse(await response.json())
      const url = new URL(data.paymentLink.url)
      if (
        url.origin !== 'https://pay.coinbase.com' ||
        url.username ||
        url.password
      )
        throw new Error('Unexpected payment link')
      url.searchParams.set('useApplePaySandbox', 'true')
      return c.json({
        orderId: data.order.orderId,
        sandbox: true as const,
        type: 'apple' as const,
        url: url.href,
      })
    } catch (error) {
      if (error instanceof HTTPException) throw error
      // Never return upstream messages, contact information, or signed URLs in errors/logs.
      throw new HTTPException(502, {
        message: 'Unable to create the sandbox order. Please try again.',
      })
    }
  },
)

export { onrampApp }

async function generateCoinbaseJwt(opts: {
  claims?: JWTPayload | undefined
  expiresIn?: number | undefined
  keyId: string
  keySecret: string
  nonce?: string | undefined
  now?: number | undefined
  request: {
    method: 'GET' | 'POST'
    host?: string | undefined
    path: string
  }
}) {
  const {
    claims = {
      aud: ['cdp_service'],
      iss: 'cdp',
      sub: opts.keyId,
      uris: [
        `${opts.request.method} ${opts.request.host ?? host}${opts.request.path}`,
      ],
    },
    expiresIn = 120,
    nonce = crypto.randomUUID(),
    now = Math.floor(Date.now() / 1000),
  } = opts
  const decoded = Buffer.from(opts.keySecret, 'base64')
  if (decoded.length !== 64) throw new Error('Invalid Ed25519 key length')

  const alg = 'EdDSA'
  const seed = decoded.subarray(0, 32)
  const publicKey = decoded.subarray(32)
  const key = await importJWK(
    {
      crv: 'Ed25519',
      d: seed.toString('base64url'),
      kty: 'OKP',
      x: publicKey.toString('base64url'),
    },
    alg,
  )

  return await new SignJWT(claims)
    .setProtectedHeader({
      alg,
      kid: opts.keyId,
      nonce,
      typ: 'JWT',
    })
    .setIssuedAt(now)
    .setNotBefore(now)
    .setExpirationTime(now + expiresIn)
    .sign(key)
}
