import {
  boothTypes,
  getBoothType,
  getIndustry,
  getLocation,
  getNewsArticle,
  getService,
  industries,
  localizeBoothType,
  localizeIndustry,
  localizeLocation,
  localizeNews,
  localizeService,
  locations,
  newsArticles,
  services,
} from "@/content/catalog";
import {
  getLocalizedProject,
  getProject,
  projects as localProjects,
  type Project,
} from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/fetch";
import {
  BOOTH_TYPE_BY_SLUG_QUERY,
  BOOTH_TYPES_QUERY,
  INDUSTRIES_QUERY,
  INDUSTRY_BY_SLUG_QUERY,
  LOCATION_BY_SLUG_QUERY,
  LOCATIONS_QUERY,
  NAVIGATION_QUERY,
  NEWS_BY_SLUG_QUERY,
  NEWS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECTS_QUERY,
  REDIRECTS_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICES_QUERY,
} from "@/sanity/queries/collections";
import {
  mapBoothType,
  mapIndustry,
  mapLocation,
  mapNewsArticle,
  mapProject,
  mapService,
  type CmsBoothType,
  type CmsIndustry,
  type CmsLocation,
  type CmsNewsArticle,
  type CmsProject,
  type CmsService,
} from "@/sanity/transformers/collections";

function localService(slug: string, locale: Locale): CmsService | null {
  const record = getService(slug);
  if (!record) return null;
  const localized = localizeService(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    overview: localized.overview,
    order: record.order,
    image: localized.image,
    imageAlt: localized.imageAlt,
    benefits: localized.benefits,
    process: localized.process,
    faq: localized.faq,
  };
}

function localBoothType(slug: string, locale: Locale): CmsBoothType | null {
  const record = getBoothType(slug);
  if (!record) return null;
  const localized = localizeBoothType(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    description: localized.description,
    order: record.order,
    image: localized.image,
    imageAlt: localized.imageAlt,
    model3d: record.model3d,
    features: localized.features,
    advantages: localized.advantages,
    useCases: localized.useCases,
    gallery: [],
  };
}

function localProject(project: Project, locale: Locale): CmsProject {
  const localized = getLocalizedProject(project, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    year: localized.year,
    summary: localized.summary,
    challenge: localized.challenge,
    solution: localized.approach,
    result: localized.outcome,
    image: localized.image,
    imageAlt: localized.imageAlt,
    gallery: localized.gallery,
    technologies: project.technologies ?? [],
    event: project.event,
    size: project.size,
    industrySlug: project.industrySlug,
    boothTypeSlug: project.boothTypeSlug,
    locationSlug: project.locationSlug,
    category: localized.category,
    featured: project.featured,
  };
}

