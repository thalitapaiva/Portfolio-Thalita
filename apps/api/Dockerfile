# syntax=docker/dockerfile:1.7
# Multi-stage Dockerfile for the NestJS portfolio API.
# Built from the monorepo root context so it can access packages/*.

FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /workspace

# ---------------------------
# Deps stage: install everything for the api workspace
# ---------------------------
FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* .npmrc* ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/package.json
RUN pnpm install --frozen-lockfile || pnpm install

# ---------------------------
# Build stage: compile TS + prisma generate
# ---------------------------
FROM base AS build
COPY --from=deps /workspace/node_modules ./node_modules
COPY --from=deps /workspace/packages ./packages
COPY package.json pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/api ./apps/api
WORKDIR /workspace/apps/api
RUN --mount=type=cache,target=/root/.npm \
    pnpm --filter @portfolio/types build && \
    pnpm exec prisma generate && \
    pnpm build

# ---------------------------
# Runtime stage: small production image
# ---------------------------
FROM node:22-alpine AS runtime
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /workspace/apps/api/package.json ./package.json
COPY --from=build /workspace/apps/api/dist ./dist
COPY --from=build /workspace/apps/api/prisma ./prisma
COPY --from=build /workspace/apps/api/node_modules ./node_modules
COPY --from=build /workspace/packages ./packages
COPY --from=build /workspace/node_modules ./node_modules

EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- http://127.0.0.1:${PORT:-3001}/api/health || exit 1

CMD ["node", "dist/main.js"]
