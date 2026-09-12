import type { ImageLoaderProps } from "next/image";
import { isBrandAsset, placeholderUrl } from "@/lib/placeholders";

const OPTIMIZED_HOSTS = new Set(["cdn.sanity.io", "images.unsplash.com"]);

export default function imageLoader({ src, width }: ImageLoaderProps): string {
  if (isBrandAsset(src)) return src;

  const sourceWidth = width;
  let sourceHeight = width;

  try {
    const sourceUrl = new URL(src, "https://placeholder.local");
    const requestedHeight = Number(sourceUrl.searchParams.get("h"));
    if (requestedHeight > 0) sourceHeight = requestedHeight;
  } catch {
    // Keep the requested display width for malformed or non-URL sources.
  }

  if (src.startsWith("/") || !src.startsWith("http")) {
    return placeholderUrl(sourceWidth, sourceHeight);
  }

  const url = new URL(src);
  if (!OPTIMIZED_HOSTS.has(url.hostname)) {
    return placeholderUrl(sourceWidth, sourceHeight);
  }

  return placeholderUrl(sourceWidth, sourceHeight);
}