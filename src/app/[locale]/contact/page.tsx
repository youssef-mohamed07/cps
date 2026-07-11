import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BleedImage } from "@/components/media/bleed-image";
import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { PageHero } from "@/components/sections/page-hero";
import { media } from "@/content/media";
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
    <>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <div className="site-container">
        <BleedImage
          src={media.contact.hero}
          alt={locale === "ar" ? "مقر الشركة وقاعة الاستقبال" : "Company headquarters reception"}
          className="media-bleed-wide"
          priority
        />
      </div>

      <section className="section-pad">
        <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <div>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={getMailtoUrl({ subject: "Project inquiry — CPS" })}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MotionIcon name="email" size={22} trigger="hover" tone="white" />
                  {dictionary.contact.emailLabel}
                  <CtaArrow tone="white" />
                </a>
                <a
                  href={getWhatsAppUrl()}
                  className="btn-secondary inline-flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MotionIcon name="phone" size={22} trigger="hover" />
                  {dictionary.contact.whatsappLabel}
                </a>
              </div>

              <div className="mt-12 flex flex-col gap-5">
                <a
                  href={`mailto:${config.email}`}
                  className="contact-link contact-link-row w-fit"
                >
                  <MotionIcon name="email" size={28} trigger="hover" />
                  {config.email}
                </a>
                <a
                  href={`tel:${config.phone}`}
                  className="contact-link contact-link-row w-fit"
                  dir="ltr"
                >
                  <MotionIcon name="phone" size={28} trigger="hover" />
                  {config.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="eyebrow">{page.officeTitle}</p>
              <div className="mt-5 flex items-start gap-3 text-xl leading-8 text-foreground/90">
                <MotionIcon name="location" size={32} trigger="in" />
                <span>
                  {config.address.city}, {config.address.countryName}
                </span>
              </div>
              <p className="mt-4 max-w-sm text-base leading-7 text-muted">
                {dictionary.contact.support}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
