import type { MetadataRoute } from "next";
import { locales, localizePath } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/seo";
import {
  loadBoothTypes,
  loadIndustries,
  loadLocations,
  loadNews,
  loadProjects,
  loadServices,
} from "@/sanity/load-collections";

const staticPaths = [
  "/",
  "/about",
  "/services",
  "/booth-types",
  "/work",
  "/industries",
  "/locations",
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
  const [projects, industries, locations, services, boothTypes, news] =
    await Promise.all([
      loadProjects("en"),
      loadIndustries("en"),
      loadLocations("en"),
      loadServices("en"),
      loadBoothTypes("en"),
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
    ...industries.flatMap((item) =>
      entry(`/industries/${item.slug}`, {
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
    ...locations.flatMap((item) =>
      entry(`/locations/${item.slug}`, {
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    ),
    ...locations.flatMap((location) =>
      services.flatMap((service) =>
        entry(`/locations/${location.slug}/services/${service.slug}`, {
          changeFrequency: "monthly",
          priority: 0.7,
        }),
      ),
    ),
    ...locations.flatMap((location) =>
      boothTypes.flatMap((boothType) =>
        entry(`/locations/${location.slug}/booth-types/${boothType.slug}`, {
          changeFrequency: "monthly",
          priority: 0.7,
        }),
      ),
    ),
    ...news.flatMap((item) =>
      entry(`/news/${item.slug}`, {
        changeFrequency: "weekly",
        priority: 0.6,
      }),
    ),
  ];
}
