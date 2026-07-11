import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";

type FaqItem = { question: string; answer: string };

type FaqSectionProps = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export function FaqSection({ eyebrow, title, items }: FaqSectionProps) {
  return (
    <section className="section-pad faq-section section-rule">
      <div className="site-container faq-layout">
        <Reveal>
          <div className="faq-intro">
            <span className="faq-intro-icon">
              <MotionIcon name="info" size={40} trigger="in" />
            </span>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display">{title}</h2>
          </div>
        </Reveal>
        <div className="faq-list">
          {items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.05}>
              <details className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
