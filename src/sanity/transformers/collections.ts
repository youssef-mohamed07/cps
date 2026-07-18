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
  overviewTitle?: string;
  overviewBullets?: { title: string; description: string }[];
  heroLead?: string;
  secondaryCta?: { label: string; serviceSlug: string };
  cover?: {
    eyebrow: string;
    title: string;
    support: string;
    items: { title: string; description: string }[];
  };
  designs?: {
    eyebrow?: string;
    title: string;
    support?: string;
    cta?: { label: string; href: string };
    items: {
      title: string;
      description: string;
      image: string;
      imageAlt?: string;
      serviceSlug?: string;
    }[];
  };
  why?: {
    title: string;
    support?: string;
    items: { title: string; description: string }[];
  };
  benefits: { title: string; description: string }[];
  process: {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  }[];
  faq: { question: string; answer: string }[];
  cta?: { label: string; href: string };
};

export type CmsBoothType = CmsListItem & {
  description: string;
  overviewTitle: string;
  model3d?: string;
  features: { title: string; description: string }[];
  advantages: { title: string; description: string }[];
  useCases: string[];
  faq: { question: string; answer: string }[];
  gallery: { src: string; alt: string }[];
  cta?: { label: string; href: string };
  compareLabel?: string;
  indoor?: boolean;
  outdoor?: boolean;
  reusable?: boolean;
  highCustomization?: boolean;
  fastSetup?: boolean;
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
  motionVideo?: string;
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

type SectionItemDoc = {
  title?: string;
  description?: string;
  image?: SanityImage;
  imageUrl?: string;
  imageAlt?: string;
  serviceSlug?: string;
};

type ContentSectionDoc = {
  eyebrow?: string;
  title?: string;
  support?: string;
  cta?: { label?: string; href?: string };
  items?: SectionItemDoc[];
};

function mapContentItems(items: SectionItemDoc[] | undefined) {
  return (items ?? [])
    .filter((item) => item.title)
    .map((item) => ({
      title: item.title!,
      description: item.description ?? "",
      image: toImageSrc(item.image, item.imageUrl ?? ""),
      imageAlt: item.imageAlt ?? item.image?.alt ?? item.title!,
      serviceSlug: item.serviceSlug,
    }));
}

export function mapService(doc: {
  title?: string;
  slug?: string;
  excerpt?: string;
  overview?: string;
  overviewTitle?: string;
  overviewBullets?: { title?: string; description?: string }[];
  heroLead?: string;
  secondaryCta?: { label?: string; serviceSlug?: string };
  order?: number;
  hero?: SanityImage;
  heroUrl?: string;
  cover?: ContentSectionDoc;
  designs?: ContentSectionDoc;
  why?: ContentSectionDoc;
  benefits?: { title?: string; description?: string }[];
  process?: {
    title?: string;
    description?: string;
    image?: SanityImage;
    imageUrl?: string;
    imageAlt?: string;
  }[];
  faq?: { question?: string; answer?: string }[];
  cta?: { label?: string; href?: string };
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsService | null {
  if (!doc?.title || !doc.slug) return null;

  const designItems = mapContentItems(doc.designs?.items);
  const whyItems = (doc.why?.items ?? [])
    .filter((item) => item.title)
    .map((item) => ({
      title: item.title!,
      description: item.description ?? "",
    }));
  const coverItems = (doc.cover?.items ?? [])
    .filter((item) => item.title)
    .map((item) => ({
      title: item.title!,
      description: item.description ?? "",
    }));

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    overview: doc.overview ?? "",
    overviewTitle: doc.overviewTitle,
    overviewBullets: (doc.overviewBullets ?? [])
      .filter((item) => item.title)
      .map((item) => ({
        title: item.title!,
        description: item.description ?? "",
      })),
    heroLead: doc.heroLead,
    secondaryCta:
      doc.secondaryCta?.label && doc.secondaryCta.serviceSlug
        ? {
            label: doc.secondaryCta.label,
            serviceSlug: doc.secondaryCta.serviceSlug,
          }
        : undefined,
    order: doc.order,
    image: toImageSrc(doc.hero, doc.heroUrl ?? ""),
    imageAlt: doc.hero?.alt ?? doc.title,
    cover: doc.cover?.title
      ? {
          eyebrow: doc.cover.eyebrow ?? "",
          title: doc.cover.title,
          support: doc.cover.support ?? "",
          items: coverItems,
        }
      : undefined,
    designs: doc.designs?.title
      ? {
          eyebrow: doc.designs.eyebrow,
          title: doc.designs.title,
          support: doc.designs.support,
          cta:
            doc.designs.cta?.label && doc.designs.cta.href
              ? { label: doc.designs.cta.label, href: doc.designs.cta.href }
              : undefined,
          items: designItems.map((item) => ({
            title: item.title,
            description: item.description,
            image: item.image,
            imageAlt: item.imageAlt,
            serviceSlug: item.serviceSlug,
          })),
        }
      : undefined,
    why: doc.why?.title
      ? {
          title: doc.why.title,
          support: doc.why.support,
          items: whyItems,
        }
      : undefined,
    benefits: (doc.benefits ?? [])
      .filter((item) => item.title)
      .map((item) => ({ title: item.title!, description: item.description ?? "" })),
    process: (doc.process ?? [])
      .filter((item) => item.title)
      .map((item) => ({
        title: item.title!,
        description: item.description ?? "",
        image: toImageSrc(item.image, item.imageUrl ?? "") || undefined,
        imageAlt: item.imageAlt ?? item.image?.alt,
      })),
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
  overviewTitle?: string;
  description?: string;
  order?: number;
  hero?: SanityImage;
  heroUrl?: string;
  compareLabel?: string;
  indoor?: boolean;
  outdoor?: boolean;
  reusable?: boolean;
  highCustomization?: boolean;
  fastSetup?: boolean;
  features?: ({ title?: string; description?: string } | string)[];
  advantages?: { title?: string; description?: string }[];
  useCases?: string[];
  faq?: { question?: string; answer?: string }[];
  gallery?: { image?: SanityImage; imageUrl?: string; alt?: string }[];
  model3d?: string;
  cta?: { label?: string; href?: string };
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsBoothType | null {
  if (!doc?.title || !doc.slug) return null;
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? "",
    overviewTitle: doc.overviewTitle ?? "",
    description: doc.description ?? "",
    order: doc.order,
    image: toImageSrc(doc.hero, doc.heroUrl ?? ""),
    imageAlt: doc.hero?.alt ?? doc.title,
    compareLabel: doc.compareLabel,
    indoor: doc.indoor,
    outdoor: doc.outdoor,
    reusable: doc.reusable,
    highCustomization: doc.highCustomization,
    fastSetup: doc.fastSetup,
    model3d: doc.model3d || undefined,
    features: (doc.features ?? [])
      .map((item) =>
        typeof item === "string"
          ? { title: item, description: "" }
          : { title: item.title ?? "", description: item.description ?? "" },
      )
      .filter((item) => item.title),
    advantages: (doc.advantages ?? [])
      .filter((item) => item.title)
      .map((item) => ({ title: item.title!, description: item.description ?? "" })),
    useCases: doc.useCases ?? [],
    faq: (doc.faq ?? [])
      .filter((item) => item.question)
      .map((item) => ({ question: item.question!, answer: item.answer ?? "" })),
    gallery: (doc.gallery ?? [])
      .map((item) => ({
        src: toImageSrc(item.image, item.imageUrl ?? ""),
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
  motionVideo?: string;
  hero?: SanityImage;
  heroUrl?: string;
  gallery?: { image?: SanityImage; imageUrl?: string; alt?: string }[];
  industrySlug?: string;
  boothTypeSlug?: string;
  locationSlug?: string;
  clientName?: string;
  seo?: Parameters<typeof toSeoMeta>[0];
}): CmsProject | null {
  if (!doc?.title || !doc.slug) return null;
  const gallery = (doc.gallery ?? [])
    .map((item) => toImageSrc(item.image, item.imageUrl ?? ""))
    .filter(Boolean);
  return {
    slug: doc.slug,
    title: doc.title,
    year: doc.year ?? "",
    summary: doc.summary ?? "",
    challenge: doc.challenge ?? "",
    solution: doc.solution ?? "",
    result: doc.result ?? "",
    image: toImageSrc(doc.hero, doc.heroUrl ?? ""),
    imageAlt: doc.hero?.alt ?? doc.title,
    gallery,
    motionVideo: doc.motionVideo || undefined,
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
  heroUrl?: string;
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
    image: toImageSrc(doc.hero, doc.heroUrl ?? ""),
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
  capabilities?: { title?: string; description?: string }[];
  order?: number;
  hero?: SanityImage;
  heroUrl?: string;
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
    capabilities: (doc.capabilities ?? [])
      .filter((item) => item.title)
      .map((item) => ({
        title: item.title!,
        description: item.description ?? "",
      })),
    order: doc.order,
    image: toImageSrc(doc.hero, doc.heroUrl ?? ""),
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
  featuredImageUrl?: string;
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
    image: toImageSrc(doc.featuredImage, doc.featuredImageUrl ?? ""),
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
