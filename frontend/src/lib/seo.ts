import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "./utils";

/**
 * SEO helper — factory untuk generate metadata konsisten per page.
 *
 * @example
 * export const metadata = buildMetadata({
 *   title: "Tentang Kami",
 *   description: "Sejarah PT Sinar Surabayasakti sejak 1992",
 *   path: "/about",
 * });
 *
 * Baca docs/SEO-CONFIGURATION.md untuk detail keyword strategy.
 */

interface BuildMetadataInput {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

export function buildMetadata({
  title,
  description,
  keywords,
  path = "/",
  image,
  noIndex = false,
  type = "website",
}: BuildMetadataInput = {}): Metadata {
  const finalTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : siteConfig.defaultTitle;
  const finalDescription = description || siteConfig.description;
  const finalKeywords = keywords
    ? [...siteConfig.keywords, ...keywords]
    : [...siteConfig.keywords];
  const canonicalUrl = absoluteUrl(path);
  const ogImage = image || siteConfig.ogImage;

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    metadataBase: siteConfig.url ? new URL(siteConfig.url) : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
    },
    twitter: {
      card: siteConfig.twitter.card,
      title: finalTitle,
      description: finalDescription,
      images: [ogImage],
      site: siteConfig.twitter.site,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    verification: {
      google: siteConfig.verification.google || undefined,
      other: siteConfig.verification.bing
        ? { "msvalidate.01": siteConfig.verification.bing }
        : undefined,
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
