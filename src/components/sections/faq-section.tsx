import { Reveal } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";

type FaqItem = { question: string; answer: string };

type FaqSectionProps = {
  eyebrow: string;
  title: string;
  support: string;
  items: FaqItem[];
};

export function FaqSection({ eyebrow, title, support, items }: FaqSectionProps) {
  return (
    <section className="section-pad faq-section scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="faq-layout">
            <div className="faq-intro">
              <p className="eyebrow">{eyebrow}</p>
              <h2 className="display faq-title">{title}</h2>
              <p className="faq-intro-copy">{support}</p>
            </div>

            <FaqAccordion items={items} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
