import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'MISSING'
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'MISSING'

  // Only show partial anon key for security
  const anonKeyPreview = anonKey !== 'MISSING'
    ? `${anonKey.substring(0, 20)}...${anonKey.substring(anonKey.length - 10)}`
    : 'MISSING'

  return NextResponse.json({
    supabaseUrl,
    anonKeyPreview,
    urlIsCorrect: supabaseUrl === 'https://qqkilpcifglxhqoblkgj.supabase.co',
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  })
}
