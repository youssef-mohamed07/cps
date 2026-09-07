import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FeaturedWork } from "@/components/sections/featured-work";
import { HomeHero } from "@/components/sections/home-hero";
import { LifecycleSection } from "@/components/sections/lifecycle-section";
import { LogosSection } from "@/components/sections/logos-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyCpsSection } from "@/components/sections/why-cps-section";
import { ProductionCapabilitiesSection } from "@/components/sections/production-capabilities-section";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadHomeSeo } from "@/sanity/load-pages";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { getSiteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const config = getSiteConfig();
  const seo = await loadHomeSeo(localeParam);
  return buildPageMetadata({
    path: "/",
    locale: localeParam,
    seo,
    fallbackTitle: `${config.name} — ${config.tagline}`,
    fallbackDescription: config.description,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);

  return (
    <>
      <HomeHero locale={locale} content={dictionary.hero} />
      <LifecycleSection
        eyebrow={dictionary.lifecycle.eyebrow}
        title={dictionary.lifecycle.title}
        support={dictionary.lifecycle.support}
        imageAlt={dictionary.lifecycle.imageAlt}
        items={dictionary.lifecycle.items}
      />
      <ServicesSection locale={locale} content={dictionary.services} />
      <ProductionCapabilitiesSection locale={locale} />
      <FeaturedWork
        locale={locale}
        eyebrow={dictionary.work.eyebrow}
        title={dictionary.work.title}
        support={dictionary.work.support}
        viewAll={dictionary.work.viewAll}
        items={dictionary.work.items}
      />
      <WhyCpsSection locale={locale} content={dictionary.whyCps} />
      <LogosSection locale={locale} />
      <section className="service-closing"><div className="site-container"><h2>{locale === "ar" ? "لديك مشروع في ذهنك؟" : "Have a project in mind?"}</h2><p>{locale === "ar" ? "أخبرنا بما تبنيه وسنعود إليك بالخطوات التالية." : "Tell us what you are building and we will get back to you with next steps."}</p><Link href={localizePath("/contact", locale)} className="btn-primary">{locale === "ar" ? "ابدأ مشروعاً" : "Start a Project"}</Link></div></section>
    </>
  );
}
