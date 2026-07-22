import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { CacheModule } from "@nestjs/cache-manager";
import { LoggerModule } from "nestjs-pino";
import { join } from "node:path";

import { PrismaModule } from "./prisma/prisma.module";
import { HealthModule } from "./health/health.module";
import { PortfolioModule } from "./portfolio/portfolio.module";
import { ProjectsModule } from "./projects/projects.module";
import { SkillsModule } from "./skills/skills.module";
import { SocialLinksModule } from "./social-links/social-links.module";
import { GitHubModule } from "./github/github.module";
import { ContactModule } from "./contact/contact.module";
import { validateEnv } from "./config/env.validation";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // Load env from the monorepo root first, then fall back to the app dir.
      envFilePath: [
        join(process.cwd(), ".env"),
        join(process.cwd(), "..", "..", ".env"),
      ],
      validate: validateEnv,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.LOG_LEVEL ?? (process.env.NODE_ENV === "production" ? "info" : "debug"),
        transport:
          process.env.NODE_ENV === "production"
            ? undefined
            : {
                target: "pino-pretty",
                options: {
                  singleLine: true,
                  translateTime: "SYS:HH:MM:ss.l",
                  ignore: "pid,hostname,req.headers,res.headers",
                },
              },
        redact: {
          paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            'req.headers["x-forwarded-for"]',
            "*.password",
            "*.token",
            "*.turnstileToken",
          ],
          censor: "[REDACTED]",
        },
        customLogLevel: (_req, res, err) => {
          if (err || res.statusCode >= 500) return "error";
          if (res.statusCode >= 400) return "warn";
          return "info";
        },
      },
    }),
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: 60_000,
        limit: 120,
      },
    ]),
    CacheModule.register({
      isGlobal: true,
      ttl: 60_000,
      max: 500,
    }),
    PrismaModule,
    HealthModule,
    PortfolioModule,
    ProjectsModule,
    SkillsModule,
    SocialLinksModule,
    GitHubModule,
    ContactModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
