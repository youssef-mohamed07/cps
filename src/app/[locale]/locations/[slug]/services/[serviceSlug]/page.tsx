import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { BoothTypeModelSection } from "@/components/sections/booth-type-model-section";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { LifecycleSection } from "@/components/sections/lifecycle-section";
import { LogosSection } from "@/components/sections/logos-section";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDesignGrid } from "@/components/sections/service-design-grid";
import { ServiceDetailSections } from "@/components/sections/service-detail-sections";
import { ServiceWhySection } from "@/components/sections/service-why-section";
import { StatsSection } from "@/components/sections/stats-section";
import {
  buildServiceLocationPage,
  getAllProgrammaticServiceParamsAsync,
} from "@/content/programmatic-seo";
import { media } from "@/content/media";
import { serviceCoverIcons } from "@/content/motion-icons";
import type { BoothModelVariant } from "@/components/three/booth-model-viewer";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { locationServicePath } from "@/lib/locations";
import {
  loadLocation,
  loadService,
  loadServices,
} from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

const SERVICE_MODEL_VARIANTS: Record<string, BoothModelVariant> = {
  "full-booth-management": "custom",
  "booth-design": "custom",
  "custom-fabrication": "modular",
  "installation-dismantling": "portable",
  "storage-reinstallation": "modular",
  "visual-branding-print": "kiosks",
  "lightbox-retail-display": "kiosks",
};

type PageProps = {
  params: Promise<{ locale: string; slug: string; serviceSlug: string }>;
};

export async function generateStaticParams() {
  const items = await getAllProgrammaticServiceParamsAsync();
  return items.flatMap((item) =>
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
  const [page, service, allServices, dictionary] = await Promise.all([
    Promise.resolve(buildServiceLocationPage(locale, slug, serviceSlug)),
    loadService(locale, serviceSlug),
    loadServices(locale),
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
        lead={service.heroLead ?? page.lead}
        image={service.image}
        imageAlt={service.imageAlt}
        locale={locale}
        cta={{
          label: dictionary.servicesPage?.primaryCta ?? dictionary.nav.cta,
          href: briefHref,
        }}
        secondaryCta={
          service.secondaryCta
            ? {
                label: service.secondaryCta.label,
                href: localizePath(
                  locationServicePath(service.secondaryCta.serviceSlug, slug),
                  locale,
                ),
              }
            : undefined
        }
      />

      <LogosSection locale={locale} />

      {service.cover?.items.length ? (
        <LifecycleSection
          eyebrow={service.cover.eyebrow}
          title={service.cover.title}
          support={service.cover.support}
          imageAlt={service.imageAlt}
          image={service.image || media.lifecycle}
          items={service.cover.items}
          icons={serviceCoverIcons}
        />
      ) : null}

      {service.designs?.items.length ? (
        <ServiceDesignGrid
          locale={locale}
          locationSlug={slug}
          eyebrow={service.designs.eyebrow}
          title={service.designs.title}
          support={service.designs.support}
          cta={service.designs.cta}
          items={service.designs.items}
        />
      ) : null}

      {service.why?.items.length ? (
        <ServiceWhySection
          title={service.why.title}
          support={service.why.support}
          items={service.why.items}
        />
      ) : null}

      <BoothTypeModelSection
        locale={locale}
        title={service.title}
        variant={SERVICE_MODEL_VARIANTS[serviceSlug] ?? "custom"}
      />

      <ServiceDetailSections
        locale={locale}
        locationSlug={slug}
        service={{
          slug: service.slug,
          title: service.title,
          excerpt: service.excerpt,
          overview: service.overview,
          overviewTitle: service.overviewTitle,
          overviewBullets: service.overviewBullets,
          image: service.image,
          imageAlt: service.imageAlt,
          process: service.process,
        }}
        related={related}
        briefHref={briefHref}
        ctaLabel={dictionary.nav.cta}
        afterOverview={
          <StatsSection
            id={`location-service-${slug}-${serviceSlug}-stats`}
            eyebrow={dictionary.stats.eyebrow}
            title={dictionary.stats.title}
            support={dictionary.stats.support}
            items={dictionary.stats.items}
          />
        }
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
        showStats={false}
      />
    </>
  );
}
