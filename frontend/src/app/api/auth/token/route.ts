import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0/edge';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Wrap with withApiAuthRequired to ensure user is authenticated
export const GET = withApiAuthRequired(async (req: NextRequest) => {
	try {
		// Dev: log configured audience so we can debug mismatches
		console.log('[dev] AUTH0_AUDIENCE=', process.env.AUTH0_AUDIENCE);
		
		// Create response object to pass to getAccessToken
		const res = new NextResponse();
		
		const { accessToken } = await getAccessToken(req, res, {
			scopes: ['openid', 'profile', 'email'],
			// Request an audience-specific token for the backend API so we can call it
			authorizationParams: {
				audience: process.env.AUTH0_AUDIENCE,
			},
		});
		
		// Only log presence, do NOT print the token value
		console.log('[dev] accessTokenPresent=', !!accessToken);
		
		if (!accessToken) {
			return NextResponse.json({ error: 'No access token' }, { status: 401 });
		}
		
		return NextResponse.json({ accessToken });
	} catch (err) {
		// Dev: surface the error message in server logs to aid debugging
		console.error('[dev] getAccessToken error:', (err as Error)?.message ?? err);
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}
});

