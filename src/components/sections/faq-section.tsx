import { Reveal } from "@/components/motion/reveal";

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
          <div className="faq-panel">
            <div className="faq-intro">
              <p className="eyebrow eyebrow-on-dark">{eyebrow}</p>
              <h2 className="display display-on-dark">{title}</h2>
              <p className="faq-intro-copy">{support}</p>
            </div>

            <div className="faq-list">
              {items.map((item, index) => (
                <details key={item.question} className="faq-item">
                  <summary className="faq-question">
                    <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="faq-question-text">{item.question}</span>
                    <span className="faq-toggle" aria-hidden="true" />
                  </summary>
                  <p className="faq-answer">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
