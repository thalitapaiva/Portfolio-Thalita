# @portfolio/api

NestJS backend that powers Thalita Paiva's portfolio site.

## Stack

- NestJS 10 + TypeScript (strict)
- Prisma ORM + PostgreSQL
- Swagger / OpenAPI at `/api/docs`
- `class-validator` + `class-transformer` for DTO validation
- Helmet, CORS, `@nestjs/throttler` rate limiting
- `@nestjs/cache-manager` for GitHub API caching
- Structured logs via `nestjs-pino`
- Jest for unit tests

## Environment

Environment variables live in the **repo root `.env`** (see `.env.example` at the
monorepo root). The API reads them via `@nestjs/config` — no separate `.env`
file inside `apps/api` is required. Key variables:

| Variable                     | Purpose                                              |
| ---------------------------- | ---------------------------------------------------- |
| `DATABASE_URL`               | Postgres connection string                           |
| `PORT`                       | HTTP port (default `3001`)                           |
| `FRONTEND_URL`               | Allowed CORS origin                                  |
| `GITHUB_USERNAME`            | GitHub handle used for integrations                  |
| `GITHUB_TOKEN`               | Optional GitHub token (server-only, never exposed)   |
| `GITHUB_CACHE_TTL_SECONDS`   | Cache TTL for GitHub responses (default `2700`)      |
| `EMAIL_PROVIDER`             | `console` \| `resend` \| `smtp`                      |
| `EMAIL_FROM` / `EMAIL_TO`    | Sender / receiver addresses for contact emails       |
| `RESEND_API_KEY`             | Required when `EMAIL_PROVIDER=resend`                |
| `SMTP_HOST` / `SMTP_PORT`... | Required when `EMAIL_PROVIDER=smtp`                  |
| `TURNSTILE_SECRET_KEY`       | Optional Cloudflare Turnstile secret                 |
| `CONTACT_RATE_LIMIT_TTL_MS`  | Contact rate-limit window (ms, default `60000`)      |
| `CONTACT_RATE_LIMIT_MAX`     | Contact submissions per window (default `5`)         |

## Scripts

```bash
pnpm --filter @portfolio/api dev            # nest start --watch
pnpm --filter @portfolio/api build          # compile to dist/
pnpm --filter @portfolio/api start:prod     # node dist/main.js
pnpm --filter @portfolio/api test           # jest
pnpm --filter @portfolio/api typecheck      # tsc --noEmit
pnpm --filter @portfolio/api prisma:generate
pnpm --filter @portfolio/api prisma:migrate
pnpm --filter @portfolio/api prisma:seed
```

From the monorepo root the shortcuts `pnpm db:generate`, `pnpm db:migrate`,
`pnpm db:seed`, and `pnpm db:studio` proxy through to the API workspace.

## First-time setup

```bash
pnpm docker:up                 # start Postgres
pnpm db:generate               # generate Prisma client
pnpm --filter @portfolio/api prisma:migrate:dev   # create + apply the initial migration
pnpm db:seed                   # load Thalita's real public profile data
pnpm --filter @portfolio/api dev
```

Open Swagger at http://localhost:3001/api/docs.

## Endpoints

All endpoints share the global prefix `/api`:

- `GET  /api/portfolio`                       — profile + LinkedIn preview
- `GET  /api/projects`                        — published projects, ordered
- `GET  /api/projects/:slug`                  — full project detail
- `GET  /api/skills`                          — grouped by category
- `GET  /api/social-links`                    — public social links
- `GET  /api/integrations/github/profile`     — GitHub profile summary + language stats
- `GET  /api/integrations/github/repositories`— curated repositories
- `POST /api/contact`                         — contact form (honeypot + rate limit)
- `GET  /api/health`                          — liveness + DB check

## Notes

- The GitHub integration caches responses for `GITHUB_CACHE_TTL_SECONDS` and
  persists the last good payload to `GitHubCache` for graceful fallback when
  the GitHub API is unreachable or rate-limited.
- The contact endpoint sanitises HTML from the message, honours a `website`
  honeypot (responds success silently when filled), and optionally verifies a
  Cloudflare Turnstile token when `TURNSTILE_SECRET_KEY` is set.
- The GitHub token is never exposed in any response — it is only used for the
  server-side `Authorization` header.
