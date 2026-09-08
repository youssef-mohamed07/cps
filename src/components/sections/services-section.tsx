import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { localizePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";

type ServicesSectionProps = {
  locale: Locale;
  content: Dictionary["services"];
};

/** Homepage overview of the eight Blueprint services. */
export function ServicesSection({ locale, content }: ServicesSectionProps) {
  const exploreLabel = locale === "ar" ? "استكشف الخدمة" : "Explore service";

  return (
    <section id="services" className="section-pad section-rule services-section scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="display">{content.title}</h2>
            <p className="lede">{content.support}</p>
          </div>
        </Reveal>

        <div className="home-services-grid">
          {content.items.map((item, index) => {
            const href = item.slug
              ? localizePath(`/services/${item.slug}`, locale)
              : localizePath("/services", locale);
            return (
              <Reveal key={item.title} delay={(index % 4) * 0.04}>
                <Link href={href} className="home-service-card">
                {item.image ? (
                  <div className="home-service-card-media">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                ) : null}
                  <div className="home-service-card-copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <span className="home-service-card-cta">
                      <span>{exploreLabel}</span>
                      <CtaArrow size="md" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {content.cta ? (
          <Reveal>
            <div className="section-cta-row">
              <Link href={localizePath("/services", locale)} className="btn-secondary">
                {content.cta}
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
