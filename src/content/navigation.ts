import { media } from "@/content/media";
import type { Locale } from "@/lib/i18n";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  image?: string;
  imageAlt?: string;
};

export type NavColumn = {
  title?: string;
  links: NavLink[];
};

export type NavFeatured = {
  enabled: boolean;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
};

export type NavMega = {
  enabled: boolean;
  layout: "services" | "boothTypes" | "columns";
  title: string;
  description: string;
  columns: NavColumn[];
  featured?: NavFeatured;
  cta?: { label: string; href: string };
};

export type NavPrimaryItem = {
  enabled: boolean;
  label: string;
  href: string;
  kind: "link" | "mega" | "dropdown";
  mega?: NavMega;
  dropdown?: NavLink[];
};

export type NavigationConfig = {
  items: NavPrimaryItem[];
  footer: NavLink[];
  cta: { label: string; href: string };
  langLabel: string;
  langHrefLocale: Locale;
};

const servicesLinksEn: NavLink[] = [
  {
    label: "Full Booth Management",
    href: "/services/full-booth-management",
    description: "One team from brief to teardown",
    image: media.services.management,
    imageAlt: "Booth installation coordination",
  },
  {
    label: "Booth Design",
    href: "/services/booth-design",
    description: "Concept, layout, and brand story",
    image: media.services.design,
    imageAlt: "Booth design studio work",
  },
  {
    label: "Custom Fabrication",
    href: "/services/custom-fabrication",
    description: "Precision build in our workshop",
    image: media.services.fabrication,
    imageAlt: "Custom booth fabrication",
  },
  {
    label: "Installation & Dismantling",
    href: "/services/installation-dismantling",
    description: "On-site build and strike",
    image: media.services.installation,
    imageAlt: "Exhibition booth installation",
  },
  {
    label: "Storage & Reinstallation",
    href: "/services/storage-reinstallation",
    description: "Reuse across multiple shows",
    image: media.services.storage,
    imageAlt: "Booth storage warehouse",
  },
  {
    label: "Visual Branding & Print",
    href: "/services/visual-branding-print",
    description: "Graphics that hold the floor",
    image: media.services.branding,
    imageAlt: "Large-format exhibition graphics",
  },
  {
    label: "Lightbox & Retail Display",
    href: "/services/lightbox-retail-display",
    description: "Illuminated premium presence",
    image: media.services.lightbox,
    imageAlt: "Lightbox retail display",
  },
];

const servicesLinksAr: NavLink[] = [
  {
    label: "إدارة الجناح الكاملة",
    href: "/services/full-booth-management",
    description: "فريق واحد من الموجز إلى التفكيك",
    image: media.services.management,
    imageAlt: "تنسيق تركيب الجناح",
  },
  {
    label: "تصميم الأجنحة",
    href: "/services/booth-design",
    description: "مفهوم وتخطيط وقصة العلامة",
    image: media.services.design,
    imageAlt: "عمل استوديو تصميم الأجنحة",
  },
  {
    label: "تصنيع وتفصيل مخصص",
    href: "/services/custom-fabrication",
    description: "بناء دقيق في ورشتنا",
    image: media.services.fabrication,
    imageAlt: "تصنيع جناح مخصص",
  },
  {
    label: "التركيب والتفكيك",
    href: "/services/installation-dismantling",
    description: "بناء وإزالة في الموقع",
    image: media.services.installation,
    imageAlt: "تركيب جناح المعرض",
  },
  {
    label: "التخزين وإعادة التركيب",
    href: "/services/storage-reinstallation",
    description: "إعادة استخدام عبر معارض متعددة",
    image: media.services.storage,
    imageAlt: "مستودع تخزين الأجنحة",
  },
  {
    label: "الهوية البصرية والطباعة",
    href: "/services/visual-branding-print",
    description: "رسومات تثبت حضورك",
    image: media.services.branding,
    imageAlt: "رسومات معارض كبيرة",
  },
  {
    label: "لافتات Lightbox والعرض",
    href: "/services/lightbox-retail-display",
    description: "حضور مضيء فاخر",
    image: media.services.lightbox,
    imageAlt: "عرض Lightbox للتجزئة",
  },
];

