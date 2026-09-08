"use client";

import { useId, useState } from "react";

type FaqItem = { question: string; answer: string };

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.question}
            className={`faq-item${open ? " is-open" : ""}`}
          >
            <button
              id={buttonId}
              type="button"
              className="faq-question"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              <span className="faq-mark" aria-hidden="true" />
              <span className="faq-question-text">{item.question}</span>
              <span className="faq-toggle" aria-hidden="true" />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="faq-answer-panel"
              aria-hidden={!open}
            >
              <div className="faq-answer-inner">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
