import { createSupabaseServerClient } from '@/lib/supabase/server'
import { apiSuccess, apiError } from '@/lib/supabase/helpers'

export async function GET() {
  try {
    const supabase = createSupabaseServerClient()

    const { count, error } = await supabase
      .from('will')
      .select('*', { count: 'exact', head: true })
      .eq('is_delete', 0)
      .eq('is_private', 0)

    if (error) {
      return apiError('3000', error.message, 500)
    }

    return apiSuccess(count ?? 0)
  } catch {
    return apiError('9000', 'Internal server error', 500)
  }
}
