import { Injectable } from "@nestjs/common";
import type { HealthDto } from "@portfolio/types";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class HealthService {
  private readonly startedAt = Date.now();

  constructor(private readonly prisma: PrismaService) {}

  async check(): Promise<HealthDto> {
    const database = await this.prisma.isHealthy();
    return {
      status: database ? "ok" : "degraded",
      timestamp: new Date().toISOString(),
      database,
      uptime: Math.floor((Date.now() - this.startedAt) / 1000),
    };
  }
}
