# PredicPAU Backend

Express + TypeScript + Prisma (Postgres; Vercel-friendly).

## Quick start

```bash
cd backend
npm install

# copy env
copy .env.example .env

# start Postgres (requires Docker Desktop running)
docker compose up -d

# apply migrations + seed
npx prisma migrate deploy
npx prisma db seed

# run server
npm run dev
```

Health check:
- Local: `GET http://localhost:4000/health`
- Vercel: `GET https://<your-app>.vercel.app/api/health`

API (dev):
- `GET /api/markets`
- `GET /api/markets/:id`
- `GET /api/markets/:id/details`
- `GET /api/users/me`
- `GET /api/users/me/balance`
- `GET /api/portfolio/summary`
- `GET /api/portfolio/positions/active`
- `GET /api/portfolio/positions/closed`
- `GET /api/portfolio/trades`
- `GET /api/portfolio/payouts`
- `GET /api/achievements/summary`
- `GET /api/achievements/progress`
- `GET /api/achievements/badges?filter=all|earned|locked`
- `POST /api/trades/execute`

## Vercel deployment

Deploy the backend as a Vercel project with the **Root Directory** set to `backend/`.

Required env vars on Vercel:
- `DATABASE_URL` (Postgres connection string)
- `CORS_ORIGIN` (your frontend URL)

