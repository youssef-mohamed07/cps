import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import type { Dictionary } from "@/content/dictionaries.local";
import { media } from "@/content/media";
import type { Locale } from "@/lib/i18n";

type AboutPageSectionsProps = {
  locale: Locale;
  page: Dictionary["aboutPage"];
  process: Dictionary["process"];
};

export function AboutPageSections({
  locale,
  page,
  process,
}: AboutPageSectionsProps) {
  const isArabic = locale === "ar";
  const capabilities = isArabic
    ? ["استراتيجية واضحة", "تنفيذ داخلي", "فهم إقليمي"]
    : ["Clear strategy", "In-house delivery", "Regional instinct"];

  return (
    <>
      <section id="mission" className="about-story scroll-mt-24">
        <div className="site-container">
          <div className="about-story-grid">
            <Reveal className="about-story-copy">
              <p className="eyebrow">{page.storyTitle}</p>
              <h2 className="about-story-title">
                {isArabic
                  ? "من ممارسة صغيرة إلى استوديو إنتاج كامل."
                  : "From a small practice to a full production studio."}
              </h2>
              <p className="about-story-body">{page.story}</p>
            </Reveal>

            <Reveal delay={0.08} className="about-story-visual">
              <Image
                src={media.about.mission}
                alt={
                  isArabic
                    ? "فريق CPS يعمل معاً في مساحة إبداعية"
                    : "CPS team collaborating in a creative workspace"
                }
                fill
                sizes="(max-width: 899px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="about-story-caption">
                <p>
                  {isArabic
                    ? "فكرة واحدة. فريق واحد. تنفيذ بلا فجوات."
                    : "One idea. One team. No gaps in delivery."}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="why-us" className="about-values scroll-mt-24">
        <div className="site-container">
          <Reveal>
            <div className="about-values-head">
              <p className="eyebrow eyebrow-on-dark">{page.valuesTitle}</p>
              <h2 className="about-values-title">
                {isArabic
                  ? "مبادئ واضحة تقود كل مشروع."
                  : "Clear principles behind every build."}
              </h2>
            </div>
          </Reveal>

          <div className="about-values-grid">
            {page.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08}>
                <article className="about-value-card">
                  <span className="about-value-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline
        id="process"
        className="scroll-mt-24"
        eyebrow={process.eyebrow}
        title={process.title}
        support={process.support}
        steps={process.steps}
      />

      <section id="team" className="about-studio scroll-mt-24">
        <div className="site-container about-studio-grid">
          <Reveal className="about-studio-media">
            <Image
              src={media.about.studio}
              alt={
                isArabic
                  ? "مساحة استوديو CPS الحديثة"
                  : "The modern CPS studio"
              }
              fill
              sizes="(max-width: 899px) 100vw, 65vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.1} className="about-studio-card">
            <p className="eyebrow eyebrow-on-dark">{page.studioTitle}</p>
            <h2>
              {isArabic
                ? "نُبقي الجميع في اتجاه واحد."
                : "Keeping every team moving in one direction."}
            </h2>
            <p className="about-studio-body">{page.studioBody}</p>

            <div className="about-studio-capabilities">
              {capabilities.map((capability) => (
                <span key={capability}>{capability}</span>
              ))}
            </div>

            <div className="about-quality">
              <span>{isArabic ? "الجودة والاعتماد" : "Quality & standards"}</span>
              <p>
                {isArabic
                  ? "معايير إنتاج وتركيب دقيقة تحمي الجودة والجداول من الورشة إلى الموقع."
                  : "Disciplined production and installation standards protect quality and schedules from workshop to venue."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
