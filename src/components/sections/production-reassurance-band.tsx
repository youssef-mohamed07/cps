import type { Locale } from "@/lib/i18n";

export function ProductionReassuranceBand({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const items = [
    {
      value: ar ? "١٠" : "10",
      label: ar ? "تخصصات إنتاجية" : "Production disciplines",
    },
    {
      value: ar ? "٠١" : "01",
      label: ar ? "فريق داخلي مسؤول" : "Accountable in-house team",
    },
    {
      value: ar ? "QC" : "QC",
      label: ar ? "فحص في كل مرحلة" : "Checked at every stage",
    },
    {
      value: ar ? "KSA" : "KSA",
      label: ar ? "تركيب على مستوى المملكة" : "Nationwide installation",
    },
  ];

  return (
    <section
      className="stats-section production-reassurance"
      aria-label={ar ? "ضمانات التنفيذ" : "Production reassurance"}
    >
      <div className="site-container">
        <div className="stats-strip" role="list">
          {items.map((item) => (
            <div className="stats-strip-item" key={item.label} role="listitem">
              <span className="stats-value">
                <span className="stats-value-num">{item.value}</span>
              </span>
              <span className="stats-strip-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
