import { Logger } from "@nestjs/common";
import { createTransport, type Transporter } from "nodemailer";
import type { EmailMessage, EmailProvider } from "../email.types";

export interface SmtpConfig {
  host: string;
  port: number;
  user?: string;
  pass?: string;
}

export class SmtpEmailProvider implements EmailProvider {
  readonly name = "smtp";
  private readonly logger = new Logger("SmtpEmailProvider");
  private readonly transporter: Transporter;

  constructor(config: SmtpConfig) {
    this.transporter = createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth:
        config.user && config.pass
          ? { user: config.user, pass: config.pass }
          : undefined,
    });
  }

  async send(message: EmailMessage): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: message.from,
        to: message.to,
        replyTo: message.replyTo,
        subject: message.subject,
        text: message.text,
        html: message.html,
      });
    } catch (err) {
      this.logger.error(
        `SMTP delivery failed: ${(err as Error).message}`,
      );
      throw err;
    }
  }
}
