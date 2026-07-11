import type { SeoMeta } from "@/types/seo";
import { toImageSrc, toSeoMeta } from "@/sanity/transformers/shared";

type SanityImage = { asset?: unknown; alt?: string } | null | undefined;

export type CmsListItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  order?: number;
  seo?: SeoMeta;
};

export type CmsService = CmsListItem & {
  overview: string;
  benefits: { title: string; description: string }[];
  process: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  cta?: { label: string; href: string };
};

export type CmsBoothType = CmsListItem & {
  description: string;
  model3d?: string;
  features: string[];
  advantages: { title: string; description: string }[];
  useCases: string[];
  gallery: { src: string; alt: string }[];
  cta?: { label: string; href: string };
};

export type CmsProject = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  imageAlt: string;
  gallery: string[];
  technologies: string[];
  event?: string;
  size?: string;
  industrySlug?: string;
  boothTypeSlug?: string;
  locationSlug?: string;
  clientName?: string;
  category: string;
  featured?: boolean;
  seo?: SeoMeta;
};

export type CmsIndustry = CmsListItem & {
  overview: string;
  challenges: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  recommendedBoothTypeSlugs: string[];
  cta?: { label: string; href: string };
};

export type CmsLocation = CmsListItem & {
  countryCode: string;
  localExperience: string;
  capabilities: { title: string; description: string }[];
  cta?: { label: string; href: string };
};

export type CmsNewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  readingTime: number;
  category: string;
  tags: string[];
  author: string;
  body: string[];
  seo?: SeoMeta;
};

function mapSeo(seo: Parameters<typeof toSeoMeta>[0]): SeoMeta | undefined {
  return toSeoMeta(seo);
}

