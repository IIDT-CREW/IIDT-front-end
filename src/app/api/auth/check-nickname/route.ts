import { NextRequest } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/supabase/helpers'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mem_nickname = searchParams.get('mem_nickname')

  if (!mem_nickname) {
    return apiError('1001', 'mem_nickname is required')
  }

  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.from('member').select('mem_idx').eq('mem_nickname', mem_nickname).limit(1)

    return apiSuccess({ IS_EXIST: (data?.length ?? 0) > 0 })
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}
