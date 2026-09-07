import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { media } from "@/content/media";
import { localizePath, type Locale } from "@/lib/i18n";

export const productionCapabilities = [
  ["Carpentry & Joinery", "النجارة والأعمال الخشبية"],
  ["Metal Works", "الأعمال المعدنية"],
  ["Acrylic Fabrication", "تصنيع الأكريليك"],
  ["CNC Routing & Cutting", "التفريز والقطع بتقنية CNC"],
  ["Laser Cutting", "القطع بالليزر"],
  ["Large-Format Printing", "الطباعة كبيرة الحجم"],
  ["Painting & Finishing", "الدهان والتشطيب"],
  ["Assembly & Pre-Build", "التجميع والبناء التجريبي"],
  ["Signage Production", "إنتاج اللافتات"],
  ["On-Site Installation", "التركيب في الموقع"],
] as const;

export function ProductionCapabilitiesSection({ locale, compact = false, standalone = false }: { locale: Locale; compact?: boolean; standalone?: boolean }) {
  const ar = locale === "ar";
  return (
    <section className={`production-capabilities${compact ? " production-capabilities--compact" : ""}`}>
      <div className="site-container production-capabilities-grid">
        <Reveal className="production-capabilities-media">
          <Image src={media.about.studio} alt={ar ? "التصنيع والحرفية داخل منشأة CPS" : "Fabrication and craft inside the CPS production facility"} fill sizes="(max-width: 900px) 100vw, 52vw" className="object-cover" />
        </Reveal>
        <Reveal delay={0.08} className="production-capabilities-copy">
          <p className="eyebrow">{ar ? "كيف نبني" : "How We Build"}</p>
          <h2>{standalone ? (ar ? "عشرة تخصصات. أرض إنتاج واحدة." : "Ten disciplines. One production floor.") : (ar ? "ما نسلّمه مدعوم بكيفية تصنيعه." : "What we deliver is supported by how we build it.")}</h2>
          <p>{standalone ? (ar ? "القدرات الداخلية المشتركة التي تدعم كل خدمة وتحافظ على الجودة من المواد الخام حتى التركيب." : "The shared in-house capabilities behind every service, from raw material to final installation.") : (ar ? "كل مشروع يعتمد على منشأة إنتاج واحدة تجمع الحرفة والتقنية والتركيب." : "Every project draws on the same in-house production floor, from raw material to final install.")}</p>
          <ul>{productionCapabilities.map(([en, arabic]) => <li key={en}>{ar ? arabic : en}</li>)}</ul>
          {!standalone ? <Link href={localizePath("/production-capabilities", locale)} className="production-capabilities-cta">{ar ? "استكشف قدرات الإنتاج" : "See Our Production Capabilities"}<CtaArrow size="sm" /></Link> : null}
        </Reveal>
      </div>
    </section>
  );
}
