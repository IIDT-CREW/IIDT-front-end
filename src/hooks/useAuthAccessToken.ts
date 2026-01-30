import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { decryptWithAES } from 'utils/crypto'
import { authActions } from 'store/auth'
import { STORAGE_NAME, API_CODE } from 'config/constants/api'
import { authService } from '@/services/auth.service'
import { useIsLogin } from 'store/auth/hooks'

const useAuthAccessToken = () => {
  const dispatch = useDispatch()
  const isLogin = useIsLogin()

  async function getUser() {
    try {
      const userInfo = await authService.getUserInfo()
      if (userInfo) {
        return {
          memIdx: (userInfo as any).MEM_IDX,
          name: (userInfo as any).MEM_USERNAME,
          email: (userInfo as any).MEM_EMAIL,
          nickname: (userInfo as any).MEM_NICKNAME,
          userid: (userInfo as any).MEM_USERID,
        }
      }
    } catch (e) {
      return null
    }
  }

  useEffect(() => {
    if (isLogin) return

    const getUserInfoFromStorage = async () => {
      const storageData = localStorage.getItem(STORAGE_NAME.USER)
      if (!storageData) return

      const decryptedData = decryptWithAES(storageData)
      if (!decryptedData) return

      const encryptStorageData = JSON.parse(decryptedData)
      if (!encryptStorageData) return

      const ACCESS_TOKEN = encryptStorageData.accessToken

      const info = await getUser()

      if (info) {
        dispatch(
          authActions.setAuth({
            isAuthenticated: true,
            accessToken: ACCESS_TOKEN,
            name: info.name,
            email: info.email,
            nickname: info.nickname,
            userid: info.userid,
            memIdx: info.memIdx,
          })
        )
      }
    }

    getUserInfoFromStorage()
  })

  return { hi: 'hi' }
}

export default useAuthAccessToken
