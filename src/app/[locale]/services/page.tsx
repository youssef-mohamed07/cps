import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadServices } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const dictionary = await resolveDictionary(localeParam);
  return buildPageMetadata({
    path: "/services",
    locale: localeParam,
    fallbackTitle: `CPS — ${dictionary.servicesPage.title}`,
    fallbackDescription: dictionary.servicesPage.lead,
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const page = dictionary.servicesPage;
  const items = await loadServices(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

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

        <section className="section-pad">
          <div className="site-container">
            <p className="eyebrow">{page.detailTitle}</p>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {items.map((item, index) => (
                <Link
                  key={item.slug}
                  href={localizePath(`/services/${item.slug}`, locale)}
                  className="group grid gap-5"
                >
                  {item.image ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#d9e2e8]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="service-index">{String(index + 1).padStart(2, "0")}</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {item.title}
                    </h2>
                    <p className="mt-3 text-base leading-7 text-muted">
                      {item.excerpt || item.overview}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
