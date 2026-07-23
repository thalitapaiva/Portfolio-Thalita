import * as React from "react";
import type { PortfolioProfileDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { LinkedInCard } from "@/components/integrations/LinkedInCard";
import { EmptyState } from "@/components/shared/EmptyState";

interface LinkedInSectionProps {
  profile: PortfolioProfileDto | null;
}

export function LinkedInSection({ profile }: LinkedInSectionProps) {
  const data = profile?.linkedIn;

  return (
    <section
      id="linkedin"
      aria-labelledby="linkedin-title"
      className="scroll-mt-24 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-wide px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading id="linkedin-title" eyebrow="LinkedIn" title="Perfil" />
        </ScrollReveal>
        <div className="mt-5 max-w-xl">
          <ScrollReveal>
            {data ? (
              <LinkedInCard data={data} />
            ) : (
              <EmptyState title="Sem preview" description="Dados do LinkedIn indisponíveis." />
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
