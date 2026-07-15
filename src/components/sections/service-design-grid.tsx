"use client";

import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { localizePath, type Locale } from "@/lib/i18n";
import { locationServicePath } from "@/lib/locations";

export type ServiceDesignItem = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  serviceSlug?: string;
};

type ServiceDesignGridProps = {
  locale?: Locale;
  locationSlug?: string;
  eyebrow?: string;
  title: string;
  support?: string;
  cta?: { label: string; href: string };
  items: ServiceDesignItem[];
};

export function ServiceDesignGrid({
  locale = "en",
  locationSlug,
  eyebrow,
  title,
  support,
  cta,
  items,
}: ServiceDesignGridProps) {
  if (!items.length) return null;

  return (
    <section className="section-pad service-design-grid-section">
      <div className="site-container">
        <Reveal>
          <div className="service-design-grid-head">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2 className="display service-design-grid-title">{title}</h2>
            {support ? (
              <p className="lede service-design-grid-support">{support}</p>
            ) : null}
          </div>
        </Reveal>

        <div className="service-design-grid">
          {items.map((item, index) => {
            const href = item.serviceSlug
              ? localizePath(
                  locationServicePath(item.serviceSlug, locationSlug),
                  locale,
                )
              : undefined;

            const body = (
              <>
                <div className="service-design-card-media">
                  <Image
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="service-design-card-copy">
                  <span className="service-design-card-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="service-design-card-title">{item.title}</h3>
                  <p className="service-design-card-body">{item.description}</p>
                </div>
              </>
            );

            return (
              <Reveal
                key={item.title}
                delay={Math.min(index, 5) * 0.06}
                className="service-design-grid-item"
              >
                {href ? (
                  <Link href={href} className="service-design-card is-link">
                    {body}
                  </Link>
                ) : (
                  <article className="service-design-card">{body}</article>
                )}
              </Reveal>
            );
          })}
        </div>

        {cta ? (
          <Reveal>
            <div className="service-design-grid-cta">
              <Link
                href={localizePath(cta.href, locale)}
                className="btn-secondary"
              >
                <span>{cta.label}</span>
                <CtaArrow size="md" />
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
