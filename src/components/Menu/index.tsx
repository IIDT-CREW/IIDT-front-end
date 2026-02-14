import { useRouter } from 'next/router'
import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useScrollDown from 'hooks/useScrollDown'
import Flex from '../Common/Box/Flex'
import { Box, Text, useModal } from 'components/Common'
import { Heading } from '../Common'
import Link from 'next/link'
import cn from 'utils/cn'

import { Button } from 'components/Common/Button'
import MenuItem from 'components/Menu/MenuItem'
import DropdownMenu from './DropdownMenu'
import MenuConfig from './config'
import { naviActions } from 'store/navi'
import { useIsLogin } from '@/hooks/useAuth'
import { signOut } from 'next-auth/react'
import ThemeToggleButton from '../Common/Button/ThemeToggleButton'

import { MENU_HEIGHT } from 'config/constants/default'
import MenuOutline from 'components/Common/Svg/Icons/MenuOutline'
import LoginModal from 'components/LoginModal'
import { useNaviState } from '@store/navi/hooks'
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

const TextLink = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <Text className={cn('cursor-pointer', className)} {...props} />
)

const MobileMenuBox = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleRoute = (path: string) => {
    router.push(path)
    dispatch(naviActions.menuOff())
  }
  return (
    <MenuBoxBase>
      <Flex flexDirection={'column'}>
        <TextLink mb="24px" onClick={() => handleRoute('/')}>
          HOME
        </TextLink>
        <TextLink mb="24px" onClick={() => handleRoute('/main')}>
          MAIN
        </TextLink>
        <TextLink mb="24px" onClick={() => handleRoute('/about')}>
          소개
        </TextLink>
        <TextLink mb="24px" onClick={() => handleRoute('/memorials')}>
          어느날의 기록
        </TextLink>
      </Flex>
    </MenuBoxBase>
  )
}

const MenuBox = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      dispatch(naviActions.menuOnOff())
      await signOut({ callbackUrl: '/' })
    } catch (e) {
      console.log('logout ', e)
    }
  }

  const handleRoute = (path: string) => {
    router.push(path)
    dispatch(naviActions.menuOff())
  }
  return (
    <MenuBoxBase>
      <Flex flexDirection={'column'}>
        <TextLink mb="24px" onClick={() => handleRoute('/')}>
          HOME
        </TextLink>
        <TextLink mb="24px" onClick={() => handleRoute('/main')}>
          MAIN
        </TextLink>
        <TextLink mb="24px" onClick={() => handleRoute('/about')}>
          소개
        </TextLink>
        <TextLink mb="24px" onClick={() => handleRoute('/memorials')}>
          어느날의 기록
        </TextLink>
        <TextLink mb="24px" onClick={handleLogout}>
          로그아웃
        </TextLink>
      </Flex>
    </MenuBoxBase>
  )
}

const MenuWrapper = ({ themeMode, toggleTheme }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(true)
  const isLogin = useIsLogin()
  const { isScrollDown, handleSetIsScrollDown } = useScrollDown()
  const [presentLoginModal] = useModal(<LoginModal />)
  const { isMenuOpen } = useNaviState()
  const targetRef = useRef(null)
  const onClickEvent = () => {
    dispatch(naviActions.menuOff())
  }
  useOnClickOutside(targetRef, onClickEvent)
  const handleLogin = useCallback(() => {
    presentLoginModal()
  }, [presentLoginModal])

  const handleDark = useCallback(() => {
    toggleTheme()
  }, [toggleTheme])

  const handleMenu = useCallback(() => {
    dispatch(naviActions.menuOnOff())
  }, [dispatch])

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
          top: showMenu ? 0 : `-${MENU_HEIGHT}px`,
          height: `${MENU_HEIGHT}px`,
          transform: isScrollDown ? 'translate3d(0px, -100%, 0px)' : 'translate3d(0px, 0px, 0px)',
        }}
        id="app-bar"
      >
        <nav
          className={cn(
            'transition-all duration-500 flex justify-between items-center w-full h-full',
            'bg-[var(--color-bg)] border-b border-[var(--color-card-border)]',
            'translate-z-0 px-4',
            isSharePage && 'bg-[rgba(19,23,64,0.5)] backdrop-blur-[8px] border-none [&_div]:!text-white [&_svg]:fill-white',
          )}
        >
          <Flex justifyContent="center" alignItems="center">
            <Flex style={{ cursor: 'pointer', paddingRight: '20px' }}>
              <Link href={isLogin ? '/main' : '/'}>
                <Heading style={{ fontFamily: 'Cormorant' }}>IIDT</Heading>
              </Link>
            </Flex>
            <Flex>
              <DropdownMenu items={[]}>
                <MenuItem isActive={router?.asPath?.includes('/about')} href={'/about'}>
                  소개
                </MenuItem>
              </DropdownMenu>
            </Flex>
            <Flex className="hidden sm:flex">
              {MenuConfig?.map((menuItem, i) => {
                return (
                  <DropdownMenu key={`${menuItem}-${i}`} items={menuItem?.items}>
                    <MenuItem isActive={router?.asPath?.includes(menuItem?.href)} href={menuItem.href}>
                      {menuItem.label}
                    </MenuItem>
                  </DropdownMenu>
                )
              })}
            </Flex>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <Box width="40px" height="40px" borderRadius="50%"></Box>
            <ThemeToggleButton selected={themeMode === 'dark'} onClick={handleDark} />
            {isLogin ? (
              <Box onClick={handleMenu} style={{ cursor: 'pointer' }}>
                <MenuOutline stroke={isSharePage && '#fff'} themeMode={themeMode} />
              </Box>
            ) : (
              <Button onClick={handleLogin}>시작하기</Button>
            )}
            {isMenuOpen && (
              <Box position={'relative'} ref={targetRef}>
                <MenuBox />
              </Box>
            )}
          </Flex>
        </nav>
      </div>
    </div>
  )
}

export default MenuWrapper
