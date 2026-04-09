import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, mapWillRow } from '@/lib/supabase/helpers'
import bcrypt from 'bcryptjs'

// GET /api/will/[id] - 유언장 상세
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const supabase = createSupabaseServerClient()

    const { data, error } = await supabase
      .from('will')
      .select('*, member(mem_nickname), will_answer(*)')
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

  try {
    const body = await req.json()
    const supabase = createSupabaseServerClient()

    // 기존 유언장 조회
    const { data: existing } = await supabase
      .from('will')
      .select('mem_idx, guest_password')
      .eq('will_id', id)
      .eq('is_delete', 0)
      .single()

    if (!existing) {
      return apiError('5000', '유언장을 찾을 수 없습니다', 404)
    }

    // 권한 확인: 회원 글은 세션, 비회원 글은 비밀번호
    if (existing.mem_idx) {
      if (!session?.user?.memIdx || existing.mem_idx !== session.user.memIdx) {
        return apiError('4002', '수정 권한이 없습니다', 403)
      }
    } else {
      if (!body.guest_password) {
        return apiError('4003', '비밀번호를 입력해주세요', 400)
      }
      const match = await bcrypt.compare(body.guest_password, existing.guest_password)
      if (!match) {
        return apiError('4002', '비밀번호가 일치하지 않습니다', 403)
      }
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

    const nickname = existing.mem_idx ? session!.user!.nickname : will.guest_nickname
    return apiSuccess(
      mapWillRow({
        ...will,
        member: existing.mem_idx ? { mem_nickname: nickname } : null,
        guest_nickname: existing.mem_idx ? null : nickname,
      }),
    )
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}

// DELETE /api/will/[id] - 유언장 삭제 (soft delete)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()

  try {
    const supabase = createSupabaseServerClient()

    // 기존 유언장 조회
    const { data: existing } = await supabase
      .from('will')
      .select('mem_idx, guest_password')
      .eq('will_id', id)
      .eq('is_delete', 0)
      .single()

    if (!existing) {
      return apiError('5000', '유언장을 찾을 수 없습니다', 404)
    }

    // 권한 확인: 회원 글은 세션, 비회원 글은 비밀번호
    if (existing.mem_idx) {
      if (!session?.user?.memIdx || existing.mem_idx !== session.user.memIdx) {
        return apiError('4002', '삭제 권한이 없습니다', 403)
      }
    } else {
      const body = await req.json()
      if (!body.guest_password) {
        return apiError('4003', '비밀번호를 입력해주세요', 400)
      }
      const match = await bcrypt.compare(body.guest_password, existing.guest_password)
      if (!match) {
        return apiError('4002', '비밀번호가 일치하지 않습니다', 403)
      }
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
