import { Logger } from "@nestjs/common";
import type { EmailMessage, EmailProvider } from "../email.types";

export class ConsoleEmailProvider implements EmailProvider {
  readonly name = "console";
  private readonly logger = new Logger("ConsoleEmailProvider");

  async send(message: EmailMessage): Promise<void> {
    this.logger.log(
      `--- Contact email (console provider) ---\n` +
        `to:       ${message.to}\n` +
        `from:     ${message.from}\n` +
        (message.replyTo ? `replyTo:  ${message.replyTo}\n` : "") +
        `subject:  ${message.subject}\n` +
        `--------------------------------------\n` +
        `${message.text}\n` +
        `--------------------------------------`,
    );
  }
}
