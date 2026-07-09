import type { Dictionary } from "@/content/dictionaries.local";

type ProcessSectionProps = {
  content: Dictionary["process"];
};

export function ProcessSection({ content }: ProcessSectionProps) {
  return (
    <section id="process" className="section-pad section-rule scroll-mt-24">
      <div className="site-container">
        <div className="section-head section-head-compact">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="display">{content.title}</h2>
        </div>

        <ol className="process-rail">
          {content.steps.map((step, index) => (
            <li key={step.title} className="process-tile">
              <span className="process-num">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-copy">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
