import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { ConsoleEmailProvider } from "./providers/console.provider";
import { ResendEmailProvider } from "./providers/resend.provider";
import { SmtpEmailProvider } from "./providers/smtp.provider";
import type { EmailMessage, EmailProvider } from "./email.types";

@Injectable()
export class EmailService implements OnModuleInit {
  private readonly logger = new Logger(EmailService.name);
  private provider: EmailProvider = new ConsoleEmailProvider();

  constructor(private readonly config: ConfigService) {}

  onModuleInit(): void {
    this.provider = this.resolveProvider();
    this.logger.log(`Email provider initialised: ${this.provider.name}`);
  }

  get providerName(): string {
    return this.provider.name;
  }

  async send(message: EmailMessage): Promise<void> {
    await this.provider.send(message);
  }

  private resolveProvider(): EmailProvider {
    const kind = (
      this.config.get<string>("EMAIL_PROVIDER") ?? "console"
    ).toLowerCase();

    switch (kind) {
      case "resend": {
        const apiKey = this.config.get<string>("RESEND_API_KEY");
        if (!apiKey) {
          this.logger.warn(
            "EMAIL_PROVIDER=resend but RESEND_API_KEY is missing — falling back to console provider.",
          );
          return new ConsoleEmailProvider();
        }
        return new ResendEmailProvider(apiKey);
      }
      case "smtp": {
        const host = this.config.get<string>("SMTP_HOST");
        const port = Number(this.config.get<string>("SMTP_PORT") ?? 587);
        if (!host) {
          this.logger.warn(
            "EMAIL_PROVIDER=smtp but SMTP_HOST is missing — falling back to console provider.",
          );
          return new ConsoleEmailProvider();
        }
        return new SmtpEmailProvider({
          host,
          port,
          user: this.config.get<string>("SMTP_USER"),
          pass: this.config.get<string>("SMTP_PASS"),
        });
      }
      case "console":
      default:
        return new ConsoleEmailProvider();
    }
  }
}
