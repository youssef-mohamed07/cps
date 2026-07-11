import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDetailSections } from "@/components/sections/service-detail-sections";
import { services } from "@/content/catalog";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadLocations, loadService, loadServices } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return services.flatMap((service) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: service.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const service = await loadService(localeParam, slug);
  if (!service) return {};
  return buildPageMetadata({
    path: `/services/${slug}`,
    locale: localeParam,
    seo: service.seo,
    fallbackTitle: `CPS — ${service.title}`,
    fallbackDescription: service.excerpt || service.overview,
    fallbackOgImage: service.image,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const [service, allServices, locations, dictionary] = await Promise.all([
    loadService(locale, slug),
    loadServices(locale),
    loadLocations(locale),
    resolveDictionary(locale),
  ]);
  if (!service) notFound();

  const related = allServices
    .filter((item) => item.slug !== slug)
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
  const servicesLabel = locale === "ar" ? "الخدمات" : "Services";
  const briefHref = `#service-${slug}-brief`;
  const faq = faqJsonLd(service.faq);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.overview || service.excerpt,
          path: `/services/${slug}`,
          locale,
          image: service.image,
        })}
      />
      {faq ? <JsonLd data={faq} /> : null}

      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: servicesLabel, href: "/services" },
          { label: service.title },
        ]}
      />

      <PageHero
        eyebrow={servicesLabel}
        title={service.title}
        lead={service.excerpt || service.overview}
        image={service.image}
        imageAlt={service.imageAlt}
        cta={{
          label: dictionary.nav.cta,
          href: briefHref,
        }}
      />

      <ServiceDetailSections
        locale={locale}
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
        faqItems={service.faq}
        faqTitle={
          locale === "ar"
            ? `أسئلة شائعة عن ${service.title}`
            : `Questions about ${service.title}`
        }
        namespace={`service-${slug}`}
      />
    </>
  );
}
