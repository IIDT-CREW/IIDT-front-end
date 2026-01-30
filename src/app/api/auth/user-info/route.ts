import { NextRequest, NextResponse } from 'next/server'
import { fetchServer } from '@/lib/fetch/server'

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')

  try {
    const response = await fetchServer('/api/oauth/userInfo', {
      method: 'GET',
      accessToken,
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}
