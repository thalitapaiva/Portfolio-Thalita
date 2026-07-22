import { Injectable, NotFoundException } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import type {
  ProjectDetailDto,
  ProjectSummaryDto,
  ProjectTechnologyDto,
} from "@portfolio/types";

import { PrismaService } from "../prisma/prisma.service";

type ProjectWithTech = Prisma.ProjectGetPayload<{
  include: { technologies: { include: { technology: true } } };
}>;

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<ProjectSummaryDto[]> {
    const projects = await this.prisma.project.findMany({
      where: { published: true },
      orderBy: [{ displayOrder: "asc" }, { year: "desc" }, { title: "asc" }],
      include: { technologies: { include: { technology: true } } },
    });
    return projects.map((p) => this.toSummary(p));
  }

  async findBySlug(slug: string): Promise<ProjectDetailDto> {
    const project = await this.prisma.project.findUnique({
      where: { slug },
      include: { technologies: { include: { technology: true } } },
    });
    if (!project || !project.published) {
      throw new NotFoundException(`Project not found: ${slug}`);
    }
    return this.toDetail(project);
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
