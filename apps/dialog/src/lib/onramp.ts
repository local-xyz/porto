import { useMutation } from '@tanstack/react-query'
import type { Hex } from 'ox'
import * as React from 'react'
import { zeroAddress } from 'viem'
import * as z from 'zod/mini'

export function useShowApplePay(_error: Error | null) {
  return false
}

export function useOnrampOrder(props: {
  domain?: string | undefined
  sandbox?: boolean | undefined
  onApprove: (result: { id: Hex.Hex }) => Promise<void> | void
}) {
  const { onApprove } = props

  const createOrder = useMutation<
    { orderId: string; type: 'apple'; url: string },
    Error,
    { address: string; amount: string }
  >({
    async mutationFn(_variables) {
      throw new Error('The onramp service is not configured.')
    },
    onSuccess() {
      setOnrampEvents([])
    },
  })

  const [orderEvents, setOnrampEvents] = React.useState<CbPostMessageSchema[]>(
    [],
  )
  const lastOrderEvent = React.useMemo(() => orderEvents.at(-1), [orderEvents])

  // TODO(onramp): add iframe loading timeout (onramp_api.load_pending => onramp_api.load_success takes more than 5s)
  React.useEffect(() => {
    async function handlePostMessage(event: MessageEvent) {
      if (event.origin !== 'https://pay.coinbase.com') return
      try {
        const data = z.parse(cbPostMessageSchema, JSON.parse(event.data))
        console.debug('postMessage', data)
        if ('eventName' in data && data.eventName.startsWith('onramp_api.')) {
          setOnrampEvents((state) => [...state, data])
          if (data.eventName === 'onramp_api.commit_success')
            await onApprove({ id: zeroAddress })
        }
      } catch (error) {
        setOnrampEvents((state) => [
          ...state,
          {
            data: {
              errorCode: 'ERROR_CODE_GUEST_APPLE_PAY_NOT_SUPPORTED',
              errorMessage: (error as Error).message ?? 'Something went wrong',
            },
            eventName: 'onramp_api.load_error',
          },
        ])
      }
    }
    window.addEventListener('message', handlePostMessage)
    return () => {
      window.removeEventListener('message', handlePostMessage)
    }
  }, [onApprove])

  return {
    createOrder,
    lastOrderEvent,
    orderEvents,
  }
}

const cbPostMessageSchema = z.union([
  z.object({
    eventName: z.union([
      z.literal('onramp_api.apple_pay_button_pressed'),
      z.literal('onramp_api.cancel'),
      z.literal('onramp_api.commit_success'),
      z.literal('onramp_api.load_pending'),
      z.literal('onramp_api.load_success'),
      z.literal('onramp_api.polling_start'),
      z.literal('onramp_api.polling_success'),
    ]),
  }),
  z.object({
    data: z.object({
      errorCode: z.union([
        z.literal('ERROR_CODE_GUEST_APPLE_PAY_NOT_SETUP'),
        z.literal('ERROR_CODE_GUEST_APPLE_PAY_NOT_SUPPORTED'),
        z.literal('ERROR_CODE_INIT'),
      ]),
      errorMessage: z.string(),
    }),
    eventName: z.literal('onramp_api.load_error'),
  }),
  z.object({
    data: z.object({
      errorCode: z.union([
        z.literal('ERROR_CODE_GUEST_CARD_HARD_DECLINED'),
        z.literal('ERROR_CODE_GUEST_CARD_INSUFFICIENT_BALANCE'),
        z.literal('ERROR_CODE_GUEST_CARD_PREPAID_DECLINED'),
        z.literal('ERROR_CODE_GUEST_CARD_RISK_DECLINED'),
        z.literal('ERROR_CODE_GUEST_CARD_SOFT_DECLINED'),
        z.literal('ERROR_CODE_GUEST_INVALID_CARD'),
        z.literal('ERROR_CODE_GUEST_PERMISSION_DENIED'),
        z.literal('ERROR_CODE_GUEST_REGION_MISMATCH'),
        z.literal('ERROR_CODE_GUEST_TRANSACTION_COUNT'),
        z.literal('ERROR_CODE_GUEST_TRANSACTION_LIMIT'),
      ]),
      errorMessage: z.string(),
    }),
    eventName: z.literal('onramp_api.commit_error'),
  }),
  z.object({
    data: z.object({
      errorCode: z.union([
        z.literal('ERROR_CODE_GUEST_TRANSACTION_BUY_FAILED'),
        z.literal('ERROR_CODE_GUEST_TRANSACTION_SEND_FAILED'),
        z.literal('ERROR_CODE_GUEST_TRANSACTION_TRANSACTION_FAILED'),
        z.literal('ERROR_CODE_GUEST_TRANSACTION_AVS_VALIDATION_FAILED'),
      ]),
      errorMessage: z.string(),
    }),
    eventName: z.literal('onramp_api.polling_error'),
  }),
])
export type CbPostMessageSchema = z.infer<typeof cbPostMessageSchema>
