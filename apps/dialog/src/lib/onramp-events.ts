import * as z from 'zod/mini'

const schema = z.union([
  z.object({
    eventName: z.enum([
      'onramp_api.apple_pay_button_pressed',
      'onramp_api.cancel',
      'onramp_api.commit_success',
      'onramp_api.load_pending',
      'onramp_api.load_success',
      'onramp_api.polling_start',
      'onramp_api.polling_success',
    ]),
  }),
  z.object({
    data: z.object({ errorCode: z.string(), errorMessage: z.string() }),
    eventName: z.enum([
      'onramp_api.load_error',
      'onramp_api.commit_error',
      'onramp_api.polling_error',
      'onramp_api.validate_merchant_error',
    ]),
  }),
])
export type CbPostMessageSchema = z.infer<typeof schema>

export function parseOnrampMessage(
  event: Pick<MessageEvent, 'origin' | 'source' | 'data'>,
  activeFrame: Window | null | undefined,
): CbPostMessageSchema | undefined {
  if (
    !activeFrame ||
    event.origin !== 'https://pay.coinbase.com' ||
    event.source !== activeFrame
  )
    return
  try {
    return z.parse(
      schema,
      typeof event.data === 'string' ? JSON.parse(event.data) : event.data,
    )
  } catch {
    return
  }
}

/** Cancellation follows merchant validation failure; retain its actionable reason until retry. */
export function latestOnrampError(events: readonly CbPostMessageSchema[]) {
  const failure = events.findLast((event) => 'data' in event)
  return failure && 'data' in failure ? failure.data.errorMessage : undefined
}
