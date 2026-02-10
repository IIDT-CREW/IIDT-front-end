import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, mapWillRow } from '@/lib/supabase/helpers'

// GET /api/will/[id] - 유언장 상세
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from('will')
      .select('*, member!inner(mem_nickname), will_answer(*)')
      .eq('will_id', id)
      .eq('is_delete', 0)
      .single()

    if (error || !data) {
      return apiError('5000', '유언장을 찾을 수 없습니다', 404)
    }

    return apiSuccess(mapWillRow(data))
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}

// PUT /api/will/[id] - 유언장 수정
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.memIdx || session.user.memIdx === -1) {
    return apiError('4002', 'Unauthorized', 401)
  }

  try {
    const body = await req.json()
    const supabase = createSupabaseServerClient()

    // 본인 유언장인지 확인
    const { data: existing } = await supabase
      .from('will')
      .select('mem_idx')
      .eq('will_id', id)
      .eq('is_delete', 0)
      .single()

    if (!existing || existing.mem_idx !== session.user.memIdx) {
      return apiError('4002', '수정 권한이 없습니다', 403)
    }

    // 유언장 업데이트
    const { data: will, error } = await supabase
      .from('will')
      .update({
        title: body.title,
        content: body.content || '',
        thumbnail: body.thumbnail || '',
        content_type: body.content_type ?? 0,
        is_private: body.is_private ? 1 : 0,
      })
      .eq('will_id', id)
      .select('*')
      .single()

    if (error) {
      return apiError('3000', error.message, 500)
    }

    // 질문 답변 갱신: 기존 삭제 후 재삽입
    if (body.answer_list !== undefined) {
      await supabase.from('will_answer').delete().eq('will_id', id)

      if (body.answer_list && body.answer_list.length > 0) {
        const answers = body.answer_list.map((a: any) => ({
          will_id: id,
          qs_essay_idx: a.qs_essay_idx || '',
          qs_idx: a.qs_idx,
          qs_essay_answer: a.qs_essay_answer,
        }))

        await supabase.from('will_answer').insert(answers)
      }
    }

    return apiSuccess(mapWillRow({ ...will, member: { mem_nickname: session.user.nickname } }))
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}

// DELETE /api/will/[id] - 유언장 삭제 (soft delete)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session?.user?.memIdx || session.user.memIdx === -1) {
    return apiError('4002', 'Unauthorized', 401)
  }

  try {
    const supabase = createSupabaseServerClient()

    // 본인 유언장인지 확인
    const { data: existing } = await supabase
      .from('will')
      .select('mem_idx')
      .eq('will_id', id)
      .eq('is_delete', 0)
      .single()

    if (!existing || existing.mem_idx !== session.user.memIdx) {
      return apiError('4002', '삭제 권한이 없습니다', 403)
    }

    const { error } = await supabase.from('will').update({ is_delete: 1 }).eq('will_id', id)

    if (error) {
      return apiError('3000', error.message, 500)
    }

    return apiSuccess(null)
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}
