import { NextRequest, NextResponse } from 'next/server'
import { createTradeLockerClient } from '@/lib/tradelocker-api'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, server } = body

    if (!email || !password || !server) {
      return NextResponse.json(
        { error: 'Missing required credentials' },
        { status: 400 }
      )
    }

    const client = createTradeLockerClient(server)
    const authResponse = await client.authenticate({
      email,
      password,
      server,
      account: parseInt(process.env.TRADELOCKER_ACCOUNT || '0'),
    })

    return NextResponse.json(authResponse)
  } catch (error) {
    console.error('Authentication error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    )
  }
}
