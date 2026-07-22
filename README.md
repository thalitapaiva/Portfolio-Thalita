# Portfólio — Thalita Paiva

Monorepo profissional com frontend (Next.js) e backend (NestJS) para o portfólio de Thalita Paiva.

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 15 (App Router), React 19, Tailwind CSS, Motion, RHF + Zod, TanStack Query |
| Backend | NestJS, Prisma, PostgreSQL, Swagger, Helmet, Throttler |
| Monorepo | pnpm workspaces + Turborepo |
| Integrações | GitHub API (servidor), Resend/SMTP, Turnstile opcional |

## Estrutura

```
apps/
  web/          # Portfólio público (Vercel)
  api/          # API NestJS (Railway / Render / Docker)
packages/
  types/        # Contratos TypeScript compartilhados
  ui/           # Tokens e utilitários de UI
  eslint-config/
  tsconfig/
```

## Pré-requisitos

- Node.js 20+
- pnpm 9+
- Docker (para PostgreSQL local)

## Início rápido

```bash
# 1. Dependências
pnpm install

# 2. Variáveis de ambiente
cp .env.example .env
cp .env.example apps/api/.env
cp .env.example apps/web/.env.local

# 3. Banco de dados
pnpm docker:up
# Se preferir só o Postgres:
docker compose up -d postgres

# 4. Prisma
pnpm db:generate
pnpm --filter @portfolio/api prisma:migrate:dev
pnpm db:seed

# 5. Desenvolvimento (API :3001 + Web :3000)
pnpm dev
```

- Site: http://localhost:3000  
- API: http://localhost:3001/api  
- Swagger: http://localhost:3001/api/docs  
- Health: http://localhost:3001/api/health  

## Scripts

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Sobe web + api em paralelo |
| `pnpm build` | Build de todos os pacotes |
| `pnpm lint` | Lint |
| `pnpm test` | Testes unitários |
| `pnpm test:e2e` | Playwright (web) |
| `pnpm db:migrate` | Migrations em produção |
| `pnpm db:seed` | Seed inicial editável |
| `pnpm docker:up` / `docker:down` | Compose |

## Conteúdo editável

Todo o conteúdo profissional fica no banco (seed + Prisma Studio):

```bash
pnpm db:studio
```

Modelos principais: `PortfolioProfile`, `Project`, `Skill`, `SocialLink`, `GitHubRepositorySelection`.

Valores não confirmados publicamente usam o prefixo `[PLACEHOLDER]` no seed.

## Integrações

### GitHub

- Consumido **apenas no backend** com `GITHUB_TOKEN` opcional
- Cache ~45 min + fallback persistido em `GitHubCache`
- Seleção manual via `GitHubRepositorySelection`
- Token **nunca** vai para o frontend

### LinkedIn

- Prévia administrável no `PortfolioProfile.linkedIn`
- Link público: https://www.linkedin.com/in/thalita-paiva-1301a122b/
- Sem scraping; OIDC futuro via `LINKEDIN_CLIENT_*`

### Contato

- Validação FE + BE, honeypot, rate limit, sanitização
- Persistência em `ContactMessage`
- E-mail: `EMAIL_PROVIDER=console|resend|smtp`
- Turnstile opcional

## Deploy

### Frontend (Vercel)

1. Root Directory: `apps/web` (ou monorepo com filter)
2. Build: `pnpm --filter @portfolio/web build`
3. Env: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`

Arquivo: `apps/web/vercel.json`

### Backend (Railway / Render / Docker)

```bash
docker compose up -d --build
# ou deploy da imagem apps/api/Dockerfile
```

Env obrigatórias: `DATABASE_URL`, `FRONTEND_URL`, `BACKEND_URL`, `EMAIL_*`  
Opcionais: `GITHUB_TOKEN`, `RESEND_API_KEY`, `TURNSTILE_*`

Rodar migrations no release:

```bash
pnpm --filter @portfolio/api prisma:migrate
pnpm --filter @portfolio/api prisma:seed   # apenas na 1ª vez
```

## Segurança

- Helmet + CORS configurável
- Rate limiting global e no contato
- Honeypot + sanitização HTML
- IP hasheado nas mensagens
- Sem credenciais no repositório (`.env.example` apenas)

## Acessibilidade e SEO

- WCAG AA (contraste, foco, labels, modal com focus trap, `prefers-reduced-motion`)
- Metadata, Open Graph, Twitter Cards, sitemap, robots, manifest, JSON-LD Person
- Sem fotos pessoais; OG abstrato com a identidade visual

## Documentação adicional

- [apps/api/README.md](apps/api/README.md) — API e Swagger
- [apps/web/README.md](apps/web/README.md) — Frontend

## Licença

Código do portfólio para uso pessoal de Thalita Paiva.
