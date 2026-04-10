import { useSession } from 'next-auth/react'

export function useIsLogin(): boolean {
  const { status } = useSession()
  return status === 'authenticated'
}

export function useUserInfo(): { memIdx: number; userid: string; name: string; email: string; nickname: string } {
  const { data: session } = useSession()
  return {
    memIdx: session?.user?.memIdx ?? -1,
    userid: session?.user?.userid ?? '',
    name: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
    nickname: session?.user?.nickname ?? '',
  }
}
