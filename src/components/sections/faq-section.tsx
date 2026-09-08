import { Reveal } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";

type FaqItem = { question: string; answer: string };

type FaqSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  support: string;
  items: FaqItem[];
  className?: string;
};

export function FaqSection({
  id,
  eyebrow,
  title,
  support,
  items,
  className,
}: FaqSectionProps) {
  return (
    <section
      id={id}
      className={`faq-section scroll-mt-24${className ? ` ${className}` : ""}`}
    >
      <div className="site-container">
        <Reveal>
          <div className="faq-head">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display faq-title">{title}</h2>
            <p className="faq-support">{support}</p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
