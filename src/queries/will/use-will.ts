import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '../keys'
import { willService } from '@/services/will.service'
import type { Will } from '@/api/will/types'
import type { FetchError } from '@/lib/fetch'

export function useWill(
  willId: string,
  options?: Omit<UseQueryOptions<Will, FetchError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.will.detail(willId),
    queryFn: () => willService.getWill(willId),
    enabled: !!willId,
    ...options,
  })
}
