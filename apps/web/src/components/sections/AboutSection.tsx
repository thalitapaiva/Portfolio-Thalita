"use client";

import * as React from "react";
import type { PortfolioProfileDto } from "@portfolio/types";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { GeometricMark } from "@/components/shared/GeometricMark";

interface AboutSectionProps {
  profile: PortfolioProfileDto | null;
}

const DEFAULT_ABOUT_PT =
  "Sou estudante de Sistemas de Informação na Universidade Federal do Espírito Santo (UFES) – Campus Alegre. Tenho grande interesse em Desenvolvimento Full Stack e na criação de softwares que sejam modernos, eficientes e capazes de solucionar problemas reais.";

const DEFAULT_ABOUT_EN =
  "I'm an Information Systems student at the Federal University of Espírito Santo (UFES) – Alegre Campus. I'm passionate about Full Stack development and building modern, efficient software that solves real problems.";

export function AboutSection({ profile }: AboutSectionProps) {
  const [lang, setLang] = React.useState<"pt" | "en">("pt");

  const aboutPt =
    profile?.shortBio?.trim() ||
    profile?.aboutContent?.trim() ||
    DEFAULT_ABOUT_PT;
  const about = lang === "pt" ? aboutPt : DEFAULT_ABOUT_EN;

  return (
    <section id="sobre" aria-labelledby="about-title" className="section-pad">
      <div className="section-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-20 xl:gap-28">
          <ScrollReveal>
            <SectionHeading id="about-title" title="Sobre" />
          </ScrollReveal>

          <div className="relative max-w-2xl lg:pt-1">
            <GeometricMark
              variant="keycap"
              className="absolute -right-4 -top-10 size-16 opacity-45 sm:-right-6 sm:-top-12 sm:size-20"
            />

            <ScrollReveal delay={0.06}>
              <p className="relative text-[1.15rem] font-medium leading-[1.6] tracking-[-0.035em] text-[var(--text-primary)] sm:text-[1.3rem] sm:leading-[1.55]">
                {about}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div
                className="relative mt-10 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-7"
                role="group"
                aria-label="Idioma do texto"
              >
                {(
                  [
                    { id: "pt", label: "Português" },
                    { id: "en", label: "English" },
                  ] as const
                ).map((item) => {
                  const active = lang === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLang(item.id)}
                      aria-pressed={active}
                      className={
                        active
                          ? "inline-flex min-h-10 items-center border border-[var(--blue-600)] bg-[color-mix(in_srgb,var(--blue-600)_12%,transparent)] px-4 text-[13px] font-semibold tracking-[-0.02em] text-[var(--blue-600)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
                          : "inline-flex min-h-10 items-center border border-[var(--border)] px-4 text-[13px] font-semibold tracking-[-0.02em] text-[var(--text-primary)] transition-colors duration-300 hover:border-[var(--blue-600)] hover:text-[var(--blue-600)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-600)]"
                      }
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
