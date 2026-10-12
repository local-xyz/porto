import { describe, expect, test } from 'vitest'
import * as z from 'zod/mini'

import * as Rpc from './rpc.js'

const address = '0x0000000000000000000000000000000000000001'
const contract = { address, version: '1' }

describe('wallet_getCapabilities.Response', () => {
  test('defaults omitted legacy contract arrays', () => {
    const response = z.parse(Rpc.wallet_getCapabilities.Response, {
      '0x7a69': {
        contracts: {
          accountImplementation: contract,
          accountProxy: contract,
          orchestrator: contract,
          simulator: contract,
        },
        fees: {
          quoteConfig: {
            rateTtl: 60,
            ttl: 60,
          },
          recipient: address,
          tokens: [],
        },
      },
    })

    expect(response['0x7a69']?.contracts.legacyAccountImplementations).toEqual(
      [],
    )
    expect(response['0x7a69']?.contracts.legacyOrchestrators).toEqual([])
  })
})
