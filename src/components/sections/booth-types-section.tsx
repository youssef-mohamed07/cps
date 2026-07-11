import Image from "next/image";
import Link from "next/link";
import { getBoothType, localizeBoothType } from "@/content/catalog";
import { localizePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/reveal";

type BoothTypeItem = { title: string; image: string; imageAlt: string; slug?: string };

type BoothTypesSectionProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  support: string;
  cta: string;
  items: BoothTypeItem[];
};

export function BoothTypesSection({
  locale,
  eyebrow,
  title,
  cta,
  items,
}: BoothTypesSectionProps) {
  return (
    <section id="booth-types" className="section-pad scroll-mt-24">
      <div className="site-container">
        <div className="booth-types-panel">
          <Reveal>
            <div className="booth-types-head">
              <div className="section-head">
                <p className="eyebrow">{eyebrow}</p>
                <h2 className="display">{title}</h2>
              </div>
              <Link
                href={localizePath("/booth-types", locale)}
                className="booth-types-all"
              >
                {cta}
              </Link>
            </div>

            <div className="booth-types-grid">
              {items.map((item) => {
                const href = item.slug
                  ? localizePath(`/booth-types/${item.slug}`, locale)
                  : localizePath("/booth-types", locale);
                const record = item.slug ? getBoothType(item.slug) : undefined;
                const excerpt = record
                  ? localizeBoothType(record, locale).excerpt
                  : undefined;

                return (
                  <Link key={item.title} href={href} className="booth-type-card group">
                    <div className="booth-type-media">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 640px) 50vw, 22vw"
                        className="object-cover transition duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="booth-type-meta">
                      <h3 className="booth-type-title">{item.title}</h3>
                      {excerpt ? (
                        <p className="booth-type-excerpt">{excerpt}</p>
                      ) : null}
                      <span className="booth-type-swatches" aria-hidden="true">
                        <span className="booth-type-swatch is-navy" />
                        <span className="booth-type-swatch is-accent" />
                        <span className="booth-type-swatch is-cyan" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
