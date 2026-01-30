import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../keys'
import { willService } from '@/services/will.service'
import type { InsertWillParams } from '@/api/will/types'
import useToast from '@/hooks/useToast'

interface UseUpdateWillOptions {
  onSuccessCallback?: () => void
}

export function useUpdateWill({ onSuccessCallback }: UseUpdateWillOptions = {}) {
  const queryClient = useQueryClient()
  const onToast = useToast()

  return useMutation({
    mutationFn: (data: InsertWillParams) => willService.updateWill(data),
    onSuccess: (_, variables) => {
      onToast({
        type: '',
        message: '수정이 완료 되었어요',
        option: { position: 'top-center' },
      })

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.will.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.will.detail(variables.will_id) })

      onSuccessCallback?.()
    },
    onError: (error) => {
      console.error('Failed to update will:', error)
      onToast({
        type: 'error',
        message: '수정에 실패했습니다',
        option: { position: 'top-center' },
      })
    },
  })
}
