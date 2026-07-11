import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadIndustries } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const title = localeParam === "ar" ? "القطاعات" : "Industries";
  const description =
    localeParam === "ar"
      ? "أجنحة معارض مصممة لقطاعات التقنية والرعاية الصحية والطاقة والتجزئة."
      : "Exhibition booth programs tailored to technology, healthcare, energy, and retail.";
  return buildPageMetadata({
    path: "/industries",
    locale: localeParam,
    fallbackTitle: `CPS — ${title}`,
    fallbackDescription: description,
  });
}

export default async function IndustriesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const items = await loadIndustries(locale);
  const title = locale === "ar" ? "القطاعات" : "Industries";
  const lead =
    locale === "ar"
      ? "حلول أجنحة مبنية حول تحديات كل قطاع."
      : "Booth solutions shaped around the realities of each sector.";
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: title },
        ]}
      />
      <PageHero
        eyebrow={locale === "ar" ? "قطاعاتنا" : "Sectors"}
        title={title}
        lead={lead}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
        cta={{
          label: locale === "ar" ? "ناقش مشروعك" : "Discuss your project",
          href: "#industries-brief",
        }}
      />
      <CollectionGrid
        columns={2}
        eyebrow={locale === "ar" ? "خبرة متخصصة" : "Sector expertise"}
        title={
          locale === "ar"
            ? "نفهم جمهورك قبل أن نصمم مساحتك."
            : "We understand your audience before we shape your space."
        }
        ctaLabel={locale === "ar" ? "اكتشف الحلول" : "Explore solutions"}
        items={items.map((item) => ({
          href: localizePath(`/industries/${item.slug}`, locale),
          title: item.title,
          excerpt: item.excerpt,
          image: item.image,
          imageAlt: item.imageAlt,
        }))}
      />
      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        namespace="industries"
      />
    </>
  );
}
