import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { BoothTypeModelSection } from "@/components/sections/booth-type-model-section";
import type { BoothModelVariant } from "@/components/three/booth-model-viewer";
import type { BoothTypeFeature } from "@/content/catalog";
import { formatBoothTypeTitle } from "@/content/catalog";
import { localizePath, type Locale } from "@/lib/i18n";

export type BoothTypeDetailItem = {
  slug: string;
  title: string;
  excerpt: string;
  overviewTitle: string;
  description: string;
  image?: string;
  imageAlt?: string;
  model3d?: string;
  features: BoothTypeFeature[];
  advantages: { title: string; description: string }[];
  useCases: string[];
};

type BoothTypeDetailSectionsProps = {
  locale: Locale;
  boothType: BoothTypeDetailItem;
  related: BoothTypeDetailItem[];
  locations: { slug: string; title: string }[];
  briefHref: string;
  ctaLabel: string;
};

export function BoothTypeDetailSections({
  locale,
  boothType,
  related,
  locations,
  briefHref,
  ctaLabel,
}: BoothTypeDetailSectionsProps) {
  const isArabic = locale === "ar";
  const modelVariant = boothType.slug as BoothModelVariant;

  return (
    <>
      <section className="booth-detail-overview">
        <div className="site-container booth-detail-overview-grid">
          <Reveal className="booth-detail-overview-copy">
            <p className="eyebrow">{isArabic ? "نظرة عامة" : "Overview"}</p>
            <h2 className="booth-detail-overview-title">{boothType.overviewTitle}</h2>
            <p className="booth-detail-overview-body">{boothType.description}</p>
            {boothType.features.length ? (
              <ul className="booth-detail-overview-bullets">
                {boothType.features.map((feature) => (
                  <li key={feature.title}>
                    <span className="booth-detail-overview-bullet-mark" aria-hidden="true">
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
                    <span className="booth-detail-overview-bullet-copy">
                      <strong>{feature.title}</strong>
                      {feature.description ? <span>{feature.description}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
            <Link href={briefHref} className="booth-detail-overview-cta">
              <span>{ctaLabel}</span>
              <CtaArrow size="md" />
            </Link>
          </Reveal>

          {boothType.image ? (
            <Reveal delay={0.08} className="booth-detail-overview-media">
              <Image
                src={boothType.image}
                alt={boothType.imageAlt ?? boothType.title}
                fill
                sizes="(max-width: 899px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          ) : null}
        </div>
      </section>

      <BoothTypeModelSection
        locale={locale}
        title={formatBoothTypeTitle(boothType.title)}
        variant={modelVariant}
        modelUrl={boothType.model3d}
      />

      {boothType.features.length || boothType.useCases.length ? (
        <section className="booth-detail-spec">
          <div className="site-container booth-detail-spec-grid">
            {boothType.features.length ? (
              <Reveal className="booth-detail-spec-block">
                <p className="eyebrow">{isArabic ? "الميزات" : "Features"}</p>
                <h2 className="booth-detail-spec-title">
                  {isArabic
                    ? "ما الذي يميز هذا النوع."
                    : "What makes this format work."}
                </h2>
                <ul className="booth-detail-feature-list">
                  {boothType.features.map((feature) => (
                    <li key={feature.title}>
                      <span className="booth-detail-feature-check" aria-hidden="true">
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
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {boothType.useCases.length ? (
              <Reveal delay={0.08} className="booth-detail-spec-block booth-detail-spec-block--usecases">
                <p className="eyebrow eyebrow-on-dark">
                  {isArabic ? "لمن هذا" : "Who this is for"}
                </p>
                <h2 className="booth-detail-spec-title booth-detail-spec-title--light">
                  {isArabic ? "لمن يناسب هذا النوع." : "Who This Is For"}
                </h2>
                <ul className="booth-detail-usecase-list">
                  {boothType.useCases.map((useCase) => (
                    <li key={useCase}>{useCase}</li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {boothType.advantages.length ? (
        <section className="booth-detail-advantages">
          <div className="site-container">
            <Reveal>
              <div className="booth-detail-section-head">
                <p className="eyebrow">{isArabic ? "ماذا نغطي" : "What we cover"}</p>
                <h2 className="booth-detail-section-title">
                  {isArabic ? "ماذا نغطي." : "What We Cover"}
                </h2>
              </div>
            </Reveal>

            <div className="booth-detail-advantages-grid">
              {boothType.advantages.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="booth-detail-advantage-card">
                    <span className="booth-detail-advantage-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {locations.length ? (
        <section className="booth-detail-locations">
          <div className="site-container">
            <Reveal>
              <div className="booth-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "متوفر في" : "Available in"}
                </p>
                <h2 className="booth-detail-section-title">
                  {isArabic
                    ? `${formatBoothTypeTitle(boothType.title)} عبر مواقعنا.`
                    : `${formatBoothTypeTitle(boothType.title)} across our locations.`}
                </h2>
              </div>
            </Reveal>
            <ul className="booth-detail-locations-list">
              {locations.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={localizePath(
                      `/locations/${item.slug}/booth-types/${boothType.slug}`,
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
        <section className="booth-detail-related">
          <div className="site-container">
            <Reveal>
              <div className="booth-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "أنواع أخرى" : "Other booth types"}
                </p>
                <h2 className="booth-detail-section-title">
                  {isArabic
                    ? "استكشف تنسيقات أخرى."
                    : "Explore other formats."}
                </h2>
              </div>
            </Reveal>

            <div className="booth-detail-related-grid">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <Link
                    href={localizePath(`/booth-types/${item.slug}`, locale)}
                    className="booth-detail-related-card"
                  >
                    {item.image ? (
                      <div className="booth-detail-related-media">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 767px) 100vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="booth-detail-related-copy">
                      <h3>{formatBoothTypeTitle(item.title)}</h3>
                      <p>{item.excerpt}</p>
                      <span>
                        {isArabic ? "عرض النوع" : "View type"}
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
