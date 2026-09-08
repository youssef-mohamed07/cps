import type { MetadataRoute } from "next";
import { locales, localizePath } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";
import {
  loadNews,
  loadProjects,
} from "@/sanity/load-collections";
import { serviceArchitecture } from "@/content/service-architecture";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/production-capabilities",
  "/work",
  "/news",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
];

function entry(
  path: string,
  options: {
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority?: number;
  } = {},
): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.map((locale) => {
    const localizedPath = localizePath(path, locale);
    const languages = Object.fromEntries(
      locales.map((alt) => [alt, getSiteUrl(localizePath(path, alt))]),
    ) as Record<string, string>;
    languages["x-default"] = getSiteUrl(localizePath(path, "en"));

    return {
      url: getSiteUrl(localizedPath),
      lastModified: now,
      changeFrequency: options.changeFrequency ?? "weekly",
      priority: options.priority ?? (path === "/" ? 1 : 0.8),
      alternates: {
        languages,
      },
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, news] =
    await Promise.all([
      loadProjects("en"),
      loadNews("en"),
    ]);

  return [
    ...staticPaths.flatMap((path) =>
      entry(path, { priority: path === "/" ? 1 : 0.8 }),
    ),
    ...projects.flatMap((item) =>
      entry(`/work/${item.slug}`, {
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
    ...serviceArchitecture.flatMap((item) => [
      ...entry(`/services/${item.slug}`, { changeFrequency: "monthly", priority: 0.8 }),
      ...entry(`/services/${item.slug}/catalogue`, { changeFrequency: "monthly", priority: 0.7 }),
    ]),
    ...news.flatMap((item) =>
      entry(`/news/${item.slug}`, {
        changeFrequency: "weekly",
        priority: 0.6,
      }),
    ),
  ];
}
