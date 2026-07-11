/**
 * Central image URL resolution — passes through CMS CDN URLs, local public
 * assets, and brand marks; placeholders only when src is missing.
 */

/** Assets confirmed present under `public/`. */
const PUBLIC_BRAND_ASSETS = new Set([
  "/logo.png",
  "/favicon.ico",
  "/clients/almarai.svg",
  "/clients/hikma.svg",
  "/clients/mobily.svg",
  "/clients/neom.svg",
  "/clients/riyad-bank.png",
  "/clients/saudi-aramco.png",
  "/clients/stc.svg",
  "/lang_switch/gb.png",
  "/lang_switch/sa.png",
]);

function isRemoteUrl(src: string): boolean {
  return /^https?:\/\//.test(src);
}

function isSanityCdnUrl(src: string): boolean {
  return src.includes("cdn.sanity.io");
}

function isPlaceholderUrl(src: string): boolean {
  return src.includes("placehold.co");
}

export function isBrandAsset(src: string): boolean {
  if (isRemoteUrl(src)) return isSanityCdnUrl(src);
  if (src.startsWith("/clients/")) return true;
  if (src.startsWith("/lang_switch/")) return true;
  return PUBLIC_BRAND_ASSETS.has(src);
}

/** Neutral placeholder surface — flat zinc tones, no dimension text. */
export function placeholderUrl(width: number, height: number): string {
  return `https://placehold.co/${width}x${height}/f4f4f5/d4d4d8`;
}

export function placeholderFromSize(size: string): string {
  const [w, h] = size.split("x").map((n) => parseInt(n, 10));
  if (!w) return placeholderUrl(1200, 800);
  return placeholderUrl(w, h || w);
}

export type ResolveImageOptions = {
  /** When true, logos/flags and Sanity CDN brand marks pass through unchanged. */
  brand?: boolean;
};

function shouldPassThrough(
  src: string,
  options?: ResolveImageOptions,
): boolean {
  if (options?.brand && isBrandAsset(src)) return true;
  if (isSanityCdnUrl(src)) return true;
  if (isRemoteUrl(src) && !isPlaceholderUrl(src)) return true;
  if (src.startsWith("/")) return true;
  return false;
}

export function resolveImageSrc(
  src: string | undefined | null,
  width: number,
  height: number,
  options?: ResolveImageOptions,
): string {
  if (!src) {
    return options?.brand ? "" : placeholderUrl(width, height);
  }

  if (shouldPassThrough(src, options)) {
    return src;
  }

  return placeholderUrl(width, height);
}

export function isExistingPublicImage(src: string): boolean {
  return shouldPassThrough(src) || isBrandAsset(src);
}
