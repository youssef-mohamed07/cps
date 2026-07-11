import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadBoothTypes } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const dictionary = await resolveDictionary(localeParam);
  return buildPageMetadata({
    path: "/booth-types",
    locale: localeParam,
    fallbackTitle: `CPS — ${dictionary.boothTypesPage.title}`,
    fallbackDescription: dictionary.boothTypesPage.lead,
  });
}

export default async function BoothTypesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const items = await loadBoothTypes(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: dictionary.boothTypesPage.title },
          ]}
        />
        <PageHero
          eyebrow={dictionary.boothTypesPage.eyebrow}
          title={dictionary.boothTypesPage.title}
          lead={dictionary.boothTypesPage.lead}
        />
        <section className="section-pad">
          <div className="site-container">
            <div className="booth-types-panel">
              <div className="booth-types-grid">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    href={localizePath(`/booth-types/${item.slug}`, locale)}
                    className="booth-type-card group"
                  >
                    <div className="booth-type-media">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="booth-type-meta">
                      <h2 className="booth-type-title">{item.title}</h2>
                      {item.excerpt ? (
                        <p className="booth-type-excerpt">{item.excerpt}</p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
