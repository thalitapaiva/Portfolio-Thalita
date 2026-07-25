"use client";

import Image from "next/image";

import { useLang } from "@/lib/i18n";

export function AboutSection() {
  const { t, lang } = useLang();
  const quote = t.about.paragraphs[1] ?? t.about.paragraphs[0];
  const role =
    lang === "pt"
      ? "Business Operations · Scrum Master · Tecnologia"
      : "Business Operations · Scrum Master · Technology";

  return (
    <section id="sobre" aria-labelledby="about-title" className="section-pad">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="space-y-3 text-center" data-aos="zoom-y-out">
          <div className="relative inline-flex">
            <svg
              className="absolute -left-6 -top-2 -z-10"
              width={40}
              height={49}
              viewBox="0 0 40 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M22.7976 -0.000136375L39.9352 23.4746L33.4178 31.7234L13.7686 11.4275L22.7976 -0.000136375ZM9.34947 17.0206L26.4871 40.4953L19.9697 48.7441L0.320491 28.4482L9.34947 17.0206Z"
                fill="#D1D5DB"
              />
            </svg>
            <Image
              className="rounded-full"
              src="/images/large-testimonial.jpg"
              width={48}
              height={48}
              alt=""
            />
          </div>
          <h2 id="about-title" className="sr-only">
            {t.about.title}
          </h2>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            “{quote}”
          </p>
          <div className="text-sm font-medium text-gray-500">
            <span className="text-gray-700 dark:text-gray-300">Thalita Paiva</span>{" "}
            <span className="text-gray-400">/</span>{" "}
            <span className="text-blue-500">{role}</span>
          </div>
          <div className="mx-auto max-w-xl space-y-3 pt-6 text-left text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
            {t.about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