const boothLinksEn: NavLink[] = [
  {
    label: "Custom Exhibition Booths",
    href: "/booth-types/custom",
    description: "Bespoke architecture",
    image: media.boothTypes.custom,
    imageAlt: "Custom exhibition booth",
  },
  {
    label: "Modular / System Booths",
    href: "/booth-types/modular",
    description: "Flexible system builds",
    image: media.boothTypes.modular,
    imageAlt: "Modular system booth",
  },
  {
    label: "Double-Deck Booths",
    href: "/booth-types/double-deck",
    description: "Two-level presence",
    image: media.boothTypes.doubleDeck,
    imageAlt: "Double-deck exhibition booth",
  },
  {
    label: "Portable & Pop-Up",
    href: "/booth-types/portable",
    description: "Fast deploy displays",
    image: media.boothTypes.portable,
    imageAlt: "Portable pop-up display",
  },
  {
    label: "Exhibition Kiosks",
    href: "/booth-types/kiosks",
    description: "Compact brand points",
    image: media.boothTypes.kiosk,
    imageAlt: "Exhibition kiosk",
  },
  {
    label: "Outdoor Activations",
    href: "/booth-types/outdoor",
    description: "Structures beyond the hall",
    image: media.boothTypes.outdoor,
    imageAlt: "Outdoor brand activation",
  },
  {
    label: "National Pavilions",
    href: "/booth-types/pavilions",
    description: "Country-scale presence",
    image: media.boothTypes.pavilion,
    imageAlt: "National pavilion",
  },
  {
    label: "Sustainable / Eco",
    href: "/booth-types/sustainable",
    description: "Lower-impact materials",
    image: media.boothTypes.sustainable,
    imageAlt: "Sustainable eco booth",
  },
];

const boothLinksAr: NavLink[] = [
  {
    label: "أجنحة معارض مخصصة",
    href: "/booth-types/custom",
    description: "عمارة حسب الطلب",
    image: media.boothTypes.custom,
    imageAlt: "جناح معرض مخصص",
  },
  {
    label: "أجنحة معيارية / نظام",
    href: "/booth-types/modular",
    description: "بناء نظام مرن",
    image: media.boothTypes.modular,
    imageAlt: "جناح نظام معياري",
  },
  {
    label: "أجنحة طابقين",
    href: "/booth-types/double-deck",
    description: "حضور بمستويين",
    image: media.boothTypes.doubleDeck,
    imageAlt: "جناح طابقين",
  },
  {
    label: "عروض محمولة و Pop-Up",
    href: "/booth-types/portable",
    description: "تركيب سريع",
    image: media.boothTypes.portable,
    imageAlt: "عرض محمول",
  },
  {
    label: "أكشاك المعارض",
    href: "/booth-types/kiosks",
    description: "نقاط علامة مدمجة",
    image: media.boothTypes.kiosk,
    imageAlt: "كشك معرض",
  },
  {
    label: "تفعيلات خارجية",
    href: "/booth-types/outdoor",
    description: "هياكل خارج القاعة",
    image: media.boothTypes.outdoor,
    imageAlt: "تفعيل علامة خارجي",
  },
  {
    label: "أجنحة وطنية",
    href: "/booth-types/pavilions",
    description: "حضور على مستوى الدولة",
    image: media.boothTypes.pavilion,
    imageAlt: "جناح وطني",
  },
  {
    label: "أجنحة مستدامة",
    href: "/booth-types/sustainable",
    description: "مواد أقل أثراً",
    image: media.boothTypes.sustainable,
    imageAlt: "جناح مستدام",
  },
];

