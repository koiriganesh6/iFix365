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

## Deployment environment

Set `VITE_API_URL` in the client build environment (such as Vercel) to the
backend's public origin, for example `https://api.example.com`, without a
trailing slash. Leave it empty only when the API is served from the same origin
as the client. The existing Express API must also be deployed and reachable;
configure its `CLIENT_ORIGIN` to the deployed client origin and provide its
required database and admin environment variables through the API host.

Replace everything marked TODO(verify) with real business details. No reviews, address, stats or certifications are invented.
Images: drop licensed photos into client/public/img/ (hero.jpg etc). Missing images fall back to a styled placeholder.
