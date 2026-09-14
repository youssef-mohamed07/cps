import type { ImageLoaderProps } from "next/image";
import { isBrandAsset, placeholderUrl } from "@/lib/placeholders";

const OPTIMIZED_HOSTS = new Set(["cdn.sanity.io", "images.unsplash.com"]);
const CLOUDINARY_HOST = "res.cloudinary.com";
const CLOUDINARY_PATH_PREFIXES = [
  "/jivfgunl/image/upload/",
  "/jivfgunl/video/upload/",
] as const;

function optimizedRemoteImageUrl(
  url: URL,
  width: number,
  quality?: number,
): string {
  if (!OPTIMIZED_HOSTS.has(url.hostname)) return "";

  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 85));
  url.searchParams.set("auto", "format");
  if (!url.searchParams.has("fit")) url.searchParams.set("fit", "max");
  return url.toString();
}

function cloudinaryImageUrl(url: URL, width: number, quality?: number): string {
  if (
    url.hostname !== CLOUDINARY_HOST ||
    !CLOUDINARY_PATH_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))
  ) {
    return "";
  }

  const version = url.pathname.match(/\/v\d+\//);
  if (!version?.index) return "";

  const transform = `c_limit,w_${width}/f_auto/q_${quality ?? "auto"}`;
  url.pathname = `${url.pathname.slice(0, version.index)}/${transform}${url.pathname.slice(version.index)}`;
  return url.toString();
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
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
  const cloudinaryUrl = cloudinaryImageUrl(url, width, quality);
  if (cloudinaryUrl) return cloudinaryUrl;

  const optimizedRemoteUrl = optimizedRemoteImageUrl(url, width, quality);
  if (optimizedRemoteUrl) return optimizedRemoteUrl;

  return placeholderUrl(sourceWidth, sourceHeight);
}
