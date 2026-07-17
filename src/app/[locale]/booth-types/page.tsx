import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { formatBoothTypeTitle } from "@/content/catalog";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { locationBoothTypePath } from "@/lib/locations";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadBoothTypes } from "@/sanity/load-collections";
import { loadHubPage } from "@/sanity/load-pages";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const hub = await loadHubPage(localeParam, "boothTypes");
  return buildPageMetadata({
    path: "/booth-types",
    locale: localeParam,
    seo: hub.seo,
    fallbackTitle: `CPS — ${hub.title}`,
    fallbackDescription: hub.lead,
  });
}

export default async function BoothTypesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const items = await loadBoothTypes(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: dictionary.boothTypesPage.title },
          ]}
        />
        <PageHero
          eyebrow={dictionary.boothTypesPage.eyebrow}
          title={dictionary.boothTypesPage.title}
          lead={dictionary.boothTypesPage.lead}
          image={items[0]?.image}
          imageAlt={items[0]?.imageAlt}
          cta={{
            label: locale === "ar" ? "اختر نوع جناحك" : "Find your booth type",
            href: "#booth-types-brief",
          }}
        />
        <CollectionGrid
          columns={4}
          eyebrow={locale === "ar" ? "حلول مرنة" : "Flexible formats"}
          title={locale === "ar" ? "جناح يناسب مساحتك وطموحك" : "A booth for every footprint and ambition"}
          ctaLabel={locale === "ar" ? "عرض النوع" : "View booth type"}
          items={items.map((item) => ({
            href: localizePath(locationBoothTypePath(item.slug), locale),
            title: formatBoothTypeTitle(item.title),
            excerpt: item.excerpt,
            image: item.image,
            imageAlt: item.imageAlt,
          }))}
        />
        <InnerPageEngagement
          locale={locale}
          dictionary={dictionary}
          namespace="booth-types"
        />
    </>
  );
}
