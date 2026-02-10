import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from '../keys'
import { fetchClient } from '@/lib/fetch'
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
    queryFn: async () => {
      const res = await fetchClient<CheckNicknameResult>('/api/auth/check-nickname', {
        params: { mem_nickname: nickname },
      })
      return res.result
    },
    enabled: !!nickname && nickname.length > 0,
    ...options,
  })
}
