import type { Locale } from "@/lib/i18n";
import { getLocalizedProject, projects } from "@/content/projects";

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
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
    headline: string;
    support: string;
    primaryCta: string;
    secondaryCta: string;
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
    items: ServiceItem[];
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
        { label: "Work", href: "/work" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
      cta: "Start a project",
      langLabel: "العربية",
      langHrefLocale: "ar",
    },
    hero: {
      headline: "Presence with purpose.",
      support:
        "A bilingual creative studio for brands that want strategy, craft, and cultural clarity.",
      primaryCta: "Start a project",
      secondaryCta: "View selected work",
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
      title: "From idea to impact",
      support: "End-to-end creative work, focused on clarity and presence.",
      items: [
        {
          title: "Brand strategy",
          description: "Positioning, messaging, and identity systems that give brands a clear voice.",
        },
        {
          title: "Visual identity",
          description: "Logos, guidelines, and design languages built to scale across every touchpoint.",
        },
        {
          title: "Campaigns",
          description: "Concept-led campaigns for launch moments, always-on content, and cultural spikes.",
        },
        {
          title: "Digital experiences",
          description: "Websites and product interfaces that feel intentional, fast, and on-brand.",
        },
        {
          title: "Content production",
          description: "Photography, motion, and art direction that make the story land.",
        },
        {
          title: "Creative direction",
          description: "A single vision across teams, vendors, and channels — from brief to delivery.",
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
      eyebrow: "Selected work",
      title: "Recent collaborations",
      support: "A sample of brand and campaign work across industries.",
      items: workItems("en"),
      viewAll: "See all work",
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
      title: "Let’s build what’s next",
      support: "Tell us about the brand, the moment, and the outcome you need.",
      emailLabel: "Email us",
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
    },
    comingSoon: {
      title: "CPS",
      subtitle: "Creatives Professionals",
    },
  },
  ar: {
    nav: {
      items: [
        { label: "أعمالنا", href: "/work" },
        { label: "خدماتنا", href: "/services" },
        { label: "من نحن", href: "/about" },
        { label: "تواصل", href: "/contact" },
      ],
      cta: "ابدأ مشروعك",
      langLabel: "English",
      langHrefLocale: "en",
    },
    hero: {
      headline: "حضور له معنى.",
      support: "استوديو إبداعي ثنائي اللغة للعلامات التي تريد استراتيجية وحِرفة ووضوحاً ثقافياً.",
      primaryCta: "ابدأ مشروعك",
      secondaryCta: "أعمال مختارة",
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
      title: "من الفكرة إلى الأثر",
      support: "عمل إبداعي متكامل، بتركيز على الوضوح والحضور.",
      items: [
        {
          title: "استراتيجية العلامة",
          description: "تموضع ورسائل وأنظمة هوية تمنح العلامة صوتاً واضحاً.",
        },
        {
          title: "الهوية البصرية",
          description: "شعارات وأدلة وأنظمة تصميم قابلة للتوسع عبر كل نقطة تواصل.",
        },
        {
          title: "الحملات",
          description: "حملات مبنية على فكرة قوية للإطلاق والمحتوى المستمر واللحظات الثقافية.",
        },
        {
          title: "التجارب الرقمية",
          description: "مواقع وواجهات منتجات مقصودة وسريعة ومتسقة مع العلامة.",
        },
        {
          title: "إنتاج المحتوى",
          description: "تصوير وحركة وإخراج فني يجعل القصة تصل.",
        },
        {
          title: "الإخراج الإبداعي",
          description: "رؤية واحدة عبر الفرق والموردين والقنوات — من الموجز إلى التسليم.",
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
      eyebrow: "أعمال مختارة",
      title: "تعاونات حديثة",
      support: "عيّنة من أعمال العلامات والحملات عبر قطاعات مختلفة.",
      items: workItems("ar"),
      viewAll: "كل الأعمال",
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
      title: "لنبنِ الخطوة التالية",
      support: "أخبرنا عن العلامة واللحظة والنتيجة التي تحتاجها.",
      emailLabel: "راسلنا",
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
