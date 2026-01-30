import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '../keys'
import { authService, UserInfo } from '@/services/auth.service'
import type { FetchError } from '@/lib/fetch'

export function useUserInfo(
  options?: Omit<UseQueryOptions<UserInfo, FetchError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.auth.userInfo(),
    queryFn: () => authService.getUserInfo(),
    ...options,
  })
}
