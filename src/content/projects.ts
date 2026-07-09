export type Project = {
  slug: string;
  year: string;
  image: string;
  imageAlt: string;
  gallery: string[];
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
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Abstract blue geometric composition",
    gallery: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1600&q=80",
    ],
    en: {
      title: "Northline",
      category: "Brand system",
      summary: "A precise identity system for a mobility platform expanding across the Gulf.",
      challenge: "Northline needed a brand that felt technical and human at once — clear enough for product UI, bold enough for outdoor campaigns.",
      approach: "We built a modular mark, a restrained type system, and a motion language that scales from app icons to airport takeovers.",
      outcome: "A complete brand toolkit now used across product, marketing, and partner ecosystems.",
    },
    ar: {
      title: "نورثلاين",
      category: "نظام علامة",
      summary: "نظام هوية دقيق لمنصة تنقّل تتوسع في الخليج.",
      challenge: "احتاجت نورثلاين علامة تجمع التقنية والإنسانية — واضحة لواجهة المنتج وجريئة للحملات الخارجية.",
      approach: "بنينا شعاراً معيارياً ونظام خطوط منضبط ولغة حركة تتوسع من أيقونة التطبيق إلى اللوحات الكبيرة.",
      outcome: "مجموعة أدوات علامة كاملة تُستخدم الآن عبر المنتج والتسويق وشركاء المنظومة.",
    },
  },
  {
    slug: "aether-labs",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Futuristic digital interface lighting",
    gallery: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80",
    ],
    en: {
      title: "Aether Labs",
      category: "Digital product",
      summary: "Product design and visual language for a research platform used by enterprise teams.",
      challenge: "Complex workflows were burying the product’s value. The interface needed clarity without losing depth.",
      approach: "We redesigned information hierarchy, introduced a calm visual system, and prototyped key flows with the product team.",
      outcome: "Faster onboarding, cleaner dashboards, and a design system ready for the next product line.",
    },
    ar: {
      title: "أثير لابز",
      category: "منتج رقمي",
      summary: "تصميم منتج ولغة بصرية لمنصة بحث تستخدمها فرق المؤسسات.",
      challenge: "التعقيد كان يخفي قيمة المنتج. الواجهة احتاجت وضوحاً دون أن تفقد العمق.",
      approach: "أعدنا ترتيب المعلومات، وأدخلنا نظاماً بصرياً هادئاً، وبنينا نماذج أولية للتدفقات الأساسية مع فريق المنتج.",
      outcome: "انضمام أسرع ولوحات أوضح ونظام تصميم جاهز لخط المنتجات التالي.",
    },
  },
  {
    slug: "qamar",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Warm cinematic night atmosphere",
    gallery: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    ],
    en: {
      title: "Qamar",
      category: "Campaign",
      summary: "A bilingual launch campaign for a cultural platform during Ramadan.",
      challenge: "The brand needed to feel contemporary while staying rooted in local ritual and language.",
      approach: "Art direction, film stills, and a flexible campaign kit for social, OOH, and partner activations.",
      outcome: "A cohesive seasonal presence that carried across every channel without losing warmth.",
    },
    ar: {
      title: "قمر",
      category: "حملة",
      summary: "حملة إطلاق ثنائية اللغة لمنصة ثقافية في رمضان.",
      challenge: "العلامة احتاجت أن تبدو معاصرة مع بقائها متجذّرة في الطقس المحلي واللغة.",
      approach: "إخراج فني ولقطات فيلمية وحزمة حملة مرنة لوسائل التواصل واللوحات الخارجية وتفعيلات الشركاء.",
      outcome: "حضور موسمي متماسك عبر كل القنوات دون أن يفقد الدفء.",
    },
  },
  {
    slug: "harbor-co",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Modern architecture interior with light",
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1460317440162-52393fabf222?auto=format&fit=crop&w=1600&q=80",
    ],
    en: {
      title: "Harbor & Co.",
      category: "Identity refresh",
      summary: "A quiet refresh for a hospitality group expanding into new cities.",
      challenge: "The existing identity felt dated and fragmented across properties.",
      approach: "We refined the mark, rebuilt the typography, and created a photography direction that unifies every location.",
      outcome: "A calmer, more premium system that still feels local in each city.",
    },
    ar: {
      title: "هاربر آند كو",
      category: "تحديث هوية",
      summary: "تحديث هادئ لمجموعة ضيافة تتوسع إلى مدن جديدة.",
      challenge: "الهوية السابقة بدت قديمة ومجزأة عبر الفروع.",
      approach: "نقّحنا الشعار وأعدنا بناء الخطوط ووضعنا اتجاهاً تصويرياً يوحّد كل موقع.",
      outcome: "نظام أهدأ وأكثر فخامة مع بقاء الإحساس المحلي في كل مدينة.",
    },
  },
  {
    slug: "pulse-retail",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80",
    imageAlt: "Retail space with soft lighting",
    gallery: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=1600&q=80",
    ],
    en: {
      title: "Pulse Retail",
      category: "Content system",
      summary: "An always-on content system for a retail brand with weekly drops.",
      challenge: "Production speed was killing consistency. Every week looked like a different brand.",
      approach: "Templates, art direction rules, and a motion kit that let the in-house team ship fast without drifting.",
      outcome: "Higher output, tighter brand recognition, and a system the team can run independently.",
    },
    ar: {
      title: "بولس ريتيل",
      category: "نظام محتوى",
      summary: "نظام محتوى مستمر لعلامة تجزئة بإصدارات أسبوعية.",
      challenge: "سرعة الإنتاج كانت تقتل الاتساق. كل أسبوع بدا كعلامة مختلفة.",
      approach: "قوالب وقواعد إخراج فني وحزمة حركة تمكّن الفريق الداخلي من النشر بسرعة دون انحراف.",
      outcome: "إنتاج أعلى وتميّز أوضح ونظام يستطيع الفريق تشغيله باستقلالية.",
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
