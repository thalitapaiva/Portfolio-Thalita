import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import type { GitHubProfileDto, GitHubRepoDto } from "@portfolio/types";

import { GitHubService } from "./github.service";

@ApiTags("integrations")
@Controller("integrations/github")
export class GitHubController {
  constructor(private readonly gitHubService: GitHubService) {}

  @Get("profile")
  @ApiOkResponse({
    description:
      "GitHub profile summary including language stats and curated repositories.",
  })
  async profile(): Promise<GitHubProfileDto> {
    return this.gitHubService.getProfile();
  }

  @Get("repositories")
  @ApiOkResponse({ description: "Curated list of GitHub repositories." })
  async repositories(): Promise<GitHubRepoDto[]> {
    return this.gitHubService.getRepositories();
  }
}
