import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/site-chrome";
import { BleedImage } from "@/components/media/bleed-image";
import { PageHero } from "@/components/sections/page-hero";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { getMailtoUrl, getSiteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const dictionary = await resolveDictionary(localeParam);
  return buildPageMetadata({
    path: "/contact",
    locale: localeParam,
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

  return (
    <SiteChrome locale={locale} dictionary={dictionary}>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <div className="site-container">
        <BleedImage
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80"
          alt={locale === "ar" ? "مساحة استوديو مضيئة" : "Bright studio space"}
          className="media-bleed-wide"
          priority
        />
      </div>

      <section className="section-pad">
        <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={getMailtoUrl({ subject: "Project inquiry — CPS" })}
                className="btn-primary"
              >
                {dictionary.contact.emailLabel}
              </a>
              <a
                href={getWhatsAppUrl()}
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dictionary.contact.whatsappLabel}
              </a>
            </div>

            <div className="mt-12 flex flex-col gap-5">
              <a href={`mailto:${config.email}`} className="contact-link w-fit">
                {config.email}
              </a>
              <a
                href={`tel:${config.phone}`}
                className="contact-link w-fit"
                dir="ltr"
              >
                {config.phoneDisplay}
              </a>
            </div>
          </div>

          <div>
            <p className="eyebrow">{page.officeTitle}</p>
            <p className="mt-5 text-xl leading-8 text-foreground/90">
              {config.address.city}, {config.address.countryName}
            </p>
            <p className="mt-4 max-w-sm text-base leading-7 text-muted">
              {dictionary.contact.support}
            </p>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
