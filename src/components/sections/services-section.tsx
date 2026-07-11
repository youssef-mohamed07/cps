import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { localizePath, type Locale } from "@/lib/i18n";

type ServicesSectionProps = {
  locale: Locale;
  content: Dictionary["services"];
};

export function ServicesSection({ locale, content }: ServicesSectionProps) {
  return (
    <section id="services" className="section-pad section-rule scroll-mt-24">
      <div className="site-container">
        <div className="section-head">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="display">{content.title}</h2>
          <p className="lede">{content.support}</p>
        </div>

        <div className="service-cards">
          {content.items.map((item) => {
            const href = item.slug
              ? localizePath(`/services/${item.slug}`, locale)
              : localizePath("/services", locale);
            return (
              <Link key={item.title} href={href} className="service-card group">
                {item.image ? (
                  <div className="service-card-media">
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ) : null}
                <h3 className="service-title">{item.title}</h3>
                <p className="service-copy">{item.description}</p>
              </Link>
            );
          })}
        </div>

        {content.cta ? (
          <div className="section-cta-row">
            <Link href={localizePath("/services", locale)} className="btn-secondary">
              {content.cta}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
