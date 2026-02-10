import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/supabase/helpers'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return apiError('4002', 'Unauthorized', 401)
  }

  try {
    const { nickname } = await req.json()

    if (!nickname || nickname.length < 2 || nickname.length > 30) {
      return apiError('1001', '닉네임은 2~30자 이내로 입력해주세요')
    }

    const supabase = createSupabaseServerClient()

    // 닉네임 중복 체크
    const { data: existing } = await supabase
      .from('member')
      .select('mem_idx')
      .eq('mem_nickname', nickname)
      .limit(1)

    if (existing && existing.length > 0) {
      return apiError('2001', '이미 사용 중인 닉네임입니다')
    }

    // member 생성
    const { data: member, error } = await supabase
      .from('member')
      .insert({
        mem_userid: session.user.userid,
        mem_username: session.user.name || '',
        mem_email: session.user.email || '',
        mem_nickname: nickname,
        mem_cooperation: session.user.cooperation,
        mem_status: 0,
      })
      .select('mem_idx, mem_nickname, mem_userid, mem_cooperation')
      .single()

    if (error || !member) {
      return apiError('3000', '회원 생성에 실패했습니다', 500)
    }

    return apiSuccess({
      memIdx: member.mem_idx,
      nickname: member.mem_nickname,
    })
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}
