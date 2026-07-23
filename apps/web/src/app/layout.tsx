import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource-variable/mona-sans";

import "./globals.css";

import { Providers } from "./providers";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { env } from "@/lib/env";
import { SiteBackdrop } from "@/components/shared/TechIconsField";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#060a12" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const profile = await api.getProfile();
  return buildMetadata({ profile });
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <a href="#inicio" className="skip-link">
          Pular para o conteúdo
        </a>
        <SiteBackdrop />
        <Providers>{children}</Providers>
        {env.turnstileSiteKey && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="lazyOnload"
            defer
          />
        )}
      </body>
    </html>
  );
}
