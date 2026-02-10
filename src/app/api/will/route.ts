import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, mapWillRow } from '@/lib/supabase/helpers'

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

    // 페이징 조회 (member 닉네임 조인)
    const { data, error } = await supabase
      .from('will')
      .select('*, member!inner(mem_nickname)')
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
  if (!session?.user?.memIdx || session.user.memIdx === -1) {
    return apiError('4002', 'Unauthorized', 401)
  }

  try {
    const body = await req.json()
    const supabase = createSupabaseServerClient()

    // 유언장 삽입
    const { data: will, error } = await supabase
      .from('will')
      .insert({
        will_id: body.will_id,
        mem_idx: session.user.memIdx,
        title: body.title,
        content: body.content || '',
        thumbnail: body.thumbnail || '',
        content_type: body.content_type ?? 0,
        is_private: body.is_private ? 1 : 0,
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

    return apiSuccess(mapWillRow({ ...will, member: { mem_nickname: session.user.nickname } }))
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}
