import { Injectable, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import type {
  ProjectDetailDto,
  ProjectSummaryDto,
  ProjectTechnologyDto,
} from "@portfolio/types";

import { PrismaService } from "../prisma/prisma.service";
import { GitHubService } from "../github/github.service";

type ProjectWithTech = Prisma.ProjectGetPayload<{
  include: { technologies: { include: { technology: true } } };
}>;

@Injectable()
export class ProjectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly github: GitHubService,
  ) {}

  async list(): Promise<ProjectSummaryDto[]> {
    const curated = await this.prisma.project.findMany({
      where: { published: true },
      orderBy: [{ displayOrder: "asc" }, { year: "desc" }, { title: "asc" }],
      include: { technologies: { include: { technology: true } } },
    });

    const curatedSummaries = curated.map((p) => this.toSummary(p));
    const curatedUrls = new Set(
      curated
        .map((p) => p.repositoryUrl?.toLowerCase())
        .filter((u): u is string => Boolean(u)),
    );
    const curatedSlugs = new Set(curated.map((p) => p.slug));

    let githubProjects: ProjectSummaryDto[] = [];
    try {
      const repos = await this.github.getAllPublicRepositories();
      githubProjects = repos
        .filter((repo) => !curatedUrls.has(repo.htmlUrl.toLowerCase()))
        .map((repo, index) => this.fromGitHubRepo(repo, curated.length + index + 1))
        .filter((p) => !curatedSlugs.has(p.slug));
    } catch {
      githubProjects = [];
    }

    return [...curatedSummaries, ...githubProjects];
  }

  async findBySlug(slug: string): Promise<ProjectDetailDto> {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: { technologies: { include: { technology: true } } },
    });
    if (project && project.published) {
      return this.toDetail(project);
    }

    if (slug.startsWith("gh-")) {
      const repoName = slug.slice(3);
      try {
        const repos = await this.github.getAllPublicRepositories();
        const repo = repos.find(
          (r) => r.name.toLowerCase() === repoName.toLowerCase(),
        );
        if (repo) {
          const summary = this.fromGitHubRepo(repo, 0);
          return {
            ...summary,
            fullDescription:
              repo.description?.trim() ||
              `Repositório público ${repo.fullName} sincronizado automaticamente a partir do GitHub.`,
            problem:
              "Projeto publicado no GitHub e exibido automaticamente neste portfólio.",
            contribution:
              "Código e evolução disponíveis no repositório — novos pushes atualizam esta seção após o cache da API.",
            published: true,
            createdAt: repo.updatedAt,
            updatedAt: repo.updatedAt,
          };
        }
      } catch {
        // fall through
      }
    }

    throw new NotFoundException(`Project not found: ${slug}`);
  }

  private fromGitHubRepo(
    repo: {
      id: number;
      name: string;
      fullName: string;
      description: string | null;
      htmlUrl: string;
      language: string | null;
      updatedAt: string;
      topics: string[];
    },
    displayOrder: number,
  ): ProjectSummaryDto {
    const year = new Date(repo.updatedAt).getFullYear();
    const techs: ProjectTechnologyDto[] = [];
    if (repo.language) {
      techs.push({
        isPrimary: true,
        technology: {
          id: `lang-${repo.language.toLowerCase()}`,
          name: repo.language,
          slug: repo.language.toLowerCase(),
          icon: repo.language.toLowerCase(),
        },
      });
    }
    for (const topic of repo.topics.slice(0, 4)) {
      techs.push({
        isPrimary: false,
        technology: {
          id: `topic-${topic}`,
          name: topic,
          slug: topic,
          icon: null,
        },
      });
    }

    return {
      id: `github-${repo.id}`,
      title: repo.name,
      slug: `gh-${repo.name}`,
      shortDescription:
        repo.description?.trim() ||
        `Repositório ${repo.fullName} sincronizado automaticamente do GitHub.`,
      year,
      coverUrl: null,
      repositoryUrl: repo.htmlUrl,
      liveUrl: null,
      featured: false,
      displayOrder,
      technologies: techs,
    };
  }

  private toSummary(project: ProjectWithTech): ProjectSummaryDto {
    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      year: project.year,
      coverUrl: project.coverUrl,
      repositoryUrl: project.repositoryUrl,
      liveUrl: project.liveUrl,
      featured: project.featured,
      displayOrder: project.displayOrder,
      technologies: this.mapTechnologies(project),
    };
  }

  private toDetail(project: ProjectWithTech): ProjectDetailDto {
    return {
      ...this.toSummary(project),
      fullDescription: project.fullDescription,
      problem: project.problem,
      contribution: project.contribution,
      published: project.published,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
    };
  }

  private mapTechnologies(project: ProjectWithTech): ProjectTechnologyDto[] {
    return project.technologies
      .map((pt) => ({
        isPrimary: pt.isPrimary,
        technology: {
          id: pt.technology.id,
          name: pt.technology.name,
          slug: pt.technology.slug,
          icon: pt.technology.icon,
        },
      }))
      .sort((a, b) => {
        if (a.isPrimary !== b.isPrimary) return a.isPrimary ? -1 : 1;
        return a.technology.name.localeCompare(b.technology.name);
      });
  }
}
