import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BleedImage } from "@/components/media/bleed-image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { locations } from "@/content/catalog";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadLocation, loadProjects } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locations.flatMap((item) =>
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
  const location = await loadLocation(localeParam, slug);
  if (!location) return {};
  return buildPageMetadata({
    path: `/locations/${slug}`,
    locale: localeParam,
    seo: location.seo,
    fallbackTitle: `CPS — ${location.title}`,
    fallbackDescription: location.excerpt || location.localExperience,
    fallbackOgImage: location.image,
  });
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const location = await loadLocation(locale, slug);
  if (!location) notFound();

  const dictionary = await resolveDictionary(locale);
  const projects = await loadProjects(locale);
  const relatedProjects = projects.filter((item) => item.locationSlug === slug).slice(0, 3);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const hubLabel = locale === "ar" ? "المواقع" : "Locations";

  return (
    <>
        <JsonLd
          data={serviceJsonLd({
            name: location.title,
            description: location.localExperience || location.excerpt,
            path: `/locations/${slug}`,
            locale,
            image: location.image,
          })}
        />
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: hubLabel, href: "/locations" },
            { label: location.title },
          ]}
        />
        <PageHero title={location.title} lead={location.excerpt || location.localExperience} />

        {location.image ? (
          <div className="site-container">
            <BleedImage
              src={location.image}
              alt={location.imageAlt}
              className="media-bleed-wide"
              priority
            />
          </div>
        ) : null}

        <section className="section-pad">
          <div className="site-container max-w-3xl">
            <p className="text-lg leading-8 text-muted">{location.localExperience}</p>
          </div>
        </section>

        {relatedProjects.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "مشاريع في هذه الدولة" : "Projects here"}</p>
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
