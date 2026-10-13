/** Convert the Relay's raw USD quote to an order amount; never parse display text. */
export function onrampUsdAmount(
  fiat: { currency: string; value: string } | undefined,
) {
  if (!fiat || !['USD', '$'].includes(fiat.currency.toUpperCase())) return
  if (!/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(fiat.value)) return
  const value = Number(fiat.value)
  if (!Number.isFinite(value) || value <= 0) return
  const amount = Math.max(5, value * 1.05)
  if (amount >= 10_000) return
  return amount.toFixed(2)
}
