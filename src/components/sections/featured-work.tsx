import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/content/dictionaries.local";
import { localizePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";

type FeaturedWorkProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  viewAll: string;
  items: WorkItem[];
};

export function FeaturedWork({
  locale,
  eyebrow,
  title,
  viewAll,
  items,
}: FeaturedWorkProps) {
  const featured = items.slice(0, 3);

  return (
    <section id="work" className="work-section scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="work-section-head">
            <div className="section-head">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="display">{title}</h2>
            </div>
            <Link
              href={localizePath("/work", locale)}
              className="btn-secondary shrink-0 inline-flex items-center gap-2"
            >
              {viewAll}
              <CtaArrow size="md" />
            </Link>
          </div>

          <div className="work-stack">
            {featured.map((item, index) => (
              <Link
                key={item.slug}
                href={localizePath(`/work/${item.slug}`, locale)}
                className={`work-feature group ${index === 0 ? "work-feature-lead" : ""}`}
              >
                <div className="work-feature-media">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes={
                      index === 0
                        ? "100vw"
                        : "(max-width: 900px) 100vw, 50vw"
                    }
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="work-feature-shade" aria-hidden="true" />
                </div>
                <div className="work-feature-meta">
                  <div>
                    <span className="work-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="work-card-title">{item.title}</h3>
                    <p className="work-card-cat">{item.category}</p>
                  </div>
                  <div className="work-card-side">
                    <span className="work-card-year">{item.year}</span>
                    <CtaArrow size="md" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
