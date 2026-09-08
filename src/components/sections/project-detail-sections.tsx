import Image from "next/image";
import Link from "next/link";
import { ProjectGalleryMarquee } from "@/components/sections/project-gallery-marquee";
import { ProjectMotionSection } from "@/components/sections/project-motion-section";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { localizePath, type Locale } from "@/lib/i18n";

export type ProjectDetailItem = {
  slug: string;
  title: string;
  summary: string;
  scopeOfWork: string;
  category: string;
  year: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  imageAlt: string;
  gallery: string[];
  motionVideo?: string;
  event?: string;
  size?: string;
  technologies?: string[];
  industryLabel?: string;
  boothTypeLabel?: string;
  locationLabel?: string;
  serviceLabel?: string;
  clientName?: string;
};

type ProjectPageLabels = {
  challenge: string;
  approach: string;
  outcome: string;
  gallery: string;
  next: string;
  back: string;
};

type ProjectDetailSectionsProps = {
  locale: Locale;
  project: ProjectDetailItem;
  labels: ProjectPageLabels;
  relatedProjects?: ProjectDetailItem[];
};

function uniqueImages(images: string[]) {
  const seen = new Set<string>();
  return images.filter((src) => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}

export function ProjectDetailSections({
  locale,
  project,
  labels,
  relatedProjects = [],
}: ProjectDetailSectionsProps) {
  const isArabic = locale === "ar";

  const facts = [
    {
      label: isArabic ? "العميل / القطاع" : "Client / Sector",
      value: [project.clientName, project.industryLabel || project.category]
        .filter(Boolean)
        .join(" / "),
    },
    project.boothTypeLabel || project.serviceLabel
      ? {
          label: isArabic ? "نوع المشروع" : "Project Type",
          value: project.boothTypeLabel || project.serviceLabel || "",
        }
      : null,
    project.locationLabel
      ? {
          label: isArabic ? "الموقع" : "Location",
          value: project.locationLabel,
        }
      : null,
    project.scopeOfWork
      ? { label: isArabic ? "نطاق العمل" : "Scope of Work", value: project.scopeOfWork }
      : null,
    project.serviceLabel
      ? {
          label: isArabic ? "الخدمات المقدمة" : "Services Provided",
          value: project.serviceLabel,
        }
      : null,
    project.event
      ? { label: isArabic ? "الحدث" : "Event", value: project.event }
      : null,
    project.size
      ? { label: isArabic ? "المساحة" : "Size", value: project.size }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const story = [
    { key: "challenge", label: labels.challenge, body: project.challenge },
    { key: "approach", label: labels.approach, body: project.solution },
    { key: "outcome", label: labels.outcome, body: project.result },
  ].filter((item) => item.body);

  const gallery = uniqueImages([project.image, ...project.gallery]);

  return (
    <>
      {(facts.length || project.technologies?.length) ? (
        <section className="project-detail-facts">
          <div className="site-container project-detail-facts-shell">
            {facts.length ? (
              <Reveal>
                <dl className="project-detail-facts-list">
                  {facts.map((fact) => (
                    <div key={fact.label} className="project-detail-fact">
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            {project.technologies?.length ? (
              <Reveal delay={0.06}>
                <div className="project-detail-tech-inline">
                  <p className="project-detail-tech-label">
                    {isArabic ? "عناصر الإنتاج الرئيسية" : "Key Production Elements"}
                  </p>
                  <ul className="project-detail-tech-list">
                    {project.technologies.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      <ProjectMotionSection
        title={project.title}
        poster={project.image}
        images={project.gallery}
        videoSrc={project.motionVideo}
        eyebrow={isArabic ? "موشن" : "Motion"}
        heading={isArabic ? "شاهد المشروع يتحرّك." : "See the project in motion."}
        support={
          isArabic
            ? "لقطة من التنفيذ والموقع النهائي."
            : "A cinematic cut from fabrication through final install."
        }
      />

      {story.length ? (
        <section className="project-detail-story">
          <div className="site-container">
            <Reveal>
              <div className="project-detail-story-head">
                <p className="eyebrow">{isArabic ? "القصة" : "The story"}</p>
                <h2 className="project-detail-story-title">
                  {isArabic
                    ? "من التحدي إلى النتيجة."
                    : "From challenge to outcome."}
                </h2>
                <p className="project-detail-story-lead">{project.summary}</p>
              </div>
            </Reveal>

            <div className="project-detail-story-blocks">
              {story.map((item, index) => (
                <Reveal
                  key={item.key}
                  delay={0.12 + index * 0.1}
                  className="project-detail-story-reveal"
                >
                  <article className="project-detail-story-block">
                    <span className="project-detail-story-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{item.label}</h3>
                    <p>{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="project-detail-gallery">
          <div className="site-container">
            <Reveal>
              <div className="project-detail-gallery-head">
                <p className="eyebrow">{labels.gallery}</p>
                <h2 className="project-detail-gallery-title">
                  {isArabic ? "معرض المشروع." : "Project gallery."}
                </h2>
                <p className="project-detail-gallery-count">
                  {gallery.length}{" "}
                  {isArabic
                    ? "صورة"
                    : gallery.length === 1
                      ? "frame"
                      : "frames"}
                </p>
              </div>
            </Reveal>
          </div>

          <ProjectGalleryMarquee images={gallery} title={project.title} />
        </section>
      ) : null}

      {relatedProjects.length ? (
        <section className="project-detail-related">
          <div className="site-container">
            <Reveal>
              <div className="project-detail-related-head">
                <p className="eyebrow">{isArabic ? "المزيد" : "More work"}</p>
                <h2 className="project-detail-related-title">
                  {isArabic ? "مشاريع أخرى." : "More projects."}
                </h2>
                <Link
                  href={localizePath("/work", locale)}
                  className="project-detail-related-all"
                >
                  <span>{labels.back}</span>
                  <CtaArrow size="sm" />
                </Link>
              </div>
            </Reveal>

            <div className="project-detail-related-grid">
              {relatedProjects.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <Link
                    href={localizePath(`/work/${item.slug}`, locale)}
                    className="project-detail-related-card"
                  >
                    <div className="project-detail-related-media">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="project-detail-related-copy">
                      <p>
                        {item.category} · {item.year}
                      </p>
                      <h3>{item.title}</h3>
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
