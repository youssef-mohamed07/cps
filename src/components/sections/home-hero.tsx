import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { localizePath, type Locale } from "@/lib/i18n";

type HomeHeroProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

export function HomeHero({ locale, content }: HomeHeroProps) {
  return (
    <section className="home-hero">
      <div className="site-container home-hero-content">
        <Image
          src="/logo.png"
          alt={
            locale === "ar"
              ? "CPS — المبدعون المحترفون"
              : "CPS — Creatives Professionals"
          }
          width={1524}
          height={540}
          priority
          className="home-hero-logo"
        />
        <h1 className="home-hero-headline">{content.headline}</h1>
        <p className="home-hero-support">{content.support}</p>
        <div className="home-hero-actions">
          <Link href={localizePath("/contact", locale)} className="btn-primary">
            {content.primaryCta}
          </Link>
          <Link href={localizePath("/work", locale)} className="btn-secondary">
            {content.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
