import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  cataloguePath,
  getServiceArchitecture,
  localizeText,
  serviceArchitecture,
  servicePath,
} from "@/content/service-architecture";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; serviceSlug: string; itemSlug: string }>;
};

function findCatalogueItem(serviceSlug: string, itemSlug: string) {
  const service = getServiceArchitecture(serviceSlug);
  if (!service) return null;

  for (const category of service.catalogue.categories) {
    const item = category.items.find((entry) => entry.slug === itemSlug);
    if (item) return { service, category, item };
  }

  return null;
}

export function generateStaticParams() {
  return serviceArchitecture.flatMap((service) =>
    service.catalogue.categories.flatMap((category) =>
      category.items.flatMap((item) =>
        (["en", "ar"] as const).map((locale) => ({
          locale,
          serviceSlug: service.slug,
          itemSlug: item.slug,
        })),
      ),
    ),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, serviceSlug, itemSlug } = await params;
  if (!isLocale(locale)) return {};
  const result = findCatalogueItem(serviceSlug, itemSlug);
  if (!result) return {};

  await ensureSiteConfig();
  return buildPageMetadata({
    path: `/services/${serviceSlug}/catalogue/${itemSlug}`,
    locale,
    fallbackTitle: `CPS — ${localizeText(result.item.title, locale)}`,
    fallbackDescription: localizeText(result.item.description, locale),
    fallbackOgImage: result.service.image,
  });
}

export default async function CatalogueItemPage({ params }: PageProps) {
  const { locale: value, serviceSlug, itemSlug } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const result = findCatalogueItem(serviceSlug, itemSlug);
  if (!result) notFound();

  const { service, category, item } = result;
  const catalogueHref = localizePath(cataloguePath(service.slug), locale);
  const contactHref = localizePath("/contact", locale);
  const quoteHref = localizePath(
    `${servicePath(service.slug)}?item=${encodeURIComponent(item.slug)}#quote`,
    locale,
  );
  const relatedItems = service.catalogue.categories
    .flatMap((group) => group.items)
    .filter((entry) => entry.slug !== item.slug)
    .slice(0, 3);
  const ar = locale === "ar";

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: ar ? "الرئيسية" : "Home", href: "/" },
          { label: ar ? "الخدمات" : "Services", href: "/services" },
          { label: localizeText(service.title, locale), href: servicePath(service.slug) },
          { label: localizeText(service.catalogue.title, locale), href: cataloguePath(service.slug) },
          { label: localizeText(item.title, locale) },
        ]}
      />

      <main className="catalogue-product">
        <div className="site-container">
          <Link href={catalogueHref} className="catalogue-product-back">
            <CtaArrow size="sm" />
            {ar ? "العودة إلى الكتالوج" : "Back to catalogue"}
          </Link>

          <div className="catalogue-product-grid">
            <div className="catalogue-product-media">
              <Image
                src={service.image}
                alt={localizeText(item.title, locale)}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 58vw"
                className="object-cover"
              />
              <span>{localizeText(category.title, locale)}</span>
            </div>

            <div className="catalogue-product-panel">
              <p className="eyebrow">{localizeText(service.title, locale)}</p>
              <h1>{localizeText(item.title, locale)}</h1>
              <p className="catalogue-product-description">
                {localizeText(item.description, locale)}
              </p>

              <div className="catalogue-product-details">
                <h2>{ar ? "لماذا تختار CPS" : "Why choose CPS"}</h2>
                <ul>
                  {service.benefits.slice(0, 4).map((benefit) => (
                    <li key={benefit.en}>{localizeText(benefit, locale)}</li>
                  ))}
                </ul>
              </div>

              {item.cityAnchors?.length ? (
                <div className="catalogue-product-cities">
                  <h2>{ar ? "متاح في" : "Available in"}</h2>
                  <ul>
                    {item.cityAnchors.map((city) => (
                      <li key={city.slug}>{localizeText(city.title, locale)}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="catalogue-product-actions">
                <Link href={contactHref} className="btn-primary">
                  {ar ? "تواصل معنا" : "Get in touch"}
                  <CtaArrow size="sm" />
                </Link>
                <Link href={quoteHref} className="btn-secondary">
                  {ar ? "اطلب عرض سعر" : "Request a quote"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {relatedItems.length ? (
        <section className="catalogue-related section-pad">
          <div className="site-container">
            <div className="catalogue-related-head">
              <p className="eyebrow">{ar ? "اكتشف المزيد" : "Explore more"}</p>
              <h2>{ar ? "خيارات أخرى قد تناسب مشروعك" : "Other options for your project"}</h2>
            </div>
            <div className="catalogue-related-grid">
              {relatedItems.map((entry) => (
                <Link
                  key={entry.slug}
                  href={localizePath(`${cataloguePath(service.slug)}/${entry.slug}`, locale)}
                  className="catalogue-related-card"
                >
                  <div className="catalogue-related-media">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 700px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3>{localizeText(entry.title, locale)}</h3>
                    <CtaArrow size="sm" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
