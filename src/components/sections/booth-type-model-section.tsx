import { Reveal } from "@/components/motion/reveal";
import type { BoothModelVariant } from "@/components/three/booth-model-viewer";
import type { Locale } from "@/lib/i18n";

type BoothTypeModelSectionProps = {
  locale: Locale;
  title: string;
  variant: BoothModelVariant;
};

const variantFocus: Record<BoothModelVariant, { en: string; ar: string }> = {
  custom: {
    en: "Bespoke shell, feature façade, reception, product displays, concealed storage and branded focal points.",
    ar: "هيكل مخصص، واجهة مميزة، استقبال، وحدات عرض، مخزن مخفي، وعناصر بصرية تحمل هوية العلامة.",
  },
  modular: {
    en: "Repeatable wall modules, visible connection logic, interchangeable graphics, counters and storage modules.",
    ar: "وحدات حائط قابلة للتكرار، تفاصيل التجميع، جرافيك قابل للتبديل، كاونترات، ووحدات تخزين.",
  },
  "double-deck": {
    en: "Ground and upper floors, structural columns, staircase, guardrails, meeting space and all access clearances.",
    ar: "الدور الأرضي والعلوي، الأعمدة الإنشائية، السلم، الدرابزين، مساحة الاجتماعات، ومسارات الحركة الآمنة.",
  },
  portable: {
    en: "Portable frame, collapsible panels, transport cases, graphic skins and tool-free assembly details.",
    ar: "هيكل متنقل، ألواح قابلة للطي، حقائب النقل، كسوات الجرافيك، وتفاصيل التركيب بدون أدوات.",
  },
  kiosks: {
    en: "Service counter, product display, integrated screen, lockable storage, cable routes and branded canopy.",
    ar: "كاونتر خدمة، عرض للمنتج، شاشة مدمجة، تخزين قابل للقفل، مسارات للكابلات، ومظلة تحمل الهوية.",
  },
  outdoor: {
    en: "Weather-ready enclosure, raised floor, canopy, ballast or anchors, drainage details and outdoor-rated lighting.",
    ar: "هيكل مناسب للعوامل الجوية، أرضية مرتفعة، مظلة، نقاط تثبيت، تفاصيل تصريف، وإضاءة خارجية.",
  },
  pavilions: {
    en: "Primary pavilion shell, entrances, zoning, reception, hospitality, exhibits, screens and back-of-house spaces.",
    ar: "الهيكل الرئيسي، المداخل، توزيع المناطق، الاستقبال، الضيافة، المعروضات، الشاشات، والمساحات الخلفية.",
  },
  sustainable: {
    en: "Reusable structure, demountable joints, certified material finishes, low-waste panels and planting elements.",
    ar: "هيكل قابل لإعادة الاستخدام، وصلات قابلة للفك، خامات معتمدة، ألواح قليلة الهدر، وعناصر زراعية.",
  },
};

const briefItems = {
  en: [
    {
      title: "Geometry & scale",
      body: "Model at real-world 1:1 metric scale. Include the platform, walls, fascia or canopy, counters, storage, screens, furniture and visible construction joints.",
    },
    {
      title: "Materials & branding",
      body: "Use clean UVs and separate PBR materials for paint, wood, metal, glass and fabric. Keep logos, copy and brand colours editable and accurately placed.",
    },
    {
      title: "Lighting & finish",
      body: "Add lightboxes, LED strips, spotlights and emissive screens where required. Bevel visible edges and resolve every front, side and rear viewing angle.",
    },
    {
      title: "Web optimisation",
      body: "Target 150–250K triangles, 2K textures maximum and a compressed GLB under 15 MB. Name meshes clearly, remove hidden geometry and place the pivot at floor centre.",
    },
  ],
  ar: [
    {
      title: "الهندسة والمقياس",
      body: "يُنفذ الموديل بمقياس حقيقي 1:1 وبالوحدة المترية، ويشمل المنصة، الحوائط، الواجهة أو السقف، الكاونترات، التخزين، الشاشات، الأثاث، ووصلات التنفيذ الظاهرة.",
    },
    {
      title: "الخامات والهوية",
      body: "استخدم UV نظيفًا وخامات PBR منفصلة للدهانات والخشب والمعدن والزجاج والقماش، مع إبقاء الشعارات والنصوص وألوان الهوية قابلة للتعديل وفي أماكنها الصحيحة.",
    },
    {
      title: "الإضاءة والتشطيب",
      body: "أضف صناديق الإضاءة وشرائط LED والسبوتات والشاشات المضيئة عند الحاجة، مع تنعيم الحواف الظاهرة ومعالجة الموديل من جميع زوايا المشاهدة.",
    },
    {
      title: "تجهيز الويب",
      body: "المستهدف 150–250 ألف مثلث، وخامات بدقة 2K كحد أقصى، وملف GLB مضغوط أقل من 15 MB. سمِّ العناصر بوضوح، واحذف الأجزاء المخفية، وضع نقطة الارتكاز بمنتصف الأرضية.",
    },
  ],
};

export function BoothTypeModelSection({
  locale,
  title,
  variant,
}: BoothTypeModelSectionProps) {
  const isArabic = locale === "ar";
  const items = briefItems[locale];
  const focus = variantFocus[variant][locale];

  return (
    <section className="booth-detail-model">
      <div className="site-container booth-detail-model-inner">
        <Reveal className="booth-detail-model-copy">
          <p className="eyebrow">{isArabic ? "ملف إنتاج الموديل" : "3D model brief"}</p>
          <h2 className="booth-detail-model-title">
            {isArabic ? "المواصفات المطلوبة لتنفيذ الموديل." : "The specification for the final model."}
          </h2>
          <p className="booth-detail-model-body">
            {isArabic
              ? `تم حذف النموذج المؤقت. يُنفذ موديل ${title} النهائي طبقًا للقائمة التالية ليكون جاهزًا للعرض التفاعلي.`
              : `The placeholder has been removed. Produce the final ${title} asset to this checklist so it is ready for the interactive viewer.`}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="booth-detail-model-stage">
          <div className="booth-detail-model-frame booth-model-brief">
            <header className="booth-model-brief-head">
              <div>
                <p className="booth-model-brief-label">
                  {isArabic ? "الأصل المطلوب" : "Required asset"}
                </p>
                <h3>{title}</h3>
              </div>
              <span className="booth-model-brief-status">
                <span aria-hidden="true" />
                {isArabic ? "جاهز للتنفيذ" : "Ready for modelling"}
              </span>
            </header>

            <p className="booth-model-brief-focus">{focus}</p>

            <ol className="booth-model-brief-grid">
              {items.map((item, index) => (
                <li key={item.title} className="booth-model-brief-item">
                  <span className="booth-model-brief-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <footer className="booth-model-brief-delivery">
              <strong>{isArabic ? "التسليم" : "Deliverables"}</strong>
              <ul aria-label={isArabic ? "ملفات التسليم" : "Delivery files"}>
                <li>GLB</li>
                <li>BLEND / FBX</li>
                <li>{isArabic ? "خامات PBR" : "PBR textures"}</li>
                <li>{isArabic ? "4 صور معاينة" : "4 preview renders"}</li>
              </ul>
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
