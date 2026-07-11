import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
        />
        <section className="section-pad">
          <div className="site-container grid gap-10 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.slug}
                href={localizePath(`/industries/${item.slug}`, locale)}
                className="group grid gap-5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#d9e2e8]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                  <p className="mt-3 text-base leading-7 text-muted">{item.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
    </>
  );
}
