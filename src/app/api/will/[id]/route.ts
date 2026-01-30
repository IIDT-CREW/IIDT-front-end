import { NextRequest, NextResponse } from 'next/server'
import { fetchServer } from '@/lib/fetch/server'

// GET /api/will/[id] - Get single will
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')

  try {
    const response = await fetchServer('/api/will/getWill', {
      method: 'GET',
      accessToken,
      params: { will_id: id },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}

// PUT /api/will/[id] - Update will
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')

  try {
    const body = await req.json()
    const response = await fetchServer('/api/will/updateWill', {
      method: 'POST',
      accessToken,
      body: { ...body, will_id: id },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}

// DELETE /api/will/[id] - Delete will
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const accessToken = req.headers.get('authorization')?.replace('Bearer ', '')

  try {
    const response = await fetchServer('/api/will/deleteWill', {
      method: 'POST',
      accessToken,
      body: { will_id: id },
    })

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { code: '9000', reason: 'Internal server error', result: null },
      { status: 500 }
    )
  }
}
