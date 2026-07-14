import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { localizePath, type Locale } from "@/lib/i18n";
import {
  DEFAULT_LOCATION_SLUG,
  locationServicePath,
} from "@/lib/locations";

export type ServiceDetailItem = {
  slug: string;
  title: string;
  excerpt: string;
  overview: string;
  image?: string;
  imageAlt?: string;
  benefits: { title: string; description: string }[];
  process: { title: string; description: string }[];
};

type ServiceDetailSectionsProps = {
  locale: Locale;
  service: ServiceDetailItem;
  related: ServiceDetailItem[];
  locations: { slug: string; title: string }[];
  locationSlug?: string;
  briefHref: string;
  ctaLabel: string;
};

export function ServiceDetailSections({
  locale,
  service,
  related,
  locations,
  locationSlug = DEFAULT_LOCATION_SLUG,
  briefHref,
  ctaLabel,
}: ServiceDetailSectionsProps) {
  const isArabic = locale === "ar";

  return (
    <>
      <section className="service-detail-overview">
        <div className="site-container service-detail-overview-grid">
          <Reveal className="service-detail-overview-copy">
            <p className="eyebrow">
              {isArabic ? "نظرة عامة" : "Overview"}
            </p>
            <h2 className="service-detail-overview-title">
              {isArabic
                ? "ماذا تغطي هذه الخدمة."
                : "What this service covers."}
            </h2>
            <p className="service-detail-overview-body">{service.overview}</p>
            <Link href={briefHref} className="service-detail-overview-cta">
              <span>{ctaLabel}</span>
              <CtaArrow size="md" />
            </Link>
          </Reveal>

          {service.image ? (
            <Reveal delay={0.08} className="service-detail-overview-media">
              <Image
                src={service.image}
                alt={service.imageAlt ?? service.title}
                fill
                sizes="(max-width: 899px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          ) : null}
        </div>
      </section>

      {service.benefits.length ? (
        <section className="service-detail-benefits">
          <div className="site-container">
            <Reveal>
              <div className="service-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "الفوائد" : "Benefits"}
                </p>
                <h2 className="service-detail-section-title">
                  {isArabic
                    ? "لماذا تختار CPS لهذه الخدمة."
                    : "Why brands choose CPS for this."}
                </h2>
              </div>
            </Reveal>

            <div className="service-detail-benefits-grid">
              {service.benefits.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="service-detail-benefit-card">
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

      {service.process.length ? (
        <ProcessTimeline
          eyebrow={isArabic ? "العملية" : "Process"}
          title={
            isArabic
              ? "مسار واضح من الموجز إلى التنفيذ."
              : "A clear path from brief to delivery."
          }
          support={
            isArabic
              ? "كل مرحلة لها مالك واحد داخل CPS — بدون فجوات بين التصميم والبناء والتركيب."
              : "Every stage stays with one CPS team — no gaps between design, build, and install."
          }
          steps={service.process}
          className="service-detail-process"
        />
      ) : null}

      {locations.length ? (
        <section className="service-detail-locations">
          <div className="site-container">
            <Reveal>
              <div className="service-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "متوفرة في" : "Available in"}
                </p>
                <h2 className="service-detail-section-title">
                  {isArabic
                    ? `${service.title} عبر مدننا.`
                    : `${service.title} across our cities.`}
                </h2>
              </div>
            </Reveal>
            <ul className="service-detail-locations-list">
              {locations.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localizePath(
                      locationServicePath(service.slug, item.slug),
                      locale,
                    )}
                  >
                    <span>{item.title}</span>
                    <CtaArrow size="sm" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="service-detail-related">
          <div className="site-container">
            <Reveal>
              <div className="service-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "خدمات ذات صلة" : "Related services"}
                </p>
                <h2 className="service-detail-section-title">
                  {isArabic
                    ? "أكمل الحل بخدمات أخرى."
                    : "Complete the build with related services."}
                </h2>
              </div>
            </Reveal>

            <div className="service-detail-related-grid">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <Link
                    href={localizePath(
                      locationServicePath(item.slug, locationSlug),
                      locale,
                    )}
                    className="service-detail-related-card"
                  >
                    {item.image ? (
                      <div className="service-detail-related-media">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 767px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="service-detail-related-copy">
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <span>
                        {isArabic ? "عرض الخدمة" : "View service"}
                        <CtaArrow size="sm" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
