import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError, mapWillRow } from '@/lib/supabase/helpers'

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.memIdx || session.user.memIdx === -1) {
    return apiError('4002', 'Unauthorized', 401)
  }

  const { searchParams } = new URL(req.url)
  const memIdx = parseInt(searchParams.get('memIdx') || String(session.user.memIdx))
  const pageNo = parseInt(searchParams.get('pageNo') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '10')
  const offset = (pageNo - 1) * pageSize

  try {
    const supabase = createSupabaseServerClient()

    // 전체 개수
    const { count } = await supabase
      .from('will')
      .select('*', { count: 'exact', head: true })
      .eq('mem_idx', memIdx)
      .eq('is_delete', 0)

    const totalCount = count ?? 0
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // 페이징 조회
    const { data, error } = await supabase
      .from('will')
      .select('*, member!inner(mem_nickname)')
      .eq('mem_idx', memIdx)
      .eq('is_delete', 0)
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
