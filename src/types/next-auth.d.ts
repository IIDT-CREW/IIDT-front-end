import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      image?: string | null
      memIdx: number
      nickname: string
      userid: string
      cooperation: string
      needsNickname: boolean
    }
  }

  interface User {
    memIdx?: number
    nickname?: string
    userid?: string
    cooperation?: string
    needsNickname?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    memIdx?: number
    nickname?: string
    userid?: string
    cooperation?: string
    needsNickname?: boolean
  }
}
