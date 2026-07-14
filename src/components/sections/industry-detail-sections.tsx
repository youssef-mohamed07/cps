import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { localizePath, type Locale } from "@/lib/i18n";
import { locationBoothTypePath } from "@/lib/locations";

export type IndustryDetailItem = {
  slug: string;
  title: string;
  excerpt: string;
  overview: string;
  image?: string;
  imageAlt?: string;
  challenges: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
};

export type IndustryBoothTypeItem = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
};

export type IndustryProjectItem = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  category: string;
  image: string;
  imageAlt: string;
};

type IndustryDetailSectionsProps = {
  locale: Locale;
  industry: IndustryDetailItem;
  recommended: IndustryBoothTypeItem[];
  projects: IndustryProjectItem[];
  otherIndustries: IndustryDetailItem[];
  briefHref: string;
  ctaLabel: string;
};

export function IndustryDetailSections({
  locale,
  industry,
  recommended,
  projects,
  otherIndustries,
  briefHref,
  ctaLabel,
}: IndustryDetailSectionsProps) {
  const isArabic = locale === "ar";
  const workFilterHref = localizePath(
    `/work?industry=${industry.slug}`,
    locale,
  );

  return (
    <>
      <section className="industry-detail-overview">
        <div className="site-container industry-detail-overview-grid">
          <Reveal className="industry-detail-overview-copy">
            <p className="eyebrow">
              {isArabic ? "نظرة عامة" : "Overview"}
            </p>
            <h2 className="industry-detail-overview-title">
              {isArabic
                ? `أجنحة مصممة لقطاع ${industry.title}.`
                : `Booths shaped for ${industry.title}.`}
            </h2>
            <p className="industry-detail-overview-body">
              {industry.overview}
            </p>
            <Link href={briefHref} className="industry-detail-overview-cta">
              <span>{ctaLabel}</span>
              <CtaArrow size="md" />
            </Link>
          </Reveal>

          {industry.image ? (
            <Reveal delay={0.08} className="industry-detail-overview-media">
              <Image
                src={industry.image}
                alt={industry.imageAlt ?? industry.title}
                fill
                sizes="(max-width: 899px) 100vw, 50vw"
                className="object-cover"
              />
            </Reveal>
          ) : null}
        </div>
      </section>

      {(industry.challenges.length || industry.solutions.length) ? (
        <section className="industry-detail-pair">
          <div className="site-container industry-detail-pair-grid">
            {industry.challenges.length ? (
              <Reveal className="industry-detail-pair-block industry-detail-pair-block--dark">
                <p className="eyebrow eyebrow-on-dark">
                  {isArabic ? "التحديات" : "Challenges"}
                </p>
                <h2 className="industry-detail-pair-title industry-detail-pair-title--light">
                  {isArabic
                    ? "ما يواجهه هذا القطاع على أرض المعرض."
                    : "What this sector faces on the show floor."}
                </h2>
                <ul className="industry-detail-challenge-list">
                  {industry.challenges.map((item) => (
                    <li key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            {industry.solutions.length ? (
              <Reveal
                delay={0.08}
                className="industry-detail-pair-block industry-detail-pair-block--light"
              >
                <p className="eyebrow">
                  {isArabic ? "حلولنا" : "Solutions"}
                </p>
                <h2 className="industry-detail-pair-title">
                  {isArabic
                    ? "كيف نصمم لهذه الضغوط."
                    : "How we design for those pressures."}
                </h2>
                <ul className="industry-detail-solution-list">
                  {industry.solutions.map((item, index) => (
                    <li key={item.title}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      {recommended.length ? (
        <section className="industry-detail-booths">
          <div className="site-container">
            <Reveal>
              <div className="industry-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "أنواع الأجنحة المقترحة" : "Recommended booth types"}
                </p>
                <h2 className="industry-detail-section-title">
                  {isArabic
                    ? "تنسيقات تناسب هذا القطاع."
                    : "Formats that fit this sector."}
                </h2>
              </div>
            </Reveal>

            <div className="industry-detail-booths-grid">
              {recommended.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <Link
                    href={localizePath(locationBoothTypePath(item.slug), locale)}
                    className="industry-detail-booth-card group"
                  >
                    {item.image ? (
                      <div className="industry-detail-booth-media">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 767px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                    ) : null}
                    <div className="industry-detail-booth-copy">
                      <h3>{item.title}</h3>
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

      <section className="industry-detail-projects">
        <div className="site-container">
          <Reveal>
            <div className="industry-detail-section-head industry-detail-section-head--split">
              <div>
                <p className="eyebrow">
                  {isArabic ? "أعمال ذات صلة" : "Related work"}
                </p>
                <h2 className="industry-detail-section-title">
                  {isArabic
                    ? `مشاريع في ${industry.title}.`
                    : `Projects in ${industry.title}.`}
                </h2>
              </div>
              <Link href={workFilterHref} className="industry-detail-work-link">
                <span>
                  {isArabic ? "عرض كل المشاريع" : "View all projects"}
                </span>
                <CtaArrow size="sm" />
              </Link>
            </div>
          </Reveal>

          {projects.length ? (
            <div className="industry-detail-projects-grid">
              {projects.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <Link
                    href={localizePath(`/work/${item.slug}`, locale)}
                    className="work-card group"
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
            <p className="industry-detail-projects-empty">
              {isArabic
                ? "مشاريع جديدة قريباً — تواصل معنا لتخطيط جناح قطاعك."
                : "New projects coming soon — contact us to plan your sector booth."}
            </p>
          )}
        </div>
      </section>

      {otherIndustries.length ? (
        <section className="industry-detail-other">
          <div className="site-container">
            <Reveal>
              <div className="industry-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "قطاعات أخرى" : "Other sectors"}
                </p>
                <h2 className="industry-detail-section-title">
                  {isArabic
                    ? "استكشف خبرة قطاعات أخرى."
                    : "Explore other sector expertise."}
                </h2>
              </div>
            </Reveal>

            <div className="industry-detail-other-grid">
              {otherIndustries.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.04}>
                  <Link
                    href={localizePath(`/industries/${item.slug}`, locale)}
                    className="industry-detail-other-card group"
                  >
                    {item.image ? (
                      <div className="industry-detail-other-media">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 700px) 100vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                    ) : null}
                    <div className="industry-detail-other-copy">
                      <h3>{item.title}</h3>
                      <p>{item.excerpt}</p>
                      <span>
                        {isArabic ? "استكشف" : "Explore"}
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
