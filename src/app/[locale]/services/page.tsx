import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/site-chrome";
import { BleedImage } from "@/components/media/bleed-image";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

const serviceImages = [
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
];

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

  return (
    <SiteChrome locale={locale} dictionary={dictionary}>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <div className="site-container">
        <BleedImage
          src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=2000&q=80"
          alt={locale === "ar" ? "عمل إبداعي على الطاولة" : "Creative work on the table"}
          className="media-bleed-wide"
          priority
        />
      </div>

      <section className="section-pad">
        <div className="site-container">
          <p className="eyebrow">{page.detailTitle}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {dictionary.services.items.map((item, index) => (
              <article key={item.title} className="grid gap-5">
                <BleedImage
                  src={serviceImages[index % serviceImages.length]}
                  alt={item.title}
                />
                <div>
                  <p className="service-index">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProcessSection content={dictionary.process} />
    </SiteChrome>
  );
}
