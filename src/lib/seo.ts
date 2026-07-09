import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import { getDefaultOgImage, getSiteFavicon, getSiteLogo } from "@/lib/site-assets";
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n";
import { resolveImageSrc } from "@/lib/placeholders";

const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
const DEFAULT_KEYWORDS = ["CPS"];

function getLocalizedDefaults(locale: Locale): { title: string; description: string } {
  const config = getSiteConfig();
  const localized = config.defaultSeoByLocale?.find((entry) => entry.locale === locale);

  if (localized?.title && localized.description) {
    return { title: localized.title, description: localized.description };
  }

  if (locale === "ar") {
    return {
      title: `${config.name} — المبدعون المحترفون`,
      description: config.description,
    };
  }

  return {
    title: `${config.name} — Creatives Professionals`,
    description: config.description,
  };
}

function resolveLogoUrl(): string {
  const logo = getSiteLogo();
  return logo.startsWith("http") ? logo : getSiteUrl(logo);
}

export function getSiteUrl(path = ""): string {
  const base = getSiteConfig().url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${base}${normalized}`;
}

export function isIndexingAllowed(): boolean {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv && vercelEnv !== "production") {
    return false;
  }
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  robots?: string;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  locale = defaultLocale,
  keywords,
  ogImage = getDefaultOgImage(),
  canonicalUrl,
  noIndex = false,
  robots,
}: BuildMetadataOptions = {}): Metadata {
  const config = getSiteConfig();
  const defaults = getLocalizedDefaults(locale);
  title ??= defaults.title;
  description ??= defaults.description;
  const resolvedKeywords = keywords ?? config.defaultKeywords ?? DEFAULT_KEYWORDS;
  const blockIndexing =
    noIndex || robots?.includes("noindex") || !isIndexingAllowed();
  const canonicalPath = localizePath(path, locale);
  const canonical = canonicalUrl ?? getSiteUrl(canonicalPath);
  const resolvedOgImage = resolveImageSrc(
    ogImage,
    OG_IMAGE_SIZE.width,
    OG_IMAGE_SIZE.height,
  );
  const ogImageUrl = resolvedOgImage.startsWith("http")
    ? resolvedOgImage
    : getSiteUrl(resolvedOgImage);
  const ogLocale = locale === "ar" ? "ar_SA" : "en_SA";
  const alternateLocale = locale === "ar" ? "en_SA" : "ar_SA";

  return {
    metadataBase: new URL(config.url),
    title: {
      default: title,
      template: `%s | ${config.name}`,
    },
    description,
    keywords: resolvedKeywords,
    applicationName: config.name,
    authors: [{ name: config.name, url: config.url }],
    creator: config.name,
    publisher: config.name,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: ["/favicon.ico"],
    },
    alternates: {
      canonical,
      languages: {
        en: getSiteUrl(localizePath(path, "en")),
        ar: getSiteUrl(localizePath(path, "ar")),
        "x-default": getSiteUrl(localizePath(path, defaultLocale)),
      },
    },
    robots: blockIndexing
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      url: canonical,
      siteName: config.name,
      title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: getSiteConfig().name,
    legalName: getSiteConfig().legalName,
    url: getSiteConfig().url,
    logo: resolveLogoUrl(),
    email: getSiteConfig().email,
    telephone: getSiteConfig().phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: getSiteConfig().address.city,
      addressCountry: getSiteConfig().address.country,
    },
    sameAs: [
      getSiteConfig().social.instagram,
      getSiteConfig().social.linkedin,
      getSiteConfig().social.x,
    ],
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getSiteConfig().name,
    url: getSiteConfig().url,
    description: getSiteConfig().description,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: getSiteConfig().name },
  };
}
