import * as React from "react";

import { api } from "@/lib/api";
import { personJsonLd } from "@/lib/seo";
import { BluePortfolio } from "@/components/portfolio/BluePortfolio";
import "@fontsource-variable/mona-sans";

export const revalidate = 900;

export default async function HomePage() {
  const [profile, projects, socialLinks] = await Promise.all([
    api.getProfile(),
    api.getProjects(),
    api.getSocialLinks(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd(profile)),
        }}
      />
      <BluePortfolio
        profile={profile}
        projects={projects}
        socialLinks={socialLinks}
      />
    </>
  );
}
