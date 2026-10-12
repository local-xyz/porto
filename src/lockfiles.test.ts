import { readFile } from 'node:fs/promises'
import { describe, expect, test } from 'vitest'

type ContractsLock = {
  commit: string
  sha256: string
}

type RelayLock = {
  commit: string
  contracts: ContractsLock
  digest: string
  image: string
  repository: string
  tag: string
}

const repositoryRoot = new URL('../', import.meta.url)

async function readJson<T>(name: string) {
  return JSON.parse(await readFile(new URL(name, repositoryRoot), 'utf8')) as T
}

describe('provider-independent release locks', () => {
  test('pins a valid Grid Relay artifact and matching contracts release', async () => {
    const [contracts, relay] = await Promise.all([
      readJson<ContractsLock>('contracts.lock.json'),
      readJson<RelayLock>('relay.lock.json'),
    ])

    expect(relay.contracts).toEqual({
      commit: contracts.commit,
      sha256: contracts.sha256,
    })
    expect(contracts.commit).toBe('c37349a8632d2f3498308217ff9f8d7bf7172e4f')
    expect(contracts.sha256).toBe(
      '4f7aa784a4ce09832bdc7e47c10945a8e0e81494822b0e27e4f806eab9bdb64f',
    )

    expect(relay.image).toBe('ghcr.io/local-xyz/grid-relay')
    expect(relay.repository).toBe('local-xyz/grid')
    expect(relay.digest).toBe(
      'sha256:1b4f9507c18d9393af7b80a29f22496816c4139bd03f31340dcc032bc70a1785',
    )
    expect(relay.digest).toMatch(/^sha256:[0-9a-f]{64}$/)

    expect(relay.commit).toBe('029d350163e18735f0d18dc09ea46cbc19d5cfc6')
    expect(relay.commit).toMatch(/^[0-9a-f]{40}$/)
    expect(relay.tag).toMatch(/^[0-9a-f]{7}$/)
    expect(relay.tag).toBe(relay.commit.slice(0, 7))
  })
})
