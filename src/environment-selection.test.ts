import { baseSepolia, optimismSepolia } from 'viem/chains'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { selectChainEnvironments } from '../scripts/chains-environment.js'

let getEnvironment: () => string
let getPortoConfig: (environment?: 'stg') => {
  chains: readonly { id: number }[]
  storageKey?: string | undefined
  transports?: Record<number, unknown> | undefined
}

beforeAll(async () => {
  const envModulePath = '../apps/~internal/lib/Env.js'
  const portoConfigModulePath = '../apps/~internal/lib/PortoConfig.js'
  const [envModule, portoConfigModule] = await Promise.all([
    import(envModulePath),
    import(portoConfigModulePath),
  ])
  getEnvironment = envModule.get
  getPortoConfig = portoConfigModule.getConfig
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('staging Porto environment', () => {
  test('selects staging from the hosted dialog URL', () => {
    vi.stubGlobal('window', {
      location: new URL(
        'https://id-staging.localprotocol.xyz/dialog/?relayEnv=stg',
      ),
    })

    expect(getEnvironment()).toBe('stg')
    expect(getPortoConfig().storageKey).toBe('porto.store.stg')
  })

  test('supports Base Sepolia and Optimism Sepolia', () => {
    const config = getPortoConfig('stg')

    expect(config.chains.map((chain) => chain.id)).toEqual([
      baseSepolia.id,
      optimismSepolia.id,
    ])
    expect(Object.keys(config.transports ?? {}).map(Number)).toEqual([
      baseSepolia.id,
      optimismSepolia.id,
    ])
  })
})

describe('chain generator environment selection', () => {
  test('selects all environments by default', () => {
    expect(selectChainEnvironments({ args: [] })).toEqual(['prod', 'stg'])
  })

  test.each([
    {
      args: ['--environment', 'stg'],
      expected: ['stg'],
      name: 'staging from a CLI option',
    },
    {
      args: ['--environment=prod'],
      expected: ['prod'],
      name: 'production from an inline CLI option',
    },
    {
      args: [],
      environment: 'stg',
      expected: ['stg'],
      name: 'staging from the environment',
    },
  ])('selects $name', ({ args, environment, expected }) => {
    expect(
      selectChainEnvironments({
        args,
        ...(environment ? { environment } : {}),
      }),
    ).toEqual(expected)
  })

  test('rejects invalid and conflicting selections', () => {
    expect(() =>
      selectChainEnvironments({ args: ['--environment', 'invalid'] }),
    ).toThrow('Invalid chain environment')
    expect(() =>
      selectChainEnvironments({
        args: ['--environment', 'stg'],
        environment: 'prod',
      }),
    ).toThrow('either the CLI or PORTO_CHAINS_ENV')
  })
})
