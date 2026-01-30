import { NextRequest, NextResponse } from 'next/server'
import { fetchServer } from '@/lib/fetch/server'

export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')
  const { searchParams } = new URL(req.url)
  const memIdx = searchParams.get('memIdx')
  const pageNo = searchParams.get('pageNo') || '1'
  const pageSize = searchParams.get('pageSize') || '10'

  if (!memIdx) {
    return NextResponse.json(
      { code: '1001', reason: 'memIdx is required', result: null },
      { status: 400 }
    )
  }

  try {
    const response = await fetchServer('/api/will/getMyWill', {
      method: 'GET',
      accessToken,
      params: { memIdx, pageNo, pageSize },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}
