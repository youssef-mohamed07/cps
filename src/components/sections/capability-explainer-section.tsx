import { Reveal } from "@/components/motion/reveal";
import type { Locale } from "@/lib/i18n";

export function CapabilityExplainerSection({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const comparison = [
    {
      key: "service",
      number: "01",
      title: ar ? "الخدمات" : "Services",
      eyebrow: ar ? "ما يختاره العميل" : "What clients choose",
      statement: ar
        ? "حل نهائي مبني حول البريف واحتياج المشروع."
        : "A finished solution built around the brief and the project need.",
      metric: ar ? "٨ عائلات من الخدمات" : "8 service families",
      outcome: ar ? "اختيار النتيجة المناسبة للمشروع" : "Choose the right outcome for the project",
    },
    {
      key: "capability",
      number: "02",
      title: ar ? "قدرات الإنتاج" : "Production capabilities",
      eyebrow: ar ? "محرك التنفيذ الداخلي" : "The in-house engine",
      statement: ar
        ? "الأفراد والآلات والتخصصات التي تصنع الحل وتركّبه."
        : "The people, machinery and disciplines that produce and install it.",
      metric: ar ? "١٠ تخصصات إنتاجية" : "10 production disciplines",
      outcome: ar ? "ضبط الجودة والتوقيت والتسليم" : "Control quality, timing and delivery",
    },
  ];

  return (
    <section className="capability-explainer section-pad">
      <div className="site-container capability-explainer-inner">
        <Reveal>
          <header className="capability-explainer-head">
            <div>
              <p className="eyebrow">{ar ? "من الفكرة إلى التنفيذ" : "From idea to execution"}</p>
              <h2 className="display">
                {ar
                  ? "ما نسلّمه. وكيف نحوّله إلى واقع."
                  : "What we deliver. How we make it happen."}
              </h2>
            </div>
            <p className="capability-explainer-support">
              {ar
                ? "الخدمة تحدد النتيجة، وقدراتنا الإنتاجية تضبط طريقة تصنيعها وتشطيبها وتركيبها."
                : "The service defines the result. Our production capabilities control how it is made, finished and installed."}
            </p>
          </header>
        </Reveal>

        <div className="capability-explainer-comparison">
          {comparison.map((column, index) => (
            <Reveal key={column.key} delay={index * 0.08}>
              <article
                className={`capability-explainer-card capability-explainer-card--${column.key}`}
              >
                <header className="capability-explainer-card-head">
                  <span aria-hidden="true">{column.number}</span>
                  <p>{column.eyebrow}</p>
                </header>
                <div className="capability-explainer-card-body">
                  <h3>{column.title}</h3>
                  <p>{column.statement}</p>
                </div>
                <footer className="capability-explainer-card-foot">
                  <strong>{column.metric}</strong>
                  <span>{column.outcome}</span>
                </footer>
              </article>
            </Reveal>
          ))}
          <span className="capability-explainer-connector" aria-hidden="true">
            <span />
          </span>
        </div>

        <p className="capability-explainer-closing">
          <span aria-hidden="true" />
          {ar ? "فريق واحد مسؤول عن الاثنين." : "One team accountable for both."}
        </p>
      </div>
    </section>
  );
}
