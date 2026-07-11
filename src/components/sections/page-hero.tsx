import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { HeroCityRotator } from "@/components/motion/hero-city-rotator";
import { CtaArrow } from "@/components/motion/cta-arrow";
import type { Locale } from "@/lib/i18n";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  image?: string;
  imageAlt?: string;
  meta?: string;
  locale?: Locale;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  animated?: boolean;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt = "",
  meta,
  locale,
  cta,
  secondaryCta,
  animated = false,
  className,
}: PageHeroProps) {
  const hasCity = Boolean(locale && title.includes("{City}"));
  const showActions = Boolean(cta || secondaryCta);

  return (
    <section
      className={`page-hero${image ? " page-hero--media" : ""}${animated ? " page-hero--animated" : ""}${className ? ` ${className}` : ""}`}
    >
      {image ? (
        <div className="page-hero-media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="page-hero-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="page-hero-overlay" aria-hidden="true" />

      <div className="site-container page-hero-inner">
        <Reveal y={28} amount={0.05}>
          <div className="page-hero-copy">
            {eyebrow ? (
              <p className="eyebrow page-hero-anim" data-anim="1">
                {eyebrow}
              </p>
            ) : null}

            {hasCity && locale ? (
              <HeroCityRotator
                locale={locale}
                template={title}
                as="h1"
                className="page-hero-title page-hero-title--claim page-hero-anim"
                cityClassName="page-hero-city"
              />
            ) : (
              <h1 className="page-hero-title page-hero-anim" data-anim="2">
                {title}
              </h1>
            )}

            <p className="page-hero-lead page-hero-anim" data-anim="3">
              {lead}
            </p>

            {meta ? (
              <p className="page-hero-meta page-hero-anim" data-anim="4">
                {meta}
              </p>
            ) : null}

            {showActions ? (
              <div className="page-hero-actions page-hero-anim" data-anim="5">
                {cta ? (
                  <Link href={cta.href} className="page-hero-cta page-hero-cta--primary">
                    <span>{cta.label}</span>
                    <CtaArrow size="md" />
                  </Link>
                ) : null}
                {secondaryCta ? (
                  <Link href={secondaryCta.href} className="page-hero-cta page-hero-cta--ghost">
                    <span>{secondaryCta.label}</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
