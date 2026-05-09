import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // CRM webhook forwarding — implementation pending
  const body = await request.json()
  void body
  return NextResponse.json({ ok: true }, { status: 200 })
}
