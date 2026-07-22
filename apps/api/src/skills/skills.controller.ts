import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { SkillDto } from "@portfolio/types";

import { SkillsService } from "./skills.service";

@ApiTags("skills")
@Controller("skills")
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiOkResponse({
    description: "All skills, ordered by category and displayOrder.",
  })
  async list(): Promise<SkillDto[]> {
    return this.skillsService.list();
  }
}
