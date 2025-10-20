import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAccessToken } from '@auth0/nextjs-auth0/edge';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, ctx: any) {
  try {
    // Retrieve API access token from the session (requires AUTH0_AUDIENCE to be set)
    const { accessToken } = await getAccessToken(req, ctx, {
      authorizationParams: { audience: process.env.AUTH0_AUDIENCE },
    });
    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const backendBase = process.env.BACKEND_URL || 'http://localhost:5000';
    const res = await fetch(`${backendBase}/api/weather`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Backend error' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
