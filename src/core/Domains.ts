export const dialogUrls = {
  local: 'http://localhost:5175/dialog/',
  prod: 'https://id.localprotocol.xyz/dialog/',
  stg: 'https://id-staging.localprotocol.xyz/dialog/',
} as const

export const relayUrls = {
  anvil: { http: 'http://localhost:9119' },
  prod: { http: 'https://relay.localprotocol.xyz' },
  stg: { http: 'https://relay.localprotocol.xyz' },
} as const
