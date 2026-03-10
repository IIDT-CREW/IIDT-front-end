import { Modal } from 'components/Common'
import { Button } from 'components/ui/button'
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
  <Button
    className={cn(
      'xs:mb-2.5 xs:w-[275px] xs:px-3.5 xs:py-3 xs:text-base',
      'sm:mx-5 sm:my-4 sm:w-[335px] sm:text-lg',
      'h-auto min-h-[50px] rounded font-[SUIT] font-semibold leading-[22px]',
      'dark:border dark:border-[rgb(203,212,255,0.5)]',
      variant === 'primary' ? 'bg-grayscale-7 text-grayscale-0 hover:bg-grayscale-7/90' : 'bg-grayscale-2 text-grayscale-7 hover:bg-grayscale-2/90',
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
      <div className="flex flex-col items-center justify-center">
        <div className="mb-5 text-center break-keep">
          <p className="text-[13px] leading-relaxed md:text-lg">
            오늘 유서를 처음 작성하시는 분들을 위해 두 가지의 선택방식을 두었어요.
          </p>
          <p className="text-[13px] leading-relaxed md:text-lg">편하신 방법을 선택하여, 당신 오늘 유서를 작성해주세요.</p>
        </div>

        <div className="mt-5 flex flex-col">
          <ModalButton onClick={handleButton}>질문에 따라 유서를 적고 싶어요</ModalButton>
          <ModalButton onClick={onDismiss} variant="primary">
            제 마음대로 일기를 적고 싶어요
          </ModalButton>
        </div>
      </div>
    </Modal>
  )
}

export default SelectPostTypeModal
