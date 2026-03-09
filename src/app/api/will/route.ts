import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, mapWillRow } from '@/lib/supabase/helpers'
import bcrypt from 'bcryptjs'

// GET /api/will - 유언장 목록 (공개)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const pageNo = parseInt(searchParams.get('pageNo') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const offset = (pageNo - 1) * pageSize

  try {
    const supabase = createSupabaseServerClient()

    // 전체 개수
    const { count } = await supabase
      .from('will')
      .select('*', { count: 'exact', head: true })
      .eq('is_delete', 0)
      .eq('is_private', 0)

    const totalCount = count ?? 0
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // 페이징 조회 (member 닉네임 LEFT JOIN)
    const { data, error } = await supabase
      .from('will')
      .select('*, member(mem_nickname)')
      .eq('is_delete', 0)
      .eq('is_private', 0)
      .order('reg_date', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) {
      return apiError('3000', error.message, 500)
    }

    return apiSuccess({
      list: (data ?? []).map(mapWillRow),
      meta: {
        pageNo,
        pageSize,
        totalCount,
        totalPageCount,
        nextPageNo: pageNo < totalPageCount ? pageNo + 1 : pageNo,
        isLast: pageNo >= totalPageCount,
      },
    })
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}

// POST /api/will - 유언장 작성
export async function POST(req: NextRequest) {
  const session = await auth()
  const isGuest = !session?.user?.memIdx || session.user.memIdx === -1

  try {
    const body = await req.json()

    if (isGuest) {
      if (!body.guest_nickname?.trim()) {
        return apiError('4003', '닉네임을 입력해주세요', 400)
      }
      if (!body.guest_password?.trim() || body.guest_password.length < 4) {
        return apiError('4003', '비밀번호는 4자 이상 입력해주세요', 400)
      }
    }

    const supabase = createSupabaseServerClient()
    const hashedPassword = isGuest ? await bcrypt.hash(body.guest_password, 10) : null

    // 유언장 삽입
    const { data: will, error } = await supabase
      .from('will')
      .insert({
        will_id: body.will_id,
        mem_idx: isGuest ? null : session!.user!.memIdx,
        title: body.title,
        content: body.content || '',
        thumbnail: body.thumbnail || '',
        content_type: body.content_type ?? 0,
        is_private: body.is_private ? 1 : 0,
        guest_nickname: isGuest ? body.guest_nickname.trim() : null,
        guest_password: isGuest ? hashedPassword : null,
      })
      .select('*')
      .single()

    if (error) {
      return apiError('3000', error.message, 500)
    }

    // 질문 모드인 경우 답변 삽입
    if (body.answer_list && body.answer_list.length > 0) {
      const answers = body.answer_list.map((a: any) => ({
        will_id: body.will_id,
        qs_essay_idx: a.qs_essay_idx || '',
        qs_idx: a.qs_idx,
        qs_essay_answer: a.qs_essay_answer,
      }))

      await supabase.from('will_answer').insert(answers)
    }

    const nickname = isGuest ? body.guest_nickname.trim() : session!.user!.nickname
    return apiSuccess(mapWillRow({ ...will, member: isGuest ? null : { mem_nickname: nickname }, guest_nickname: isGuest ? nickname : null }))
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}
