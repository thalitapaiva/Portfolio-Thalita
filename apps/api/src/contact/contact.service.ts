import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { ContactResponseDto } from "@portfolio/types";

import { PrismaService } from "../prisma/prisma.service";
import { hashIp } from "../common/utils/hash";
import { sanitizePlainText } from "../common/utils/sanitize";
import { CreateContactDto } from "./dto/create-contact.dto";
import { EmailService } from "./email/email.service";
import { TurnstileService } from "./turnstile.service";

export interface ContactRequestMetadata {
  ip?: string | null;
  userAgent?: string | null;
}

const SILENT_SUCCESS: ContactResponseDto = {
  success: true,
  message: "Mensagem recebida. Obrigada pelo contato!",
};

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly email: EmailService,
    private readonly turnstile: TurnstileService,
    private readonly config: ConfigService,
  ) {}

  async submit(
    dto: CreateContactDto,
    meta: ContactRequestMetadata = {},
  ): Promise<ContactResponseDto> {
    // Honeypot: pretend everything is fine but do not persist or send.
    if (dto.website && dto.website.trim().length > 0) {
      this.logger.debug("Contact submission dropped by honeypot");
      return SILENT_SUCCESS;
    }

    if (this.turnstile.isEnabled()) {
      const ok = await this.turnstile.verify(
        dto.turnstileToken,
        meta.ip ?? undefined,
      );
      if (!ok) {
        throw new BadRequestException(
          "Falha na verificação anti-spam. Tente novamente.",
        );
      }
    }

    const cleanMessage = sanitizePlainText(dto.message, { maxLength: 5_000 });
    const cleanSubject = sanitizePlainText(dto.subject, { maxLength: 200 });
    const cleanName = sanitizePlainText(dto.name, { maxLength: 120 });
    const cleanCompany = dto.company
      ? sanitizePlainText(dto.company, { maxLength: 200 })
      : undefined;

    if (cleanMessage.length < 10) {
      throw new BadRequestException(
        "A mensagem parece muito curta após limpeza. Escreva um pouco mais.",
      );
    }

    try {
      const saved = await this.prisma.contactMessage.create({
        data: {
          name: cleanName,
          email: dto.email.toLowerCase(),
          subject: cleanSubject,
          message: cleanMessage,
          company: cleanCompany,
          ipHash: hashIp(meta.ip),
          userAgent: meta.userAgent ?? undefined,
        },
        select: { id: true, createdAt: true },
      });

      await this.deliverEmail({
        id: saved.id,
        name: cleanName,
        email: dto.email,
        subject: cleanSubject,
        message: cleanMessage,
        company: cleanCompany,
      });

      this.logger.log(
        `Contact message stored id=${saved.id} at=${saved.createdAt.toISOString()}`,
      );

      return {
        success: true,
        message:
          "Mensagem recebida com sucesso! Vou responder no e-mail informado assim que possível.",
      };
    } catch (err) {
      this.logger.error(
        `Contact submission failed: ${(err as Error).message}`,
        (err as Error).stack,
      );
      throw new InternalServerErrorException(
        "Não foi possível processar sua mensagem agora. Tente novamente em alguns instantes.",
      );
    }
  }

  private async deliverEmail(payload: {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    company?: string;
  }): Promise<void> {
    const from =
      this.config.get<string>("EMAIL_FROM") ?? "portfolio@example.com";
    const to = this.config.get<string>("EMAIL_TO") ?? "contact@example.com";

    const lines = [
      `Novo contato pelo portfólio (id: ${payload.id})`,
      "",
      `Nome:    ${payload.name}`,
      `E-mail:  ${payload.email}`,
      payload.company ? `Empresa: ${payload.company}` : undefined,
      `Assunto: ${payload.subject}`,
      "",
      "Mensagem:",
      payload.message,
    ].filter(Boolean) as string[];

    try {
      await this.email.send({
        from,
        to,
        replyTo: payload.email,
        subject: `[Portfólio] ${payload.subject}`,
        text: lines.join("\n"),
      });
    } catch (err) {
      // We already persisted the message, so degrade gracefully — log but
      // don't fail the user's submission for a delivery hiccup.
      this.logger.error(
        `Email delivery failed for contact ${payload.id}: ${(err as Error).message}`,
      );
    }
  }
}
