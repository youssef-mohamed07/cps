import type { SeoMeta } from "@/types/seo";

export interface SiteConfigShape {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsappMessage: string;
  address: {
    city: string;
    country: string;
    countryName: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    x: string;
  };
  logo?: string;
  favicon?: string;
  googleMapsUrl?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  defaultKeywords?: string[];
  defaultSeoByLocale?: { locale?: string; title?: string; description?: string }[];
  defaultOgImage?: string;
  homeHero?: string;
  homeHeroVideo?: string;
  brandColors?: { accent?: string; primary?: string };
  defaultSeo?: SeoMeta;
  footerExploreLinks?: { label: string; href: string }[];
}

let cachedSiteConfig: SiteConfigShape | null = null;

export function setSiteConfig(config: SiteConfigShape): void {
  cachedSiteConfig = config;
}

export function getSiteConfig(): SiteConfigShape {
  if (cachedSiteConfig) return cachedSiteConfig;

  return {
    name: "CPS",
    legalName: "Creatives Professionals",
    tagline: "Exhibition Booth Design & Production",
    description:
      "CPS — full-lifecycle exhibition booth design, fabrication, installation, and storage across Saudi Arabia.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cps.com",
    locale: "en_SA",
    email: "hello@cps.com",
    phone: "+966500000000",
    phoneDisplay: "+966 50 000 0000",
    whatsappMessage: "Hi CPS! I'd like to get in touch.",
    address: {
      city: "Riyadh",
      country: "SA",
      countryName: "Saudi Arabia",
    },
    social: {
      instagram: "https://www.instagram.com/",
      linkedin: "https://www.linkedin.com/",
      x: "https://x.com/",
    },
    logo: "/logo.png",
    favicon: "/favicon.ico",
    brandColors: {
      accent: "#2192b4",
      primary: "#0f3355",
    },
    defaultKeywords: [
      "CPS",
      "Creatives Professionals",
      "المبدعون المحترفون",
      "creative agency",
    ],
    defaultSeoByLocale: [
      {
        locale: "en",
        title: "CPS — Creatives Professionals",
        description:
          "CPS — Creatives Professionals. Strategy, design, and production for brands that want to be seen.",
      },
      {
        locale: "ar",
        title: "CPS — المبدعون المحترفون",
        description: "CPS — المبدعون المحترفون. استراتيجية وتصميم وإنتاج لعلامات تريد أن تُرى.",
      },
    ],
  };
}

export function getWhatsAppUrl(message?: string): string {
  const config = getSiteConfig();
  const phone = config.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message ?? config.whatsappMessage)}`;
}

export function getMailtoUrl(
  options: {
    email?: string;
    subject?: string;
    body?: string;
  } = {},
): string {
  const config = getSiteConfig();
  const { email = config.email, subject, body } = options;
  const parts: string[] = [];

  if (subject) {
    parts.push(`subject=${encodeURIComponent(subject)}`);
  }
  if (body) {
    parts.push(`body=${encodeURIComponent(body.replace(/\n/g, "\r\n"))}`);
  }

  const query = parts.join("&");
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
}
