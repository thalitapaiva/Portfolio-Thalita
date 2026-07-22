import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { PortfolioProfileDto } from "@portfolio/types";

import { PortfolioService } from "./portfolio.service";

@ApiTags("portfolio")
@Controller("portfolio")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  @ApiOkResponse({ description: "Public portfolio profile content." })
  async get(): Promise<PortfolioProfileDto> {
    return this.portfolioService.getProfile();
  }
}
