import { getSiteConfig } from "@/lib/site-config";
import { placeholderUrl } from "@/lib/placeholders";

const LOGO_FALLBACK = "/logo.png";
const FAVICON_FALLBACK = "/favicon.ico";
const OG_FALLBACK = placeholderUrl(1200, 630);

export function getSiteLogo(): string {
  return getSiteConfig().logo || LOGO_FALLBACK;
}

export function getSiteFavicon(): string {
  return getSiteConfig().favicon || FAVICON_FALLBACK;
}

export function getDefaultOgImage(): string {
  return getSiteConfig().defaultOgImage || OG_FALLBACK;
}

export function getSiteHeroVideo(): string | undefined {
  const config = getSiteConfig();
  return config.homeHeroVideo || process.env.NEXT_PUBLIC_HERO_VIDEO_URL || undefined;
}

export function getSiteHeroPoster(): string | undefined {
  return getSiteConfig().homeHero || undefined;
}
