import type { MetadataRoute } from "next";
import { locales, localizePath } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";
import {
  loadLocations,
  loadNews,
  loadProjects,
} from "@/sanity/load-collections";
import { serviceArchitecture } from "@/content/service-architecture";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/production-capabilities",
  "/our-work",
  "/news",
  "/locations",
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
    lastModified?: string | Date;
  } = {},
): MetadataRoute.Sitemap {
  return locales.map((locale) => {
    const localizedPath = localizePath(path, locale);
    const languages = Object.fromEntries(
      locales.map((alt) => [alt, getSiteUrl(localizePath(path, alt))]),
    ) as Record<string, string>;
    languages["x-default"] = getSiteUrl(localizePath(path, "en"));

    return {
      url: getSiteUrl(localizedPath),
      ...(options.lastModified ? { lastModified: options.lastModified } : {}),
      changeFrequency: options.changeFrequency ?? "weekly",
      priority: options.priority ?? (path === "/" ? 1 : 0.8),
      alternates: {
        languages,
      },
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, news, locations] =
    await Promise.all([
      loadProjects("en"),
      loadNews("en"),
      loadLocations("en"),
    ]);

  return [
    ...staticPaths.flatMap((path) =>
      entry(path, { priority: path === "/" ? 1 : 0.8 }),
    ),
    ...projects.flatMap((item) =>
      entry(`/our-work/${item.slug}`, {
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
    ...locations.flatMap((location) => [
      ...entry(`/locations/${location.slug}`, {
        changeFrequency: "monthly",
        priority: 0.7,
      }),
      ...serviceArchitecture.flatMap((service) =>
        entry(`/locations/${location.slug}/services/${service.slug}`, {
          changeFrequency: "monthly",
          priority: 0.65,
        }),
      ),
    ]),
    ...serviceArchitecture.flatMap((service) => [
      ...entry(`/services/${service.slug}`, { changeFrequency: "monthly", priority: 0.8 }),
      ...entry(`/services/${service.slug}/catalogue`, { changeFrequency: "monthly", priority: 0.7 }),
      ...service.catalogue.categories.flatMap((category) =>
        category.items.flatMap((item) =>
          entry(`/services/${service.slug}/catalogue/${item.slug}`, {
            changeFrequency: "monthly",
            priority: 0.65,
          }),
        ),
      ),
    ]),
    ...news.flatMap((item) =>
      entry(`/news/${item.slug}`, {
        changeFrequency: "weekly",
        priority: 0.6,
        lastModified: item.publishedAt || undefined,
      }),
    ),
  ];
}
