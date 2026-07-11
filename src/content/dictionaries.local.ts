import type { Locale } from "@/lib/i18n";
import { getLocalizedProject, projects } from "@/content/projects";
import { media } from "@/content/media";

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  slug?: string;
}

export interface BoothTypeItem {
  title: string;
  image: string;
  imageAlt: string;
  slug?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface WorkItem {
  title: string;
  category: string;
  year: string;
  slug: string;
  image: string;
  imageAlt: string;
  summary: string;
}

export interface Dictionary {
  nav: {
    items: NavItem[];
    cta: string;
    langLabel: string;
    langHrefLocale: Locale;
  };
  hero: {
    badge?: string;
    headline: string;
    support: string;
    primaryCta: string;
    secondaryCta: string;
    reviews?: string;
  };
  stats: {
    items: { value: string; label: string }[];
  };
  processStrip: {
    title: string;
    items: { from: string; to: string }[];
  };
  lifecycle: {
    eyebrow: string;
    title: string;
    support: string;
    imageAlt: string;
    items: { title: string; description: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    lead: string;
    storyTitle: string;
    story: string;
    valuesTitle: string;
    values: { title: string; description: string }[];
    studioTitle: string;
    studioBody: string;
  };
  services: {
    eyebrow: string;
    title: string;
    support: string;
    cta?: string;
    items: ServiceItem[];
  };
  boothTypes: {
    eyebrow: string;
    title: string;
    support: string;
    cta: string;
    items: BoothTypeItem[];
  };
  boothTypesPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  whyCps: {
    eyebrow: string;
    title: string;
    support: string;
    imageAlt: string;
    items: { title: string; description: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { question: string; answer: string }[];
  };
  servicesPage: {
    eyebrow: string;
    title: string;
    lead: string;
    detailTitle: string;
  };
  process: {
    eyebrow: string;
    title: string;
    support: string;
    steps: ProcessStep[];
  };
  work: {
    eyebrow: string;
    title: string;
    support: string;
    items: WorkItem[];
    viewAll: string;
  };
  workPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  projectPage: {
    challenge: string;
    approach: string;
    outcome: string;
    gallery: string;
    next: string;
    back: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    support: string;
    emailLabel: string;
    whatsappLabel: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    lead: string;
    officeTitle: string;
  };
  footer: {
    tagline: string;
    rights: string;
    locationsTitle: string;
    locations: NavItem[];
  };
  /** @deprecated kept for Sanity CMS merge compatibility */
  comingSoon: { title: string; subtitle: string };
}

function workItems(locale: Locale): WorkItem[] {
  return projects.map((project) => {
    const localized = getLocalizedProject(project, locale);
    return {
      title: localized.title,
      category: localized.category,
      year: localized.year,
      slug: localized.slug,
      image: localized.image,
      imageAlt: localized.imageAlt,
      summary: localized.summary,
    };
  });
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      items: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Booth Types", href: "/booth-types" },
        { label: "Portfolio", href: "/work" },
        { label: "News & Insights", href: "/news" },
        { label: "Contact", href: "/contact" },
      ],
      cta: "Request a Quote",
      langLabel: "العربية",
      langHrefLocale: "ar",
    },
    hero: {
      badge: "#1 Exhibition Booth Design & Production in Saudi Arabia",
      headline: "Everything your booth needs, under one roof.",
      support:
        "From design to teardown, CPS handles the full exhibition booth process in-house — no subcontractors, no delays.",
      primaryCta: "Request a Quote",
      secondaryCta: "View Our Work",
    },
    stats: {
      items: [
        { value: "150+", label: "Projects" },
        { value: "16+", label: "Years" },
        { value: "300+", label: "Clients" },
      ],
    },
    processStrip: {
      title: "In the Atelier → At the Event",
      items: [
        { from: "Precision", to: "Memories" },
        { from: "Craftsmanship", to: "Impact" },
        { from: "Materials", to: "Presence" },
        { from: "Detail", to: "Experience" },
      ],
    },
    lifecycle: {
      eyebrow: "Full lifecycle",
      title: "Full Production, Handled In-House",
      support: "Every service your event or space needs — no outsourcing, no gaps.",
      imageAlt: "CPS team building an exhibition booth in the workshop",
      items: [
        {
          title: "We Design It",
          description: "Custom booth concepts built around your brand and floor plan.",
        },
        {
          title: "We Build It",
          description: "Fabricated in-house — not outsourced to third parties.",
        },
        {
          title: "We Install It",
          description: "Set up on-site, ready before doors open.",
        },
        {
          title: "We Take It Down",
          description: "Dismantling and storage handled for your next show.",
        },
      ],
    },
    about: {
      eyebrow: "Who we are",
      title: "Creatives Professionals",
      body: "CPS is a bilingual creative studio shaping brand systems, campaigns, and digital experiences across the region. We pair sharp strategy with craft that holds up in the real world.",
    },
    aboutPage: {
      eyebrow: "Studio",
      title: "Built for brands that want to be seen clearly.",
      lead: "We work like a European atelier with regional instinct — precise, bilingual, and obsessed with how a brand feels in culture.",
      storyTitle: "The studio",
      story:
        "CPS started as a small creative practice and grew into a studio that moves between strategy rooms, production floors, and product teams. We care about systems that last longer than a campaign cycle.",
      valuesTitle: "How we think",
      values: [
        {
          title: "Clarity first",
          description: "If the idea is soft, the work will be soft. We push for a sharp point of view.",
        },
        {
          title: "Craft under pressure",
          description: "Beautiful work that cannot ship is unfinished. We design for real constraints.",
        },
        {
          title: "Bilingual by nature",
          description: "Arabic and English are not afterthoughts. They shape the concept from day one.",
        },
      ],
      studioTitle: "In the room",
      studioBody:
        "From brand workshops to campaign reviews, we keep teams aligned around one visual and verbal direction.",
    },
    services: {
      eyebrow: "What we do",
      title: "Full Production, Handled In-House",
      support: "Five core services — design through signage — delivered by one team.",
      cta: "See All Services",
      items: [
        {
          title: "Custom Fabrication & Manufacturing",
          description: "Built from scratch to match your brand and space.",
          image: media.services.fabrication,
          imageAlt: "Custom booth fabrication in progress",
          slug: "custom-fabrication",
        },
        {
          title: "Design",
          description: "Concepts and layouts designed around your goals.",
          image: media.services.design,
          imageAlt: "Exhibition booth design render",
          slug: "booth-design",
        },
        {
          title: "Dismantling, Storage & Reinstallation",
          description: "Careful teardown, safe storage, ready for next time.",
          image: media.services.storage,
          imageAlt: "Booth components in storage",
          slug: "storage-reinstallation",
        },
        {
          title: "Visual Branding & Print Solutions",
          description: "Decals, banners, flags, and window graphics.",
          image: media.services.branding,
          imageAlt: "Printed branding on an exhibition stand",
          slug: "visual-branding-print",
        },
        {
          title: "Lightbox Signage & Storefront",
          description: "LED signage that gets your brand noticed.",
          image: media.services.lightbox,
          imageAlt: "Lightbox signage on a trade show booth",
          slug: "lightbox-retail-display",
        },
      ],
    },
    boothTypes: {
      eyebrow: "Booth types",
      title: "From small stands to national pavilions",
      support: "From small stands to big pavilions — built to fit your needs.",
      cta: "Explore booth types",
      items: [
        {
          title: "Custom-Built Booths",
          image: media.boothTypes.custom,
          imageAlt: "Custom-built exhibition booth",
          slug: "custom",
        },
        {
          title: "Modular / System Booths",
          image: media.boothTypes.modular,
          imageAlt: "Modular system booth",
          slug: "modular",
        },
        {
          title: "Double-Deck Booths",
          image: media.boothTypes.doubleDeck,
          imageAlt: "Double-deck exhibition booth",
          slug: "double-deck",
        },
        {
          title: "Portable & Pop-Up Displays",
          image: media.boothTypes.portable,
          imageAlt: "Portable pop-up display",
          slug: "portable",
        },
        {
          title: "Kiosks & Small Footprint Stands",
          image: media.boothTypes.kiosk,
          imageAlt: "Small footprint kiosk stand",
          slug: "kiosks",
        },
        {
          title: "Outdoor Structures & Activations",
          image: media.boothTypes.outdoor,
          imageAlt: "Outdoor activation structure",
          slug: "outdoor",
        },
        {
          title: "Country / National Pavilions",
          image: media.boothTypes.pavilion,
          imageAlt: "Country pavilion booth",
          slug: "pavilions",
        },
        {
          title: "Sustainable / Eco Booths",
          image: media.boothTypes.sustainable,
          imageAlt: "Sustainable eco booth",
          slug: "sustainable",
        },
      ],
    },
    boothTypesPage: {
      eyebrow: "Booth types",
      title: "Built for every footprint and format.",
      lead: "Whether you need a compact kiosk or a double-deck pavilion, CPS designs and builds in-house.",
    },
    whyCps: {
      eyebrow: "Why CPS",
      title: "Everything handled in-house, from start to finish.",
      support: "No subcontractors. Full control at every step of your booth lifecycle.",
      imageAlt: "Finished exhibition booth on the show floor",
      items: [
        {
          title: "All In-House",
          description: "No subcontractors — full control at every step.",
        },
        {
          title: "Full Lifecycle Support",
          description: "Design, build, install, store, and reinstall under one roof.",
        },
        {
          title: "Behind Every Booth",
          description: "A dedicated team from concept sketches to opening day.",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Common questions",
      items: [
        {
          question: "How long does a custom booth take to build?",
          answer:
            "Timelines depend on size and complexity. Most custom booths need 4–8 weeks from approved design to install-ready.",
        },
        {
          question: "Do you handle installation at the venue?",
          answer:
            "Yes. Our crew installs on-site and dismantles after the event. Storage and reinstallation are available too.",
        },
        {
          question: "Can you reuse a booth for multiple shows?",
          answer:
            "Absolutely. Modular builds and our storage program make it easy to refresh and redeploy.",
        },
        {
          question: "Do you work outside Saudi Arabia?",
          answer:
            "We primarily serve Saudi Arabia and the wider GCC. Contact us with your venue and dates.",
        },
      ],
    },
    servicesPage: {
      eyebrow: "Capabilities",
      title: "Creative systems that hold under pressure.",
      lead: "Strategy, identity, campaigns, and digital — connected as one practice, not separate vendors.",
      detailTitle: "Where we go deep",
    },
    process: {
      eyebrow: "How we work",
      title: "A clear path from brief to launch",
      support: "Simple stages. Tight collaboration. No wasted motion.",
      steps: [
        {
          title: "Discover",
          description: "We dig into the brand, audience, and constraints until the real problem is clear.",
        },
        {
          title: "Define",
          description: "Strategy and creative direction lock the north star before production starts.",
        },
        {
          title: "Design",
          description: "Concepts become systems — identity, layouts, motion, and content frameworks.",
        },
        {
          title: "Deliver",
          description: "We produce, refine, and hand over assets ready to ship and scale.",
        },
      ],
    },
    work: {
      eyebrow: "Case studies",
      title: "Behind Every Booth",
      support: "Selected exhibition builds across industries and formats.",
      items: workItems("en"),
      viewAll: "View all projects",
    },
    workPage: {
      eyebrow: "Work",
      title: "Selected projects",
      lead: "Brand systems, campaigns, and digital products — each built to feel inevitable once finished.",
    },
    projectPage: {
      challenge: "Challenge",
      approach: "Approach",
      outcome: "Outcome",
      gallery: "Selected frames",
      next: "Next project",
      back: "All work",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's plan your next booth",
      support: "Share your event, footprint, and timeline — we'll reply with a clear next step.",
      emailLabel: "Request a Quote",
      whatsappLabel: "WhatsApp",
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Start with a conversation.",
      lead: "Share the brief, the timeline, and what success looks like. We’ll come back with a clear next step.",
      officeTitle: "Studio",
    },
    footer: {
      tagline: "Creatives Professionals",
      rights: "All rights reserved.",
      locationsTitle: "Locations",
      locations: [
        { label: "Saudi Arabia", href: "/locations/saudi-arabia" },
        { label: "UAE", href: "/locations/uae" },
        { label: "Qatar", href: "/locations/qatar" },
        { label: "Kuwait", href: "/locations/kuwait" },
        { label: "Bahrain", href: "/locations/bahrain" },
        { label: "Oman", href: "/locations/oman" },
        { label: "Egypt", href: "/locations/egypt" },
      ],
    },
    comingSoon: {
      title: "CPS",
      subtitle: "Creatives Professionals",
    },
  },
  ar: {
    nav: {
      items: [
        { label: "الرئيسية", href: "/" },
        { label: "من نحن", href: "/about" },
        { label: "خدماتنا", href: "/services" },
        { label: "أنواع الأجنحة", href: "/booth-types" },
        { label: "أعمالنا", href: "/work" },
        { label: "أخبار ورؤى", href: "/news" },
        { label: "تواصل", href: "/contact" },
      ],
      cta: "اطلب عرض سعر",
      langLabel: "English",
      langHrefLocale: "en",
    },
    hero: {
      badge: "الأول في تصميم وإنتاج أجنحة المعارض في السعودية",
      headline: "كل ما يحتاجه جناحك — تحت سقف واحد.",
      support:
        "من التصميم إلى التفكيك، CPS تدير دورة حياة جناح المعرض بالكامل داخلياً — بلا مقاولين فرعيين ولا تأخير.",
      primaryCta: "اطلب عرض سعر",
      secondaryCta: "شاهد أعمالنا",
    },
    stats: {
      items: [
        { value: "+150", label: "مشروع" },
        { value: "+16", label: "سنة" },
        { value: "+300", label: "عميل" },
      ],
    },
    processStrip: {
      title: "في الأتيليه ← في الحدث",
      items: [
        { from: "الدقة", to: "ذكريات" },
        { from: "الحِرفة", to: "أثر" },
        { from: "المواد", to: "حضور" },
        { from: "التفاصيل", to: "تجربة" },
      ],
    },
    lifecycle: {
      eyebrow: "دورة حياة كاملة",
      title: "إنتاج متكامل — داخلياً",
      support: "كل خدمة يحتاجها حدثك أو مساحتك — بلا إسناد خارجي وبلا فجوات.",
      imageAlt: "فريق CPS يبني جناح معرض في الورشة",
      items: [
        {
          title: "نصمّمه",
          description: "مفاهيم مخصصة مبنية حول علامتك ومخطط الأرضية.",
        },
        {
          title: "نبنيه",
          description: "تصنيع داخلي — لا يُسند لطرف ثالث.",
        },
        {
          title: "نركّبه",
          description: "تركيب في الموقع، جاهز قبل افتتاح الأبواب.",
        },
        {
          title: "نفكّكه",
          description: "تفكيك وتخزين جاهز للمعرض القادم.",
        },
      ],
    },
    about: {
      eyebrow: "من نحن",
      title: "المبدعون المحترفون",
      body: "CPS استوديو إبداعي ثنائي اللغة يصوغ أنظمة العلامات والحملات والتجارب الرقمية في المنطقة. نجمع بين استراتيجية حادة وحِرفة تصمد في الواقع.",
    },
    aboutPage: {
      eyebrow: "الاستوديو",
      title: "نُبنى للعلامات التي تريد أن تُرى بوضوح.",
      lead: "نعمل بروح أتيليه أوروبي وغريزة محلية — دقيقون، ثنائيو اللغة، ومهووسون بإحساس العلامة في الثقافة.",
      storyTitle: "الاستوديو",
      story:
        "بدأت CPS كممارسة إبداعية صغيرة ونمت إلى استوديو يتنقل بين غرف الاستراتيجية وأرضيات الإنتاج وفرق المنتج. نهتم بالأنظمة التي تدوم أطول من دورة حملة.",
      valuesTitle: "كيف نفكر",
      values: [
        {
          title: "الوضوح أولاً",
          description: "إذا كانت الفكرة رخوة، سيكون العمل رخواً. ندفع نحو وجهة نظر حادة.",
        },
        {
          title: "حِرفة تحت الضغط",
          description: "العمل الجميل الذي لا يُطلق غير مكتمل. نصمم وفق قيود حقيقية.",
        },
        {
          title: "ثنائيو اللغة بطبعنا",
          description: "العربية والإنجليزية ليستا لاحقاً. هما تشكلان الفكرة من اليوم الأول.",
        },
      ],
      studioTitle: "في الغرفة",
      studioBody:
        "من ورش العلامة إلى مراجعات الحملات، نبقي الفرق متوافقة حول اتجاه بصري ولفظي واحد.",
    },
    services: {
      eyebrow: "ماذا نقدم",
      title: "إنتاج متكامل — داخلياً",
      support: "خمس خدمات أساسية — من التصميم إلى اللافتات — بفريق واحد.",
      cta: "كل الخدمات",
      items: [
        {
          title: "تصنيع وتفصيل مخصص",
          description: "يُبنى من الصفر ليتوافق مع علامتك ومساحتك.",
          image: media.services.fabrication,
          imageAlt: "تصنيع جناح مخصص",
          slug: "custom-fabrication",
        },
        {
          title: "التصميم",
          description: "مفاهيم ومخططات مبنية حول أهدافك.",
          image: media.services.design,
          imageAlt: "تصميم جناح معرض",
          slug: "booth-design",
        },
        {
          title: "التفكيك والتخزين وإعادة التركيب",
          description: "تفكيك آمن وتخزين جاهز للمرة القادمة.",
          image: media.services.storage,
          imageAlt: "مكونات جناح في التخزين",
          slug: "storage-reinstallation",
        },
        {
          title: "الهوية البصرية والطباعة",
          description: "ملصقات ولافتات وأعلام ورسومات نوافذ.",
          image: media.services.branding,
          imageAlt: "طباعة على جناح معرض",
          slug: "visual-branding-print",
        },
        {
          title: "لافتات Lightbox والواجهات",
          description: "لافتات LED تلفت الانتباه لعلامتك.",
          image: media.services.lightbox,
          imageAlt: "لافتة lightbox على جناح",
          slug: "lightbox-retail-display",
        },
      ],
    },
    boothTypes: {
      eyebrow: "أنواع الأجنحة",
      title: "من الأكشاك الصغيرة إلى الأجنحة الوطنية",
      support: "من الأكشاك الصغيرة إلى الأجنحة الكبيرة — نبنيها لتناسب احتياجك.",
      cta: "استكشف أنواع الأجنحة",
      items: [
        {
          title: "أجنحة مخصصة",
          image: media.boothTypes.custom,
          imageAlt: "جناح معرض مخصص",
          slug: "custom",
        },
        {
          title: "أجنحة معيارية / نظام",
          image: media.boothTypes.modular,
          imageAlt: "جناح نظام معياري",
          slug: "modular",
        },
        {
          title: "أجنحة طابقين",
          image: media.boothTypes.doubleDeck,
          imageAlt: "جناح معرض بطابقين",
          slug: "double-deck",
        },
        {
          title: "عروض محمولة و Pop-Up",
          image: media.boothTypes.portable,
          imageAlt: "عرض pop-up محمول",
          slug: "portable",
        },
        {
          title: "أكشاك ومساحات صغيرة",
          image: media.boothTypes.kiosk,
          imageAlt: "كشك بمساحة صغيرة",
          slug: "kiosks",
        },
        {
          title: "هياكل خارجية وتفعيلات",
          image: media.boothTypes.outdoor,
          imageAlt: "هيكل تفعيل خارجي",
          slug: "outdoor",
        },
        {
          title: "أجنحة / أجنحة وطنية",
          image: media.boothTypes.pavilion,
          imageAlt: "جناح وطني",
          slug: "pavilions",
        },
        {
          title: "أجنحة مستدامة / eco",
          image: media.boothTypes.sustainable,
          imageAlt: "جناح مستدام",
          slug: "sustainable",
        },
      ],
    },
    boothTypesPage: {
      eyebrow: "أنواع الأجنحة",
      title: "مبنية لكل مساحة وتنسيق.",
      lead: "سواء كنت تحتاج كشكاً مدمجاً أو جناحاً بطابقين، CPS تصمّم وتبني داخلياً.",
    },
    whyCps: {
      eyebrow: "لماذا CPS",
      title: "كل شيء داخلياً — من البداية للنهاية.",
      support: "بلا مقاولين فرعيين. تحكم كامل في كل خطوة من دورة حياة جناحك.",
      imageAlt: "جناح معرض جاهز على أرض المعرض",
      items: [
        {
          title: "كل شيء داخلياً",
          description: "بلا مقاولين فرعيين — تحكم كامل في كل خطوة.",
        },
        {
          title: "دعم دورة حياة كاملة",
          description: "تصميم وبناء وتركيب وتخزين وإعادة تركيب تحت سقف واحد.",
        },
        {
          title: "خلف كل جناح",
          description: "فريق مخصص من المسودات حتى يوم الافتتاح.",
        },
      ],
    },
    faq: {
      eyebrow: "أسئلة شائعة",
      title: "أسئلة متكررة",
      items: [
        {
          question: "كم يستغرق بناء جناح مخصص؟",
          answer:
            "تعتمد المدة على الحجم والتعقيد. معظم الأجنحة المخصصة تحتاج 4–8 أسابيع من اعتماد التصميم حتى الجاهزية للتركيب.",
        },
        {
          question: "هل تتولون التركيب في موقع المعرض؟",
          answer:
            "نعم. فريقنا يركّب في الموقع ويفكّك بعد الحدث. التخزين وإعادة التركيب متاحان أيضاً.",
        },
        {
          question: "هل يمكن إعادة استخدام الجناح لمعارض متعددة؟",
          answer:
            "بالتأكيد. البناء المعياري وبرنامج التخزين لدينا يسهّل التحديث وإعادة النشر.",
        },
        {
          question: "هل تعملون خارج السعودية؟",
          answer:
            "نخدم بشكل أساسي السعودية ودول الخليج. تواصل معنا بموقع الحدث والتواريخ.",
        },
      ],
    },
    servicesPage: {
      eyebrow: "القدرات",
      title: "أنظمة إبداعية تصمد تحت الضغط.",
      lead: "استراتيجية وهوية وحملات ورقمي — ممارسة واحدة، لا موردين منفصلين.",
      detailTitle: "أين نتعمّق",
    },
    process: {
      eyebrow: "كيف نعمل",
      title: "مسار واضح من الموجز إلى الإطلاق",
      support: "مراحل بسيطة. تعاون محكم. بلا حركة ضائعة.",
      steps: [
        {
          title: "اكتشاف",
          description: "نغوص في العلامة والجمهور والقيود حتى تتضح المشكلة الحقيقية.",
        },
        {
          title: "تعريف",
          description: "الاستراتيجية والاتجاه الإبداعي يثبتان البوصلة قبل بدء الإنتاج.",
        },
        {
          title: "تصميم",
          description: "المفاهيم تتحول إلى أنظمة — هوية وتخطيطات وحركة وأطر محتوى.",
        },
        {
          title: "تسليم",
          description: "ننتج وننقّح ونسلّم أصولاً جاهزة للإطلاق والتوسع.",
        },
      ],
    },
    work: {
      eyebrow: "دراسات حالة",
      title: "خلف كل جناح",
      support: "عيّنة من أجنحة المعارض عبر قطاعات وتنسيقات مختلفة.",
      items: workItems("ar"),
      viewAll: "كل المشاريع",
    },
    workPage: {
      eyebrow: "الأعمال",
      title: "مشاريع مختارة",
      lead: "أنظمة علامات وحملات ومنتجات رقمية — كل مشروع يُبنى ليبدو حتمياً بعد اكتماله.",
    },
    projectPage: {
      challenge: "التحدي",
      approach: "المنهج",
      outcome: "النتيجة",
      gallery: "لقطات مختارة",
      next: "المشروع التالي",
      back: "كل الأعمال",
    },
    contact: {
      eyebrow: "تواصل",
      title: "لنخطّط لجناحك القادم",
      support: "شاركنا الحدث والمساحة والجدول — نعود بخطوة تالية واضحة.",
      emailLabel: "اطلب عرض سعر",
      whatsappLabel: "واتساب",
    },
    contactPage: {
      eyebrow: "تواصل",
      title: "نبدأ بمحادثة.",
      lead: "شاركنا الموجز والجدول وما يبدو عليه النجاح. نعود بخطوة تالية واضحة.",
      officeTitle: "الاستوديو",
    },
    footer: {
      tagline: "المبدعون المحترفون",
      rights: "جميع الحقوق محفوظة.",
      locationsTitle: "المواقع",
      locations: [
        { label: "السعودية", href: "/locations/saudi-arabia" },
        { label: "الإمارات", href: "/locations/uae" },
        { label: "قطر", href: "/locations/qatar" },
        { label: "الكويت", href: "/locations/kuwait" },
        { label: "البحرين", href: "/locations/bahrain" },
        { label: "عُمان", href: "/locations/oman" },
        { label: "مصر", href: "/locations/egypt" },
      ],
    },
    comingSoon: {
      title: "CPS",
      subtitle: "المبدعون المحترفون",
    },
  },
};

export function getDictionaryLocal(locale: Locale): Dictionary {
  return dictionaries[locale];
}
