import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";

export type CollectionGridItem = {
  href: string;
  title: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  meta?: string;
};

type CollectionGridProps = {
  items: CollectionGridItem[];
  columns?: 2 | 3 | 4;
  eyebrow?: string;
  title?: string;
  ctaLabel: string;
};

export function CollectionGrid({
  items,
  columns = 2,
  eyebrow,
  title,
  ctaLabel,
}: CollectionGridProps) {
  return (
    <section className="section-pad inner-collection">
      <div className="site-container">
        {eyebrow || title ? (
          <div className="inner-section-head">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="display">{title}</h2> : null}
          </div>
        ) : null}
        <div className={`collection-grid collection-grid--${columns}`}>
          {items.map((item, index) => (
            <Reveal key={item.href} delay={Math.min(index, 3) * 0.04}>
              <Link href={item.href} className="collection-card group">
                {item.image ? (
                  <div className="collection-card-media">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? ""}
                      fill
                      sizes={
                        columns === 3
                          ? "(max-width: 768px) 100vw, 33vw"
                          : "(max-width: 768px) 100vw, 50vw"
                      }
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="collection-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                ) : null}
                <div className="collection-card-copy">
                  {item.meta ? <p className="collection-card-meta">{item.meta}</p> : null}
                  <h2 className="collection-card-title">{item.title}</h2>
                  {item.excerpt ? (
                    <p className="collection-card-excerpt">{item.excerpt}</p>
                  ) : null}
                  <span className="collection-card-cta">
                    <span>{ctaLabel}</span>
                    <CtaArrow size="sm" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
