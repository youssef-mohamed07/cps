import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { media } from "@/content/media";
import { localizePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";

type WhyCpsSectionProps = {
  locale: Locale;
  content: Dictionary["whyCps"];
};

export function WhyCpsSection({ locale, content }: WhyCpsSectionProps) {
  return (
    <section id="why-cps" className="section-pad why-cps-section scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="display">{content.title}</h2>
          </div>

          <div className="why-cps-panel">
            <div className="why-cps-bento">
              <div className="why-cps-tile why-cps-tile-wide">
                <div className="why-cps-image">
                  <Image
                    src={media.whyCpsWide}
                    alt={content.images.wideAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="why-cps-tile why-cps-tile-dark">
                <div className="why-cps-card is-dark">
                  <span className="why-cps-mark" aria-hidden="true" />
                  <h3 className="why-cps-card-title">{content.primary.title}</h3>
                  <p className="why-cps-card-copy">{content.primary.description}</p>
                  <Link
                    href={localizePath(content.primary.href, locale)}
                    className="why-cps-card-cta is-light"
                  >
                    <span>{content.primary.cta}</span>
                    <CtaArrow size="md" />
                  </Link>
                </div>
              </div>

              <div className="why-cps-tile why-cps-tile-left">
                <div className="why-cps-image">
                  <Image
                    src={media.whyCpsLeft}
                    alt={content.images.leftAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="why-cps-tile why-cps-tile-soft">
                <div className="why-cps-card is-soft">
                  <span className="why-cps-mark" aria-hidden="true" />
                  <h3 className="why-cps-card-title">{content.secondary.title}</h3>
                  <p className="why-cps-card-copy">{content.secondary.description}</p>
                  <Link
                    href={localizePath(content.secondary.href, locale)}
                    className="why-cps-card-cta is-dark"
                  >
                    <span>{content.secondary.cta}</span>
                    <CtaArrow size="md" />
                  </Link>
                </div>
              </div>

              <div className="why-cps-tile why-cps-tile-right">
                <div className="why-cps-image">
                  <Image
                    src={media.whyCpsRight}
                    alt={content.images.rightAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
