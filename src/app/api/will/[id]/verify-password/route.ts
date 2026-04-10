import { NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/supabase/helpers'
import bcrypt from 'bcryptjs'

// POST /api/will/[id]/verify-password - 비회원 글 비밀번호 확인
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  try {
    const body = await req.json()

    if (!body.password) {
      return apiError('4003', '비밀번호를 입력해주세요', 400)
    }

    const supabase = createSupabaseServerClient()

    const { data: existing } = await supabase
      .from('iidt_will')
      .select('mem_idx, guest_password')
      .eq('will_id', id)
      .eq('is_delete', 0)
      .single()

    if (!existing) {
      return apiError('5000', '유언장을 찾을 수 없습니다', 404)
    }

    if (existing.mem_idx) {
      return apiError('4003', '회원 글은 비밀번호 확인이 필요하지 않습니다', 400)
    }

    const match = await bcrypt.compare(body.password, existing.guest_password)

    if (!match) {
      return apiError('4002', '비밀번호가 일치하지 않습니다', 403)
    }

    return apiSuccess({ verified: true })
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}
