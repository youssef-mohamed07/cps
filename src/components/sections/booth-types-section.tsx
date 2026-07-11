import Image from "next/image";
import Link from "next/link";
import { boothTypeIcons } from "@/content/motion-icons";
import { localizePath, type Locale } from "@/lib/i18n";
import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";

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
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display">{title}</h2>
            <p className="lede">{support}</p>
          </div>
        </Reveal>

        <div className="booth-types-grid">
          {items.map((item, index) => {
            const href = item.slug
              ? localizePath(`/booth-types/${item.slug}`, locale)
              : localizePath("/booth-types", locale);
            const iconName = item.slug
              ? boothTypeIcons[item.slug] ?? "building"
              : "building";
            return (
              <Reveal key={item.title} delay={index * 0.05}>
                <Link href={href} className="booth-type-card group">
                  <div className="booth-type-media">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="booth-type-icon">
                      <MotionIcon name={iconName} size={32} trigger="hover" />
                    </span>
                  </div>
                  <h3 className="booth-type-title">{item.title}</h3>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="section-cta-row">
            <Link
              href={localizePath("/booth-types", locale)}
              className="btn-secondary inline-flex items-center gap-2"
            >
              {cta}
              <CtaArrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
