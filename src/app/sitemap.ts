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
  "/our-work",
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
      entry(`/our-work/${item.slug}`, {
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
    ...serviceArchitecture.flatMap((service) => [
      ...entry(`/services/${service.slug}`, { changeFrequency: "monthly", priority: 0.8 }),
      ...entry(`/services/${service.slug}/catalogue`, { changeFrequency: "monthly", priority: 0.7 }),
      // Location x service landing pages stay reachable via internal links and
      // redirects, but are intentionally excluded from the sitemap: they are
      // templated variants of the canonical /services/[slug] page, and pushing
      // dozens of near-duplicate city variants risks thin/doorway-content
      // signals. See docs/architecture.md "SEO" section.
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
      }),
    ),
  ];
}
