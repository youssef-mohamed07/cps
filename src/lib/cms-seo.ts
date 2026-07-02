import type { SeoMeta } from "@/types/seo";
import { getDefaultOgImage } from "@/lib/site-assets";
import { getSiteConfig } from "@/lib/site-config";
import { buildMetadata, type BuildMetadataOptions } from "@/lib/seo";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";

export function resolveEntitySeo(
  seo: SeoMeta | undefined,
  fallback: { title: string; description: string; ogImage?: string },
): {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  robots?: string;
} {
  return {
    title: seo?.title ?? fallback.title,
    description: seo?.description ?? fallback.description,
    keywords: seo?.keywords,
    ogImage: seo?.ogImage ?? fallback.ogImage ?? getDefaultOgImage(),
    canonicalUrl: seo?.canonicalUrl,
    noIndex: seo?.noIndex,
    robots: seo?.robots,
  };
}

export function buildPageMetadata(
  options: BuildMetadataOptions & {
    seo?: SeoMeta;
    fallbackTitle: string;
    fallbackDescription: string;
    fallbackOgImage?: string;
  },
): Metadata {
  const resolved = resolveEntitySeo(options.seo, {
    title: options.fallbackTitle,
    description: options.fallbackDescription,
    ogImage: options.fallbackOgImage,
  });

  return buildMetadata({
    ...options,
    title: options.title ?? resolved.title,
    description: options.description ?? resolved.description,
    keywords: options.keywords ?? resolved.keywords,
    ogImage: options.ogImage ?? resolved.ogImage,
    canonicalUrl: options.canonicalUrl ?? resolved.canonicalUrl,
    noIndex: options.noIndex ?? resolved.noIndex,
    robots: options.robots ?? resolved.robots,
  });
}

export function getLocaleSeoDefaults(locale: Locale): {
  title: string;
  description: string;
} {
  const config = getSiteConfig();
  const localized = config.defaultSeoByLocale?.find((entry) => entry.locale === locale);

  if (localized?.title && localized.description) {
    return { title: localized.title, description: localized.description };
  }

  if (config.defaultSeo?.title && config.defaultSeo.description) {
    return {
      title: config.defaultSeo.title,
      description: config.defaultSeo.description,
    };
  }

  if (locale === "ar") {
    return {
      title: `${config.name} | موقع الشركة`,
      description: config.description,
    };
  }

  return {
    title: `${config.name} | Company website`,
    description: config.description,
  };
}
