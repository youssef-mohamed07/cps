import type { Locale } from "@/lib/i18n";
import { getLocalizedProject, projects } from "@/content/projects";
import { media } from "@/content/media";
import { getBriefFormCopy, type BriefFormCopy } from "@/content/brief-form.copy";

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
  lifecycle: {
    eyebrow: string;
    title: string;
    support: string;
    imageAlt: string;
    items: { title: string; description: string }[];
  };
  stats: {
    eyebrow: string;
    title: string;
    support?: string;
    items: {
      value: number;
      prefix?: string;
      suffix?: string;
      label: string;
      detail?: string;
    }[];
  };
  clients: {
    eyebrow: string;
    title: string;
    support: string;
    items: {
      quote: string;
      name: string;
      role: string;
      image: string;
      imageAlt: string;
    }[];
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
    primary: { title: string; description: string; cta: string; href: string };
    secondary: { title: string; description: string; cta: string; href: string };
    images: {
      wideAlt: string;
      leftAlt: string;
      rightAlt: string;
    };
  };
  beforeAfter: {
    enabled?: boolean;
    eyebrow: string;
    title: string;
    subtitle: string;
    beforeItems: string[];
    afterItems: string[];
    beforeImage: string;
    afterImage: string;
    beforeVideo?: string;
    afterVideo?: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    support: string;
    items: { question: string; answer: string }[];
  };
  servicesPage: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    detailTitle: string;
    faqItems: { question: string; answer: string }[];
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
  briefForm: BriefFormCopy;
  contactPage: {
    eyebrow: string;
    title: string;
    lead: string;
    info: {
      emailLabel: string;
      phoneLabel: string;
      whatsappLabel: string;
      addressLabel: string;
      socialLabel: string;
    };
    map: {
      eyebrow: string;
      title: string;
      support: string;
      openMaps: string;
      hqLabel: string;
    };
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
      badge: "#1 Exhibition Booth Design & Production in {City}",
      headline: "Everything your booth needs, under one roof.",
      support:
        "Full-lifecycle exhibition booth production across Saudi Arabia — design, build, install, dismantle, and storage, all in-house.",
      primaryCta: "Request a Quote",
      secondaryCta: "View Our Work",
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
    stats: {
      eyebrow: "Track record",
      title: "Built at show-floor scale",
      support:
        "Years of in-house production across Saudi Arabia and the GCC — one team from brief to build.",
      items: [
        {
          value: 500,
          suffix: "+",
          label: "Booths delivered",
          detail: "Custom, modular & pavilion builds",
        },
        {
          value: 15,
          suffix: "+",
          label: "Years in exhibitions",
          detail: "Design through dismantle",
        },
        {
          value: 12,
          suffix: "+",
          label: "GCC cities",
          detail: "Riyadh to Dubai and beyond",
        },
        {
          value: 100,
          suffix: "%",
          label: "In-house production",
          detail: "No subcontractor handoffs",
        },
      ],
    },
    clients: {
      eyebrow: "Clients",
      title: "Built to impress. Trusted to deliver.",
      support:
        "From the first sketch to show day, our clients count on one team to make every detail work.",
      items: [
        {
          quote:
            "I've never felt more confident walking up to our booth than I do now. CPS understood our brand from the first brief.",
          name: "Sarah Mitchell",
          role: "Marketing Director",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Sarah Mitchell",
        },
        {
          quote:
            "The booth landed on time and the quality on the floor beat the renders. One team handled everything.",
          name: "Omar Al-Rashid",
          role: "Events Lead",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Omar Al-Rashid",
        },
        {
          quote:
            "One crew from design to dismantle. That alone saved us weeks of coordination across vendors.",
          name: "Adrian Cole",
          role: "Brand Strategist",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Adrian Cole",
        },
        {
          quote:
            "Visitors actually stopped. Our custom build pulled foot traffic we had not seen at previous shows.",
          name: "Lina Hassan",
          role: "VP Marketing",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Lina Hassan",
        },
        {
          quote:
            "Modular rebuild for the next city worked flawlessly. Storage and reinstall were completely painless.",
          name: "Marco Silva",
          role: "Trade Show Manager",
          image:
            "https://images.unsplash.com/photo-1519081909018-445c88991a1d?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Marco Silva",
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
      title: "One team. Every show.",
      primary: {
        title: "Built in-house, made for the floor",
        description:
          "Design, fabrication, and install under one roof — no subcontractors, no gaps between concept and opening day.",
        cta: "Request a quote",
        href: "/contact",
      },
      secondary: {
        title: "Full lifecycle support",
        description:
          "From first sketches to teardown and storage — one team stays with your booth across every show.",
        cta: "See our services",
        href: "/services",
      },
      images: {
        wideAlt: "Exhibition hall with branded booth presence",
        leftAlt: "Custom booth fabrication in the CPS workshop",
        rightAlt: "Finished custom exhibition booth on the show floor",
      },
    },
    beforeAfter: {
      eyebrow: "Before & After",
      title: "See the booth difference",
      subtitle:
        "From a generic shell to a branded presence that pulls visitors in — one team, one process.",
      beforeImage: media.beforeAfter.before,
      afterImage: media.beforeAfter.after,
      beforeItems: [
        "Generic shell booth",
        "Scattered vendors",
        "Last-minute fixes",
        "Weak brand presence",
      ],
      afterItems: [
        "Custom branded build",
        "One CPS team",
        "On-time install",
        "Show-floor impact",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Before you brief us",
      support: "Straight answers on timelines, install, reuse, and coverage — before the brief.",
      items: [
        {
          question: "What does CPS do?",
          answer:
            "We design, build, and manage exhibition booths from start to finish — including branding, signage, installation, dismantling, and storage, all in-house.",
        },
        {
          question: "Do I need to use every service, or can I choose just one?",
          answer:
            "Every service is available individually. You can book just Booth Design, just Fabrication, or the full A to Z Solution if you want everything handled.",
        },
        {
          question: "What cities do you cover?",
          answer:
            "We deliver across major cities in Saudi Arabia. Let us know your event location and we'll confirm coverage.",
        },
        {
          question: "How do I get a quote?",
          answer:
            "Fill out our quote request form with your event details, or contact us directly — we'll follow up to discuss your project.",
        },
        {
          question: "How far in advance should I book?",
          answer:
            "We recommend reaching out as soon as your event date is confirmed, ideally a few weeks ahead for custom builds — though we can accommodate tighter timelines depending on the project.",
        },
        {
          question: "Can you handle a booth for a one-time event, not just recurring exhibitors?",
          answer:
            "Yes, we work with both first-time exhibitors and companies attending events regularly.",
        },
      ],
    },
    servicesPage: {
      eyebrow: "Services",
      title: "#1 Exhibition Booth Design & Production in {City}",
      lead:
        "Full-lifecycle exhibition booth production across Saudi Arabia — design, build, install, dismantle, and storage, all in-house.",
      primaryCta: "Request a Quote",
      secondaryCta: "View Our Work",
      detailTitle: "Where we go deep",
      faqItems: [
        {
          question: "What happens if I need changes during the event?",
          answer:
            "Our team stays reachable during your event for any on-site adjustments or urgent fixes, so you're never left without support.",
        },
        {
          question: "Can you handle multiple booths across different cities at the same time?",
          answer:
            "Yes. Our production and installation teams operate across major cities in Saudi Arabia, so we can manage multiple builds in parallel.",
        },
        {
          question:
            "What if I only need part of the process, like design and fabrication, but want to handle installation myself?",
          answer:
            "That's fine — the A to Z Solution is flexible. We can scope the package around exactly what you need done and what you'd rather manage yourself.",
        },
        {
          question: "Is my booth reusable for future events?",
          answer:
            "In most cases, yes. We design with reusability in mind where possible, and our storage service keeps your booth ready for reinstallation at your next event.",
        },
        {
          question: "What materials do you use for fabrication?",
          answer:
            "We select materials based on your design, budget, and durability needs — including sustainable and eco-friendly options where suitable.",
        },
        {
          question: "Who owns the booth after the event?",
          answer:
            "The booth is yours. We simply offer storage and reinstallation as a convenience so you don't have to manage logistics between events.",
        },
        {
          question: "Do you provide insurance or liability coverage during transport and installation?",
          answer:
            "Yes, our logistics and installation processes include coverage to protect your booth throughout transport, setup, and dismantling.",
        },
      ],
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
      gallery: "Gallery",
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
    briefForm: getBriefFormCopy("en"),
    contactPage: {
      eyebrow: "Contact",
      title: "Start with a conversation.",
      lead: "Share your brief — we’ll reply with a clear next step.",
      info: {
        emailLabel: "Email",
        phoneLabel: "Phone",
        whatsappLabel: "WhatsApp",
        addressLabel: "Studio",
        socialLabel: "Follow",
      },
      map: {
        eyebrow: "Location",
        title: "Find our studio.",
        support: "Based in Riyadh — delivering exhibitions across Saudi Arabia, the GCC, and Egypt.",
        openMaps: "Open in Google Maps",
        hqLabel: "Headquarters",
      },
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
      badge: "الأول في تصميم وإنتاج أجنحة المعارض في {City}",
      headline: "كل ما يحتاجه جناحك — تحت سقف واحد.",
      support:
        "إنتاج متكامل لأجنحة المعارض في أنحاء السعودية — تصميم، تصنيع، تركيب، تفكيك وتخزين، بالكامل داخل CPS.",
      primaryCta: "اطلب عرض سعر",
      secondaryCta: "شاهد أعمالنا",
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
    stats: {
      eyebrow: "سجلنا",
      title: "بُني على نطاق المعارض",
      support:
        "سنوات من الإنتاج الداخلي في السعودية والخليج — فريق واحد من البريف للبناء.",
      items: [
        {
          value: 500,
          suffix: "+",
          label: "جناح مُسلّم",
          detail: "مخصص ومعياري وأجنحة وطنية",
        },
        {
          value: 15,
          suffix: "+",
          label: "سنة في المعارض",
          detail: "من التصميم للتفكيك",
        },
        {
          value: 12,
          suffix: "+",
          label: "مدينة في الخليج",
          detail: "من الرياض إلى دبي وما بعدها",
        },
        {
          value: 100,
          suffix: "%",
          label: "إنتاج داخلي",
          detail: "بدون تسليم لمقاولين",
        },
      ],
    },
    clients: {
      eyebrow: "العملاء",
      title: "نبهر الزوار. ونكسب ثقة عملائنا.",
      support:
        "من أول اسكتش ليوم المعرض، فريق واحد يحوّل كل تفصيلة إلى تجربة ناجحة على أرض الواقع.",
      items: [
        {
          quote:
            "ما حسيت بثقة أكبر وأنا باقترب من جناحنا زي دلوقتي. CPS فهمت علامتنا من أول بريف.",
          name: "سارة العتيبي",
          role: "مديرة التسويق",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "سارة العتيبي",
        },
        {
          quote:
            "الجناح وصل في الموعد والجودة على الأرض أفضل من الـ renders. فريق واحد تولى كل حاجة.",
          name: "عمر الراشد",
          role: "مسؤول الفعاليات",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "عمر الراشد",
        },
        {
          quote:
            "فريق واحد من التصميم للتفكيك. ده لوحده وفر علينا أسابيع تنسيق مع مقاولين.",
          name: "أدريان كول",
          role: "استراتيجي العلامة",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "أدريان كول",
        },
        {
          quote:
            "الزوار فعلاً وقفوا. البناء المخصص جذب حركة زي ما ما شفناش في معارض قبل كدا.",
          name: "لينا Hassan",
          role: "نائبة التسويق",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "لينا Hassan",
        },
        {
          quote:
            "إعادة البناء المعياري للمدينة الجاية كانت سلسة. التخزين وإعادة التركيب كانوا بدون تعب.",
          name: "مارco silva",
          role: "مدير المعارض",
          image:
            "https://images.unsplash.com/photo-1519081909018-445c88991a1d?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "مارco silva",
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
      title: "فريق واحد. كل معرض.",
      primary: {
        title: "صُنع داخلياً — لأرض المعرض",
        description:
          "تصميم وتصنيع وتركيب تحت سقف واحد — بلا مقاولين فرعيين وبلا فجوات بين الفكرة ويوم الافتتاح.",
        cta: "اطلب عرض سعر",
        href: "/contact",
      },
      secondary: {
        title: "دعم دورة حياة كاملة",
        description:
          "من المسودات الأولى إلى التفكيك والتخزين — فريق واحد يبقى مع جناحك عبر كل معرض.",
        cta: "شاهد خدماتنا",
        href: "/services",
      },
      images: {
        wideAlt: "قاعة معرض بحضور جناح علامة",
        leftAlt: "تصنيع جناح مخصص في ورشة CPS",
        rightAlt: "جناح معرض مخصص جاهز على أرض المعرض",
      },
    },
    beforeAfter: {
      eyebrow: "قبل وبعد",
      title: "شوف فرق الجناح",
      subtitle:
        "من جناح عام إلى حضور علامة يجذب الزوار — فريق واحد وعملية واحدة.",
      beforeImage: media.beforeAfter.before,
      afterImage: media.beforeAfter.after,
      beforeItems: [
        "جناح shell عام",
        "مقاولين متفرقين",
        "تعديلات last-minute",
        "حضور ضعيف للعلامة",
      ],
      afterItems: [
        "بناء مخصص للعلامة",
        "فريق CPS واحد",
        "تركيب في الموعد",
        "تأثير على أرض المعرض",
      ],
    },
    faq: {
      eyebrow: "أسئلة شائعة",
      title: "قبل ما ترسل البريف",
      support: "إجابات مباشرة عن الجداول والتركيب وإعادة الاستخدام والتغطية — قبل البريف.",
      items: [
        {
          question: "ماذا تفعل CPS؟",
          answer:
            "نصمّم ونبني وندير أجنحة المعارض من البداية للنهاية — بما في ذلك الهوية واللافتات والتركيب والتفكيك والتخزين، بالكامل داخل الشركة.",
        },
        {
          question: "هل يجب استخدام كل الخدمات، أم يمكن اختيار خدمة واحدة فقط؟",
          answer:
            "كل خدمة متاحة بشكل منفرد. يمكنك حجز تصميم الجناح فقط، أو التصنيع فقط، أو الحل المتكامل من الألف إلى الياء إذا أردت أن نتولى كل شيء.",
        },
        {
          question: "ما المدن التي تغطونها؟",
          answer:
            "ننفّذ في المدن الرئيسية في المملكة العربية السعودية. أخبرنا بموقع فعاليتك وسنؤكد التغطية.",
        },
        {
          question: "كيف أحصل على عرض سعر؟",
          answer:
            "املأ نموذج طلب عرض السعر بتفاصيل فعاليتك، أو تواصل معنا مباشرة — وسنعاود الاتصال لمناقشة مشروعك.",
        },
        {
          question: "قبل الفعالية بكم يجب الحجز؟",
          answer:
            "ننصح بالتواصل فور تأكيد تاريخ الفعالية، ويفضّل قبل أسابيع قليلة للأجنحة المخصصة — مع إمكانية استيعاب جداول أضيق حسب طبيعة المشروع.",
        },
        {
          question: "هل يمكنكم تنفيذ جناح لفعالية لمرة واحدة، وليس فقط للعارضين المتكررين؟",
          answer:
            "نعم، نعمل مع العارضين لأول مرة ومع الشركات التي تشارك في المعارض بانتظام.",
        },
      ],
    },
    servicesPage: {
      eyebrow: "الخدمات",
      title: "الأول في تصميم وإنتاج أجنحة المعارض في {City}",
      lead:
        "إنتاج متكامل لأجنحة المعارض في أنحاء السعودية — تصميم، تصنيع، تركيب، تفكيك وتخزين، بالكامل داخل CPS.",
      primaryCta: "اطلب عرض سعر",
      secondaryCta: "شاهد أعمالنا",
      detailTitle: "أين نتعمّق",
      faqItems: [
        {
          question: "ماذا يحدث إذا احتجت تعديلات أثناء الفعالية؟",
          answer:
            "فريقنا يبقى متاحاً أثناء فعاليتك لأي تعديلات في الموقع أو إصلاحات عاجلة، فلن تبقى بدون دعم.",
        },
        {
          question: "هل يمكنكم تنفيذ عدة أجنحة في مدن مختلفة في الوقت نفسه؟",
          answer:
            "نعم. فرق الإنتاج والتركيب لدينا تعمل عبر المدن الرئيسية في السعودية، ويمكننا إدارة عدة مشاريع بالتوازي.",
        },
        {
          question:
            "ماذا لو احتجت جزءاً فقط من العملية، مثل التصميم والتصنيع، وأردت تنفيذ التركيب بنفسي؟",
          answer:
            "لا مشكلة — حل الألف إلى الياء مرن. يمكننا تحديد نطاق الباقة حسب ما تحتاجه بالضبط وما تفضّل إدارته بنفسك.",
        },
        {
          question: "هل يمكن إعادة استخدام جناحي في فعاليات لاحقة؟",
          answer:
            "في معظم الحالات، نعم. نصمّم مع مراعاة إمكانية إعادة الاستخدام حيث أمكن، وخدمة التخزين لدينا تبقي جناحك جاهزاً لإعادة التركيب في فعاليتك التالية.",
        },
        {
          question: "ما المواد التي تستخدمونها في التصنيع؟",
          answer:
            "نختار المواد وفق تصميمك وميزانيتك واحتياجات المتانة — بما في ذلك خيارات مستدامة وصديقة للبيئة عند المناسبة.",
        },
        {
          question: "من يملك الجناح بعد الفعالية؟",
          answer:
            "الجناح ملكك. نحن نقدّم التخزين وإعادة التركيب كخدمة لتسهيل الأمر حتى لا تضطر لإدارة اللوجستيات بين الفعاليات.",
        },
        {
          question: "هل توفرون تأميناً أو تغطية مسؤولية أثناء النقل والتركيب؟",
          answer:
            "نعم، عمليات اللوجستيات والتركيب لدينا تشمل تغطية لحماية جناحك خلال النقل والإعداد والتفكيك.",
        },
      ],
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
      gallery: "المعرض",
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
    briefForm: getBriefFormCopy("ar"),
    contactPage: {
      eyebrow: "تواصل",
      title: "نبدأ بمحادثة.",
      lead: "شاركنا الموجز — نعود بخطوة تالية واضحة.",
      info: {
        emailLabel: "البريد",
        phoneLabel: "الهاتف",
        whatsappLabel: "واتساب",
        addressLabel: "الاستوديو",
        socialLabel: "تابعنا",
      },
      map: {
        eyebrow: "الموقع",
        title: "اعثر على استوديونا.",
        support: "مقرنا الرياض — نسلّم معارض عبر السعودية والخليج ومصر.",
        openMaps: "افتح في Google Maps",
        hqLabel: "المقر",
      },
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
