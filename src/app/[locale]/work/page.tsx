import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
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
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function FilterRow({
  label,
  allHref,
  allLabel,
  options,
}: {
  label: string;
  allHref: string;
  allLabel: string;
  options: { label: string; href: string; active: boolean }[];
}) {
  const anyActive = options.some((option) => option.active);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="me-2 text-sm text-muted">{label}</span>
      <Link
        href={allHref}
        className={`text-sm ${!anyActive ? "text-foreground underline" : "text-muted"}`}
      >
        {allLabel}
      </Link>
      {options.map((option) => (
        <Link
          key={option.href}
          href={option.href}
          className={`text-sm ${option.active ? "text-foreground underline" : "text-muted"}`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const dictionary = await resolveDictionary(localeParam);
  return buildPageMetadata({
    path: "/work",
    locale: localeParam,
    fallbackTitle: `CPS — ${dictionary.workPage.title}`,
    fallbackDescription: dictionary.workPage.lead,
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
  const allLabel = locale === "ar" ? "الكل" : "All";
  const filterLabels = {
    boothType: locale === "ar" ? "نوع الجناح" : "Booth type",
    industry: locale === "ar" ? "القطاع" : "Industry",
    country: locale === "ar" ? "الدولة" : "Country",
    event: locale === "ar" ? "الحدث" : "Event",
    size: locale === "ar" ? "المساحة" : "Size",
  };

  function hrefFor(next: Record<string, string | undefined>) {
    const params = new URLSearchParams();
    const merged = {
      boothType,
      industry,
      country,
      event,
      size,
      ...next,
    };
    for (const [key, value] of Object.entries(merged)) {
      if (value) params.set(key, value);
    }
    const query = params.toString();
    return `${localizePath("/work", locale)}${query ? `?${query}` : ""}`;
  }

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: page.title },
        ]}
      />
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <section className="pb-8">
        <div className="site-container grid gap-6">
          <FilterRow
            label={filterLabels.boothType}
            allHref={hrefFor({ boothType: undefined })}
            allLabel={allLabel}
            options={boothTypes.map((item) => ({
              label: item.title,
              href: hrefFor({ boothType: item.slug }),
              active: boothType === item.slug,
            }))}
          />
          <FilterRow
            label={filterLabels.industry}
            allHref={hrefFor({ industry: undefined })}
            allLabel={allLabel}
            options={industries.map((item) => ({
              label: item.title,
              href: hrefFor({ industry: item.slug }),
              active: industry === item.slug,
            }))}
          />
          <FilterRow
            label={filterLabels.country}
            allHref={hrefFor({ country: undefined })}
            allLabel={allLabel}
            options={locations.map((item) => ({
              label: item.title,
              href: hrefFor({ country: item.slug }),
              active: country === item.slug,
            }))}
          />
          {events.length ? (
            <FilterRow
              label={filterLabels.event}
              allHref={hrefFor({ event: undefined })}
              allLabel={allLabel}
              options={events.map((item) => ({
                label: item,
                href: hrefFor({ event: item }),
                active: event === item,
              }))}
            />
          ) : null}
          {sizes.length ? (
            <FilterRow
              label={filterLabels.size}
              allHref={hrefFor({ size: undefined })}
              allLabel={allLabel}
              options={sizes.map((item) => ({
                label: item,
                href: hrefFor({ size: item }),
                active: size === item,
              }))}
            />
          ) : null}
        </div>
      </section>

      <section className="pb-[clamp(4.5rem,10vw,7rem)]">
        <div className="site-container work-index">
          {filtered.map((item) => (
            <Link
              key={item.slug}
              href={localizePath(`/work/${item.slug}`, locale)}
              className="work-index-item group"
            >
              <div className="work-index-media">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="work-index-copy">
                <p className="text-sm text-muted">
                  {item.category} · {item.year}
                </p>
                <h2 className="mt-3">{item.title}</h2>
                <p>{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
