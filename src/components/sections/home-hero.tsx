import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { media } from "@/content/media";
import { localizePath, type Locale } from "@/lib/i18n";
import { HeroAmbient } from "@/components/motion/hero-ambient";
import { HeroCityRotator } from "@/components/motion/hero-city-rotator";
import { CtaArrow } from "@/components/motion/cta-arrow";

type HomeHeroProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

const LEFT = [
  media.boothTypes.custom,
  media.services.design,
  media.boothTypes.pavilion,
] as const;

const RIGHT = [
  media.boothTypes.modular,
  media.services.lightbox,
  media.boothTypes.outdoor,
] as const;

function HeroRail({
  images,
  side,
}: {
  images: readonly string[];
  side: "left" | "right";
}) {
  return (
    <div className={`hero-rail hero-rail-${side}`} aria-hidden="true">
      {images.map((src, i) => (
        <div key={src} className="hero-rail-tile" data-i={i}>
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 900px) 20vw, 12vw"
            className="hero-rail-image object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export function HomeHero({ locale, content }: HomeHeroProps) {
  return (
    <section className="home-hero">
      <Image
        src={media.homeHero}
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="home-hero-bg object-cover"
      />
      <div className="home-hero-overlay" aria-hidden="true" />
      <HeroAmbient />

      <div className="home-hero-stage">
        <HeroRail images={LEFT} side="left" />

        <div className="home-hero-copy">
          <Image
            src="/logo.png"
            alt={
              locale === "ar"
                ? "CPS — المبدعون المحترفون"
                : "CPS — Creatives Professionals"
            }
            width={380}
            height={135}
            className="home-hero-logo"
          />
          <HeroCityRotator locale={locale} template={content.badge} />
          <h1 className="home-hero-headline">{content.headline}</h1>
          <p className="home-hero-support">{content.support}</p>
          <div className="home-hero-actions">
            <Link href={localizePath("/contact", locale)} className="hero-cta">
              {content.primaryCta}
              <CtaArrow tone="navy" size="lg" />
            </Link>
            <Link href={localizePath("/work", locale)} className="hero-cta-ghost">
              {content.secondaryCta}
            </Link>
          </div>
        </div>

        <HeroRail images={RIGHT} side="right" />
      </div>
    </section>
  );
}
