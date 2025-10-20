import { handleAuth, handleLogin } from '@auth0/nextjs-auth0/edge';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Next.js 15: params is now a Promise; await it before passing to handlers
const handlers = {
	async login(req: NextRequest, ctx: { params: Promise<{ auth0: string }> }) {
		const params = await ctx.params;
		// Request audience so we mint an API access token during login
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return handleLogin(req as any, { ...ctx, params } as any, {
			authorizationParams: {
				audience: process.env.AUTH0_AUDIENCE,
				scope: 'openid profile email',
			},
			returnTo: '/',
		});
	},
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = handleAuth(handlers as any);
export const POST = GET;
