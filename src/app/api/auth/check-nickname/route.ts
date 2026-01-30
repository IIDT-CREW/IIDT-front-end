import { NextRequest, NextResponse } from 'next/server'
import { fetchServer } from '@/lib/fetch/server'

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')
  const { searchParams } = new URL(req.url)
  const mem_nickname = searchParams.get('mem_nickname')

  if (!mem_nickname) {
    return NextResponse.json(
      { code: '1001', reason: 'mem_nickname is required', result: null },
      { status: 400 }
    )
  }

  try {
    const response = await fetchServer('/api/oauth/checkDuplicateNickname', {
      method: 'GET',
      accessToken,
      params: { mem_nickname },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}
