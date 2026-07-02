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
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    ogImage: ogImage || undefined,
    canonicalUrl: seo.canonicalUrl,
    noIndex: seo.noIndex,
    robots: seo.robots,
  };
}
