"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Github, Linkedin } from "lucide-react";
import type { GitHubProfileDto, PortfolioProfileDto } from "@portfolio/types";
import { useLang } from "@/lib/i18n";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  profile: PortfolioProfileDto | null;
  github: GitHubProfileDto | null;
}

export function HeroSection({ profile, github }: HeroSectionProps) {
  const { t, lang } = useLang();
  const name = profile?.fullName ?? "Thalita Paiva";
  const githubUrl = github?.htmlUrl ?? "https://github.com/thalitapaiva";
  const linkedInUrl =
    profile?.linkedIn?.profileUrl ??
    "https://www.linkedin.com/in/thalita-paiva-1301a122b/";

  return (
    <section id="inicio" aria-labelledby="hero-name" className={styles.hero}>
      <div className={styles.shell}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            {lang === "pt" ? "Olá, eu sou" : "Hi, I'm"}
          </p>
          <h1 id="hero-name">
            {name}
            <span aria-hidden="true">.</span>
          </h1>
          <p className={styles.headline}>{t.hero.headline}</p>
          <p className={styles.description}>{t.hero.intro}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#experiencia">
              {t.hero.viewExperience}
              <ArrowDownRight size={18} aria-hidden="true" />
            </a>
            <a className={styles.secondary} href="#sobre">
              {lang === "pt" ? "Mais sobre mim" : "More about me"}
              <ArrowDownRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.socials}>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden="true" />
              GitHub
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className={styles.portraitWrap}>
          <span className={styles.corner} aria-hidden="true" />
          <div className={styles.portrait}>
            <Image
              src="/images/thalita-paiva.webp"
              alt={`Retrato de ${name}`}
              width={640}
              height={801}
              sizes="(max-width: 700px) 180px, 340px"
              priority
            />
          </div>
          <div className={styles.portraitCaption}>
            <span aria-hidden="true" />
            {lang === "pt"
              ? "Pessoas, processos e tecnologia."
              : "People, processes, and technology."}
          </div>
        </div>
      </div>
      <div className={styles.bottomLine}>
        <span>BUSINESS OPERATIONS</span>
        <span>SCRUM MASTER</span>
        <span>
          {lang === "pt" ? "TECNOLOGIA & PROJETOS" : "TECHNOLOGY & PROJECTS"}
        </span>
      </div>
    </section>
  );
}
