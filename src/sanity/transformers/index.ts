import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { getDictionaryLocal } from "@/content/dictionaries.local";
import type { SiteConfigShape } from "@/lib/site-config";
import { sanitizeBrandColors } from "@/lib/sanitize-css-color";
import { fileUrl } from "@/sanity/file";
import { toImageSrc, toSeoMeta } from "@/sanity/transformers/shared";

type SanitySiteSettings = {
  companyName?: string;
  legalName?: string;
  tagline?: string;
  description?: string;
  logo?: { asset?: unknown; alt?: string };
  favicon?: { asset?: unknown; alt?: string };
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  whatsappMessage?: string;
  addressCity?: string;
  addressCountry?: string;
  addressCountryName?: string;
  googleMapsUrl?: string;
  socialLinks?: { platform?: string; url?: string }[];
  brandColors?: { accent?: string; primary?: string };
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  defaultSeo?: Parameters<typeof toSeoMeta>[0];
  defaultKeywords?: string[];
  defaultSeoByLocale?: { locale?: string; title?: string; description?: string }[];
  ogImage?: { asset?: unknown; alt?: string };
  homeHero?: { asset?: unknown; alt?: string };
  homeHeroVideo?: { asset?: { url?: string } | null };
  footerExploreLinks?: { label?: string; href?: string }[];
};

export function toSiteConfig(
  data: SanitySiteSettings | null | undefined,
): SiteConfigShape | null {
  if (!data?.companyName) return null;

  const instagram = data.socialLinks?.find((link) => link.platform === "instagram")?.url;
  const linkedin = data.socialLinks?.find((link) => link.platform === "linkedin")?.url;
  const x = data.socialLinks?.find((link) => link.platform === "x")?.url;

  return {
    name: data.companyName,
    legalName: data.legalName ?? data.companyName,
    tagline: data.tagline ?? "",
    description: data.description ?? "",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cps.com",
    locale: "en_SA",
    email: data.email ?? "",
    phone: data.phone ?? "",
    phoneDisplay: data.phoneDisplay ?? data.phone ?? "",
    whatsappMessage: data.whatsappMessage ?? "",
    address: {
      city: data.addressCity ?? "",
      country: data.addressCountry ?? "SA",
      countryName: data.addressCountryName ?? "Saudi Arabia",
    },
    social: {
      instagram: instagram ?? "",
      linkedin: linkedin ?? "",
      x: x ?? "",
    },
    logo: toImageSrc(data.logo),
    favicon: toImageSrc(data.favicon),
    googleMapsUrl: data.googleMapsUrl,
    googleAnalyticsId: data.googleAnalyticsId,
    googleTagManagerId: data.googleTagManagerId,
    defaultKeywords: data.defaultKeywords,
    defaultSeoByLocale: data.defaultSeoByLocale,
    defaultOgImage: toImageSrc(data.ogImage),
    homeHero: toImageSrc(data.homeHero),
    homeHeroVideo: fileUrl(data.homeHeroVideo),
    brandColors: sanitizeBrandColors(data.brandColors),
    defaultSeo: toSeoMeta(data.defaultSeo),
    footerExploreLinks: data.footerExploreLinks
      ?.filter((link) => link.label && link.href)
      .map((link) => ({ label: link.label!, href: link.href! })),
  };
}

type SanityDictionary = {
  content?: string;
  comingSoon?: {
    title?: string;
    subtitle?: string;
  };
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMergeDictionary(base: Dictionary, patch: unknown): Dictionary {
  if (!isPlainObject(patch)) return base;

  const next: Dictionary = { ...base };

  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined || value === null) continue;

    const current = next[key as keyof Dictionary];
    if (isPlainObject(current) && isPlainObject(value)) {
      next[key as keyof Dictionary] = {
        ...(current as object),
        ...value,
      } as never;
      continue;
    }

    next[key as keyof Dictionary] = value as never;
  }

  return next;
}

export function toDictionary(
  data: SanityDictionary | null | undefined,
  locale: Locale,
): Dictionary | null {
  const base = getDictionaryLocal(locale);
  if (!data) return null;

  let merged = base;

  if (data.content) {
    try {
      merged = deepMergeDictionary(base, JSON.parse(data.content));
    } catch {
      merged = base;
    }
  }

  // Always keep a complete local shape so CMS stubs can't blank the homepage.
  return {
    ...base,
    ...merged,
    nav: { ...base.nav, ...merged.nav },
    hero: { ...base.hero, ...merged.hero },
    about: { ...base.about, ...merged.about },
    aboutPage: { ...base.aboutPage, ...merged.aboutPage },
    services: {
      ...base.services,
      ...merged.services,
      items: merged.services?.items?.length ? merged.services.items : base.services.items,
    },
    servicesPage: { ...base.servicesPage, ...merged.servicesPage },
    process: {
      ...base.process,
      ...merged.process,
      steps: merged.process?.steps?.length ? merged.process.steps : base.process.steps,
    },
    work: {
      ...base.work,
      ...merged.work,
      items: merged.work?.items?.length ? merged.work.items : base.work.items,
      viewAll: merged.work?.viewAll ?? base.work.viewAll,
    },
    workPage: { ...base.workPage, ...merged.workPage },
    projectPage: { ...base.projectPage, ...merged.projectPage },
    contact: { ...base.contact, ...merged.contact },
    contactPage: {
      ...base.contactPage,
      ...merged.contactPage,
      info: { ...base.contactPage.info, ...merged.contactPage?.info },
      map: { ...base.contactPage.map, ...merged.contactPage?.map },
    },
    footer: {
      ...base.footer,
      ...merged.footer,
      locations: merged.footer?.locations?.length
        ? merged.footer.locations
        : base.footer.locations,
    },
    comingSoon: {
      title: data.comingSoon?.title ?? merged.comingSoon.title ?? base.comingSoon.title,
      subtitle:
        data.comingSoon?.subtitle ?? merged.comingSoon.subtitle ?? base.comingSoon.subtitle,
    },
  };
}
