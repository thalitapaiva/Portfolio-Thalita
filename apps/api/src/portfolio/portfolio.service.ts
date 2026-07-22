import { Injectable, NotFoundException } from "@nestjs/common";
import type {
  LinkedInPreviewDto,
  PortfolioProfileDto,
  WorkPrincipleDto,
} from "@portfolio/types";
import type { PortfolioProfile } from "@prisma/client";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(): Promise<PortfolioProfileDto> {
    const profile = await this.prisma.portfolioProfile.findFirst({
      orderBy: { updatedAt: "desc" },
    });
    if (!profile) {
      throw new NotFoundException(
        "Portfolio profile is not seeded yet. Run `pnpm db:seed`.",
      );
    }
    return this.toDto(profile);
  }

  private toDto(profile: PortfolioProfile): PortfolioProfileDto {
    return {
      id: profile.id,
      fullName: profile.fullName,
      monogram: profile.monogram,
      heroLabel: profile.heroLabel,
      headline: profile.headline,
      shortBio: profile.shortBio,
      aboutContent: profile.aboutContent,
      education: profile.education,
      interests: profile.interests,
      workStyle: profile.workStyle,
      goals: profile.goals,
      email: profile.email,
      location: profile.location,
      workPrinciples: this.parseWorkPrinciples(profile.workPrinciples),
      linkedIn: this.parseLinkedIn(profile.linkedIn),
      seoTitle: profile.seoTitle,
      seoDescription: profile.seoDescription,
      updatedAt: profile.updatedAt.toISOString(),
    };
  }

  private parseWorkPrinciples(raw: unknown): WorkPrincipleDto[] {
    if (!Array.isArray(raw)) return [];
    return raw
      .filter(
        (item): item is { title: unknown; description: unknown } =>
          typeof item === "object" && item !== null,
      )
      .map((item) => ({
        title: String(item.title ?? ""),
        description: String(item.description ?? ""),
      }))
      .filter((item) => item.title.length > 0);
  }

  private parseLinkedIn(raw: unknown): LinkedInPreviewDto {
    const fallback: LinkedInPreviewDto = {
      name: "",
      headline: "",
      summary: "",
      skills: [],
      profileUrl: "",
    };
    if (!raw || typeof raw !== "object") return fallback;
    const value = raw as Record<string, unknown>;
    return {
      name: String(value.name ?? fallback.name),
      headline: String(value.headline ?? fallback.headline),
      summary: String(value.summary ?? fallback.summary),
      skills: Array.isArray(value.skills)
        ? value.skills.map((s) => String(s))
        : fallback.skills,
      profileUrl: String(value.profileUrl ?? fallback.profileUrl),
    };
  }
}
