import { Injectable } from "@nestjs/common";
import type { SkillDto } from "@portfolio/types";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SkillsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<SkillDto[]> {
    const skills = await this.prisma.skill.findMany({
      orderBy: [{ category: "asc" }, { displayOrder: "asc" }, { name: "asc" }],
    });
    return skills.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      icon: s.icon,
      level: s.level,
      displayOrder: s.displayOrder,
    }));
  }
}
