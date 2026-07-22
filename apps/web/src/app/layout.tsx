import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Roboto, Roboto_Mono } from "next/font/google";

import "./globals.css";

import { Providers } from "./providers";
import { api } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import { env } from "@/lib/env";

const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
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
    <html lang="pt-BR" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body>
        <a href="#inicio" className="skip-link">
          Pular para o conteúdo
        </a>
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
