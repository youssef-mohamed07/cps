import Image from "next/image";
import { media } from "@/content/media";

type WhyItem = { title: string; description: string };

type WhyCpsSectionProps = {
  eyebrow: string;
  title: string;
  support: string;
  imageAlt: string;
  items: WhyItem[];
};

export function WhyCpsSection({
  eyebrow,
  title,
  support,
  imageAlt,
  items,
}: WhyCpsSectionProps) {
  return (
    <section className="section-pad why-cps-section section-rule">
      <div className="site-container why-cps-grid">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display">{title}</h2>
          <p className="lede">{support}</p>
          <ul className="why-cps-list">
            {items.map((item) => (
              <li key={item.title} className="why-cps-item">
                <h3 className="why-cps-item-title">{item.title}</h3>
                <p className="why-cps-item-copy">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="why-cps-media">
          <Image
            src={media.whyCps}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
