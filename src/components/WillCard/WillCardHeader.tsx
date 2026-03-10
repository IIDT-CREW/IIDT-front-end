import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import { useModal } from 'components/Common'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
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

const MenuItem = ({ presentDeleteModal, presentShareModal, handleEdit, handlePreview }) => {
  return (
    <div>
      <DropdownMenuItem className="gap-2 px-2 py-2" onClick={handleEdit}>
        <Edit />
        <span>수정하기</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-2 px-2 py-2" onClick={presentShareModal}>
        <Export />
        <span>공유하기</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-2 px-2 py-2" onClick={handlePreview}>
        <Panorama />
        <span>미리보기</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-2 px-2 py-2 text-[#F3213B] focus:text-[#F3213B]" onClick={presentDeleteModal}>
        <Trash />
        <span>삭제하기</span>
      </DropdownMenuItem>
    </div>
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

  const handleEdit = useCallback(() => {
    router.push(`/write?will_id=${WILL_ID}`)
  }, [WILL_ID, router])

  const handlePreview = useCallback(() => {
    router.push(`/will/${WILL_ID}`)
  }, [WILL_ID, router])

  return (
    <div className="mb-5 flex items-center justify-between">
      <p>{moment(regDate).format('YYYY.MM.DD')}</p>
      {isLogin && isPrivate && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="cursor-pointer">
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] p-[18px]">
            <MenuItem
              presentDeleteModal={presentDeleteModal}
              presentShareModal={presentShareModal}
              handleEdit={handleEdit}
              handlePreview={handlePreview}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
export default Header
