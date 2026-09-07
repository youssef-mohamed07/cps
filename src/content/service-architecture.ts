import { media } from "@/content/media";
import type { Locale } from "@/lib/i18n";

export type LocalizedText = { en: string; ar: string };

export type CatalogueItem = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type CatalogueCategory = {
  slug: string;
  title: LocalizedText;
  items: CatalogueItem[];
};

export type ServiceArchitecture = {
  slug: string;
  image: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  hero: {
    headline: LocalizedText;
    support: LocalizedText;
    bullets: LocalizedText[];
    catalogueCta: LocalizedText;
  };
  showcase: {
    title: LocalizedText;
    items: { title: LocalizedText; description: LocalizedText }[];
  };
  catalogue: {
    title: LocalizedText;
    support: LocalizedText;
    categories: CatalogueCategory[];
    layoutFilters?: LocalizedText[];
    searchable?: boolean;
  };
  why: {
    headline: LocalizedText;
    support: LocalizedText;
    items: LocalizedText[];
  };
  benefits: LocalizedText[];
  industries: LocalizedText[];
  related: string[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
  closingNoun: LocalizedText;
};

const t = (en: string, ar: string): LocalizedText => ({ en, ar });
const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const item = (en: string, ar: string, enDescription: string, arDescription: string): CatalogueItem => ({
  slug: slugify(en),
  title: t(en, ar),
  description: t(enDescription, arDescription),
});
const category = (en: string, ar: string, items: CatalogueItem[]): CatalogueCategory => ({
  slug: slugify(en),
  title: t(en, ar),
  items,
});

const industries = {
  government: t("Government & Public Sector", "الحكومة والقطاع العام"),
  banking: t("Banking & Financial Services", "البنوك والخدمات المالية"),
  healthcare: t("Healthcare & Pharmaceutical", "الرعاية الصحية والأدوية"),
  fmcg: t("FMCG", "السلع الاستهلاكية"),
  beauty: t("Beauty & Cosmetics", "الجمال ومستحضرات التجميل"),
  technology: t("Technology & Electronics", "التقنية والإلكترونيات"),
  automotive: t("Automotive", "السيارات"),
  retail: t("Retail & Shopping Malls", "التجزئة ومراكز التسوق"),
  realEstate: t("Real Estate", "العقارات"),
  hospitality: t("Hospitality", "الضيافة"),
  sports: t("Sports & Entertainment", "الرياضة والترفيه"),
  fashion: t("Fashion", "الأزياء"),
  food: t("Food & Beverage", "الأغذية والمشروبات"),
};

export const projectIndustryOptions = [
  { slug: "government-public-sector", title: industries.government },
  { slug: "banking-financial-services", title: industries.banking },
  { slug: "healthcare-pharmaceutical", title: industries.healthcare },
  { slug: "fmcg", title: industries.fmcg },
  { slug: "beauty-cosmetics", title: industries.beauty },
  { slug: "technology-electronics", title: industries.technology },
  { slug: "automotive", title: industries.automotive },
  { slug: "retail-shopping-malls", title: industries.retail },
  { slug: "real-estate", title: industries.realEstate },
  { slug: "hospitality", title: industries.hospitality },
  { slug: "sports-entertainment", title: industries.sports },
];

export function industrySlug(value: LocalizedText) {
  return projectIndustryOptions.find((option) => option.title.en === value.en)?.slug ?? slugify(value.en);
}

const faq = (
  qEn: string,
  qAr: string,
  aEn: string,
  aAr: string,
) => ({ question: t(qEn, qAr), answer: t(aEn, aAr) });

export const sharedProcess = [
  {
    title: t("Brief & Site Assessment", "الموجز ومعاينة الموقع"),
    description: t(
      "We review the brief, site conditions and technical constraints before design starts.",
      "نراجع الموجز وظروف الموقع والقيود الفنية قبل بدء التصميم.",
    ),
  },
  {
    title: t("Design & Technical Drawing", "التصميم والرسومات الفنية"),
    description: t(
      "Concepts become approved, production-ready drawings.",
      "نحوّل الأفكار إلى رسومات معتمدة وجاهزة للإنتاج.",
    ),
  },
  {
    title: t("In-House Production", "الإنتاج الداخلي"),
    description: t(
      "Wood, metal, acrylic, printing and signage are produced on our own floor.",
      "ننفّذ الخشب والمعدن والأكريليك والطباعة واللافتات داخل منشأتنا.",
    ),
  },
  {
    title: t("Installation & Delivery", "التوصيل والتركيب"),
    description: t(
      "Our crews handle delivery, installation and dismantling nationwide.",
      "تتولى فرقنا التوصيل والتركيب والتفكيك في مختلف مدن المملكة.",
    ),
  },
  {
    title: t("Handover & Support", "التسليم والدعم"),
    description: t(
      "We complete the final walkthrough, snagging and ongoing support.",
      "ننجز المعاينة النهائية ومعالجة الملاحظات والدعم المستمر.",
    ),
  },
];

export const serviceArchitecture: ServiceArchitecture[] = [
  {
    slug: "exhibitions-booths",
    image: media.boothTypes.custom,
    title: t("Exhibitions & Booths", "المعارض والأجنحة"),
    excerpt: t(
      "Custom exhibition environments, modular solutions and large-scale pavilions.",
      "بيئات معارض مخصصة وحلول معيارية وأجنحة واسعة النطاق.",
    ),
    showcase: {
      title: t("Featured Booth Types", "أنواع أجنحة مختارة"),
      items: [
        {
          title: t("Custom-Built Exhibition Booths", "أجنحة معارض مخصصة"),
          description: t("Bespoke booths developed around your brand, visitor journey and functional requirements. Nothing off a shelf.", "أجنحة مخصصة تُطوّر حول علامتك ومسار الزائر واحتياجاتك الوظيفية. لا نعتمد حلولاً جاهزة من الرف."),
        },
        {
          title: t("Modular Exhibition Booths", "أجنحة معارض معيارية"),
          description: t("Flexible framework systems built for efficient installation, reconfiguration and reuse across multiple shows.", "أنظمة هياكل مرنة تتيح التركيب الفعال وإعادة التشكيل والاستخدام عبر عدة معارض."),
        },
        {
          title: t("Double-Decker Booths", "أجنحة بطابقين"),
          description: t("Two-level structures with meeting areas, hospitality or lounge space built into a working upper floor.", "هياكل بمستويين تضم طابقاً علوياً قابلاً للاستخدام للاجتماعات أو الضيافة أو الاستراحة."),
        },
        {
          title: t("Pavilions & Large-Scale Exhibition Spaces", "الأجنحة والمساحات واسعة النطاق"),
          description: t("Government, country and multi-brand pavilions requiring coordinated, large-format production.", "أجنحة حكومية ووطنية ومتعددة العلامات تتطلب إنتاجاً منسقاً وواسع النطاق."),
        },
        {
          title: t("Shell Scheme Upgrades", "تطوير الأجنحة القياسية"),
          description: t("Cladding, graphics, lighting and counters that turn a standard organizer shell into a fully branded stand.", "كسوات ورسومات وإضاءة وكاونترات تحوّل جناح المنظم القياسي إلى مساحة متكاملة تحمل هوية علامتك."),
        },
      ],
    },
    hero: {
      headline: t("Built to stand out. Engineered to perform.", "مصممة لتلفت الأنظار ومهندسة للأداء."),
      support: t("Custom exhibition environments, engineered and finished in-house.", "بيئات معارض مخصصة تُهندس وتُنفّذ بالكامل داخل منشأتنا."),
      bullets: [
        t("Bespoke booths built around your brand and visitor journey", "أجنحة مخصصة مبنية حول علامتك ومسار الزائر"),
        t("Modular systems built for reuse across multiple shows", "أنظمة معيارية قابلة لإعادة الاستخدام عبر عدة معارض"),
        t("Double-decker and large-scale pavilions", "أجنحة بطابقين ومساحات عرض واسعة"),
        t("One team from technical drawing to installation", "فريق واحد من الرسم الفني حتى التركيب"),
      ],
      catalogueCta: t("See All Booth Types", "عرض كل أنواع الأجنحة"),
    },
    catalogue: {
      title: t("All Booth Types", "كل أنواع الأجنحة"),
      support: t("Every booth format we build, from a single inline stand to a multi-brand pavilion.", "كل صيغة أجنحة ننفذها، من الجناح الخطي إلى الأجنحة متعددة العلامات."),
      layoutFilters: [t("Inline Booth", "جناح خطي"), t("Corner Booth", "جناح زاوية"), t("Peninsula Booth", "جناح شبه جزيرة"), t("Island Booth", "جناح جزيرة")],
      categories: [category("Booth Types", "أنواع الأجنحة", [
        item("Custom-Built Exhibition Booths", "أجنحة معارض مخصصة", "Bespoke booths designed around the brand, visitor flow and functional needs — built and finished in-house.", "أجنحة مخصصة تُصمم حول العلامة وتدفق الزوار والاحتياجات الوظيفية، وتُصنّع وتُشطب داخل منشأتنا."),
        item("Modular Exhibition Booths", "أجنحة معارض معيارية", "Reusable framework systems that reconfigure across show sizes without a full rebuild each time.", "أنظمة هياكل قابلة لإعادة الاستخدام وإعادة التشكيل حسب مساحة المعرض، دون إعادة بناء كاملة في كل مرة."),
        item("Double-Decker Booths", "أجنحة بطابقين", "Two-level structures with a working upper floor for meetings, hospitality or storage.", "هياكل بمستويين تضم طابقاً علوياً للاجتماعات أو الضيافة أو التخزين."),
        item("Pavilions & Large-Scale Exhibition Spaces", "الأجنحة والمساحات واسعة النطاق", "Government, country and multi-brand pavilions built for coordinated, large-format production.", "أجنحة حكومية ووطنية ومتعددة العلامات تُبنى بإنتاج منسق وواسع النطاق."),
        item("Shell Scheme Upgrades", "تطوير الأجنحة القياسية", "Cladding, graphics, lighting and counters that upgrade a standard organizer shell.", "كسوات ورسومات وإضاءة وكاونترات لتطوير جناح المنظم القياسي."),
        item("Portable & Pop-Up Displays", "العروض المحمولة والسريعة", "Lightweight, transportable backdrops and counters for shows you'll set up and strike quickly.", "خلفيات وكاونترات خفيفة وسهلة النقل للمعارض التي تحتاج إلى تركيب وتفكيك سريع."),
      ])],
    },
    why: {
      headline: t("Why brands choose CPS for exhibition booths", "لماذا تختار العلامات CPS لأجنحة المعارض"),
      support: t("One team, one production floor, no subcontracted surprises.", "فريق واحد ومنشأة إنتاج واحدة بلا مفاجآت المقاولين الفرعيين."),
      items: [t("In-house wood, metal, acrylic and print production", "إنتاج داخلي للخشب والمعدن والأكريليك والطباعة"), t("Experience across major KSA exhibition halls", "خبرة في أهم قاعات المعارض بالمملكة"), t("Nationwide installation and dismantling crews", "فرق تركيب وتفكيك على مستوى المملكة"), t("Every layout covered", "تغطية جميع تخطيطات الأجنحة")],
    },
    benefits: [t("Faster turnaround under one roof", "تنفيذ أسرع تحت سقف واحد"), t("Consistent finish across every booth type", "جودة تشطيب متسقة لكل أنواع الأجنحة"), t("One point of contact from concept to teardown", "نقطة اتصال واحدة من الفكرة حتى التفكيك"), t("Reusable modular options reduce repeat costs", "خيارات معيارية قابلة لإعادة الاستخدام تخفض تكاليف التكرار")],
    industries: [industries.beauty, industries.food, industries.technology, industries.healthcare, industries.fashion, industries.automotive],
    related: ["event-fabrication", "custom-fabrication", "installation-project-delivery"],
    faq: [
      faq("How long does a custom booth take to build?", "كم يستغرق بناء جناح مخصص؟", "Timelines depend on size and complexity — request a quote for a schedule specific to your show.", "تعتمد المدة على الحجم والتعقيد؛ اطلب عرض سعر للحصول على جدول زمني يناسب معرضك تحديداً."),
      faq("Can you build for shows outside Riyadh or Jeddah?", "هل تنفذون أجنحة لمعارض خارج الرياض أو جدة؟", "Yes — installation crews cover exhibitions nationwide.", "نعم، تغطي فرق التركيب المعارض في أنحاء المملكة."),
      faq("Do you offer reusable modular options?", "هل توفرون خيارات معيارية قابلة لإعادة الاستخدام؟", "Yes, modular booths are designed for redeployment across multiple shows.", "نعم، تُصمم الأجنحة المعيارية لإعادة استخدامها عبر عدة معارض."),
      faq("Can you upgrade a standard organizer shell scheme?", "هل يمكن تطوير جناح المنظم القياسي؟", "Yes — see Shell Scheme Upgrades in the catalogue.", "نعم، راجع تطوير الأجنحة القياسية في الكتالوج."),
    ],
    closingNoun: t("booth", "جناح"),
  },
  {
    slug: "event-fabrication",
    image: media.boothTypes.outdoor,
    title: t("Event Fabrication", "تصنيع وتجهيز الفعاليات"),
    excerpt: t("Stages, scenic structures, branded environments and experiential builds.", "منصات وهياكل مشهدية وبيئات تحمل الهوية وتجارب تفاعلية."),
    showcase: {
      title: t("Featured Event Structures", "هياكل فعاليات مختارة"),
      items: [
        {
          title: t("Stage & Scenic Fabrication", "تصنيع المنصات والمشاهد"),
          description: t("Stages, scenic structures, backdrops and stage surrounds built to your rigging and run-of-show requirements.", "منصات وهياكل مشهدية وخلفيات ومحيط للمنصة تُنفّذ وفق متطلبات التعليق وتسلسل فقرات الفعالية."),
        },
        {
          title: t("Branded Event Structures", "هياكل فعاليات تحمل الهوية"),
          description: t("Entrances, registration counters and branded walls that set the tone before guests reach the main event.", "مداخل وكاونترات تسجيل وجدران تحمل الهوية لتكوين الانطباع المطلوب قبل وصول الضيوف إلى الفعالية الرئيسية."),
        },
        {
          title: t("VIP & Hospitality Areas", "مناطق كبار الزوار والضيافة"),
          description: t("Lounges, majlis-style seating and premium guest zones finished to hospitality standard.", "صالات وجلسات مجلس ومناطق لكبار الزوار بتشطيب يراعي معايير الضيافة."),
        },
        {
          title: t("Interactive & Activation Zones", "مناطق التفاعل والتفعيل"),
          description: t("Engagement spaces and product-experience zones built around a specific activation concept.", "مساحات تفاعل وتجربة منتجات تُبنى حول فكرة محددة للتفعيل."),
        },
        {
          title: t("Experience Centers", "مراكز التجارب"),
          description: t("Immersive or semi-permanent spaces that communicate a product or brand story through the space itself.", "مساحات غامرة أو شبه دائمة تروي قصة منتج أو علامة من خلال المكان نفسه."),
        },
      ],
    },
    hero: {
      headline: t("We build the spaces where experiences happen.", "نبني المساحات التي تصنع التجارب."),
      support: t("Structural, scenic and branded builds for events and activations.", "تنفيذ إنشائي ومشهدي وهوية متكاملة للفعاليات والتجارب."),
      bullets: [t("Stages, scenic structures and branded entrances", "منصات وهياكل مشهدية ومداخل تحمل الهوية"), t("VIP lounges and hospitality areas", "صالات كبار الزوار ومناطق الضيافة"), t("Interactive zones and experience centers", "مناطق تفاعلية ومراكز تجارب"), t("Custom one-off installations", "تركيبات مخصصة لمرة واحدة")],
      catalogueCta: t("See All Event Structures", "عرض كل هياكل الفعاليات"),
    },
    catalogue: {
      title: t("All Event Structures", "كل هياكل الفعاليات"),
      support: t("Every structure CPS fabricates for corporate events, activations and conferences.", "كل ما تصنعه CPS للفعاليات المؤسسية والتجارب والمؤتمرات."),
      categories: [category("Event Structures", "هياكل الفعاليات", [
        item("Stage & Scenic Fabrication", "تصنيع المنصات والمشاهد", "Stages, scenic backdrops and podiums built to your run-of-show and rigging requirements.", "منصات وخلفيات مشهدية ومنابر تُنفّذ وفق تسلسل فقرات الفعالية ومتطلبات التعليق."),
        item("Branded Event Structures", "هياكل فعاليات تحمل الهوية", "Entrances, registration counters and branded walls for a coordinated event arrival.", "مداخل وكاونترات تسجيل وجدران تحمل الهوية لاستقبال منسق في الفعالية."),
        item("VIP & Hospitality Areas", "مناطق كبار الزوار والضيافة", "Lounges, majlis-style seating and premium guest zones.", "صالات وجلسات مجلس ومناطق مميزة لكبار الزوار."),
        item("Photo & Content Experiences", "تجارب الصور والمحتوى", "Branded photo backdrops and social-media corners built for shareable content.", "خلفيات تصوير وزوايا تواصل اجتماعي تحمل الهوية لإنتاج محتوى قابل للمشاركة."),
        item("Interactive & Activation Zones", "مناطق التفاعل والتفعيل", "Product-experience and engagement zones built around a specific activation.", "مناطق تجربة منتجات وتفاعل تُبنى حول تفعيل محدد."),
        item("Experience Centers", "مراكز التجارب", "Immersive or semi-permanent spaces that communicate a brand story through the space.", "مساحات غامرة أو شبه دائمة تروي قصة العلامة من خلال المكان."),
        item("Custom Event Installations", "تركيبات فعاليات مخصصة", "One-off structures for a concept that doesn't fit a standard category.", "هياكل خاصة للأفكار التي لا تندرج ضمن فئة قياسية."),
      ])],
    },
    why: { headline: t("Why brands choose CPS for event builds", "لماذا تختار العلامات CPS لتجهيز الفعاليات"), support: t("Structural, scenic and branded work handled by one crew.", "فريق واحد يتولى الإنشاء والمشهد والهوية."), items: [t("One team for structure, scenery and branding", "فريق واحد للإنشاء والمشهد والهوية"), t("Rigging and technical build experience", "خبرة في التعليق والبناء الفني"), t("Fast turnaround for activation timelines", "سرعة تنفيذ تناسب جداول التفعيلات"), t("One crew through on-site installation", "فريق واحد حتى التركيب في الموقع")] },
    benefits: [t("Consistent brand execution", "تنفيذ متسق للهوية"), t("On-site technical support", "دعم فني في الموقع"), t("Custom one-off builds", "تنفيذات خاصة لمرة واحدة"), t("Coordinated multi-structure logistics", "لوجستيات منسقة لعدة هياكل")],
    industries: [industries.government, industries.banking, industries.fmcg, industries.retail, industries.hospitality, industries.sports],
    related: ["exhibitions-booths", "rental-solutions", "installation-project-delivery"],
    faq: [faq("How far in advance should we brief an event build?", "متى ينبغي إرسال موجز تجهيز الفعالية؟", "The earlier the better for stage or rigging-heavy builds — get in touch as soon as the venue and date are set.", "كلما كان أبكر كان أفضل للأعمال التي تتضمن منصات أو متطلبات تعليق كبيرة؛ تواصل معنا بمجرد تحديد المكان والتاريخ."), faq("Can you build stages with specific rigging or load requirements?", "هل تبنون منصات بمتطلبات تعليق أو أحمال محددة؟", "Yes, stage and scenic fabrication is built to your technical and rigging specs.", "نعم، تُصنّع المنصات والعناصر المشهدية وفق مواصفاتك الفنية ومتطلبات التعليق."), faq("Do you handle teardown the same night?", "هل تتولون التفكيك في الليلة نفسها؟", "Yes — dismantling is coordinated around the event's move-out schedule.", "نعم، يُنسق التفكيك وفق جدول إخلاء الفعالية."), faq("Can VIP or hospitality areas be added to an existing structure?", "هل يمكن إضافة مناطق لكبار الزوار أو الضيافة إلى هيكل قائم؟", "Yes, these can be built as an extension of an existing stage or event structure.", "نعم، يمكن تنفيذها امتداداً لمنصة أو هيكل فعالية قائم.")],
    closingNoun: t("event structure", "هيكل فعالية"),
  },
  {
    slug: "fit-out-interiors",
    image: media.about.studio,
    title: t("Fit-Out & Interiors", "التجهيزات الداخلية"),
    excerpt: t("Commercial interiors, offices, showrooms, retail and branded spaces.", "مساحات تجارية ومكاتب وصالات عرض ومتاجر وبيئات تحمل الهوية."),
    showcase: {
      title: t("Featured Fit-Out Types", "أنواع تجهيز داخلي مختارة"),
      items: [
        {
          title: t("Office Fit-Out", "تجهيز المكاتب"),
          description: t("Workspaces, meeting rooms and executive environments finished end-to-end, from partitioning to furniture.", "مساحات عمل وغرف اجتماعات وبيئات تنفيذية تُجهّز بالكامل، من القواطع إلى الأثاث."),
        },
        {
          title: t("Showroom Fit-Out", "تجهيز صالات العرض"),
          description: t("Corporate, product and sales showrooms built to hold up under daily foot traffic and repeated demos.", "صالات عرض للشركات والمنتجات والمبيعات تتحمل حركة الزوار اليومية والعروض التوضيحية المتكررة."),
        },
        {
          title: t("Retail Fit-Out", "تجهيز المتاجر"),
          description: t("Full stores, shop-in-shop concepts and branded corners inside a host retailer.", "متاجر متكاملة ومفاهيم متجر داخل متجر وزوايا تحمل الهوية داخل متاجر مستضيفة."),
        },
        {
          title: t("Reception & Corporate Areas", "مناطق الاستقبال والمؤسسات"),
          description: t("Front-of-house spaces built as the first physical impression of the brand.", "مساحات استقبال تُبنى لتكون أول انطباع ملموس عن العلامة."),
        },
        {
          title: t("Brand Corners", "زوايا العلامة"),
          description: t("Dedicated branded zones inside offices, retail floors, exhibitions or partner sites.", "مناطق مخصصة للعلامة داخل المكاتب أو طوابق التجزئة أو المعارض أو مواقع الشركاء."),
        },
      ],
    },
    hero: { headline: t("From empty space to branded environment.", "من مساحة فارغة إلى بيئة متكاملة الهوية."), support: t("Commercial interiors built and finished end-to-end.", "تنفيذ وتشطيب المساحات التجارية من البداية للنهاية."), bullets: [t("Office, showroom and retail fit-outs", "تجهيز المكاتب وصالات العرض والمتاجر"), t("Reception and corporate front-of-house spaces", "مناطق الاستقبال والواجهات المؤسسية"), t("Branded corners and custom interior elements", "زوايا هوية وعناصر داخلية مخصصة"), t("One team from drawing to final finishing", "فريق واحد من الرسم حتى التشطيب النهائي")], catalogueCta: t("See All Fit-Out Types", "عرض كل أنواع التجهيز") },
    catalogue: { title: t("All Fit-Out Types", "كل أنواع التجهيز الداخلي"), support: t("Every interior environment CPS delivers, from a single counter to a full fit-out.", "كل بيئة داخلية تنفذها CPS، من كاونتر واحد إلى تجهيز متكامل."), categories: [category("Fit-Out Types", "أنواع التجهيز", [
      item("Office Fit-Out", "تجهيز المكاتب", "Workspaces, meeting rooms and executive offices finished end-to-end.", "مساحات عمل وغرف اجتماعات ومكاتب تنفيذية تُجهّز بالكامل."),
      item("Showroom Fit-Out", "تجهيز صالات العرض", "Corporate, product, experience and sales showrooms.", "صالات عرض للشركات والمنتجات والتجارب والمبيعات."),
      item("Retail Fit-Out", "تجهيز المتاجر", "Retail stores, shop-in-shop concepts, branded corners and kiosks.", "متاجر ومفاهيم متجر داخل متجر وزوايا تحمل الهوية وأكشاك."),
      item("Reception & Corporate Areas", "مناطق الاستقبال والمؤسسات", "Front-of-house spaces and client-facing corporate environments.", "مساحات استقبال وبيئات مؤسسية موجهة للعملاء."),
      item("Brand Corners", "زوايا العلامة", "Dedicated branded spaces inside offices, retail, exhibitions or partner sites.", "مساحات مخصصة للعلامة داخل المكاتب والمتاجر والمعارض أو مواقع الشركاء."),
      item("Custom Interior Elements", "عناصر داخلية مخصصة", "Counters, cabinetry, feature walls and display units built to match the space.", "كاونترات وخزائن وجدران مميزة ووحدات عرض مصممة لتناسب المساحة."),
    ])] },
    why: { headline: t("Why brands choose CPS for fit-outs", "لماذا تختار العلامات CPS للتجهيزات الداخلية"), support: t("One contractor for partitioning, finishes, branding and furniture.", "مقاول واحد للقواطع والتشطيبات والهوية والأثاث."), items: [t("One team across every trade", "فريق واحد لكل التخصصات"), t("Coordinated site works with minimal downtime", "أعمال موقع منسقة بأقل توقف"), t("In-house joinery and metalwork", "نجارة وأعمال معدنية داخلية"), t("Daily-use durability standards", "معايير متانة للاستخدام اليومي")] },
    benefits: [t("One contractor from design to install", "مقاول واحد من التصميم حتى التركيب"), t("Consistent brand application", "تطبيق متسق للهوية"), t("Less coordination overhead", "جهد تنسيق أقل"), t("Custom elements matched to existing interiors", "عناصر مخصصة متوافقة مع المساحة القائمة")],
    industries: [industries.banking, industries.realEstate, industries.retail, industries.healthcare, industries.technology, industries.hospitality],
    related: ["retail-displays", "custom-fabrication", "printing-signage"],
    faq: [faq("Can you fit out an occupied office without disrupting work?", "هل يمكن تجهيز مكتب مشغول دون تعطيل العمل؟", "Yes, phased fit-out schedules can be planned around business hours.", "نعم، يمكن تخطيط جدول تجهيز على مراحل يراعي ساعات العمل."), faq("Do you handle permits and approvals?", "هل تتولون التصاريح والموافقات؟", "Site survey and technical drawing stages flag what's needed — let's discuss your specific site.", "تحدد معاينة الموقع ومرحلة الرسومات الفنية المتطلبات اللازمة؛ لنتناقش حول موقعك تحديداً."), faq("Can a retail fit-out be replicated across multiple stores?", "هل يمكن تكرار تجهيز متجر عبر عدة فروع؟", "Yes, retail fit-outs can be standardized and rolled out across locations.", "نعم، يمكن توحيد مواصفات التجهيز وتنفيذه عبر عدة مواقع."), faq("What's the typical timeline for an office fit-out?", "ما المدة المعتادة لتجهيز مكتب؟", "Depends on scope and site condition — request a quote for a schedule specific to your space.", "تعتمد على نطاق العمل وحالة الموقع؛ اطلب عرض سعر لجدول زمني يناسب مساحتك تحديداً.")],
    closingNoun: t("fit-out", "تجهيز داخلي"),
  },
  {
    slug: "retail-displays",
    image: media.boothTypes.kiosk,
    title: t("Retail Displays", "عروض ونقاط البيع"),
    excerpt: t("Gondolas, product displays, POS/POP units, kiosks and window displays.", "جندولات وحوامل منتجات ووحدات نقاط بيع وأكشاك وواجهات عرض."),
    showcase: {
      title: t("Featured Display Types", "أنواع عرض مختارة"),
      items: [
        {
          title: t("Gondolas", "جندولات"),
          description: t("Freestanding or wall-adjacent units built for organized, high-volume product merchandising.", "وحدات مستقلة أو بمحاذاة الجدران لعرض المنتجات بكميات كبيرة وبطريقة منظمة."),
        },
        {
          title: t("Product Display Stands", "حوامل عرض المنتجات"),
          description: t("Structures sized and shaped around a specific product line and how shoppers interact with it.", "هياكل بمقاسات وأشكال تناسب خط منتجات محدداً وطريقة تفاعل المتسوقين معه."),
        },
        {
          title: t("POS Displays", "عروض نقاط البيع"),
          description: t("Point-of-sale units placed to convert attention into purchase right at the till.", "وحدات عند نقاط البيع لتحويل انتباه المتسوق إلى شراء بجوار صندوق الدفع مباشرةً."),
        },
        {
          title: t("Promotional Kiosks", "أكشاك ترويجية"),
          description: t("Compact branded structures for sampling, sales and short-run promotions.", "هياكل مدمجة تحمل الهوية لتوزيع العينات والمبيعات والحملات الترويجية قصيرة المدة."),
        },
        {
          title: t("Window Displays", "واجهات العرض"),
          description: t("Storefront visual merchandising built to stop foot traffic from the street.", "عروض مرئية لواجهات المتاجر مصممة لجذب انتباه المارة في الشارع."),
        },
      ],
    },
    hero: { headline: t("Designed to be seen. Built to sell.", "مصممة لتُرى ومبنية لتبيع."), support: t("Custom retail displays built for visibility and merchandising.", "عروض تجزئة مخصصة للظهور القوي والعرض الفعال."), bullets: [t("Gondolas and product display stands", "جندولات وحوامل عرض منتجات"), t("POS/POP campaign units", "وحدات نقاط بيع للحملات"), t("Kiosks, window and countertop displays", "أكشاك وواجهات وعروض كاونتر"), t("One-off units or multi-location rollouts", "قطعة واحدة أو نشر عبر مواقع متعددة")], catalogueCta: t("See All Display Types", "عرض كل أنواع العرض") },
    catalogue: { title: t("All Display Types", "كل أنواع العروض"), support: t("Every retail display format CPS produces, as a one-off or at rollout scale.", "كل صيغ عرض التجزئة التي تنتجها CPS، كقطعة واحدة أو على نطاق واسع."), categories: [category("Display Types", "أنواع العرض", [
      item("Gondolas", "جندولات", "Freestanding or wall-adjacent units for organized, high-volume merchandising.", "وحدات مستقلة أو بمحاذاة الجدران لعرض المنتجات بكميات كبيرة وبطريقة منظمة."),
      item("Product Display Stands", "حوامل عرض المنتجات", "Structures sized and shaped around a specific product line.", "هياكل بمقاسات وأشكال تناسب خط منتجات محدداً."),
      item("POS Displays", "عروض نقاط البيع", "Point-of-sale units placed to convert attention into purchase.", "وحدات عند نقاط البيع لتحويل الانتباه إلى شراء."),
      item("POP Displays", "عروض نقطة الشراء", "Campaign-led point-of-purchase units for promotional and seasonal pushes.", "وحدات عند نقاط الشراء تدعم الحملات الترويجية والموسمية."),
      item("Promotional Kiosks", "أكشاك ترويجية", "Compact branded structures for sampling, sales and short-run promotions.", "هياكل مدمجة تحمل الهوية لتوزيع العينات والمبيعات والحملات الترويجية قصيرة المدة."),
      item("Window Displays", "واجهات العرض", "Storefront visual merchandising built to stop foot traffic from the street.", "عروض مرئية لواجهات المتاجر مصممة لجذب انتباه المارة في الشارع."),
      item("Countertop Displays", "عروض سطح الكاونتر", "Small-format branded units for counters, shelves and high-traffic touchpoints.", "وحدات صغيرة تحمل الهوية للكاونترات والأرفف ونقاط التفاعل ذات الحركة الكثيفة."),
      item("Free-Standing Display Units", "وحدات عرض حرة", "Standalone structures for retail floors, malls and temporary placements.", "هياكل مستقلة لطوابق المتاجر ومراكز التسوق والمواقع المؤقتة."),
      item("Custom Brand Displays", "عروض علامة مخصصة", "Bespoke concepts combining wood, metal, acrylic, print and lighting as required.", "تصاميم مخصصة تجمع الخشب والمعدن والأكريليك والطباعة والإضاءة حسب الحاجة."),
    ])] },
    why: { headline: t("Why brands choose CPS for retail displays", "لماذا تختار العلامات CPS لعروض التجزئة"), support: t("Displays engineered for daily retail traffic.", "عروض مهندسة لتحمل حركة التجزئة اليومية."), items: [t("Durable under daily foot traffic", "متانة للاستخدام اليومي"), t("In-house acrylic, wood and metal production", "إنتاج داخلي للأكريليك والخشب والمعدن"), t("Multi-location rollout capability", "قدرة على التنفيذ في مواقع متعددة"), t("Fast seasonal campaign production", "إنتاج سريع للحملات الموسمية")] },
    benefits: [t("Consistent rollout quality", "جودة متسقة عبر الفروع"), t("Materials matched to the product", "مواد مناسبة لطبيعة المنتج"), t("Scales from one unit to national rollouts", "قابلية للتوسع من وحدة واحدة إلى انتشار وطني"), t("Coordinated delivery and installation", "توصيل وتركيب منسقان")],
    industries: [industries.retail, industries.fmcg, industries.beauty, industries.technology, industries.automotive, industries.fashion],
    related: ["fit-out-interiors", "printing-signage", "custom-fabrication"],
    faq: [faq("Can you produce and install across multiple store locations?", "هل يمكن الإنتاج والتركيب عبر عدة فروع للمتجر؟", "Yes, display rollouts are coordinated across as many locations as needed.", "نعم، ننسق تنفيذ وحدات العرض عبر العدد المطلوب من المواقع."), faq("What materials do you typically use?", "ما المواد التي تستخدمونها عادةً؟", "Wood, metal and acrylic, matched to the product and the brand's finish requirements.", "الخشب والمعدن والأكريليك، بما يناسب المنتج ومتطلبات تشطيب العلامة."), faq("Can displays be updated or rebranded later?", "هل يمكن تحديث وحدات العرض أو تغيير هويتها لاحقاً؟", "Yes — see Rebranding under Installation & Project Delivery.", "نعم، راجع إعادة الهوية ضمن التركيب وتسليم المشاريع."), faq("Is there a minimum order for a display rollout?", "هل يوجد حد أدنى لطلب وحدات العرض؟", "No fixed minimum — one-off units and multi-location rollouts are both handled.", "لا يوجد حد أدنى ثابت؛ ننفذ الوحدات الفردية والمشاريع الموزعة على عدة مواقع.")],
    closingNoun: t("display rollout", "مشروع عرض"),
  },
  {
    slug: "custom-fabrication",
    image: media.services.fabrication,
    title: t("Custom Fabrication", "التصنيع المخصص"),
    excerpt: t("Wood, metal, acrylic, CNC and mixed-material bespoke fabrication.", "تصنيع مخصص بالخشب والمعدن والأكريليك وCNC والمواد المختلطة."),
    showcase: {
      title: t("Featured Fabrication Capabilities", "قدرات تصنيع مختارة"),
      items: [
        {
          title: t("Custom Wood Fabrication", "تصنيع خشبي مخصص"),
          description: t("Bespoke joinery built to drawing, from structural frames to finished cabinetry.", "أعمال نجارة مخصصة وفق الرسومات، من الهياكل الإنشائية إلى الخزائن مكتملة التشطيب."),
        },
        {
          title: t("Metal Frames", "إطارات معدنية"),
          description: t("Structural framing for booths, stages and fit-out builds.", "هياكل معدنية إنشائية للأجنحة والمنصات والتجهيزات الداخلية."),
        },
        {
          title: t("Acrylic Displays", "عروض أكريليك"),
          description: t("Clear or coloured acrylic structures built for product presentation.", "هياكل من الأكريليك الشفاف أو الملون لعرض المنتجات."),
        },
        {
          title: t("CNC Routing", "التفريز بتقنية CNC"),
          description: t("Automated precision routing for wood, acrylic and composite materials.", "تفريز آلي دقيق للخشب والأكريليك والمواد المركبة."),
        },
        {
          title: t("Integrated Mixed-Material Builds", "تنفيذات متكاملة بمواد مختلطة"),
          description: t("Wood, metal, acrylic, print and lighting combined into a single structure when the brief calls for it.", "خشب ومعدن وأكريليك وطباعة وإضاءة تُدمج في هيكل واحد عندما يتطلب الموجز ذلك."),
        },
      ],
    },
    hero: { headline: t("If it can be engineered, we can build it.", "إذا أمكن هندسته، يمكننا تصنيعه."), support: t("Multi-discipline fabrication under one roof.", "تصنيع متعدد التخصصات تحت سقف واحد."), bullets: [t("Wood and joinery, CNC-cut in-house", "أعمال خشب ونجارة وقطع CNC داخلي"), t("Metal fabrication and powder coating", "تصنيع معدني ودهان بالبودرة"), t("Acrylic fabrication and custom structures", "تصنيع أكريليك وهياكل مخصصة"), t("Integrated mixed-material builds", "تنفيذات متكاملة بمواد مختلطة")], catalogueCta: t("See All Fabrication Capabilities", "عرض كل قدرات التصنيع") },
    catalogue: { title: t("All Fabrication Capabilities", "كل قدرات التصنيع"), support: t("Every discipline and item CPS produces in-house, by material and process.", "كل تخصص وعنصر تنتجه CPS داخلياً حسب المادة والعملية."), categories: [
      category("Wood & Joinery", "الخشب والنجارة", [item("Custom Wood Fabrication", "تصنيع خشبي مخصص", "Bespoke joinery built to drawing, from structural frames to finished cabinetry.", "أعمال نجارة مخصصة وفق الرسومات، من الهياكل الإنشائية إلى الخزائن مكتملة التشطيب."), item("CNC Wood Cutting", "قطع الخشب بتقنية CNC", "Precision-cut wood components with repeatable accuracy across a full production run.", "مكونات خشبية مقطوعة بدقة متكررة عبر دفعة الإنتاج كاملةً."), item("Cabinets & Counters", "الخزائن والكاونترات", "Storage and service counters built to fit the exact footprint of the space.", "خزائن وكاونترات خدمة تُنفّذ لتناسب أبعاد المساحة بدقة."), item("Display Units", "وحدات العرض", "Wood-based display structures sized around the product or brand requirement.", "هياكل عرض خشبية بمقاسات تناسب متطلبات المنتج أو العلامة."), item("Decorative Structures", "هياكل زخرفية", "Feature elements built for visual impact rather than pure function.", "عناصر مميزة تركز على التأثير البصري أكثر من الوظيفة وحدها.")]),
      category("Metal Fabrication", "التصنيع المعدني", [item("Metal Frames", "إطارات معدنية", "Structural framing for booths, stages and fit-out builds.", "هياكل معدنية إنشائية للأجنحة والمنصات والتجهيزات الداخلية."), item("Structural Frames", "هياكل إنشائية", "Load-bearing frameworks engineered for double-decker and large-format structures.", "هياكل حاملة للأحمال تُهندس للأجنحة ذات الطابقين والهياكل واسعة النطاق."), item("Custom Metal Works", "أعمال معدنية مخصصة", "Bespoke metal components fabricated to spec for non-standard builds.", "مكونات معدنية مخصصة تُصنّع وفق المواصفات للأعمال غير القياسية."), item("Laser Cutting", "القطع بالليزر", "Precision-cut metal parts and panels for signage, displays and structural detail.", "أجزاء وألواح معدنية مقطوعة بدقة للافتات والعروض والتفاصيل الإنشائية."), item("Powder Coating", "الدهان بالبودرة", "Durable, colour-matched metal finishing for a consistent brand palette.", "تشطيب معدني متين ومطابق للألوان للحفاظ على اتساق ألوان العلامة.")]),
      category("Acrylic Fabrication", "تصنيع الأكريليك", [item("Acrylic Displays", "عروض أكريليك", "Clear or coloured acrylic structures built for product presentation.", "هياكل من الأكريليك الشفاف أو الملون لعرض المنتجات."), item("Acrylic Boxes", "صناديق أكريليك", "Custom-sized acrylic enclosures for retail, display or protective use.", "حاويات أكريليك بمقاسات مخصصة للتجزئة أو العرض أو الحماية."), item("Product Displays", "عروض المنتجات", "Acrylic mounts and stands shaped around a specific product line.", "حوامل وقواعد أكريليك تُشكّل حول خط منتجات محدد."), item("Acrylic Signage", "لافتات أكريليك", "Cut and finished acrylic signage, illuminated or static.", "لافتات أكريليك مقطوعة ومشطبة، مضاءة أو ثابتة."), item("Custom Acrylic Structures", "هياكل أكريليك مخصصة", "One-off acrylic builds for non-standard display or branding needs.", "أعمال أكريليك خاصة لاحتياجات العرض أو الهوية غير القياسية.")]),
      category("CNC & Precision Cutting", "CNC والقطع الدقيق", [item("CNC Routing", "التفريز بتقنية CNC", "Automated precision routing for wood, acrylic and composite materials.", "تفريز آلي دقيق للخشب والأكريليك والمواد المركبة."), item("CNC Cutting", "القطع بتقنية CNC", "Repeatable, high-accuracy cutting across production runs of any size.", "قطع متكرر عالي الدقة لدفعات الإنتاج بأي حجم."), item("Laser Cutting", "القطع بالليزر", "Fine-detail cutting for signage, displays and decorative components.", "قطع دقيق التفاصيل للافتات والعروض والعناصر الزخرفية."), item("Custom Shapes & Components", "أشكال ومكونات مخصصة", "Non-standard shapes and parts cut to a specific technical drawing.", "أشكال وأجزاء غير قياسية تُقطع وفق رسم فني محدد.")]),
      category("Mixed-Material Fabrication", "التصنيع بمواد مختلطة", [item("Integrated Mixed-Material Builds", "تنفيذات متكاملة بمواد مختلطة", "Wood, metal, acrylic, print and lighting combined into a single structure when the brief calls for it.", "خشب ومعدن وأكريليك وطباعة وإضاءة تُدمج في هيكل واحد عندما يتطلب الموجز ذلك.")]),
    ] },
    why: { headline: t("Why brands choose CPS for custom fabrication", "لماذا تختار العلامات CPS للتصنيع المخصص"), support: t("Every major discipline sits under one roof.", "كل تخصص رئيسي موجود تحت سقف واحد."), items: [t("Multiple disciplines with no trade handoffs", "تخصصات متعددة بلا تسليم بين موردين"), t("CNC precision with in-house finishing", "دقة CNC مع تشطيب داخلي"), t("Built to technical drawing", "تنفيذ وفق الرسومات الفنية"), t("One-off and production-run capacity", "قدرة على القطع الفردية والإنتاج المتكرر")] },
    benefits: [t("Tighter quality control", "رقابة جودة أدق"), t("Faster in-house iteration", "تعديلات أسرع داخلياً"), t("Mixed materials without separate vendors", "مواد مختلطة بلا موردين منفصلين"), t("From prototype to full production", "من النموذج الأولي إلى الإنتاج الكامل")],
    industries: [industries.retail, industries.fmcg, industries.beauty, industries.realEstate, industries.hospitality, industries.technology],
    related: ["printing-signage", "exhibitions-booths", "fit-out-interiors"],
    faq: [faq("Can you fabricate from a 3D file or technical drawing?", "هل يمكن التصنيع من ملف ثلاثي الأبعاد أو رسم فني؟", "Yes — production runs from approved technical drawings, CAD or 3D files.", "نعم، يعتمد الإنتاج على الرسومات الفنية أو ملفات CAD أو الملفات ثلاثية الأبعاد المعتمدة."), faq("What materials can you combine in one build?", "ما المواد التي يمكن دمجها في تنفيذ واحد؟", "Wood, metal, acrylic, print and lighting can all be combined in a single mixed-material build.", "يمكن دمج الخشب والمعدن والأكريليك والطباعة والإضاءة في تنفيذ واحد متعدد المواد."), faq("Do you handle small production runs, not just one-offs?", "هل تنفذون دفعات إنتاج صغيرة إلى جانب القطع الفردية؟", "Yes, CNC and cutting capacity supports both prototypes and full production runs.", "نعم، تدعم قدرات CNC والقطع النماذج الأولية ودفعات الإنتاج الكاملة."), faq("Can you match an existing finish or colour?", "هل يمكن مطابقة تشطيب أو لون موجود؟", "Yes — powder coating and finishing are colour-matched to your brand or an existing sample.", "نعم، تُطابق ألوان الطلاء بالبودرة والتشطيبات علامتك أو عينة موجودة.")],
    closingNoun: t("fabrication project", "مشروع تصنيع"),
  },
  {
    slug: "printing-signage",
    image: media.services.branding,
    title: t("Printing & Signage", "الطباعة واللافتات"),
    excerpt: t("Large-format graphics, environmental branding and signage systems.", "رسومات كبيرة وهوية بيئية وأنظمة لافتات."),
    showcase: {
      title: t("Featured Print & Signage Products", "منتجات طباعة ولافتات مختارة"),
      items: [
        {
          title: t("Vinyl Printing", "طباعة الفينيل"),
          description: t("Durable vinyl prints for walls, floors, vehicles and large-format graphics.", "مطبوعات فينيل متينة للجدران والأرضيات والمركبات والرسومات كبيرة الحجم."),
        },
        {
          title: t("Illuminated Letters", "حروف مضيئة"),
          description: t("Halo- or face-lit dimensional letters for premium brand presence.", "حروف بارزة بإضاءة خلفية أو أمامية لحضور مميز للعلامة."),
        },
        {
          title: t("Roll-Up Banners", "بانرات رول أب"),
          description: t("Portable pull-up banners for quick setup at any event.", "بانرات رول أب محمولة وسريعة التركيب في أي فعالية."),
        },
        {
          title: t("Wall Graphics", "رسومات الجدران"),
          description: t("Large-format wall applications for offices, retail and exhibition interiors.", "رسومات كبيرة تُطبق على جدران المكاتب والمتاجر والمساحات الداخلية للمعارض."),
        },
        {
          title: t("Light Boxes", "صناديق الإضاءة"),
          description: t("Illuminated signage boxes for retail, corporate and exhibition use.", "صناديق لافتات مضاءة للاستخدام في المتاجر والشركات والمعارض."),
        },
      ],
    },
    hero: { headline: t("Branding that moves from screen to space.", "هوية تنتقل من الشاشة إلى المكان."), support: t("Print and signage production, coordinated with installation.", "إنتاج طباعة ولافتات منسق مع التركيب."), bullets: [t("Large-format and environmental graphics", "طباعة كبيرة ورسومات بيئية"), t("Indoor, outdoor and illuminated signage", "لافتات داخلية وخارجية ومضيئة"), t("Wayfinding and safety signage", "لافتات إرشاد وسلامة"), t("Digital signage structures", "هياكل لافتات رقمية")], catalogueCta: t("See All Print & Signage Products", "عرض كل منتجات الطباعة واللافتات") },
    catalogue: { title: t("All Print & Signage Products", "كل منتجات الطباعة واللافتات"), support: t("Every product CPS produces, from a single banner to full building signage.", "كل ما تنتجه CPS، من لافتة واحدة إلى هوية مبنى كاملة."), searchable: true, categories: [
      category("Large Format Printing", "الطباعة كبيرة الحجم", [item("Vinyl Printing", "طباعة الفينيل", "Durable vinyl prints for walls, floors, vehicles and large-format graphics.", "مطبوعات فينيل متينة للجدران والأرضيات والمركبات والرسومات كبيرة الحجم."), item("Fabric Printing", "طباعة الأقمشة", "Soft-signage fabric prints for backdrops, tension frames and stretch displays.", "طباعة على أقمشة اللافتات المرنة للخلفيات وإطارات الشد وعروض الأقمشة المشدودة."), item("Banner Printing", "طباعة البانرات", "Weather-ready banners for indoor and outdoor use.", "بانرات تتحمل الظروف الجوية للاستخدام الداخلي والخارجي."), item("Backdrop Printing", "طباعة الخلفيات", "Full-scale printed backdrops for stages, photo walls and booths.", "خلفيات مطبوعة بالحجم الكامل للمنصات وجدران التصوير والأجنحة."), item("Foam Boards", "ألواح الفوم", "Lightweight rigid boards for short-run signage and display graphics.", "ألواح صلبة خفيفة للافتات والرسومات المخصصة للعرض قصير المدى.")]),
      category("Environmental Graphics", "الرسومات البيئية", [item("Wall Graphics", "رسومات الجدران", "Large-format wall applications for offices, retail and exhibition interiors.", "رسومات كبيرة تُطبق على جدران المكاتب والمتاجر والمساحات الداخلية للمعارض."), item("Window Graphics", "رسومات النوافذ", "Vinyl window applications for branding, privacy or promotions.", "تطبيقات فينيل للنوافذ للهوية أو الخصوصية أو الترويج."), item("Interior Branding", "هوية المساحات الداخلية", "Coordinated graphic branding applied across an entire interior space.", "رسومات هوية منسقة تُطبق في أنحاء المساحة الداخلية بالكامل."), item("Applied Vinyl Graphics", "رسومات فينيل تطبيقية", "Cut and printed vinyl applied directly to surfaces and structures.", "فينيل مقطوع ومطبوع يُطبق مباشرةً على الأسطح والهياكل.")]),
      category("Event & Exhibition Graphics", "رسومات الفعاليات والمعارض", [item("Booth Graphics", "رسومات الأجنحة", "Printed graphics fitted to booth structures and panels.", "رسومات مطبوعة تُركب على هياكل الأجنحة وألواحها."), item("Exhibition Graphics", "رسومات المعارض", "Large-format graphics produced for exhibition halls and stands.", "رسومات كبيرة تُنتج لقاعات المعارض وأجنحتها."), item("Branded Panels", "ألواح تحمل الهوية", "Printed panels used as structural or decorative branding elements.", "ألواح مطبوعة تُستخدم كعناصر إنشائية أو زخرفية تحمل الهوية."), item("Event Branding Applications", "تطبيقات هوية الفعاليات", "Graphics applied across an event's structures, signage and touchpoints.", "رسومات تُطبق على هياكل الفعالية ولافتاتها ونقاط التفاعل فيها.")]),
      category("Promotional Printing", "الطباعة الترويجية", [item("Roll-Up Banners", "بانرات رول أب", "Portable pull-up banners for quick setup at any event.", "بانرات رول أب محمولة وسريعة التركيب في أي فعالية."), item("Flags", "الأعلام", "Branded feather and teardrop flags for outdoor visibility.", "أعلام تحمل الهوية بشكل الريشة أو الدمعة لتعزيز الظهور الخارجي."), item("Portable Branding", "هوية محمولة", "Lightweight, reusable branding pieces for repeat deployment.", "عناصر هوية خفيفة وقابلة لإعادة الاستخدام المتكرر.")]),
      category("Indoor Signage", "اللافتات الداخلية", [item("Reception Signs", "لافتات الاستقبال", "Branded signage for front-of-house and reception areas.", "لافتات تحمل الهوية لمناطق الواجهة والاستقبال."), item("Office Signs", "لافتات المكاتب", "Interior signage for meeting rooms, departments and general wayfinding.", "لافتات داخلية لغرف الاجتماعات والأقسام والإرشاد العام."), item("Room Identification", "تعريف الغرف", "Door and room-ID signage for offices and facilities.", "لافتات تعريف الأبواب والغرف في المكاتب والمنشآت."), item("Directory Signs", "لوحات الدليل", "Building directory signage for multi-tenant or multi-department sites.", "لافتات دليل المباني متعددة المستأجرين أو الأقسام.")]),
      category("Outdoor Signage", "اللافتات الخارجية", [item("Building Signs", "لافتات المباني", "Exterior signage sized and engineered for building façades.", "لافتات خارجية بمقاسات وهندسة تناسب واجهات المباني."), item("Entrance Signs", "لافتات المداخل", "Signage marking entrances, drop-offs and site access points.", "لافتات لتحديد المداخل ونقاط إنزال الركاب ومنافذ دخول الموقع."), item("Outdoor Branding", "هوية خارجية", "Weather-rated branding applications for external environments.", "تطبيقات هوية تتحمل الظروف الجوية للبيئات الخارجية."), item("Pylon Structures", "هياكل بايلون", "Freestanding pylon signage for roadside and site-entrance visibility.", "لافتات عمودية مستقلة للظهور على الطرق وعند مداخل المواقع.")]),
      category("Illuminated & 3D Signage", "اللافتات المضيئة وثلاثية الأبعاد", [item("Light Boxes", "صناديق الإضاءة", "Illuminated signage boxes for retail, corporate and exhibition use.", "صناديق لافتات مضاءة للاستخدام في المتاجر والشركات والمعارض."), item("Illuminated Letters", "حروف مضيئة", "Halo- or face-lit dimensional letters for premium brand presence.", "حروف بارزة بإضاءة خلفية أو أمامية لحضور مميز للعلامة."), item("3D Letters", "حروف ثلاثية الأبعاد", "Dimensional lettering, lit or unlit, for reception and façade branding.", "حروف مجسمة مضاءة أو غير مضاءة لهوية الاستقبال والواجهات."), item("Logo Signs", "لافتات الشعارات", "Custom-fabricated logo signage sized for interior or exterior placement.", "لافتات شعارات مصنعة خصيصاً بمقاسات تناسب المواضع الداخلية أو الخارجية.")]),
      category("Wayfinding Systems", "أنظمة الإرشاد", [item("Directional Signs", "لافتات اتجاهية", "Directional signage guiding movement through a site or venue.", "لافتات اتجاهية لتوجيه الحركة عبر الموقع أو مكان الفعالية."), item("Directory Systems", "أنظمة الدليل", "Structured directory signage for larger multi-zone sites.", "أنظمة لافتات دليل منظمة للمواقع الكبيرة متعددة المناطق."), item("Parking Signs", "لافتات المواقف", "Parking identification and directional signage.", "لافتات لتعريف المواقف وتوجيه الحركة."), item("Navigation Systems", "أنظمة الملاحة", "Coordinated wayfinding systems across a full facility.", "أنظمة إرشاد منسقة عبر المنشأة بالكامل.")]),
      category("Safety & Regulatory Signage", "لافتات السلامة والتنظيم", [item("Safety & Regulatory Signage", "لافتات السلامة والتنظيم", "Required safety identification and operational signage to code.", "لافتات التعريف بالسلامة والتشغيل المطلوبة وفق الأنظمة.")]),
      category("Digital Signage Structures", "هياكل اللافتات الرقمية", [item("Screen Enclosures", "حاويات الشاشات", "Enclosures built to house and protect digital display screens.", "حاويات مصممة لاحتواء شاشات العرض الرقمية وحمايتها."), item("Freestanding Digital Structures", "هياكل رقمية مستقلة", "Standalone structures designed around a digital display.", "هياكل مستقلة مصممة حول شاشة عرض رقمية."), item("Digital Display Support Structures", "هياكل دعم الشاشات الرقمية", "Mounting and support structures for fixed or mobile digital signage.", "هياكل تركيب ودعم للافتات الرقمية الثابتة أو المتحركة.")]),
    ] },
    why: { headline: t("Why brands choose CPS for print & signage", "لماذا تختار العلامات CPS للطباعة واللافتات"), support: t("Production and installation come from the same team.", "الإنتاج والتركيب من الفريق نفسه."), items: [t("One team from production to install", "فريق واحد من الإنتاج حتى التركيب"), t("In-house large-format printing", "طباعة كبيرة داخلية"), t("In-house illuminated and dimensional signage", "لافتات مضيئة وبارزة تصنع داخلياً"), t("Nationwide installation", "تركيب على مستوى المملكة")] },
    benefits: [t("Faster print-to-install turnaround", "تنفيذ أسرع من الطباعة للتركيب"), t("Consistent brand colour", "اتساق ألوان العلامة"), t("One quote for production and install", "عرض واحد للإنتاج والتركيب"), t("From one banner to a full building", "من بانر واحد إلى مبنى كامل")],
    industries: [industries.retail, industries.banking, industries.realEstate, industries.government, industries.hospitality, industries.technology],
    related: ["custom-fabrication", "exhibitions-booths", "installation-project-delivery"],
    faq: [faq("Can you match our brand's exact colours?", "هل يمكن مطابقة ألوان علامتنا بدقة؟", "Yes, colour-matching is part of production for both print and painted/powder-coated signage.", "نعم، مطابقة الألوان جزء من إنتاج المطبوعات واللافتات المطلية أو المعالجة بالبودرة."), faq("Do you install what you print, or is that separate?", "هل تركبون ما تطبعونه أم أن التركيب منفصل؟", "Installation is coordinated as part of the same project — see Installation & Project Delivery.", "يُنسق التركيب ضمن المشروع نفسه؛ راجع التركيب وتسليم المشاريع."), faq("What's the lead time for large-format signage?", "ما مدة تنفيذ اللافتات كبيرة الحجم؟", "Depends on size and finish — request a quote for a schedule specific to your job.", "تعتمد على الحجم والتشطيب؛ اطلب عرض سعر لجدول زمني يناسب عملك تحديداً."), faq("Can you produce outdoor-rated signage for façades?", "هل يمكن إنتاج لافتات واجهات تتحمل الظروف الخارجية؟", "Yes — see Building Signs and Outdoor Branding in the catalogue.", "نعم، راجع لافتات المباني والهوية الخارجية في الكتالوج.")],
    closingNoun: t("signage project", "مشروع لافتات"),
  },
  {
    slug: "rental-solutions",
    image: media.services.storage,
    title: t("Rental Solutions", "حلول التأجير"),
    excerpt: t("Reusable event, exhibition and display assets.", "أصول قابلة لإعادة الاستخدام للفعاليات والمعارض والعرض."),
    showcase: {
      title: t("Featured Rental Items", "عناصر تأجير مختارة"),
      items: [
        {
          title: t("Lounge Furniture", "أثاث الصالات"),
          description: t("Modular sofas and lounge seating for hospitality and VIP zones.", "أرائك معيارية وجلسات صالات لمناطق الضيافة وكبار الزوار."),
        },
        {
          title: t("Registration Counters", "كاونترات التسجيل"),
          description: t("Counters built for event check-in and registration flow.", "كاونترات مصممة لتسجيل الحضور وتنظيم حركة التسجيل في الفعاليات."),
        },
        {
          title: t("Display Units", "وحدات العرض"),
          description: t("Reusable display structures available for short-term deployment.", "هياكل عرض قابلة لإعادة الاستخدام ومتاحة للتشغيل قصير المدى."),
        },
        {
          title: t("Branded Props", "مجسمات تحمل الهوية"),
          description: t("Branded rental props for activations and photo moments.", "مجسمات تأجير تحمل الهوية للتفعيلات ولحظات التصوير."),
        },
      ],
    },
    hero: { headline: t("Flexible assets for events and exhibitions.", "أصول مرنة للفعاليات والمعارض."), support: t("Reusable furniture, counters and display assets.", "أثاث وكاونترات وأصول عرض قابلة لإعادة الاستخدام."), bullets: [t("Event furniture and lounge seating", "أثاث فعاليات وجلسات صالات"), t("Registration and reception counters", "كاونترات تسجيل واستقبال"), t("Reusable display units", "وحدات عرض قابلة لإعادة الاستخدام"), t("Décor and branded props", "ديكور ومجسمات تحمل الهوية")], catalogueCta: t("See All Rental Items", "عرض كل عناصر التأجير") },
    catalogue: { title: t("All Rental Items", "كل عناصر التأجير"), support: t("Everything available for short-term rental across furniture, counters, display and décor.", "كل المتاح للتأجير قصير المدى من الأثاث والكاونترات والعرض والديكور."), categories: [
      category("Event Furniture", "أثاث الفعاليات", [item("Lounge Furniture", "أثاث الصالات", "Modular sofas and lounge seating for hospitality and VIP zones.", "أرائك معيارية وجلسات صالات لمناطق الضيافة وكبار الزوار."), item("Tables", "طاولات", "Event and exhibition tables in a range of sizes and finishes.", "طاولات للفعاليات والمعارض بمقاسات وتشطيبات متنوعة."), item("Chairs", "كراسي", "Event seating for conferences, lounges and hospitality areas.", "مقاعد للفعاليات والمؤتمرات والصالات ومناطق الضيافة."), item("High Tables", "طاولات مرتفعة", "Standing-height tables for networking and reception areas.", "طاولات بارتفاع الوقوف لمناطق التواصل والاستقبال.")]),
      category("Counters", "الكاونترات", [item("Registration Counters", "كاونترات التسجيل", "Counters built for event check-in and registration flow.", "كاونترات مصممة لتسجيل الحضور وتنظيم حركة التسجيل في الفعاليات."), item("Reception Counters", "كاونترات الاستقبال", "Front-of-house counters for temporary or event reception.", "كاونترات واجهة لمناطق الاستقبال المؤقتة أو استقبال الفعاليات."), item("Promotional Counters", "كاونترات ترويجية", "Compact counters for sampling, sales or promotional staff.", "كاونترات مدمجة لتوزيع العينات أو المبيعات أو فرق الترويج.")]),
      category("Display Solutions", "حلول العرض", [item("Display Units", "وحدات العرض", "Reusable display structures available for short-term deployment.", "هياكل عرض قابلة لإعادة الاستخدام ومتاحة للتشغيل قصير المدى."), item("Product Displays", "عروض المنتجات", "Rental display units sized around specific product categories.", "وحدات عرض للتأجير بمقاسات تناسب فئات منتجات محددة.")]),
      category("Exhibition Accessories", "إكسسوارات المعارض", [item("Decorative Elements", "عناصر ديكور", "Rental décor pieces to finish out a stand or event space.", "قطع ديكور للتأجير تكمل الجناح أو مساحة الفعالية."), item("Decorative Structures", "هياكل ديكورية", "Larger rental structures used for décor or spatial definition.", "هياكل تأجير أكبر تُستخدم للديكور أو لتحديد المساحات."), item("Branded Props", "مجسمات تحمل الهوية", "Branded rental props for activations and photo moments.", "مجسمات تأجير تحمل الهوية للتفعيلات ولحظات التصوير."), item("Event Décor Elements", "عناصر ديكور الفعاليات", "General décor rental items for event styling.", "عناصر ديكور عامة للتأجير لتنسيق الفعاليات.")]),
    ] },
    why: { headline: t("Why brands choose CPS for rental", "لماذا تختار العلامات CPS للتأجير"), support: t("Owned inventory, not a subcontracted rental house.", "مخزون مملوك لنا وليس مؤجراً من طرف ثالث."), items: [t("Own, maintained inventory", "مخزون مملوك ومصان"), t("One team for delivery and collection", "فريق واحد للتوصيل والاستلام"), t("Consistent item condition", "حالة متسقة للعناصر"), t("Available alongside every CPS service", "متاح مع كل خدمات CPS")] },
    benefits: [t("One vendor for rental and custom builds", "مورد واحد للتأجير والتنفيذ المخصص"), t("Consistent quality", "جودة متسقة"), t("Flexible short-term terms", "مدد تأجير قصيرة ومرنة"), t("Coordinated delivery and collection", "توصيل واستلام منسقان")],
    industries: [industries.government, industries.banking, industries.fmcg, industries.hospitality, industries.sports, industries.realEstate],
    related: ["event-fabrication", "exhibitions-booths", "installation-project-delivery"],
    faq: [faq("How far in advance should we book rental items?", "قبل الفعالية بكم من الوقت ينبغي حجز عناصر التأجير؟", "Booking early secures availability, especially around peak exhibition season.", "الحجز المبكر يضمن التوفر، خصوصاً خلال ذروة موسم المعارض."), faq("Can rental furniture be branded for our event?", "هل يمكن إضافة هوية فعاليتنا إلى أثاث التأجير؟", "Yes — branded props and décor elements can be added to a rental package.", "نعم، يمكن إضافة مجسمات وعناصر ديكور تحمل الهوية إلى باقة التأجير."), faq("Do you deliver and collect, or is that separate?", "هل تتولون التوصيل والاستلام أم أنهما منفصلان؟", "Delivery, installation and collection are coordinated as part of the same booking.", "يُنسق التوصيل والتركيب والاستلام ضمن الحجز نفسه."), faq("Can we rent alongside a custom booth or stage build?", "هل يمكن التأجير مع تنفيذ جناح أو منصة مخصصة؟", "Yes, rental items are commonly booked alongside an Exhibitions & Booths or Event Fabrication project.", "نعم، تُحجز عناصر التأجير عادةً مع مشروع للمعارض والأجنحة أو لتصنيع وتجهيز الفعاليات.")],
    closingNoun: t("rental package", "باقة تأجير"),
  },
  {
    slug: "installation-project-delivery",
    image: media.services.installation,
    title: t("Installation & Project Delivery", "التركيب وتسليم المشاريع"),
    excerpt: t("Technical planning, logistics, installation, storage and maintenance.", "تخطيط فني ولوجستيات وتركيب وتخزين وصيانة."),
    showcase: {
      title: t("Featured Delivery Services", "خدمات تسليم مختارة"),
      items: [
        {
          title: t("Site Surveys & Technical Preparation", "معاينات الموقع والتجهيز الفني"),
          description: t("On-site assessment and technical drawings prepared before production begins.", "تقييم موقعي ورسومات فنية تُجهّز قبل بدء الإنتاج."),
        },
        {
          title: t("Nationwide Installation", "التركيب على مستوى المملكة"),
          description: t("Installation crews covering exhibitions, events, retail and signage across Saudi Arabia.", "فرق تركيب للمعارض والفعاليات والتجزئة واللافتات في أنحاء السعودية."),
        },
        {
          title: t("Transportation & Logistics", "النقل واللوجستيات"),
          description: t("Coordinated transport and site delivery timed to your installation window.", "نقل وتوصيل منسقان وفق نافذة التركيب المحددة."),
        },
        {
          title: t("Storage & Warehousing", "التخزين والمستودعات"),
          description: t("Storage for booth panels, structures and reusable assets between uses.", "تخزين ألواح الأجنحة والهياكل والأصول القابلة لإعادة الاستخدام بين مرات التشغيل."),
        },
        {
          title: t("Maintenance & Refurbishment", "الصيانة والتجديد"),
          description: t("Repair, rebranding and refurbishment for structures being redeployed.", "إصلاح وإعادة هوية وتجديد للهياكل المعدة لإعادة الاستخدام."),
        },
      ],
    },
    hero: { headline: t("Produced. Delivered. Installed.", "أُنتج ونُقل ورُكّب."), support: t("The delivery path from production floor to finished site.", "مسار التسليم من أرض الإنتاج إلى الموقع المكتمل."), bullets: [t("Site surveys and technical preparation", "معاينات الموقع والتجهيز الفني"), t("Nationwide installation crews", "فرق تركيب على مستوى المملكة"), t("Transportation, logistics and dismantling", "النقل واللوجستيات والتفكيك"), t("Storage, refurbishment and quality control", "التخزين والتجديد وضبط الجودة")], catalogueCta: t("See All Delivery Services", "عرض كل خدمات التسليم") },
    catalogue: { title: t("All Delivery Services", "كل خدمات التسليم"), support: t("Every service that gets a finished build from production floor to a working site.", "كل خدمة تنقل التنفيذ المكتمل من أرض الإنتاج إلى موقع يعمل بكفاءة."), categories: [
      category("Site Survey & Technical Preparation", "معاينة الموقع والتجهيز الفني", [item("Site Surveys", "معاينات الموقع", "On-site assessment before production begins, so the build fits the space and constraints.", "تقييم موقعي قبل بدء الإنتاج لضمان ملاءمة التنفيذ للمساحة وقيودها."), item("Technical Drawings", "الرسومات الفنية", "Detailed technical drawings prepared for approval and production.", "رسومات فنية تفصيلية تُجهّز للاعتماد والإنتاج."), item("Production Coordination", "تنسيق الإنتاج", "Coordination between design, production and site teams across the project timeline.", "تنسيق بين فرق التصميم والإنتاج والموقع طوال الجدول الزمني للمشروع."), item("Installation Planning", "تخطيط التركيب", "Scheduling and sequencing for a clean, on-time on-site build.", "جدولة وتسلسل لأعمال التركيب في الموقع بصورة منظمة وفي الموعد.")]),
      category("Nationwide Installation", "التركيب على مستوى المملكة", [item("Exhibition Installation", "تركيب المعارض", "On-site installation crews for exhibition stands nationwide.", "فرق تركيب موقعي لأجنحة المعارض في أنحاء المملكة."), item("Event Installation", "تركيب الفعاليات", "Installation coverage for event structures and branded environments.", "تركيب لهياكل الفعاليات والبيئات التي تحمل الهوية."), item("Retail Installation", "تركيب التجزئة", "Fit-out and display installation across retail locations.", "تركيب التجهيزات الداخلية ووحدات العرض عبر مواقع التجزئة."), item("Signage Installation", "تركيب اللافتات", "Professional installation for indoor and outdoor signage.", "تركيب احترافي للافتات الداخلية والخارجية.")]),
      category("Transportation & Logistics", "النقل واللوجستيات", [item("Project Transportation", "نقل المشروع", "Coordinated transport of production output to site.", "نقل منسق لمخرجات الإنتاج إلى الموقع."), item("Site Delivery", "التوصيل للموقع", "Scheduled delivery timed to the installation window.", "توصيل مجدول وفق نافذة التركيب."), item("Material Handling", "مناولة المواد", "On-site handling of materials, structures and equipment.", "مناولة المواد والهياكل والمعدات داخل الموقع.")]),
      category("Dismantling", "التفكيك", [item("Event Dismantling", "تفكيك الفعاليات", "Post-event teardown and site clearance.", "تفكيك وإخلاء الموقع بعد انتهاء الفعالية."), item("Exhibition Dismantling", "تفكيك المعارض", "Stand dismantling coordinated with hall move-out schedules.", "تفكيك الأجنحة بالتنسيق مع جداول إخلاء قاعات المعرض."), item("Asset Collection", "استلام الأصول", "Collection of reusable assets after teardown.", "استلام الأصول القابلة لإعادة الاستخدام بعد التفكيك.")]),
      category("Storage & Warehousing", "التخزين والمستودعات", [item("Asset Storage", "تخزين الأصول", "Storage for booth panels, structures and reusable assets between uses.", "تخزين ألواح الأجنحة والهياكل والأصول القابلة لإعادة الاستخدام بين مرات التشغيل."), item("Exhibition Storage", "تخزين أصول المعارض", "Dedicated storage for exhibition-specific assets.", "تخزين مخصص للأصول المستخدمة في المعارض."), item("Event Asset Storage", "تخزين أصول الفعاليات", "Storage coordination for event furniture, décor and structures.", "تنسيق تخزين أثاث الفعاليات وديكورها وهياكلها.")]),
      category("Maintenance & Refurbishment", "الصيانة والتجديد", [item("Repair", "الإصلاح", "Repair service for damaged panels, structures or fixtures.", "خدمة إصلاح الألواح أو الهياكل أو التجهيزات التالفة."), item("Rebranding", "إعادة الهوية", "Updating an existing structure with new branding rather than rebuilding.", "تحديث هيكل قائم بهوية جديدة بدلاً من إعادة بنائه."), item("Refurbishment", "التجديد", "Refresh and repair for structures being redeployed.", "تجديد وإصلاح الهياكل المعدة لإعادة الاستخدام."), item("Reuse & Redeployment", "إعادة الاستخدام والنشر", "Preparing existing assets for a new project or location.", "تجهيز الأصول القائمة لمشروع أو موقع جديد.")]),
      category("Project Management & Quality Control", "إدارة المشروع وضبط الجودة", [item("Production Management", "إدارة الإنتاج", "End-to-end management of the production process.", "إدارة عملية الإنتاج من البداية إلى النهاية."), item("Installation Supervision", "الإشراف على التركيب", "On-site supervision through the installation window.", "إشراف موقعي طوال نافذة التركيب."), item("Quality Control", "ضبط الجودة", "Quality checks at production and installation stages.", "فحوص جودة في مرحلتي الإنتاج والتركيب."), item("Handover & Snagging", "التسليم ومعالجة الملاحظات", "Final walkthrough and issue resolution before handover.", "معاينة نهائية وحل الملاحظات قبل التسليم.")]),
    ] },
    why: { headline: t("Why brands choose CPS for delivery", "لماذا تختار العلامات CPS للتسليم"), support: t("Nationwide crews, not subcontracted labour.", "فرق وطنية وليست عمالة من الباطن."), items: [t("Nationwide in-house crews", "فرق داخلية على مستوى المملكة"), t("Site surveys reduce surprises", "المعاينات تقلل مفاجآت الموقع"), t("Storage and redeployment options", "خيارات تخزين وإعادة استخدام"), t("Quality control through handover", "ضبط جودة حتى التسليم")] },
    benefits: [t("One team through handover", "فريق واحد حتى التسليم"), t("Less vendor miscommunication", "أخطاء تنسيق أقل بين الموردين"), t("Storage between uses", "تخزين بين مرات الاستخدام"), t("Maintenance extends asset life", "الصيانة تطيل عمر الأصول")],
    industries: [industries.government, industries.retail, industries.banking, industries.fmcg, industries.hospitality, industries.healthcare],
    related: ["exhibitions-booths", "event-fabrication", "rental-solutions"],
    faq: [faq("Can you install a structure another company fabricated?", "هل يمكن تركيب هيكل صنعته شركة أخرى؟", "This is assessed case by case — get in touch with the structure's specs.", "نقيّم ذلك لكل حالة؛ تواصل معنا بمواصفات الهيكل."), faq("Do you offer storage between events?", "هل توفرون التخزين بين الفعاليات؟", "Yes — see Asset Storage and Exhibition Storage in the catalogue.", "نعم، راجع تخزين الأصول وتخزين أصول المعارض في الكتالوج."), faq("What happens if something needs repair after installation?", "ماذا يحدث إذا احتاج عنصر إلى إصلاح بعد التركيب؟", "Repair and refurbishment are available — see Maintenance & Refurbishment.", "تتوفر خدمات الإصلاح والتجديد؛ راجع الصيانة والتجديد."), faq("Can you handle multi-city rollouts?", "هل يمكن تنفيذ مشاريع موزعة على عدة مدن؟", "Yes, installation crews and logistics are coordinated nationwide.", "نعم، تُنسق فرق التركيب واللوجستيات على مستوى المملكة.")],
    closingNoun: t("installation", "تركيب"),
  },
];

export function localizeText(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export function getServiceArchitecture(slug: string) {
  return serviceArchitecture.find((service) => service.slug === slug);
}

export function servicePath(slug: string) {
  return `/services/${slug}`;
}

export function cataloguePath(slug: string) {
  return `/services/${slug}/catalogue`;
}
