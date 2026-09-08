import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FeaturedWork } from "@/components/sections/featured-work";
import { HomeHero } from "@/components/sections/home-hero";
import { LifecycleSection } from "@/components/sections/lifecycle-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyCpsSection } from "@/components/sections/why-cps-section";
import { ProductionCapabilitiesSection } from "@/components/sections/production-capabilities-section";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadHomeFeaturedProjectSlugs, loadHomeSeo } from "@/sanity/load-pages";
import { loadProjects } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { getSiteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ locale: string }> };

/** Prefer a mix across services, including a clear non-booth retail project. */
function featuredWorkItems<T extends { slug: string }>(items: T[]): T[] {
  const preferred = ["northline", "pulse-retail", "qamar"];
  const selected = preferred
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => Boolean(item));
  if (selected.length >= 3) return selected.slice(0, 3);
  const rest = items.filter((item) => !preferred.includes(item.slug));
  return [...selected, ...rest].slice(0, 3);
}

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
  const [featuredProjectSlugs, projects] = await Promise.all([
    loadHomeFeaturedProjectSlugs(locale),
    loadProjects(locale),
  ]);
  const cmsFeatured = featuredProjectSlugs.length
    ? featuredProjectSlugs
        .map((slug) => projects.find((project) => project.slug === slug))
        .filter((project): project is (typeof projects)[number] => Boolean(project))
    : [];
  const featuredProjects = cmsFeatured.length
    ? cmsFeatured.slice(0, 3)
    : featuredWorkItems(dictionary.work.items);

  return (
    <>
      <HomeHero locale={locale} content={dictionary.hero} />
      <LifecycleSection
        eyebrow={dictionary.lifecycle.eyebrow}
        title={dictionary.lifecycle.title}
        support={dictionary.lifecycle.support}
        imageAlt={dictionary.lifecycle.imageAlt}
        items={dictionary.lifecycle.items}
        centered
      />
      <ServicesSection locale={locale} content={dictionary.services} />
      <ProductionCapabilitiesSection locale={locale} compact />
      <FeaturedWork
        locale={locale}
        eyebrow={dictionary.work.eyebrow}
        title={dictionary.work.title}
        support={dictionary.work.support}
        viewAll={dictionary.work.viewAll}
        items={featuredProjects}
      />
      <WhyCpsSection locale={locale} content={dictionary.whyCps} />
      <section className="service-closing home-closing-cta">
        <div className="site-container">
          <h2 className="display display-on-dark">
            {locale === "ar" ? "هل لديك مشروع في ذهنك؟" : "Have a project in mind?"}
          </h2>
          <p>
            {locale === "ar"
              ? "أخبرنا بما تبنيه وسنعود إليك بالخطوات التالية."
              : "Tell us what you're building and we'll get back to you with next steps."}
          </p>
          <Link href={localizePath("/contact", locale)} className="btn-primary">
            {locale === "ar" ? "ابدأ مشروعاً" : "Start a Project"}
            <CtaArrow size="sm" />
          </Link>
        </div>
      </section>
    </>
  );
}
