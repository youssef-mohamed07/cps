"use client";

import dynamic from "next/dynamic";
import { Reveal } from "@/components/motion/reveal";
import type { BoothModelVariant } from "@/components/three/booth-model-viewer";
import type { Locale } from "@/lib/i18n";

const BoothModelViewer = dynamic(
  () =>
    import("@/components/three/booth-model-viewer").then(
      (mod) => mod.BoothModelViewer,
    ),
  {
    ssr: false,
    loading: () => <div className="booth-model-viewer-fallback" aria-hidden="true" />,
  },
);

type BoothTypeModelSectionProps = {
  locale: Locale;
  title: string;
  variant: BoothModelVariant;
  modelUrl?: string;
};

export function BoothTypeModelSection({
  locale,
  title,
  variant,
  modelUrl,
}: BoothTypeModelSectionProps) {
  const isArabic = locale === "ar";

  return (
    <section className="booth-detail-model">
      <div className="site-container booth-detail-model-inner">
        <Reveal className="booth-detail-model-copy">
          <p className="eyebrow">{isArabic ? "معاينة ثلاثية الأبعاد" : "3D preview"}</p>
          <h2 className="booth-detail-model-title">
            {isArabic
              ? "استكشف شكل الجناح قبل البناء."
              : "Explore the booth form before build."}
          </h2>
          <p className="booth-detail-model-body">
            {isArabic
              ? `معاينة تفاعلية ل${title} — اسحب للدوران وقرّب للتفاصيل.`
              : `Interactive preview of ${title} — drag to rotate and scroll to zoom.`}
          </p>
          <ul className="booth-detail-model-hints">
            <li>{isArabic ? "اسحب للدوران" : "Drag to rotate"}</li>
            <li>{isArabic ? "مرّر للتكبير" : "Scroll to zoom"}</li>
            <li>{isArabic ? "تدوير تلقائي" : "Auto-rotate on"}</li>
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="booth-detail-model-stage">
          <div className="booth-detail-model-frame">
            <BoothModelViewer variant={variant} modelUrl={modelUrl} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
