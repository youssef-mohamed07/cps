import { getNavigationLocal, type NavigationConfig, type NavPrimaryItem } from "@/content/navigation";
import type { Locale } from "@/lib/i18n";
import { locationBoothTypePath, locationServicePath } from "@/lib/locations";
import { sanityFetch } from "@/sanity/fetch";
import { NAVIGATION_QUERY } from "@/sanity/queries/collections";
import { toImageSrc } from "@/sanity/transformers/shared";

type SanityNavDoc = {
  items?: unknown[];
  primary?: { label?: string; href?: string }[];
  footer?: { label?: string; href?: string }[];
  ctaLabel?: string;
  ctaHref?: string;
  cta?: { label?: string; href?: string };
};

function mapLink(link: {
  label?: string;
  href?: string;
  description?: string;
  icon?: string;
  image?: { asset?: unknown; alt?: string };
}) {
  if (!link?.label || !link.href) return null;
  const image = toImageSrc(link.image);
  return {
    label: link.label,
    href: link.href,
    description: link.description,
    icon: link.icon,
    image: image || undefined,
    imageAlt: link.image?.alt || link.label,
  };
}

function mapFeatured(featured: {
  enabled?: boolean;
  title?: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  image?: { asset?: unknown; alt?: string };
  serviceTitle?: string;
  serviceExcerpt?: string;
  serviceSlug?: string;
  serviceImage?: { asset?: unknown; alt?: string };
  boothTitle?: string;
  boothExcerpt?: string;
  boothSlug?: string;
  boothImage?: { asset?: unknown; alt?: string };
} | null | undefined) {
  if (!featured || featured.enabled === false) return undefined;

  const fromService = featured.serviceSlug
    ? {
        title: featured.serviceTitle,
        description: featured.serviceExcerpt,
        href: locationServicePath(featured.serviceSlug),
        image: featured.serviceImage,
      }
    : null;
  const fromBooth = featured.boothSlug
    ? {
        title: featured.boothTitle,
        description: featured.boothExcerpt,
        href: locationBoothTypePath(featured.boothSlug),
        image: featured.boothImage,
      }
    : null;
  const source = fromService || fromBooth;

  const title = featured.title || source?.title;
  const description = featured.description || source?.description || "";
  const href = featured.href || source?.href;
  const image = toImageSrc(featured.image) || toImageSrc(source?.image);
  if (!title || !href || !image) return undefined;

  return {
    enabled: true,
    title,
    description,
    href,
    ctaLabel: featured.ctaLabel || "View",
    image,
    imageAlt: featured.image?.alt || source?.image?.alt || title,
  };
}

function mapItem(item: {
  enabled?: boolean;
  label?: string;
  href?: string;
  kind?: string;
  mega?: {
    enabled?: boolean;
    layout?: string;
    title?: string;
    description?: string;
    columns?: {
      title?: string;
      links?: {
        label?: string;
        href?: string;
        description?: string;
        icon?: string;
        image?: { asset?: unknown; alt?: string };
      }[];
    }[];
    featured?: Parameters<typeof mapFeatured>[0];
    cta?: { label?: string; href?: string };
  };
  dropdown?: {
    label?: string;
    href?: string;
    description?: string;
    icon?: string;
    image?: { asset?: unknown; alt?: string };
  }[];
}): NavPrimaryItem | null {
  if (!item?.label || !item.href || item.enabled === false) return null;

  const kind =
    item.kind === "mega" || item.kind === "dropdown" || item.kind === "link"
      ? item.kind
      : "link";

  const mapped: NavPrimaryItem = {
    enabled: true,
    label: item.label,
    href: item.href,
    kind,
  };

  if (kind === "mega" && item.mega && item.mega.enabled !== false) {
    const columns = (item.mega.columns ?? [])
      .map((column) => ({
        title: column.title,
        links: (column.links ?? [])
          .map(mapLink)
          .filter((link): link is NonNullable<typeof link> => Boolean(link)),
      }))
      .filter((column) => column.links.length);

    mapped.mega = {
      enabled: true,
      layout:
        item.mega.layout === "services" || item.mega.layout === "boothTypes"
          ? item.mega.layout
          : "columns",
      title: item.mega.title || item.label,
      description: item.mega.description || "",
      columns,
      featured: mapFeatured(item.mega.featured),
      cta:
        item.mega.cta?.label && item.mega.cta.href
          ? { label: item.mega.cta.label, href: item.mega.cta.href }
          : undefined,
    };
  }

  if (kind === "dropdown") {
    mapped.dropdown = (item.dropdown ?? [])
      .map(mapLink)
      .filter((link): link is NonNullable<typeof link> => Boolean(link));
  }

  return mapped;
}

export async function resolveNavigation(locale: Locale): Promise<NavigationConfig> {
  const local = getNavigationLocal(locale);
  const remote = await sanityFetch<SanityNavDoc>({
    query: NAVIGATION_QUERY,
    params: { locale },
    tags: ["navigation", `navigation-${locale}`],
  });

  if (!remote) return local;

  const fromItems = (remote.items ?? [])
    .map((item) => mapItem(item as Parameters<typeof mapItem>[0]))
    .filter((item): item is NavPrimaryItem => Boolean(item));
  const itemsWithLocalMegaFallback = fromItems.map((item) => {
    const localItem = local.items.find((candidate) => candidate.href === item.href);

    if (item.kind !== "link" || localItem?.kind !== "mega" || !localItem.mega) {
      return item;
    }

    return {
      ...item,
      kind: "mega" as const,
      mega: localItem.mega,
    };
  });

  const fromLegacy = (remote.primary ?? [])
    .filter((item) => item.label && item.href)
    .map(
      (item): NavPrimaryItem => ({
        enabled: true,
        label: item.label!,
        href: item.href!,
        kind: "link",
      }),
    );

  const items = itemsWithLocalMegaFallback.length
    ? itemsWithLocalMegaFallback
    : fromLegacy.length
      ? fromLegacy
      : local.items;

  const footer = (remote.footer ?? [])
    .map(mapLink)
    .filter((link): link is NonNullable<typeof link> => Boolean(link));

  const ctaLabel = remote.ctaLabel || remote.cta?.label || local.cta.label;
  const ctaHref = remote.ctaHref || remote.cta?.href || local.cta.href;

  return {
    items,
    footer: footer.length ? footer : local.footer,
    cta: { label: ctaLabel, href: ctaHref },
    langLabel: local.langLabel,
    langHrefLocale: local.langHrefLocale,
  };
}
