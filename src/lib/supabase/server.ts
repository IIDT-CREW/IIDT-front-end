import { createClient } from '@supabase/supabase-js'

export const SUPABASE_SCHEMA = process.env.SUPABASE_SCHEMA || 'public'

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase server environment variables')
  }

  return createClient(url, serviceRoleKey, {
    db: { schema: SUPABASE_SCHEMA },
    auth: { persistSession: false },
  })
}
