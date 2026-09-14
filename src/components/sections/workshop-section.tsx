import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { Dictionary } from "@/content/dictionaries.local";
import { media } from "@/content/media";
import type { Locale } from "@/lib/i18n";

type WorkshopSectionProps = {
  locale: Locale;
  page: Dictionary["aboutPage"];
  id?: string;
  className?: string;
};

export function WorkshopSection({
  locale,
  page,
  id = "workshop",
  className = "",
}: WorkshopSectionProps) {
  const isArabic = locale === "ar";

  return (
    <section
      id={id}
      className={`about-workshop scroll-mt-24${className ? ` ${className}` : ""}`}
    >
      <div className="site-container">
        <Reveal>
          <div className="about-workshop-head">
            <p className="eyebrow">{isArabic ? "الورشة" : "Workshop"}</p>
            <h2 className="display about-workshop-title">{page.studioTitle}</h2>
            <p className="about-workshop-support">{page.studioSupport}</p>
          </div>
        </Reveal>

        <div className="about-workshop-layout">
          <Reveal delay={0.06}>
            <div className="about-workshop-media">
              <Image
                src={page.studioImage || media.about.studio}
                alt={page.studioImageAlt || ""}
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
  );
}
