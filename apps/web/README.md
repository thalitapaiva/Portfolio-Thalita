# @portfolio/web

Frontend Next.js 15 (App Router) do portfólio da Thalita Paiva.

## Stack

- **Next.js 15** com App Router + React 19
- **TypeScript** modo estrito (`@portfolio/tsconfig/nextjs`)
- **Tailwind CSS 3** com design tokens em `globals.css`
- **Framer Motion** para micro-interações (respeitando `prefers-reduced-motion`)
- **React Hook Form** + **Zod** para o formulário de contato
- **TanStack Query** disponível para dados client-side
- **Radix Primitives** + implementações locais em `components/ui`
- **Lucide Icons**
- **Roboto** e **Roboto Mono** via `next/font`

## Estrutura

```
src/
  app/
    layout.tsx            # Root layout com fontes, providers, skip link
    page.tsx              # Home (server component) — busca tudo em paralelo
    providers.tsx         # QueryClientProvider
    projetos/[slug]/      # Página dedicada de cada projeto (ISR + generateStaticParams)
    privacidade/          # Placeholder da política de privacidade
    sitemap.ts, robots.ts, manifest.ts
    opengraph-image.tsx   # OG abstrato gerado com brand colors (sem foto)
    globals.css           # Design tokens + reset
  components/
    layout/               # SiteHeader, SiteFooter, MobileNav
    sections/             # Hero, About, Skills, Projects, GitHub, LinkedIn, Contact
    projects/             # ProjectCard, ProjectModal
    integrations/         # GitHubStats, GitHubRepoCard, LinkedInCard
    forms/                # ContactForm (RHF + Zod + honeypot + Turnstile opcional)
    shared/               # SectionHeading, TechCanvas, CopyEmailButton,
                          # ScrollReveal, EmptyState, ErrorState, LoadingSkeleton
    ui/                   # button, dialog, input, textarea, label, skeleton, badge
  lib/                    # api.ts, cn.ts, constants.ts, env.ts, format.ts, seo.ts
  hooks/                  # useActiveSection, useReducedMotion, useCopyToClipboard
  schemas/                # contact.ts (Zod)
```

## Fonte dos dados

O app consome o backend do monorepo (`@portfolio/api`) via `NEXT_PUBLIC_API_URL`.
Todos os endpoints do lado do servidor usam ISR:

| Endpoint            | Uso                     | `revalidate` |
| ------------------- | ----------------------- | ------------ |
| `GET /profile`      | Perfil, hero, sobre     | 15 min       |
| `GET /skills`       | Competências            | 60 min       |
| `GET /projects`     | Cards + `generateStaticParams` | 15 min |
| `GET /projects/:s`  | Detalhe                 | 15 min       |
| `GET /github`       | Estatísticas + repos    | 30 min       |
| `GET /social-links` | Footer + contato        | 60 min       |
| `POST /contact`     | Formulário              | —            |

Todas as chamadas do server são envelopadas em `safe(...)`, que retorna um valor de
fallback vazio (`null` / `[]`) quando o backend está fora do ar. Cada seção sabe
lidar com esse estado (`EmptyState`, `ErrorState`, skeletons).

Nunca chamamos o GitHub direto do browser com token; toda a integração passa pelo
backend, que cacheia com `GITHUB_CACHE_TTL_SECONDS`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TURNSTILE_SITE_KEY=   # opcional
```

## Scripts

```bash
pnpm dev         # Next dev (porta 3000)
pnpm build       # Build de produção
pnpm start       # Servir build
pnpm lint        # ESLint (config do Next)
pnpm typecheck   # tsc --noEmit
pnpm test        # Vitest (unit)
pnpm test:e2e    # Playwright (smoke)
```

O comando `pnpm dev` na raiz do monorepo (`turbo run dev --parallel`) já inclui esse
app junto com a API.

## Design System

Tokens em `src/app/globals.css`:

- Navy `#1C2B3E`, Blue `#3C678E` / `#2181BD` (primário) / `#6DADD8` / `#80CBF3`
- Background `#F7FAFC`, Surface `#FFFFFF`, Border `#DCE6EE`
- Texto: primary `#1C2B3E`, secondary `#526477`
- Border-radius 12–20px; container até 1280px; sombras suaves
- Animações 150–400ms com `cubic-bezier(0.4, 0, 0.2, 1)`; tudo respeita
  `prefers-reduced-motion` (via CSS + `useReducedMotion` do Framer Motion)

Fontes: Roboto para UI; Roboto Mono para labels/tags/tech.

## Acessibilidade

- Estrutura semântica: `header`, `main`, `section` com `aria-labelledby`
- Skip link para o conteúdo principal
- Foco visível global (`:focus-visible`)
- Dialog acessível (Radix) com trap de foco
- Todos os links externos indicam abertura em nova aba (`sr-only`)
- Formulário com labels reais, mensagens de erro anunciáveis (`aria-live`)
- Estados `aria-busy` em skeletons e `role="status"` em feedback

## Testes

- **Vitest + Testing Library**: `Button` (comportamento + a11y) e `contactSchema`
  (regras de validação e honeypot).
- **Playwright**: smoke da home cobrindo render, validação e submit do form
  (com API mockada via `page.route`).

Rode `pnpm test` e `pnpm test:e2e` respectivamente. O Playwright sobe o `next dev`
automaticamente, a menos que você defina `E2E_BASE_URL`.

## SEO

- `generateMetadata` no root e nos projetos, com título/descrição vindos do backend
- OG dinâmico em `/opengraph-image` (visual abstrato, brand colors, sem foto)
- `sitemap.ts` e `robots.ts`
- JSON-LD do tipo `Person` renderizado na home
- Language `pt-BR` em `<html>`
