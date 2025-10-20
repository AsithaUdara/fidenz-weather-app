// Deprecated: This route is intentionally disabled. The frontend must call the Express backend via /api/backend/weather.
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
  return new Response('Not Implemented', { status: 501 });
}
