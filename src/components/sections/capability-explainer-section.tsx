import type { Locale } from "@/lib/i18n";

export function CapabilityExplainerSection({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const comparison = [
    {
      key: "service",
      number: "01",
      title: ar ? "الخدمات" : "Services",
      items: [
        { label: ar ? "المعنى" : "Meaning", value: ar ? "ما نسلّمه للعميل" : "What we deliver to the client" },
        { label: ar ? "النطاق" : "Scope", value: ar ? "ثمانية عروض تبدأ من احتياج المشروع وتنتهي بنتيجة جاهزة" : "Eight offers that begin with a project need and end with a finished outcome" },
        { label: ar ? "الهدف" : "Purpose", value: ar ? "اختيار الحل المناسب للمشروع" : "Choose the right solution for the project" },
      ],
    },
    {
      key: "capability",
      number: "02",
      title: ar ? "قدرات الإنتاج" : "Production capabilities",
      items: [
        { label: ar ? "المعنى" : "Meaning", value: ar ? "كيف نصنعه ونركّبه" : "How we build and install it" },
        { label: ar ? "النطاق" : "Scope", value: ar ? "عشرة تخصصات وعمليات داخلية مشتركة تدعم كل خدمة" : "Ten shared in-house disciplines and processes supporting every service" },
        { label: ar ? "الهدف" : "Purpose", value: ar ? "ضبط الجودة والجدول والتسليم" : "Control quality, schedule and delivery" },
      ],
    },
  ];

  return (
    <section className="capability-explainer section-pad">
      <div className="site-container capability-explainer-inner">
        <header className="capability-explainer-head">
          <p className="eyebrow">{ar ? "الخدمة مقابل القدرة" : "Service vs Capability"}</p>
          <h2 className="display">
            {ar
              ? "الخدمة هي ما نسلّمه. والقدرة هي كيف نصنعه."
              : "A service is what we deliver. A capability is how we build it."}
          </h2>
        </header>

        <div className="capability-explainer-comparison">
          {comparison.map((column) => (
            <article
              key={column.key}
              className={`capability-explainer-card capability-explainer-card--${column.key}`}
            >
              <header className="capability-explainer-card-head">
                <span aria-hidden="true">{column.number}</span>
                <h3>{column.title}</h3>
              </header>
              <dl>
                {column.items.map((item) => (
                  <div key={item.label} className="capability-explainer-item">
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
          <span className="capability-explainer-vs" aria-hidden="true">
            {ar ? "مقابل" : "VS"}
          </span>
        </div>
      </div>
    </section>
  );
}
