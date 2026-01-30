import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '../../keys'
import { willService } from '@/services/will.service'
import useToast from '@/hooks/useToast'

interface UseDeleteWillOptions {
  onSuccessCallback?: () => void
}

export function useDeleteWill({ onSuccessCallback }: UseDeleteWillOptions = {}) {
  const queryClient = useQueryClient()
  const onToast = useToast()

  return useMutation({
    mutationFn: (willId: string) => willService.deleteWill(willId),
    onSuccess: () => {
      onToast({
        type: '',
        message: '삭제가 완료 되었어요',
        option: { position: 'top-center' },
      })

      // Invalidate all will-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.will.all })

      onSuccessCallback?.()
    },
    onError: (error) => {
      console.error('Failed to delete will:', error)
      onToast({
        type: 'error',
        message: '삭제에 실패했습니다',
        option: { position: 'top-center' },
      })
    },
  })
}
