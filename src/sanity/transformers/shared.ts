import { imageUrl } from "@/sanity/image";
import type { SeoMeta } from "@/types/seo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

type SanityImageField = {
  asset?: SanityImageSource;
  alt?: string;
  width?: number;
  height?: number;
};

const INVISIBLE_CHARS = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF\u00AD]/g;

/** Remove invisible/control characters that can corrupt metadata and JSON-LD. */
export function sanitizeText(value: string | undefined | null): string {
  return value?.replace(INVISIBLE_CHARS, "").trim() ?? "";
}

export function toImageSrc(
  image: SanityImageField | SanityImageSource | null | undefined,
  fallback = "",
): string {
  if (!image) return fallback;
  if (typeof image === "string") return image;

  const asset = "asset" in image ? image.asset : image;
  const url = imageUrl(asset, {
    width: "width" in image ? image.width : undefined,
    height: "height" in image ? image.height : undefined,
  });

  return url ?? fallback;
}

export function toSeoMeta(seo: {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImageField;
  canonicalUrl?: string;
  noIndex?: boolean;
  robots?: string;
} | null | undefined): SeoMeta | undefined {
  if (!seo) return undefined;

  const ogImage = toImageSrc(seo.ogImage);
  return {
    title: sanitizeText(seo.title) || undefined,
    description: sanitizeText(seo.description) || undefined,
    keywords: seo.keywords?.map(sanitizeText).filter(Boolean),
    ogImage: ogImage || undefined,
    canonicalUrl: sanitizeText(seo.canonicalUrl) || undefined,
    noIndex: seo.noIndex,
    robots: sanitizeText(seo.robots) || undefined,
  };
}
