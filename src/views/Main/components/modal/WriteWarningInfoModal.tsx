import { Modal } from 'components/Common'
import { Button } from 'components/ui/button'

const WriteWarningInfoModal = ({ onDismiss, ...props }: any) => {
  return (
    <Modal title="내 삶을 돌아보기위한 마지막 일기입니다" onDismiss={onDismiss} {...props} minWidth="272px">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="leading-relaxed">이 오늘 유서는 그 누구도 아닌 나 자신을 돌아보는 일기입니다.</p>
        <p className="leading-relaxed">죽음은 치료할 수 있는 질병이 아니에요.</p>
        <p className="leading-relaxed">인간은 누구나 죽습니다.</p>
        <p className="mb-[14px] leading-relaxed">그렇기에 당신이 맞이하는 하루하루의 삶이 빛나고 소중해요.</p>

        <p className="leading-relaxed font-semibold">나 자신을 제일 소중히 아끼고</p>
        <p className="leading-relaxed font-semibold">내 주변의 이들에게 사랑한다고 표현하며</p>
        <p className="leading-relaxed font-semibold">진정으로 좋아하는 일,</p>
        <p className="mb-[14px] leading-relaxed font-semibold">꿈꾸고 있는 일을 생각해보세요.</p>

        <p className="mb-5 leading-relaxed">마음이 힘들다면 1577-0199로 전화해주세요. 당신은 그 누구보다 소중하니까요.</p>
        <Button className="h-[50px] w-[335px] bg-black text-white hover:bg-black/90" onClick={onDismiss}>
          확인했어요
        </Button>
      </div>
    </Modal>
  )
}

export default WriteWarningInfoModal
