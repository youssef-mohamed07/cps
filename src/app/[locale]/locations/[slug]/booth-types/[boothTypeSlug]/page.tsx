import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { BoothTypeDetailSections } from "@/components/sections/booth-type-detail-sections";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { formatBoothTypeTitle } from "@/content/catalog";
import {
  buildBoothTypeLocationPage,
  getAllProgrammaticBoothTypeParams,
} from "@/content/programmatic-seo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadBoothType,
  loadBoothTypes,
  loadLocation,
  loadLocations,
} from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string; boothTypeSlug: string }>;
};

export function generateStaticParams() {
  return getAllProgrammaticBoothTypeParams().flatMap((item) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: item.slug,
      boothTypeSlug: item.boothTypeSlug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug, boothTypeSlug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const page = buildBoothTypeLocationPage(localeParam, slug, boothTypeSlug);
  if (!page) return {};
  return buildPageMetadata({
    path: page.path,
    locale: localeParam,
    fallbackTitle: `CPS — ${page.title}`,
    fallbackDescription: page.lead,
    fallbackOgImage: page.image,
    keywords: page.keywords,
  });
}

export default async function LocationBoothTypePage({ params }: PageProps) {
  const { locale: localeParam, slug, boothTypeSlug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const [page, boothType, allBoothTypes, locations, location, dictionary] =
    await Promise.all([
      Promise.resolve(buildBoothTypeLocationPage(locale, slug, boothTypeSlug)),
      loadBoothType(locale, boothTypeSlug),
      loadBoothTypes(locale),
      loadLocations(locale),
      loadLocation(locale, slug),
      resolveDictionary(locale),
    ]);
  if (!page || !boothType || !location) notFound();

  const related = allBoothTypes
    .filter((item) => item.slug !== boothTypeSlug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      overviewTitle: item.overviewTitle,
      description: item.description,
      image: item.image,
      imageAlt: item.imageAlt,
      features: item.features,
      advantages: item.advantages,
      useCases: item.useCases,
    }));

  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const locationsLabel = locale === "ar" ? "المواقع" : "Locations";
  const hubLabel = locale === "ar" ? "أنواع الأجنحة" : "Booth Types";
  const briefHref = `#location-booth-${slug}-${boothTypeSlug}-brief`;
  const overviewTitle =
    boothType.overviewTitle ||
    (locale === "ar"
      ? "صُمم هذا النوع لحضور أقوى على أرض المعرض."
      : "Built for stronger presence on the show floor.");
  const plainTitle = formatBoothTypeTitle(boothType.title, location.title);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: page.title,
          description: page.lead,
          path: page.path,
          locale,
          image: boothType.image,
        })}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: locationsLabel, href: "/locations" },
          { label: location.title, href: `/locations/${slug}` },
          { label: hubLabel, href: "/booth-types" },
          { label: plainTitle },
        ]}
      />

      <PageHero
        eyebrow={`${location.title} · ${hubLabel}`}
        title={boothType.title.includes("{City}") ? boothType.title : page.title}
        lead={page.lead}
        image={boothType.image}
        imageAlt={boothType.imageAlt}
        locale={locale}
        cta={{
          label: dictionary.servicesPage.primaryCta,
          href: briefHref,
        }}
        secondaryCta={{
          label: dictionary.servicesPage.secondaryCta,
          href: localizePath("/work", locale),
        }}
      />

      <BoothTypeDetailSections
        locale={locale}
        locationSlug={slug}
        boothType={{
          slug: boothType.slug,
          title: boothType.title,
          excerpt: boothType.excerpt,
          overviewTitle,
          description: boothType.description,
          image: boothType.image,
          imageAlt: boothType.imageAlt,
          model3d: boothType.model3d,
          features: boothType.features,
          advantages: boothType.advantages,
          useCases: boothType.useCases,
        }}
        related={related}
        locations={locations.map((item) => ({
          slug: item.slug,
          title: item.title,
        }))}
        briefHref={briefHref}
        ctaLabel={dictionary.servicesPage.primaryCta}
      />

      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        faqItems={boothType.faq.length ? boothType.faq : page.faqs}
        faqTitle={
          locale === "ar"
            ? `أسئلة عن ${plainTitle}`
            : `Questions about ${plainTitle}`
        }
        namespace={`location-booth-${slug}-${boothTypeSlug}`}
      />
    </>
  );
}
