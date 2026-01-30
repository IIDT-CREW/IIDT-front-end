import { NextRequest, NextResponse } from 'next/server'
import { fetchServer } from '@/lib/fetch/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { code: '1001', reason: 'code is required', result: null },
      { status: 400 }
    )
  }

  try {
    const response = await fetchServer(`/api/oauth/callback/${provider}`, {
      method: 'GET',
      params: { code },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}
