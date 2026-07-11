import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { LifecycleSection } from "@/components/sections/lifecycle-section";
import { LogosSection } from "@/components/sections/logos-section";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyCpsSection } from "@/components/sections/why-cps-section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadServices } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const dictionary = await resolveDictionary(localeParam);
  return buildPageMetadata({
    path: "/services",
    locale: localeParam,
    fallbackTitle: `CPS — ${dictionary.servicesPage.title.replace("{City}", localeParam === "ar" ? "السعودية" : "Saudi Arabia")}`,
    fallbackDescription: dictionary.servicesPage.lead,
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const page = dictionary.servicesPage;
  const items = await loadServices(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: page.eyebrow },
          ]}
        />
        <PageHero
          locale={locale}
          title={page.title}
          lead={page.lead}
          image={items[0]?.image}
          imageAlt={items[0]?.imageAlt}
          animated
          className="page-hero--services"
          cta={{
            label: page.primaryCta,
            href: localizePath("/contact", locale),
          }}
          secondaryCta={{
            label: page.secondaryCta,
            href: localizePath("/work", locale),
          }}
        />
        <LogosSection locale={locale} />
        <LifecycleSection
          eyebrow={dictionary.lifecycle.eyebrow}
          title={dictionary.lifecycle.title}
          support={dictionary.lifecycle.support}
          imageAlt={dictionary.lifecycle.imageAlt}
          items={dictionary.lifecycle.items}
        />
        <ServicesSection locale={locale} content={dictionary.services} />
        <BeforeAfterSection content={dictionary.beforeAfter} />
        <WhyCpsSection locale={locale} content={dictionary.whyCps} />
        <InnerPageEngagement
          locale={locale}
          dictionary={dictionary}
          namespace="services"
        />
    </>
  );
}
