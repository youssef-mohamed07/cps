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
      className={`section-pad faq-section scroll-mt-24${className ? ` ${className}` : ""}`}
    >
      <div className="site-container">
        <Reveal>
          <div className="faq-head">
            <div className="faq-head-copy">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="display faq-title">{title}</h2>
            </div>
            <p className="faq-head-support">{support}</p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <FaqAccordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
