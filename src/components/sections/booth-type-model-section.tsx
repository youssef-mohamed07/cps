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
    ar: "هيكل مصمّم حسب الطلب، وواجهة لافتة، ومكتب استقبال، ووحدات عرض، ومخزن مخفي، وعناصر بصرية بهوية العلامة.",
  },
  modular: {
    en: "Repeatable wall modules, visible connection logic, interchangeable graphics, counters and storage modules.",
    ar: "وحدات جدارية قابلة للتكرار، ووصلات تجميع ظاهرة، ورسومات قابلة للاستبدال، وطاولات عرض، ووحدات تخزين.",
  },
  "double-deck": {
    en: "Ground and upper floors, structural columns, staircase, guardrails, meeting space and all access clearances.",
    ar: "الطابقان الأرضي والعلوي، والأعمدة الإنشائية، والدرج، والدرابزين، ومساحة الاجتماعات، ومسارات الحركة الآمنة.",
  },
  portable: {
    en: "Portable frame, collapsible panels, transport cases, graphic skins and tool-free assembly details.",
    ar: "هيكل متنقل، وألواح قابلة للطي، وحقائب نقل، وأغطية رسومية، وتركيب دون أدوات.",
  },
  kiosks: {
    en: "Service counter, product display, integrated screen, lockable storage, cable routes and branded canopy.",
    ar: "طاولة خدمة، ومنصة لعرض المنتج، وشاشة مدمجة، وتخزين بقفل، ومسارات للكابلات، ومظلة بهوية العلامة.",
  },
  outdoor: {
    en: "Weather-ready enclosure, raised floor, canopy, ballast or anchors, drainage details and outdoor-rated lighting.",
    ar: "هيكل مقاوم للعوامل الجوية، وأرضية مرتفعة، ومظلة، ونقاط تثبيت، وتفاصيل تصريف، وإضاءة مخصصة للأماكن المفتوحة.",
  },
  pavilions: {
    en: "Primary pavilion shell, entrances, zoning, reception, hospitality, exhibits, screens and back-of-house spaces.",
    ar: "الهيكل الرئيسي للجناح، والمداخل، وتوزيع المناطق، والاستقبال، والضيافة، والمعروضات، والشاشات، ومساحات الخدمة الخلفية.",
  },
  sustainable: {
    en: "Reusable structure, demountable joints, certified material finishes, low-waste panels and planting elements.",
    ar: "هيكل قابل لإعادة الاستخدام، ووصلات قابلة للفك، وخامات معتمدة، وألواح قليلة الهدر، ونباتات طبيعية.",
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
      body: "يُنفَّذ النموذج بمقياس حقيقي 1:1 وبالنظام المتري، ويشمل المنصة والجدران والواجهة أو المظلة وطاولات العرض والتخزين والشاشات والأثاث ووصلات التنفيذ الظاهرة.",
    },
    {
      title: "الخامات والهوية",
      body: "استخدم إسقاط UV نظيفاً وخامات PBR منفصلة للدهان والخشب والمعدن والزجاج والقماش، مع إبقاء الشعارات والنصوص وألوان الهوية قابلة للتعديل وفي مواضعها الصحيحة.",
    },
    {
      title: "الإضاءة والتشطيب",
      body: "أضف صناديق الإضاءة وشرائط LED والإضاءة الموجّهة والشاشات المضيئة عند الحاجة، مع تنعيم الحواف الظاهرة وإتقان النموذج من جميع زوايا المشاهدة.",
    },
    {
      title: "التجهيز للعرض على الويب",
      body: "الهدف 150–250 ألف مضلع، وخامات بدقة 2K كحد أقصى، وملف GLB مضغوط بحجم أقل من 15 MB. سمِّ العناصر بوضوح، واحذف الأجزاء غير المرئية، واجعل نقطة الارتكاز في منتصف الأرضية.",
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
          <p className="eyebrow">{isArabic ? "موجز النموذج ثلاثي الأبعاد" : "3D model brief"}</p>
          <h2 className="booth-detail-model-title">
            {isArabic ? "مواصفات النموذج النهائي" : "The specification for the final model."}
          </h2>
          <p className="booth-detail-model-body">
            {isArabic
              ? `أُزيل النموذج المؤقت. يُنفَّذ نموذج ${title} النهائي وفق القائمة التالية ليكون جاهزاً للعرض التفاعلي.`
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
                {isArabic ? "جاهز للنمذجة" : "Ready for modelling"}
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
              <strong>{isArabic ? "المخرجات" : "Deliverables"}</strong>
              <ul aria-label={isArabic ? "ملفات التسليم" : "Delivery files"}>
                <li>GLB</li>
                <li>BLEND / FBX</li>
                <li>{isArabic ? "خامات PBR" : "PBR textures"}</li>
                <li>{isArabic ? "4 تصوّرات للمعاينة" : "4 preview renders"}</li>
              </ul>
            </footer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
