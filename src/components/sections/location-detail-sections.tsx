import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { localizePath, type Locale } from "@/lib/i18n";

export type LocationDetailItem = {
  slug: string;
  title: string;
  excerpt: string;
  localExperience: string;
  countryCode: string;
  image?: string;
  imageAlt?: string;
  capabilities: { title: string; description: string }[];
};

export type LocationProjectItem = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  category: string;
  image: string;
  imageAlt: string;
};

type LocationLinkItem = {
  slug: string;
  title: string;
};

type LocationDetailSectionsProps = {
  locale: Locale;
  location: LocationDetailItem;
  projects: LocationProjectItem[];
  otherLocations: LocationDetailItem[];
  services: LocationLinkItem[];
  boothTypes: LocationLinkItem[];
  briefHref: string;
  ctaLabel: string;
};

export function LocationDetailSections({
  locale,
  location,
  projects,
  otherLocations,
  services,
  boothTypes,
  briefHref,
  ctaLabel,
}: LocationDetailSectionsProps) {
  const isArabic = locale === "ar";
  const workFilterHref = localizePath(
    `/work?country=${location.slug}`,
    locale,
  );

  return (
    <>
      <section className="location-detail-overview">
        <div className="site-container location-detail-overview-grid">
          <Reveal className="location-detail-overview-copy">
            <p className="eyebrow">
              {isArabic ? "تجربتنا المحلية" : "Local experience"}
            </p>
            <h2 className="location-detail-overview-title">
              {isArabic
                ? `تنفيذ أجنحة في ${location.title}.`
                : `Booth delivery in ${location.title}.`}
            </h2>
            <p className="location-detail-overview-body">
              {location.localExperience}
            </p>
            <Link href={briefHref} className="location-detail-overview-cta">
              <span>{ctaLabel}</span>
              <CtaArrow size="md" />
            </Link>
          </Reveal>

          {location.image ? (
            <Reveal delay={0.08} className="location-detail-overview-media">
              <Image
                src={location.image}
                alt={location.imageAlt ?? location.title}
                fill
                sizes="(max-width: 899px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="location-detail-flag" aria-hidden="true">
                {location.countryCode}
              </span>
            </Reveal>
          ) : null}
        </div>
      </section>

      {location.capabilities.length ? (
        <section className="location-detail-capabilities">
          <div className="site-container">
            <Reveal>
              <div className="location-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "ما نقدمه" : "What we deliver"}
                </p>
                <h2 className="location-detail-section-title">
                  {isArabic
                    ? "دعم محلي بمعايير CPS."
                    : "Local support. One CPS standard."}
                </h2>
              </div>
            </Reveal>

            <div className="location-detail-capabilities-grid">
              {location.capabilities.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="location-detail-capability-card">
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

      <section className="location-detail-projects">
        <div className="site-container">
          <Reveal>
            <div className="location-detail-section-head location-detail-section-head--split">
              <div>
                <p className="eyebrow">
                  {isArabic ? "أعمالنا هنا" : "Work here"}
                </p>
                <h2 className="location-detail-section-title">
                  {isArabic
                    ? `مشاريع في ${location.title}.`
                    : `Projects in ${location.title}.`}
                </h2>
              </div>
              <Link href={workFilterHref} className="location-detail-work-link">
                <span>
                  {isArabic ? "عرض كل المشاريع" : "View all projects"}
                </span>
                <CtaArrow size="sm" />
              </Link>
            </div>
          </Reveal>

          {projects.length ? (
            <div className="location-detail-projects-grid">
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
            <p className="location-detail-projects-empty">
              {isArabic
                ? "مشاريع جديدة قريباً — تواصل معنا لتخطيط معرضك."
                : "New projects coming soon — contact us to plan your show."}
            </p>
          )}
        </div>
      </section>

      {(services.length || boothTypes.length) ? (
        <section className="location-detail-programmatic">
          <div className="site-container">
            <Reveal>
              <div className="location-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "حلول محلية" : "Local solutions"}
                </p>
                <h2 className="location-detail-section-title">
                  {isArabic
                    ? `خدمات وأنواع أجنحة في ${location.title}.`
                    : `Services and booth types in ${location.title}.`}
                </h2>
              </div>
            </Reveal>

            <div className="location-detail-programmatic-grid">
              {services.length ? (
                <div className="location-detail-programmatic-block">
                  <p className="location-detail-programmatic-label">
                    {isArabic ? "الخدمات" : "Services"}
                  </p>
                  <ul>
                    {services.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={localizePath(
                            `/locations/${location.slug}/services/${item.slug}`,
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
              ) : null}

              {boothTypes.length ? (
                <div className="location-detail-programmatic-block">
                  <p className="location-detail-programmatic-label">
                    {isArabic ? "أنواع الأجنحة" : "Booth types"}
                  </p>
                  <ul>
                    {boothTypes.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={localizePath(
                            `/locations/${location.slug}/booth-types/${item.slug}`,
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
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {otherLocations.length ? (
        <section className="location-detail-other">
          <div className="site-container">
            <Reveal>
              <div className="location-detail-section-head">
                <p className="eyebrow">
                  {isArabic ? "تغطية إقليمية" : "Regional coverage"}
                </p>
                <h2 className="location-detail-section-title">
                  {isArabic ? "مواقع أخرى." : "Other locations."}
                </h2>
              </div>
            </Reveal>

            <div className="location-detail-other-grid">
              {otherLocations.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.04}>
                  <Link
                    href={localizePath(`/locations/${item.slug}`, locale)}
                    className="location-detail-other-card group"
                  >
                    {item.image ? (
                      <div className="location-detail-other-media">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ?? item.title}
                          fill
                          sizes="(max-width: 700px) 100vw, 20vw"
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                      </div>
                    ) : null}
                    <div className="location-detail-other-copy">
                      <p className="location-detail-other-code">
                        {item.countryCode}
                      </p>
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
