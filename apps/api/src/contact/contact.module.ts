import { Module } from "@nestjs/common";

import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { EmailService } from "./email/email.service";
import { TurnstileService } from "./turnstile.service";

@Module({
  controllers: [ContactController],
  providers: [ContactService, EmailService, TurnstileService],
  exports: [ContactService],
})
export class ContactModule {}
