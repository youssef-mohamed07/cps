import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { locales, localizePath } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";

const staticPaths = ["/", "/about", "/services", "/work", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: getSiteUrl(localizePath(path, locale)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
  );

  const projectPages = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: getSiteUrl(localizePath(`/work/${project.slug}`, locale)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...pages, ...projectPages];
}
