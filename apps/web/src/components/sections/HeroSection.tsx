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
      <div className={styles.ambient} aria-hidden="true">
        <svg
          viewBox="0 0 1200 600"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <g className={styles.signalLeft}>
            <path d="M0 210h100l65 65h90M55 420h100l50-50h55" />
            <circle cx="255" cy="275" r="4" />
            <circle cx="260" cy="370" r="4" />
            <circle cx="80" cy="140" r="2" />
            <circle cx="190" cy="475" r="2" />
          </g>
          <g className={styles.signalRight}>
            <path d="M1200 180h-125l-55 55h-75M1200 400h-90l-60-60h-90" />
            <circle cx="945" cy="235" r="4" />
            <circle cx="960" cy="340" r="4" />
            <circle cx="1100" cy="110" r="2" />
            <circle cx="1035" cy="465" r="2" />
          </g>
        </svg>
      </div>
      <div className={styles.shell}>
        <div className={styles.identity}>
          <div className={styles.portrait}>
            <Image
              src="/images/thalita-paiva.webp"
              alt={`Retrato de ${name}`}
              width={640}
              height={801}
              sizes="(max-width: 700px) 76px, 112px"
              priority
            />
          </div>
          <div className={styles.identityText}>
            <p className={styles.greeting}>
              {lang === "pt" ? "Olá, eu sou" : "Hi, I'm"}
            </p>
            <h1 id="hero-name">
              {name}
              <span aria-hidden="true">.</span>
            </h1>
          </div>
        </div>
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
    </section>
  );
}
