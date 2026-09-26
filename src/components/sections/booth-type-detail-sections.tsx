import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { BoothTypeCompareSection } from "@/components/sections/booth-type-compare-section";
import { ProjectGalleryMarquee } from "@/components/sections/project-gallery-marquee";
import type { BoothComparisonRow } from "@/content/booth-comparison";
import type { BoothTypeFeature } from "@/content/catalog";
import { formatBoothTypeTitle } from "@/content/catalog";
import { localizePath, type Locale } from "@/lib/i18n";
import {
  DEFAULT_LOCATION_SLUG,
  locationBoothTypePath,
} from "@/lib/locations";

export type BoothTypeDetailItem = {
  slug: string;
  title: string;
  excerpt: string;
  overviewTitle: string;
  description: string;
  image?: string;
  imageAlt?: string;
  model3d?: string;
  gallery: { src: string; alt: string }[];
  features: BoothTypeFeature[];
  advantages: { title: string; description: string }[];
  useCases: string[];
};

export type BoothTypeCaseStudyItem = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  category: string;
  image: string;
  imageAlt: string;
};

type BoothTypeDetailSectionsProps = {
  locale: Locale;
  boothType: BoothTypeDetailItem;
  related: BoothTypeDetailItem[];
  caseStudies: BoothTypeCaseStudyItem[];
  comparisonRows?: BoothComparisonRow[];
  locationSlug?: string;
  briefHref: string;
  ctaLabel: string;
};

export function BoothTypeDetailSections({
  locale,
  boothType,
  related,
  caseStudies,
  comparisonRows,
  locationSlug = DEFAULT_LOCATION_SLUG,
  briefHref,
  ctaLabel,
}: BoothTypeDetailSectionsProps) {
  const isArabic = locale === "ar";
  const workFilterHref = localizePath(
    `/our-work?boothType=${encodeURIComponent(boothType.slug)}`,
    locale,
  );
  const boothLabel = formatBoothTypeTitle(boothType.title);
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

      <BoothTypeCompareSection
        locale={locale}
        activeSlug={boothType.slug}
        locationSlug={locationSlug}
        rows={comparisonRows}
      />

      {boothType.advantages.length || boothType.useCases.length ? (
        <section className="booth-detail-spec">
          <div className="site-container booth-detail-spec-grid">
            {boothType.advantages.length ? (
              <Reveal className="booth-detail-spec-block">
                <p className="eyebrow">{isArabic ? "نطاق العمل" : "What we cover"}</p>
                <h2 className="booth-detail-spec-title">
                  {isArabic ? "ما يشمله التنفيذ" : "What We Cover"}
                </h2>
                <div className="booth-detail-cover-list">
                  {boothType.advantages.map((item, index) => (
                    <article className="booth-detail-cover-item" key={item.title}>
                      <span className="booth-detail-cover-index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="booth-detail-cover-copy">
                        <h3>{item.title}</h3>
                        {item.description ? <p>{item.description}</p> : null}
                      </div>
                    </article>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {boothType.useCases.length ? (
              <Reveal delay={0.08} className="booth-detail-spec-block booth-detail-spec-block--usecases">
                <p className="eyebrow eyebrow-on-dark">
                  {isArabic ? "لمن يناسب" : "Who this is for"}
                </p>
                <h2 className="booth-detail-spec-title booth-detail-spec-title--light">
                  {isArabic ? "لمن يناسب هذا الجناح؟" : "Who This Is For"}
                </h2>
                <div className="booth-detail-usecase-list">
                  {boothType.useCases.map((useCase, index) => (
                    <article className="booth-detail-usecase-item" key={useCase}>
                      <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <p>{useCase}</p>
                    </article>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {boothType.gallery.length ? (
        <section className="project-detail-gallery">
          <div className="site-container">
            <Reveal>
              <div className="project-detail-gallery-head">
                <p className="eyebrow">{isArabic ? "معرض الصور" : "Gallery"}</p>
                <h2 className="project-detail-gallery-title">
                  {isArabic ? "الجناح عن قرب" : "See the booth in detail."}
                </h2>
              </div>
            </Reveal>
          </div>
          <ProjectGalleryMarquee
            images={boothType.gallery.map((item) => item.src)}
            title={boothLabel}
          />
        </section>
      ) : null}

      <section className="booth-detail-cases">
        <div className="site-container">
          <Reveal>
            <div className="booth-detail-section-head booth-detail-section-head--split">
              <div>
                <p className="eyebrow">
                  {isArabic ? "دراسات حالة" : "Case studies"}
                </p>
                <h2 className="booth-detail-section-title">
                  {isArabic
                    ? `${boothLabel} في مشاريع نفّذناها.`
                    : `${boothLabel} in the field.`}
                </h2>
              </div>
              <Link href={workFilterHref} className="booth-detail-work-link">
                <span>
                  {isArabic ? "شاهد أعمالنا" : "View Our Work"}
                </span>
                <CtaArrow size="sm" />
              </Link>
            </div>
          </Reveal>

          {caseStudies.length ? (
            <div className="booth-detail-cases-grid">
              {caseStudies.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.06}>
                  <Link
                    href={localizePath(`/our-work/${item.slug}`, locale)}
                    className="work-card group booth-detail-case-card"
                  >
                    <div className="work-card-media">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <span className="work-card-tag">{item.category}</span>
                    </div>
                    <div className="work-card-copy">
                      <p className="work-card-meta">{item.year}</p>
                      <h3 className="work-card-title">{item.title}</h3>
                      <p className="work-card-summary">{item.summary}</p>
                      <span className="work-card-cta">
                        {isArabic ? "عرض المشروع" : "View project"}
                        <CtaArrow size="sm" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="booth-detail-cases-empty">
              {isArabic
                ? "نضيف مشاريع جديدة قريباً — تواصل معنا لنخطّط لجناحك."
                : "New work coming soon — contact us to plan your booth."}
            </p>
          )}
        </div>
      </section>

      {related.length ? (
        <section className="booth-detail-related">
          <div className="site-container">
            <Reveal>
              <div className="booth-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "أنواع أجنحة أخرى" : "Other booth types"}
                </p>
                <h2 className="booth-detail-section-title">
                  {isArabic
                    ? "خيارات أخرى تناسب مساحتك."
                    : "Explore other formats."}
                </h2>
              </div>
            </Reveal>

            <div className="booth-detail-related-grid">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <Link
                    href={localizePath(
                      locationBoothTypePath(item.slug, locationSlug),
                      locale,
                    )}
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
                        {isArabic ? "عرض نوع الجناح" : "View type"}
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
