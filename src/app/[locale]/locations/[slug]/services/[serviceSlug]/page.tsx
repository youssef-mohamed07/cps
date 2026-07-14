import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDetailSections } from "@/components/sections/service-detail-sections";
import {
  buildServiceLocationPage,
  getAllProgrammaticServiceParams,
} from "@/content/programmatic-seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadLocation,
  loadLocations,
  loadService,
  loadServices,
} from "@/sanity/load-collections";
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
  const [page, service, allServices, locations, dictionary] = await Promise.all([
    Promise.resolve(buildServiceLocationPage(locale, slug, serviceSlug)),
    loadService(locale, serviceSlug),
    loadServices(locale),
    loadLocations(locale),
    resolveDictionary(locale),
  ]);
  if (!page || !service) notFound();

  const location = await loadLocation(locale, slug);
  if (!location) notFound();

  const related = allServices
    .filter((item) => item.slug !== serviceSlug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      overview: item.overview,
      image: item.image,
      imageAlt: item.imageAlt,
      benefits: item.benefits,
      process: item.process,
    }));

  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const locationsLabel = locale === "ar" ? "المواقع" : "Locations";
  const servicesLabel = locale === "ar" ? "الخدمات" : "Services";
  const briefHref = `#location-service-${slug}-${serviceSlug}-brief`;
  const faq = faqJsonLd(service.faq.length ? service.faq : page.faqs);

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
          { label: location.title, href: `/locations/${slug}` },
          { label: servicesLabel, href: "/services" },
          { label: service.title },
        ]}
      />

      <PageHero
        eyebrow={`${location.title} · ${servicesLabel}`}
        title={page.title}
        lead={page.lead}
        image={service.image}
        imageAlt={service.imageAlt}
        cta={{
          label: dictionary.nav.cta,
          href: briefHref,
        }}
      />

      <ServiceDetailSections
        locale={locale}
        locationSlug={slug}
        service={{
          slug: service.slug,
          title: service.title,
          excerpt: service.excerpt,
          overview: service.overview,
          image: service.image,
          imageAlt: service.imageAlt,
          benefits: service.benefits,
          process: service.process,
        }}
        related={related}
        locations={locations.map((item) => ({
          slug: item.slug,
          title: item.title,
        }))}
        briefHref={briefHref}
        ctaLabel={dictionary.nav.cta}
      />

      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        faqItems={service.faq.length ? service.faq : page.faqs}
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
