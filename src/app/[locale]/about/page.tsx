import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/site-chrome";
import { BleedImage } from "@/components/media/bleed-image";
import { PageHero } from "@/components/sections/page-hero";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const dictionary = await resolveDictionary(localeParam);
  return buildPageMetadata({
    path: "/about",
    locale: localeParam,
    fallbackTitle: `CPS — ${dictionary.aboutPage.title}`,
    fallbackDescription: dictionary.aboutPage.lead,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const page = dictionary.aboutPage;

  return (
    <SiteChrome locale={locale} dictionary={dictionary}>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <div className="site-container">
        <BleedImage
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
          alt={locale === "ar" ? "فريق إبداعي في جلسة عمل" : "Creative team in a working session"}
          className="media-bleed-wide"
          priority
        />
      </div>

      <section className="section-pad">
        <div className="site-container split-media">
          <div>
            <p className="eyebrow">{page.storyTitle}</p>
            <p className="mt-6 text-xl leading-9 text-foreground/90 sm:text-2xl sm:leading-10">
              {page.story}
            </p>
          </div>
          <BleedImage
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80"
            alt={locale === "ar" ? "مساحة عمل الاستوديو" : "Studio working space"}
            className="media-bleed-tall"
          />
        </div>
      </section>

      <section className="section-pad section-rule">
        <div className="site-container">
          <p className="eyebrow">{page.valuesTitle}</p>
          <div className="value-list">
            {page.values.map((value) => (
              <article key={value.title}>
                <h2 className="text-2xl font-semibold tracking-tight">{value.title}</h2>
                <p className="mt-3 text-base leading-7 text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-rule">
        <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">{page.studioTitle}</p>
            <p className="lede mt-5">{page.studioBody}</p>
          </div>
          <BleedImage
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80"
            alt={locale === "ar" ? "تفاصيل معمارية للاستوديو" : "Architectural studio detail"}
          />
        </div>
      </section>
    </SiteChrome>
  );
}
