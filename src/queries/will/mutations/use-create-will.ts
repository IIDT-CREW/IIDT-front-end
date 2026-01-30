import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../keys'
import { willService } from '@/services/will.service'
import type { InsertWillParams } from '@/api/will/types'
import useToast from '@/hooks/useToast'

interface UseCreateWillOptions {
  onSuccessCallback?: () => void
}

export function useCreateWill({ onSuccessCallback }: UseCreateWillOptions = {}) {
  const queryClient = useQueryClient()
  const onToast = useToast()

  return useMutation({
    mutationFn: (data: InsertWillParams) => willService.createWill(data),
    onSuccess: () => {
      onToast({
        type: '',
        message: '작성이 완료 되었어요',
        option: { position: 'top-center' },
      })

      // Invalidate all will-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.will.all })

      onSuccessCallback?.()
    },
    onError: (error) => {
      console.error('Failed to create will:', error)
      onToast({
        type: 'error',
        message: '작성에 실패했습니다',
        option: { position: 'top-center' },
      })
    },
  })
}
