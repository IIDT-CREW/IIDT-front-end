import { NextRequest, NextResponse } from 'next/server'
import { fetchServer } from '@/lib/fetch/server'

// GET /api/will - Get will list
export async function GET(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')
  const { searchParams } = new URL(req.url)
  const pageNo = searchParams.get('pageNo') || '1'
  const pageSize = searchParams.get('pageSize') || '10'

  try {
    const response = await fetchServer('/api/will/getWillList', {
      method: 'GET',
      accessToken,
      params: { pageNo, pageSize },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}

// POST /api/will - Create will
export async function POST(req: NextRequest) {
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')

  try {
    const body = await req.json()
    const response = await fetchServer('/api/will/insertWill', {
      method: 'POST',
      accessToken,
      body,
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}
