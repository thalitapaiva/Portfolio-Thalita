import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { HealthDto } from "@portfolio/types";

import { HealthService } from "./health.service";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOkResponse({
    description: "Liveness/readiness probe with database status.",
  })
  async check(): Promise<HealthDto> {
    return this.healthService.check();
  }
}
