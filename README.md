# Tensorspark Dynamics

Next.js (App Router) site. Every screen is a real route; there is no Vite entry, no `createRoot`
and no client-side tab switching.

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/products` | AI products |
| `/careers`, `/careers/three-month`, `/careers/fifteen-day` | Careers |
| `/agency`, `/agency/[service]` | Growth agency + 8 service pages |
| `/analytics` | Analytics |
| `/dashboard` | Applicant tracker |
| `/contact`, `/account` | Contact, account |

`/internships` redirects to `/careers`; `/offer-letter` redirects to `/dashboard`.
API routes live in `app/api/*` (Next Route Handlers; the old Express `server.ts` was removed).

## Run

```
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```