export function mapService(doc: {
  title?: string;
  slug?: string;
  excerpt?: string;
  overview?: string;
  order?: number;
  hero?: SanityImage;
  benefits?: { title?: string; description?: string }[];
  process?: { title?: string; description?: string }[];
  faq?: { question?: string; answer?: string }[];
  cta?: { label?: string; href?: string };
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsService | null {
  if (!doc?.title || !doc.slug) return null;
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    overview: doc.overview ?? "",
    order: doc.order,
    image: toImageSrc(doc.hero),
    imageAlt: doc.hero?.alt ?? doc.title,
    benefits: (doc.benefits ?? [])
      .filter((item) => item.title)
      .map((item) => ({ title: item.title!, description: item.description ?? "" })),
    process: (doc.process ?? [])
      .filter((item) => item.title)
      .map((item) => ({ title: item.title!, description: item.description ?? "" })),
    faq: (doc.faq ?? [])
      .filter((item) => item.question)
      .map((item) => ({ question: item.question!, answer: item.answer ?? "" })),
    cta:
      doc.cta?.label && doc.cta.href
        ? { label: doc.cta.label, href: doc.cta.href }
        : undefined,
    seo: mapSeo(doc.seo),
  };
}

export function mapBoothType(doc: {
  title?: string;
  slug?: string;
  excerpt?: string;
  description?: string;
  order?: number;
  hero?: SanityImage;
  features?: string[];
  advantages?: { title?: string; description?: string }[];
  useCases?: string[];
  gallery?: { image?: SanityImage; alt?: string }[];
  cta?: { label?: string; href?: string };
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsBoothType | null {
  if (!doc?.title || !doc.slug) return null;
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    description: doc.description ?? "",
    order: doc.order,
    image: toImageSrc(doc.hero),
    imageAlt: doc.hero?.alt ?? doc.title,
    features: doc.features ?? [],
    advantages: (doc.advantages ?? [])
      .filter((item) => item.title)
      .map((item) => ({ title: item.title!, description: item.description ?? "" })),
    useCases: doc.useCases ?? [],
    gallery: (doc.gallery ?? [])
      .map((item) => ({
        src: toImageSrc(item.image),
        alt: item.alt ?? doc.title!,
      }))
      .filter((item) => item.src),
    cta:
      doc.cta?.label && doc.cta.href
        ? { label: doc.cta.label, href: doc.cta.href }
        : undefined,
    seo: mapSeo(doc.seo),
  };
}

export function mapProject(doc: {
  title?: string;
  slug?: string;
  year?: string;
  summary?: string;
  challenge?: string;
  solution?: string;
  result?: string;
  technologies?: string[];
  event?: string;
  size?: string;
  featured?: boolean;
  hero?: SanityImage;
  gallery?: { image?: SanityImage; alt?: string }[];
  industrySlug?: string;
  boothTypeSlug?: string;
  locationSlug?: string;
  clientName?: string;
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsProject | null {
  if (!doc?.title || !doc.slug) return null;
  const gallery = (doc.gallery ?? [])
    .map((item) => toImageSrc(item.image))
    .filter(Boolean);
  return {
    slug: doc.slug,
    title: doc.title,
    year: doc.year ?? "",
    summary: doc.summary ?? "",
    challenge: doc.challenge ?? "",
    solution: doc.solution ?? "",
    result: doc.result ?? "",
    image: toImageSrc(doc.hero),
    imageAlt: doc.hero?.alt ?? doc.title,
    gallery,
    technologies: doc.technologies ?? [],
    event: doc.event,
    size: doc.size,
    industrySlug: doc.industrySlug,
    boothTypeSlug: doc.boothTypeSlug,
    locationSlug: doc.locationSlug,
    clientName: doc.clientName,
    category: doc.clientName || doc.industrySlug || "Project",
    featured: doc.featured,
    seo: mapSeo(doc.seo),
  };
}

export function mapIndustry(doc: {
  title?: string;
  slug?: string;
  excerpt?: string;
  overview?: string;
  order?: number;
  hero?: SanityImage;
  challenges?: { title?: string; description?: string }[];
  solutions?: { title?: string; description?: string }[];
  recommendedBoothTypeSlugs?: string[];
  cta?: { label?: string; href?: string };
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsIndustry | null {
  if (!doc?.title || !doc.slug) return null;
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    overview: doc.overview ?? "",
    order: doc.order,
    image: toImageSrc(doc.hero),
    imageAlt: doc.hero?.alt ?? doc.title,
    challenges: (doc.challenges ?? [])
      .filter((item) => item.title)
      .map((item) => ({ title: item.title!, description: item.description ?? "" })),
    solutions: (doc.solutions ?? [])
      .filter((item) => item.title)
      .map((item) => ({ title: item.title!, description: item.description ?? "" })),
    recommendedBoothTypeSlugs: (doc.recommendedBoothTypeSlugs ?? []).filter(Boolean),
    cta:
      doc.cta?.label && doc.cta.href
        ? { label: doc.cta.label, href: doc.cta.href }
        : undefined,
    seo: mapSeo(doc.seo),
  };
}

export function mapLocation(doc: {
  title?: string;
  slug?: string;
  countryCode?: string;
  excerpt?: string;
  localExperience?: string;
  order?: number;
  hero?: SanityImage;
  cta?: { label?: string; href?: string };
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsLocation | null {
  if (!doc?.title || !doc.slug) return null;
  return {
    slug: doc.slug,
    title: doc.title,
    countryCode: doc.countryCode ?? "",
    excerpt: doc.excerpt ?? "",
    localExperience: doc.localExperience ?? "",
    capabilities: [],
    order: doc.order,
    image: toImageSrc(doc.hero),
    imageAlt: doc.hero?.alt ?? doc.title,
    cta:
      doc.cta?.label && doc.cta.href
        ? { label: doc.cta.label, href: doc.cta.href }
        : undefined,
    seo: mapSeo(doc.seo),
  };
}

export function mapNewsArticle(doc: {
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  readingTime?: number;
  tags?: string[];
  featuredImage?: SanityImage;
  category?: string;
  author?: string;
  body?: unknown;
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsNewsArticle | null {
  if (!doc?.title || !doc.slug) return null;

  let body: string[] = [];
  if (Array.isArray(doc.body)) {
    body = doc.body
      .map((block) => {
        if (typeof block === "string") return block;
        if (
          block &&
          typeof block === "object" &&
          "children" in block &&
          Array.isArray((block as { children?: { text?: string }[] }).children)
        ) {
          return (block as { children: { text?: string }[] }).children
            .map((child) => child.text ?? "")
            .join("");
        }
        return "";
      })
      .filter(Boolean);
  }

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    image: toImageSrc(doc.featuredImage),
    imageAlt: doc.featuredImage?.alt ?? doc.title,
    publishedAt: doc.publishedAt ?? "",
    readingTime: doc.readingTime ?? 3,
    category: doc.category ?? "Insights",
    tags: doc.tags ?? [],
    author: doc.author ?? "CPS",
    body,
    seo: mapSeo(doc.seo),
  };
}
