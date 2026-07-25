"use client";

import Image from "next/image";

import { useLang } from "@/lib/i18n";

const LINKEDIN = "https://www.linkedin.com/in/thalita-paiva-1301a122b/";
const GITHUB = "https://github.com/thalitapaiva";

export function SocialCtaSection() {
  const { t, lang } = useLang();
  const title = lang === "pt" ? "Vamos conectar" : "Let’s connect";
  const subtitle =
    lang === "pt"
      ? "LinkedIn e GitHub — operações, Scrum e tecnologia."
      : "LinkedIn and GitHub — operations, Scrum, and technology.";

  return (
    <section className="section-pad pt-0" aria-label={t.nav.about}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl text-center shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
          data-aos="zoom-y-out"
        >
          <div
            className="absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-40 w-[280px] rounded-full border-[16px] border-blue-500 blur-3xl sm:h-56 sm:w-[480px] sm:border-[20px]" />
          </div>
          <div
            className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 transform"
            aria-hidden="true"
          >
            <Image
              className="max-w-none"
              src="/images/stripes-dark.svg"
              width={768}
              height={432}
              alt=""
            />
          </div>
          <div className="px-4 py-10 md:px-12 md:py-20">
            <h2 className="mb-3 border-y border-gray-700 text-2xl font-bold text-gray-200 sm:text-3xl md:mb-6 md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-[15px] text-gray-400 sm:mb-8 sm:text-base">
              {subtitle}
            </p>
            <div className="mx-auto flex max-w-xs flex-col sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
              <a
                className="btn btn-primary group mb-3 w-full sm:mb-0 sm:w-auto"
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="relative inline-flex items-center">
                  LinkedIn{" "}
                  <span className="ml-1 tracking-normal text-blue-200 transition-transform group-hover:translate-x-0.5">
                    -&gt;
                  </span>
                </span>
              </a>
              <a
                className="btn w-full bg-gray-800 text-gray-200 shadow-sm hover:bg-gray-700 sm:w-auto"
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
