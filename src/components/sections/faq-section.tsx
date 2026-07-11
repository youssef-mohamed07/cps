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
        <div className="faq-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display">{title}</h2>
        </div>
        <div className="faq-list">
          {items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-question">{item.question}</summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
