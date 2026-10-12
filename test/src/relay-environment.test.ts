import assert from 'node:assert/strict'
import { test } from 'node:test'
import { relayEnvironment } from './relay-environment.js'

test('passes only approved settings and keeps secret values out of Docker arguments', () => {
  const result = relayEnvironment({
    EMAIL_SENDER: 'LocalProtocol <no-reply@mail.localprotocol.xyz>',
    ONRAMP_WORKER_SECRET: 'test-worker-secret',
    PORTO_BASE_URL: 'anvil.localhost:5174',
    RESEND_API_KEY: 'test-resend-secret',
    UNRELATED_SECRET: 'must-not-pass',
    VITE_RESEND_API_KEY: 'must-not-pass',
  })
  assert.deepEqual(result.args, [
    '--env',
    'RESEND_API_KEY',
    '--env',
    'ONRAMP_WORKER_SECRET',
    '--env',
    'PORTO_BASE_URL',
    '--env',
    'EMAIL_SENDER',
  ])
  assert.deepEqual(result.env, {
    EMAIL_SENDER: 'LocalProtocol <no-reply@mail.localprotocol.xyz>',
    ONRAMP_WORKER_SECRET: 'test-worker-secret',
    PORTO_BASE_URL: 'anvil.localhost:5174',
    RESEND_API_KEY: 'test-resend-secret',
  })
  assert(!result.args.join(' ').includes('secret'))
})

test('omits absent and empty settings', () => {
  assert.deepEqual(
    relayEnvironment({ EMAIL_SENDER: undefined, RESEND_API_KEY: '' }),
    { args: [], env: {} },
  )
})
