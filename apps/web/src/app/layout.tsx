import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import "./globals.css";

import { Providers } from "./providers";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { env } from "@/lib/env";
import { AosInit } from "@/components/shared/AosInit";
import { THEME_INIT_SCRIPT } from "@/lib/theme-script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
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
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <a href="#inicio" className="skip-link">
          Pular para o conteúdo
        </a>
        <AosInit />
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
