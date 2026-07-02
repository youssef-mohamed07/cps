import type { MetadataRoute } from "next";
import { locales, localizePath } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.flatMap((locale) => ({
    url: getSiteUrl(localizePath("/", locale)),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  }));
}
