import { ArrowLeft } from 'components/Common/Svg'
import { MENU_HEIGHT } from 'config/constants/default'
import React, { useCallback } from 'react'
import cn from 'utils/cn'
import useToast from 'hooks/useToast'
import { PREV, NEXT, DONE } from 'views/Write/data'
import PrivateToggle from '@components/PrivateToggle'
import { useRouter } from 'next/router'
import MenuButton from '@views/Write/components/MenuBar/MenuButton'
type Variant = 'primary' | 'secondary'

const variantStyles: Record<string, string> = {
  primary: 'bg-grayscale-7 text-grayscale-0',
  secondary: 'border border-grayscale-7 bg-grayscale-0 text-grayscale-7',
}

export const StyleMenuButton = ({
  variant = 'primary',
  isFull,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; isFull?: boolean }) => (
  <button
    className={cn(
      'h-[38px] flex flex-row justify-center items-center gap-2.5 font-medium text-sm font-[SUIT-Medium] not-italic rounded border-none leading-[18px] cursor-pointer dark:border dark:border-[rgb(203,212,255,0.5)] disabled:text-grayscale-5 disabled:bg-grayscale-1 disabled:cursor-not-allowed',
      isFull ? 'w-full' : 'w-[76px]',
      variantStyles[variant] || variantStyles.secondary,
      className,
    )}
    {...props}
  />
)

type MenuButtonListProps = {
  isMobile: boolean
  handleMenuButton: (e: any) => void
  page: number
  isLastPage: boolean
  isDisabled: boolean
  isDefaultPostType: boolean
}
const MenuButtonList = ({
  isMobile,
  handleMenuButton,
  page,
  isLastPage,
  isDisabled,
  isDefaultPostType,
}: MenuButtonListProps) => {
  return (
    <div className="flex gap-2.5">
      {!isDefaultPostType && page !== 0 && (
        <MenuButton
          text="이전 질문"
          isMobile={isMobile}
          handleMenuButton={handleMenuButton}
          isDisabled={false}
          variant="secondary"
          buttonType={PREV}
        />
      )}

      {!isDefaultPostType && !isLastPage && (
        <MenuButton
          text="다음 질문"
          isMobile={isMobile}
          handleMenuButton={handleMenuButton}
          isDisabled={isDisabled}
          buttonType={NEXT}
        />
      )}

      {isDefaultPostType && !isMobile && (
        <MenuButton
          text={'작성 완료'}
          isMobile={isMobile}
          handleMenuButton={handleMenuButton}
          isDisabled={isDisabled}
          buttonType={DONE}
        />
      )}
      {!isDefaultPostType && !isMobile && isLastPage && (
        <MenuButton
          text={'작성 완료'}
          isMobile={isMobile}
          handleMenuButton={handleMenuButton}
          isDisabled={isDisabled}
          buttonType={DONE}
        />
      )}
    </div>
  )
}

const MenuBar = ({
  isMobile,
  handlePage,
  handleUpsert,
  page,
  isLastPage,
  isDisabled,
  isDefaultPostType,
  isPrivate,
  handleSetIsPrivate,
}) => {
  const router = useRouter()
  const goToMain = useCallback(() => {
    router.push('/main')
  }, [router])
  const onToast = useToast()

  const handleMenuButton = useCallback(
    (buttonType: 'prev' | 'next' | 'done') => {
      if (isDisabled && buttonType !== PREV)
        return onToast({
          type: 'error',
          message: '내용을 입력해주세요',
          option: {
            position: 'top-center',
            style: {
              top: `${MENU_HEIGHT}px`,
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-error, #f3213b)',
              border: '1px solid #EFEFEF',
              boxShadow: '0px 0px 1px rgb(0 0 0 / 8%), 0px 2px 6px rgb(0 0 0 / 5%)',
              borderRadius: '2px',
              margin: '0 16px',
            },
          },
        })
      if (buttonType === PREV) {
        handlePage(page - 1)
        return
      }
      if (buttonType === NEXT) {
        handlePage(page + 1)
        return
      }

      return handleUpsert()
    },
    [handlePage, handleUpsert, isDisabled, onToast, page],
  )

  return (
    <nav
      className="border-none flex justify-between items-center w-full px-6 bg-theme-bg"
      style={{ height: `${MENU_HEIGHT}px` }}
    >
      <button
        onClick={goToMain}
        className="flex border-none bg-none font-[SUIT] justify-between w-[72px] h-6 p-0 items-center text-theme-text cursor-pointer"
      >
        <ArrowLeft fill="var(--color-text)" width="26px" />내 기록
      </button>
      <div className="flex justify-center items-center">
        <PrivateToggle isPrivate={isPrivate} handleSetIsPrivate={handleSetIsPrivate} />
        <MenuButtonList
          handleMenuButton={handleMenuButton}
          isMobile={isMobile}
          page={page}
          isLastPage={isLastPage}
          isDisabled={isDisabled}
          isDefaultPostType={isDefaultPostType}
        />
      </div>
    </nav>
  )
}

export default MenuBar
