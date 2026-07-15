import { Reveal } from "@/components/motion/reveal";

type ServiceWhySectionProps = {
  title: string;
  support?: string;
  items: { title: string; description: string }[];
};

export function ServiceWhySection({
  title,
  support,
  items,
}: ServiceWhySectionProps) {
  if (!items.length) return null;

  return (
    <section className="section-pad service-why-section section-rule">
      <div className="site-container">
        <Reveal>
          <div className="service-why-head">
            <h2 className="display service-why-title">{title}</h2>
            {support ? <p className="lede service-why-support">{support}</p> : null}
          </div>
        </Reveal>

        <ul className="service-why-list">
          {items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={index * 0.08}>
                <article className="service-why-card">
                  <span className="service-why-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
