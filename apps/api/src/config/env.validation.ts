import { plainToInstance, Transform, Type } from "class-transformer";
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

function toOptionalInt({ value }: { value: unknown }): number | undefined {
  if (value === "" || value === undefined || value === null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export class EnvSchema {
  @IsEnum(NodeEnv)
  @IsOptional()
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @Transform(toOptionalInt)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(65_535)
  @IsOptional()
  PORT: number = 3001;

  @IsString()
  DATABASE_URL!: string;

  @IsString()
  @IsOptional()
  FRONTEND_URL: string = "http://localhost:3000";

  @IsString()
  @IsOptional()
  BACKEND_URL?: string;

  @IsString()
  @IsOptional()
  GITHUB_USERNAME: string = "thalitapaiva";

  @IsString()
  @IsOptional()
  GITHUB_TOKEN?: string;

  @Transform(toOptionalInt)
  @Type(() => Number)
  @IsInt()
  @Min(60)
  @IsOptional()
  GITHUB_CACHE_TTL_SECONDS: number = 2700;

  @IsEnum(EmailProvider)
  @IsOptional()
  EMAIL_PROVIDER: EmailProvider = EmailProvider.Console;

  @IsString()
  @IsOptional()
  EMAIL_FROM: string = "portfolio@example.com";

  @IsString()
  @IsOptional()
  EMAIL_TO: string = "contact@example.com";

  @IsString()
  @IsOptional()
  RESEND_API_KEY?: string;

  @IsString()
  @IsOptional()
  SMTP_HOST?: string;

  @Transform(toOptionalInt)
  @Type(() => Number)
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

  @Transform(toOptionalInt)
  @Type(() => Number)
  @IsInt()
  @Min(1_000)
  @IsOptional()
  CONTACT_RATE_LIMIT_TTL_MS: number = 60_000;

  @Transform(toOptionalInt)
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  CONTACT_RATE_LIMIT_MAX: number = 5;

  @IsString()
  @IsOptional()
  LOG_LEVEL?: string;

  @IsUrl({ require_tld: false })
  @IsOptional()
  LINKEDIN_REDIRECT_URI?: string;
}

export function validateEnv(raw: Record<string, unknown>): EnvSchema {
  const normalized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value === "" || value === undefined || value === null) continue;
    normalized[key] = value;
  }

  const config = plainToInstance(EnvSchema, normalized, {
    enableImplicitConversion: true,
    exposeDefaultValues: true,
  });
  const errors = validateSync(config, {
    skipMissingProperties: true,
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
