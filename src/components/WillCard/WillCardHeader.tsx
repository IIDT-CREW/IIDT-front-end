import React, { useCallback } from 'react'
import { useModal } from 'components/Common'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from 'components/ui/dropdown-menu'
import Ellipsis from 'components/Common/Svg/Icons/Ellipsis'
import Export from 'components/Common/Svg/Icons/Export'
import Trash from 'components/Common/Svg/Icons/Trash'
import Edit from 'components/Common/Svg/Icons/Edit'
import Panorama from 'components/Common/Svg/Icons/Panorama'
import moment from 'moment'
import WriteDeleteModal from 'views/Main/components/modal/WriteDeleteModal'
import ShareModal from 'views/Main/components/modal/ShareModal'
import GuestPasswordModal from 'views/Write/components/modal/GuestPasswordModal'
import { useIsLogin } from '@/hooks/useAuth'
import { useDeleteWill } from '@/queries'
import { Will } from '@api/will/types'
import { useNavigate } from '@/hooks/useCurrentPath'

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
  const navigate = useNavigate()
  const isLogin = useIsLogin()
  const content = will?.CONTENT ?? ''
  const regDate = will?.REG_DATE ?? ''
  const title = will?.TITLE ?? ''
  const willId = will?.WILL_ID ?? ''
  const isGuest = will?.IS_GUEST ?? false

  const deleteMutation = useDeleteWill()

  // 비회원 글 비밀번호 확인 후 수정
  const handleGuestEdit = useCallback(
    (_password: string) => {
      void _password
      navigate(`/write?will_id=${willId}`)
    },
    [navigate, willId],
  )

  // 비회원 글 비밀번호 확인 후 삭제
  const handleGuestDelete = useCallback(
    (password: string) => {
      deleteMutation.mutate({ willId, guestPassword: password })
    },
    [deleteMutation, willId],
  )

  const [presentDeleteModal] = useModal(<WriteDeleteModal handleDelete={handleDelete} />)
  const [presentShareModal] = useModal(
    <ShareModal handleShare={handleShare} content={content} willId={willId} title={title} />,
  )
  const [presentGuestEditPasswordModal] = useModal(<GuestPasswordModal willId={willId} onVerified={handleGuestEdit} />)
  const [presentGuestDeletePasswordModal] = useModal(
    <GuestPasswordModal willId={willId} onVerified={handleGuestDelete} />,
  )

  const handleEdit = useCallback(() => {
    if (isGuest) {
      presentGuestEditPasswordModal()
    } else {
      navigate(`/write?will_id=${willId}`)
    }
  }, [isGuest, navigate, presentGuestEditPasswordModal, willId])

  const handleGuestDeleteClick = useCallback(() => {
    presentGuestDeletePasswordModal()
  }, [presentGuestDeletePasswordModal])

  const handlePreview = useCallback(() => {
    navigate(`/will/${willId}`)
  }, [navigate, willId])

  const showMenu = isLogin || isGuest

  if (!will) return null

  return (
    <div className="mb-5 flex items-center justify-between">
      <p>{moment(regDate).format('YYYY.MM.DD')}</p>
      {showMenu && isPrivate && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="cursor-pointer">
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] p-[18px]">
            <MenuItem
              presentDeleteModal={isGuest ? handleGuestDeleteClick : presentDeleteModal}
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
