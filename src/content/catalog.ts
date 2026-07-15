import type { Locale } from "@/lib/i18n";
import { media } from "@/content/media";
import { serviceDetailExtras } from "@/content/service-detail-extras";

export type ContentSeo = {
  title?: string;
  description?: string;
};

export type ServiceCoverItem = { title: string; description: string };

export type ServiceCover = {
  eyebrow: string;
  title: string;
  support: string;
  items: ServiceCoverItem[];
};

export type ServiceDesignItem = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  serviceSlug?: string;
};

export type ServiceDesigns = {
  eyebrow?: string;
  title: string;
  support?: string;
  cta?: { label: string; href: string };
  items: ServiceDesignItem[];
};

export type ServiceWhy = {
  title: string;
  support?: string;
  items: { title: string; description: string }[];
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
    overviewTitle?: string;
    overviewBullets?: { title: string; description: string }[];
    heroLead?: string;
    secondaryCta?: { label: string; serviceSlug: string };
    cover?: ServiceCover;
    designs?: ServiceDesigns;
    why?: ServiceWhy;
    benefits: { title: string; description: string }[];
    process: {
      title: string;
      description: string;
      image?: string;
      imageAlt?: string;
    }[];
    faq: { question: string; answer: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    overview: string;
    overviewTitle?: string;
    overviewBullets?: { title: string; description: string }[];
    heroLead?: string;
    secondaryCta?: { label: string; serviceSlug: string };
    cover?: ServiceCover;
    designs?: ServiceDesigns;
    why?: ServiceWhy;
    benefits: { title: string; description: string }[];
    process: {
      title: string;
      description: string;
      image?: string;
      imageAlt?: string;
    }[];
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
      title: "#1 Exhibition Booth Design & Production",
      excerpt:
        "Full-lifecycle exhibition booth production across Saudi Arabia — design, build, install, dismantle, and storage, all in-house.",
      heroLead:
        "Full-lifecycle exhibition booth production across Saudi Arabia — design, build, install, dismantle, and storage, all in-house.",
      overviewTitle: "Everything Your Booth Needs, Under One Roof",
      overview:
        "From design to teardown, CPS handles the full exhibition booth process in-house — no subcontractors, no delays.",
      overviewBullets: [
        {
          title: "We Design It",
          description: "Custom booth concepts built around your brand",
        },
        {
          title: "We Build It",
          description: "Fabricated in-house, not outsourced",
        },
        {
          title: "We Install It",
          description: "Set up on-site, ready before doors open",
        },
        {
          title: "We Take It Down",
          description: "Dismantling and storage handled too",
        },
      ],
      designs: {
        eyebrow: "Services",
        title: "Full Production, Handled In-House",
        support:
          "Every service your event or space needs — no outsourcing, no gaps.",
        cta: { label: "See All Services", href: "/services" },
        items: [
          {
            title: "Custom Fabrication & Manufacturing",
            description:
              "Built from scratch to match your brand and space.",
            image: media.services.fabrication,
            imageAlt: "Custom booth fabrication",
            serviceSlug: "custom-fabrication",
          },
          {
            title: "Design",
            description:
              "Concepts and layouts designed around your goals.",
            image: media.services.design,
            imageAlt: "Booth design",
            serviceSlug: "booth-design",
          },
          {
            title: "Dismantling, Storage & Reinstallation",
            description:
              "Careful teardown, safe storage, ready for next time.",
            image: media.services.storage,
            imageAlt: "Booth storage and reinstallation",
            serviceSlug: "storage-reinstallation",
          },
          {
            title: "Visual Branding & Print Solutions",
            description:
              "Decals, banners, flags, and window graphics.",
            image: media.services.branding,
            imageAlt: "Visual branding and print",
            serviceSlug: "visual-branding-print",
          },
          {
            title: "Lightbox Signage & Storefront",
            description:
              "LED signage that gets your brand noticed.",
            image: media.services.lightbox,
            imageAlt: "Lightbox signage",
            serviceSlug: "lightbox-retail-display",
          },
        ],
      },
      why: {
        title: "Why CPS",
        support: "Everything handled in-house, from start to finish.",
        items: [
          {
            title: "All In-House",
            description:
              "No subcontractors, full control at every step",
          },
          {
            title: "Full Lifecycle Support",
            description:
              "Design, build, install, store, reinstall",
          },
        ],
      },
      benefits: [
        {
          title: "All In-House",
          description: "No subcontractors, full control at every step",
        },
        {
          title: "Full Lifecycle Support",
          description: "Design, build, install, store, reinstall",
        },
        {
          title: "One Team",
          description: "No vendor handoffs across the booth lifecycle",
        },
      ],
      process: [],
      faq: [
        {
          question: "What happens if I need changes during the event?",
          answer:
            "Our team stays reachable during your event for any on-site adjustments or urgent fixes, so you're never left without support.",
        },
        {
          question:
            "Can you handle multiple booths across different cities at the same time?",
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
          question:
            "Do you provide insurance or liability coverage during transport and installation?",
          answer:
            "Yes, our logistics and installation processes include coverage to protect your booth throughout transport, setup, and dismantling.",
        },
      ],
    },
    ar: {
      title: "الأول في تصميم وإنتاج أجنحة المعارض",
      excerpt:
        "إنتاج أجنحة معارض بدورة حياة كاملة عبر السعودية — تصميم وبناء وتركيب وتفكيك وتخزين، بالكامل داخلياً.",
      heroLead:
        "إنتاج أجنحة معارض بدورة حياة كاملة عبر السعودية — تصميم وبناء وتركيب وتفكيك وتخزين، بالكامل داخلياً.",
      overviewTitle: "كل ما يحتاجه جناحك، تحت سقف واحد",
      overview:
        "من التصميم إلى التفكيك، CPS تتولى مسار جناح المعرض بالكامل داخلياً — بلا مقاولين فرعيين وبلا تأخير.",
      overviewBullets: [
        {
          title: "نصممه",
          description: "مفاهيم أجنحة مخصصة حول علامتك",
        },
        {
          title: "نبنيه",
          description: "يُصنَّع داخلياً، لا يُسنَد للخارج",
        },
        {
          title: "نركّبه",
          description: "يُعد في الموقع، جاهزاً قبل الافتتاح",
        },
        {
          title: "نُنزله",
          description: "التفكيك والتخزين أيضاً ضمن المسؤولية",
        },
      ],
      designs: {
        eyebrow: "الخدمات",
        title: "إنتاج متكامل — داخلياً",
        support:
          "كل خدمة يحتاجها حدثك أو مساحتك — بلا إسناد وبلا فجوات.",
        cta: { label: "كل الخدمات", href: "/services" },
        items: [
          {
            title: "تصنيع وتفصيل مخصص",
            description:
              "يُبنى من الصفر ليتوافق مع علامتك ومساحتك.",
            image: media.services.fabrication,
            imageAlt: "تصنيع جناح مخصص",
            serviceSlug: "custom-fabrication",
          },
          {
            title: "التصميم",
            description:
              "مفاهيم ومخططات مبنية حول أهدافك.",
            image: media.services.design,
            imageAlt: "تصميم الجناح",
            serviceSlug: "booth-design",
          },
          {
            title: "التفكيك والتخزين وإعادة التركيب",
            description:
              "تفكيك دقيق وتخزين آمن وجاهزية للمرة القادمة.",
            image: media.services.storage,
            imageAlt: "تخزين وإعادة تركيب الجناح",
            serviceSlug: "storage-reinstallation",
          },
          {
            title: "الهوية البصرية والطباعة",
            description:
              "ملصقات ولافتات وأعلام ورسومات نوافذ.",
            image: media.services.branding,
            imageAlt: "هوية بصرية وطباعة",
            serviceSlug: "visual-branding-print",
          },
          {
            title: "لافتات Lightbox والواجهات",
            description:
              "لافتات LED تلفت الانتباه لعلامتك.",
            image: media.services.lightbox,
            imageAlt: "لافتات lightbox",
            serviceSlug: "lightbox-retail-display",
          },
        ],
      },
      why: {
        title: "لماذا CPS",
        support: "كل شيء يُدار داخلياً، من البداية للنهاية.",
        items: [
          {
            title: "داخلي بالكامل",
            description:
              "بلا مقاولين فرعيين، وتحكم كامل في كل خطوة",
          },
          {
            title: "دعم دورة الحياة كاملة",
            description:
              "تصميم وبناء وتركيب وتخزين وإعادة تركيب",
          },
        ],
      },
      benefits: [
        {
          title: "داخلي بالكامل",
          description: "بلا مقاولين فرعيين، وتحكم كامل في كل خطوة",
        },
        {
          title: "دعم دورة الحياة كاملة",
          description: "تصميم وبناء وتركيب وتخزين وإعادة تركيب",
        },
        {
          title: "فريق واحد",
          description: "بلا تسليم بين موردين عبر دورة حياة الجناح",
        },
      ],
      process: [],
      faq: [
        {
          question: "ماذا لو احتجت تعديلات أثناء الحدث؟",
          answer:
            "فريقنا يبقى متاحاً أثناء حدثك لأي تعديلات في الموقع أو إصلاحات عاجلة، حتى لا تُترك بلا دعم.",
        },
        {
          question:
            "هل يمكنكم إدارة عدة أجنحة في مدن مختلفة في الوقت نفسه؟",
          answer:
            "نعم. فرق الإنتاج والتركيب تعمل عبر المدن الرئيسية في السعودية، ويمكننا إدارة عدة عمليات بناء بالتوازي.",
        },
        {
          question:
            "ماذا لو احتجت جزءاً فقط من المسار، مثل التصميم والتصنيع، وأردت تنفيذ التركيب بنفسي؟",
          answer:
            "لا مشكلة — حل الألف إلى الياء مرن. يمكننا تحديد نطاق الحزمة حول ما تحتاجه بالضبط وما تفضّل إدارته بنفسك.",
        },
        {
          question: "هل جناحي قابل لإعادة الاستخدام في أحداث قادمة؟",
          answer:
            "في معظم الحالات نعم. نصمم مع مراعاة إعادة الاستخدام حيث يمكن، وخدمة التخزين تبقي جناحك جاهزاً لإعادة التركيب في حدثك التالي.",
        },
        {
          question: "ما المواد التي تستخدمونها في التصنيع؟",
          answer:
            "نختار المواد وفق تصميمك وميزانيتك واحتياجات المتانة — بما في ذلك خيارات مستدامة وصديقة للبيئة حيث تناسب.",
        },
        {
          question: "من يملك الجناح بعد الحدث؟",
          answer:
            "الجناح ملكك. نحن نقدّم التخزين وإعادة التركيب كخدمة لتسهيل الأمر حتى لا تضطر لإدارة اللوجستيات بين الفعاليات.",
        },
        {
          question:
            "هل توفرون تأميناً أو تغطية مسؤولية أثناء النقل والتركيب؟",
          answer:
            "نعم، عمليات اللوجستيات والتركيب لدينا تشمل تغطية لحماية جناحك طوال النقل والإعداد والتفكيك.",
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
      heroLead: "Custom concepts built around your brand and space.",
      secondaryCta: {
        label: "A to Z Booth Solution",
        serviceSlug: "full-booth-management",
      },
      overview:
        "From first sketches to build-ready drawings, we design booths that attract, guide, and convert visitors on the show floor.",
      cover: {
        eyebrow: "Design scope",
        title: "What We Cover",
        support:
          "Everything in our booth design service — from first concept to signed-off drawings.",
        items: [
          {
            title: "Concept & Layout Planning",
            description:
              "We map out your booth's structure and flow before a single line is drawn — making sure the space works for your goals, not just your budget.",
          },
          {
            title: "3D Visualization",
            description:
              "See your booth before it's built. Detailed 3D renders let you walk through the design, request changes, and approve with confidence.",
          },
          {
            title: "Brand Integration",
            description:
              "Your colors, materials, and identity, translated into a physical space. Every design decision ties back to how your brand should feel in person.",
          },
          {
            title: "Space Planning",
            description:
              "We plan traffic flow, engagement zones, and sightlines so visitors move naturally through your booth — not just past it.",
          },
          {
            title: "Material & Finish Selection",
            description:
              "From textures to sustainable substrates, we help you choose materials that match your brand and hold up under real event conditions.",
          },
          {
            title: "Design Revisions & Approval",
            description:
              "We refine the concept with you until it's exactly right, so nothing moves forward without your full sign-off.",
          },
        ],
      },
      designs: {
        eyebrow: "Outcomes",
        title: "What we design",
        support:
          "Spatial concepts built for traffic, brand presence, and real fabrication constraints.",
        items: [
          {
            title: "Custom exhibition stands",
            description:
              "One-of-a-kind architecture shaped around your brand story and floor plan.",
            image: media.boothTypes.custom,
            imageAlt: "Custom exhibition stand",
          },
          {
            title: "Modular systems",
            description:
              "Flexible kits that look premium, install fast, and travel show to show.",
            image: media.boothTypes.modular,
            imageAlt: "Modular exhibition booth",
          },
          {
            title: "Double-deck experiences",
            description:
              "Multi-level presence that adds meeting space without losing floor impact.",
            image: media.boothTypes.doubleDeck,
            imageAlt: "Double-deck exhibition booth",
          },
          {
            title: "Demo & product stages",
            description:
              "Focal zones engineered for launches, AV, and hands-on product moments.",
            image: media.boothTypes.kiosk,
            imageAlt: "Product demo stage in a booth",
          },
          {
            title: "Meeting & lounge zones",
            description:
              "Quiet hospitality spaces that turn foot traffic into real conversations.",
            image: media.boothTypes.portable,
            imageAlt: "Booth meeting lounge",
          },
          {
            title: "Brand environments",
            description:
              "Immersive spatial identity — walls, lighting, and finishes that feel on-brand.",
            image: media.boothTypes.pavilion,
            imageAlt: "Branded exhibition environment",
          },
        ],
      },
      benefits: [
        { title: "Brand-led", description: "Layouts that express your identity clearly." },
        { title: "Visitor flow", description: "Circulation planned for engagement and demos." },
        { title: "Buildable", description: "Designs engineered for real fabrication timelines." },
      ],
      process: [
        {
          title: "Brief",
          description:
            "We start by understanding your goals, brand, and event requirements.",
          image: media.about.mission,
          imageAlt: "Brief and discovery workshop",
        },
        {
          title: "Concept",
          description:
            "Our team develops initial design directions based on your brief.",
          image: media.services.design,
          imageAlt: "Booth concept design",
        },
        {
          title: "3D Render",
          description:
            "Your concept comes to life as a detailed 3D visualization.",
          image: media.boothTypes.custom,
          imageAlt: "3D booth visualization",
        },
        {
          title: "Revisions",
          description:
            "We refine the design together until it's exactly right.",
          image: media.about.studio,
          imageAlt: "Design revisions collaboration",
        },
        {
          title: "Final Approval",
          description:
            "Once you're happy, the design is locked and finalized.",
          image: media.boothTypes.modular,
          imageAlt: "Final booth design approval",
        },
        {
          title: "Production",
          description:
            "Your approved design moves straight to our in-house fabrication team.",
          image: media.services.fabrication,
          imageAlt: "In-house booth fabrication",
        },
      ],
      faq: [
        {
          question: "How long does the design process take?",
          answer:
            "Timelines vary by booth complexity, but most concepts move from brief to final approval within a few weeks. We'll confirm a clear timeline once we understand your event date and requirements.",
        },
        {
          question: "Can I request changes after seeing the 3D render?",
          answer:
            "Yes. Revisions are part of the process — we refine the design with you until it's exactly what you want before moving to production.",
        },
        {
          question: "Do you design for all booth types?",
          answer:
            "Yes, from compact kiosks to full pavilions. Whatever format fits your event, our design team can build a concept around it.",
        },
        {
          question: "Will the final booth look exactly like the design?",
          answer:
            "Yes. Because design and production are handled by the same company, what you approve is what gets built — no surprises.",
        },
        {
          question: "Do I need to provide brand guidelines?",
          answer:
            "It helps, but it's not required. If you don't have formal guidelines, our team will work with your existing materials (logo, colors, past marketing) to keep the design on-brand.",
        },
        {
          question:
            "Can you design a booth for a space I don't have measurements for yet?",
          answer:
            "We recommend having your space dimensions or exhibition floor plan first, so the design fits properly from the start — but we can guide you on what to request from the event organizer if needed.",
        },
      ],
    },
    ar: {
      title: "تصميم الأجنحة",
      excerpt: "مفاهيم ومخططات مبنية حول علامتك ومخطط الأرضية.",
      heroLead: "مفاهيم مخصصة تُبنى حول علامتك ومساحتك.",
      secondaryCta: {
        label: "حل الجناح من الألف إلى الياء",
        serviceSlug: "full-booth-management",
      },
      overview:
        "من المسودات الأولى إلى رسومات جاهزة للبناء، نصمم أجنحة تجذب الزوار وتوجّههم وتحوّلهم على أرض المعرض.",
      cover: {
        eyebrow: "نطاق التصميم",
        title: "ماذا نغطي",
        support:
          "كل ما يشمله تصميم الجناح — من المفهوم الأول حتى الرسومات المعتمدة.",
        items: [
          {
            title: "تخطيط المفهوم والمخطط",
            description:
              "نحدد هيكل الجناح وتدفقه قبل أي رسم — ليخدم أهدافك لا ميزانيتك فقط.",
          },
          {
            title: "تصور ثلاثي الأبعاد",
            description:
              "شاهد جناحك قبل البناء. رندر ثلاثي الأبعاد مفصّل يتيح لك المرور عبر التصميم وطلب التعديلات والموافقة بثقة.",
          },
          {
            title: "دمج الهوية البصرية",
            description:
              "ألوانك وموادك وهويتك، مترجمة إلى فراغ مادي. كل قرار تصميمي يعود إلى كيف يجب أن تُحس علامتك شخصياً.",
          },
          {
            title: "تخطيط المساحة",
            description:
              "نخطط تدفق الحركة ومناطق التفاعل وخطوط النظر ليتحرك الزوار طبيعياً داخل جناحك — لا يمرّوا به فقط.",
          },
          {
            title: "اختيار المواد والتشطيبات",
            description:
              "من الخامات إلى الأسطح المستدامة، نساعدك على اختيار مواد تطابق علامتك وتتحمل ظروف الحدث الحقيقية.",
          },
          {
            title: "مراجعات التصميم والموافقة",
            description:
              "نطوّر المفهوم معك حتى يصبح بالضبط كما تريد، فلا يتقدم شيء دون موافقتك الكاملة.",
          },
        ],
      },
      designs: {
        eyebrow: "النتائج",
        title: "ماذا نصمم",
        support:
          "مفاهيم فراغية مبنية حول الحركة وحضور العلامة وقيود التصنيع الحقيقية.",
        items: [
          {
            title: "أجنحة مخصصة",
            description:
              "عمارة فريدة تُشكَّل حول قصة علامتك ومخطط الأرضية.",
            image: media.boothTypes.custom,
            imageAlt: "جناح معرض مخصص",
          },
          {
            title: "أنظمة معيارية",
            description:
              "حلول مرنة بمظهر راقٍ وتركيب سريع وتنتقل من معرض لآخر.",
            image: media.boothTypes.modular,
            imageAlt: "جناح معياري",
          },
          {
            title: "تجارب بطابقين",
            description:
              "حضور متعدد المستويات يضيف مساحات اجتماع دون فقدان التأثير على الأرض.",
            image: media.boothTypes.doubleDeck,
            imageAlt: "جناح بطابقين",
          },
          {
            title: "مسارح العرض والمنتجات",
            description:
              "مناطق محورية مصممة للإطلاق والعروض التقنية والتجربة المباشرة.",
            image: media.boothTypes.kiosk,
            imageAlt: "منطقة عرض منتجات",
          },
          {
            title: "مناطق الاجتماع والضيافة",
            description:
              "مساحات هادئة تحوّل مرور الزوار إلى محادثات حقيقية.",
            image: media.boothTypes.portable,
            imageAlt: "منطقة اجتماع داخل الجناح",
          },
          {
            title: "بيئات العلامة",
            description:
              "هوية فراغية غامرة — جدران وإضاءة وتشطيبات تعكس العلامة.",
            image: media.boothTypes.pavilion,
            imageAlt: "بيئة علامة في المعرض",
          },
        ],
      },
      benefits: [
        { title: "بقيادة العلامة", description: "مخططات تعبّر عن هويتك بوضوح." },
        { title: "تدفق الزوار", description: "حركة مخططة للتفاعل والعروض." },
        { title: "قابل للبناء", description: "تصاميم مهندسة لجداول تصنيع حقيقية." },
      ],
      process: [
        {
          title: "الموجز",
          description:
            "نبدأ بفهم أهدافك وعلامتك ومتطلبات الحدث.",
          image: media.about.mission,
          imageAlt: "ورشة الموجز والاكتشاف",
        },
        {
          title: "المفهوم",
          description:
            "فريقنا يطوّر اتجاهات تصميم أولية بناءً على موجزك.",
          image: media.services.design,
          imageAlt: "تصميم مفهوم الجناح",
        },
        {
          title: "رندر ثلاثي الأبعاد",
          description:
            "مفهومك يتحوّل إلى تصور ثلاثي الأبعاد مفصّل.",
          image: media.boothTypes.custom,
          imageAlt: "تصور ثلاثي الأبعاد للجناح",
        },
        {
          title: "المراجعات",
          description:
            "نطوّر التصميم معاً حتى يصبح بالضبط كما تريد.",
          image: media.about.studio,
          imageAlt: "مراجعات التصميم",
        },
        {
          title: "الموافقة النهائية",
          description:
            "بمجرد رضاك، يُغلق التصميم ويُعتمد نهائياً.",
          image: media.boothTypes.modular,
          imageAlt: "الموافقة النهائية على التصميم",
        },
        {
          title: "الإنتاج",
          description:
            "تصميمك المعتمد ينتقل مباشرة إلى فريق التصنيع الداخلي لدينا.",
          image: media.services.fabrication,
          imageAlt: "تصنيع الجناح داخلياً",
        },
      ],
      faq: [
        {
          question: "كم يستغرق مسار التصميم؟",
          answer:
            "المدد تختلف حسب تعقيد الجناح، لكن أغلب المفاهيم تنتقل من الموجز إلى الموافقة النهائية خلال أسابيع قليلة. نؤكّد جدولاً واضحاً بعد فهم تاريخ الحدث ومتطلباتك.",
        },
        {
          question: "هل يمكن طلب تعديلات بعد رؤية الرندر ثلاثي الأبعاد؟",
          answer:
            "نعم. المراجعات جزء من المسار — نطوّر التصميم معك حتى يصبح تماماً كما تريد قبل الانتقال للإنتاج.",
        },
        {
          question: "هل تصممون لكل أنواع الأجنحة؟",
          answer:
            "نعم، من الأكشاك المدمجة إلى الأجنحة الوطنية الكاملة. أي صيغة تناسب حدثك، فريق التصميم يبني مفهوماً حولها.",
        },
        {
          question: "هل سيبدو الجناح النهائي مطابقاً للتصميم؟",
          answer:
            "نعم. لأن التصميم والإنتاج يديرهما نفس الشركة، ما تعتمده هو ما يُبنى — بلا مفاجآت.",
        },
        {
          question: "هل أحتاج لتوفير دليل الهوية البصرية؟",
          answer:
            "يساعد، لكنه غير إلزامي. إن لم يكن لديك دليل رسمي، يعمل فريقنا مع موادك الحالية (الشعار والألوان والحملات السابقة) لإبقاء التصميم متسقاً مع العلامة.",
        },
        {
          question: "هل يمكن تصميم جناح لمساحة بلا قياسات بعد؟",
          answer:
            "نوصي بتوفير أبعاد المساحة أو مخطط أرضية المعرض أولاً حتى يناسب التصميم من البداية — ويمكننا إرشادك لما تطلبه من منظم الحدث إن لزم.",
        },
      ],
    },
  },
  {
    slug: "custom-fabrication",
    order: 3,
    image: media.services.fabrication,
    imageAlt: "Booth manufacturing workshop",
    en: {
      title: "Booth Manufacturing",
      excerpt: "Every booth is fabricated in our own workshop, start to finish.",
      heroLead: "Every booth is fabricated in our own workshop, start to finish.",
      overviewTitle: "Built by Us, Not Outsourced",
      overview:
        "Every booth is fabricated in our own workshop, start to finish.",
      overviewBullets: [
        {
          title: "Fully In-House",
          description: "No subcontractors, full control over quality",
        },
        {
          title: "Built to Spec",
          description: "Every detail matches the approved design, exactly",
        },
        {
          title: "Durable Materials",
          description: "Built to withstand real event conditions",
        },
        {
          title: "Sustainable Options Available",
          description: "Eco-friendly substrates and finishes on request",
        },
      ],
      cover: {
        eyebrow: "Build scope",
        title: "What We Cover",
        support:
          "In-house fabrication from structure to finish — built to the approved design.",
        items: [
          {
            title: "Structural Fabrication",
            description:
              "Frames and structures built to handle repeated use and transport.",
          },
          {
            title: "Custom Finishes",
            description:
              "Textures, colors, and surface treatments matched to your brand.",
          },
          {
            title: "Material Selection",
            description:
              "From standard substrates to sustainable, eco-friendly alternatives.",
          },
          {
            title: "Quality Control",
            description:
              "Every piece checked before it leaves our workshop.",
          },
          {
            title: "Precision Assembly",
            description:
              "Components built and tested for a clean, accurate on-site build.",
          },
          {
            title: "Scalable Production",
            description:
              "From single booths to multi-city rollouts, produced at the scale you need.",
          },
        ],
      },
      benefits: [
        {
          title: "Fully In-House",
          description: "No subcontractors, full control over quality",
        },
        {
          title: "Built to Spec",
          description: "Every detail matches the approved design, exactly",
        },
        {
          title: "Durable Materials",
          description: "Built to withstand real event conditions",
        },
      ],
      process: [
        {
          title: "Design Handoff",
          description:
            "Approved design comes straight to our production team.",
          image: media.services.design,
          imageAlt: "Design handoff to production",
        },
        {
          title: "Material Prep",
          description:
            "Materials sourced and prepared to spec.",
          image: media.about.studio,
          imageAlt: "Material preparation",
        },
        {
          title: "Fabrication",
          description:
            "Built in-house, piece by piece.",
          image: media.services.fabrication,
          imageAlt: "In-house booth fabrication",
        },
        {
          title: "Quality Check",
          description:
            "Every element inspected before completion.",
          image: media.boothTypes.modular,
          imageAlt: "Fabrication quality check",
        },
        {
          title: "Ready for Installation",
          description:
            "Packed and prepared for on-site setup.",
          image: media.services.installation,
          imageAlt: "Booth packed for installation",
        },
      ],
      faq: [
        {
          question:
            "Do you fabricate everything in-house, or use subcontractors?",
          answer:
            "Everything is built in our own workshop — no subcontractors, so quality stays consistent from start to finish.",
        },
        {
          question: "Can you match my brand's exact colors and materials?",
          answer:
            "Yes, we work from your brand guidelines or existing materials to match colors, textures, and finishes as closely as possible.",
        },
        {
          question: "Do you offer sustainable or eco-friendly materials?",
          answer:
            "Yes, we offer eco-friendly substrates and finishes for clients who want a more sustainable build.",
        },
        {
          question: "How long does fabrication take?",
          answer:
            "Timelines depend on booth size and complexity — we'll confirm a clear production schedule once your design is finalized.",
        },
        {
          question:
            "Can you fabricate booths for multiple cities or events at once?",
          answer:
            "Yes, our production capacity supports parallel builds across multiple projects.",
        },
        {
          question:
            "What happens if something needs to be repaired or replaced later?",
          answer:
            "Since we fabricate everything ourselves, repairs and replacements are handled quickly and matched exactly to the original build.",
        },
      ],
    },
    ar: {
      title: "تصنيع الأجنحة",
      excerpt: "كل جناح يُصنَّع في ورشتنا الخاصة من البداية للنهاية.",
      heroLead: "كل جناح يُصنَّع في ورشتنا الخاصة من البداية للنهاية.",
      overviewTitle: "نبنيه نحن، لا نُسنِده للخارج",
      overview:
        "كل جناح يُصنَّع في ورشتنا الخاصة من البداية للنهاية.",
      overviewBullets: [
        {
          title: "داخلي بالكامل",
          description: "بلا مقاولين فرعيين، وتحكم كامل بالجودة",
        },
        {
          title: "مطابق للمواصفات",
          description: "كل تفصيلة تطابق التصميم المعتمد تماماً",
        },
        {
          title: "مواد متينة",
          description: "مبني ليتحمل ظروف الحدث الحقيقية",
        },
        {
          title: "خيارات مستدامة متاحة",
          description: "أسطح وتشطيبات صديقة للبيئة عند الطلب",
        },
      ],
      cover: {
        eyebrow: "نطاق البناء",
        title: "ماذا نغطي",
        support:
          "تصنيع داخلي من الهيكل إلى التشطيب — وفق التصميم المعتمد.",
        items: [
          {
            title: "تصنيع هيكلي",
            description:
              "إطارات وهياكل مبنية لتتحمل الاستخدام المتكرر والنقل.",
          },
          {
            title: "تشطيبات مخصصة",
            description:
              "خامات وألوان ومعالجات سطحية مطابقة لعلامتك.",
          },
          {
            title: "اختيار المواد",
            description:
              "من الأسطح القياسية إلى البدائل المستدامة والصديقة للبيئة.",
          },
          {
            title: "مراقبة الجودة",
            description:
              "كل قطعة تُفحص قبل مغادرة ورشتنا.",
          },
          {
            title: "تجميع دقيق",
            description:
              "مكونات تُبنى وتُختبر لبناء نظيف ودقيق في الموقع.",
          },
          {
            title: "إنتاج قابل للتوسع",
            description:
              "من جناح واحد إلى نشر متعدد المدن، بالحجم الذي تحتاجه.",
          },
        ],
      },
      benefits: [
        {
          title: "داخلي بالكامل",
          description: "بلا مقاولين فرعيين، وتحكم كامل بالجودة",
        },
        {
          title: "مطابق للمواصفات",
          description: "كل تفصيلة تطابق التصميم المعتمد تماماً",
        },
        {
          title: "مواد متينة",
          description: "مبني ليتحمل ظروف الحدث الحقيقية",
        },
      ],
      process: [
        {
          title: "تسليم التصميم",
          description:
            "التصميم المعتمد يصل مباشرة إلى فريق الإنتاج.",
          image: media.services.design,
          imageAlt: "تسليم التصميم للإنتاج",
        },
        {
          title: "تجهيز المواد",
          description:
            "المواد تُجلب وتُجهَّز وفق المواصفات.",
          image: media.about.studio,
          imageAlt: "تجهيز المواد",
        },
        {
          title: "التصنيع",
          description:
            "يُبنى داخلياً، قطعة بقطعة.",
          image: media.services.fabrication,
          imageAlt: "تصنيع الجناح داخلياً",
        },
        {
          title: "فحص الجودة",
          description:
            "كل عنصر يُفحص قبل الإكمال.",
          image: media.boothTypes.modular,
          imageAlt: "فحص جودة التصنيع",
        },
        {
          title: "جاهز للتركيب",
          description:
            "يُعبَّأ ويُجهَّز للإعداد في الموقع.",
          image: media.services.installation,
          imageAlt: "الجناح جاهز للتركيب",
        },
      ],
      faq: [
        {
          question: "هل تصنّعون كل شيء داخلياً أم تستخدمون مقاولين فرعيين؟",
          answer:
            "كل شيء يُبنى في ورشتنا الخاصة — بلا مقاولين فرعيين، فتبقى الجودة متسقة من البداية للنهاية.",
        },
        {
          question: "هل يمكنكم مطابقة ألوان ومواد علامتي بدقة؟",
          answer:
            "نعم، نعمل من دليل علامتكم أو موادكم الحالية لمطابقة الألوان والخامات والتشطيبات بأقرب ما يمكن.",
        },
        {
          question: "هل توفرون مواد مستدامة أو صديقة للبيئة؟",
          answer:
            "نعم، نوفر أسطحاً وتشطيبات صديقة للبيئة للعملاء الذين يريدون بناءً أكثر استدامة.",
        },
        {
          question: "كم يستغرق التصنيع؟",
          answer:
            "المدد تعتمد على حجم الجناح وتعقيده — نؤكّد جدولاً واضحاً للإنتاج بعد اعتماد التصميم.",
        },
        {
          question: "هل يمكن تصنيع أجنحة لعدة مدن أو فعاليات في وقت واحد؟",
          answer:
            "نعم، قدرة الإنتاج لدينا تدعم بناءً متوازياً عبر مشاريع متعددة.",
        },
        {
          question: "ماذا لو احتاج شيء إصلاحاً أو استبدالاً لاحقاً؟",
          answer:
            "لأننا نصنّع كل شيء بأنفسنا، تُعالَج الإصلاحات والاستبدالات بسرعة وتُطابق البناء الأصلي تماماً.",
        },
      ],
    },
  },
  {
    slug: "installation-dismantling",
    order: 4,
    image: media.services.installation,
    imageAlt: "Booth installation and dismantling",
    en: {
      title: "Installation & Dismantling",
      excerpt:
        "On-site setup and careful teardown — ready before doors open, protected when the show ends.",
      heroLead:
        "On-site setup and careful teardown — ready before doors open, protected when the show ends.",
      secondaryCta: {
        label: "A to Z Booth Solution",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "Built On-Site. Taken Down Right.",
      overview:
        "Our crews handle install and dismantling with the same precision as the build — so your booth looks right on day one and lasts for the next show.",
      overviewBullets: [
        {
          title: "Venue-Ready Crews",
          description: "Teams who know exhibition logistics, access windows, and show pressure",
        },
        {
          title: "Clean Install",
          description: "Structure, graphics, and AV set up and tested before doors open",
        },
        {
          title: "Careful Teardown",
          description: "Components protected and labeled for reuse, storage, or transport",
        },
        {
          title: "Show-Day Support",
          description: "On-floor coverage when something needs a fast fix",
        },
      ],
      cover: {
        eyebrow: "On-site scope",
        title: "What We Cover",
        support:
          "From site survey to final outbound — install and dismantling handled by one CPS crew.",
        items: [
          {
            title: "Site Survey & Planning",
            description:
              "Access, power, floor load, and schedule constraints checked before the crew arrives.",
          },
          {
            title: "Crew Mobilization",
            description:
              "The right team, tools, and sequencing locked to your venue window — including overnight builds.",
          },
          {
            title: "Booth Installation",
            description:
              "Structure, furniture, graphics, and AV assembled cleanly on the show floor.",
          },
          {
            title: "Systems Check",
            description:
              "Lighting, screens, and power tested so everything works before the hall opens.",
          },
          {
            title: "Show Support",
            description:
              "On-site adjustments during the event when something needs attention fast.",
          },
          {
            title: "Professional Dismantling",
            description:
              "Structured teardown that protects every component for storage, reuse, or shipping.",
          },
        ],
      },
      benefits: [
        {
          title: "Venue-Ready Crews",
          description: "Teams who know exhibition logistics and show pressure",
        },
        {
          title: "Clean Install",
          description: "Set up and tested before doors open",
        },
        {
          title: "Careful Teardown",
          description: "Components protected for the next cycle",
        },
      ],
      process: [
        {
          title: "Brief",
          description:
            "We align drawings, access windows, and crew requirements with the venue plan.",
          image: media.about.mission,
          imageAlt: "Install brief and planning",
        },
        {
          title: "Survey",
          description:
            "Site conditions, power, and logistics are confirmed on the ground.",
          image: media.services.management,
          imageAlt: "Venue site survey",
        },
        {
          title: "Install",
          description:
            "Build, dress, and test before the hall opens.",
          image: media.services.installation,
          imageAlt: "Booth installation in progress",
        },
        {
          title: "Support",
          description:
            "On-floor coverage for adjustments during the show.",
          image: media.boothTypes.modular,
          imageAlt: "Show-floor support",
        },
        {
          title: "Dismantle",
          description:
            "Careful teardown, inventory, and outbound handoff.",
          image: media.services.storage,
          imageAlt: "Booth dismantling",
        },
      ],
      faq: [
        {
          question: "Do you work overnight install windows?",
          answer:
            "Yes. We plan crews around venue access windows, including overnight and early-morning builds when the schedule requires it.",
        },
        {
          question: "Can you install a booth you didn't fabricate?",
          answer:
            "In many cases, yes — as long as we have clear drawings, packing lists, and access to the components. We'll confirm feasibility after reviewing your materials.",
        },
        {
          question: "What happens if something breaks during installation?",
          answer:
            "Our crew flags issues immediately and coordinates with production for a fast fix — because install and fabrication sit under one CPS team when it's our build.",
        },
        {
          question: "Do you handle permits and venue coordination?",
          answer:
            "Yes. We coordinate with organizers and venues on access, power, and install rules as part of the on-site process.",
        },
        {
          question: "Is dismantling included with installation?",
          answer:
            "It can be — most clients book install and dismantling together. You can also book them separately if you only need one side of the process.",
        },
        {
          question: "Can you dismantle and hand off to storage?",
          answer:
            "Yes. After teardown we can transfer components straight into our storage and reinstallation program, or prepare them for outbound shipping.",
        },
      ],
    },
    ar: {
      title: "التركيب والتفكيك",
      excerpt:
        "إعداد في الموقع وتفكيك دقيق — جاهز قبل الافتتاح، ومحمي عند انتهاء المعرض.",
      heroLead:
        "إعداد في الموقع وتفكيك دقيق — جاهز قبل الافتتاح، ومحمي عند انتهاء المعرض.",
      secondaryCta: {
        label: "حل الجناح من الألف إلى الياء",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "يُركَّب في الموقع. ويُنزَل بالطريقة الصحيحة.",
      overview:
        "فرقنا تتولى التركيب والتفكيك بنفس دقة البناء — ليظهر جناحك بشكل صحيح من اليوم الأول ويدوم للمعرض التالي.",
      overviewBullets: [
        {
          title: "فرق جاهزة للموقع",
          description: "فرق تعرف لوجستيات المعارض ونوافذ الوصول وضغط يوم العرض",
        },
        {
          title: "تركيب نظيف",
          description: "هيكل ورسومات وAV تُعد وتُختبر قبل الافتتاح",
        },
        {
          title: "تفكيك دقيق",
          description: "مكونات محمية وموسومة لإعادة الاستخدام أو التخزين أو النقل",
        },
        {
          title: "دعم يوم المعرض",
          description: "تغطية على الأرض عندما يحتاج شيء إصلاحاً سريعاً",
        },
      ],
      cover: {
        eyebrow: "نطاق الموقع",
        title: "ماذا نغطي",
        support:
          "من مسح الموقع إلى الخروج النهائي — تركيب وتفكيك بفريق CPS واحد.",
        items: [
          {
            title: "مسح الموقع والتخطيط",
            description:
              "الوصول والطاقة وتحمل الأرضية وقيود الجدول تُفحص قبل وصول الفريق.",
          },
          {
            title: "تحريك الفريق",
            description:
              "الفريق والأدوات والتسلسل يُغلقان وفق نافذة موقعك — بما في ذلك البناء الليلي.",
          },
          {
            title: "تركيب الجناح",
            description:
              "الهيكل والأثاث والرسومات وAV تُجمَّع بوضوح على أرض المعرض.",
          },
          {
            title: "فحص الأنظمة",
            description:
              "الإضاءة والشاشات والطاقة تُختبر لتعمل كل شيء قبل افتتاح القاعة.",
          },
          {
            title: "دعم المعرض",
            description:
              "تعديلات في الموقع أثناء الحدث عندما يحتاج شيء انتباهاً سريعاً.",
          },
          {
            title: "تفكيك احترافي",
            description:
              "إنزال منظم يحمي كل مكوّن للتخزين أو إعادة الاستخدام أو الشحن.",
          },
        ],
      },
      benefits: [
        {
          title: "فرق جاهزة للموقع",
          description: "فرق تعرف لوجستيات المعارض وضغط يوم العرض",
        },
        {
          title: "تركيب نظيف",
          description: "يُعد ويُختبر قبل الافتتاح",
        },
        {
          title: "تفكيك دقيق",
          description: "مكونات محمية للدورة التالية",
        },
      ],
      process: [
        {
          title: "الموجز",
          description:
            "نواءم الرسومات ونوافذ الوصول ومتطلبات الفريق مع خطة الموقع.",
          image: media.about.mission,
          imageAlt: "موجز وتخطيط التركيب",
        },
        {
          title: "المسح",
          description:
            "ظروف الموقع والطاقة واللوجستيات تُؤكَّد على الأرض.",
          image: media.services.management,
          imageAlt: "مسح موقع المعرض",
        },
        {
          title: "التركيب",
          description:
            "بناء وتجهيز واختبار قبل افتتاح القاعة.",
          image: media.services.installation,
          imageAlt: "تركيب الجناح جارٍ",
        },
        {
          title: "الدعم",
          description:
            "تغطية على الأرض للتعديلات أثناء المعرض.",
          image: media.boothTypes.modular,
          imageAlt: "دعم أرض المعرض",
        },
        {
          title: "التفكيك",
          description:
            "إنزال دقيق وجرد وتسليم خروج.",
          image: media.services.storage,
          imageAlt: "تفكيك الجناح",
        },
      ],
      faq: [
        {
          question: "هل تعملون في نوافذ تركيب ليلية؟",
          answer:
            "نعم. نخطط الفرق وفق نوافذ وصول الموقع، بما في ذلك البناء الليلي والصباحي المبكر عندما يتطلب الجدول ذلك.",
        },
        {
          question: "هل يمكنكم تركيب جناح لم تصنّعوه؟",
          answer:
            "في كثير من الحالات نعم — طالما تتوفر رسومات واضحة وقوائم تعبئة ووصول للمكونات. نؤكّد الإمكانية بعد مراجعة موادكم.",
        },
        {
          question: "ماذا لو تعطّل شيء أثناء التركيب؟",
          answer:
            "فريقنا يحدّد المشكلة فوراً وينسّق مع الإنتاج لإصلاح سريع — لأن التركيب والتصنيع تحت فريق CPS واحد عندما يكون البناء لنا.",
        },
        {
          question: "هل تتولون التصاريح والتنسيق مع الموقع؟",
          answer:
            "نعم. ننسّق مع المنظمين والمواقع بشأن الوصول والطاقة وقواعد التركيب كجزء من مسار العمل في الموقع.",
        },
        {
          question: "هل التفكيك مشمول مع التركيب؟",
          answer:
            "يمكن ذلك — أغلب العملاء يحجزون التركيب والتفكيك معاً. ويمكن حجزهما بشكل منفصل إن احتجت جانباً واحداً فقط.",
        },
        {
          question: "هل يمكن التفكيك والتسليم للتخزين؟",
          answer:
            "نعم. بعد الإنزال يمكننا نقل المكونات مباشرة إلى برنامج التخزين وإعادة التركيب، أو تجهيزها للشحن الخارجي.",
        },
      ],
    },
  },
  {
    slug: "storage-reinstallation",
    order: 5,
    image: media.services.storage,
    imageAlt: "Booth storage and reinstallation",
    en: {
      title: "Booth Dismantling, Storage & Reinstallation",
      excerpt: "Your booth, protected and ready for next time.",
      heroLead: "Your booth, protected and ready for next time.",
      secondaryCta: {
        label: "A to Z Booth Solution",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "Your Booth Doesn't End at the Show",
      overview: "We take care of what happens after the event, too.",
      overviewBullets: [
        {
          title: "Careful Dismantling",
          description: "Handled with the same care as the build",
        },
        {
          title: "Climate-Controlled Storage",
          description: "Protected until your next event",
        },
        {
          title: "Ready When You Are",
          description: "Reinstalled quickly, without starting from scratch",
        },
        {
          title: "One Team, One Responsibility",
          description: "Your booth never changes hands between vendors",
        },
      ],
      cover: {
        eyebrow: "After the show",
        title: "What We Cover",
        support:
          "From careful teardown to climate-controlled storage and the next reinstall.",
        items: [
          {
            title: "Professional Dismantling",
            description:
              "Structured teardown that protects every component for reuse.",
          },
          {
            title: "Transportation",
            description:
              "Safe handling and transport from the event site to storage.",
          },
          {
            title: "Climate-Controlled Storage",
            description:
              "Facilities that keep your booth in ready-to-use condition between events.",
          },
          {
            title: "Inventory Tracking",
            description:
              "Every piece logged and accounted for, so nothing gets lost between events.",
          },
          {
            title: "Reinstallation",
            description:
              "Your booth set up again for the next show, without rebuilding from scratch.",
          },
          {
            title: "Condition Checks",
            description:
              "We inspect your booth before reinstallation and flag anything that needs attention.",
          },
        ],
      },
      benefits: [
        {
          title: "Careful Dismantling",
          description: "Handled with the same care as the build",
        },
        {
          title: "Climate-Controlled Storage",
          description: "Protected until your next event",
        },
        {
          title: "Ready When You Are",
          description: "Reinstalled quickly, without starting from scratch",
        },
      ],
      process: [
        {
          title: "Dismantling",
          description: "Careful teardown once your event ends.",
          image: media.services.installation,
          imageAlt: "Booth dismantling after the show",
        },
        {
          title: "Transport",
          description: "Safe handling to our storage facility.",
          image: media.services.management,
          imageAlt: "Booth transport to storage",
        },
        {
          title: "Storage",
          description: "Climate-controlled, inventory-tracked.",
          image: media.services.storage,
          imageAlt: "Climate-controlled booth storage",
        },
        {
          title: "Condition Check",
          description: "Inspected before your next event.",
          image: media.about.studio,
          imageAlt: "Booth condition check",
        },
        {
          title: "Reinstallation",
          description: "Set up and ready for the next show.",
          image: media.boothTypes.modular,
          imageAlt: "Booth reinstallation",
        },
      ],
      faq: [
        {
          question: "How long can you store my booth?",
          answer:
            "As long as you need — many clients store between seasonal or annual events. We'll confirm storage terms based on your schedule.",
        },
        {
          question: "Is my booth safe in storage?",
          answer:
            "Yes, our facilities are climate-controlled and monitored, keeping materials and finishes in the same condition as when they arrived.",
        },
        {
          question: "Can you reinstall my booth for a different event or city?",
          answer:
            "Yes, we handle reinstallation across major cities in Saudi Arabia, not just the original event location.",
        },
        {
          question: "What if my booth needs repairs before reinstallation?",
          answer:
            "We inspect every booth before reinstallation and flag any wear or damage, so it's addressed before your next event.",
        },
        {
          question: "Do I need to book storage in advance?",
          answer:
            "It helps, especially around busy event seasons, but we can also accommodate short-notice requests depending on availability.",
        },
        {
          question: "What happens if I don't need the booth stored long-term?",
          answer:
            "No problem — dismantling and transport are available as standalone services without ongoing storage.",
        },
      ],
    },
    ar: {
      title: "تفكيك وتخزين وإعادة تركيب الأجنحة",
      excerpt: "جناحك محمي وجاهز للمرة القادمة.",
      heroLead: "جناحك محمي وجاهز للمرة القادمة.",
      secondaryCta: {
        label: "حل الجناح من الألف إلى الياء",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "جناحك لا ينتهي عند انتهاء المعرض",
      overview: "نهتم أيضاً بما يحدث بعد الحدث.",
      overviewBullets: [
        {
          title: "تفكيك دقيق",
          description: "بنفس العناية التي بُني بها",
        },
        {
          title: "تخزين بتحكم مناخي",
          description: "محمي حتى حدثك التالي",
        },
        {
          title: "جاهز عندما تكون جاهزاً",
          description: "يُعاد تركيبه بسرعة دون البدء من الصفر",
        },
        {
          title: "فريق واحد ومسؤولية واحدة",
          description: "جناحك لا ينتقل بين موردين",
        },
      ],
      cover: {
        eyebrow: "بعد المعرض",
        title: "ماذا نغطي",
        support:
          "من تفكيك دقيق إلى تخزين بتحكم مناخي وإعادة التركيب التالية.",
        items: [
          {
            title: "تفكيك احترافي",
            description:
              "إنزال منظم يحمي كل مكوّن لإعادة الاستخدام.",
          },
          {
            title: "النقل",
            description:
              "مناولة ونقل آمن من موقع الحدث إلى التخزين.",
          },
          {
            title: "تخزين بتحكم مناخي",
            description:
              "مرافق تبقي جناحك بحالة جاهزة للاستخدام بين الأحداث.",
          },
          {
            title: "تتبع الجرد",
            description:
              "كل قطعة مسجّلة ومحسوبة حتى لا يضيع شيء بين الأحداث.",
          },
          {
            title: "إعادة التركيب",
            description:
              "جناحك يُعد مرة أخرى للمعرض التالي دون إعادة بناء من الصفر.",
          },
          {
            title: "فحوصات الحالة",
            description:
              "نفتش جناحك قبل إعادة التركيب ونحدّد أي شيء يحتاج انتباهاً.",
          },
        ],
      },
      benefits: [
        {
          title: "تفكيك دقيق",
          description: "بنفس العناية التي بُني بها",
        },
        {
          title: "تخزين بتحكم مناخي",
          description: "محمي حتى حدثك التالي",
        },
        {
          title: "جاهز عندما تكون جاهزاً",
          description: "يُعاد تركيبه بسرعة دون البدء من الصفر",
        },
      ],
      process: [
        {
          title: "التفكيك",
          description: "إنزال دقيق بعد انتهاء حدثك.",
          image: media.services.installation,
          imageAlt: "تفكيك الجناح بعد المعرض",
        },
        {
          title: "النقل",
          description: "مناولة آمنة إلى منشأة التخزين.",
          image: media.services.management,
          imageAlt: "نقل الجناح للتخزين",
        },
        {
          title: "التخزين",
          description: "بتحكم مناخي وتتبع جرد.",
          image: media.services.storage,
          imageAlt: "تخزين جناح بتحكم مناخي",
        },
        {
          title: "فحص الحالة",
          description: "يُفتش قبل حدثك التالي.",
          image: media.about.studio,
          imageAlt: "فحص حالة الجناح",
        },
        {
          title: "إعادة التركيب",
          description: "يُعد ويصبح جاهزاً للمعرض التالي.",
          image: media.boothTypes.modular,
          imageAlt: "إعادة تركيب الجناح",
        },
      ],
      faq: [
        {
          question: "كم يمكنكم تخزين جناحي؟",
          answer:
            "طالما تحتاج — كثير من العملاء يخزّنون بين أحداث موسمية أو سنوية. نؤكّد شروط التخزين وفق جدولك.",
        },
        {
          question: "هل جناحي آمن في التخزين؟",
          answer:
            "نعم، مرافقنا بتحكم مناخي ومراقبة، وتحافظ على المواد والتشطيبات بنفس حالتها عند الوصول.",
        },
        {
          question: "هل يمكن إعادة تركيب جناحي لحدث أو مدينة مختلفة؟",
          answer:
            "نعم، نتولى إعادة التركيب عبر المدن الرئيسية في السعودية، وليس موقع الحدث الأصلي فقط.",
        },
        {
          question: "ماذا لو احتاج جناحي إصلاحات قبل إعادة التركيب؟",
          answer:
            "نفتش كل جناح قبل إعادة التركيب ونحدّد أي تآكل أو ضرر ليُعالَج قبل حدثك التالي.",
        },
        {
          question: "هل أحتاج لحجز التخزين مسبقاً؟",
          answer:
            "يساعد، خصوصاً حول مواسم الأحداث المزدحمة، ويمكننا أيضاً استيعاب طلبات قصيرة الأجل حسب التوفر.",
        },
        {
          question: "ماذا لو لم أحتج تخزيناً طويل الأمد؟",
          answer:
            "لا مشكلة — التفكيك والنقل متاحان كخدمات مستقلة دون تخزين مستمر.",
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
      excerpt: "Your brand, printed and applied with precision.",
      heroLead: "Your brand, printed and applied with precision.",
      overviewTitle: "Branding That Gets Noticed",
      overview: "From decals to window graphics, every detail carries your brand.",
      overviewBullets: [
        {
          title: "Print, Produced In-House",
          description: "Full control over quality and turnaround",
        },
        {
          title: "Any Surface, Any Size",
          description: "Walls, windows, banners, flags",
        },
        {
          title: "Built to Last",
          description: "Durable materials for indoor and outdoor use",
        },
        {
          title: "Fast Turnaround",
          description: "Ready when your event needs it",
        },
      ],
      cover: {
        eyebrow: "Print scope",
        title: "What We Cover",
        support:
          "From decals to wall wraps — print and application built around your brand.",
        items: [
          {
            title: "Custom Stickers & Decals",
            description:
              "Precision-cut graphics for surfaces, products, and displays.",
          },
          {
            title: "Roll-Up Banners",
            description:
              "Portable, professional banners ready for any event.",
          },
          {
            title: "Printed Flags",
            description:
              "Branded flags for outdoor visibility and activations.",
          },
          {
            title: "Window & Glass Branding",
            description:
              "Vinyl graphics and frosting for storefronts and booths.",
          },
          {
            title: "Wall Wraps",
            description:
              "Large-format graphics that transform any space.",
          },
          {
            title: "Material Selection",
            description:
              "Finishes chosen for durability, indoors or outdoors.",
          },
        ],
      },
      benefits: [
        {
          title: "Print, Produced In-House",
          description: "Full control over quality and turnaround",
        },
        {
          title: "Any Surface, Any Size",
          description: "Walls, windows, banners, flags",
        },
        {
          title: "Built to Last",
          description: "Durable materials for indoor and outdoor use",
        },
      ],
      process: [
        {
          title: "Brief",
          description:
            "Share your brand assets and where the graphics will go.",
          image: media.about.mission,
          imageAlt: "Brand print brief",
        },
        {
          title: "Design Layout",
          description:
            "We prepare print-ready files for your approval.",
          image: media.services.design,
          imageAlt: "Print layout design",
        },
        {
          title: "Printing",
          description:
            "Produced in-house on the right materials.",
          image: media.services.branding,
          imageAlt: "In-house print production",
        },
        {
          title: "Quality Check",
          description:
            "Every piece inspected before delivery.",
          image: media.about.studio,
          imageAlt: "Print quality check",
        },
        {
          title: "Application",
          description:
            "Installed cleanly on-site if needed.",
          image: media.services.installation,
          imageAlt: "On-site graphics application",
        },
      ],
      faq: [
        {
          question: "Can you match my exact brand colors?",
          answer:
            "Yes, we work from your brand guidelines or existing files to match colors as closely as possible in print.",
        },
        {
          question: "What materials do you print on?",
          answer:
            "It depends on the application — vinyl, fabric, and rigid substrates are all available depending on where the graphics will be used.",
        },
        {
          question: "Can you install the graphics on-site?",
          answer:
            "Yes, we offer on-site application for window graphics, wall wraps, and other surfaces that need professional installation.",
        },
        {
          question: "How long does printing take?",
          answer:
            "Turnaround depends on quantity and complexity — we'll confirm a clear timeline once we understand your order.",
        },
        {
          question: "Are the materials suitable for outdoor use?",
          answer:
            "Yes, we offer weather-resistant options for flags, banners, and outdoor signage.",
        },
        {
          question:
            "Can I order just one item, like a roll-up banner, without a full branding package?",
          answer:
            "Yes, every item is available individually — you don't need a full package to order.",
        },
      ],
    },
    ar: {
      title: "الهوية البصرية والطباعة",
      excerpt: "علامتك، مطبوعة ومطبَّقة بدقة.",
      heroLead: "علامتك، مطبوعة ومطبَّقة بدقة.",
      overviewTitle: "هوية تُلاحَظ",
      overview: "من الملصقات إلى رسومات النوافذ، كل تفصيلة تحمل علامتك.",
      overviewBullets: [
        {
          title: "طباعة داخلية",
          description: "تحكم كامل بالجودة وسرعة التسليم",
        },
        {
          title: "أي سطح وأي حجم",
          description: "جدران ونوافذ ولافتات وأعلام",
        },
        {
          title: "مبني ليدوم",
          description: "مواد متينة للاستخدام الداخلي والخارجي",
        },
        {
          title: "تسليم سريع",
          description: "جاهز عندما يحتاج حدثك",
        },
      ],
      cover: {
        eyebrow: "نطاق الطباعة",
        title: "ماذا نغطي",
        support:
          "من الملصقات إلى لف الجدران — طباعة وتطبيق حول علامتك.",
        items: [
          {
            title: "ملصقات وديكال مخصص",
            description:
              "رسومات مقصوصة بدقة للأسطح والمنتجات والعروض.",
          },
          {
            title: "لافتات Roll-Up",
            description:
              "لافتات محمولة واحترافية جاهزة لأي حدث.",
          },
          {
            title: "أعلام مطبوعة",
            description:
              "أعلام تحمل العلامة للظهور الخارجي والتفعيلات.",
          },
          {
            title: "هوية نوافذ وزجاج",
            description:
              "رسومات فينييل وتغشية لواجهات المتاجر والأجنحة.",
          },
          {
            title: "لف الجدران",
            description:
              "رسومات كبيرة الحجم تحوّل أي مساحة.",
          },
          {
            title: "اختيار المواد",
            description:
              "تشطيبات مختارة للمتانة، داخلياً أو خارجياً.",
          },
        ],
      },
      benefits: [
        {
          title: "طباعة داخلية",
          description: "تحكم كامل بالجودة وسرعة التسليم",
        },
        {
          title: "أي سطح وأي حجم",
          description: "جدران ونوافذ ولافتات وأعلام",
        },
        {
          title: "مبني ليدوم",
          description: "مواد متينة للاستخدام الداخلي والخارجي",
        },
      ],
      process: [
        {
          title: "الموجز",
          description:
            "شارك أصول علامتك وأين ستوضع الرسومات.",
          image: media.about.mission,
          imageAlt: "موجز طباعة العلامة",
        },
        {
          title: "تخطيط التصميم",
          description:
            "نجهّز ملفات جاهزة للطباعة لاعتمادك.",
          image: media.services.design,
          imageAlt: "تصميم مخطط الطباعة",
        },
        {
          title: "الطباعة",
          description:
            "تُنتَج داخلياً على المواد المناسبة.",
          image: media.services.branding,
          imageAlt: "إنتاج طباعة داخلي",
        },
        {
          title: "فحص الجودة",
          description:
            "كل قطعة تُفحص قبل التسليم.",
          image: media.about.studio,
          imageAlt: "فحص جودة الطباعة",
        },
        {
          title: "التطبيق",
          description:
            "تُركَّب بوضوح في الموقع عند الحاجة.",
          image: media.services.installation,
          imageAlt: "تطبيق الرسومات في الموقع",
        },
      ],
      faq: [
        {
          question: "هل يمكنكم مطابقة ألوان علامتي بدقة؟",
          answer:
            "نعم، نعمل من دليل علامتكم أو ملفاتكم الحالية لمطابقة الألوان بأقرب ما يمكن في الطباعة.",
        },
        {
          question: "على أي مواد تطبعون؟",
          answer:
            "يعتمد على التطبيق — فينييل وقماش وأسطح صلبة كلها متاحة حسب مكان استخدام الرسومات.",
        },
        {
          question: "هل يمكنكم تركيب الرسومات في الموقع؟",
          answer:
            "نعم، نوفر تطبيقاً في الموقع لرسومات النوافذ ولف الجدران والأسطح الأخرى التي تحتاج تركيباً احترافياً.",
        },
        {
          question: "كم تستغرق الطباعة؟",
          answer:
            "مدة التسليم تعتمد على الكمية والتعقيد — نؤكّد جدولاً واضحاً بعد فهم طلبك.",
        },
        {
          question: "هل المواد مناسبة للاستخدام الخارجي؟",
          answer:
            "نعم، نوفر خيارات مقاومة للعوامل الجوية للأعلام واللافتات واللافتات الخارجية.",
        },
        {
          question:
            "هل يمكن طلب عنصر واحد فقط، مثل لافتة Roll-Up، دون حزمة هوية كاملة؟",
          answer:
            "نعم، كل عنصر متاح بشكل منفرد — لا تحتاج حزمة كاملة للطلب.",
        },
      ],
    },
  },
  {
    slug: "lightbox-retail-display",
    order: 7,
    image: media.services.lightbox,
    imageAlt: "Lightbox signage and storefront",
    en: {
      title: "Lightbox Signage & Storefront",
      excerpt: "Signage that gets your brand noticed, day and night.",
      heroLead: "Signage that gets your brand noticed, day and night.",
      secondaryCta: {
        label: "A to Z Booth Solution",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "Signage Built to Stand Out",
      overview: "LED lightbox signage designed for visibility and durability.",
      overviewBullets: [
        {
          title: "Built for Visibility",
          description: "Bright, clear branding that stands out day or night",
        },
        {
          title: "Custom Shapes & Sizes",
          description: "Designed to fit your storefront or booth",
        },
        {
          title: "Weather-Resistant",
          description: "Built to last, indoors or outdoors",
        },
        {
          title: "Long-Lasting LED",
          description: "Energy-efficient lighting with a long lifespan",
        },
      ],
      cover: {
        eyebrow: "Signage scope",
        title: "What We Cover",
        support:
          "Illuminated signage built for storefronts, booths, and brand visibility.",
        items: [
          {
            title: "LED Lightbox Signs",
            description:
              "Illuminated signage designed for maximum visibility.",
          },
          {
            title: "Backlit Logos & Posters",
            description:
              "Brand elements that glow, day or night.",
          },
          {
            title: "Custom Shapes & Sizes",
            description:
              "Signage built to match your storefront or booth exactly.",
          },
          {
            title: "Weather-Resistant Materials",
            description:
              "Built to hold up outdoors, in any condition.",
          },
        ],
      },
      benefits: [
        {
          title: "Built for Visibility",
          description: "Bright, clear branding that stands out day or night",
        },
        {
          title: "Custom Shapes & Sizes",
          description: "Designed to fit your storefront or booth",
        },
        {
          title: "Weather-Resistant",
          description: "Built to last, indoors or outdoors",
        },
      ],
      process: [
        {
          title: "Brief",
          description:
            "Share your branding and where the signage will go.",
          image: media.about.mission,
          imageAlt: "Lightbox signage brief",
        },
        {
          title: "Design",
          description:
            "We create a layout matched to your space.",
          image: media.services.design,
          imageAlt: "Lightbox signage design",
        },
        {
          title: "Production",
          description:
            "Built in-house, tested for durability.",
          image: media.services.lightbox,
          imageAlt: "Lightbox production",
        },
        {
          title: "Installation",
          description:
            "Set up and ready to shine.",
          image: media.services.installation,
          imageAlt: "Lightbox installation",
        },
      ],
      faq: [
        {
          question: "How long do LED lightbox signs last?",
          answer:
            "LED signage is built for long-term use and energy efficiency, with a lifespan that far exceeds traditional lighting.",
        },
        {
          question: "Can the signage be custom-shaped to match our logo?",
          answer:
            "Yes, we build lightbox signage in custom shapes and sizes to match your brand exactly.",
        },
        {
          question: "Is the signage suitable for outdoor use?",
          answer:
            "Yes, our materials are weather-resistant and built to withstand outdoor conditions.",
        },
        {
          question: "Can you install the signage on-site?",
          answer:
            "Yes, installation is included as part of the process, so your signage is ready to go once it's delivered.",
        },
        {
          question: "How much does lightbox signage cost?",
          answer:
            "Cost depends on size, shape, and complexity — we'll provide a clear quote once we understand your requirements.",
        },
        {
          question:
            "Can I order signage without a full booth or storefront project?",
          answer:
            "Yes, lightbox signage is available as a standalone service.",
        },
      ],
    },
    ar: {
      title: "لافتات Lightbox والواجهات",
      excerpt: "لافتات تجعل علامتك ملحوظة، نهاراً وليلاً.",
      heroLead: "لافتات تجعل علامتك ملحوظة، نهاراً وليلاً.",
      secondaryCta: {
        label: "حل الجناح من الألف إلى الياء",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "لافتات مبنية لتبرز",
      overview: "لافتات LED lightbox مصممة للظهور والمتانة.",
      overviewBullets: [
        {
          title: "مبنية للظهور",
          description: "هوية ساطعة وواضحة تبرز نهاراً أو ليلاً",
        },
        {
          title: "أشكال وأحجام مخصصة",
          description: "مصممة لتناسب واجهتك أو جناحك",
        },
        {
          title: "مقاومة للعوامل الجوية",
          description: "مبنية لتدوم، داخلياً أو خارجياً",
        },
        {
          title: "LED طويل العمر",
          description: "إضاءة موفرة للطاقة بعمر طويل",
        },
      ],
      cover: {
        eyebrow: "نطاق اللافتات",
        title: "ماذا نغطي",
        support:
          "لافتات مضاءة مبنية للواجهات والأجنحة وظهور العلامة.",
        items: [
          {
            title: "لافتات LED Lightbox",
            description:
              "لافتات مضاءة مصممة لأقصى ظهور.",
          },
          {
            title: "شعارات وبوسترات مضاءة خلفياً",
            description:
              "عناصر علامة تتوهج، نهاراً وليلاً.",
          },
          {
            title: "أشكال وأحجام مخصصة",
            description:
              "لافتات تُبنى لتطابق واجهتك أو جناحك تماماً.",
          },
          {
            title: "مواد مقاومة للعوامل الجوية",
            description:
              "مبنية لتتحمل الخارج، في أي ظرف.",
          },
        ],
      },
      benefits: [
        {
          title: "مبنية للظهور",
          description: "هوية ساطعة وواضحة تبرز نهاراً أو ليلاً",
        },
        {
          title: "أشكال وأحجام مخصصة",
          description: "مصممة لتناسب واجهتك أو جناحك",
        },
        {
          title: "مقاومة للعوامل الجوية",
          description: "مبنية لتدوم، داخلياً أو خارجياً",
        },
      ],
      process: [
        {
          title: "الموجز",
          description:
            "شارك هويتك وأين ستوضع اللافتات.",
          image: media.about.mission,
          imageAlt: "موجز لافتات lightbox",
        },
        {
          title: "التصميم",
          description:
            "ننشئ مخططاً متوافقاً مع مساحتك.",
          image: media.services.design,
          imageAlt: "تصميم لافتات lightbox",
        },
        {
          title: "الإنتاج",
          description:
            "يُبنى داخلياً ويُختبر للمتانة.",
          image: media.services.lightbox,
          imageAlt: "إنتاج lightbox",
        },
        {
          title: "التركيب",
          description:
            "يُعد ويصبح جاهزاً ليضيء.",
          image: media.services.installation,
          imageAlt: "تركيب lightbox",
        },
      ],
      faq: [
        {
          question: "كم تدوم لافتات LED lightbox؟",
          answer:
            "لافتات LED مبنية للاستخدام طويل الأمد وكفاءة الطاقة، بعمر يفوق الإضاءة التقليدية بكثير.",
        },
        {
          question: "هل يمكن تخصيص شكل اللافتة ليطابق شعارنا؟",
          answer:
            "نعم، نبني لافتات lightbox بأشكال وأحجام مخصصة لتطابق علامتك تماماً.",
        },
        {
          question: "هل اللافتات مناسبة للاستخدام الخارجي؟",
          answer:
            "نعم، موادنا مقاومة للعوامل الجوية ومبنية لتحمل الظروف الخارجية.",
        },
        {
          question: "هل يمكنكم تركيب اللافتات في الموقع؟",
          answer:
            "نعم، التركيب جزء من المسار، فتكون لافتاتك جاهزة بعد التسليم.",
        },
        {
          question: "كم تكلفة لافتات lightbox؟",
          answer:
            "التكلفة تعتمد على الحجم والشكل والتعقيد — نقدّم عرض سعر واضح بعد فهم متطلباتك.",
        },
        {
          question: "هل يمكن طلب لافتات دون مشروع جناح أو واجهة كامل؟",
          answer:
            "نعم، لافتات lightbox متاحة كخدمة مستقلة.",
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
      title: "Modular / System Booths in {City}",
      excerpt: "Reusable, fast to build, ready for your next event.",
      overviewTitle: "Built to Use Again and Again",
      description:
        "A smart choice for brands attending multiple events a year.",
      features: [
        {
          title: "Fast Setup",
          description: "Quicker to build and install than custom structures.",
        },
        {
          title: "Reusable by Design",
          description: "Built for multiple events, not just one.",
        },
        {
          title: "Cost-Efficient",
          description: "Lower cost per use across repeated events.",
        },
        {
          title: "Consistent Branding",
          description: "The same strong presence, every time.",
        },
      ],
      advantages: [
        {
          title: "System Structure & Framing",
          description:
            "Durable, reusable frames engineered for repeated builds.",
        },
        {
          title: "Branded Panels & Graphics",
          description:
            "Swappable graphics so your booth stays fresh event to event.",
        },
        {
          title: "Layout Configuration",
          description: "Flexible layouts adaptable to different booth sizes.",
        },
        {
          title: "Storage Between Events",
          description: "Kept ready and protected until your next show.",
        },
      ],
      useCases: [
        "Brands exhibiting at multiple events per year",
        "Teams needing a fast, reliable setup without a custom build",
        "Exhibitors looking to reduce cost per event through reuse",
        "Brands wanting consistent presence across different shows",
      ],
      faq: [
        {
          question: "How many times can a modular booth be reused?",
          answer:
            "Modular booths are built for repeated use — with proper storage and care, they can be reused across many events over several years.",
        },
        {
          question: "Can the design change between events?",
          answer:
            "Yes, panels and graphics can be swapped, so your booth can look fresh at each event without rebuilding the structure.",
        },
        {
          question: "Is a modular booth as customizable as a custom-built one?",
          answer:
            "Not entirely — modular systems offer flexible configurations, but full bespoke design is better suited to Custom-Built Booths.",
        },
        {
          question: "How fast can a modular booth be set up?",
          answer:
            "Setup is significantly faster than custom builds, typically within a day depending on size and configuration.",
        },
        {
          question: "Can you store the booth between events?",
          answer:
            "Yes, storage and reinstallation are available so your booth is ready whenever your next event comes up.",
        },
        {
          question: "What sizes are available for modular booths?",
          answer:
            "Modular systems are flexible and can be configured for small stands up to larger footprints, depending on your needs.",
        },
      ],
    },
    ar: {
      title: "أجنحة معيارية / نظام في {City}",
      excerpt: "قابلة لإعادة الاستخدام، سريعة البناء، وجاهزة لفعاليتك القادمة.",
      overviewTitle: "مبنية لتُستخدم مراراً وتكراراً",
      description: "خيار ذكي للعلامات التي تحضر عدة فعاليات في السنة.",
      features: [
        {
          title: "تركيب سريع",
          description: "أسرع في البناء والتركيب من الهياكل المخصصة.",
        },
        {
          title: "قابلة لإعادة الاستخدام بالتصميم",
          description: "مبنية لعدة فعاليات، لا لفعالية واحدة فقط.",
        },
        {
          title: "فعّالة من حيث التكلفة",
          description: "تكلفة أقل لكل استخدام عبر الفعاليات المتكررة.",
        },
        {
          title: "هوية متسقة",
          description: "نفس الحضور القوي في كل مرة.",
        },
      ],
      advantages: [
        {
          title: "هيكل النظام والإطارات",
          description: "إطارات متينة قابلة لإعادة الاستخدام لهياكل متكررة.",
        },
        {
          title: "ألواح ورسومات بعلامتك",
          description: "رسومات قابلة للاستبدال ليبقى جناحك متجدداً من فعالية لأخرى.",
        },
        {
          title: "تهيئة التخطيط",
          description: "تخطيطات مرنة تتكيّف مع أحجام أجنحة مختلفة.",
        },
        {
          title: "تخزين بين الفعاليات",
          description: "يُحفظ جاهزاً ومحمياً حتى معرضك القادم.",
        },
      ],
      useCases: [
        "علامات تشارك في عدة فعاليات سنوياً",
        "فرق تحتاج تركيباً سريعاً وموثوقاً دون بناء مخصص",
        "عارضون يريدون خفض التكلفة لكل فعالية عبر إعادة الاستخدام",
        "علامات تريد حضوراً متسقاً عبر معارض مختلفة",
      ],
      faq: [
        {
          question: "كم مرة يمكن إعادة استخدام الجناح المعياري؟",
          answer:
            "الأجنحة المعيارية مبنية للاستخدام المتكرر — مع التخزين والعناية المناسبين يمكن إعادة استخدامها عبر العديد من الفعاليات على مدار سنوات.",
        },
        {
          question: "هل يمكن تغيير التصميم بين الفعاليات؟",
          answer:
            "نعم، يمكن استبدال الألواح والرسومات ليبدو جناحك متجدداً في كل فعالية دون إعادة بناء الهيكل.",
        },
        {
          question: "هل الجناح المعياري قابل للتخصيص مثل الجناح المخصص؟",
          answer:
            "ليس بالكامل — الأنظمة المعيارية توفّر تهيئات مرنة، أما التصميم المخصص بالكامل فهو أنسب للأجنحة المبنية حسب الطلب.",
        },
        {
          question: "ما سرعة تركيب الجناح المعياري؟",
          answer:
            "التركيب أسرع بكثير من البناء المخصص، وعادة خلال يوم حسب الحجم والتهيئة.",
        },
        {
          question: "هل يمكنكم تخزين الجناح بين الفعاليات؟",
          answer:
            "نعم، التخزين وإعادة التركيب متاحان ليكون جناحك جاهزاً متى جاءت فعاليتك التالية.",
        },
        {
          question: "ما الأحجام المتاحة للأجنحة المعيارية؟",
          answer:
            "الأنظمة المعيارية مرنة ويمكن تهيئتها من الأجنحة الصغيرة حتى المساحات الأكبر حسب احتياجك.",
        },
      ],
    },
  },
  {
    slug: "double-deck",
    order: 3,
    image: media.boothTypes.doubleDeck,
    imageAlt: "Double-deck booth",
    en: {
      title: "Double-Deck Booths in {City}",
      excerpt: "More space, more impact, on a limited footprint.",
      overviewTitle: "Double the Space, Double the Presence",
      description:
        "A two-level solution when floor space is limited but ambition isn't.",
      features: [
        {
          title: "Maximized Floor Space",
          description:
            "More usable area without expanding your footprint.",
        },
        {
          title: "Elevated Presence",
          description: "Stands out on a crowded show floor.",
        },
        {
          title: "Private Upper Level",
          description: "Ideal for meetings, VIP areas, or lounges.",
        },
        {
          title: "Built for Structural Safety",
          description: "Engineered and certified for multi-level use.",
        },
      ],
      advantages: [
        {
          title: "Structural Engineering",
          description:
            "Two-level structures engineered for safety and stability.",
        },
        {
          title: "Custom Design",
          description: "Layouts tailored to your brand and space needs.",
        },
        {
          title: "Upper-Level Fit-Out",
          description:
            "Meeting rooms, lounges, or VIP areas built to spec.",
        },
        {
          title: "Branding Integration",
          description: "Consistent brand presence across both levels.",
        },
      ],
      useCases: [
        "Brands needing extra space without a larger floor footprint",
        "Exhibitors wanting a private meeting or VIP area on-site",
        "High-traffic events where standing out matters",
        "Companies with strong budgets seeking maximum floor presence",
      ],
      faq: [
        {
          question:
            "Is there a minimum floor space required for a double-deck booth?",
          answer:
            "Yes, structural requirements mean double-deck booths typically need a larger footprint — we'll confirm feasibility based on your available space.",
        },
        {
          question: "How is safety ensured for the upper level?",
          answer:
            "All double-deck structures are engineered and certified to meet safety standards for weight capacity and structural stability.",
        },
        {
          question:
            "Can I use the upper level for meetings or a private lounge?",
          answer:
            "Yes, upper levels are commonly fitted out as meeting rooms, VIP lounges, or private client areas.",
        },
        {
          question: "Are double-deck booths reusable for future events?",
          answer:
            "Yes, with proper dismantling, storage, and reinstallation, double-deck booths can be reused across events.",
        },
        {
          question: "How long does installation take?",
          answer:
            "Installation timelines are longer than single-level booths due to structural complexity — we'll confirm a schedule once your design is finalized.",
        },
        {
          question: "Do all venues allow double-deck structures?",
          answer:
            "Not always — some venues have height restrictions. We recommend confirming with the event organizer, and we can advise based on your venue.",
        },
      ],
    },
    ar: {
      title: "أجنحة طابقين في {City}",
      excerpt: "مساحة أكبر وأثر أقوى على مساحة أرض محدودة.",
      overviewTitle: "ضعف المساحة، ضعف الحضور",
      description:
        "حل بمستويين عندما تكون مساحة الأرض محدودة والطموح ليس كذلك.",
      features: [
        {
          title: "تعظيم مساحة الأرض",
          description: "مساحة قابلة للاستخدام أكبر دون توسيع بصمتك.",
        },
        {
          title: "حضور مرتفع",
          description: "يبرز وسط أرض معرض مزدحمة.",
        },
        {
          title: "طابق علوي خاص",
          description: "مثالي للاجتماعات أو مناطق VIP أو الصالات.",
        },
        {
          title: "مبني للسلامة الإنشائية",
          description: "مهندَس ومعتمَد للاستخدام متعدد المستويات.",
        },
      ],
      advantages: [
        {
          title: "الهندسة الإنشائية",
          description: "هياكل بمستويين مهندَسة للسلامة والاستقرار.",
        },
        {
          title: "تصميم مخصص",
          description: "تخطيطات مصممة لعلامتك واحتياجات مساحتك.",
        },
        {
          title: "تجهيز الطابق العلوي",
          description: "غرف اجتماعات أو صالات أو مناطق VIP وفق المواصفات.",
        },
        {
          title: "دمج الهوية",
          description: "حضور علامة متسق عبر المستويين.",
        },
      ],
      useCases: [
        "علامات تحتاج مساحة إضافية دون بصمة أرض أكبر",
        "عارضون يريدون منطقة اجتماعات أو VIP خاصة في الموقع",
        "فعاليات عالية الحركة حيث يهم التميز",
        "شركات بميزانيات قوية تسعى لأقصى حضور على الأرض",
      ],
      faq: [
        {
          question: "هل هناك حد أدنى لمساحة الأرض لجناح الطابقين؟",
          answer:
            "نعم، المتطلبات الإنشائية تعني أن أجنحة الطابقين تحتاج عادة مساحة أكبر — سنؤكد الجدوى بناءً على مساحتك المتاحة.",
        },
        {
          question: "كيف تُضمن سلامة الطابق العلوي؟",
          answer:
            "كل هياكل الطابقين مهندَسة ومعتمَدة لتلبية معايير السلامة لقدرة التحميل والاستقرار الإنشائي.",
        },
        {
          question: "هل يمكن استخدام الطابق العلوي للاجتماعات أو صالة خاصة؟",
          answer:
            "نعم، الطوابق العلوية تُجهَّز عادة كغرف اجتماعات أو صالات VIP أو مناطق عملاء خاصة.",
        },
        {
          question: "هل يمكن إعادة استخدام أجنحة الطابقين في فعاليات لاحقة؟",
          answer:
            "نعم، مع التفكيك والتخزين وإعادة التركيب المناسبين يمكن إعادة استخدام أجنحة الطابقين عبر الفعاليات.",
        },
        {
          question: "كم يستغرق التركيب؟",
          answer:
            "جداول التركيب أطول من الأجنحة أحادية المستوى بسبب التعقيد الإنشائي — سنؤكد جدولاً بعد اعتماد التصميم.",
        },
        {
          question: "هل تسمح كل المواقع بهياكل الطابقين؟",
          answer:
            "ليس دائماً — بعض المواقع لديها قيود ارتفاع. نوصي بالتأكيد مع منظّم الفعالية، ويمكننا تقديم المشورة حسب موقعك.",
        },
      ],
    },
  },
  {
    slug: "portable",
    order: 4,
    image: media.boothTypes.portable,
    imageAlt: "Portable pop-up display",
    en: {
      title: "Portable & Pop-Up Displays in {City}",
      excerpt: "Quick to set up, easy to move, ready whenever you are.",
      overviewTitle: "Simple, Fast, and Flexible",
      description: "A practical solution for frequent or smaller-scale events.",
      features: [
        {
          title: "Fast Setup",
          description: "Ready in minutes, no complex installation.",
        },
        {
          title: "Lightweight & Portable",
          description: "Easy to transport and store.",
        },
        {
          title: "Budget-Friendly",
          description: "Lower cost without sacrificing brand presence.",
        },
        {
          title: "Reusable",
          description: "Built to travel to multiple events.",
        },
      ],
      advantages: [
        {
          title: "Pop-Up Frames & Backdrops",
          description:
            "Lightweight structures that assemble quickly on-site.",
        },
        {
          title: "Roll-Up & Banner Stands",
          description:
            "Compact, professional displays ready in seconds.",
        },
        {
          title: "Portable Counters & Kiosks",
          description:
            "Functional, branded pieces for product displays or reception areas.",
        },
        {
          title: "Carrying Cases & Storage",
          description: "Built for easy transport between events.",
        },
      ],
      useCases: [
        "Brands attending frequent, smaller-scale events",
        "Teams needing a fast, no-hassle setup",
        "Exhibitors with limited budget or space",
        "Companies wanting a display that travels easily",
      ],
      faq: [
        {
          question: "How quickly can a pop-up display be set up?",
          answer:
            "Most pop-up displays can be assembled in a matter of minutes, without tools or technical expertise.",
        },
        {
          question: "Can I reuse the same display at multiple events?",
          answer:
            "Yes, portable displays are designed for repeated use — just store and transport them between events.",
        },
        {
          question: "How much can I customize a pop-up display?",
          answer:
            "Customization is more limited than custom-built booths, but graphics and branding can still be tailored to your identity.",
        },
        {
          question: "Are these displays suitable for outdoor events?",
          answer:
            "Yes, many portable displays are suitable for both indoor and outdoor use, depending on the format.",
        },
        {
          question: "Do you provide carrying cases for transport?",
          answer:
            "Yes, carrying cases are included to make transport and storage easy between events.",
        },
        {
          question: "What's the typical size of a pop-up display?",
          answer:
            "Sizes vary from small tabletop displays to larger backdrop walls — we'll help you choose based on your space and goals.",
        },
      ],
    },
    ar: {
      title: "عروض محمولة و Pop-Up في {City}",
      excerpt: "سريعة التركيب، سهلة النقل، وجاهزة متى احتجتها.",
      overviewTitle: "بسيطة وسريعة ومرنة",
      description: "حل عملي للفعاليات المتكررة أو الأصغر حجماً.",
      features: [
        {
          title: "تركيب سريع",
          description: "جاهزة خلال دقائق، دون تركيب معقد.",
        },
        {
          title: "خفيفة ومحمولة",
          description: "سهلة النقل والتخزين.",
        },
        {
          title: "مناسبة للميزانية",
          description: "تكلفة أقل دون التضحية بحضور العلامة.",
        },
        {
          title: "قابلة لإعادة الاستخدام",
          description: "مبنية للتنقّل بين عدة فعاليات.",
        },
      ],
      advantages: [
        {
          title: "إطارات Pop-Up وخلفيات",
          description: "هياكل خفيفة تُركَّب بسرعة في الموقع.",
        },
        {
          title: "حوامل رول أب ولافتات",
          description: "عروض مدمجة واحترافية جاهزة خلال ثوانٍ.",
        },
        {
          title: "كاونترات وأكشاك محمولة",
          description: "قطع وظيفية بعلامتك لعرض المنتجات أو الاستقبال.",
        },
        {
          title: "حقائب حمل وتخزين",
          description: "مصممة لنقل سهل بين الفعاليات.",
        },
      ],
      useCases: [
        "علامات تحضر فعاليات متكررة أصغر حجماً",
        "فرق تحتاج تركيباً سريعاً بلا تعقيد",
        "عارضون بميزانية أو مساحة محدودة",
        "شركات تريد عرضاً يتنقل بسهولة",
      ],
      faq: [
        {
          question: "ما سرعة تركيب عرض الـ Pop-Up؟",
          answer:
            "معظم عروض الـ Pop-Up يمكن تجميعها خلال دقائق، دون أدوات أو خبرة تقنية.",
        },
        {
          question: "هل يمكن إعادة استخدام نفس العرض في عدة فعاليات؟",
          answer:
            "نعم، العروض المحمولة مصممة للاستخدام المتكرر — فقط خزّنها وانقلها بين الفعاليات.",
        },
        {
          question: "إلى أي مدى يمكن تخصيص عرض الـ Pop-Up؟",
          answer:
            "التخصيص أكثر محدودية من الأجنحة المبنية حسب الطلب، لكن الرسومات والهوية يمكن مواءمتهما مع علامتك.",
        },
        {
          question: "هل تناسب هذه العروض الفعاليات الخارجية؟",
          answer:
            "نعم، كثير من العروض المحمولة تناسب الاستخدام الداخلي والخارجي حسب النوع.",
        },
        {
          question: "هل توفّرون حقائب حمل للنقل؟",
          answer:
            "نعم، تُضمَّن حقائب الحمل لتسهيل النقل والتخزين بين الفعاليات.",
        },
        {
          question: "ما الحجم المعتاد لعرض الـ Pop-Up؟",
          answer:
            "الأحجام تتراوح من عروض الطاولة الصغيرة إلى جدران خلفية أكبر — نساعدك في الاختيار حسب مساحتك وأهدافك.",
        },
      ],
    },
  },
  {
    slug: "kiosks",
    order: 5,
    image: media.boothTypes.kiosk,
    imageAlt: "Exhibition kiosk",
    en: {
      title: "Kiosks & Small Footprint Stands in {City}",
      excerpt: "A compact presence that still makes an impact.",
      overviewTitle: "Small Space, Strong Presence",
      description:
        "Ideal when floor space is limited but visibility still matters.",
      features: [
        {
          title: "Compact Footprint",
          description: "Designed to fit tight or budget-conscious spaces.",
        },
        {
          title: "Product-Focused",
          description: "Built to highlight a single product or offer.",
        },
        {
          title: "Fast Setup",
          description: "Quick to install, quick to pack away.",
        },
        {
          title: "Cost-Efficient",
          description: "Strong presence without a large booth investment.",
        },
      ],
      advantages: [
        {
          title: "Kiosk Structures",
          description:
            "Compact, freestanding units for product displays or reception points.",
        },
        {
          title: "Counter & Storage Integration",
          description:
            "Functional counters with built-in storage where needed.",
        },
        {
          title: "Branded Graphics",
          description:
            "Full branding across a smaller footprint, without losing impact.",
        },
        {
          title: "Lighting & Display Fixtures",
          description:
            "Small-scale lighting to highlight products or key messaging.",
        },
      ],
      useCases: [
        "First-time exhibitors or smaller budgets",
        "Brands showcasing a single product or service",
        "Events with limited floor space",
        "Companies wanting a simple, functional presence",
      ],
      faq: [
        {
          question: "What's the typical size range for a kiosk?",
          answer:
            "Kiosks are generally compact, often ranging from a small tabletop unit to a few square meters — we'll confirm based on your space.",
        },
        {
          question: "Can a kiosk include storage for products or materials?",
          answer:
            "Yes, many kiosk designs include built-in storage or counter space for products and supplies.",
        },
        {
          question: "Is a kiosk suitable for a first-time exhibitor?",
          answer:
            "Yes, kiosks are a practical, cost-effective option for brands new to exhibiting or working with a smaller budget.",
        },
        {
          question: "Can I upgrade to a larger booth later?",
          answer:
            "Yes, if your needs grow, we can scale up to a modular or custom-built booth for future events.",
        },
        {
          question: "Are kiosks reusable across multiple events?",
          answer:
            "Yes, with proper storage, kiosks can be reused for future events.",
        },
        {
          question: "Can kiosks be used outdoors?",
          answer:
            "Yes, depending on the design and materials, kiosks can be built for outdoor use as well.",
        },
      ],
    },
    ar: {
      title: "أكشاك ومساحات صغيرة في {City}",
      excerpt: "حضور مدمج يترك أثراً رغم ذلك.",
      overviewTitle: "مساحة صغيرة، حضور قوي",
      description:
        "مثالي عندما تكون مساحة الأرض محدودة لكن الظهور ما زال مهماً.",
      features: [
        {
          title: "بصمة مدمجة",
          description: "مصممة لتلائم المساحات الضيقة أو ذات الميزانية المحدودة.",
        },
        {
          title: "مركّزة على المنتج",
          description: "مبنية لإبراز منتج أو عرض واحد.",
        },
        {
          title: "تركيب سريع",
          description: "سريعة التركيب وسريعة الفك.",
        },
        {
          title: "فعّالة من حيث التكلفة",
          description: "حضور قوي دون استثمار في جناح كبير.",
        },
      ],
      advantages: [
        {
          title: "هياكل الأكشاك",
          description:
            "وحدات مستقلة مدمجة لعرض المنتجات أو نقاط الاستقبال.",
        },
        {
          title: "دمج الكاونتر والتخزين",
          description: "كاونترات وظيفية مع تخزين مدمج عند الحاجة.",
        },
        {
          title: "رسومات بعلامتك",
          description:
            "هوية كاملة عبر مساحة أصغر دون فقدان الأثر.",
        },
        {
          title: "إضاءة وتجهيزات العرض",
          description:
            "إضاءة بمقياس صغير لإبراز المنتجات أو الرسائل الرئيسية.",
        },
      ],
      useCases: [
        "عارضون لأول مرة أو بميزانيات أصغر",
        "علامات تعرض منتجاً أو خدمة واحدة",
        "فعاليات بمساحة أرض محدودة",
        "شركات تريد حضوراً بسيطاً ووظيفياً",
      ],
      faq: [
        {
          question: "ما نطاق الأحجام المعتاد للكشك؟",
          answer:
            "الأكشاك عادة مدمجة، وغالباً من وحدة طاولة صغيرة إلى بضعة أمتار مربعة — سنؤكد حسب مساحتك.",
        },
        {
          question: "هل يمكن أن يتضمن الكشك تخزيناً للمنتجات أو المواد؟",
          answer:
            "نعم، كثير من تصاميم الأكشاك تتضمن تخزيناً مدمجاً أو مساحة كاونتر للمنتجات والمستلزمات.",
        },
        {
          question: "هل يناسب الكشك العارض لأول مرة؟",
          answer:
            "نعم، الأكشاك خيار عملي وفعّال من حيث التكلفة للعلامات الجديدة في المعارض أو ذات الميزانية الأصغر.",
        },
        {
          question: "هل يمكن الترقية لاحقاً إلى جناح أكبر؟",
          answer:
            "نعم، إذا نمت احتياجاتك يمكننا التوسع إلى جناح معياري أو مخصص لفعاليات لاحقة.",
        },
        {
          question: "هل يمكن إعادة استخدام الأكشاك عبر عدة فعاليات؟",
          answer:
            "نعم، مع التخزين المناسب يمكن إعادة استخدام الأكشاك في فعاليات لاحقة.",
        },
        {
          question: "هل يمكن استخدام الأكشاك في الخارج؟",
          answer:
            "نعم، حسب التصميم والمواد يمكن بناء الأكشاك للاستخدام الخارجي أيضاً.",
        },
      ],
    },
  },
  {
    slug: "outdoor",
    order: 6,
    image: media.boothTypes.outdoor,
    imageAlt: "Outdoor activation",
    en: {
      title: "Outdoor Structures & Activations in {City}",
      excerpt: "Bold builds designed to perform outside the show floor.",
      overviewTitle: "Built for Bigger Spaces, Bigger Impact",
      description:
        "Outdoor structures designed for brand activations, launches, and experiential events.",
      features: [
        {
          title: "Built for the Elements",
          description: "Engineered to withstand outdoor conditions.",
        },
        {
          title: "Experience-Focused",
          description: "Designed for engagement, not just visibility.",
        },
        {
          title: "Large-Scale Capability",
          description: "Built for open spaces and bigger footprints.",
        },
        {
          title: "Fully Custom",
          description: "Shaped entirely around your activation concept.",
        },
      ],
      advantages: [
        {
          title: "Structural Design & Engineering",
          description:
            "Outdoor-rated structures built to withstand weather and wind load.",
        },
        {
          title: "Activation Concept Development",
          description: "Spaces designed for interaction, not just display.",
        },
        {
          title: "Weatherproof Materials",
          description:
            "Finishes and materials selected for outdoor durability.",
        },
        {
          title: "On-Site Installation",
          description: "Full setup and safety checks handled on location.",
        },
      ],
      useCases: [
        "Brand launches and experiential marketing campaigns",
        "Outdoor festivals, activations, and public events",
        "Brands wanting an immersive, large-scale presence",
        "Campaigns where the structure itself is part of the experience",
      ],
      faq: [
        {
          question:
            "Can outdoor structures withstand strong wind or weather conditions?",
          answer:
            "Yes, structures are engineered and rated to handle outdoor conditions, with materials selected for durability.",
        },
        {
          question: "Are outdoor activations reusable for future events?",
          answer:
            "Some can be, depending on design — many outdoor activations are built for a single event, but reuse is possible with the right structure. We'll advise based on your goals.",
        },
        {
          question:
            "Do you handle permits or site logistics for outdoor builds?",
          answer:
            "We can guide you on site and structural requirements, but permits are typically coordinated with the event organizer or venue.",
        },
        {
          question:
            "What kind of events are outdoor structures best suited for?",
          answer:
            "Brand launches, festivals, public activations, and any event where an immersive, large-scale presence matters.",
        },
        {
          question: "How long does an outdoor structure take to build?",
          answer:
            "Timelines vary significantly by scale and complexity — we'll confirm a schedule once your concept is finalized.",
        },
        {
          question: "Can outdoor structures include interactive elements?",
          answer:
            "Yes, activations can be designed with interactive features as part of the concept.",
        },
      ],
    },
    ar: {
      title: "هياكل خارجية وتفعيلات في {City}",
      excerpt: "بناء جريء مصمم ليعمل خارج أرض المعرض.",
      overviewTitle: "مبنية لمساحات أكبر وأثر أكبر",
      description:
        "هياكل خارجية مصممة لتفعيلات العلامة والإطلاقات والفعاليات التجريبية.",
      features: [
        {
          title: "مبنية للعوامل الجوية",
          description: "مهندَسة لتحمل ظروف الخارج.",
        },
        {
          title: "مركّزة على التجربة",
          description: "مصممة للتفاعل، لا للظهور فقط.",
        },
        {
          title: "قدرة على المقياس الكبير",
          description: "مبنية للمساحات المفتوحة والبصمات الأكبر.",
        },
        {
          title: "مخصصة بالكامل",
          description: "تُشكَّل بالكامل حول مفهوم التفعيل الخاص بك.",
        },
      ],
      advantages: [
        {
          title: "التصميم والهندسة الإنشائية",
          description:
            "هياكل مصنَّفة للاستخدام الخارجي لتحمل الطقس وحمولة الرياح.",
        },
        {
          title: "تطوير مفهوم التفعيل",
          description: "مساحات مصممة للتفاعل، لا للعرض فقط.",
        },
        {
          title: "مواد مقاومة للطقس",
          description: "تشطيبات ومواد مختارة لمتانة الاستخدام الخارجي.",
        },
        {
          title: "التركيب في الموقع",
          description: "إعداد كامل وفحوصات سلامة تُدار في الموقع.",
        },
      ],
      useCases: [
        "إطلاقات علامة وحملات تسويق تجريبية",
        "مهرجانات خارجية وتفعيلات وفعاليات عامة",
        "علامات تريد حضوراً غامراً بمقياس كبير",
        "حملات يكون الهيكل نفسه جزءاً من التجربة",
      ],
      faq: [
        {
          question: "هل تتحمل الهياكل الخارجية الرياح القوية أو ظروف الطقس؟",
          answer:
            "نعم، الهياكل مهندَسة ومصنَّفة لتحمل ظروف الخارج، مع مواد مختارة للمتانة.",
        },
        {
          question: "هل يمكن إعادة استخدام التفعيلات الخارجية في فعاليات لاحقة؟",
          answer:
            "بعضها يمكن حسب التصميم — كثير من التفعيلات الخارجية تُبنى لفعالية واحدة، لكن إعادة الاستخدام ممكنة بالهيكل المناسب. سننصح حسب أهدافك.",
        },
        {
          question: "هل تتولون التصاريح أو لوجستيات الموقع للبناء الخارجي؟",
          answer:
            "يمكننا إرشادك بشأن متطلبات الموقع والهيكل، لكن التصاريح عادة تُنسَّق مع منظّم الفعالية أو الموقع.",
        },
        {
          question: "لأي نوع من الفعاليات تناسب الهياكل الخارجية أكثر؟",
          answer:
            "إطلاقات العلامة والمهرجانات والتفعيلات العامة وأي فعالية يهم فيها حضور غامر بمقياس كبير.",
        },
        {
          question: "كم يستغرق بناء هيكل خارجي؟",
          answer:
            "الجداول تختلف كثيراً حسب المقياس والتعقيد — سنؤكد جدولاً بعد اعتماد المفهوم.",
        },
        {
          question: "هل يمكن أن تتضمن الهياكل الخارجية عناصر تفاعلية؟",
          answer:
            "نعم، يمكن تصميم التفعيلات بميزات تفاعلية كجزء من المفهوم.",
        },
      ],
    },
  },
  {
    slug: "pavilions",
    order: 7,
    image: media.boothTypes.pavilion,
    imageAlt: "National pavilion",
    en: {
      title: "Country / National Pavilions in {City}",
      excerpt: "Large-scale builds representing a nation on the world stage.",
      overviewTitle: "Built to Represent, Built to Scale",
      description:
        "Pavilions designed for government delegations and multi-brand national presence.",
      features: [
        {
          title: "Large-Scale Capability",
          description: "Built for expansive, high-profile footprints.",
        },
        {
          title: "Multi-Zone Design",
          description:
            "Space for multiple exhibitors, meetings, and public areas.",
        },
        {
          title: "Built to Represent",
          description: "Design reflects national identity and positioning.",
        },
        {
          title: "Full Project Management",
          description:
            "One team coordinating a complex, multi-stakeholder build.",
        },
      ],
      advantages: [
        {
          title: "Pavilion Design & Architecture",
          description:
            "Large-scale concepts designed to represent a national identity.",
        },
        {
          title: "Multi-Zone Layout Planning",
          description:
            "Space allocated for multiple exhibitors, meeting areas, and public zones.",
        },
        {
          title: "Structural Fabrication",
          description: "Built in-house for scale, safety, and durability.",
        },
        {
          title: "Stakeholder Coordination",
          description:
            "Managing the complexity of multi-brand, multi-stakeholder builds.",
        },
      ],
      useCases: [
        "Government delegations and ministries",
        "Multi-brand national pavilions at international exhibitions",
        "Organizations representing a country or region at trade events",
        "Large-scale projects requiring coordinated, multi-party management",
      ],
      faq: [
        {
          question: "How large can a national pavilion be?",
          answer:
            "Pavilion size depends on the event and the number of exhibitors involved — we scale design and fabrication to match your requirements.",
        },
        {
          question:
            "Can a pavilion house multiple exhibitors under one structure?",
          answer:
            "Yes, pavilions are commonly designed with multiple zones to accommodate several exhibitors within a shared national space.",
        },
        {
          question: "Do you coordinate directly with government stakeholders?",
          answer:
            "Yes, we're experienced in managing multi-stakeholder projects, including coordination with government and delegation representatives.",
        },
        {
          question: "How far in advance should a pavilion project start?",
          answer:
            "Given the scale and coordination involved, we recommend starting well ahead of the event — timelines depend on complexity, so early engagement is best.",
        },
        {
          question:
            "Can the pavilion reflect specific national branding or cultural elements?",
          answer:
            "Yes, design is tailored to reflect national identity, branding guidelines, and cultural representation as needed.",
        },
        {
          question: "Is reinstallation available for future events?",
          answer:
            "Yes, with proper dismantling and storage, pavilions can be reinstalled for future exhibitions.",
        },
      ],
    },
    ar: {
      title: "أجنحة / أجنحة وطنية في {City}",
      excerpt: "بناء بمقياس كبير يمثّل أمة على المسرح العالمي.",
      overviewTitle: "مبنية للتمثيل، مبنية للمقياس",
      description:
        "أجنحة مصممة للوفود الحكومية والحضور الوطني متعدد العلامات.",
      features: [
        {
          title: "قدرة على المقياس الكبير",
          description: "مبنية لمساحات واسعة وعالية الظهور.",
        },
        {
          title: "تصميم متعدد المناطق",
          description: "مساحة لعدة عارضين واجتماعات ومناطق عامة.",
        },
        {
          title: "مبنية للتمثيل",
          description: "التصميم يعكس الهوية الوطنية والموقع.",
        },
        {
          title: "إدارة مشروع كاملة",
          description: "فريق واحد ينسّق بناءً معقداً متعدد الأطراف.",
        },
      ],
      advantages: [
        {
          title: "تصميم وعمارة الجناح",
          description: "مفاهيم بمقياس كبير مصممة لتمثيل هوية وطنية.",
        },
        {
          title: "تخطيط متعدد المناطق",
          description:
            "مساحة مخصصة لعدة عارضين ومناطق اجتماعات ومناطق عامة.",
        },
        {
          title: "التصنيع الإنشائي",
          description: "يُبنى داخلياً للمقياس والسلامة والمتانة.",
        },
        {
          title: "تنسيق أصحاب المصلحة",
          description: "إدارة تعقيد البناء متعدد العلامات والأطراف.",
        },
      ],
      useCases: [
        "وفود حكومية ووزارات",
        "أجنحة وطنية متعددة العلامات في المعارض الدولية",
        "منظمات تمثّل دولة أو منطقة في فعاليات تجارية",
        "مشاريع بمقياس كبير تتطلب إدارة منسّقة متعددة الأطراف",
      ],
      faq: [
        {
          question: "ما حجم الجناح الوطني الممكن؟",
          answer:
            "حجم الجناح يعتمد على الفعالية وعدد العارضين المشاركين — نوسّع التصميم والتصنيع ليتوافقا مع متطلباتك.",
        },
        {
          question: "هل يمكن أن يستوعب الجناح عدة عارضين تحت هيكل واحد؟",
          answer:
            "نعم، تُصمَّم الأجنحة عادة بمناطق متعددة لاستيعاب عدة عارضين ضمن مساحة وطنية مشتركة.",
        },
        {
          question: "هل تنسّقون مباشرة مع أصحاب المصلحة الحكوميين؟",
          answer:
            "نعم، لدينا خبرة في إدارة مشاريع متعددة الأطراف، بما في ذلك التنسيق مع ممثلي الحكومة والوفود.",
        },
        {
          question: "متى يجب بدء مشروع الجناح مسبقاً؟",
          answer:
            "نظراً للمقياس والتنسيق المطلوبين، نوصي بالبدء قبل الفعالية بوقت كافٍ — الجداول تعتمد على التعقيد، لذا التواصل المبكر أفضل.",
        },
        {
          question: "هل يمكن أن يعكس الجناح هوية وطنية أو عناصر ثقافية محددة؟",
          answer:
            "نعم، يُصمَّم الجناح ليعكس الهوية الوطنية وإرشادات العلامة والتمثيل الثقافي حسب الحاجة.",
        },
        {
          question: "هل تتوفر إعادة التركيب لفعاليات لاحقة؟",
          answer:
            "نعم، مع التفكيك والتخزين المناسبين يمكن إعادة تركيب الأجنحة لمعارض لاحقة.",
        },
      ],
    },
  },
  {
    slug: "sustainable",
    order: 8,
    image: media.boothTypes.sustainable,
    imageAlt: "Sustainable eco booth",
    en: {
      title: "Sustainable / Eco Booths in {City}",
      excerpt: "Strong presence, lighter footprint.",
      overviewTitle: "Built with Purpose, Not Just Presence",
      description:
        "Eco-conscious materials without compromising on design or impact.",
      features: [
        {
          title: "Eco-Friendly Materials",
          description: "Sustainable substrates and finishes.",
        },
        {
          title: "Reusable by Design",
          description: "Built to reduce waste across multiple events.",
        },
        {
          title: "No Compromise on Design",
          description: "Sustainability without sacrificing visual impact.",
        },
        {
          title: "Aligned with ESG Goals",
          description: "Supports brands with sustainability commitments.",
        },
      ],
      advantages: [
        {
          title: "Eco-Friendly Substrates",
          description: "Materials selected to reduce environmental impact.",
        },
        {
          title: "Custom Textures & Finishes",
          description:
            "Sustainable options that still match your brand's look and feel.",
        },
        {
          title: "Reusable Structures",
          description:
            "Designed for repeated use, minimizing waste between events.",
        },
        {
          title: "Responsible Sourcing",
          description:
            "Materials chosen with environmental responsibility in mind.",
        },
      ],
      useCases: [
        "Brands with sustainability or ESG commitments",
        "Companies wanting to align booth presence with brand values",
        "Exhibitors looking to reduce environmental impact without reducing visual impact",
        "Organizations under increasing pressure to demonstrate sustainable practices",
      ],
      faq: [
        {
          question: 'What makes a booth "eco-friendly" specifically?',
          answer:
            "It typically involves sustainable substrates, reduced material waste, responsible sourcing, and designs built for reuse rather than single use.",
        },
        {
          question:
            "Does choosing an eco booth mean a smaller budget or fewer design options?",
          answer:
            "No, sustainable materials can be applied across most design and customization options — it doesn't limit visual impact.",
        },
        {
          question:
            "Can eco booths be as large or custom as a standard custom-built booth?",
          answer:
            "Yes, sustainability is a material and sourcing choice, not a size or design limitation.",
        },
        {
          question:
            "How does an eco booth support our company's ESG reporting?",
          answer:
            "We can provide documentation on materials and practices used, which your team can reference for sustainability reporting.",
        },
        {
          question: "Are eco booths more expensive than standard booths?",
          answer:
            "Costs vary by material and design — we'll provide a clear quote so you can compare based on your specific requirements.",
        },
        {
          question: "Can eco booths be reused across multiple events?",
          answer:
            "Yes, they're specifically designed with reuse in mind to minimize waste.",
        },
      ],
    },
    ar: {
      title: "أجنحة مستدامة / eco في {City}",
      excerpt: "حضور قوي، وبصمة أخف.",
      overviewTitle: "مبنية بهدف، لا للحضور فقط",
      description:
        "مواد واعية بيئياً دون المساس بالتصميم أو الأثر.",
      features: [
        {
          title: "مواد صديقة للبيئة",
          description: "ركائز وتشطيبات مستدامة.",
        },
        {
          title: "قابلة لإعادة الاستخدام بالتصميم",
          description: "مبنية لتقليل النفايات عبر عدة فعاليات.",
        },
        {
          title: "بلا تنازل عن التصميم",
          description: "استدامة دون التضحية بالأثر البصري.",
        },
        {
          title: "متوافقة مع أهداف ESG",
          description: "تدعم العلامات الملتزمة بالاستدامة.",
        },
      ],
      advantages: [
        {
          title: "ركائز صديقة للبيئة",
          description: "مواد مختارة لتقليل الأثر البيئي.",
        },
        {
          title: "ملامس وتشطيبات مخصصة",
          description:
            "خيارات مستدامة تطابق مظهر وإحساس علامتك رغم ذلك.",
        },
        {
          title: "هياكل قابلة لإعادة الاستخدام",
          description:
            "مصممة للاستخدام المتكرر لتقليل النفايات بين الفعاليات.",
        },
        {
          title: "توريد مسؤول",
          description: "مواد مختارة بمسؤولية بيئية.",
        },
      ],
      useCases: [
        "علامات ملتزمة بالاستدامة أو ESG",
        "شركات تريد مواءمة حضور الجناح مع قيم العلامة",
        "عارضون يريدون تقليل الأثر البيئي دون تقليل الأثر البصري",
        "منظمات تحت ضغط متزايد لإظهار ممارسات مستدامة",
      ],
      faq: [
        {
          question: "ما الذي يجعل الجناح «صديقاً للبيئة» تحديداً؟",
          answer:
            "عادة يتضمن ركائز مستدامة وتقليل هدر المواد وتوريداً مسؤولاً وتصاميم مبنية لإعادة الاستخدام بدل الاستخدام الواحد.",
        },
        {
          question:
            "هل اختيار جناح eco يعني ميزانية أصغر أو خيارات تصميم أقل؟",
          answer:
            "لا، يمكن تطبيق المواد المستدامة عبر معظم خيارات التصميم والتخصيص — ولا تحدّ من الأثر البصري.",
        },
        {
          question:
            "هل يمكن أن تكون أجنحة eco بحجم أو تخصيص جناح مخصص قياسي؟",
          answer:
            "نعم، الاستدامة اختيار للمواد والتوريد، وليست قيداً على الحجم أو التصميم.",
        },
        {
          question: "كيف يدعم جناح eco تقارير ESG لشركتنا؟",
          answer:
            "يمكننا توفير وثائق عن المواد والممارسات المستخدمة ليستند إليها فريقك في تقارير الاستدامة.",
        },
        {
          question: "هل أجنحة eco أغلى من الأجنحة القياسية؟",
          answer:
            "التكاليف تختلف حسب المادة والتصميم — نقدّم عرض سعر واضح للمقارنة حسب متطلباتك.",
        },
        {
          question: "هل يمكن إعادة استخدام أجنحة eco عبر عدة فعاليات؟",
          answer:
            "نعم، مصممة خصيصاً مع إعادة الاستخدام لتقليل النفايات.",
        },
      ],
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
  const localized = {
    ...service,
    ...service[locale],
    image: service.image,
    imageAlt: service.imageAlt,
    slug: service.slug,
  };
  const extras = serviceDetailExtras[service.slug]?.[locale];
  if (!extras) return localized;
  return {
    ...localized,
    cover: extras.cover ?? localized.cover,
    designs: extras.designs ?? localized.designs,
    process: extras.process ?? localized.process,
  };
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
