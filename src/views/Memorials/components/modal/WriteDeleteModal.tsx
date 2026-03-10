import { Modal } from 'components/Common'
import { Button } from 'components/ui/button'

const WriteDeleteModal = ({ onDismiss, ...props }: any) => {
  const { handleDelete } = props

  const deleteAndClose = () => {
    handleDelete()
    onDismiss()
  }

  return (
    <Modal title="유서를 삭제하시겠어요?" onDismiss={onDismiss} {...props} minWidth="272px">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="leading-relaxed">삭제한 유서는 복구할 수 없어요</p>
        <p className="leading-relaxed">하지만 이 유서를 통해 하루하루의 삶이 빛나고 소중해졌다면 삭제해도 좋아요</p>
        <div className="mt-5 flex gap-2">
          <Button className="h-[50px] w-[195px] bg-gray-500 text-white hover:bg-gray-500/90" onClick={onDismiss}>
            나중에 할게요
          </Button>
          <Button className="h-[50px] w-[195px] bg-black text-white hover:bg-black/90" onClick={deleteAndClose}>
            삭제할게요
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default WriteDeleteModal
