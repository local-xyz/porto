import { describe, expect, test, vi } from 'vitest'

import { handleRequest, type StaticAssets } from './index.js'

function createAssets() {
  const fetch = vi.fn(async (request: Request) => {
    const path = new URL(request.url).pathname
    if (path === '/index.html') return new Response('identity')
    if (path === '/dialog/index.html') return new Response('dialog')
    if (path === '/asset.js') return new Response('asset')
    return new Response('missing', { status: 404 })
  })

  return {
    assets: { fetch } satisfies StaticAssets,
    fetch,
  }
}

describe('identity Worker', () => {
  test('serves an existing asset', async () => {
    const { assets, fetch } = createAssets()
    const response = await handleRequest(
      new Request('https://identity.example/asset.js'),
      assets,
    )

    expect(await response.text()).toBe('asset')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  test('uses the identity shell for an identity route', async () => {
    const { assets, fetch } = createAssets()
    const response = await handleRequest(
      new Request('https://identity.example/settings', {
        headers: { accept: 'text/html' },
      }),
      assets,
    )

    expect(await response.text()).toBe('identity')
    expect(
      fetch.mock.calls.map(([request]) => new URL(request.url).pathname),
    ).toEqual(['/settings', '/index.html'])
  })

  test('uses the dialog shell for a dialog route', async () => {
    const { assets, fetch } = createAssets()
    const response = await handleRequest(
      new Request(
        'https://identity.example/dialog/wallet_connect?relayEnv=anvil',
        { headers: { accept: 'text/html' } },
      ),
      assets,
    )

    expect(await response.text()).toBe('dialog')
    expect(
      fetch.mock.calls.map(([request]) => new URL(request.url).pathname),
    ).toEqual(['/dialog/wallet_connect', '/dialog/index.html'])
  })

  test('does not return an HTML shell for a missing asset', async () => {
    const { assets, fetch } = createAssets()
    const response = await handleRequest(
      new Request('https://identity.example/dialog/assets/missing.js'),
      assets,
    )

    expect(response.status).toBe(404)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  test('adds security headers to each response', async () => {
    const { assets } = createAssets()
    const response = await handleRequest(
      new Request('https://identity.example/asset.js'),
      assets,
    )

    expect(response.headers.get('x-content-type-options')).toBe('nosniff')
    expect(response.headers.get('permissions-policy')).toContain(
      'publickey-credentials-create=(self)',
    )
    expect(response.headers.get('content-security-policy')).toContain(
      "frame-ancestors 'self'",
    )
  })
})
