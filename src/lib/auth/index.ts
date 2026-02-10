import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false

      const supabase = createSupabaseServerClient()
      const { data: member } = await supabase
        .from('member')
        .select('mem_idx, mem_nickname, mem_userid, mem_cooperation')
        .eq('mem_userid', account.providerAccountId)
        .eq('mem_cooperation', account.provider)
        .eq('mem_status', 0)
        .single()

      if (member) {
        // 기존 유저
        user.memIdx = member.mem_idx
        user.nickname = member.mem_nickname
        user.userid = member.mem_userid
        user.cooperation = member.mem_cooperation
        user.needsNickname = false
      } else {
        // 신규 유저 - 닉네임 설정 필요
        user.needsNickname = true
        user.userid = account.providerAccountId ?? ''
        user.cooperation = account.provider
      }

      return true
    },

    async jwt({ token, user, trigger, session }) {
      // 최초 로그인 시 user 정보를 JWT에 저장
      if (user) {
        token.memIdx = user.memIdx
        token.nickname = user.nickname ?? ''
        token.userid = user.userid ?? ''
        token.cooperation = user.cooperation ?? ''
        token.needsNickname = user.needsNickname ?? false
      }

      // session update 트리거 (닉네임 설정 완료 후)
      if (trigger === 'update' && session) {
        token.memIdx = session.memIdx ?? token.memIdx
        token.nickname = session.nickname ?? token.nickname
        token.needsNickname = session.needsNickname ?? token.needsNickname
      }

      return token
    },

    async session({ session, token }) {
      session.user.memIdx = token.memIdx ?? -1
      session.user.nickname = token.nickname ?? ''
      session.user.userid = token.userid ?? ''
      session.user.cooperation = token.cooperation ?? ''
      session.user.needsNickname = token.needsNickname ?? false
      return session
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      if (url.startsWith('/')) return `${baseUrl}${url}`
      return `${baseUrl}/main`
    },
  },
  pages: {
    signIn: '/',
    newUser: '/onboarding',
  },
})
