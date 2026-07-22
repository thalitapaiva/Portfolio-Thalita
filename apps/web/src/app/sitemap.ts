import type { MetadataRoute } from "next";

import { api } from "@/lib/api";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await api.getProjects();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${env.siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${env.siteUrl}/projetos/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.featured ? 0.8 : 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
