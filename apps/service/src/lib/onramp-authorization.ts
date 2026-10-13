/** Shared wire format. Changing this requires updating both dialog and Worker. */
export function authorizationMessage(input: {
  address: string
  amount: string
  chainId: number
  origin: string
  issuedAt: number
}) {
  return [
    'LocalProtocol Coinbase sandbox onramp authorization',
    `Origin: ${input.origin}`,
    `Account: ${input.address.toLowerCase()}`,
    `Chain ID: ${input.chainId}`,
    `Payment: ${input.amount} USD`,
    `Issued at: ${input.issuedAt}`,
    'I authorize sharing my verified email and phone with Coinbase for this sandbox order.',
    'I accept the Coinbase User Agreement, Guest Checkout Terms, and Privacy Policy.',
    'This is a simulation: no card charge and no funds are delivered.',
  ].join('\n')
}
