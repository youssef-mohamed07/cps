type ProcessStripItem = { from: string; to: string };

type ProcessStripProps = {
  title: string;
  items: ProcessStripItem[];
};

export function ProcessStrip({ title, items }: ProcessStripProps) {
  return (
    <section className="process-strip section-rule">
      <div className="site-container">
        <p className="process-strip-title">{title}</p>
        <ul className="process-strip-grid">
          {items.map((item) => (
            <li key={item.from} className="process-strip-item">
              <span className="process-strip-from">{item.from}</span>
              <span className="process-strip-arrow" aria-hidden="true">
                →
              </span>
              <span className="process-strip-to">{item.to}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
