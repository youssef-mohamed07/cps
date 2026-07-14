import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadLocations } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const title = localeParam === "ar" ? "المواقع" : "Locations";
  const description =
    localeParam === "ar"
      ? "خدمات أجنحة المعارض عبر دول الخليج ومصر."
      : "Exhibition booth services across the GCC and Egypt.";
  return buildPageMetadata({
    path: "/locations",
    locale: localeParam,
    fallbackTitle: `CPS — ${title}`,
    fallbackDescription: description,
  });
}

export default async function LocationsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const items = await loadLocations(locale);
  const title = locale === "ar" ? "المواقع" : "Locations";
  const lead =
    locale === "ar"
      ? "حضور عبر أبرز مدن المملكة العربية السعودية."
      : "Presence across Saudi Arabia’s key exhibition cities.";
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: title },
          ]}
        />
        <PageHero
          eyebrow={locale === "ar" ? "أين نعمل" : "Where we work"}
          title={title}
          lead={lead}
          image={items[0]?.image}
          imageAlt={items[0]?.imageAlt}
          cta={{
            label: locale === "ar" ? "خطط لمعرضك" : "Plan your show",
            href: "#locations-brief",
          }}
        />
        <CollectionGrid
          columns={3}
          eyebrow={locale === "ar" ? "تغطية المدن" : "City coverage"}
          title={locale === "ar" ? "تنفيذ محلي بمعايير ثابتة" : "Local delivery. One consistent standard."}
          ctaLabel={locale === "ar" ? "اكتشف المدينة" : "Explore city"}
          items={items.map((item) => ({
            href: localizePath(`/locations/${item.slug}`, locale),
            title: item.title,
            excerpt: item.excerpt,
            image: item.image,
            imageAlt: item.imageAlt,
          }))}
        />
        <InnerPageEngagement
          locale={locale}
          dictionary={dictionary}
          namespace="locations"
        />
    </>
  );
}
