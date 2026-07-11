import Image from "next/image";
import { media } from "@/content/media";

type LifecycleItem = { title: string; description: string };

type LifecycleSectionProps = {
  eyebrow: string;
  title: string;
  support: string;
  imageAlt: string;
  items: LifecycleItem[];
};

export function LifecycleSection({
  eyebrow,
  title,
  support,
  imageAlt,
  items,
}: LifecycleSectionProps) {
  return (
    <section className="section-pad lifecycle-section">
      <div className="site-container lifecycle-grid">
        <div className="lifecycle-media">
          <Image
            src={media.lifecycle}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display">{title}</h2>
          <p className="lede">{support}</p>
          <ul className="lifecycle-list">
            {items.map((item) => (
              <li key={item.title} className="lifecycle-item">
                <h3 className="lifecycle-item-title">{item.title}</h3>
                <p className="lifecycle-item-copy">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
