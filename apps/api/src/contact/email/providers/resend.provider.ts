import { Logger } from "@nestjs/common";
import { Resend } from "resend";
import type { EmailMessage, EmailProvider } from "../email.types";

export class ResendEmailProvider implements EmailProvider {
  readonly name = "resend";
  private readonly logger = new Logger("ResendEmailProvider");
  private readonly client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(message: EmailMessage): Promise<void> {
    const { error } = await this.client.emails.send({
      from: message.from,
      to: [message.to],
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
    if (error) {
      this.logger.error(`Resend delivery failed: ${error.message}`);
      throw new Error(`Resend failed: ${error.message}`);
    }
  }
}
