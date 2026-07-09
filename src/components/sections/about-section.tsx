import type { Dictionary } from "@/content/dictionaries.local";

type AboutSectionProps = {
  content: Dictionary["about"];
};

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="section-pad section-rule scroll-mt-24">
      <div className="site-container">
        <p className="eyebrow">{content.eyebrow}</p>
        <div className="about-grid">
          <h2 className="display">{content.title}</h2>
          <p className="about-body">{content.body}</p>
        </div>
      </div>
    </section>
  );
}
