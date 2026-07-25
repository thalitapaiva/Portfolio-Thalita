import * as React from "react";

import { api } from "@/lib/api";
import { personJsonLd } from "@/lib/seo";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { FocusAreasSection } from "@/components/sections/FocusAreasSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SocialCtaSection } from "@/components/sections/SocialCtaSection";

export const revalidate = 900;

export default async function HomePage() {
  const [profile, projects, github, socialLinks] = await Promise.all([
    api.getProfile(),
    api.getProjects(),
    api.getGithub(),
    api.getSocialLinks(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(profile)) }}
      />
      <SiteHeader fullName={profile?.fullName} />
      <main id="main" className="relative">
        <HeroSection profile={profile} github={github} />
        <SkillsSection />
        <FocusAreasSection />
        <ExperienceSection />
        <AboutSection />
        <ResultsSection />
        <ProjectsSection projects={projects} />
        <SocialCtaSection />
      </main>
      <SiteFooter fullName={profile?.fullName} socialLinks={socialLinks} />
    </>
  );
}
