import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CapabilityExplainerSection } from "@/components/sections/capability-explainer-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { PageHero } from "@/components/sections/page-hero";
import { ProductionCapabilitiesSection } from "@/components/sections/production-capabilities-section";
import { StatsSection } from "@/components/sections/stats-section";
import { media } from "@/content/media";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { resolveDictionary } from "@/lib/dictionary";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  await ensureSiteConfig();
  return buildPageMetadata({
    path: "/production-capabilities",
    locale,
    fallbackTitle:
      locale === "ar"
        ? "CPS — قدرات الإنتاج"
        : "CPS — Production Capabilities",
    fallbackDescription:
      locale === "ar"
        ? "منشأة إنتاج متكاملة للخشب والمعدن والأكريليك والطباعة والتركيب."
        : "One integrated production floor for wood, metal, acrylic, print and installation.",
  });
}

export default async function ProductionCapabilitiesPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const ar = locale === "ar";
  const dictionary = await resolveDictionary(locale);

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: ar ? "الرئيسية" : "Home", href: "/" },
          { label: ar ? "قدرات الإنتاج" : "Production Capabilities" },
        ]}
      />
      <PageHero
        eyebrow={ar ? "قدرات الإنتاج" : "Production Capabilities"}
        title={
          ar
            ? "ما نسلّمه مدعوم بكيفية تصنيعه."
            : "What we deliver is supported by how we build it."
        }
        lead={
          ar
            ? "منشأة واحدة تجمع الحرفة والتقنية والتجميع والتركيب."
            : "One production floor connects craft, technology, assembly and on-site installation."
        }
        image={media.about.studio}
        imageAlt={ar ? "منشأة إنتاج CPS" : "CPS production facility"}
        cta={{
          label: ar ? "ابدأ مشروعاً" : "Start a Project",
          href: localizePath("/contact", locale),
        }}
      />
      <StatsSection
        id="production-stats"
        eyebrow={dictionary.stats.eyebrow}
        title={dictionary.stats.title}
        support={dictionary.stats.support}
        items={dictionary.stats.items}
      />
      <CapabilityExplainerSection locale={locale} />
      <ProductionCapabilitiesSection locale={locale} standalone />
      <BeforeAfterSection content={dictionary.beforeAfter} />
      <section className="service-closing">
        <div className="site-container">
          <h2>{ar ? "لنبنِ مشروعك تحت سقف واحد." : "Let us build your project under one roof."}</h2>
          <Link href={localizePath("/contact", locale)} className="btn-primary">
            {ar ? "ابدأ مشروعاً" : "Start a Project"}
          </Link>
        </div>
      </section>
    </>
  );
}
