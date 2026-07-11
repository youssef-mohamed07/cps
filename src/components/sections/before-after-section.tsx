"use client";

import Image from "next/image";
import type { Dictionary } from "@/content/dictionaries.local";
import { Reveal } from "@/components/motion/reveal";

const DIVIDER_POSITION = 50;
const MARQUEE_LOOPS = 2;

type BeforeAfterSectionProps = {
  content: Dictionary["beforeAfter"];
};

function ComparisonMedia({
  videoSrc,
  poster,
  grayscale = false,
}: {
  videoSrc?: string;
  poster: string;
  grayscale?: boolean;
}) {
  if (videoSrc) {
    return (
      <video
        src={videoSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className={`ba-media${grayscale ? " is-grayscale" : ""}`}
      />
    );
  }

  return (
    <Image
      src={poster}
      alt=""
      fill
      aria-hidden
      className={`ba-media${grayscale ? " is-grayscale" : ""}`}
      sizes="100vw"
      loading="lazy"
    />
  );
}

function MarqueeTrack({
  items,
  variant,
}: {
  items: string[];
  variant: "before" | "after";
}) {
  return (
    <div className="ba-marquee-scroll">
      {Array.from({ length: MARQUEE_LOOPS }, (_, loopIndex) => (
        <div
          key={`${variant}-${loopIndex}`}
          className="ba-marquee-group"
          aria-hidden={loopIndex > 0 ? true : undefined}
        >
          {items.map((label) => (
            <span key={`${variant}-${loopIndex}-${label}`} className="ba-marquee-slot">
              <span className={`ba-keyword ba-keyword--${variant}`}>{label}</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function TransformMarquee({
  beforeItems,
  afterItems,
}: {
  beforeItems: string[];
  afterItems: string[];
}) {
  return (
    <div className="ba-marquee-stage">
      <div className="ba-marquee-viewport ba-marquee-viewport--before">
        <MarqueeTrack items={beforeItems} variant="before" />
      </div>

      <div className="ba-marquee-viewport ba-marquee-viewport--after">
        <MarqueeTrack items={afterItems} variant="after" />
      </div>

      <div className="ba-marquee-hub" aria-hidden="true">
        <Image
          src="/icon.png"
          alt=""
          width={44}
          height={44}
          className="ba-marquee-logo"
        />
      </div>

      <span className="sr-only">
        Before: {beforeItems.join(", ")}. After: {afterItems.join(", ")}.
      </span>
    </div>
  );
}

function BeforeAfterSlider({
  beforeVideo,
  afterVideo,
  beforePoster,
  afterPoster,
  beforeItems,
  afterItems,
}: {
  beforeVideo?: string;
  afterVideo?: string;
  beforePoster: string;
  afterPoster: string;
  beforeItems: string[];
  afterItems: string[];
}) {
  const clipAfter = 100 - DIVIDER_POSITION;

  return (
    <div
      dir="ltr"
      className="ba-slider"
      role="img"
      aria-label="Before and after booth comparison"
    >
      <div className="ba-slider-layer">
        <ComparisonMedia videoSrc={afterVideo} poster={afterPoster} />
      </div>

      <div
        className="ba-slider-layer"
        style={{ clipPath: `inset(0 ${clipAfter}% 0 0)` }}
      >
        <ComparisonMedia
          videoSrc={beforeVideo}
          poster={beforePoster}
          grayscale
        />
      </div>

      <TransformMarquee beforeItems={beforeItems} afterItems={afterItems} />

      <div
        className="ba-divider"
        style={{ left: `${DIVIDER_POSITION}%` }}
        aria-hidden="true"
      />
    </div>
  );
}

export function BeforeAfterSection({ content }: BeforeAfterSectionProps) {
  if (content.enabled === false) return null;

  return (
    <section className="section-pad section-rule before-after-section scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="display">{content.title}</h2>
            <p className="lede">{content.subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="ba-slider-wrap">
            <BeforeAfterSlider
              beforeVideo={content.beforeVideo}
              afterVideo={content.afterVideo}
              beforePoster={content.beforeImage}
              afterPoster={content.afterImage}
              beforeItems={content.beforeItems}
              afterItems={content.afterItems}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
