import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { PageHero } from "@/components/sections/page-hero";
import { ProductionCapabilitiesSection } from "@/components/sections/production-capabilities-section";
import { localizeText, serviceArchitecture } from "@/content/service-architecture";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { loadServices } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  await ensureSiteConfig();
  return buildPageMetadata({
    path: "/services",
    locale,
    fallbackTitle: locale === "ar" ? "CPS — خدماتنا" : "CPS — Services",
    fallbackDescription: locale === "ar" ? "ثمان خدمات إنتاج وتصنيع وتجهيز تحت سقف واحد." : "Eight production, fabrication and fit-out services under one roof.",
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const ar = locale === "ar";
  const cmsServices = await loadServices(locale);
  const services = serviceArchitecture.map((service) => {
    const cms = cmsServices.find((item) => item.slug === service.slug);
    const cmsCopyReady = cms?.blueprintVersion === 5;
    return {
      slug: service.slug,
      title: cmsCopyReady && cms?.title ? cms.title : localizeText(service.title, locale),
      excerpt: cmsCopyReady && cms?.excerpt ? cms.excerpt : localizeText(service.excerpt, locale),
      image: cms?.image || service.image,
      imageAlt: cms?.imageAlt || localizeText(service.title, locale),
    };
  });
  const firstService = services[0];
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: ar ? "الرئيسية" : "Home", href: "/" }, { label: ar ? "الخدمات" : "Services" }]} />
      <PageHero
        eyebrow={ar ? "الخدمات" : "Services"}
        title={ar ? "ثمان خدمات. أرض إنتاج واحدة." : "Eight services. One production floor."}
        lead={ar ? "من المعارض والفعاليات إلى التجهيز الداخلي والطباعة والتسليم — فريق واحد يحمل مشروعك حتى النهاية." : "From exhibitions and events to fit-out, print and delivery — one team carries your project to completion."}
        image={firstService?.image ?? ""}
        imageAlt={firstService?.imageAlt ?? firstService?.title ?? ""}
        cta={{ label: ar ? "ابدأ مشروعاً" : "Start a Project", href: localizePath("/contact", locale) }}
        secondaryCta={{ label: ar ? "شاهد أعمالنا" : "View Our Work", href: localizePath("/our-work", locale) }}
      />
      <CollectionGrid
        columns={2}
        ctaLabel={ar ? "استكشف الخدمة" : "Explore service"}
        items={services.map((service) => ({
          href: localizePath(`/services/${service.slug}`, locale),
          title: service.title,
          excerpt: service.excerpt,
          image: service.image,
          imageAlt: service.imageAlt,
        }))}
      />
      <ProductionCapabilitiesSection locale={locale} compact />
    </>
  );
}
