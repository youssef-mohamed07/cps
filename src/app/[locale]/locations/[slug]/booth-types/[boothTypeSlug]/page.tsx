import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { ProgrammaticLocationSections } from "@/components/sections/programmatic-location-sections";
import { PageHero } from "@/components/sections/page-hero";
import {
  buildBoothTypeLocationPage,
  getAllProgrammaticBoothTypeParams,
} from "@/content/programmatic-seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
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
  const page = buildBoothTypeLocationPage(locale, slug, boothTypeSlug);
  if (!page) notFound();

  const dictionary = await resolveDictionary(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const locationsLabel = locale === "ar" ? "المواقع" : "Locations";
  const boothTypesLabel = locale === "ar" ? "أنواع الأجنحة" : "Booth Types";
  const briefHref = `#location-booth-${slug}-${boothTypeSlug}-brief`;
  const faq = faqJsonLd(page.faqs);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: page.title,
          description: page.lead,
          path: page.path,
          locale,
          image: page.image,
        })}
      />
      {faq ? <JsonLd data={faq} /> : null}

      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: locationsLabel, href: "/locations" },
          { label: page.locationTitle, href: `/locations/${slug}` },
          { label: boothTypesLabel, href: "/booth-types" },
          { label: page.entityTitle },
        ]}
      />

      <PageHero
        eyebrow={`${page.locationTitle} · ${boothTypesLabel}`}
        title={page.title}
        lead={page.lead}
        image={page.image}
        imageAlt={page.imageAlt}
        cta={{
          label: dictionary.nav.cta,
          href: briefHref,
        }}
      />

      <ProgrammaticLocationSections
        locale={locale}
        page={page}
        briefHref={briefHref}
        ctaLabel={dictionary.nav.cta}
      />

      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        faqItems={page.faqs}
        faqTitle={
          locale === "ar"
            ? `أسئلة عن ${page.title}`
            : `Questions about ${page.title}`
        }
        namespace={`location-booth-${slug}-${boothTypeSlug}`}
      />
    </>
  );
}
