import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutPageSections } from "@/components/sections/about-page-sections";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { faqJsonLd, JsonLd } from "@/components/seo/json-ld";
import { media } from "@/content/media";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadAboutSeo } from "@/sanity/load-pages";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const [dictionary, seo] = await Promise.all([
    resolveDictionary(localeParam),
    loadAboutSeo(localeParam),
  ]);
  return buildPageMetadata({
    path: "/about",
    locale: localeParam,
    seo,
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
  const faq = faqJsonLd(page.faqItems);

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
          <PageHero
            eyebrow={page.eyebrow}
            title={page.title}
            lead={page.lead}
            image={media.about.hero}
            imageAlt={locale === "ar" ? "فريق CPS في ورشة التصنيع" : "CPS team in the fabrication workshop"}
            cta={{
              label: dictionary.nav.cta,
              href: "#about-brief",
            }}
          />
        </div>

        <AboutPageSections locale={locale} page={page} />

        <InnerPageEngagement
          locale={locale}
          dictionary={dictionary}
          namespace="about"
          faqItems={page.faqItems}
          faqTitle={locale === "ar" ? "أسئلة عن CPS" : "Questions about CPS"}
        />
    </>
  );
}
