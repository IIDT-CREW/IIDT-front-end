import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '../keys'
import { authService } from '@/services/auth.service'
import type { FetchError } from '@/lib/fetch'

interface CheckNicknameResult {
  IS_EXIST: boolean
}

export function useCheckNickname(
  nickname: string,
  options?: Omit<UseQueryOptions<CheckNicknameResult, FetchError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.auth.checkNickname(nickname),
    queryFn: () => authService.checkDuplicateNickname(nickname),
    enabled: !!nickname && nickname.length > 0,
    ...options,
  })
}
