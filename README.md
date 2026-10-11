# iFix365 (placeholder brand) – device repair site

## Local development

1. Start the API:
   ```sh
   cd server
   cp .env.example .env
   npm install
   npm run dev
   ```
2. In another terminal, start the client:
   ```sh
   cd client
   cp .env.example .env.local
   npm install
   npm run dev
   ```

The local Vite proxy forwards `/api` requests to `API_PROXY_TARGET` (default in
`client/.env.example`: `http://localhost:5000`). The client reads its API origin
from `VITE_API_URL`; it is empty locally so requests use the Vite proxy.
Repair bookings and contact form messages are sent to the configured admin
email through Resend and are not saved to a database. The database-backed admin
dashboard has been removed as part of this email-only flow.

## Deployment environment

Set `VITE_API_URL` in the client build environment (such as Vercel) to the
backend's public origin, for example `https://api.example.com`, without a
trailing slash. Leave it empty only when the API is served from the same origin
as the client. Deploy the Express API and configure `CLIENT_ORIGIN` to the
deployed client origin. Configure `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (a
sender address verified by Resend), and `ADMIN_EMAIL` on the API host. Never
put the Resend API key in the client environment.

Replace everything marked TODO(verify) with real business details. No reviews, address, stats or certifications are invented.
Images: drop licensed photos into client/public/img/ (hero.jpg etc). Missing images fall back to a styled placeholder.
