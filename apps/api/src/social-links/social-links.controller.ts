import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { SocialLinkDto } from "@portfolio/types";

import { SocialLinksService } from "./social-links.service";

@ApiTags("social-links")
@Controller("social-links")
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Get()
  @ApiOkResponse({ description: "Public social links ordered by displayOrder." })
  async list(): Promise<SocialLinkDto[]> {
    return this.socialLinksService.list();
  }
}
