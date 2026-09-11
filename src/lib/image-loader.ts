import type { ImageLoaderProps } from "next/image";

const OPTIMIZED_HOSTS = new Set(["cdn.sanity.io", "images.unsplash.com"]);

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  if (src.startsWith("/") || !src.startsWith("http")) return src;

  const url = new URL(src);
  if (!OPTIMIZED_HOSTS.has(url.hostname)) return src;

  url.searchParams.set("w", String(width));
  if (quality) url.searchParams.set("q", String(quality));
  return url.toString();
}