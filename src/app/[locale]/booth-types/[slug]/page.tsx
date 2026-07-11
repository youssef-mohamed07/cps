import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BleedImage } from "@/components/media/bleed-image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { boothTypes } from "@/content/catalog";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadBoothType } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return boothTypes.flatMap((item) =>
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
  const boothType = await loadBoothType(localeParam, slug);
  if (!boothType) return {};
  return buildPageMetadata({
    path: `/booth-types/${slug}`,
    locale: localeParam,
    seo: boothType.seo,
    fallbackTitle: `CPS — ${boothType.title}`,
    fallbackDescription: boothType.excerpt || boothType.description,
    fallbackOgImage: boothType.image,
  });
}

export default async function BoothTypeDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const boothType = await loadBoothType(locale, slug);
  if (!boothType) notFound();

  const dictionary = await resolveDictionary(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const hubLabel = locale === "ar" ? "أنواع الأجنحة" : "Booth Types";

  return (
    <>
        <JsonLd
          data={serviceJsonLd({
            name: boothType.title,
            description: boothType.description || boothType.excerpt,
            path: `/booth-types/${slug}`,
            locale,
            image: boothType.image,
          })}
        />

        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: hubLabel, href: "/booth-types" },
            { label: boothType.title },
          ]}
        />

        <PageHero title={boothType.title} lead={boothType.excerpt || boothType.description} />

        {boothType.image ? (
          <div className="site-container">
            <BleedImage
              src={boothType.image}
              alt={boothType.imageAlt}
              className="media-bleed-wide"
              priority
            />
          </div>
        ) : null}

        <section className="section-pad">
          <div className="site-container max-w-3xl">
            <p className="text-lg leading-8 text-muted">{boothType.description}</p>
          </div>
        </section>

        {boothType.features.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "الميزات" : "Features"}</p>
              <ul className="mt-8 grid gap-3 md:grid-cols-2">
                {boothType.features.map((feature) => (
                  <li key={feature} className="text-base leading-7 text-muted">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {boothType.advantages.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "المزايا" : "Advantages"}</p>
              <div className="value-list mt-10">
                {boothType.advantages.map((item) => (
                  <article key={item.title}>
                    <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                    <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {boothType.useCases.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "حالات الاستخدام" : "Use cases"}</p>
              <ul className="mt-8 grid gap-3 md:grid-cols-3">
                {boothType.useCases.map((useCase) => (
                  <li key={useCase} className="text-base leading-7 text-muted">
                    {useCase}
                  </li>
                ))}
              </ul>
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
