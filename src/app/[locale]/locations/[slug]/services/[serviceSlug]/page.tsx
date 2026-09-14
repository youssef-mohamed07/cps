import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { ServiceArchitecturePage } from "@/components/sections/service-architecture-page";
import { buildServiceLocationPage } from "@/content/programmatic-seo";
import {
  getServiceArchitecture,
  serviceArchitecture,
} from "@/content/service-architecture";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { resolveServiceArchitecture } from "@/lib/resolve-service-architecture";
import {
  loadLocation,
  loadLocations,
  loadProjects,
  loadService,
  loadServiceLocationVariant,
} from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { loadProjectLaunch } from "@/sanity/load-pages";

type PageProps = {
  params: Promise<{ locale: string; slug: string; serviceSlug: string }>;
};

export async function generateStaticParams() {
  const locations = await loadLocations("en");
  return locations.flatMap((location) =>
    serviceArchitecture.flatMap((service) =>
      (["en", "ar"] as const).map((locale) => ({
        locale,
        slug: location.slug,
        serviceSlug: service.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug, serviceSlug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();

  const [page, variant] = await Promise.all([
    Promise.resolve(buildServiceLocationPage(localeParam, slug, serviceSlug)),
    loadServiceLocationVariant(localeParam, slug, serviceSlug),
  ]);
  if (!page) return {};

  return buildPageMetadata({
    path: page.path,
    locale: localeParam,
    seo: variant?.seo,
    fallbackTitle: `CPS — ${variant?.title || page.title}`,
    fallbackDescription: variant?.lead || page.lead,
    fallbackOgImage: variant?.image || page.image,
    keywords: variant?.seo?.keywords ?? page.keywords,
  });
}

export default async function LocationServicePage({ params }: PageProps) {
  const { locale: localeParam, slug, serviceSlug } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;

  const localService = getServiceArchitecture(serviceSlug);
  const [fallbackPage, variant, cmsService, location, projects, projectLaunch] =
    await Promise.all([
      Promise.resolve(buildServiceLocationPage(locale, slug, serviceSlug)),
      loadServiceLocationVariant(locale, slug, serviceSlug),
      loadService(locale, serviceSlug),
      loadLocation(locale, slug),
      loadProjects(locale),
      loadProjectLaunch(locale),
    ]);

  const service = resolveServiceArchitecture(locale, localService, cmsService);
  if (!fallbackPage || !location || !service) notFound();

  const page = {
    ...fallbackPage,
    title: variant?.title || fallbackPage.title,
    lead: variant?.lead || fallbackPage.lead,
    overview: variant?.overview || fallbackPage.overview,
    image: variant?.image || fallbackPage.image,
    imageAlt: variant?.imageAlt || fallbackPage.imageAlt,
    highlights: variant?.highlights.length
      ? variant.highlights
      : fallbackPage.highlights,
    faqs: variant?.faq.length ? variant.faq : fallbackPage.faqs,
  };

  const cityService = {
    ...service,
    hero: {
      ...service.hero,
      support: { ...service.hero.support, [locale]: page.overview },
      bullets: page.highlights.map((item) => ({
        en: locale === "en" ? `${item.title} — ${item.description}` : "",
        ar: locale === "ar" ? `${item.title} — ${item.description}` : "",
      })),
    },
  };

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
      <Breadcrumbs
        locale={locale}
        items={[
          { label: locale === "ar" ? "الرئيسية" : "Home", href: "/" },
          { label: locale === "ar" ? "الخدمات" : "Services", href: "/services" },
          { label: location.title, href: `/locations/${slug}` },
          { label: page.title },
        ]}
      />
      <ServiceArchitecturePage
        locale={locale}
        service={cityService}
        projects={projects}
        projectLaunch={projectLaunch}
        marketName={location.title}
        heroHeadline={page.title}
        heroLead={page.lead}
        heroEyebrow={variant?.eyebrow}
        image={page.image}
        locationSlug={slug}
        faqItems={page.faqs}
      />
    </>
  );
}
