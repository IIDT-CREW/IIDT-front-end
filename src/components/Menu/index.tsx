import { useRouter } from 'next/router'
import { useMemo, useEffect, useRef, useCallback } from 'react'
import useScrollDown from 'hooks/useScrollDown'
import { useModal } from 'components/Common'
import { Heading } from '../Common'
import Link from 'next/link'
import cn from 'utils/cn'

import Button from 'components/Common/Button/Button'
import MenuItem from 'components/Menu/MenuItem'
import DropdownMenu from './DropdownMenu'
import MenuConfig from './config'
import { useIsLogin } from 'hooks/useAuth'
import { signOut } from 'next-auth/react'
import ThemeToggleButton from '../Common/Button/ThemeToggleButton'

import { MENU_HEIGHT } from 'config/constants/default'
import MenuOutline from 'components/Common/Svg/Icons/MenuOutline'
import LoginModal from 'components/LoginModal'
import { useMenuOff, useMenuOnOff, useNaviState } from '@store/navi/hooks'
import useOnClickOutside from '@hooks/useOnClickOutside'

const MenuBoxBase = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded bg-[var(--color-bg)] absolute w-48 p-4 flex items-center',
      '-translate-x-[190px] translate-y-[25px]',
      'shadow-[0px_0px_1px_rgba(0,0,0,0.08),0px_16px_30px_4px_rgba(0,0,0,0.1)]',
      className,
    )}
    {...props}
  />
)

const TextLink = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" className={cn('cursor-pointer bg-transparent p-0 text-left', className)} {...props} />
)

const MenuBox = () => {
  const menuOff = useMenuOff()
  const menuOnOff = useMenuOnOff()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      menuOnOff()
      await signOut({ callbackUrl: '/' })
    } catch {
      // sign out failed silently
    }
  }

  const handleRoute = (path: string) => {
    router.push(path)
    menuOff()
  }
  return (
    <MenuBoxBase>
      <div className="flex flex-col">
        <TextLink className="mb-6" onClick={() => handleRoute('/')}>
          HOME
        </TextLink>
        <TextLink className="mb-6" onClick={() => handleRoute('/main')}>
          MAIN
        </TextLink>
        <TextLink className="mb-6" onClick={() => handleRoute('/about')}>
          소개
        </TextLink>
        <TextLink className="mb-6" onClick={() => handleRoute('/memorials')}>
          어느날의 기록
        </TextLink>
        <TextLink className="mb-6" onClick={handleLogout}>
          로그아웃
        </TextLink>
      </div>
    </MenuBoxBase>
  )
}

const MenuWrapper = ({ themeMode, toggleTheme }) => {
  const router = useRouter()
  const isLogin = useIsLogin()
  const { isScrollDown, handleSetIsScrollDown } = useScrollDown()
  const [presentLoginModal] = useModal(<LoginModal />)
  const { isMenuOpen } = useNaviState()
  const menuOff = useMenuOff()
  const menuOnOff = useMenuOnOff()
  const targetRef = useRef(null)
  const onClickEvent = () => {
    menuOff()
  }
  useOnClickOutside(targetRef, onClickEvent)
  const handleLogin = useCallback(() => {
    presentLoginModal()
  }, [presentLoginModal])

  const handleDark = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  const handleMenu = useCallback(() => {
    menuOnOff()
  }, [menuOnOff])

  const isSharePage = useMemo(() => {
    return router.route === '/will/[id]'
  }, [router])

  useEffect(() => {
    if (isSharePage) handleSetIsScrollDown(true)
  }, [isSharePage, handleSetIsScrollDown])

  return (
    <div className="relative w-full z-10">
      <div
        className="fixed left-0 transition-all duration-500 w-full"
        style={{
          top: 0,
          height: `${MENU_HEIGHT}px`,
          transform: isScrollDown ? 'translate3d(0px, -100%, 0px)' : 'translate3d(0px, 0px, 0px)',
        }}
        id="app-bar"
      >
        <nav
          className={cn(
            'transition-all duration-500 flex justify-between items-center w-full h-full',
            'bg-[var(--color-bg)] border-b border-[var(--color-card-border)]',
            'translate-z-0 px-4 sm:px-6 lg:px-8',
            isSharePage &&
              'bg-[rgba(19,23,64,0.5)] backdrop-blur-[8px] border-none [&_div]:!text-white [&_svg]:fill-white',
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
            <div className="shrink-0 cursor-pointer pr-2 sm:pr-4">
              <Link href={isLogin ? '/main' : '/'}>
                <Heading className="font-[Cormorant] text-[28px] sm:text-[32px]">IIDT</Heading>
              </Link>
            </div>
            <div className="shrink-0">
              <DropdownMenu items={[]}>
                <MenuItem isActive={router?.asPath?.includes('/about')} href={'/about'}>
                  소개
                </MenuItem>
              </DropdownMenu>
            </div>
            <div className="hidden items-center gap-1 sm:flex lg:gap-2">
              {MenuConfig?.map((menuItem, i) => {
                return (
                  <DropdownMenu key={`${menuItem}-${i}`} items={menuItem?.items}>
                    <MenuItem isActive={router?.asPath?.includes(menuItem?.href)} href={menuItem.href}>
                      {menuItem.label}
                    </MenuItem>
                  </DropdownMenu>
                )
              })}
            </div>
          </div>
          <div className="ml-4 flex shrink-0 items-center justify-end gap-3 sm:gap-4">
            <ThemeToggleButton selected={themeMode === 'dark'} onClick={handleDark} />
            {isLogin ? (
              <button
                onClick={handleMenu}
                className="cursor-pointer bg-transparent border-none p-0"
                aria-label="메뉴 열기"
                aria-expanded={isMenuOpen}
              >
                <MenuOutline stroke={isSharePage && '#fff'} themeMode={themeMode} />
              </button>
            ) : (
              <Button onClick={handleLogin}>시작하기</Button>
            )}
            {isMenuOpen && (
              <div className="relative" ref={targetRef}>
                <MenuBox />
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MenuWrapper
