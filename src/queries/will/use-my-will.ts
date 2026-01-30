import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '../keys'
import { willService, WillListResult } from '@/services/will.service'
import type { FetchError } from '@/lib/fetch'

const DEFAULT_PAGE_SIZE = 10

export function useMyWill(
  params: { memIdx: string; pageNo: number; pageSize: number },
  options?: Omit<UseQueryOptions<WillListResult, FetchError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.will.my(params),
    queryFn: () => willService.getMyWill(params),
    enabled: !!params.memIdx,
    ...options,
  })
}

export function useInfiniteMyWill(
  params: { memIdx: string; pageSize?: number },
  options?: Omit<
    UseInfiniteQueryOptions<WillListResult, FetchError, WillListResult, WillListResult, readonly unknown[], number>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) {
  const pageSize = params.pageSize || DEFAULT_PAGE_SIZE

  return useInfiniteQuery({
    queryKey: [...queryKeys.will.all, 'my', 'infinite', params.memIdx],
    queryFn: ({ pageParam }) =>
      willService.getMyWill({ memIdx: params.memIdx, pageNo: pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.isLast) return undefined
      return lastPage.meta.nextPageNo
    },
    enabled: !!params.memIdx,
    ...options,
  })
}
