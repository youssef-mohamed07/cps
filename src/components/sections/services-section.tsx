import type { Dictionary } from "@/content/dictionaries.local";

type ServicesSectionProps = {
  content: Dictionary["services"];
};

export function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section id="services" className="section-pad section-rule scroll-mt-24">
      <div className="site-container">
        <div className="section-head">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="display">{content.title}</h2>
          <p className="lede">{content.support}</p>
        </div>

        <div className="service-grid">
          {content.items.map((item) => (
            <article key={item.title} className="service-item">
              <h3 className="service-title">{item.title}</h3>
              <p className="service-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
