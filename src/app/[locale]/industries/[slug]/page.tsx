import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { IndustryDetailSections } from "@/components/sections/industry-detail-sections";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { industries } from "@/content/catalog";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadBoothTypes,
  loadIndustries,
  loadIndustry,
  loadProjects,
} from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return industries.flatMap((item) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const industry = await loadIndustry(localeParam, slug);
  if (!industry) return {};
  return buildPageMetadata({
    path: `/industries/${slug}`,
    locale: localeParam,
    seo: industry.seo,
    fallbackTitle: `CPS — ${industry.title}`,
    fallbackDescription: industry.excerpt || industry.overview,
    fallbackOgImage: industry.image,
  });
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const [industry, allIndustries, boothTypes, projects, dictionary] =
    await Promise.all([
      loadIndustry(locale, slug),
      loadIndustries(locale),
      loadBoothTypes(locale),
      loadProjects(locale),
      resolveDictionary(locale),
    ]);
  if (!industry) notFound();

  const recommended = boothTypes.filter((item) =>
    industry.recommendedBoothTypeSlugs.includes(item.slug),
  );
  const relatedProjects = projects
    .filter((item) => item.industrySlug === slug)
    .slice(0, 3);
  const otherIndustries = allIndustries
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const hubLabel = locale === "ar" ? "القطاعات" : "Industries";
  const briefHref = `#industry-${slug}-brief`;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: industry.title,
          description: industry.overview || industry.excerpt,
          path: `/industries/${slug}`,
          locale,
          image: industry.image,
        })}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: hubLabel, href: "/industries" },
          { label: industry.title },
        ]}
      />
      <PageHero
        eyebrow={hubLabel}
        title={industry.title}
        lead={industry.excerpt}
        image={industry.image}
        imageAlt={industry.imageAlt}
        cta={{
          label: dictionary.nav.cta,
          href: briefHref,
        }}
      />

      <IndustryDetailSections
        locale={locale}
        industry={{
          slug: industry.slug,
          title: industry.title,
          excerpt: industry.excerpt,
          overview: industry.overview,
          image: industry.image,
          imageAlt: industry.imageAlt,
          challenges: industry.challenges,
          solutions: industry.solutions,
        }}
        recommended={recommended.map((item) => ({
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          image: item.image,
          imageAlt: item.imageAlt,
        }))}
        projects={relatedProjects.map((item) => ({
          slug: item.slug,
          title: item.title,
          summary: item.summary,
          year: item.year,
          category: item.category,
          image: item.image,
          imageAlt: item.imageAlt,
        }))}
        otherIndustries={otherIndustries.map((item) => ({
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          overview: item.overview,
          image: item.image,
          imageAlt: item.imageAlt,
          challenges: item.challenges,
          solutions: item.solutions,
        }))}
        briefHref={briefHref}
        ctaLabel={dictionary.nav.cta}
      />

      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        namespace={`industry-${slug}`}
      />
    </>
  );
}
