import { Modal } from 'components/Common'
import { Flex, Box, Text } from 'components/Common'
import cn from 'utils/cn'

type variant = 'primary' | 'secondary'

const ConfirmButton = ({
  variant,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: variant }) => (
  <div
    className={cn(
      'flex flex-row justify-center items-center gap-2.5 h-[50px] py-2.5 px-3 text-sm font-semibold text-white w-auto',
      'sm:py-3.5 sm:px-4 sm:w-[195px] sm:text-base',
      'rounded flex-none grow cursor-pointer font-[SUIT]',
      'dark:border dark:border-[rgb(203,212,255,0.5)]',
      variant === 'primary'
        ? 'bg-grayscale-7 text-grayscale-0'
        : 'bg-grayscale-2 text-grayscale-7',
      className,
    )}
    {...props}
  />
)

const WarningHistoryBackModal = ({ onDismiss, ...props }: any) => {
  const { goToBack } = props

  const handleGoToMain = () => {
    onDismiss()
    goToBack()
  }

  return (
    <Modal title="일기 작성을 나중에 하시겠어요?" onDismiss={onDismiss} {...props} minWidth="272px">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text>일기 작성을 나중에 하시겠어요?</Text>
        <Text css={{ fontWeight: '600', textAlign: 'center', wordBreak: 'keep-all' }}>
          지금까지 작성된 내용은 저장되지 않습니다
        </Text>
        <Box mt="20px">
          <Flex style={{ gap: '8px' }}>
            <ConfirmButton onClick={handleGoToMain}>나중에 다시 쓸게요</ConfirmButton>
            <ConfirmButton variant="primary" onClick={onDismiss}>
              지금 계속 쓸게요
            </ConfirmButton>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default WarningHistoryBackModal
