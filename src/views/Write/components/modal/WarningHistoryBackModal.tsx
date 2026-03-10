import { Modal } from 'components/Common'
import { Button } from 'components/ui/button'
import cn from 'utils/cn'

type variant = 'primary' | 'secondary'

const ConfirmButton = ({
  variant,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: variant }) => (
  <Button
    className={cn(
      'h-[50px] px-3 text-sm font-semibold sm:w-[195px] sm:px-4 sm:text-base',
      'font-[SUIT] dark:border dark:border-[rgb(203,212,255,0.5)]',
      variant === 'primary' ? 'bg-grayscale-7 text-grayscale-0 hover:bg-grayscale-7/90' : 'bg-grayscale-2 text-grayscale-7 hover:bg-grayscale-2/90',
      className,
    )}
    {...props}
  />
)

const WarningHistoryBackModal = ({ onDismiss, goToBack, ...props }: any) => {
  const handleGoToMain = () => {
    onDismiss()
    goToBack()
  }

  return (
    <Modal title="일기 작성을 나중에 하시겠어요?" onDismiss={onDismiss} {...props} minWidth="272px">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="leading-relaxed">일기 작성을 나중에 하시겠어요?</p>
        <p className="break-keep leading-relaxed font-semibold">지금까지 작성된 내용은 저장되지 않습니다</p>
        <div className="mt-5 flex gap-2">
          <ConfirmButton onClick={handleGoToMain}>나중에 다시 쓸게요</ConfirmButton>
          <ConfirmButton variant="primary" onClick={onDismiss}>
            지금 계속 쓸게요
          </ConfirmButton>
        </div>
      </div>
    </Modal>
  )
}

export default WarningHistoryBackModal
