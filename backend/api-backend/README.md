# NeoxMeet API

Secure NestJS backend for NeoxMeet with token-based authentication and Prisma persistence.

## Environment

Copy `.env.example` to `.env` and fill in secrets:

- `DATABASE_URL` — PostgreSQL connection string.
- `REDIS_URL` — Redis connection string.
- `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET` — JWT signing secrets.
- `JWT_ACCESS_TTL_SECONDS` / `JWT_REFRESH_TTL_SECONDS` — token lifetimes in seconds.
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET` — LiveKit credentials.
- Optional: `OPENAI_API_KEY`, `ELEVENLABS_API_KEY`.

## Running locally

```bash
npm install
npm run prisma:generate
npm run start:dev
```

API defaults to `http://localhost:3001`. The register flow is available at `POST /auth/register` and requires the environment variables above.

## Testing

```bash
# unit tests
npm test

# e2e tests
npm run test:e2e
```
