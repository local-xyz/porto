import { expect, test } from 'vitest'
import { onrampUsdAmount } from '../../dialog/src/lib/onramp-amount'

test('uses numeric USD quote values, independently of displayed currency prefixes', () => {
  expect(onrampUsdAmount({ currency: '$', value: '10' })).toBe('10.50')
  expect(onrampUsdAmount({ currency: 'USD', value: '10' })).toBe('10.50')
  expect(onrampUsdAmount({ currency: 'USD', value: '0.01' })).toBe('5.00')
})
test('does not reinterpret foreign currency, formatted labels, or unsupported amounts as USD', () => {
  for (const fiat of [
    { currency: 'EUR', value: '10' },
    { currency: 'USD', value: '$10.00' },
    { currency: 'USD', value: '1,000' },
    { currency: 'USD', value: '9999' },
    { currency: 'USD', value: 'NaN' },
  ]) {
    expect(onrampUsdAmount(fiat)).toBeUndefined()
  }
})
