import type { SeoMeta } from "@/types/seo";

export const CPS_EMAIL = "inquiry@creativeprofessionals.com";
export const CPS_PHONE = "+966560846520";
export const CPS_PHONE_DISPLAY = "+966 56 084 6520";

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
  icon?: string;
  favicon?: string;
  portfolio?: {
    enabled: boolean;
    labelEn: string;
    labelAr: string;
    href: string;
  };
  googleMapsUrl?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  defaultKeywords?: string[];
  defaultSeoByLocale?: { locale?: string; title?: string; description?: string }[];
  defaultOgImage?: string;
  homeHero?: string;
  homeHeroVideo?: string;
  homeFloatingImages?: string[];
  productionImage?: string;
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
    tagline: "Production Fabrication and Fit Out",
    description:
      "CPS delivers exhibitions, events, interiors, displays, printing and custom fabrication across Saudi Arabia.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cps.com",
    locale: "en_SA",
    email: CPS_EMAIL,
    phone: CPS_PHONE,
    phoneDisplay: CPS_PHONE_DISPLAY,
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
    icon: "/icon.png",
    favicon: "/favicon.ico",
    portfolio: {
      enabled: true,
      labelEn: "Download Portfolio",
      labelAr: "تحميل ملف الأعمال",
      href: process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "",
    },
    brandColors: {
      accent: "#2192b4",
      primary: "#0f3355",
    },
    defaultKeywords: [
      "CPS",
      "Creatives Professionals",
      "المبدعون المحترفون",
      "production and fabrication",
    ],
    defaultSeoByLocale: [
      {
        locale: "en",
        title: "CPS — Creatives Professionals",
          description:
          "CPS produces exhibitions, events, interiors and displays under one roof in Saudi Arabia.",
      },
      {
        locale: "ar",
        title: "CPS — المبدعون المحترفون",
        description: "تنتج CPS المعارض والفعاليات والمساحات الداخلية والعروض تحت سقف واحد في السعودية.",
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
