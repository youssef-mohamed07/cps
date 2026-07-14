import { media } from "@/content/media";

export type Project = {
  slug: string;
  year: string;
  image: string;
  imageAlt: string;
  gallery: string[];
  motionVideo?: string;
  industrySlug?: string;
  boothTypeSlug?: string;
  locationSlug?: string;
  event?: string;
  size?: string;
  technologies?: string[];
  featured?: boolean;
  en: {
    title: string;
    category: string;
    summary: string;
    challenge: string;
    approach: string;
    outcome: string;
  };
  ar: {
    title: string;
    category: string;
    summary: string;
    challenge: string;
    approach: string;
    outcome: string;
  };
};

export const projects: Project[] = [
  {
    slug: "northline",
    year: "2025",
    industrySlug: "technology",
    boothTypeSlug: "custom",
    locationSlug: "riyadh",
    event: "LEAP",
    size: "120 sqm",
    technologies: ["Custom structure", "Integrated AV"],
    featured: true,
    image: media.projects.northline.hero,
    imageAlt: "Custom technology exhibition booth on the show floor",
    gallery: [...media.projects.northline.gallery],
    en: {
      title: "Northline",
      category: "Technology",
      summary: "A flagship custom booth for a mobility platform expanding across the Gulf.",
      challenge:
        "Northline needed a show-floor presence that felt technical and human — clear for demos, bold enough to stop traffic.",
      approach:
        "We designed a custom structure with integrated AV, clear visitor flow, and a modular graphic system for multi-show reuse.",
      outcome:
        "A high-impact booth program now redeployed across regional technology events.",
    },
    ar: {
      title: "نورثلاين",
      category: "تقنية",
      summary: "جناح مخصص رئيسي لمنصة تنقّل تتوسع في الخليج.",
      challenge:
        "احتاجت نورثلاين حضوراً على أرض المعرض يجمع التقنية والإنسانية — واضحاً للعروض وجريئاً لجذب الزوار.",
      approach:
        "صممنا هيكلاً مخصصاً مع AV مدمج وتدفق زوار واضح ونظام رسومي معياري لإعادة الاستخدام عبر المعارض.",
      outcome: "برنامج جناح عالي الأثر يُعاد نشره الآن عبر فعاليات التقنية الإقليمية.",
    },
  },
  {
    slug: "aether-labs",
    year: "2025",
    industrySlug: "healthcare",
    boothTypeSlug: "modular",
    locationSlug: "jeddah",
    event: "Arab Health",
    size: "64 sqm",
    technologies: ["Modular system", "Demo stations"],
    featured: true,
    image: media.projects.aetherLabs.hero,
    imageAlt: "Healthcare exhibition environment with clean clinical presence",
    gallery: [...media.projects.aetherLabs.gallery],
    en: {
      title: "Aether Labs",
      category: "Healthcare",
      summary: "A calm modular booth for clinical demos and private conversations.",
      challenge:
        "Complex offerings were hard to present. The booth needed trust, clarity, and quiet meeting space.",
      approach:
        "We used a modular system with defined demo zones, soft hospitality areas, and precise brand graphics.",
      outcome:
        "Cleaner visitor journeys and a reusable kit for the healthcare calendar.",
    },
    ar: {
      title: "أثير لابز",
      category: "رعاية صحية",
      summary: "جناح معياري هادئ للعروض السريرية والمحادثات الخاصة.",
      challenge:
        "العروض المعقدة كانت صعبة التقديم. الجناح احتاج ثقة ووضوحاً ومساحة اجتماعات هادئة.",
      approach:
        "استخدمنا نظاماً معيارياً بمناطق عرض محددة ومناطق ضيافة ناعمة ورسومات علامة دقيقة.",
      outcome: "رحلات زوار أوضح ومجموعة قابلة لإعادة الاستخدام لتقويم الرعاية الصحية.",
    },
  },
  {
    slug: "qamar",
    year: "2024",
    industrySlug: "fmcg",
    boothTypeSlug: "kiosks",
    locationSlug: "dammam",
    event: "Hospitality Qatar",
    size: "36 sqm",
    technologies: ["Kiosk system", "Print graphics"],
    image: media.projects.qamar.hero,
    imageAlt: "Branded retail exhibition kiosk with premium lighting",
    gallery: [...media.projects.qamar.gallery],
    en: {
      title: "Qamar",
      category: "FMCG",
      summary: "A high-energy kiosk program for sampling and brand immersion.",
      challenge:
        "The brand needed attraction and throughput in a dense hospitality hall.",
      approach:
        "Compact kiosk architecture, large-format graphics, and a sampling counter designed for flow.",
      outcome:
        "Strong stop-rate and a portable kit ready for the next regional date.",
    },
    ar: {
      title: "قمر",
      category: "سلع استهلاكية",
      summary: "برنامج أكشاك عالي الطاقة للعينات والانغماس في العلامة.",
      challenge: "العلامة احتاجت جذباً وإنتاجية في قاعة ضيافة كثيفة.",
      approach:
        "عمارة كشك مدمجة ورسومات كبيرة الحجم وكاونتر عينات مصمم للتدفق.",
      outcome: "معدل توقف قوي ومجموعة محمولة جاهزة للموعد الإقليمي التالي.",
    },
  },
  {
    slug: "harbor-co",
    year: "2024",
    industrySlug: "energy",
    boothTypeSlug: "double-deck",
    locationSlug: "riyadh",
    event: "Saudi Energy",
    size: "200 sqm",
    technologies: ["Double-deck", "Meeting suites"],
    image: media.projects.harborCo.hero,
    imageAlt: "Large-scale energy pavilion with architectural presence",
    gallery: [...media.projects.harborCo.gallery],
    en: {
      title: "Harbor & Co.",
      category: "Energy",
      summary: "A double-deck pavilion for technical storytelling and VIP hospitality.",
      challenge:
        "A large footprint needed architectural confidence without losing clarity.",
      approach:
        "Two-level structure with upper meeting suites, ground-floor demos, and bold environmental branding.",
      outcome:
        "A landmark presence that hosted clients, media, and technical walkthroughs.",
    },
    ar: {
      title: "هاربر آند كو",
      category: "طاقة",
      summary: "جناح بطابقين للسرد التقني وضيافة VIP.",
      challenge: "مساحة كبيرة احتاجت ثقة معمارية دون فقدان الوضوح.",
      approach:
        "هيكل بمستويين مع أجنحة اجتماعات علوية وعروض في الطابق الأرضي وعلامة بيئية جريئة.",
      outcome: "حضور بارز استضاف العملاء والإعلام والجولات التقنية.",
    },
  },
  {
    slug: "pulse-retail",
    year: "2024",
    industrySlug: "fmcg",
    boothTypeSlug: "portable",
    locationSlug: "khobar",
    event: "Cairo Retail Week",
    size: "24 sqm",
    technologies: ["Portable kit", "Lightbox"],
    image: media.projects.pulseRetail.hero,
    imageAlt: "Premium retail display with illuminated branding",
    gallery: [...media.projects.pulseRetail.gallery],
    en: {
      title: "Pulse Retail",
      category: "Retail",
      summary: "A portable lightbox-led display system for fast retail activations.",
      challenge:
        "Weekly activations needed consistency without a full custom rebuild each time.",
      approach:
        "Lightweight structure, illuminated graphics, and a kit that ships and installs quickly.",
      outcome:
        "Faster redeploy and tighter brand recognition across the retail calendar.",
    },
    ar: {
      title: "بولس ريتيل",
      category: "تجزئة",
      summary: "نظام عرض محمول بقيادة lightbox لتفعيلات تجزئة سريعة.",
      challenge:
        "التفعيلات الأسبوعية احتاجت اتساقاً دون إعادة بناء مخصص في كل مرة.",
      approach:
        "هيكل خفيف ورسومات مضاءة ومجموعة تُشحن وتُركَّب بسرعة.",
      outcome: "إعادة نشر أسرع وتميّز أوضح عبر تقويم التجزئة.",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getLocalizedProject(project: Project, locale: "en" | "ar") {
  return {
    slug: project.slug,
    year: project.year,
    image: project.image,
    imageAlt: project.imageAlt,
    gallery: project.gallery,
    ...project[locale],
  };
}
