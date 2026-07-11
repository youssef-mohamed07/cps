import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoothTypesSection } from "@/components/sections/booth-types-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturedWork } from "@/components/sections/featured-work";
import { HomeHero } from "@/components/sections/home-hero";
import { LifecycleSection } from "@/components/sections/lifecycle-section";
import { ProcessStrip } from "@/components/sections/process-strip";
import { ServicesSection } from "@/components/sections/services-section";
import { StatsBar } from "@/components/sections/stats-bar";
import { WhyCpsSection } from "@/components/sections/why-cps-section";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { getSiteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const config = getSiteConfig();
  return buildPageMetadata({
    path: "/",
    locale: localeParam,
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
      <StatsBar items={dictionary.stats.items} />
      <ProcessStrip
        title={dictionary.processStrip.title}
        items={dictionary.processStrip.items}
      />
      <LifecycleSection
        eyebrow={dictionary.lifecycle.eyebrow}
        title={dictionary.lifecycle.title}
        support={dictionary.lifecycle.support}
        imageAlt={dictionary.lifecycle.imageAlt}
        items={dictionary.lifecycle.items}
      />
      <ServicesSection locale={locale} content={dictionary.services} />
      <BoothTypesSection
        locale={locale}
        eyebrow={dictionary.boothTypes.eyebrow}
        title={dictionary.boothTypes.title}
        support={dictionary.boothTypes.support}
        cta={dictionary.boothTypes.cta}
        items={dictionary.boothTypes.items}
      />
      <WhyCpsSection
        eyebrow={dictionary.whyCps.eyebrow}
        title={dictionary.whyCps.title}
        support={dictionary.whyCps.support}
        imageAlt={dictionary.whyCps.imageAlt}
        items={dictionary.whyCps.items}
      />
      <FeaturedWork
        locale={locale}
        eyebrow={dictionary.work.eyebrow}
        title={dictionary.work.title}
        viewAll={dictionary.work.viewAll}
        items={dictionary.work.items}
      />
      <FaqSection
        eyebrow={dictionary.faq.eyebrow}
        title={dictionary.faq.title}
        items={dictionary.faq.items}
      />
      <ContactSection content={dictionary.contact} />
    </>
  );
}
