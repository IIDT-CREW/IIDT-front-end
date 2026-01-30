import { NextRequest, NextResponse } from 'next/server'
import { fetchServer } from '@/lib/fetch/server'

export async function GET(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const access_token = searchParams.get('access_token')
  const nickname = searchParams.get('nickname')

  try {
    const response = await fetchServer(`/api/oauth/signup/${provider}`, {
      method: 'GET',
      params: {
        code: code || undefined,
        access_token: access_token || undefined,
        nickname: nickname || undefined,
      },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}
