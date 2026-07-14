import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/content/dictionaries.local";
import { media } from "@/content/media";
import { localizePath, type Locale } from "@/lib/i18n";

type AboutPageSectionsProps = {
  locale: Locale;
  page: Dictionary["aboutPage"];
};

export function AboutPageSections({ locale, page }: AboutPageSectionsProps) {
  const isArabic = locale === "ar";

  return (
    <>
      <section id="mission" className="about-story scroll-mt-24">
        <div className="site-container about-story-stage">
          <Reveal delay={0.06} className="about-story-visual-wrap">
            <div className="about-story-visual">
              <Image
                src={media.about.studio}
                alt={
                  isArabic
                    ? "ورشة تصنيع CPS أثناء العمل"
                    : "CPS fabrication workshop in action"
                }
                fill
                sizes="(max-width: 899px) 100vw, 70vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="about-story-panel">
            <p className="eyebrow eyebrow-on-dark">{page.storyTitle}</p>
            <h2 className="about-story-title">{page.storyHeadline}</h2>
            <p className="about-story-body">{page.story}</p>
            <p className="about-story-body about-story-body--second">
              {page.storySecond}
            </p>
            <p className="about-story-mark">
              {isArabic
                ? "فريق واحد. دورة حياة كاملة. بلا فجوات."
                : "One team. Full lifecycle. No handoff gaps."}
            </p>
          </Reveal>
        </div>
      </section>

      <section id="industries" className="about-industries scroll-mt-24">
        <div className="site-container about-industries-grid">
          <Reveal className="about-industries-copy">
            <p className="eyebrow">{isArabic ? "القطاعات" : "Industries"}</p>
            <h2 className="about-industries-title">{page.industriesTitle}</h2>
            <p className="about-industries-support">
              {isArabic
                ? "نبني حضور المعارض عبر قطاعات متعددة — من البنوك والطاقة إلى التقنية والعقارات."
                : "We build exhibition presence across sectors — from banking and energy to tech and real estate."}
            </p>
            <Link href={localizePath("/industries", locale)} className="about-industries-link">
              {isArabic ? "استكشف كل القطاعات" : "Explore all industries"}
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="about-industries-panel">
            <div className="about-industries-logo-grid">
              {page.industriesItems.map((item, index) => (
                <article key={item} className="about-industries-logo-cell">
                  <span className="about-industries-cell-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="about-industries-cell-label">{item}</span>
                </article>
              ))}
              <Link
                href={localizePath("/industries", locale)}
                className="about-industries-logo-cell about-industries-logo-cell--more"
              >
                <span className="about-industries-cell-index">+</span>
                <span className="about-industries-cell-label">{page.industriesMore}</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="why-us" className="about-values scroll-mt-24">
        <div className="site-container">
          <Reveal>
            <div className="about-values-head">
              <p className="eyebrow eyebrow-on-dark">
                {isArabic ? "المبادئ" : "Principles"}
              </p>
              <h2 className="about-values-title">{page.valuesTitle}</h2>
              <p className="about-values-support">{page.valuesSupport}</p>
            </div>
          </Reveal>

          <div className="about-values-grid about-values-grid--four">
            {page.values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06}>
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

      <section id="workshop" className="about-workshop scroll-mt-24">
        <div className="site-container">
          <Reveal>
            <div className="about-workshop-head">
              <p className="eyebrow">{isArabic ? "الورشة" : "Workshop"}</p>
              <h2 className="about-workshop-title">{page.studioTitle}</h2>
              <p className="about-workshop-support">{page.studioSupport}</p>
            </div>
          </Reveal>

          <div className="about-workshop-layout">
            <Reveal delay={0.06}>
              <div className="about-workshop-media">
                <Image
                  src={media.about.studio}
                  alt={
                    isArabic
                      ? "ورشة تصنيع CPS"
                      : "CPS fabrication workshop"
                  }
                  fill
                  sizes="(max-width: 899px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="about-workshop-list">
              {page.studioItems.map((item, index) => (
                <Reveal key={item.title} delay={0.08 + index * 0.05}>
                  <article className="about-workshop-item">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
