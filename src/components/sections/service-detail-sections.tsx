import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
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
  overviewTitle?: string;
  overviewBullets?: { title: string; description: string }[];
  image?: string;
  imageAlt?: string;
  process: {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  }[];
};

type ServiceDetailSectionsProps = {
  locale: Locale;
  service: ServiceDetailItem;
  related: ServiceDetailItem[];
  locationSlug?: string;
  briefHref: string;
  ctaLabel: string;
  afterOverview?: ReactNode;
};

export function ServiceDetailSections({
  locale,
  service,
  related,
  locationSlug = DEFAULT_LOCATION_SLUG,
  briefHref,
  ctaLabel,
  afterOverview,
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
              {service.overviewTitle ??
                (isArabic
                  ? "ماذا تغطي هذه الخدمة."
                  : "What this service covers.")}
            </h2>
            <p className="service-detail-overview-body">{service.overview}</p>
            {service.overviewBullets?.length ? (
              <ul className="service-detail-overview-bullets">
                {service.overviewBullets.map((item) => (
                  <li key={item.title}>
                    <span
                      className="service-detail-overview-bullet-mark"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20" fill="none">
                        <path
                          d="M4 10.5l3.5 3.5L16 5.5"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="service-detail-overview-bullet-copy">
                      <strong>{item.title}</strong>
                      {item.description ? <span>{item.description}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
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

      {afterOverview}

      {service.process.length ? (
        <ProcessTimeline
          eyebrow={isArabic ? "عمليتنا" : "Our Process"}
          title={isArabic ? "كيف يعمل." : "How It Works"}
          support={
            isArabic
              ? "من الموجز إلى الإنتاج — كل مرحلة مع فريق CPS واحد."
              : "From brief to production — every stage with one CPS team."
          }
          steps={service.process}
          className="service-detail-process"
        />
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
