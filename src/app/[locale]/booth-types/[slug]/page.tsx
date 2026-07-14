import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { BoothTypeDetailSections } from "@/components/sections/booth-type-detail-sections";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { boothTypes, formatBoothTypeTitle } from "@/content/catalog";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadBoothType, loadBoothTypes, loadLocations } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return boothTypes.flatMap((item) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const boothType = await loadBoothType(localeParam, slug);
  if (!boothType) return {};
  const displayTitle = formatBoothTypeTitle(
    boothType.title,
    localeParam === "ar" ? "السعودية" : "Saudi Arabia",
  );
  return buildPageMetadata({
    path: `/booth-types/${slug}`,
    locale: localeParam,
    seo: boothType.seo,
    fallbackTitle: `CPS — ${displayTitle}`,
    fallbackDescription: boothType.excerpt || boothType.description,
    fallbackOgImage: boothType.image,
  });
}

export default async function BoothTypeDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const [boothType, allBoothTypes, locations, dictionary] = await Promise.all([
    loadBoothType(locale, slug),
    loadBoothTypes(locale),
    loadLocations(locale),
    resolveDictionary(locale),
  ]);
  if (!boothType) notFound();

  const plainTitle = formatBoothTypeTitle(boothType.title);

  const related = allBoothTypes
    .filter((item) => item.slug !== slug)
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
  const hubLabel = locale === "ar" ? "أنواع الأجنحة" : "Booth Types";
  const briefHref = `#booth-type-${slug}-brief`;
  const overviewTitle =
    boothType.overviewTitle ||
    (locale === "ar"
      ? "صُمم هذا النوع لحضور أقوى على أرض المعرض."
      : "Built for stronger presence on the show floor.");

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: plainTitle,
          description: boothType.description || boothType.excerpt,
          path: `/booth-types/${slug}`,
          locale,
          image: boothType.image,
        })}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: hubLabel, href: "/booth-types" },
          { label: plainTitle },
        ]}
      />

      <PageHero
        eyebrow={hubLabel}
        title={boothType.title}
        lead={boothType.excerpt || boothType.description}
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
        namespace={`booth-type-${slug}`}
        faqItems={boothType.faq}
        faqTitle={
          locale === "ar"
            ? `أسئلة شائعة عن ${plainTitle}`
            : `Questions about ${plainTitle}`
        }
      />
    </>
  );
}
