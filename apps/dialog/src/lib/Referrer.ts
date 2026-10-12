import { useQuery } from '@tanstack/react-query'

import * as Dialog from '~/lib/Dialog'

export function useVerify() {
  const hostname = Dialog.useStore((state) => state.referrer?.url?.hostname)

  return useQuery<useVerify.Data>({
    queryFn: async () => ({ status: 'unknown' }),
    queryKey: ['verify', hostname],
    staleTime: Number.POSITIVE_INFINITY,
  })
}

export declare namespace useVerify {
  type Data = {
    status: 'whitelisted' | 'blacklisted' | 'unknown'
  }
}
