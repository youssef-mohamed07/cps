import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BleedImage } from "@/components/media/bleed-image";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { faqJsonLd, JsonLd } from "@/components/seo/json-ld";
import { media } from "@/content/media";
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
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const faq = faqJsonLd(dictionary.faq.items);

  return (
    <>
        {faq ? <JsonLd data={faq} /> : null}
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: page.title },
          ]}
        />
        <div id="overview">
          <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />
        </div>

        <div className="site-container">
          <BleedImage
            src={media.about.hero}
            alt={locale === "ar" ? "فريق CPS في ورشة التصنيع" : "CPS team in the fabrication workshop"}
            className="media-bleed-wide"
            priority
          />
        </div>

        <section id="mission" className="section-pad scroll-mt-24">
          <div className="site-container split-media">
            <div>
              <p className="eyebrow">{page.storyTitle}</p>
              <p className="mt-6 text-xl leading-9 text-foreground/90 sm:text-2xl sm:leading-10">
                {page.story}
              </p>
            </div>
            <BleedImage
              src={media.about.mission}
              alt={locale === "ar" ? "فريق يعمل في مساحة حديثة" : "Team collaborating in a modern workspace"}
              className="media-bleed-tall"
            />
          </div>
        </section>

        <section id="why-us" className="section-pad section-rule scroll-mt-24">
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

        <section id="process" className="section-pad section-rule scroll-mt-24">
          <div className="site-container">
            <p className="eyebrow">{dictionary.process.eyebrow}</p>
            <h2 className="display mt-4">{dictionary.process.title}</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {dictionary.process.steps.map((step, index) => (
                <article key={step.title}>
                  <p className="service-index">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="section-pad section-rule scroll-mt-24">
          <div className="site-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow">{page.studioTitle}</p>
              <p className="lede mt-5">{page.studioBody}</p>
            </div>
            <BleedImage
              src={media.about.studio}
              alt={locale === "ar" ? "مساحة الاستوديو الحديثة" : "Modern studio headquarters"}
            />
          </div>
        </section>

        <section id="certifications" className="section-pad section-rule scroll-mt-24">
          <div className="site-container max-w-3xl">
            <p className="eyebrow">
              {locale === "ar" ? "الجودة والاعتماد" : "Quality & certifications"}
            </p>
            <p className="mt-4 text-base leading-7 text-muted">
              {locale === "ar"
                ? "نعمل وفق معايير إنتاج وتركيب صارمة عبر الورشة والموقع — مع تخطيط لوجستي يحمي الجداول والأصول."
                : "We work to strict production and install standards across the workshop and venue — with logistics planning that protects schedules and assets."}
            </p>
          </div>
        </section>

        <section id="clients" className="section-pad section-rule scroll-mt-24">
          <div className="site-container max-w-3xl">
            <p className="eyebrow">{locale === "ar" ? "العملاء" : "Clients"}</p>
            <p className="mt-4 text-base leading-7 text-muted">
              {locale === "ar"
                ? "نخدم علامات عبر التقنية والرعاية الصحية والطاقة والتجزئة في السعودية والخليج ومصر."
                : "We serve brands across technology, healthcare, energy, and retail in Saudi Arabia, the GCC, and Egypt."}
            </p>
          </div>
        </section>

        <section id="faq" className="section-pad scroll-mt-24">
          <div className="site-container max-w-3xl">
            <p className="eyebrow">{dictionary.faq.eyebrow}</p>
            <h2 className="display mt-4">{dictionary.faq.title}</h2>
            <div className="mt-8 grid gap-6">
              {dictionary.faq.items.map((item) => (
                <article key={item.question}>
                  <h3 className="text-xl font-semibold">{item.question}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}
