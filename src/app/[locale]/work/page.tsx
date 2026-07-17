import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { WorkFilters } from "@/components/sections/work-filters";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadBoothTypes,
  loadIndustries,
  loadLocations,
  loadProjects,
} from "@/sanity/load-collections";
import { loadHubPage } from "@/sanity/load-pages";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const hub = await loadHubPage(localeParam, "work");
  return buildPageMetadata({
    path: "/work",
    locale: localeParam,
    seo: hub.seo,
    fallbackTitle: `CPS — ${hub.title}`,
    fallbackDescription: hub.lead,
  });
}

export default async function WorkPage({ params, searchParams }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const filters = await searchParams;
  const boothType = first(filters.boothType);
  const industry = first(filters.industry);
  const country = first(filters.country);
  const event = first(filters.event);
  const size = first(filters.size);

  const dictionary = await resolveDictionary(locale);
  const page = dictionary.workPage;
  const [projects, boothTypes, industries, locations] = await Promise.all([
    loadProjects(locale),
    loadBoothTypes(locale),
    loadIndustries(locale),
    loadLocations(locale),
  ]);

  const filtered = projects.filter((project) => {
    if (boothType && project.boothTypeSlug !== boothType) return false;
    if (industry && project.industrySlug !== industry) return false;
    if (country && project.locationSlug !== country) return false;
    if (event && project.event !== event) return false;
    if (size && project.size !== size) return false;
    return true;
  });

  const events = Array.from(
    new Set(projects.map((project) => project.event).filter(Boolean) as string[]),
  );
  const sizes = Array.from(
    new Set(projects.map((project) => project.size).filter(Boolean) as string[]),
  );

  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const basePath = localizePath("/work", locale);

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: page.title },
        ]}
      />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image={projects[0]?.image}
        imageAlt={projects[0]?.imageAlt}
        cta={{
          label: locale === "ar" ? "ابدأ مشروعك" : "Start your project",
          href: "#work-brief",
        }}
      />

      <WorkFilters
        locale={locale}
        basePath={basePath}
        values={{ boothType, industry, country, event, size }}
        options={{
          boothType: boothTypes.map((item) => ({
            value: item.slug,
            label: item.title,
          })),
          industry: industries.map((item) => ({
            value: item.slug,
            label: item.title,
          })),
          country: locations.map((item) => ({
            value: item.slug,
            label: item.title,
          })),
          event: events.map((item) => ({ value: item, label: item })),
          size: sizes.map((item) => ({ value: item, label: item })),
        }}
        labels={{
          boothType: locale === "ar" ? "نوع الجناح" : "Booth type",
          industry: locale === "ar" ? "القطاع" : "Industry",
          country: locale === "ar" ? "المدينة" : "City",
          event: locale === "ar" ? "الحدث" : "Event",
          size: locale === "ar" ? "المساحة" : "Size",
          all: locale === "ar" ? "الكل" : "All",
          clear: locale === "ar" ? "مسح الكل" : "Clear all",
          filters: locale === "ar" ? "تصفية" : "Filter",
        }}
      />

      <section className="work-gallery-section">
        <div className="site-container">
          <div className="work-gallery-bar">
            <p className="work-gallery-count">
              {filtered.length}{" "}
              {locale === "ar"
                ? "مشروع"
                : filtered.length === 1
                  ? "project"
                  : "projects"}
            </p>
          </div>
          {filtered.length ? (
            <div className="work-gallery-grid">
              {filtered.map((item) => (
                <Link
                  key={item.slug}
                  href={localizePath(`/work/${item.slug}`, locale)}
                  className="work-card group"
                >
                  <div className="work-card-media">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="work-card-tag">{item.category}</span>
                  </div>
                  <div className="work-card-copy">
                    <p className="work-card-meta">{item.year}</p>
                    <h2 className="work-card-title">{item.title}</h2>
                    <p className="work-card-summary">{item.summary}</p>
                    <span className="work-card-cta">
                      {locale === "ar" ? "عرض المشروع" : "View project"}
                      <CtaArrow size="sm" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="work-gallery-empty">
              {locale === "ar"
                ? "لا توجد مشاريع مطابقة لهذه الفلاتر."
                : "No projects match these filters."}
            </p>
          )}
        </div>
      </section>
      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        namespace="work"
      />
    </>
  );
}
