import Image from "next/image";
import { media } from "@/content/media";
import { whyIcons } from "@/content/motion-icons";
import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";

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
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display">{title}</h2>
            <p className="lede">{support}</p>
          </Reveal>
          <ul className="why-cps-list">
            {items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <li className="why-cps-item">
                  <span className="why-cps-item-icon">
                    <MotionIcon
                      name={whyIcons[index] ?? "lock"}
                      size={36}
                      trigger="in"
                    />
                  </span>
                  <div>
                    <h3 className="why-cps-item-title">{item.title}</h3>
                    <p className="why-cps-item-copy">{item.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1}>
          <div className="why-cps-media">
            <Image
              src={media.whyCps}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
