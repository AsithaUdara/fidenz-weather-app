import { handleAuth, handleLogin } from '@auth0/nextjs-auth0/edge';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Handles /api/auth/login, /api/auth/callback, /api/auth/logout, /api/auth/me
// Provide a custom login that requests the API audience so the session contains an access token usable by the backend
type AuthHandlerContext = { params: Promise<Record<string, string>> } | Record<string, unknown>;

const handlers = {
	async login(req: NextRequest, ctx: AuthHandlerContext) {
		// The edge SDK expects NextRequest/edge context; casts are limited and safe here.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return handleLogin(req as unknown as any, ctx as unknown as any, {
			authorizationParams: {
				audience: process.env.AUTH0_AUDIENCE,
				scope: 'openid profile email',
			},
		});
	},
};

export const GET = handleAuth(handlers);
export const POST = GET;
