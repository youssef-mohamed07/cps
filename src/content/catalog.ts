import type { Locale } from "@/lib/i18n";
import { media } from "@/content/media";

export type ContentSeo = {
  title?: string;
  description?: string;
};

export type ServiceRecord = {
  slug: string;
  order: number;
  image: string;
  imageAlt: string;
  en: {
    title: string;
    excerpt: string;
    overview: string;
    benefits: { title: string; description: string }[];
    process: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    overview: string;
    benefits: { title: string; description: string }[];
    process: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
  };
};

export type BoothTypeFeature = {
  title: string;
  description: string;
};

export type BoothTypeRecord = {
  slug: string;
  order: number;
  image: string;
  imageAlt: string;
  model3d?: string;
  en: {
    title: string;
    excerpt: string;
    overviewTitle: string;
    description: string;
    features: BoothTypeFeature[];
    advantages: { title: string; description: string }[];
    useCases: string[];
    faq: { question: string; answer: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    overviewTitle: string;
    description: string;
    features: BoothTypeFeature[];
    advantages: { title: string; description: string }[];
    useCases: string[];
    faq: { question: string; answer: string }[];
  };
};

export type IndustryRecord = {
  slug: string;
  order: number;
  image: string;
  imageAlt: string;
  recommendedBoothTypeSlugs: string[];
  en: {
    title: string;
    excerpt: string;
    overview: string;
    challenges: { title: string; description: string }[];
    solutions: { title: string; description: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    overview: string;
    challenges: { title: string; description: string }[];
    solutions: { title: string; description: string }[];
  };
};

export type LocationRecord = {
  slug: string;
  order: number;
  countryCode: string;
  image: string;
  imageAlt: string;
  en: {
    title: string;
    excerpt: string;
    localExperience: string;
    capabilities: { title: string; description: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    localExperience: string;
    capabilities: { title: string; description: string }[];
  };
};

export type NewsRecord = {
  slug: string;
  publishedAt: string;
  readingTime: number;
  image: string;
  imageAlt: string;
  category: string;
  tags: string[];
  author: string;
  en: {
    title: string;
    excerpt: string;
    body: string[];
  };
  ar: {
    title: string;
    excerpt: string;
    body: string[];
  };
};

export const services: ServiceRecord[] = [
  {
    slug: "full-booth-management",
    order: 1,
    image: media.services.management,
    imageAlt: "Full booth management",
    en: {
      title: "Full Booth Management",
      excerpt: "End-to-end ownership from brief to teardown.",
      overview:
        "CPS manages the full exhibition booth lifecycle in-house — design, fabrication, install, dismantle, and storage — so you work with one accountable team.",
      benefits: [
        { title: "Single owner", description: "One team across every stage — no vendor handoffs." },
        { title: "On-time delivery", description: "In-house production keeps schedules under control." },
        { title: "Reuse ready", description: "Storage and reinstallation planned from day one." },
      ],
      process: [
        { title: "Brief", description: "Goals, footprint, brand, and event constraints." },
        { title: "Design & build", description: "Concept, engineering, and fabrication." },
        { title: "Install & support", description: "On-site setup, show support, and teardown." },
      ],
      faq: [
        {
          question: "Do you handle permits and venue coordination?",
          answer: "Yes. We coordinate with organizers and venues as part of full management.",
        },
      ],
    },
    ar: {
      title: "إدارة الجناح الكاملة",
      excerpt: "ملكية كاملة من الموجز إلى التفكيك.",
      overview:
        "CPS تدير دورة حياة جناح المعرض بالكامل داخلياً — تصميم وتصنيع وتركيب وتفكيك وتخزين — بفريق واحد مسؤول.",
      benefits: [
        { title: "مسؤول واحد", description: "فريق واحد عبر كل مرحلة — بلا تسليم بين موردين." },
        { title: "تسليم في الموعد", description: "الإنتاج الداخلي يبقي الجداول تحت السيطرة." },
        { title: "جاهز لإعادة الاستخدام", description: "التخزين وإعادة التركيب يُخططان من اليوم الأول." },
      ],
      process: [
        { title: "الموجز", description: "الأهداف والمساحة والعلامة وقيود الحدث." },
        { title: "تصميم وبناء", description: "مفهوم وهندسة وتصنيع." },
        { title: "تركيب ودعم", description: "إعداد في الموقع ودعم أثناء المعرض وتفكيك." },
      ],
      faq: [
        {
          question: "هل تتولون التصاريح والتنسيق مع الجهة المنظمة؟",
          answer: "نعم. ننسّق مع المنظمين والمواقع كجزء من الإدارة الكاملة.",
        },
      ],
    },
  },
  {
    slug: "booth-design",
    order: 2,
    image: media.services.design,
    imageAlt: "Booth design",
    en: {
      title: "Booth Design",
      excerpt: "Concepts and layouts built around your brand and floor plan.",
      overview:
        "From first sketches to build-ready drawings, we design booths that attract, guide, and convert visitors on the show floor.",
      benefits: [
        { title: "Brand-led", description: "Layouts that express your identity clearly." },
        { title: "Visitor flow", description: "Circulation planned for engagement and demos." },
        { title: "Buildable", description: "Designs engineered for real fabrication timelines." },
      ],
      process: [
        { title: "Discovery", description: "Brand, audience, and venue constraints." },
        { title: "Concept", description: "Options, mood, and spatial strategy." },
        { title: "Detailing", description: "Drawings, materials, and AV integration." },
      ],
      faq: [
        {
          question: "Can we review a 3D preview before build?",
          answer: "Yes. We present 3D views and walkthroughs before fabrication starts.",
        },
      ],
    },
    ar: {
      title: "تصميم الأجنحة",
      excerpt: "مفاهيم ومخططات مبنية حول علامتك ومخطط الأرضية.",
      overview:
        "من المسودات الأولى إلى رسومات جاهزة للبناء، نصمم أجنحة تجذب الزوار وتوجّههم وتحوّلهم على أرض المعرض.",
      benefits: [
        { title: "بقيادة العلامة", description: "مخططات تعبّر عن هويتك بوضوح." },
        { title: "تدفق الزوار", description: "حركة مخططة للتفاعل والعروض." },
        { title: "قابل للبناء", description: "تصاميم مهندسة لجداول تصنيع حقيقية." },
      ],
      process: [
        { title: "اكتشاف", description: "العلامة والجمهور وقيود الموقع." },
        { title: "مفهوم", description: "خيارات ومزاج واستراتيجية فراغية." },
        { title: "تفاصيل", description: "رسومات ومواد ودمج AV." },
      ],
      faq: [
        {
          question: "هل يمكن مراجعة معاينة ثلاثية الأبعاد قبل البناء؟",
          answer: "نعم. نقدّم مشاهد ثلاثية الأبعاد وجولات قبل بدء التصنيع.",
        },
      ],
    },
  },
  {
    slug: "custom-fabrication",
    order: 3,
    image: media.services.fabrication,
    imageAlt: "Custom fabrication",
    en: {
      title: "Custom Fabrication & Manufacturing",
      excerpt: "Built from scratch to match your brand and space.",
      overview:
        "In-house fabrication means tighter quality control, faster iteration, and booths engineered for the show — and the next one.",
      benefits: [
        { title: "In-house craft", description: "No outsourcing of critical build stages." },
        { title: "Material control", description: "Finishes and structures selected for durability." },
        { title: "AV embedded", description: "Tech and lighting planned into the build." },
      ],
      process: [
        { title: "Engineering", description: "Shop drawings and material specs." },
        { title: "Production", description: "Fabrication, finishing, and QC." },
        { title: "Pack & ship", description: "Crate, label, and stage for install." },
      ],
      faq: [
        {
          question: "Do you use sustainable materials?",
          answer: "Yes. We offer eco options and can prioritize reusable modular systems.",
        },
      ],
    },
    ar: {
      title: "تصنيع وتفصيل مخصص",
      excerpt: "يُبنى من الصفر ليتوافق مع علامتك ومساحتك.",
      overview:
        "التصنيع الداخلي يعني رقابة جودة أدق وتكراراً أسرع وأجنحة مهندسة للمعرض — وللمرة القادمة أيضاً.",
      benefits: [
        { title: "حِرفة داخلية", description: "بلا إسناد لمراحل البناء الحرجة." },
        { title: "تحكم بالمواد", description: "تشطيبات وهياكل مختارة للمتانة." },
        { title: "AV مدمج", description: "التقنية والإضاءة تُخططان ضمن البناء." },
      ],
      process: [
        { title: "هندسة", description: "رسومات ورشة ومواصفات مواد." },
        { title: "إنتاج", description: "تصنيع وتشطيب ومراقبة جودة." },
        { title: "تعبئة وشحن", description: "تغليف ووسم وتجهيز للتركيب." },
      ],
      faq: [
        {
          question: "هل تستخدمون مواد مستدامة؟",
          answer: "نعم. نوفر خيارات صديقة للبيئة ويمكننا إعطاء الأولوية للأنظمة المعيارية القابلة لإعادة الاستخدام.",
        },
      ],
    },
  },
  {
    slug: "installation-dismantling",
    order: 4,
    image: media.services.installation,
    imageAlt: "Installation and dismantling",
    en: {
      title: "Installation & Dismantling",
      excerpt: "On-site setup and careful teardown by our crew.",
      overview:
        "Our install teams arrive early, build cleanly, and dismantle with the next show in mind — protecting assets and timelines.",
      benefits: [
        { title: "Venue-ready", description: "Crews familiar with exhibition logistics." },
        { title: "Safe teardown", description: "Components protected for reuse." },
        { title: "Show support", description: "On-floor adjustments when needed." },
      ],
      process: [
        { title: "Site survey", description: "Access, power, and schedule alignment." },
        { title: "Install", description: "Build, dress, and test before doors open." },
        { title: "Dismantle", description: "Teardown, inventory, and outbound logistics." },
      ],
      faq: [
        {
          question: "Do you work overnight install windows?",
          answer: "Yes. We plan crews around venue access windows, including overnight builds.",
        },
      ],
    },
    ar: {
      title: "التركيب والتفكيك",
      excerpt: "إعداد في الموقع وتفكيك دقيق بفريقنا.",
      overview:
        "فرق التركيب تصل مبكراً وتبني بوضوح وتفكّك مع مراعاة المعرض التالي — لحماية الأصول والجداول.",
      benefits: [
        { title: "جاهز للموقع", description: "فرق معتادة على لوجستيات المعارض." },
        { title: "تفكيك آمن", description: "مكونات محمية لإعادة الاستخدام." },
        { title: "دعم أثناء المعرض", description: "تعديلات على الأرض عند الحاجة." },
      ],
      process: [
        { title: "مسح الموقع", description: "الوصول والطاقة ومواءمة الجدول." },
        { title: "تركيب", description: "بناء وتجهيز واختبار قبل الافتتاح." },
        { title: "تفكيك", description: "إنزال وجرد ولوجستيات الخروج." },
      ],
      faq: [
        {
          question: "هل تعملون في نوافذ تركيب ليلية؟",
          answer: "نعم. نخطط الفرق وفق نوافذ وصول الموقع، بما في ذلك البناء الليلي.",
        },
      ],
    },
  },
  {
    slug: "storage-reinstallation",
    order: 5,
    image: media.services.storage,
    imageAlt: "Storage and reinstallation",
    en: {
      title: "Storage & Reinstallation",
      excerpt: "Safe storage and redeploy for the next show.",
      overview:
        "Keep your booth investment working across seasons with inventory, storage, refresh, and reinstall programs.",
      benefits: [
        { title: "Asset care", description: "Tracked inventory and protected storage." },
        { title: "Faster redeploy", description: "Known kits reinstall with less risk." },
        { title: "Refresh options", description: "Update graphics and modules between shows." },
      ],
      process: [
        { title: "Intake", description: "Inventory, condition check, and labeling." },
        { title: "Store", description: "Secure storage until the next event." },
        { title: "Redeploy", description: "Refresh, ship, and reinstall." },
      ],
      faq: [
        {
          question: "How long can you store a booth?",
          answer: "We offer flexible storage terms — from one show cycle to multi-year programs.",
        },
      ],
    },
    ar: {
      title: "التخزين وإعادة التركيب",
      excerpt: "تخزين آمن وإعادة نشر للمعرض القادم.",
      overview:
        "أبقِ استثمار جناحك يعمل عبر المواسم عبر برامج الجرد والتخزين والتحديث وإعادة التركيب.",
      benefits: [
        { title: "رعاية الأصول", description: "جرد متتبع وتخزين محمي." },
        { title: "إعادة نشر أسرع", description: "مجموعات معروفة تُعاد بتركيب أقل مخاطرة." },
        { title: "خيارات تحديث", description: "تحديث الرسومات والوحدات بين المعارض." },
      ],
      process: [
        { title: "استلام", description: "جرد وفحص حالة ووسم." },
        { title: "تخزين", description: "تخزين آمن حتى الحدث التالي." },
        { title: "إعادة نشر", description: "تحديث وشحن وإعادة تركيب." },
      ],
      faq: [
        {
          question: "كم يمكنكم تخزين الجناح؟",
          answer: "نوفر شروط تخزين مرنة — من دورة معرض واحدة إلى برامج متعددة السنوات.",
        },
      ],
    },
  },
  {
    slug: "visual-branding-print",
    order: 6,
    image: media.services.branding,
    imageAlt: "Visual branding and print",
    en: {
      title: "Visual Branding & Print Solutions",
      excerpt: "Decals, banners, flags, and window graphics.",
      overview:
        "Print and environmental graphics that keep your booth on-brand from fascia to floor.",
      benefits: [
        { title: "Color fidelity", description: "Production matched to brand standards." },
        { title: "Show durability", description: "Materials selected for traffic and lighting." },
        { title: "Fast refresh", description: "Swap graphics between events without full rebuilds." },
      ],
      process: [
        { title: "Artwork", description: "Templates, proofs, and brand checks." },
        { title: "Produce", description: "Print, finish, and quality control." },
        { title: "Apply", description: "Install on-site or pre-dress in the shop." },
      ],
      faq: [
        {
          question: "Can you match existing brand guidelines?",
          answer: "Yes. We work from your brand book and approved artwork files.",
        },
      ],
    },
    ar: {
      title: "الهوية البصرية والطباعة",
      excerpt: "ملصقات ولافتات وأعلام ورسومات نوافذ.",
      overview:
        "طباعة ورسومات بيئية تبقي جناحك متسقاً مع العلامة من الواجهة إلى الأرضية.",
      benefits: [
        { title: "دقة الألوان", description: "إنتاج مطابق لمعايير العلامة." },
        { title: "متانة المعرض", description: "مواد مختارة للحركة والإضاءة." },
        { title: "تحديث سريع", description: "تبديل الرسومات بين الأحداث دون إعادة بناء كاملة." },
      ],
      process: [
        { title: "أعمال فنية", description: "قوالب وبروفات وفحوصات علامة." },
        { title: "إنتاج", description: "طباعة وتشطيب ومراقبة جودة." },
        { title: "تطبيق", description: "تركيب في الموقع أو تجهيز مسبق في الورشة." },
      ],
      faq: [
        {
          question: "هل يمكنكم مطابقة دليل العلامة الحالي؟",
          answer: "نعم. نعمل من دليل علامتكم وملفات الأعمال الفنية المعتمدة.",
        },
      ],
    },
  },
  {
    slug: "lightbox-retail-display",
    order: 7,
    image: media.services.lightbox,
    imageAlt: "Lightbox and retail display",
    en: {
      title: "Lightbox Signage & Retail Display Solutions",
      excerpt: "LED signage that gets your brand noticed.",
      overview:
        "Lightboxes and retail-ready displays that extend your presence beyond the booth footprint.",
      benefits: [
        { title: "High visibility", description: "Illuminated messaging that cuts through the hall." },
        { title: "Modular frames", description: "Systems that travel and reconfigure easily." },
        { title: "Retail crossover", description: "Solutions that work in stores and showrooms too." },
      ],
      process: [
        { title: "Specify", description: "Size, brightness, and mounting." },
        { title: "Build", description: "Frames, LEDs, and graphic faces." },
        { title: "Install", description: "Power, alignment, and final check." },
      ],
      faq: [
        {
          question: "Are lightboxes available as standalone products?",
          answer: "Yes. They can ship with a booth or as standalone retail/signage packages.",
        },
      ],
    },
    ar: {
      title: "لافتات Lightbox وحلول العرض للتجزئة",
      excerpt: "لافتات LED تلفت الانتباه لعلامتك.",
      overview:
        "صناديق إضاءة وعروض جاهزة للتجزئة توسّع حضورك خارج مساحة الجناح.",
      benefits: [
        { title: "ظهور عالٍ", description: "رسائل مضاءة تخترق ضجيج القاعة." },
        { title: "إطارات معيارية", description: "أنظمة تنتقل وتُعاد تهيئتها بسهولة." },
        { title: "عبور للتجزئة", description: "حلول تعمل في المتاجر وصالات العرض أيضاً." },
      ],
      process: [
        { title: "تحديد", description: "الحجم والسطوع والتثبيت." },
        { title: "بناء", description: "إطارات وLED وواجهات رسومية." },
        { title: "تركيب", description: "طاقة ومحاذاة وفحص نهائي." },
      ],
      faq: [
        {
          question: "هل الـ lightbox متاحة كمنتجات مستقلة؟",
          answer: "نعم. يمكن شحنها مع الجناح أو كحزم لافتات/تجزئة مستقلة.",
        },
      ],
    },
  },
];

export const boothTypes: BoothTypeRecord[] = [
  {
    slug: "custom",
    order: 1,
    image: media.boothTypes.custom,
    imageAlt: "Custom exhibition booth",
    en: {
      title: "Custom-Built Booths in {City}",
      excerpt: "Fully bespoke booths, designed and built around your brand.",
      overviewTitle: "No Templates. Just Your Booth.",
      description: "Built from scratch, shaped entirely around your goals.",
      features: [
        {
          title: "Fully Bespoke",
          description: "No reused molds or templates, every booth is original.",
        },
        {
          title: "Built for Impact",
          description: "Designed to stand out on a crowded show floor.",
        },
        {
          title: "Any Size, Any Shape",
          description: "Built to fit your space exactly.",
        },
        {
          title: "One Team, Full Control",
          description: "Design and fabrication under one roof.",
        },
      ],
      advantages: [
        {
          title: "Custom Design",
          description: "A concept built entirely around your brand and goals.",
        },
        {
          title: "Structural Fabrication",
          description: "Built from the ground up, not adapted from existing frames.",
        },
        {
          title: "Branding Integration",
          description: "Every surface and detail carries your identity.",
        },
        {
          title: "Premium Finishes",
          description: "Materials and textures chosen to match your brand's positioning.",
        },
      ],
      useCases: [
        "Flagship presence at major exhibitions",
        "Brands wanting a standout, memorable booth",
        "Events where the booth itself is part of the brand statement",
        "Clients with specific space or design requirements standard booths can't meet",
      ],
      faq: [
        {
          question: "How is a custom-built booth different from a modular one?",
          answer:
            "A custom-built booth is designed and fabricated entirely from scratch for your specific brand and space — nothing is reused from a standard system.",
        },
        {
          question: "How long does a custom booth take to build?",
          answer:
            "Timelines depend on size and complexity — we'll confirm a clear schedule once your design is finalized.",
        },
        {
          question: "Can a custom-built booth be reused for future events?",
          answer:
            "Yes, with proper storage and reinstallation, most custom booths can be used again.",
        },
        {
          question: "What's the size range for custom booths?",
          answer:
            "There's no fixed limit — custom booths are built to whatever footprint your event requires.",
        },
        {
          question:
            "Do you handle custom booths for international exhibitions, or only in Saudi Arabia?",
          answer:
            "Our current focus is delivery across Saudi Arabia — let us know your event location and we'll confirm feasibility.",
        },
      ],
    },
    ar: {
      title: "أجنحة مخصصة بالكامل في {City}",
      excerpt: "أجنحة مصممة ومبنية بالكامل حول علامتك.",
      overviewTitle: "بلا قوالب. جناحك فقط.",
      description: "يُبنى من الصفر، ويُشكَّل بالكامل حول أهدافك.",
      features: [
        {
          title: "مخصص بالكامل",
          description: "بدون قوالب أو نماذج معاد استخدامها، كل جناح أصلي.",
        },
        {
          title: "مصمم للأثر",
          description: "مصمم ليبرز وسط أرض معرض مزدحمة.",
        },
        {
          title: "أي حجم وأي شكل",
          description: "يُبنى ليلائم مساحتك بالضبط.",
        },
        {
          title: "فريق واحد وتحكم كامل",
          description: "التصميم والتصنيع تحت سقف واحد.",
        },
      ],
      advantages: [
        {
          title: "تصميم مخصص",
          description: "مفهوم يُبنى بالكامل حول علامتك وأهدافك.",
        },
        {
          title: "تصنيع إنشائي",
          description: "يُبنى من الأساس، لا يُعدَّل من إطارات قائمة.",
        },
        {
          title: "دمج الهوية",
          description: "كل سطح وتفصيل يحمل هويتك.",
        },
        {
          title: "تشطيبات فاخرة",
          description: "مواد وملامس مختارة لتطابق موقع علامتك.",
        },
      ],
      useCases: [
        "حضور رئيسي في المعارض الكبرى",
        "علامات تريد جناحاً مميزاً لا يُنسى",
        "فعاليات يكون الجناح نفسه جزءاً من رسالة العلامة",
        "عملاء لديهم متطلبات مساحة أو تصميم لا تلبيها الأجنحة القياسية",
      ],
      faq: [
        {
          question: "ما الفرق بين الجناح المخصص والجناح المعياري؟",
          answer:
            "الجناح المخصص يُصمَّم ويُصنَّع بالكامل من الصفر لعلامتك ومساحتك تحديداً — دون إعادة استخدام من نظام قياسي.",
        },
        {
          question: "كم يستغرق بناء جناح مخصص؟",
          answer:
            "الجداول تعتمد على الحجم والتعقيد — سنؤكد جدولاً واضحاً بعد اعتماد التصميم.",
        },
        {
          question: "هل يمكن إعادة استخدام الجناح المخصص في فعاليات لاحقة؟",
          answer:
            "نعم، مع التخزين وإعادة التركيب المناسبين يمكن استخدام معظم الأجنحة المخصصة مرة أخرى.",
        },
        {
          question: "ما نطاق أحجام الأجنحة المخصصة؟",
          answer:
            "لا يوجد حد ثابت — تُبنى الأجنحة المخصصة وفق المساحة التي تتطلبها فعاليتك.",
        },
        {
          question: "هل تنفّذون أجنحة مخصصة لمعارض دولية، أم في السعودية فقط؟",
          answer:
            "تركيزنا الحالي هو التنفيذ عبر السعودية — أخبرنا بموقع فعاليتك وسنؤكد إمكانية التنفيذ.",
        },
      ],
    },
  },
  {
    slug: "modular",
    order: 2,
    image: media.boothTypes.modular,
    imageAlt: "Modular system booth",
    en: {

      title: "Modular / System Booths",
      excerpt: "Flexible systems that reconfigure across events.",
      overviewTitle: "Built for stronger presence on the show floor.",
      description:
        "Modular booths balance speed, cost, and brand impact — ideal when you need repeatable presence across a season.",
      features: [
        { title: "Reconfigurable frames", description: "" },
        { title: "Fast install", description: "" },
        { title: "Graphic refresh", description: "" },
        { title: "Scalable footprints", description: "" },
      ],
      advantages: [
        { title: "Efficiency", description: "Lower cost per show over a season." },
        { title: "Speed", description: "Faster install and teardown windows." },
      ],
      useCases: ["Multi-show calendars", "Regional tours", "Growing brands"],
      faq: [],
    },
    ar: {

      title: "أجنحة معيارية / نظام",
      excerpt: "أنظمة مرنة تُعاد تهيئتها عبر الأحداث.",
      overviewTitle: "صُمم هذا النوع لحضور أقوى على أرض المعرض.",
      description:
        "الأجنحة المعيارية توازن السرعة والتكلفة وأثر العلامة — مثالية عندما تحتاج حضوراً متكرراً عبر الموسم.",
      features: [
        { title: "إطارات قابلة لإعادة التهيئة", description: "" },
        { title: "تركيب سريع", description: "" },
        { title: "تحديث رسومي", description: "" },
        { title: "مساحات قابلة للتوسع", description: "" },
      ],
      advantages: [
        { title: "كفاءة", description: "تكلفة أقل لكل معرض عبر الموسم." },
        { title: "سرعة", description: "نوافذ تركيب وتفكيك أسرع." },
      ],
      useCases: ["تقويمات متعددة المعارض", "جولات إقليمية", "علامات نامية"],
      faq: [],
    },
  },
  {
    slug: "double-deck",
    order: 3,
    image: media.boothTypes.doubleDeck,
    imageAlt: "Double-deck booth",
    en: {

      title: "Double-Deck Booths",
      excerpt: "Two levels for meetings, demos, and presence.",
      overviewTitle: "Built for stronger presence on the show floor.",
      description:
        "Double-deck designs maximize footprint value with private upper floors for hospitality and negotiation.",
      features: [
        { title: "Upper meeting suites", description: "" },
        { title: "Structural engineering", description: "" },
        { title: "Stair & lift options", description: "" },
        { title: "High visibility", description: "" },
      ],
      advantages: [
        { title: "Space efficiency", description: "More usable area on the same plot." },
        { title: "Privacy", description: "Quiet rooms above the show floor noise." },
      ],
      useCases: ["Large footprints", "VIP hospitality", "Complex demos"],
      faq: [],
    },
    ar: {

      title: "أجنحة طابقين",
      excerpt: "مستويان للاجتماعات والعروض والحضور.",
      overviewTitle: "صُمم هذا النوع لحضور أقوى على أرض المعرض.",
      description:
        "تصاميم الطابقين تعظّم قيمة المساحة بطوابق علوية خاصة للضيافة والتفاوض.",
      features: [
        { title: "أجنحة اجتماعات علوية", description: "" },
        { title: "هندسة إنشائية", description: "" },
        { title: "خيارات درج ومصعد", description: "" },
        { title: "ظهور عالٍ", description: "" },
      ],
      advantages: [
        { title: "كفاءة المساحة", description: "مساحة قابلة للاستخدام أكبر على نفس القطعة." },
        { title: "خصوصية", description: "غرف هادئة فوق ضجيج أرض المعرض." },
      ],
      useCases: ["مساحات كبيرة", "ضيافة VIP", "عروض معقدة"],
      faq: [],
    },
  },
  {
    slug: "portable",
    order: 4,
    image: media.boothTypes.portable,
    imageAlt: "Portable pop-up display",
    en: {

      title: "Portable & Pop-Up Displays",
      excerpt: "Lightweight kits for fast regional presence.",
      overviewTitle: "Built for stronger presence on the show floor.",
      description:
        "Portable systems for teams that need sharp brand presence without a full custom build every time.",
      features: [
        { title: "Lightweight kits", description: "" },
        { title: "Quick setup", description: "" },
        { title: "Travel cases", description: "" },
        { title: "Graphic packs", description: "" },
      ],
      advantages: [
        { title: "Mobility", description: "Easy to ship and redeploy." },
        { title: "Budget control", description: "Strong presence at lower cost." },
      ],
      useCases: ["Roadshows", "Partner events", "Small footprints"],
      faq: [],
    },
    ar: {

      title: "عروض محمولة و Pop-Up",
      excerpt: "مجموعات خفيفة لحضور إقليمي سريع.",
      overviewTitle: "صُمم هذا النوع لحضور أقوى على أرض المعرض.",
      description:
        "أنظمة محمولة للفرق التي تحتاج حضوراً واضحاً للعلامة دون بناء مخصص كامل في كل مرة.",
      features: [
        { title: "مجموعات خفيفة", description: "" },
        { title: "إعداد سريع", description: "" },
        { title: "حقائب سفر", description: "" },
        { title: "حزم رسومية", description: "" },
      ],
      advantages: [
        { title: "تنقّل", description: "سهولة الشحن وإعادة النشر." },
        { title: "تحكم بالميزانية", description: "حضور قوي بتكلفة أقل." },
      ],
      useCases: ["جولات", "فعاليات شركاء", "مساحات صغيرة"],
      faq: [],
    },
  },
  {
    slug: "kiosks",
    order: 5,
    image: media.boothTypes.kiosk,
    imageAlt: "Exhibition kiosk",
    en: {

      title: "Exhibition Kiosks",
      excerpt: "Compact stands for focused engagement.",
      overviewTitle: "Built for stronger presence on the show floor.",
      description:
        "Kiosks and small-footprint stands designed for lead capture, demos, and retail-like interactions.",
      features: [
        { title: "Compact footprints", description: "" },
        { title: "Counter & storage", description: "" },
        { title: "Screen mounts", description: "" },
        { title: "Brand fascia", description: "" },
      ],
      advantages: [
        { title: "Focus", description: "One clear job for visitors." },
        { title: "Density", description: "High impact in limited square meters." },
      ],
      useCases: ["Lead capture", "Product demos", "Retail corners"],
      faq: [],
    },
    ar: {

      title: "أكشاك المعارض",
      excerpt: "أكشاك مدمجة لتفاعل مركّز.",
      overviewTitle: "صُمم هذا النوع لحضور أقوى على أرض المعرض.",
      description:
        "أكشاك ومساحات صغيرة مصممة لالتقاط العملاء والعروض وتفاعلات شبيهة بالتجزئة.",
      features: [
        { title: "مساحات مدمجة", description: "" },
        { title: "كاونتر وتخزين", description: "" },
        { title: "حوامل شاشات", description: "" },
        { title: "واجهة علامة", description: "" },
      ],
      advantages: [
        { title: "تركيز", description: "مهمة واحدة واضحة للزوار." },
        { title: "كثافة", description: "أثر عالٍ في أمتار مربعة محدودة." },
      ],
      useCases: ["التقاط عملاء", "عروض منتج", "زوايا تجزئة"],
      faq: [],
    },
  },
  {
    slug: "outdoor",
    order: 6,
    image: media.boothTypes.outdoor,
    imageAlt: "Outdoor activation",
    en: {

      title: "Outdoor Structures & Brand Activations",
      excerpt: "Weather-ready structures for outdoor events.",
      overviewTitle: "Built for stronger presence on the show floor.",
      description:
        "Outdoor builds and activations engineered for visibility, flow, and environmental conditions.",
      features: [
        { title: "Weather considerations", description: "" },
        { title: "Large-format branding", description: "" },
        { title: "Crowd flow", description: "" },
        { title: "Power & AV", description: "" },
      ],
      advantages: [
        { title: "Scale", description: "Presence that reads from a distance." },
        { title: "Experience", description: "Activations beyond a standard booth." },
      ],
      useCases: ["Festivals", "Outdoor expos", "Brand experiences"],
      faq: [],
    },
    ar: {

      title: "هياكل خارجية وتفعيلات علامة",
      excerpt: "هياكل جاهزة للطقس للفعاليات الخارجية.",
      overviewTitle: "صُمم هذا النوع لحضور أقوى على أرض المعرض.",
      description:
        "بناء خارجي وتفعيلات مهندسة للظهور والتدفق وظروف البيئة.",
      features: [
        { title: "اعتبارات الطقس", description: "" },
        { title: "علامة كبيرة الحجم", description: "" },
        { title: "تدفق الحشود", description: "" },
        { title: "طاقة وAV", description: "" },
      ],
      advantages: [
        { title: "مقياس", description: "حضور يُقرأ من مسافة." },
        { title: "تجربة", description: "تفعيلات تتجاوز الجناح التقليدي." },
      ],
      useCases: ["مهرجانات", "معارض خارجية", "تجارب علامة"],
      faq: [],
    },
  },
  {
    slug: "pavilions",
    order: 7,
    image: media.boothTypes.pavilion,
    imageAlt: "National pavilion",
    en: {

      title: "Country / National Pavilions",
      excerpt: "Large-scale pavilions for national presence.",
      overviewTitle: "Built for stronger presence on the show floor.",
      description:
        "Pavilion programs that represent countries and institutions with architecture, content, and hospitality at scale.",
      features: [
        { title: "Large architecture", description: "" },
        { title: "Multi-zone planning", description: "" },
        { title: "Content integration", description: "" },
        { title: "VIP hospitality", description: "" },
      ],
      advantages: [
        { title: "Representation", description: "A coherent national or institutional story." },
        { title: "Capacity", description: "Space for audiences, media, and dignitaries." },
      ],
      useCases: ["Expos", "National days", "Institutional showcases"],
      faq: [],
    },
    ar: {

      title: "أجنحة / أجنحة وطنية",
      excerpt: "أجنحة واسعة للحضور الوطني.",
      overviewTitle: "صُمم هذا النوع لحضور أقوى على أرض المعرض.",
      description:
        "برامج أجنحة تمثّل الدول والمؤسسات بعمارة ومحتوى وضيافة على نطاق واسع.",
      features: [
        { title: "عمارة كبيرة", description: "" },
        { title: "تخطيط متعدد المناطق", description: "" },
        { title: "دمج محتوى", description: "" },
        { title: "ضيافة VIP", description: "" },
      ],
      advantages: [
        { title: "تمثيل", description: "قصة وطنية أو مؤسسية متماسكة." },
        { title: "سعة", description: "مساحة للجمهور والإعلام وكبار الزوار." },
      ],
      useCases: ["إكسبو", "أيام وطنية", "عروض مؤسسية"],
      faq: [],
    },
  },
  {
    slug: "sustainable",
    order: 8,
    image: media.boothTypes.sustainable,
    imageAlt: "Sustainable eco booth",
    en: {

      title: "Sustainable / Eco Booths",
      excerpt: "Lower-impact builds designed for reuse.",
      overviewTitle: "Built for stronger presence on the show floor.",
      description:
        "Sustainable booth strategies using reusable systems, responsible materials, and designs that live beyond a single show.",
      features: [
        { title: "Reusable modules", description: "" },
        { title: "Responsible materials", description: "" },
        { title: "Reduced waste", description: "" },
        { title: "Lifecycle planning", description: "" },
      ],
      advantages: [
        { title: "Impact", description: "Lower environmental footprint per show." },
        { title: "Value", description: "Assets that return across multiple events." },
      ],
      useCases: ["ESG-led brands", "Repeat exhibitors", "Long-term programs"],
      faq: [],
    },
    ar: {

      title: "أجنحة مستدامة / eco",
      excerpt: "بناء أقل أثراً مصمم لإعادة الاستخدام.",
      overviewTitle: "صُمم هذا النوع لحضور أقوى على أرض المعرض.",
      description:
        "استراتيجيات أجنحة مستدامة باستخدام أنظمة قابلة لإعادة الاستخدام ومواد مسؤولة وتصاميم تدوم أبعد من معرض واحد.",
      features: [
        { title: "وحدات قابلة لإعادة الاستخدام", description: "" },
        { title: "مواد مسؤولة", description: "" },
        { title: "نفايات أقل", description: "" },
        { title: "تخطيط دورة حياة", description: "" },
      ],
      advantages: [
        { title: "أثر", description: "بصمة بيئية أقل لكل معرض." },
        { title: "قيمة", description: "أصول تعود عبر أحداث متعددة." },
      ],
      useCases: ["علامات بقيادة ESG", "عارضون متكررون", "برامج طويلة الأمد"],
      faq: [],
    },
  },
];

export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getBoothType(slug: string) {
  return boothTypes.find((item) => item.slug === slug);
}

export function localizeService(service: ServiceRecord, locale: Locale) {
  return { ...service, ...service[locale], image: service.image, imageAlt: service.imageAlt, slug: service.slug };
}

export function localizeBoothType(boothType: BoothTypeRecord, locale: Locale) {
  return {
    ...boothType,
    ...boothType[locale],
    image: boothType.image,
    imageAlt: boothType.imageAlt,
    slug: boothType.slug,
  };
}

/** Replace `{City}` in a booth-type title, or strip it when no city is provided. */
export function formatBoothTypeTitle(title: string, city?: string) {
  if (title.includes("{City}")) {
    if (city) return title.replaceAll("{City}", city);
    return title
      .replace(/\s*in \{City\}/gi, "")
      .replace(/\s*في \{City\}/g, "")
      .trim();
  }
  return title;
}

export const industries: IndustryRecord[] = [
  {
    slug: "technology",
    order: 1,
    image: media.industries.technology,
    imageAlt: "Technology exhibition booth",
    recommendedBoothTypeSlugs: ["custom", "double-deck", "modular"],
    en: {
      title: "Technology & Electronics",
      excerpt: "Booths built for demos, launches, and high-traffic tech shows.",
      overview:
        "Technology exhibitors need clear demo zones, AV reliability, and a presence that reads as innovative without chaos.",
      challenges: [
        { title: "Demo density", description: "Too many products fighting for attention." },
        { title: "AV risk", description: "Power, screens, and lighting must work under show pressure." },
      ],
      solutions: [
        { title: "Zoned storytelling", description: "Clear paths from attraction to conversion." },
        { title: "Integrated tech", description: "AV planned into the structure from day one." },
      ],
    },
    ar: {
      title: "التقنية والإلكترونيات",
      excerpt: "أجنحة مبنية للعروض والإطلاقات ومعارض التقنية عالية الحركة.",
      overview:
        "عارضو التقنية يحتاجون مناطق عرض واضحة وموثوقية AV وحضوراً يقرأ كابتكار دون فوضى.",
      challenges: [
        { title: "كثافة العروض", description: "منتجات كثيرة تتنافس على الانتباه." },
        { title: "مخاطر AV", description: "الطاقة والشاشات والإضاءة يجب أن تعمل تحت ضغط المعرض." },
      ],
      solutions: [
        { title: "سرد مناطقي", description: "مسارات واضحة من الجذب إلى التحويل." },
        { title: "تقنية مدمجة", description: "AV يُخطط ضمن الهيكل من اليوم الأول." },
      ],
    },
  },
  {
    slug: "healthcare",
    order: 2,
    image: media.industries.healthcare,
    imageAlt: "Healthcare exhibition booth",
    recommendedBoothTypeSlugs: ["modular", "custom", "kiosks"],
    en: {
      title: "Healthcare & Pharma",
      excerpt: "Compliant, calm environments for clinical and commercial conversations.",
      overview:
        "Healthcare brands need trust, privacy for discussions, and materials that feel precise and professional.",
      challenges: [
        { title: "Trust signals", description: "The space must feel clinical and credible." },
        { title: "Private talks", description: "Meeting rooms without losing floor presence." },
      ],
      solutions: [
        { title: "Quiet hospitality", description: "Meeting suites and soft zones for longer conversations." },
        { title: "Clear hierarchy", description: "Messaging that prioritizes science and outcomes." },
      ],
    },
    ar: {
      title: "الرعاية الصحية والأدوية",
      excerpt: "بيئات هادئة ومتوافقة للمحادثات السريرية والتجارية.",
      overview:
        "علامات الرعاية الصحية تحتاج ثقة وخصوصية للنقاشات ومواد تبدو دقيقة ومهنية.",
      challenges: [
        { title: "إشارات الثقة", description: "المساحة يجب أن تبدو سريرية وموثوقة." },
        { title: "محادثات خاصة", description: "غرف اجتماعات دون فقدان الحضور على الأرض." },
      ],
      solutions: [
        { title: "ضيافة هادئة", description: "أجنحة اجتماعات ومناطق ناعمة لمحادثات أطول." },
        { title: "تسلسل واضح", description: "رسائل تعطي الأولوية للعلم والنتائج." },
      ],
    },
  },
  {
    slug: "energy",
    order: 3,
    image: media.industries.energy,
    imageAlt: "Energy sector pavilion",
    recommendedBoothTypeSlugs: ["custom", "pavilions", "outdoor"],
    en: {
      title: "Energy & Industrial",
      excerpt: "Large-scale presence for industrial and energy programs.",
      overview:
        "Energy and industrial exhibitors often need scale, structural confidence, and space for technical storytelling.",
      challenges: [
        { title: "Scale", description: "Large footprints that still feel intentional." },
        { title: "Technical depth", description: "Complex offerings need clear narrative layers." },
      ],
      solutions: [
        { title: "Architectural presence", description: "Structures that signal capability at a distance." },
        { title: "Layered content", description: "From headline impact to deep technical rooms." },
      ],
    },
    ar: {
      title: "الطاقة والصناعة",
      excerpt: "حضور واسع لبرامج الطاقة والصناعة.",
      overview:
        "عارضو الطاقة والصناعة غالباً يحتاجون مقياساً وثقة إنشائية ومساحة لسرد تقني.",
      challenges: [
        { title: "المقياس", description: "مساحات كبيرة تبقى مقصودة." },
        { title: "عمق تقني", description: "عروض معقدة تحتاج طبقات سرد واضحة." },
      ],
      solutions: [
        { title: "حضور معماري", description: "هياكل تشير إلى القدرة من مسافة." },
        { title: "محتوى طبقي", description: "من أثر العنوان إلى غرف تقنية عميقة." },
      ],
    },
  },
  {
    slug: "fmcg",
    order: 4,
    image: media.industries.fmcg,
    imageAlt: "FMCG retail booth",
    recommendedBoothTypeSlugs: ["kiosks", "portable", "modular"],
    en: {
      title: "FMCG & Retail",
      excerpt: "High-energy stands for sampling, launches, and retail brands.",
      overview:
        "Retail and FMCG booths win on attraction, sampling flow, and brand immersion that feels shoppable.",
      challenges: [
        { title: "Attraction", description: "Compete with dense neighboring stands." },
        { title: "Throughput", description: "Move visitors through sampling without bottlenecks." },
      ],
      solutions: [
        { title: "Retail logic", description: "Counters, storage, and flow designed like a store." },
        { title: "Graphic punch", description: "Fast-read branding that works in crowded halls." },
      ],
    },
    ar: {
      title: "السلع الاستهلاكية والتجزئة",
      excerpt: "أكشاك عالية الطاقة للعينات والإطلاقات وعلامات التجزئة.",
      overview:
        "أجنحة التجزئة والسلع الاستهلاكية تفوز بالجذب وتدفق العينات والانغماس في العلامة بإحساس قابل للتسوق.",
      challenges: [
        { title: "الجذب", description: "المنافسة مع أكشاك مجاورة كثيفة." },
        { title: "الإنتاجية", description: "تحريك الزوار عبر العينات دون اختناقات." },
      ],
      solutions: [
        { title: "منطق التجزئة", description: "كاونترات وتخزين وتدفق مصممة كمتجر." },
        { title: "قوة رسومية", description: "علامة سريعة القراءة تعمل في قاعات مزدحمة." },
      ],
    },
  },
];

export const locations: LocationRecord[] = [
  {
    slug: "riyadh",
    order: 1,
    countryCode: "SA",
    image: media.locations.riyadh,
    imageAlt: "Exhibition booth delivery in Riyadh",
    en: {
      title: "Riyadh",
      excerpt: "Capital shows, venues, and year-round exhibition calendars.",
      localExperience:
        "Riyadh is our primary delivery base — in-house production with crews experienced across the city's major venues and national exhibition calendar.",
      capabilities: [
        { title: "Venue-ready crews", description: "Install teams familiar with Riyadh venues, access rules, and show schedules." },
        { title: "In-house production", description: "Design through fabrication under one roof for tighter quality and timelines." },
        { title: "National show support", description: "Flagship programs and recurring exhibitor builds across the Riyadh calendar." },
      ],
    },
    ar: {
      title: "الرياض",
      excerpt: "معارض العاصمة والمواقع وتقويم المعارض على مدار السنة.",
      localExperience:
        "الرياض قاعدتنا الأساسية للتسليم — إنتاج داخلي وفرق ذات خبرة عبر أبرز مواقع المدينة وتقويم المعارض الوطني.",
      capabilities: [
        { title: "فرق جاهزة للمواقع", description: "فرق تركيب معتادة على مواقع الرياض وقواعد الدخول وجداول المعارض." },
        { title: "إنتاج داخلي", description: "من التصميم إلى التصنيع تحت سقف واحد لجودة وجداول أدق." },
        { title: "دعم المعارض الوطنية", description: "برامج رئيسية وبناء لمعارض متكررة عبر تقويم الرياض." },
      ],
    },
  },
  {
    slug: "jeddah",
    order: 2,
    countryCode: "SA",
    image: media.locations.jeddah,
    imageAlt: "Exhibition booth delivery in Jeddah",
    en: {
      title: "Jeddah",
      excerpt: "Red Sea trade shows, retail activations, and coastal venue programs.",
      localExperience:
        "Jeddah programs combine brand-led design with logistics tuned to Red Sea venues and the western region calendar.",
      capabilities: [
        { title: "Coastal venue logistics", description: "Shipping, access, and install coordinated for Jeddah exhibition sites." },
        { title: "Retail & trade shows", description: "Booths built for visitor flow in busy Jeddah halls." },
        { title: "Western region coverage", description: "Crews and scheduling for shows across the Jeddah market." },
      ],
    },
    ar: {
      title: "جدة",
      excerpt: "معارض البحر الأحمر وتفعيلات التجزئة وبرامج المواقع الساحلية.",
      localExperience:
        "برامج جدة تجمع تصميماً بقيادة العلامة مع لوجستيات متوافقة مع مواقع البحر الأحمر وتقويم المنطقة الغربية.",
      capabilities: [
        { title: "لوجستيات المواقع الساحلية", description: "شحن ودخول وتركيب منسّق لمواقع معارض جدة." },
        { title: "تجزئة ومعارض تجارية", description: "أجنحة مبنية لتدفق الزوار في قاعات جدة المزدحمة." },
        { title: "تغطية المنطقة الغربية", description: "فرق وجداول لمعارض سوق جدة." },
      ],
    },
  },
  {
    slug: "dammam",
    order: 3,
    countryCode: "SA",
    image: media.locations.dammam,
    imageAlt: "Exhibition booth delivery in Dammam",
    en: {
      title: "Dammam",
      excerpt: "Eastern Province industrial, energy, and trade exhibition programs.",
      localExperience:
        "Dammam deliveries focus on practical fabrication, install windows, and venues serving the Eastern Province calendar.",
      capabilities: [
        { title: "Eastern Province crews", description: "On-site teams coordinated for Dammam venues and show dates." },
        { title: "Industrial & energy shows", description: "Booths built for technical demos and buyer traffic." },
        { title: "Regional logistics", description: "Freight and install planning across the Eastern corridor." },
      ],
    },
    ar: {
      title: "الدمام",
      excerpt: "برامج معارض صناعية وطاقة وتجارية في المنطقة الشرقية.",
      localExperience:
        "تسليم الدمام يركّز على تصنيع عملي ونوافذ تركيب ومواقع تخدم تقويم المنطقة الشرقية.",
      capabilities: [
        { title: "فرق المنطقة الشرقية", description: "فرق ميدانية منسّقة لمواقع الدمام ومواعيد المعارض." },
        { title: "معارض صناعية وطاقة", description: "أجنحة مبنية للعروض التقنية وحركة المشترين." },
        { title: "لوجستيات إقليمية", description: "تخطيط شحن وتركيب عبر الممر الشرقي." },
      ],
    },
  },
  {
    slug: "khobar",
    order: 4,
    countryCode: "SA",
    image: media.locations.khobar,
    imageAlt: "Exhibition booth delivery in Khobar",
    en: {
      title: "Khobar",
      excerpt: "Corporate, tech, and brand activations across Khobar venues.",
      localExperience:
        "Khobar projects emphasize polished brand presence with install support across local halls and corporate events.",
      capabilities: [
        { title: "Brand activations", description: "High-finish booths for corporate and tech audiences." },
        { title: "Local venue access", description: "Crews familiar with Khobar site rules and timing." },
        { title: "Reuse-ready builds", description: "Storage and redeploy options for returning exhibitors." },
      ],
    },
    ar: {
      title: "الخبر",
      excerpt: "تفعيلات شركات وتقنية وعلامات عبر مواقع الخبر.",
      localExperience:
        "مشاريع الخبر تركّز على حضور علامة مصقول مع دعم تركيب عبر القاعات المحلية وفعاليات الشركات.",
      capabilities: [
        { title: "تفعيلات العلامة", description: "أجنحة بتشطيب عالٍ لجمهور الشركات والتقنية." },
        { title: "دخول المواقع المحلية", description: "فرق معتادة على قواعد ومواعيد مواقع الخبر." },
        { title: "بناء جاهز لإعادة الاستخدام", description: "خيارات تخزين وإعادة نشر للمعارض المتكررة." },
      ],
    },
  },
  {
    slug: "makkah",
    order: 5,
    countryCode: "SA",
    image: media.locations.makkah,
    imageAlt: "Exhibition booth delivery in Makkah",
    en: {
      title: "Makkah",
      excerpt: "Exhibition and event programs with careful venue and schedule planning.",
      localExperience:
        "Makkah deliveries are planned around venue access, local regulations, and clear install windows.",
      capabilities: [
        { title: "Venue coordination", description: "Access, power, and schedule aligned before build day." },
        { title: "Respectful planning", description: "Programs timed carefully around local calendars and constraints." },
        { title: "Reliable install", description: "Crews focused on clean setup and safe teardown." },
      ],
    },
    ar: {
      title: "مكة",
      excerpt: "برامج معارض وفعاليات بتخطيط دقيق للموقع والجدول.",
      localExperience:
        "تسليم مكة يُخطَّط حول دخول المواقع والتنظيمات المحلية ونوافذ تركيب واضحة.",
      capabilities: [
        { title: "تنسيق المواقع", description: "دخول وطاقة وجدول متوافق قبل يوم البناء." },
        { title: "تخطيط مراعٍ", description: "برامج موقوتة بعناية حول التقويم والقيود المحلية." },
        { title: "تركيب موثوق", description: "فرق تركّز على إعداد نظيف وتفكيك آمن." },
      ],
    },
  },
  {
    slug: "madinah",
    order: 6,
    countryCode: "SA",
    image: media.locations.madinah,
    imageAlt: "Exhibition booth delivery in Madinah",
    en: {
      title: "Madinah",
      excerpt: "Regional exhibitions and brand presence with local delivery support.",
      localExperience:
        "Madinah projects pair CPS fabrication standards with logistics and install support for the local event calendar.",
      capabilities: [
        { title: "Regional delivery", description: "Production and install coordinated for Madinah shows." },
        { title: "Clear timelines", description: "Design-to-install stages locked early for smaller venue windows." },
        { title: "On-site support", description: "Show-day adjustments when the floor needs them." },
      ],
    },
    ar: {
      title: "المدينة",
      excerpt: "معارض إقليمية وحضور علامة مع دعم تسليم محلي.",
      localExperience:
        "مشاريع المدينة تقرن معايير تصنيع CPS مع لوجستيات ودعم تركيب لتقويم الفعاليات المحلي.",
      capabilities: [
        { title: "تسليم إقليمي", description: "إنتاج وتركيب منسّق لمعارض المدينة." },
        { title: "جداول واضحة", description: "مراحل من التصميم إلى التركيب تُثبَّت مبكراً لنوافذ المواقع الأصغر." },
        { title: "دعم في الموقع", description: "تعديلات يوم المعرض عندما تحتاجها القاعة." },
      ],
    },
  },
  {
    slug: "neom",
    order: 7,
    countryCode: "SA",
    image: media.locations.neom,
    imageAlt: "Exhibition booth delivery in NEOM",
    en: {
      title: "NEOM",
      excerpt: "Future-facing activations and pavilion-scale presence for NEOM programs.",
      localExperience:
        "NEOM projects demand precise logistics, premium finishes, and crews ready for ambitious spatial programs.",
      capabilities: [
        { title: "Premium fabrication", description: "Materials and detailing built for high-visibility environments." },
        { title: "Complex logistics", description: "Freight and install planned for remote and controlled sites." },
        { title: "Pavilion-ready teams", description: "Capability for large-scale and experiential builds." },
      ],
    },
    ar: {
      title: "نيوم",
      excerpt: "تفعيلات مستقبلية وحضور بمعيار الأجنحة الكبيرة لبرامج نيوم.",
      localExperience:
        "مشاريع نيوم تتطلب لوجستيات دقيقة وتشطيبات فاخرة وفرقاً جاهزة لبرامج فراغية طموحة.",
      capabilities: [
        { title: "تصنيع فاخر", description: "مواد وتفاصيل مبنية لبيئات عالية الظهور." },
        { title: "لوجستيات معقّدة", description: "شحن وتركيب مخطط لمواقع نائية ومنضبطة." },
        { title: "فرق جاهزة للأجنحة الكبيرة", description: "قدرة على بناء واسع وتجريبي." },
      ],
    },
  },
];


export const newsArticles: NewsRecord[] = [
  {
    slug: "in-house-booth-production",
    publishedAt: "2025-11-12",
    readingTime: 4,
    image: media.news.hall,
    imageAlt: "In-house booth production",
    category: "Insights",
    tags: ["production", "process"],
    author: "CPS Studio",
    en: {
      title: "Why in-house booth production changes the outcome",
      excerpt: "Owning design and fabrication under one roof reduces handoffs and protects timelines.",
      body: [
        "Most exhibition delays come from fragmented ownership — design in one place, fabrication in another, install somewhere else.",
        "When CPS keeps the full lifecycle in-house, decisions move faster, quality stays consistent, and the booth that opens on day one matches the approved concept.",
        "That is the difference between a vendor chain and a single accountable atelier.",
      ],
    },
    ar: {
      title: "لماذا يغيّر الإنتاج الداخلي نتيجة الجناح",
      excerpt: "امتلاك التصميم والتصنيع تحت سقف واحد يقلل التسليمات ويحمي الجداول.",
      body: [
        "معظم تأخيرات المعارض تأتي من ملكية مجزأة — تصميم في مكان وتصنيع في آخر وتركيب في مكان ثالث.",
        "عندما تبقي CPS دورة الحياة كاملة داخلياً، تتحرك القرارات أسرع وتبقى الجودة متسقة ويطابق الجناح في يوم الافتتاح المفهوم المعتمد.",
        "هذا هو الفرق بين سلسلة موردين وأتelier واحد مسؤول.",
      ],
    },
  },
  {
    slug: "modular-vs-custom",
    publishedAt: "2025-09-03",
    readingTime: 5,
    image: media.news.keynote,
    imageAlt: "Modular versus custom booth",
    category: "Booth strategy",
    tags: ["modular", "custom"],
    author: "CPS Studio",
    en: {
      title: "Modular vs custom: choosing the right booth strategy",
      excerpt: "A practical guide to matching booth type to calendar, budget, and brand ambition.",
      body: [
        "Custom booths win when differentiation and experience are the priority. Modular systems win when you need speed and reuse across a season.",
        "The best programs often mix both — a custom hero presence for flagship shows, and modular kits for regional dates.",
        "Start with your calendar and goals, then choose the structure that protects both brand and budget.",
      ],
    },
    ar: {
      title: "معياري مقابل مخصص: اختيار استراتيجية الجناح الصحيحة",
      excerpt: "دليل عملي لمواءمة نوع الجناح مع التقويم والميزانية وطموح العلامة.",
      body: [
        "الأجنحة المخصصة تفوز عندما يكون التميّز والتجربة هما الأولوية. الأنظمة المعيارية تفوز عندما تحتاج سرعة وإعادة استخدام عبر الموسم.",
        "أفضل البرامج غالباً تمزج الاثنين — حضور مخصص للمعارض الرئيسية ومجموعات معيارية للمواعيد الإقليمية.",
        "ابدأ بتقويمك وأهدافك، ثم اختر الهيكل الذي يحمي العلامة والميزانية معاً.",
      ],
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((item) => item.slug === slug);
}

export function getLocation(slug: string) {
  return locations.find((item) => item.slug === slug);
}

export function getNewsArticle(slug: string) {
  return newsArticles.find((item) => item.slug === slug);
}

export function localizeIndustry(industry: IndustryRecord, locale: Locale) {
  return {
    ...industry,
    ...industry[locale],
    image: industry.image,
    imageAlt: industry.imageAlt,
    slug: industry.slug,
    recommendedBoothTypeSlugs: industry.recommendedBoothTypeSlugs,
  };
}

export function localizeLocation(location: LocationRecord, locale: Locale) {
  return {
    ...location,
    ...location[locale],
    image: location.image,
    imageAlt: location.imageAlt,
    slug: location.slug,
    countryCode: location.countryCode,
  };
}

export function localizeNews(article: NewsRecord, locale: Locale) {
  return {
    ...article,
    ...article[locale],
    image: article.image,
    imageAlt: article.imageAlt,
    slug: article.slug,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
    category: article.category,
    tags: article.tags,
    author: article.author,
  };
}

export const redirects = [
  { from: "/portfolio", to: "/work", status: 301 as const },
  { from: "/blog", to: "/news", status: 301 as const },
  { from: "/locations/saudi-arabia", to: "/locations/riyadh", status: 301 as const },
  { from: "/locations/uae", to: "/locations/jeddah", status: 301 as const },
  { from: "/locations/qatar", to: "/locations/dammam", status: 301 as const },
  { from: "/locations/kuwait", to: "/locations/khobar", status: 301 as const },
  { from: "/locations/bahrain", to: "/locations/makkah", status: 301 as const },
  { from: "/locations/oman", to: "/locations/madinah", status: 301 as const },
  { from: "/locations/egypt", to: "/locations/neom", status: 301 as const },
];
