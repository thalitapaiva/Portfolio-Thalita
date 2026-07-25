"use client";

import * as React from "react";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import type { SocialLinkDto } from "@portfolio/types";

import { SITE } from "@/lib/constants";
import { useLang } from "@/lib/i18n";

const PLATFORM_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
};

interface SiteFooterProps {
  fullName?: string;
  email?: string;
  socialLinks?: SocialLinkDto[];
}

export function SiteFooter({
  fullName = SITE.name,
  socialLinks = [],
}: SiteFooterProps) {
  const { t } = useLang();
  const year = new Date().getFullYear();
  const links = socialLinks.filter(
    (link) => !["email", "mail"].includes(link.platform.toLowerCase()),
  );

  return (
    <footer role="contentinfo">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 border-t border-gray-200 py-8 sm:grid-cols-12 sm:gap-10 md:py-12 dark:border-gray-800">
          <div className="space-y-2 sm:col-span-12 lg:col-span-6">
            <p className="text-sm font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {fullName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{t.footer.phrase}</p>
            <p className="text-sm text-gray-500">© {year}</p>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-8 sm:col-span-12 sm:contents">
            <div className="space-y-2 sm:col-span-6 lg:col-span-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {t.nav.projects}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" href="#projetos">
                    {t.nav.projects}
                  </a>
                </li>
                <li>
                  <a className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" href="#experiencia">
                    {t.nav.experience}
                  </a>
                </li>
                <li>
                  <Link className="text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" href="/privacidade">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2 sm:col-span-6 lg:col-span-3">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Social</h3>
              <ul className="flex gap-1">
                {links.map((link) => {
                  const Icon = PLATFORM_ICON[link.platform.toLowerCase()] ?? Github;
                  return (
                    <li key={link.id}>
                      <a
                        className="flex size-11 items-center justify-center text-blue-500 transition hover:text-blue-600 sm:size-auto"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                      >
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-8 h-40 w-full overflow-hidden" aria-hidden="true">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 bg-gradient-to-b from-gray-200 to-transparent bg-clip-text text-center text-[180px] font-bold leading-none text-transparent opacity-70 sm:text-[260px] dark:from-gray-800">
          TP
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="h-40 w-40 rounded-full border-[16px] border-blue-600 blur-[60px]" />
        </div>
      </div>
    </footer>
  );
}
