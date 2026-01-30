import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '../keys'
import { willService } from '@/services/will.service'
import type { FetchError } from '@/lib/fetch'

export function useWillCount(
  options?: Omit<UseQueryOptions<number, FetchError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.will.count(),
    queryFn: () => willService.getWillCount(),
    ...options,
  })
}
