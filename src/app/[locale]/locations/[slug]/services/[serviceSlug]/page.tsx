import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { ProgrammaticLocationSections } from "@/components/sections/programmatic-location-sections";
import { PageHero } from "@/components/sections/page-hero";
import {
  buildServiceLocationPage,
  getAllProgrammaticServiceParams,
} from "@/content/programmatic-seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string; serviceSlug: string }>;
};

export function generateStaticParams() {
  return getAllProgrammaticServiceParams().flatMap((item) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: item.slug,
      serviceSlug: item.serviceSlug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug, serviceSlug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const page = buildServiceLocationPage(localeParam, slug, serviceSlug);
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

export default async function LocationServicePage({ params }: PageProps) {
  const { locale: localeParam, slug, serviceSlug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const page = buildServiceLocationPage(locale, slug, serviceSlug);
  if (!page) notFound();

  const dictionary = await resolveDictionary(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const locationsLabel = locale === "ar" ? "المواقع" : "Locations";
  const servicesLabel = locale === "ar" ? "الخدمات" : "Services";
  const briefHref = `#location-service-${slug}-${serviceSlug}-brief`;
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
          { label: servicesLabel, href: "/services" },
          { label: page.entityTitle },
        ]}
      />

      <PageHero
        eyebrow={`${page.locationTitle} · ${servicesLabel}`}
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
        namespace={`location-service-${slug}-${serviceSlug}`}
      />
    </>
  );
}
