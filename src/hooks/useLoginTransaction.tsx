import { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { API_CODE, STORAGE_NAME } from 'config/constants/api'
import { authService } from '@/services/auth.service'
import { encryptWithAES } from 'utils/crypto'
import { useSetAuth } from 'store/auth/hooks'
import { ModalProps } from 'components/Common'
import { useModal } from 'components/Common'
import NickNameModal from 'components/NickNameModal'

const getUser = async () => {
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

type HandleLoginTransactionProps = ModalProps & {
  accessToken?: string
  isLogin?: boolean
  nickName?: string
}

const useLoginTransaction = () => {
  const router = useRouter()
  const handleSetAuth = useSetAuth()
  const authParams = router.query.auth
  const code = router.query.code as string
  const [accessToken, setAccessToken] = useState('')
  //overlay click not dismiss
  const [presentNickNameModal] = useModal(<NickNameModal accessToken={accessToken} />, false, true)

  const handleNicknameModal = useCallback(() => {
    presentNickNameModal()
  }, [presentNickNameModal])

  const handleLoginTransaction = useCallback(
    async ({ accessToken, isLogin, nickName, onDismiss }: HandleLoginTransactionProps) => {
      if (!code && !authParams) return
      const cooperation = (authParams as string[])[0]
      try {
        const res = isLogin
          ? await authService.socialLogin({ provider: cooperation, code })
          : await authService.signup({ provider: cooperation, code, accessToken, nickname: nickName })

        // 가입이 안되어있으면
        if (res.code === API_CODE.INVALID_USER) {
          setAccessToken((res.result as any).access_token)
          handleNicknameModal()
          return
        }

        if (res.code !== API_CODE.SUCCESS) return
        const ACCESS_TOKEN = (res.result as any).accessToken

        const info = await getUser()
        if (!info) return

        handleSetAuth({
          accessToken: ACCESS_TOKEN,
          info,
        })
        const encDataString = encryptWithAES(
          JSON.stringify({
            isAuthenticated: true,
            accessToken: ACCESS_TOKEN,
            name: info.name,
            email: info.email,
            nickname: info.nickname,
            userid: info.userid,
            memIdx: info.memIdx,
          })
        )
        localStorage.setItem(STORAGE_NAME.USER, encDataString)
        const path = localStorage.getItem('login_path')

        if (path === '/') router.push('/main')
        if (path !== '/') router.replace(path as string)
        localStorage.removeItem('login_path')
      } catch (e) {
        alert('오류가 발생했습니다. 로그인 재 시도해주세요')
        console.log(e)
        router.replace('/')
        return null
      } finally {
        if (onDismiss) onDismiss()
      }
    },
    [authParams, code, handleNicknameModal, handleSetAuth, router]
  )

  return { handleLoginTransaction }
}

export default useLoginTransaction
