import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BleedImage } from "@/components/media/bleed-image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { industries } from "@/content/catalog";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadBoothTypes,
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
  const industry = await loadIndustry(locale, slug);
  if (!industry) notFound();

  const dictionary = await resolveDictionary(locale);
  const [boothTypes, projects] = await Promise.all([
    loadBoothTypes(locale),
    loadProjects(locale),
  ]);
  const recommended = boothTypes.filter((item) =>
    industry.recommendedBoothTypeSlugs.includes(item.slug),
  );
  const relatedProjects = projects.filter((item) => item.industrySlug === slug).slice(0, 3);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const hubLabel = locale === "ar" ? "القطاعات" : "Industries";

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
        <PageHero title={industry.title} lead={industry.excerpt || industry.overview} />

        {industry.image ? (
          <div className="site-container">
            <BleedImage
              src={industry.image}
              alt={industry.imageAlt}
              className="media-bleed-wide"
              priority
            />
          </div>
        ) : null}

        <section className="section-pad">
          <div className="site-container max-w-3xl">
            <p className="text-lg leading-8 text-muted">{industry.overview}</p>
          </div>
        </section>

        {industry.challenges.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "التحديات" : "Challenges"}</p>
              <div className="value-list mt-10">
                {industry.challenges.map((item) => (
                  <article key={item.title}>
                    <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                    <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {industry.solutions.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "حلولنا" : "Solutions"}</p>
              <div className="value-list mt-10">
                {industry.solutions.map((item) => (
                  <article key={item.title}>
                    <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                    <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {recommended.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">
                {locale === "ar" ? "أنواع الأجنحة المقترحة" : "Recommended booth types"}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {recommended.map((item) => (
                  <Link
                    key={item.slug}
                    href={localizePath(`/booth-types/${item.slug}`, locale)}
                    className="nav-link underline"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {relatedProjects.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "مشاريع ذات صلة" : "Related projects"}</p>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedProjects.map((item) => (
                  <Link
                    key={item.slug}
                    href={localizePath(`/work/${item.slug}`, locale)}
                    className="group"
                  >
                    <h2 className="text-xl font-semibold group-hover:text-[#1f9fc8]">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section-pad">
          <div className="site-container">
            <Link href={localizePath("/contact", locale)} className="btn-primary">
              {dictionary.nav.cta}
            </Link>
          </div>
        </section>
    </>
  );
}
