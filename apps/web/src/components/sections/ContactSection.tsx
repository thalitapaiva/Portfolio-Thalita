import * as React from "react";
import Link from "next/link";
import { Github, Linkedin, MapPin } from "lucide-react";
import type { PortfolioProfileDto, SocialLinkDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { CopyEmailButton } from "@/components/shared/CopyEmailButton";

interface ContactSectionProps {
  profile: PortfolioProfileDto | null;
  socialLinks: SocialLinkDto[];
}

const PLATFORM_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
};

export function ContactSection({ profile, socialLinks }: ContactSectionProps) {
  const email = profile?.email;
  const location = profile?.location;

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="scroll-mt-24 bg-[var(--surface)] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-wide px-5 sm:px-8">
        <ScrollReveal>
          <SectionHeading
            id="contact-title"
            eyebrow="Contato"
            title="Vamos conversar"
            description="Preencha o formulário ou fale por outro canal. Costumo responder em até dois dias úteis."
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <ScrollReveal>
            <aside
              aria-label="Outras formas de contato"
              className="flex flex-col gap-6 rounded-[20px] border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--blue-700)]">
                  Email
                </p>
                {email ? (
                  <div className="mt-3 flex flex-col gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--blue-700)]"
                    >
                      {email}
                    </a>
                    <CopyEmailButton email={email} />
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    [PLACEHOLDER — email indisponível]
                  </p>
                )}
              </div>

              {location && (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    Localização
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--text-primary)]">
                    <MapPin className="h-4 w-4 text-[var(--blue-700)]" aria-hidden="true" />
                    {location}
                  </p>
                </div>
              )}

              {socialLinks.length > 0 && (
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    Outros canais
                  </p>
                  <ul className="mt-2 flex flex-col gap-2">
                    {socialLinks.map((link) => {
                      const Icon = PLATFORM_ICON[link.platform.toLowerCase()];
                      return (
                        <li key={link.id}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--blue-700)]"
                          >
                            {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                            {link.label}
                            <span className="sr-only">(abre em nova aba)</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              <div className="rounded-[12px] border border-[var(--border)] bg-[var(--surface)] p-4 text-xs text-[var(--text-secondary)]">
                <p>
                  Ao enviar o formulário, você concorda que armazenaremos seus dados apenas
                  para responder à mensagem. Sem newsletters, sem compartilhamentos. Veja a{" "}
                  <Link
                    href="/privacidade"
                    className="underline underline-offset-4 hover:text-[var(--blue-700)]"
                  >
                    política de privacidade
                  </Link>
                  .
                </p>
              </div>
            </aside>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="rounded-[20px] border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
