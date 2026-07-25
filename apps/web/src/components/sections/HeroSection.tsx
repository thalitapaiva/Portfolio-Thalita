"use client";

import type { GitHubProfileDto, PortfolioProfileDto } from "@portfolio/types";

import { PageIllustration } from "@/components/shared/PageIllustration";
import { useLang } from "@/lib/i18n";

interface HeroSectionProps {
  profile: PortfolioProfileDto | null;
  github: GitHubProfileDto | null;
}

export function HeroSection({ profile, github }: HeroSectionProps) {
  const { t } = useLang();
  const name = profile?.fullName ?? "Thalita Paiva";
  const githubUrl = github?.htmlUrl ?? "https://github.com/thalitapaiva";
  const linkedInUrl =
    profile?.linkedIn?.profileUrl ??
    "https://www.linkedin.com/in/thalita-paiva-1301a122b/";

  return (
    <section id="inicio" className="relative overflow-x-clip" aria-label={name}>
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-10 pt-28 sm:pb-12 sm:pt-32 md:pb-20 md:pt-40">
          <div className="pb-10 text-center md:pb-16">
            <h1
              className="mb-4 border-y border-gray-200 text-[2.125rem] font-bold leading-[1.1] tracking-tight text-gray-900 hairline-y dark:border-gray-700 dark:text-gray-100 sm:mb-6 sm:text-5xl md:text-6xl"
              data-aos="zoom-y-out"
              data-aos-delay={150}
            >
              {name}
            </h1>

            <div className="mx-auto max-w-3xl">
              <p
                className="mb-2 text-base font-medium text-gray-800 dark:text-gray-200 sm:mb-3 sm:text-lg"
                data-aos="zoom-y-out"
                data-aos-delay={250}
              >
                {t.hero.headline}
              </p>
              <p
                className="mb-6 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400 sm:mb-8 sm:text-lg"
                data-aos="zoom-y-out"
                data-aos-delay={300}
              >
                {t.hero.intro}
              </p>

              <div className="relative before:absolute before:inset-0 before:border-y before:border-gray-200 dark:before:border-gray-700">
                <div
                  className="relative mx-auto flex max-w-xs flex-col py-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
                  data-aos="zoom-y-out"
                  data-aos-delay={450}
                >
                  <a className="btn btn-primary group mb-3 w-full sm:mb-0 sm:w-auto" href="#projetos">
                    <span className="relative inline-flex items-center">
                      {t.hero.viewProjects}{" "}
                      <span className="ml-1 tracking-normal text-blue-200 transition-transform group-hover:translate-x-0.5">
                        -&gt;
                      </span>
                    </span>
                  </a>
                  <a className="btn btn-secondary w-full sm:w-auto" href="#experiencia">
                    {t.hero.viewExperience}
                  </a>
                </div>
              </div>

              <div
                className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-500 sm:mt-6"
                data-aos="zoom-y-out"
                data-aos-delay={500}
              >
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  GitHub
                </a>
                <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-3xl" data-aos="zoom-y-out" data-aos-delay={600}>
            <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-gray-900 px-4 py-3 shadow-xl before:pointer-events-none before:absolute before:-inset-3 before:border-y before:border-gray-200 after:absolute after:-inset-3 after:-z-10 after:border-x after:border-gray-200 sm:aspect-video sm:rounded-2xl sm:px-5 sm:before:-inset-5 sm:after:-inset-5 dark:before:border-gray-700 dark:after:border-gray-700">
              <div className="relative mb-6 flex items-center justify-between before:block before:h-[9px] before:w-[41px] before:bg-[length:16px_9px] before:[background-image:radial-gradient(circle_at_4.5px_4.5px,#4b5563_4.5px,transparent_0)] after:w-[41px] sm:mb-8">
                <span className="truncate text-[12px] font-medium text-white sm:text-[13px]">
                  thalitapaiva.com.br
                </span>
              </div>
              <div className="font-mono text-[12px] leading-relaxed text-gray-500 sm:text-sm [&_span]:opacity-0">
                <span className="animate-code-1 text-gray-200">thalita --role</span>{" "}
                <span className="animate-code-2">ops + scrum + tech</span>
                <br />
                <span className="animate-code-3">--focus=&quot;processos e entregas&quot;</span>{" "}
                <span className="animate-code-4 text-emerald-400">ready.</span>
                <br />
                <br />
                <span className="animate-code-5 text-gray-200">open projects</span>
                <br />
                <span className="animate-code-6">Portfolio published.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
