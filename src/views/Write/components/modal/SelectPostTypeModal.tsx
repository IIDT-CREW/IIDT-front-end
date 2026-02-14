import { Modal } from 'components/Common'
import { Flex, Box, Text } from 'components/Common'
import { ButtonHTMLAttributes } from 'react'
import cn from 'utils/cn'

interface customModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  handlePostType: () => void
  onDismiss?: () => void
}

type variant = 'primary' | 'secondary'

const ModalButton = ({
  variant,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: variant }) => (
  <button
    className={cn(
      'flex flex-row justify-center items-center py-3.5 px-4 cursor-pointer rounded border-none font-[SUIT] font-semibold text-lg leading-[22px]',
      'xs:w-[275px] xs:text-base xs:py-3 xs:px-3.5 xs:mb-2.5',
      'sm:w-[335px] sm:text-lg sm:mx-5 sm:my-4',
      'dark:border dark:border-[rgb(203,212,255,0.5)]',
      variant === 'primary'
        ? 'bg-grayscale-7 text-grayscale-0'
        : 'bg-grayscale-2 text-grayscale-7',
      className,
    )}
    {...props}
  />
)

const SelectPostTypeModal = ({ handlePostType, onDismiss }: customModalProps) => {
  const handleButton = () => {
    handlePostType()
    onDismiss()
  }
  return (
    <Modal title="일기 작성 방식을 선택할 수 있어요" onDismiss={onDismiss}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box mb="20px">
          <Flex justifyContent="center" flexDirection="column" style={{ textAlign: 'center', wordBreak: 'keep-all' }}>
            <Text fontSize={['13px', , '18px']}>
              오늘 유서를 처음 작성하시는 분들을 위해 두 가지의 선택방식을 두었어요.
            </Text>
            <Text fontSize={['13px', , '18px']}>편하신 방법을 선택하여, 당신 오늘 유서를 작성해주세요.</Text>
          </Flex>
        </Box>

        <Box mt="20px">
          <Flex flexDirection="column">
            <ModalButton onClick={handleButton}>질문에 따라 유서를 적고 싶어요</ModalButton>
            <ModalButton onClick={onDismiss} variant="primary">
              제 마음대로 일기를 적고 싶어요
            </ModalButton>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default SelectPostTypeModal