function navigationEn(): NavigationConfig {
  return {
    langLabel: "العربية",
    langHrefLocale: "ar",
    cta: { label: "Request a Quote", href: "/contact" },
    footer: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
    items: [
      { enabled: true, label: "About", href: "/about", kind: "link" },
      {
        enabled: true,
        label: "Services",
        href: "/services",
        kind: "mega",
        mega: {
          enabled: true,
          layout: "services",
          title: "Our Services",
          description: "Complete exhibition stand solutions from concept to execution.",
          columns: [
            {
              title: "Creative",
              links: [
                servicesLinksEn[1],
                servicesLinksEn[5],
                servicesLinksEn[6],
              ],
            },
            {
              title: "Production & Delivery",
              links: [
                servicesLinksEn[2],
                servicesLinksEn[3],
                servicesLinksEn[4],
              ],
            },
          ],
          featured: {
            enabled: true,
            title: "Full Booth Management",
            description: "End-to-end ownership from brief to teardown — one accountable team.",
            href: "/services/full-booth-management",
            ctaLabel: "View Service",
            image: media.services.management,
            imageAlt: "Booth installation coordination on the show floor",
          },
          cta: { label: "View All Services", href: "/services" },
        },
      },
      {
        enabled: true,
        label: "Booth Types",
        href: "/booth-types",
        kind: "mega",
        mega: {
          enabled: true,
          layout: "boothTypes",
          title: "Booth Types",
          description: "From compact kiosks to national pavilions — built for your footprint.",
          columns: [{ links: boothLinksEn }],
          featured: {
            enabled: true,
            title: "Custom Exhibition Booths",
            description: "Bespoke architecture shaped around your brand story and floor plan.",
            href: "/booth-types/custom",
            ctaLabel: "View Booth Type",
            image: media.boothTypes.custom,
            imageAlt: "Premium custom exhibition booth",
          },
          cta: { label: "View All Booth Types", href: "/booth-types" },
        },
      },
      { enabled: true, label: "Work", href: "/work", kind: "link" },
      { enabled: true, label: "Insights", href: "/news", kind: "link" },
      { enabled: true, label: "Contact", href: "/contact", kind: "link" },
    ],
  };
}

function navigationAr(): NavigationConfig {
  return {
    langLabel: "English",
    langHrefLocale: "en",
    cta: { label: "اطلب عرض سعر", href: "/contact" },
    footer: [
      { label: "من نحن", href: "/about" },
      { label: "خدماتنا", href: "/services" },
      { label: "أعمالنا", href: "/work" },
      { label: "تواصل", href: "/contact" },
    ],
    items: [
      { enabled: true, label: "من نحن", href: "/about", kind: "link" },
      {
        enabled: true,
        label: "خدماتنا",
        href: "/services",
        kind: "mega",
        mega: {
          enabled: true,
          layout: "services",
          title: "خدماتنا",
          description: "حلول أجنحة معارض متكاملة من المفهوم إلى التنفيذ.",
          columns: [
            {
              title: "الإبداع",
              links: [
                servicesLinksAr[1],
                servicesLinksAr[5],
                servicesLinksAr[6],
              ],
            },
            {
              title: "الإنتاج والتسليم",
              links: [
                servicesLinksAr[2],
                servicesLinksAr[3],
                servicesLinksAr[4],
              ],
            },
          ],
          featured: {
            enabled: true,
            title: "إدارة الجناح الكاملة",
            description: "ملكية كاملة من الموجز إلى التفكيك — فريق واحد مسؤول.",
            href: "/services/full-booth-management",
            ctaLabel: "عرض الخدمة",
            image: media.services.management,
            imageAlt: "تنسيق تركيب الجناح في قاعة المعرض",
          },
          cta: { label: "عرض كل الخدمات", href: "/services" },
        },
      },
      {
        enabled: true,
        label: "أنواع الأجنحة",
        href: "/booth-types",
        kind: "mega",
        mega: {
          enabled: true,
          layout: "boothTypes",
          title: "أنواع الأجنحة",
          description: "من الأكشاك المدمجة إلى الأجنحة الوطنية — حسب مساحتك.",
          columns: [{ links: boothLinksAr }],
          featured: {
            enabled: true,
            title: "أجنحة معارض مخصصة",
            description: "عمارة مخصصة حول قصة علامتك ومخطط الأرضية.",
            href: "/booth-types/custom",
            ctaLabel: "عرض نوع الجناح",
            image: media.boothTypes.custom,
            imageAlt: "جناح معرض مخصص فاخر",
          },
          cta: { label: "عرض كل أنواع الأجنحة", href: "/booth-types" },
        },
      },
      { enabled: true, label: "أعمالنا", href: "/work", kind: "link" },
      { enabled: true, label: "رؤى", href: "/news", kind: "link" },
      { enabled: true, label: "تواصل", href: "/contact", kind: "link" },
    ],
  };
}

export function getNavigationLocal(locale: Locale): NavigationConfig {
  return locale === "ar" ? navigationAr() : navigationEn();
}
