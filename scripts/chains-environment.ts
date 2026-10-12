export const chainEnvironmentSelections = ['all', 'prod', 'stg'] as const

export type ChainEnvironment = Exclude<
  (typeof chainEnvironmentSelections)[number],
  'all'
>

export function selectChainEnvironments(
  parameters: selectChainEnvironments.Parameters,
): readonly ChainEnvironment[] {
  const { args, environment } = parameters
  const usage =
    'Use --environment <stg|prod|all> or set PORTO_CHAINS_ENV=stg|prod|all.'

  const cliSelection = (() => {
    if (args.length === 0) return undefined
    if (args.length === 1 && args[0]?.startsWith('--environment='))
      return args[0].slice('--environment='.length)
    if (args.length === 2 && args[0] === '--environment') return args[1]
    throw new Error(`Invalid chain environment arguments. ${usage}`)
  })()

  if (cliSelection && environment)
    throw new Error(
      `Set the chain environment through either the CLI or PORTO_CHAINS_ENV, not both. ${usage}`,
    )

  const selection = cliSelection ?? environment ?? 'all'
  if (!chainEnvironmentSelections.some((value) => value === selection))
    throw new Error(`Invalid chain environment "${selection}". ${usage}`)

  return selection === 'all' ? ['prod', 'stg'] : [selection as ChainEnvironment]
}

export namespace selectChainEnvironments {
  export type Parameters = {
    args: readonly string[]
    environment?: string | undefined
  }
}
