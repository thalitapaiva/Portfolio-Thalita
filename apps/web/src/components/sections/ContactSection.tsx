"use client";

import type { PortfolioProfileDto, SocialLinkDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { useLang } from "@/lib/i18n";

interface ContactSectionProps {
  profile: PortfolioProfileDto | null;
  socialLinks: SocialLinkDto[];
}

export function ContactSection({
  profile: _profile,
  socialLinks: _socialLinks,
}: ContactSectionProps) {
  void _profile;
  void _socialLinks;
  const { t } = useLang();

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="section-pad pb-[max(7rem,calc(env(safe-area-inset-bottom)+5rem))] sm:pb-40"
    >
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start lg:gap-24">
          <ScrollReveal>
            <SectionHeading id="contact-title" title={t.contact.title} />
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