export async function loadServices(locale: Locale): Promise<CmsService[]> {
  const remote = await sanityFetch<unknown[]>({
    query: SERVICES_QUERY,
    params: { locale },
    tags: ["service", `service-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapService(doc as Parameters<typeof mapService>[0]))
    .filter((item): item is CmsService => Boolean(item));

  if (mapped.length) return mapped;

  return services.map((item) => localService(item.slug, locale)!);
}

export async function loadService(
  locale: Locale,
  slug: string,
): Promise<CmsService | null> {
  const remote = await sanityFetch<unknown>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["service", `service-${locale}`, `service-${slug}`],
  });

  const mapped = mapService(remote as Parameters<typeof mapService>[0]);
  if (mapped) return mapped;
  return localService(slug, locale);
}

export async function loadBoothTypes(locale: Locale): Promise<CmsBoothType[]> {
  const remote = await sanityFetch<unknown[]>({
    query: BOOTH_TYPES_QUERY,
    params: { locale },
    tags: ["boothType", `boothType-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapBoothType(doc as Parameters<typeof mapBoothType>[0]))
    .filter((item): item is CmsBoothType => Boolean(item));

  if (mapped.length) return mapped;
  return boothTypes.map((item) => localBoothType(item.slug, locale)!);
}

export async function loadBoothType(
  locale: Locale,
  slug: string,
): Promise<CmsBoothType | null> {
  const remote = await sanityFetch<unknown>({
    query: BOOTH_TYPE_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["boothType", `boothType-${locale}`, `boothType-${slug}`],
  });

  const mapped = mapBoothType(remote as Parameters<typeof mapBoothType>[0]);
  if (mapped) return mapped;
  return localBoothType(slug, locale);
}

export async function loadProjects(locale: Locale): Promise<CmsProject[]> {
  const remote = await sanityFetch<unknown[]>({
    query: PROJECTS_QUERY,
    params: { locale },
    tags: ["project", `project-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapProject(doc as Parameters<typeof mapProject>[0]))
    .filter((item): item is CmsProject => Boolean(item));

  if (mapped.length) return mapped;
  return localProjects.map((item) => localProject(item, locale));
}

export async function loadProject(
  locale: Locale,
  slug: string,
): Promise<CmsProject | null> {
  const remote = await sanityFetch<unknown>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["project", `project-${locale}`, `project-${slug}`],
  });

  const mapped = mapProject(remote as Parameters<typeof mapProject>[0]);
  if (mapped) return mapped;

  const project = getProject(slug);
  return project ? localProject(project, locale) : null;
}

export async function loadIndustries(locale: Locale): Promise<CmsIndustry[]> {
  const remote = await sanityFetch<unknown[]>({
    query: INDUSTRIES_QUERY,
    params: { locale },
    tags: ["industry", `industry-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapIndustry(doc as Parameters<typeof mapIndustry>[0]))
    .filter((item): item is CmsIndustry => Boolean(item));

  if (mapped.length) return mapped;

  return industries.map((item) => {
    const localized = localizeIndustry(item, locale);
    return {
      slug: localized.slug,
      title: localized.title,
      excerpt: localized.excerpt,
      overview: localized.overview,
      order: item.order,
      image: localized.image,
      imageAlt: localized.imageAlt,
      challenges: localized.challenges,
      solutions: localized.solutions,
      recommendedBoothTypeSlugs: localized.recommendedBoothTypeSlugs,
    };
  });
}

export async function loadIndustry(
  locale: Locale,
  slug: string,
): Promise<CmsIndustry | null> {
  const remote = await sanityFetch<unknown>({
    query: INDUSTRY_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["industry", `industry-${locale}`, `industry-${slug}`],
  });

  const mapped = mapIndustry(remote as Parameters<typeof mapIndustry>[0]);
  if (mapped) return mapped;

  const record = getIndustry(slug);
  if (!record) return null;
  const localized = localizeIndustry(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    overview: localized.overview,
    order: record.order,
    image: localized.image,
    imageAlt: localized.imageAlt,
    challenges: localized.challenges,
    solutions: localized.solutions,
    recommendedBoothTypeSlugs: localized.recommendedBoothTypeSlugs,
  };
}

export async function loadLocations(locale: Locale): Promise<CmsLocation[]> {
  const remote = await sanityFetch<unknown[]>({
    query: LOCATIONS_QUERY,
    params: { locale },
    tags: ["location", `location-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapLocation(doc as Parameters<typeof mapLocation>[0]))
    .filter((item): item is CmsLocation => Boolean(item));

  if (mapped.length) return mapped;

  return locations.map((item) => {
    const localized = localizeLocation(item, locale);
    return {
      slug: localized.slug,
      title: localized.title,
      excerpt: localized.excerpt,
      localExperience: localized.localExperience,
      capabilities: localized.capabilities,
      countryCode: localized.countryCode,
      order: item.order,
      image: localized.image,
      imageAlt: localized.imageAlt,
    };
  });
}

export async function loadLocation(
  locale: Locale,
  slug: string,
): Promise<CmsLocation | null> {
  const remote = await sanityFetch<unknown>({
    query: LOCATION_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["location", `location-${locale}`, `location-${slug}`],
  });

  const mapped = mapLocation(remote as Parameters<typeof mapLocation>[0]);
  if (mapped) return mapped;

  const record = getLocation(slug);
  if (!record) return null;
  const localized = localizeLocation(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    localExperience: localized.localExperience,
    capabilities: localized.capabilities,
    countryCode: localized.countryCode,
    order: record.order,
    image: localized.image,
    imageAlt: localized.imageAlt,
  };
}

export async function loadNews(locale: Locale): Promise<CmsNewsArticle[]> {
  const remote = await sanityFetch<unknown[]>({
    query: NEWS_QUERY,
    params: { locale },
    tags: ["newsArticle", `newsArticle-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapNewsArticle(doc as Parameters<typeof mapNewsArticle>[0]))
    .filter((item): item is CmsNewsArticle => Boolean(item));

  if (mapped.length) return mapped;

  return newsArticles.map((item) => {
    const localized = localizeNews(item, locale);
    return {
      slug: localized.slug,
      title: localized.title,
      excerpt: localized.excerpt,
      image: localized.image,
      imageAlt: localized.imageAlt,
      publishedAt: localized.publishedAt,
      readingTime: localized.readingTime,
      category: localized.category,
      tags: localized.tags,
      author: localized.author,
      body: localized.body,
    };
  });
}

export async function loadNewsArticle(
  locale: Locale,
  slug: string,
): Promise<CmsNewsArticle | null> {
  const remote = await sanityFetch<unknown>({
    query: NEWS_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["newsArticle", `newsArticle-${locale}`, `newsArticle-${slug}`],
  });

  const mapped = mapNewsArticle(remote as Parameters<typeof mapNewsArticle>[0]);
  if (mapped?.body?.length) return mapped;
  if (mapped && !mapped.body.length) {
    const local = getNewsArticle(slug);
    if (local) {
      const localized = localizeNews(local, locale);
      return { ...mapped, body: localized.body };
    }
    return mapped;
  }

  const record = getNewsArticle(slug);
  if (!record) return null;
  const localized = localizeNews(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    image: localized.image,
    imageAlt: localized.imageAlt,
    publishedAt: localized.publishedAt,
    readingTime: localized.readingTime,
    category: localized.category,
    tags: localized.tags,
    author: localized.author,
    body: localized.body,
  };
}

export async function loadNavigation(locale: Locale) {
  return sanityFetch<{
    items?: unknown[];
    primary?: { label?: string; href?: string }[];
    footer?: { label?: string; href?: string }[];
    ctaLabel?: string;
    ctaHref?: string;
    cta?: { label?: string; href?: string };
  }>({
    query: NAVIGATION_QUERY,
    params: { locale },
    tags: ["navigation", `navigation-${locale}`],
  });
}

export async function loadRedirects() {
  const remote = await sanityFetch<{ from?: string; to?: string; status?: number }[]>({
    query: REDIRECTS_QUERY,
    tags: ["redirect"],
  });
  return (remote ?? [])
    .filter((item) => item.from && item.to)
    .map((item) => ({
      from: item.from!,
      to: item.to!,
      status: item.status === 302 ? 302 : 301,
    }));
}
