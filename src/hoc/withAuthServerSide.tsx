import nookies from 'nookies'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { authActions } from 'store/auth'
import { fetchServer } from '@/lib/fetch/server'
import { API_CODE } from 'config/constants/api'

/* getUser */
async function getUser(accessToken: string) {
  try {
    const res = await fetchServer<any>('/api/oauth/userInfo', {
      method: 'GET',
      accessToken,
    })

    if (res && res.code === API_CODE.SUCCESS) {
      return res.result
    }
    return null
  } catch (e) {
    return null
  }
}

export function withAuthServerSideProps(getServerSidePropsFunc?: (context: any, user: any) => any) {
  return async (context: any) => {
    context.res.setHeader('set-cookie', '')
    let user = null
    const nookie = nookies.get(context)
    const accessToken = nookie['access_token']
    const refresh_token = nookie['refresh_token']

    if (!accessToken && !refresh_token) {
      return { props: { user, data: { props: { user } } } }
    }

    /* 토큰 세팅 */
    if (accessToken) {
      user = await getUser(accessToken)
    }

    if (getServerSidePropsFunc) {
      return { props: { user, data: await getServerSidePropsFunc(context, user) } }
    }

    return { props: { user, data: { props: { user } } } }
  }
}

// withAuthComponent.tsx
export function withAuthComponent(Component: any, isProtected = true) {
  return ({ user, data }: { user: any; data: any }) => {
    const router = useRouter()
    const dispatch = useDispatch()

    if (isProtected && !user) {
      router.push('/login')
      return null
    }

    if (user) {
      dispatch(
        authActions.setAuth({
          isAuthenticated: true,
          accessToken: '',
          name: user.name,
          email: user.email,
          nickname: user.nickname,
          userid: user.userid,
          memIdx: user.memIdx,
        })
      )
    }
    return <Component {...data.props} />
  }
}
