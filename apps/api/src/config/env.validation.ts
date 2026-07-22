import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  validateSync,
} from "class-validator";

export enum NodeEnv {
  Development = "development",
  Production = "production",
  Test = "test",
}

export enum EmailProvider {
  Console = "console",
  Resend = "resend",
  Smtp = "smtp",
}

export class EnvSchema {
  @IsEnum(NodeEnv)
  @IsOptional()
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @IsInt()
  @Min(1)
  @Max(65_535)
  @IsOptional()
  PORT = 3001;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  @IsOptional()
  FRONTEND_URL = "http://localhost:3000";

  @IsString()
  @IsOptional()
  BACKEND_URL?: string;

  @IsString()
  @IsOptional()
  GITHUB_USERNAME = "thalitapaiva";

  @IsString()
  @IsOptional()
  GITHUB_TOKEN?: string;

  @IsInt()
  @Min(60)
  @IsOptional()
  GITHUB_CACHE_TTL_SECONDS = 2700;

  @IsEnum(EmailProvider)
  @IsOptional()
  EMAIL_PROVIDER: EmailProvider = EmailProvider.Console;

  @IsString()
  @IsOptional()
  EMAIL_FROM = "portfolio@example.com";

  @IsString()
  @IsOptional()
  EMAIL_TO = "contact@example.com";

  @IsString()
  @IsOptional()
  RESEND_API_KEY?: string;

  @IsString()
  @IsOptional()
  SMTP_HOST?: string;

  @IsInt()
  @IsOptional()
  SMTP_PORT?: number;

  @IsString()
  @IsOptional()
  SMTP_USER?: string;

  @IsString()
  @IsOptional()
  SMTP_PASS?: string;

  @IsString()
  @IsOptional()
  TURNSTILE_SECRET_KEY?: string;

  @IsInt()
  @Min(1_000)
  @IsOptional()
  CONTACT_RATE_LIMIT_TTL_MS = 60_000;

  @IsInt()
  @Min(1)
  @IsOptional()
  CONTACT_RATE_LIMIT_MAX = 5;

  @IsString()
  @IsOptional()
  LOG_LEVEL?: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  LINKEDIN_REDIRECT_URI?: string;
}

export function validateEnv(raw: Record<string, unknown>): EnvSchema {
  const config = plainToInstance(EnvSchema, raw, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(config, {
    skipMissingProperties: false,
    whitelist: false,
  });
  if (errors.length > 0) {
    const message = errors
      .map((e) => `${e.property}: ${Object.values(e.constraints ?? {}).join(", ")}`)
      .join(" | ");
    throw new Error(`Invalid environment configuration → ${message}`);
  }
  return config;
}
