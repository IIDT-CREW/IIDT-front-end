import { MENU_HEIGHT } from 'config/constants/default'
import { useRouter } from 'next/router'
import { useMenuOff, useMenuOnOff } from 'store/navi/hooks'
import { signOut } from 'next-auth/react'

const MenuWrapper = () => {
  const menuOff = useMenuOff()
  const menuOnOff = useMenuOnOff()
  const router = useRouter()

  const returnMarginTop = () => {
    if (router.asPath.includes('/main')) return 0
    if (router.asPath.includes('/write')) return 0
    return MENU_HEIGHT
  }

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
    <div className="absolute p-2.5" style={{ marginTop: `${returnMarginTop()}px` }}>
      <div>
        <p className="mb-6 cursor-pointer text-theme-text" onClick={() => handleRoute('/')}>
          HOME
        </p>
        <p className="mb-6 cursor-pointer text-theme-text" onClick={() => handleRoute('/main')}>
          MAIN
        </p>
        <p className="mb-6 cursor-pointer text-theme-text" onClick={handleLogout}>
          로그아웃
        </p>
      </div>
    </div>
  )
}

export default MenuWrapper
