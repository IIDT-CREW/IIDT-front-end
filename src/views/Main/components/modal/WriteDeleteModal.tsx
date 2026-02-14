import { Modal } from 'components/Common'
import { Flex, Box, Text } from 'components/Common'

const ConfirmButton = ({
  background,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { background?: string }) => (
  <div
    className="flex flex-row justify-center items-center py-3.5 px-4 gap-2.5 w-[195px] h-[50px] rounded cursor-pointer flex-none grow text-white"
    style={{ background: background || '#000' }}
    {...props}
  />
)

const WriteDeleteModal = ({ onDismiss, ...props }: any) => {
  const { handleDelete } = props

  const deleteAndClose = () => {
    handleDelete()
    onDismiss()
  }

  return (
    <Modal title="유서를 삭제하시겠어요?" onDismiss={onDismiss} {...props} minWidth="272px">
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Text>삭제한 유서는 복구할 수 없어요</Text>
        <Text>하지만 이 유서를 통해 하루하루의 삶이 빛나고 소중해졌다면 삭제해도 좋아요</Text>
        <Box mt="20px">
          <Flex style={{ gap: '8px' }}>
            <ConfirmButton background="grey" onClick={onDismiss}>
              나중에 할게요
            </ConfirmButton>
            <ConfirmButton onClick={deleteAndClose}>삭제할게요</ConfirmButton>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default WriteDeleteModal
