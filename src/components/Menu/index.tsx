import { useMemo, useEffect, useRef, useCallback } from 'react'
import useScrollDown from 'hooks/useScrollDown'
import { useModal } from 'components/Common'
import Link from 'next/link'
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
import { useCurrentPath, useNavigate } from '@/hooks/useCurrentPath'
import styles from './menu.module.css'

const MenuBoxBase = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={[styles.menuBox, className].filter(Boolean).join(' ')} {...props} />
)

const TextLink = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" className={[styles.menuTextLink, className].filter(Boolean).join(' ')} {...props} />
)

const MenuBox = () => {
  const menuOff = useMenuOff()
  const menuOnOff = useMenuOnOff()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      menuOnOff()
      await signOut({ callbackUrl: '/' })
    } catch {
      // sign out failed silently
    }
  }

  const handleRoute = (path: string) => {
    navigate(path)
    menuOff()
  }
  return (
    <MenuBoxBase>
      <div className={styles.menuBoxColumn}>
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
  const pathname = useCurrentPath()
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
    return pathname === '/will/[id]' || pathname.startsWith('/will/')
  }, [pathname])

  useEffect(() => {
    if (isSharePage) handleSetIsScrollDown(true)
  }, [isSharePage, handleSetIsScrollDown])

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.fixedContainer}
        style={{
          top: 0,
          height: `${MENU_HEIGHT}px`,
          transform: isScrollDown ? 'translate3d(0px, -100%, 0px)' : 'translate3d(0px, 0px, 0px)',
        }}
        id="app-bar"
      >
        <nav className={isSharePage ? `${styles.nav} ${styles.shareNav}` : styles.nav}>
          <div className={styles.left}>
            <div className={styles.logoWrap}>
              <Link href={isLogin ? '/main' : '/'}>
                <div className={styles.logo}>IIDT</div>
              </Link>
            </div>
            <div className={styles.linksGroup}>
              <div>
                <DropdownMenu items={[]}>
                  <MenuItem isActive={pathname.includes('/about')} href={'/about'}>
                    소개
                  </MenuItem>
                </DropdownMenu>
              </div>
              <div className={styles.desktopLinks}>
                {MenuConfig?.map((menuItem, i) => {
                  return (
                    <DropdownMenu key={`${menuItem}-${i}`} items={menuItem?.items}>
                      <MenuItem isActive={pathname.includes(menuItem?.href)} href={menuItem.href}>
                        {menuItem.label}
                      </MenuItem>
                    </DropdownMenu>
                  )
                })}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.themeSpacer} />
            <ThemeToggleButton selected={themeMode === 'dark'} onClick={handleDark} />
            {isLogin ? (
              <button
                onClick={handleMenu}
                className={styles.menuToggle}
                aria-label="메뉴 열기"
                aria-expanded={isMenuOpen}
              >
                <MenuOutline stroke={isSharePage ? '#fff' : undefined} themeMode={themeMode} />
              </button>
            ) : (
              <button className={styles.startButton} onClick={handleLogin}>
                시작하기
              </button>
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
