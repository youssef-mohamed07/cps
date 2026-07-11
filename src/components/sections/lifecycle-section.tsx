import Image from "next/image";
import { media } from "@/content/media";
import { lifecycleIcons } from "@/content/motion-icons";
import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";

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
        <Reveal>
          <div className="lifecycle-media">
            <Image
              src={media.lifecycle}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display">{title}</h2>
            <p className="lede">{support}</p>
          </Reveal>
          <ul className="lifecycle-list">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <li className="lifecycle-item">
                  <span className="lifecycle-item-icon">
                    <MotionIcon
                      name={lifecycleIcons[index] ?? "edit"}
                      size={36}
                      trigger="in"
                    />
                  </span>
                  <div>
                    <h3 className="lifecycle-item-title">{item.title}</h3>
                    <p className="lifecycle-item-copy">{item.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
