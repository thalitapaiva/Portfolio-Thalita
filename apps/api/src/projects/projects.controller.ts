import { Controller, Get, Param } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import type { ProjectDetailDto, ProjectSummaryDto } from "@portfolio/types";

import { ProjectsService } from "./projects.service";

@ApiTags("projects")
@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOkResponse({
    description: "List of published projects ordered by displayOrder.",
  })
  async list(): Promise<ProjectSummaryDto[]> {
    return this.projectsService.list();
  }

  @Get(":slug")
  @ApiParam({ name: "slug", description: "Project slug." })
  @ApiOkResponse({ description: "Full project detail by slug." })
  async findBySlug(@Param("slug") slug: string): Promise<ProjectDetailDto> {
    return this.projectsService.findBySlug(slug);
  }
}
