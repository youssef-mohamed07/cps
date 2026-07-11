import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";

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
  support,
  cta,
  items,
}: BoothTypesSectionProps) {
  return (
    <section id="booth-types" className="section-pad section-rule scroll-mt-24">
      <div className="site-container">
        <div className="section-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display">{title}</h2>
          <p className="lede">{support}</p>
        </div>

        <div className="booth-types-grid">
          {items.map((item) => {
            const href = item.slug
              ? localizePath(`/booth-types/${item.slug}`, locale)
              : localizePath("/booth-types", locale);
            return (
              <Link key={item.title} href={href} className="booth-type-card group">
                <div className="booth-type-media">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="booth-type-title">{item.title}</h3>
              </Link>
            );
          })}
        </div>

        <div className="section-cta-row">
          <Link href={localizePath("/booth-types", locale)} className="btn-secondary">
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
