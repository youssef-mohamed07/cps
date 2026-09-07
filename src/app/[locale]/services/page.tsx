import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { PageHero } from "@/components/sections/page-hero";
import { ProductionCapabilitiesSection } from "@/components/sections/production-capabilities-section";
import { localizeText, serviceArchitecture, servicePath } from "@/content/service-architecture";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
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
  return (
    <>
      <Breadcrumbs locale={locale} items={[{ label: ar ? "الرئيسية" : "Home", href: "/" }, { label: ar ? "الخدمات" : "Services" }]} />
      <PageHero
        eyebrow={ar ? "الخدمات" : "Services"}
        title={ar ? "ثمان خدمات. أرض إنتاج واحدة." : "Eight services. One production floor."}
        lead={ar ? "من المعارض والفعاليات إلى التجهيز الداخلي والطباعة والتسليم — فريق واحد يحمل مشروعك حتى النهاية." : "From exhibitions and events to fit-out, print and delivery — one team carries your project to completion."}
        image={serviceArchitecture[0].image}
        imageAlt={localizeText(serviceArchitecture[0].title, locale)}
        cta={{ label: ar ? "ابدأ مشروعاً" : "Start a Project", href: localizePath("/contact", locale) }}
        secondaryCta={{ label: ar ? "شاهد أعمالنا" : "View Our Work", href: localizePath("/work", locale) }}
      />
      <CollectionGrid
        columns={2}
        ctaLabel={ar ? "استكشف الخدمة" : "Explore service"}
        items={serviceArchitecture.map((service) => ({
          href: localizePath(servicePath(service.slug), locale),
          title: localizeText(service.title, locale),
          excerpt: localizeText(service.excerpt, locale),
          image: service.image,
          imageAlt: localizeText(service.title, locale),
        }))}
      />
      <ProductionCapabilitiesSection locale={locale} />
      <section className="service-closing"><div className="site-container"><h2>{ar ? "لديك مشروع في ذهنك؟" : "Have a project in mind?"}</h2><p>{ar ? "شاركنا التفاصيل وسنرتب الخطوة التالية." : "Share the details and we will map the next step."}</p><a href={localizePath("/contact", locale)} className="btn-primary">{ar ? "ابدأ مشروعاً" : "Start a Project"}</a></div></section>
    </>
  );
}
