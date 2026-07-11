import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { serviceIcons } from "@/content/motion-icons";
import { localizePath, type Locale } from "@/lib/i18n";
import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";

type ServicesSectionProps = {
  locale: Locale;
  content: Dictionary["services"];
};

export function ServicesSection({ locale, content }: ServicesSectionProps) {
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

        <div className="service-cards">
          {content.items.map((item, index) => {
            const href = item.slug
              ? localizePath(`/services/${item.slug}`, locale)
              : localizePath("/services", locale);
            const iconName = item.slug
              ? serviceIcons[item.slug] ?? "document"
              : "document";
            return (
              <Reveal key={item.title} delay={index * 0.06}>
                <Link href={href} className="service-card group">
                  {item.image ? (
                    <div className="service-card-media">
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 20vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="service-card-icon">
                        <MotionIcon name={iconName} size={40} trigger="hover" />
                      </span>
                    </div>
                  ) : null}
                  <h3 className="service-title">{item.title}</h3>
                  <p className="service-copy">{item.description}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {content.cta ? (
          <Reveal>
            <div className="section-cta-row">
              <Link href={localizePath("/services", locale)} className="btn-secondary inline-flex items-center gap-2">
                {content.cta}
                <CtaArrow />
              </Link>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
