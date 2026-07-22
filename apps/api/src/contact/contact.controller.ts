import { Body, Controller, Headers, Ip, Post } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Throttle } from "@nestjs/throttler";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
} from "@nestjs/swagger";
import type { ContactResponseDto } from "@portfolio/types";

import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";

@ApiTags("contact")
@Controller("contact")
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly config: ConfigService,
  ) {}

  @Post()
  @Throttle({
    default: {
      ttl: Number(process.env.CONTACT_RATE_LIMIT_TTL_MS ?? 60_000),
      limit: Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5),
    },
  })
  @ApiCreatedResponse({ description: "Contact submission accepted." })
  @ApiBadRequestResponse({
    description: "Invalid payload or anti-spam verification failed.",
  })
  @ApiTooManyRequestsResponse({
    description: "Contact rate limit exceeded for this IP.",
  })
  async submit(
    @Body() dto: CreateContactDto,
    @Ip() ip: string,
    @Headers("user-agent") userAgent?: string,
  ): Promise<ContactResponseDto> {
    void this.config; // kept for future use (per-env behaviour)
    return this.contactService.submit(dto, { ip, userAgent });
  }
}
