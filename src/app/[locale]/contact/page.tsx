import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { ContactPageSections } from "@/components/sections/contact-page-sections";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { media } from "@/content/media";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { getSiteConfig } from "@/lib/site-config";
import { loadContactSeo } from "@/sanity/load-pages";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const [dictionary, seo] = await Promise.all([
    resolveDictionary(localeParam),
    loadContactSeo(localeParam),
  ]);
  return buildPageMetadata({
    path: "/contact",
    locale: localeParam,
    seo,
    fallbackTitle: `CPS — ${dictionary.contactPage.title}`,
    fallbackDescription: dictionary.contactPage.lead,
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const page = dictionary.contactPage;
  const config = getSiteConfig();
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: page.eyebrow },
        ]}
      />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image={media.contact.hero}
        imageAlt={
          locale === "ar" ? "مقر الشركة وقاعة الاستقبال" : "Company headquarters reception"
        }
        cta={{
          label: dictionary.nav.cta,
          href: "#contact-brief",
        }}
      />
      <ContactPageSections
        locale={locale}
        copy={page}
        briefForm={dictionary.briefForm}
        config={config}
      />
    </>
  );
}
