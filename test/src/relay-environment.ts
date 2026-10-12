// Grid owns these settings. Only the local server passes them to Docker.
const names = [
  'RESEND_API_KEY',
  'ONRAMP_WORKER_SECRET',
  'PORTO_BASE_URL',
  'EMAIL_SENDER',
] as const

export function relayEnvironment(values: Record<string, string | undefined>) {
  const env: Record<string, string> = {}
  const args: string[] = []
  for (const name of names) {
    const value = values[name]
    if (!value) continue
    env[name] = value
    args.push('--env', name)
  }
  return { args, env }
}
