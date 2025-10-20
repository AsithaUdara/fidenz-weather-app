# Fidenz Weather App

A secure full‑stack weather dashboard built with:
- Backend: Node.js, Express, TypeScript
- Frontend: Next.js App Router, React, Tailwind CSS
- Auth: Auth0 (login/logout, access control, MFA ready)

This app reads city codes, fetches weather from OpenWeatherMap, caches data for 5 minutes, and displays it in a responsive UI. Weather data is accessible only to authenticated users.

## Monorepo structure

- `backend/` Express API (secured with Auth0 Access Token when enabled)
- `frontend/` Next.js app (Auth0 login, protected API route, responsive UI)

## Prerequisites

- Node.js LTS 18+ installed
- Auth0 tenant and application
- OpenWeatherMap API key

## Setup

1) Clone and install dependencies

```
cd backend
npm ci
cd ../frontend
npm ci
```

2) Configure environment variables

Backend: copy `.env.example` to `.env` and fill in values.

```
PORT=5000
OPENWEATHER_API_KEY=your_openweather_api_key
AUTH0_DOMAIN=your-auth0-domain.us.auth0.com
AUTH0_AUDIENCE=https://fidenz-weather-api.com
```

Frontend: copy `.env.example` or `.env.local.example` to `.env.local` and fill in values.

```
AUTH0_SECRET=use-a-long-random-string
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain.us.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
# optional audience if you mint API tokens
# AUTH0_AUDIENCE=https://fidenz-weather-api.com
OPENWEATHER_API_KEY=your_openweather_api_key
```

3) Run apps locally

In one terminal:

```
cd backend
npm run dev
```

In another terminal:

```
cd frontend
npm run dev
```

Open http://localhost:3000. Click Login and authenticate. The frontend calls its server-side proxy `GET /api/backend/weather`, which forwards the request to the Express backend `/api/weather` with a valid Auth0 access token. The backend fetches OpenWeatherMap for the configured city codes and caches data for 5 minutes.

## Assignment coverage

- Reads city codes from JSON: `backend/data/cities.json` (backend service)
- Fetches weather via OpenWeatherMap endpoint id + apiKey
- Displays: city name, description, temp (plus extras like min/max, wind, etc.)
- Caching: 5 minutes
- Auth: Auth0 login/logout; weather API requires an authenticated session

## Auth0 configuration

1) In Auth0 Dashboard, create a Regular Web Application for the frontend.
- Allowed Callback URLs: `http://localhost:3000/api/auth/callback`
- Allowed Logout URLs: `http://localhost:3000`
- Allowed Web Origins: `http://localhost:3000`

2) (Optional) Create an API in Auth0 with Identifier `https://fidenz-weather-api.com` if you plan to mint access tokens for the Express backend. If you only use the Next.js route, the session is sufficient; the backend route is already protected and requires a valid token when enabled.

3) Enable MFA (email) in Auth0:
- Go to Security > Multi-factor Auth
- Turn on Email OTP (or another factor per requirement)

4) Restrict signups:
- Disable public signups in your Auth0 Database Connection settings (toggle off “Enable Sign Ups”)
- Pre-create a test user: `careers@fidenz.com` with password `Pass#fidenz`

## Notes

- Frontend -> Backend proxy: the frontend exposes `src/app/api/backend/weather/route.ts` which injects the Auth0 access token and forwards to the Express backend. The internal Next.js weather route has been removed to keep a clean separation between web app and API as required by the assignment.
- The backend exposes `/api/weather` protected by JWT middleware. Ensure the Auth0 audience/issuer match your Auth0 API settings.

## Troubleshooting

- 401 Unauthorized on /api/backend/weather: ensure you are logged in; verify Auth0 env vars in `frontend/.env.local` and `AUTH0_AUDIENCE` is set when minting API tokens.
- 500 Missing OPENWEATHER_API_KEY: set the key in `backend/.env` (the backend calls OpenWeatherMap).
- CORS issues (when using Express backend directly): update `backend/src/app.ts` CORS origin to match your frontend origin.

## License

This repository is for assessment purposes.
