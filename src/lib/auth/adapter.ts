import type { Adapter, AdapterUser, AdapterAccount } from 'next-auth/adapters'
import { createSupabaseServerClient } from '@/lib/supabase/server'

function mapMemberToUser(member: any): AdapterUser {
  return {
    id: String(member.mem_idx),
    name: member.mem_username,
    email: member.mem_email,
    emailVerified: null,
    image: null,
    memIdx: member.mem_idx,
    nickname: member.mem_nickname,
    userid: member.mem_userid,
    cooperation: member.mem_cooperation,
  } as AdapterUser
}

export function MemberAdapter(): Adapter {
  return {
    async createUser(user) {
      // 신규 유저 생성은 complete-signup에서 처리 (닉네임 필요)
      // NextAuth 자동 호출 시에는 임시로 빈 유저를 반환
      return {
        id: 'temp',
        name: user.name ?? '',
        email: user.email ?? '',
        emailVerified: null,
        image: null,
      } as AdapterUser
    },

    async getUser(id) {
      const supabase = createSupabaseServerClient()
      const { data, error } = await supabase
        .from('member')
        .select('*')
        .eq('mem_idx', parseInt(id))
        .eq('mem_status', 0)
        .single()

      if (error || !data) return null
      return mapMemberToUser(data)
    },

    async getUserByEmail(email) {
      const supabase = createSupabaseServerClient()
      const { data, error } = await supabase
        .from('member')
        .select('*')
        .eq('mem_email', email)
        .eq('mem_status', 0)
        .single()

      if (error || !data) return null
      return mapMemberToUser(data)
    },

    async getUserByAccount({ providerAccountId, provider }: Pick<AdapterAccount, 'provider' | 'providerAccountId'>) {
      const supabase = createSupabaseServerClient()
      const { data, error } = await supabase
        .from('member')
        .select('*')
        .eq('mem_userid', providerAccountId)
        .eq('mem_cooperation', provider)
        .eq('mem_status', 0)
        .single()

      if (error || !data) return null
      return mapMemberToUser(data)
    },

    async updateUser(user) {
      if (!user.id || user.id === 'temp') return user as AdapterUser

      const supabase = createSupabaseServerClient()
      const updateData: Record<string, unknown> = {}
      if (user.name) updateData.mem_username = user.name
      if (user.email) updateData.mem_email = user.email

      if (Object.keys(updateData).length > 0) {
        await supabase.from('member').update(updateData).eq('mem_idx', parseInt(user.id))
      }

      return user as AdapterUser
    },

    async linkAccount(account) {
      // member 테이블에서 provider 정보는 행 자체에 포함되므로
      // 별도 accounts 테이블이 없음. no-op.
    },

    async createSession() {
      // JWT 전략 사용, DB 세션 불필요
      throw new Error('createSession not implemented - using JWT strategy')
    },

    async getSessionAndUser() {
      throw new Error('getSessionAndUser not implemented - using JWT strategy')
    },

    async updateSession() {
      throw new Error('updateSession not implemented - using JWT strategy')
    },

    async deleteSession() {
      throw new Error('deleteSession not implemented - using JWT strategy')
    },
  }
}
