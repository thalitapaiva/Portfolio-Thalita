"use client";

import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

const LINKEDIN = "https://www.linkedin.com/in/thalita-paiva-1301a122b/";
const GITHUB = "https://github.com/thalitapaiva";

export function SocialCtaSection() {
  return (
    <section className="section-pad pt-0" aria-label="Redes sociais">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-2xl shadow-xl before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-gray-900"
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
          <div className="flex items-center justify-center gap-4 px-4 py-10 sm:gap-5 md:py-14">
            <a
              className="inline-flex size-14 items-center justify-center rounded-2xl bg-blue-500 text-white shadow-lg transition hover:bg-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:size-16"
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
            </a>
            <a
              className="inline-flex size-14 items-center justify-center rounded-2xl bg-gray-800 text-gray-100 shadow-lg transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 sm:size-16"
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
