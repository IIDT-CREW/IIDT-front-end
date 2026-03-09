import { useState } from 'react'
import { Modal, Flex, Box, Text } from 'components/Common'
import cn from 'utils/cn'
import { willService } from '@/services/will.service'
import useToast from 'hooks/useToast'

interface GuestPasswordModalProps {
  willId: string
  onVerified: (password: string) => void
  onDismiss?: () => void
}

const GuestPasswordModal = ({ willId, onVerified, onDismiss }: GuestPasswordModalProps) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const onToast = useToast()

  const handleVerify = async () => {
    if (!password.trim()) return

    setIsLoading(true)
    try {
      await willService.verifyGuestPassword(willId, password)
      onVerified(password)
      onDismiss?.()
    } catch {
      onToast({
        type: 'error',
        message: '비밀번호가 일치하지 않습니다',
        option: { position: 'top-center' },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleVerify()
  }

  return (
    <Modal title="비밀번호 확인" onDismiss={onDismiss}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box mb="20px">
          <Text fontSize="14px">작성 시 입력한 비밀번호를 입력해주세요.</Text>
        </Box>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="비밀번호"
          className={cn(
            'w-full h-10 px-3 border border-grayscale-3 rounded outline-none',
            'font-[SUIT] text-sm bg-inherit text-[var(--color-text-primary)]',
            'focus:border-grayscale-7',
          )}
        />

        <Flex className="gap-2.5 mt-5 w-full">
          <button
            onClick={onDismiss}
            className={cn(
              'flex-1 h-10 rounded border border-grayscale-7 bg-grayscale-0 text-grayscale-7',
              'font-[SUIT] font-medium text-sm cursor-pointer',
            )}
          >
            취소
          </button>
          <button
            onClick={handleVerify}
            disabled={isLoading || !password.trim()}
            className={cn(
              'flex-1 h-10 rounded border-none bg-grayscale-7 text-grayscale-0',
              'font-[SUIT] font-medium text-sm cursor-pointer',
              'disabled:bg-grayscale-1 disabled:text-grayscale-5 disabled:cursor-not-allowed',
            )}
          >
            {isLoading ? '확인 중...' : '확인'}
          </button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default GuestPasswordModal
