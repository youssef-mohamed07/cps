import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadLocations } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const title = localeParam === "ar" ? "المواقع" : "Locations";
  const description =
    localeParam === "ar"
      ? "خدمات أجنحة المعارض عبر دول الخليج ومصر."
      : "Exhibition booth services across the GCC and Egypt.";
  return buildPageMetadata({
    path: "/locations",
    locale: localeParam,
    fallbackTitle: `CPS — ${title}`,
    fallbackDescription: description,
  });
}

export default async function LocationsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const items = await loadLocations(locale);
  const title = locale === "ar" ? "المواقع" : "Locations";
  const lead =
    locale === "ar"
      ? "حضور إقليمي عبر السعودية ودول الخليج ومصر."
      : "Regional presence across Saudi Arabia, the GCC, and Egypt.";
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
          eyebrow={locale === "ar" ? "أين نعمل" : "Where we work"}
          title={title}
          lead={lead}
        />
        <section className="section-pad">
          <div className="site-container grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={localizePath(`/locations/${item.slug}`, locale)}
                className="group grid gap-4"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#d9e2e8]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">{item.title}</h2>
                  <p className="mt-2 text-base leading-7 text-muted">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
    </>
  );
}
