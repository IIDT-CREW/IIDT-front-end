import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Box, Text, Flex, useModal } from 'components/Common'
import { usePopper } from 'react-popper'
import Ellipsis from 'components/Common/Svg/Icons/Ellipsis'
import Export from 'components/Common/Svg/Icons/Export'
import Trash from 'components/Common/Svg/Icons/Trash'
import Edit from 'components/Common/Svg/Icons/Edit'
import Panorama from 'components/Common/Svg/Icons/Panorama'
import moment from 'moment'
import WriteDeleteModal from 'views/Main/components/modal/WriteDeleteModal'
import ShareModal from 'views/Main/components/modal/ShareModal'
import { useIsLogin } from '@/hooks/useAuth'
import { Will } from '@api/will/types'
import cn from 'utils/cn'

const MenuWrapper = ({
  isOpen,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { isOpen: boolean }) => (
  <div
    className={cn(
      'w-[200px] bg-[var(--color-bg)] shadow-[0px_0px_1px_rgba(0,0,0,0.08),0px_16px_30px_4px_rgba(0,0,0,0.1)] rounded p-[18px]',
      !isOpen && 'pointer-events-none invisible',
      className,
    )}
    {...props}
  />
)

const MenuItem = ({ presentDeleteModal, presentShareModal, handleEdit, handlePreview }) => {
  return (
    <Box>
      <Flex padding="8px" style={{ gap: '8px' }} onClick={handleEdit}>
        <Edit />
        <Text>수정하기</Text>
      </Flex>
      <Flex padding="8px" style={{ gap: '8px' }} onClick={presentShareModal}>
        <Export />
        <Text>공유하기</Text>
      </Flex>
      <Flex padding="8px" style={{ gap: '8px' }} onClick={handlePreview}>
        <Panorama />
        <Text>미리보기</Text>
      </Flex>
      <Flex padding="8px" style={{ gap: '8px' }} onClick={presentDeleteModal}>
        <Trash />
        <Text color="#F3213B">삭제하기</Text>
      </Flex>
    </Box>
  )
}

type HeaderProps = {
  will?: Will
  handleDelete?: () => void
  handleShare?: () => void
  isPrivate?: boolean
}

const Header = ({ will, handleDelete, handleShare, isPrivate = true }: HeaderProps) => {
  const { CONTENT: content, REG_DATE: regDate, TITLE: title, WILL_ID } = will
  const router = useRouter()
  const isLogin = useIsLogin()
  const [presentDeleteModal] = useModal(<WriteDeleteModal handleDelete={handleDelete} />)
  const [presentShareModal] = useModal(
    <ShareModal handleShare={handleShare} content={content} willId={WILL_ID} title={title} />,
  )

  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: 'fixed',
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 0] } }],
  })

  const handleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleEdit = useCallback(() => {
    router.push(`/write?will_id=${WILL_ID}`)
  }, [WILL_ID, router])

  const handlePreview = useCallback(() => {
    router.push(`/will/${WILL_ID}`)
  }, [WILL_ID, router])

  return (
    <Box mb="20px">
      <Flex justifyContent="space-between" alignItems="center">
        <Text>{moment(regDate).format('YYYY.MM.DD')}</Text>
        {isLogin && (
          <Text style={{ cursor: 'pointer' }} onClick={handleIsOpen} ref={setTargetRef}>
            {isPrivate && (
              <>
                <Ellipsis />
                {isOpen && (
                  <MenuWrapper ref={setTooltipRef} style={styles.popper} {...attributes.popper} isOpen={isOpen}>
                    <MenuItem
                      presentDeleteModal={presentDeleteModal}
                      presentShareModal={presentShareModal}
                      handleEdit={handleEdit}
                      handlePreview={handlePreview}
                    />
                  </MenuWrapper>
                )}
              </>
            )}
          </Text>
        )}
      </Flex>
    </Box>
  )
}
export default Header
