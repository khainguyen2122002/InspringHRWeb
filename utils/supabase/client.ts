import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key || url === 'undefined' || key === 'undefined') {
      return null as any
    }

    return createBrowserClient(url, key)
  } catch (e) {
    return null as any
  }
}
