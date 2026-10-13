import { expect, test } from 'vitest'
import {
  latestOnrampError,
  parseOnrampMessage,
} from '../../dialog/src/lib/onramp-events'

const frame = {} as Window
const event = {
  data: JSON.stringify({ eventName: 'onramp_api.commit_success' }),
  origin: 'https://pay.coinbase.com',
  source: frame,
}
test('only accepts known events from the active Coinbase iframe', () => {
  expect(parseOnrampMessage(event, frame)?.eventName).toBe(
    'onramp_api.commit_success',
  )
  expect(
    parseOnrampMessage(
      { ...event, origin: 'https://pay.coinbase.com.evil.test' },
      frame,
    ),
  ).toBeUndefined()
  expect(
    parseOnrampMessage({ ...event, source: {} as Window }, frame),
  ).toBeUndefined()
  expect(parseOnrampMessage(event, null)).toBeUndefined()
  expect(
    parseOnrampMessage({ ...event, data: 'invalid json' }, frame),
  ).toBeUndefined()
  expect(
    parseOnrampMessage({ ...event, data: { eventName: 'unknown' } }, frame),
  ).toBeUndefined()
})
test('preserves current provider error messages without allowing an arbitrary event', () => {
  const data = {
    data: {
      errorCode: 'ERROR_CODE_GUEST_APPLE_PAY_MERCHANT_VALIDATION_TIMEOUT',
      errorMessage: 'Try again.',
    },
    eventName: 'onramp_api.validate_merchant_error',
  }
  expect(parseOnrampMessage({ ...event, data }, frame)).toEqual(data)
})

test('merchant validation failure remains actionable after cancellation until retry clears events', () => {
  const failure = parseOnrampMessage(
    {
      ...event,
      data: {
        data: {
          errorCode: 'TIMEOUT',
          errorMessage: 'Check your connection and retry.',
        },
        eventName: 'onramp_api.validate_merchant_error',
      },
    },
    frame,
  )!
  const cancel = parseOnrampMessage(
    { ...event, data: { eventName: 'onramp_api.cancel' } },
    frame,
  )!
  expect(latestOnrampError([failure, cancel])).toBe(
    'Check your connection and retry.',
  )
  expect(latestOnrampError([])).toBeUndefined()
})
