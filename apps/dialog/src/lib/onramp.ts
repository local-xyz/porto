import { useMutation } from '@tanstack/react-query'
import { Hooks } from 'porto/remote'
import { Account } from 'porto/viem'
import * as React from 'react'
import { hashMessage } from 'viem'
import {
  type CbPostMessageSchema,
  latestOnrampError,
  parseOnrampMessage,
} from './onramp-events'

export type { CbPostMessageSchema } from './onramp-events'

import { authorizationMessage } from '../../../service/src/lib/onramp-authorization'
import { porto } from './Porto'

export function useShowApplePay(_error: Error | null) {
  const chain = Hooks.useChain(porto)
  return Boolean(
    chain?.id === 84532 &&
      import.meta.env.VITE_ONRAMP_URL &&
      import.meta.env.VITE_ONRAMP_OPTIONS?.split(',').includes('apple'),
  )
}

export function useOnrampOrder() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const [orderEvents, setOnrampEvents] = React.useState<CbPostMessageSchema[]>(
    [],
  )
  const createOrder = useMutation<
    { orderId: string; type: 'apple'; url: string; sandbox: true },
    Error,
    { address: string; amount: string }
  >({
    async mutationFn({ address, amount }) {
      const endpoint = import.meta.env.VITE_ONRAMP_URL
      if (
        !endpoint ||
        !import.meta.env.VITE_ONRAMP_OPTIONS?.split(',').includes('apple')
      )
        throw new Error('The sandbox onramp service is not configured.')
      const state = porto._internal.store.getState()
      const account = state.accounts.find(
        (a) => a.address.toLowerCase() === address.toLowerCase(),
      )
      const key = account?.keys?.find((k) => k.role === 'admin' && k.privateKey)
      if (!account || !key)
        throw new Error('Sign in with this account before starting checkout.')
      const chainId = state.chainIds[0]
      if (chainId !== 84532)
        throw new Error('Sandbox checkout requires Base Sepolia.')
      const input = {
        address: address.toLowerCase(),
        amount,
        chainId,
        issuedAt: Math.floor(Date.now() / 1000),
      }
      // Pinned Relay expects an inner admin signature and applies ERC1271 replay protection.
      const signature = await Account.sign(account, {
        key,
        payload: hashMessage(
          authorizationMessage({ ...input, origin: window.location.origin }),
        ),
        wrap: false,
      })
      const response = await fetch(`${endpoint.replace(/\/$/, '')}/orders`, {
        body: JSON.stringify({ ...input, signature }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        signal: AbortSignal.timeout(30_000),
      })
      if (!response.ok)
        throw new Error(
          response.status === 409
            ? 'Verify your email using its confirmation link and verify your phone, then try again.'
            : 'Unable to start sandbox checkout. Please try again.',
        )
      const data = await response.json()
      const url = new URL(data.url)
      if (
        data.sandbox !== true ||
        data.type !== 'apple' ||
        typeof data.orderId !== 'string' ||
        url.origin !== 'https://pay.coinbase.com' ||
        url.searchParams.get('useApplePaySandbox') !== 'true'
      )
        throw new Error('Invalid sandbox payment link.')
      return data
    },
    onMutate() {
      setOnrampEvents([])
    },
  })
  const lastOrderEvent = orderEvents.at(-1)
  React.useEffect(() => {
    function handlePostMessage(event: MessageEvent) {
      if (!createOrder.data) return
      const data = parseOnrampMessage(event, iframeRef.current?.contentWindow)
      if (data) setOnrampEvents((state) => [...state.slice(-49), data])
      // Sandbox events never mean real funds were received. Do not invoke onApprove.
    }
    window.addEventListener('message', handlePostMessage)
    return () => window.removeEventListener('message', handlePostMessage)
  }, [createOrder.data])
  return {
    createOrder,
    iframeRef,
    lastOrderEvent,
    orderError: latestOnrampError(orderEvents),
    orderEvents,
  }
}
