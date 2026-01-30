import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '../keys'
import { willService, WillListResult } from '@/services/will.service'
import type { FetchError } from '@/lib/fetch'

const DEFAULT_PAGE_SIZE = 10

export function useWillList(
  params: { pageNo: number; pageSize: number },
  options?: Omit<UseQueryOptions<WillListResult, FetchError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.will.list(params),
    queryFn: () => willService.getWillList(params),
    ...options,
  })
}

export function useInfiniteWillList(
  params: { pageSize?: number } = {},
  options?: Omit<
    UseInfiniteQueryOptions<WillListResult, FetchError, WillListResult, WillListResult, readonly unknown[], number>,
    'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'
  >
) {
  const pageSize = params.pageSize || DEFAULT_PAGE_SIZE

  return useInfiniteQuery({
    queryKey: queryKeys.will.lists(),
    queryFn: ({ pageParam }) => willService.getWillList({ pageNo: pageParam, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.isLast) return undefined
      return lastPage.meta.nextPageNo
    },
    ...options,
  })
}
