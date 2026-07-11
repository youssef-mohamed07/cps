import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import type { ProgrammaticPageData } from "@/content/programmatic-seo";
import { localizePath, type Locale } from "@/lib/i18n";

type ProgrammaticLocationSectionsProps = {
  locale: Locale;
  page: ProgrammaticPageData;
  briefHref: string;
  ctaLabel: string;
};

export function ProgrammaticLocationSections({
  locale,
  page,
  briefHref,
  ctaLabel,
}: ProgrammaticLocationSectionsProps) {
  const isArabic = locale === "ar";
  const locationHref = localizePath(`/locations/${page.locationSlug}`, locale);
  const entityHref = localizePath(
    page.kind === "service"
      ? `/services/${page.entitySlug}`
      : `/booth-types/${page.entitySlug}`,
    locale,
  );

  return (
    <>
      <section className="pseo-overview">
        <div className="site-container pseo-overview-grid">
          <Reveal className="pseo-overview-copy">
            <p className="eyebrow">
              {page.countryCode} · {page.locationTitle}
            </p>
            <h2 className="pseo-overview-title">
              {isArabic
                ? `${page.entityTitle} بمعايير CPS في ${page.locationTitle}.`
                : `${page.entityTitle} to CPS standards in ${page.locationTitle}.`}
            </h2>
            <p className="pseo-overview-body">{page.overview}</p>
            <div className="pseo-overview-actions">
              <Link href={briefHref} className="pseo-overview-cta">
                <span>{ctaLabel}</span>
                <CtaArrow size="md" />
              </Link>
              <Link href={entityHref} className="pseo-overview-secondary">
                {isArabic
                  ? page.kind === "service"
                    ? "تفاصيل الخدمة"
                    : "تفاصيل نوع الجناح"
                  : page.kind === "service"
                    ? "Service details"
                    : "Booth type details"}
              </Link>
            </div>
          </Reveal>

          {page.image ? (
            <Reveal delay={0.08} className="pseo-overview-media">
              <Image
                src={page.image}
                alt={page.imageAlt}
                fill
                sizes="(max-width: 899px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          ) : null}
        </div>
      </section>

      {page.highlights.length ? (
        <section className="pseo-highlights">
          <div className="site-container">
            <Reveal>
              <div className="pseo-section-head">
                <p className="eyebrow">
                  {isArabic ? "لماذا CPS هنا" : "Why CPS here"}
                </p>
                <h2 className="pseo-section-title">
                  {isArabic
                    ? `ما يميز التنفيذ في ${page.locationTitle}.`
                    : `What makes delivery work in ${page.locationTitle}.`}
                </h2>
              </div>
            </Reveal>
            <div className="pseo-highlights-grid">
              {page.highlights.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="pseo-highlight-card">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.faqs.length ? (
        <section className="pseo-faq">
          <div className="site-container pseo-faq-grid">
            <Reveal>
              <div className="pseo-section-head">
                <p className="eyebrow">{isArabic ? "أسئلة شائعة" : "FAQ"}</p>
                <h2 className="pseo-section-title">
                  {isArabic
                    ? `أسئلة عن ${page.entityTitle} في ${page.locationTitle}.`
                    : `Questions about ${page.entityTitle} in ${page.locationTitle}.`}
                </h2>
              </div>
            </Reveal>
            <div className="pseo-faq-list">
              {page.faqs.map((item, index) => (
                <Reveal key={item.question} delay={index * 0.04}>
                  <details className="pseo-faq-item">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pseo-links">
        <div className="site-container">
          <div className="pseo-links-grid">
            <Reveal>
              <div className="pseo-links-block">
                <p className="eyebrow">
                  {isArabic ? "خدمات في هذا الموقع" : "Services here"}
                </p>
                <h2 className="pseo-links-title">
                  {isArabic
                    ? `خدمات CPS في ${page.locationTitle}`
                    : `CPS services in ${page.locationTitle}`}
                </h2>
                <ul>
                  {page.relatedServices.map((item) => (
                    <li key={item.slug}>
                      <Link href={localizePath(item.href, locale)}>
                        <span>{item.title}</span>
                        <CtaArrow size="sm" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="pseo-links-block">
                <p className="eyebrow">
                  {isArabic ? "أنواع الأجنحة هنا" : "Booth types here"}
                </p>
                <h2 className="pseo-links-title">
                  {isArabic
                    ? `أنواع أجنحة في ${page.locationTitle}`
                    : `Booth types in ${page.locationTitle}`}
                </h2>
                <ul>
                  {page.relatedBoothTypes.map((item) => (
                    <li key={item.slug}>
                      <Link href={localizePath(item.href, locale)}>
                        <span>{item.title}</span>
                        <CtaArrow size="sm" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pseo-links-block">
                <p className="eyebrow">
                  {isArabic ? "نفس العرض في دول أخرى" : "Same offer elsewhere"}
                </p>
                <h2 className="pseo-links-title">
                  {isArabic
                    ? `${page.entityTitle} في مواقع أخرى`
                    : `${page.entityTitle} in other locations`}
                </h2>
                <ul>
                  {page.otherLocations.map((item) => (
                    <li key={item.slug}>
                      <Link href={localizePath(item.href, locale)}>
                        <span>{item.title}</span>
                        <CtaArrow size="sm" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={locationHref} className="pseo-links-more">
                  {isArabic
                    ? `العودة إلى ${page.locationTitle}`
                    : `Back to ${page.locationTitle}`}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
