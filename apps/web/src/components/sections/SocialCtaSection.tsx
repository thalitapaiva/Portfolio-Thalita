"use client";

import Image from "next/image";

import { useLang } from "@/lib/i18n";

const LINKEDIN = "https://www.linkedin.com/in/thalita-paiva-1301a122b/";
const GITHUB = "https://github.com/thalitapaiva";

export function SocialCtaSection() {
  const { t, lang } = useLang();
  const title =
    lang === "pt"
      ? "Vamos conectar no LinkedIn ou no GitHub"
      : "Let’s connect on LinkedIn or GitHub";
  const subtitle =
    lang === "pt"
      ? "Acompanhe minha trajetória, projetos e atuação em operações, Scrum e tecnologia."
      : "Follow my work across operations, Scrum, and technology.";

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
            <div className="h-56 w-[480px] rounded-full border-[20px] border-blue-500 blur-3xl" />
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
          <div className="px-4 py-12 md:px-12 md:py-20">
            <h2 className="mb-4 border-y border-gray-700 text-3xl font-bold text-gray-200 md:mb-6 md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-gray-400">{subtitle}</p>
            <div className="mx-auto flex max-w-xs flex-col sm:max-w-none sm:flex-row sm:justify-center sm:gap-4">
              <a
                className="btn btn-primary group mb-4 w-full sm:mb-0 sm:w-auto"
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
