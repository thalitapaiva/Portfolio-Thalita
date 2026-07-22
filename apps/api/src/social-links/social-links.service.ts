import { Injectable } from "@nestjs/common";
import type { SocialLinkDto } from "@portfolio/types";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SocialLinksService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<SocialLinkDto[]> {
    const links = await this.prisma.socialLink.findMany({
      orderBy: [{ displayOrder: "asc" }, { label: "asc" }],
    });
    return links.map((l) => ({
      id: l.id,
      label: l.label,
      url: l.url,
      platform: l.platform,
      displayOrder: l.displayOrder,
    }));
  }
}
