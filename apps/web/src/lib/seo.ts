import type { Metadata } from "next";
import type { PortfolioProfileDto } from "@portfolio/types";

import { SITE } from "./constants";
import { env } from "./env";

type BuildMetadataArgs = {
  profile?: PortfolioProfileDto | null;
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  profile,
  title,
  description,
  path = "/",
  image,
}: BuildMetadataArgs = {}): Metadata {
  const siteTitle = profile?.seoTitle ?? SITE.defaultTitle;
  const siteDescription = profile?.seoDescription ?? SITE.defaultDescription;
  const finalTitle = title ? `${title} · ${profile?.fullName ?? SITE.name}` : siteTitle;
  const finalDescription = description ?? siteDescription;
  const url = `${env.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
  const ogImage = image ?? `${env.siteUrl}/opengraph-image`;

  return {
    metadataBase: new URL(env.siteUrl),
    title: finalTitle,
    description: finalDescription,
    keywords: [...SITE.keywords],
    authors: [{ name: profile?.fullName ?? SITE.name }],
    creator: profile?.fullName ?? SITE.name,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      title: finalTitle,
      description: finalDescription,
      siteName: profile?.fullName ?? SITE.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: profile?.fullName ?? SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export function personJsonLd(profile?: PortfolioProfileDto | null) {
  const name = profile?.fullName ?? SITE.name;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle: profile?.headline ?? SITE.role,
    email: profile?.email ? `mailto:${profile.email}` : undefined,
    url: env.siteUrl,
    description: profile?.shortBio ?? SITE.defaultDescription,
    sameAs: profile?.linkedIn?.profileUrl ? [profile.linkedIn.profileUrl] : undefined,
  };
}
