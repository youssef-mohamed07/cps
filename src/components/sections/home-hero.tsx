import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { media } from "@/content/media";
import { localizePath, type Locale } from "@/lib/i18n";
import { HeroCityRotator } from "@/components/motion/hero-city-rotator";
import { CtaArrow } from "@/components/motion/cta-arrow";

type HomeHeroProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

type HeroFloatingCardProps = {
  src: string;
  className: string;
};

/** Shared shell for the floating cards — each card below owns its position class. */
function HeroFloatingCard({ src, className }: HeroFloatingCardProps) {
  return (
    <div className={`hero-image ${className}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 639px) 72px, (max-width: 1280px) 12vw, 176px"
        className="hero-image-media object-cover"
        loading="lazy"
      />
    </div>
  );
}

function ImageOne() {
  return <HeroFloatingCard src={media.services.design} className="hero-image-1" />;
}

function ImageTwo() {
  return <HeroFloatingCard src={media.boothTypes.custom} className="hero-image-2" />;
}

function ImageThree() {
  return <HeroFloatingCard src={media.boothTypes.pavilion} className="hero-image-3" />;
}

function ImageFour() {
  return <HeroFloatingCard src={media.services.fabrication} className="hero-image-4" />;
}

function ImageFive() {
  return <HeroFloatingCard src={media.services.installation} className="hero-image-5" />;
}

function ImageSix() {
  return <HeroFloatingCard src={media.services.lightbox} className="hero-image-6" />;
}

function ImageSeven() {
  return <HeroFloatingCard src={media.boothTypes.modular} className="hero-image-7" />;
}

function ImageEight() {
  return <HeroFloatingCard src={media.boothTypes.outdoor} className="hero-image-8" />;
}

function ImageNine() {
  return <HeroFloatingCard src={media.boothTypes.kiosk} className="hero-image-9" />;
}

function ImageTen() {
  return <HeroFloatingCard src={media.services.branding} className="hero-image-10" />;
}

function headlineLines(headline: string): string[] {
  if (headline.includes("\n")) {
    return headline.split("\n").map((line) => line.trim()).filter(Boolean);
  }

  const comma = headline.lastIndexOf(", ");
  if (comma !== -1) {
    return [headline.slice(0, comma + 1), headline.slice(comma + 2).trim()];
  }

  const dash = headline.lastIndexOf(" — ");
  if (dash !== -1) {
    return [`${headline.slice(0, dash)} —`, headline.slice(dash + 3).trim()];
  }

  return [headline];
}

export function HomeHero({ locale, content }: HomeHeroProps) {
  const lines = headlineLines(content.headline);

  return (
    <section className="home-hero">
      <div className="home-hero-atmosphere" aria-hidden="true" />

      <div className="home-hero-stage">
        <div className="hero-floaters" aria-hidden="true">
          <ImageOne />
          <ImageTwo />
          <ImageThree />
          <ImageFour />
          <ImageFive />
          <ImageSix />
          <ImageSeven />
          <ImageEight />
          <ImageNine />
          <ImageTen />
        </div>

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
          <h1 className="home-hero-headline">
            {lines.map((line, index) => (
              <span key={`${index}-${line}`} className="home-hero-headline-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="home-hero-support">{content.support}</p>
          <div className="home-hero-actions">
            <Link href={localizePath("/contact", locale)} className="hero-cta">
              {content.primaryCta}
              <CtaArrow tone="white" size="lg" />
            </Link>
            <Link href={localizePath("/work", locale)} className="hero-cta-ghost">
              {content.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
