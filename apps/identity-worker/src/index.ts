export type StaticAssets = {
  fetch(request: Request): Promise<Response>
}

type Env = {
  ASSETS: StaticAssets
}

const securityHeaders = {
  'content-security-policy': [
    "frame-ancestors 'self'",
    'https://localprotocol.xyz',
    'https://www.localprotocol.xyz',
    'https://playground.localprotocol.xyz',
    'https://playground-staging.localprotocol.xyz',
    'https://localprotocol-playground-staging.mperhats.workers.dev',
    'https://localhost:*',
    'https://*.localhost:*',
  ].join(' ') + ';',
  'cross-origin-opener-policy': 'same-origin-allow-popups',
  'cross-origin-resource-policy': 'cross-origin',
  'permissions-policy': [
    'publickey-credentials-create=(self)',
    'publickey-credentials-get=(self)',
  ].join(', '),
  'referrer-policy': 'strict-origin-when-cross-origin',
  'strict-transport-security': 'max-age=31536000',
  'x-content-type-options': 'nosniff',
} as const

function withSecurityHeaders(response: Response) {
  const secured = new Response(response.body, response)
  for (const [name, value] of Object.entries(securityHeaders))
    secured.headers.set(name, value)
  return secured
}

function isNavigation(request: Request) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false
  return request.headers.get('accept')?.includes('text/html') ?? false
}

function getShellPath(pathname: string) {
  if (pathname === '/dialog' || pathname.startsWith('/dialog/'))
    return '/dialog/index.html'
  return '/index.html'
}

export async function handleRequest(
  request: Request,
  assets: StaticAssets,
): Promise<Response> {
  const response = await assets.fetch(request)
  if (response.status !== 404 || !isNavigation(request))
    return withSecurityHeaders(response)

  const url = new URL(request.url)
  url.pathname = getShellPath(url.pathname)
  url.search = ''

  const shell = await assets.fetch(new Request(url, request))
  return withSecurityHeaders(shell)
}

export default {
  fetch(request: Request, env: Env) {
    return handleRequest(request, env.ASSETS)
  },
}
