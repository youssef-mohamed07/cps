"use client";

import { useState } from "react";

type FaqItem = { question: string; answer: string };

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const open = openIndex === index;

        return (
          <details
            key={item.question}
            className="faq-item"
            open={open}
          >
            <summary
              className="faq-question"
              onClick={(event) => {
                event.preventDefault();
                setOpenIndex(open ? -1 : index);
              }}
            >
              <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="faq-question-text">{item.question}</span>
              <span className="faq-toggle" aria-hidden="true" />
            </summary>
            <p className="faq-answer">{item.answer}</p>
          </details>
        );
      })}
    </div>
  );
}
