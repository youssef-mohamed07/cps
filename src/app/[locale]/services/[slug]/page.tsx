import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BleedImage } from "@/components/media/bleed-image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { services } from "@/content/catalog";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadService } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return services.flatMap((service) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: service.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const service = await loadService(localeParam, slug);
  if (!service) return {};
  return buildPageMetadata({
    path: `/services/${slug}`,
    locale: localeParam,
    seo: service.seo,
    fallbackTitle: `CPS — ${service.title}`,
    fallbackDescription: service.excerpt || service.overview,
    fallbackOgImage: service.image,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const service = await loadService(locale, slug);
  if (!service) notFound();

  const dictionary = await resolveDictionary(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const servicesLabel = locale === "ar" ? "الخدمات" : "Services";
  const faq = faqJsonLd(service.faq);

  return (
    <>
        <JsonLd
          data={serviceJsonLd({
            name: service.title,
            description: service.overview || service.excerpt,
            path: `/services/${slug}`,
            locale,
            image: service.image,
          })}
        />
        {faq ? <JsonLd data={faq} /> : null}

        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: servicesLabel, href: "/services" },
            { label: service.title },
          ]}
        />

        <PageHero title={service.title} lead={service.excerpt || service.overview} />

        {service.image ? (
          <div className="site-container">
            <BleedImage
              src={service.image}
              alt={service.imageAlt}
              className="media-bleed-wide"
              priority
            />
          </div>
        ) : null}

        <section className="section-pad">
          <div className="site-container max-w-3xl">
            <p className="text-lg leading-8 text-muted">{service.overview}</p>
          </div>
        </section>

        {service.benefits.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "الفوائد" : "Benefits"}</p>
              <div className="value-list mt-10">
                {service.benefits.map((item) => (
                  <article key={item.title}>
                    <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
                    <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {service.process.length ? (
          <section className="section-pad section-rule">
            <div className="site-container">
              <p className="eyebrow">{locale === "ar" ? "العملية" : "Process"}</p>
              <div className="mt-10 grid gap-8 md:grid-cols-3">
                {service.process.map((step, index) => (
                  <article key={step.title}>
                    <p className="service-index">{String(index + 1).padStart(2, "0")}</p>
                    <h2 className="mt-3 text-xl font-semibold">{step.title}</h2>
                    <p className="mt-3 text-base leading-7 text-muted">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {service.faq.length ? (
          <section className="section-pad section-rule">
            <div className="site-container max-w-3xl">
              <p className="eyebrow">FAQ</p>
              <div className="mt-8 grid gap-6">
                {service.faq.map((item) => (
                  <article key={item.question}>
                    <h2 className="text-xl font-semibold">{item.question}</h2>
                    <p className="mt-3 text-base leading-7 text-muted">{item.answer}</p>
                  </article>
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
