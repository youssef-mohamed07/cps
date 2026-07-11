"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries.local";
import { localizePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";

type ServicesSectionProps = {
  locale: Locale;
  content: Dictionary["services"];
};

export function ServicesSection({ locale, content }: ServicesSectionProps) {
  const [active, setActive] = useState(0);
  const exploreLabel = locale === "ar" ? "استكشف الخدمة" : "Explore service";

  return (
    <section id="services" className="section-pad section-rule scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="display">{content.title}</h2>
            <p className="lede">{content.support}</p>
          </div>
        </Reveal>

        <div
          className="service-expand-list"
          onMouseLeave={() => setActive(0)}
        >
          {content.items.map((item, index) => {
            const href = item.slug
              ? localizePath(`/services/${item.slug}`, locale)
              : localizePath("/services", locale);
            const isActive = active === index;

            return (
              <article
                key={item.title}
                className={`service-expand${isActive ? " is-active" : ""}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <div className="service-expand-copy">
                  <h3 className="service-expand-title">
                    <Link href={href} className="service-expand-title-link">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="service-expand-copy-text">{item.description}</p>
                  <Link
                    href={href}
                    className="service-expand-cta"
                    tabIndex={isActive ? 0 : -1}
                    aria-hidden={!isActive}
                  >
                    <span>{exploreLabel}</span>
                    <CtaArrow size="md" />
                  </Link>
                </div>

                {item.image ? (
                  <Link
                    href={href}
                    className="service-expand-media"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </Link>
                ) : null}
              </article>
            );
          })}
        </div>

        {content.cta ? (
          <Reveal>
            <div className="section-cta-row">
              <Link
                href={localizePath("/services", locale)}
                className="btn-secondary"
              >
                {content.cta}
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
