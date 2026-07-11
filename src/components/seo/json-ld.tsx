import { getSiteConfig } from "@/lib/site-config";
import { getSiteUrl } from "@/lib/seo";
import { localizePath, type Locale } from "@/lib/i18n";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function breadcrumbsJsonLd(items: BreadcrumbItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: getSiteUrl(localizePath(item.href, locale)) }
        : {}),
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: getSiteUrl(localizePath(input.path, input.locale)),
    image: input.image,
    provider: {
      "@type": "Organization",
      name: getSiteConfig().name,
      url: getSiteConfig().url,
    },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  datePublished?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: getSiteUrl(localizePath(input.path, input.locale)),
    image: input.image,
    datePublished: input.datePublished,
    author: {
      "@type": "Person",
      name: input.author ?? getSiteConfig().name,
    },
    publisher: {
      "@type": "Organization",
      name: getSiteConfig().name,
      url: getSiteConfig().url,
    },
  };
}

export function creativeWorkJsonLd(input: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
  dateCreated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: getSiteUrl(localizePath(input.path, input.locale)),
    image: input.image,
    dateCreated: input.dateCreated,
    creator: {
      "@type": "Organization",
      name: getSiteConfig().name,
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
