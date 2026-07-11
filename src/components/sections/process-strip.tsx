import { processIcons } from "@/content/motion-icons";
import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";

type ProcessStripItem = { from: string; to: string };

type ProcessStripProps = {
  title: string;
  items: ProcessStripItem[];
};

export function ProcessStrip({ title, items }: ProcessStripProps) {
  return (
    <section className="process-strip section-rule">
      <div className="site-container">
        <Reveal>
          <p className="process-strip-title">{title}</p>
        </Reveal>
        <ul className="process-strip-grid">
          {items.map((item, index) => (
            <Reveal key={item.from} delay={index * 0.07}>
              <li className="process-strip-item">
                <span className="process-strip-icon">
                  <MotionIcon
                    name={processIcons[index] ?? "edit"}
                    size={40}
                    trigger="in"
                  />
                </span>
                <span className="process-strip-from">{item.from}</span>
                <span className="process-strip-arrow" aria-hidden="true">
                  →
                </span>
                <span className="process-strip-to">{item.to}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
