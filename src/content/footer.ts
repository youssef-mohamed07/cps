import type { Locale } from "@/lib/i18n";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterBadge = {
  label: string;
  image?: string;
  imageAlt?: string;
};

export type FooterSocial = {
  platform: string;
  url: string;
  label?: string;
};

export type FooterConfig = {
  logo: string;
  logoAlt: string;
  description: string;
  certifications: FooterBadge[];
  qualityBadges: FooterBadge[];
  cta: { label: string; href: string };
  servicesTitle: string;
  showServices: boolean;
  workTitle: string;
  showWork: boolean;
  companyLinksTitle: string;
  companyLinks: FooterLink[];
  contactTitle: string;
  officeAddress: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  whatsappLabel: string;
  businessHours: string;
  mapsLabel: string;
  mapsUrl: string;
  socialLinks: FooterSocial[];
  newsletter: {
    enabled: boolean;
    headline: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
    mailto?: string;
  };
  trust: {
    enabled: boolean;
    items: { label: string }[];
  };
  rights: string;
  bottomLinks: FooterLink[];
  createdBy?: string;
};

function footerEn(): FooterConfig {
  return {
    logo: "/logo.png",
    logoAlt: "CPS — Creatives Professionals",
    description: "Exhibitions. Events. Interiors. Displays. Built under one roof.",
    certifications: [],
    qualityBadges: [],
    cta: { label: "Start a Project", href: "/contact" },
    servicesTitle: "Services",
    showServices: true,
    workTitle: "Work",
    showWork: true,
    companyLinksTitle: "Company",
    companyLinks: [
      { label: "About CPS", href: "/about" },
      { label: "Production Capabilities", href: "/production-capabilities" },
      { label: "Insights", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
    contactTitle: "Get in Touch",
    officeAddress: "Riyadh, Saudi Arabia",
    phoneDisplay: "+966 56 084 6520",
    phoneHref: "+966560846520",
    email: "inquiry@creativeprofessionals.com",
    whatsappLabel: "WhatsApp",
    businessHours: "Sun–Thu, 9:00–18:00 AST",
    mapsLabel: "Open in Google Maps",
    mapsUrl: "https://maps.google.com/?q=Riyadh",
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/", label: "LinkedIn" },
      { platform: "instagram", url: "https://www.instagram.com/", label: "Instagram" },
      { platform: "x", url: "https://x.com/", label: "X" },
    ],
    newsletter: {
      enabled: false,
      headline: "Exhibition insights, delivered.",
      description: "Occasional notes on booth strategy, production, and show-floor craft.",
      placeholder: "Work email",
      buttonLabel: "Subscribe",
      mailto: "inquiry@creativeprofessionals.com",
    },
    trust: {
      enabled: true,
      items: [
        { label: "Design" },
        { label: "Fabrication" },
        { label: "Installation" },
        { label: "Storage" },
      ],
    },
    rights: "All rights reserved.",
    bottomLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  };
}

function footerAr(): FooterConfig {
  return {
    logo: "/logo.png",
    logoAlt: "CPS — المبدعون المحترفون",
    description: "معارض. فعاليات. مساحات داخلية. عروض. كلها تحت سقف واحد.",
    certifications: [],
    qualityBadges: [],
    cta: { label: "ابدأ مشروعاً", href: "/contact" },
    servicesTitle: "الخدمات",
    showServices: true,
    workTitle: "الأعمال",
    showWork: true,
    companyLinksTitle: "الشركة",
    companyLinks: [
      { label: "عن CPS", href: "/about" },
      { label: "قدرات الإنتاج", href: "/production-capabilities" },
      { label: "رؤى", href: "/news" },
      { label: "تواصل", href: "/contact" },
    ],
    contactTitle: "تواصل معنا",
    officeAddress: "الرياض، السعودية",
    phoneDisplay: "+966 56 084 6520",
    phoneHref: "+966560846520",
    email: "inquiry@creativeprofessionals.com",
    whatsappLabel: "واتساب",
    businessHours: "الأحد–الخميس، 9:00–18:00",
    mapsLabel: "افتح في خرائط Google",
    mapsUrl: "https://maps.google.com/?q=Riyadh",
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/", label: "LinkedIn" },
      { platform: "instagram", url: "https://www.instagram.com/", label: "Instagram" },
      { platform: "x", url: "https://x.com/", label: "X" },
    ],
    newsletter: {
      enabled: false,
      headline: "رؤى المعارض — إلى بريدك.",
      description: "ملاحظات بين الحين والآخر حول استراتيجية الأجنحة والإنتاج وحِرفة أرض المعرض.",
      placeholder: "البريد المهني",
      buttonLabel: "اشترك",
      mailto: "inquiry@creativeprofessionals.com",
    },
    trust: {
      enabled: true,
      items: [
        { label: "تصميم" },
        { label: "تصنيع" },
        { label: "تركيب" },
        { label: "تخزين" },
      ],
    },
    rights: "جميع الحقوق محفوظة.",
    bottomLinks: [
      { label: "الخصوصية", href: "/privacy" },
      { label: "الشروط", href: "/terms" },
      { label: "ملفات الارتباط", href: "/cookies" },
    ],
  };
}

export function getFooterLocal(locale: Locale): FooterConfig {
  return locale === "ar" ? footerAr() : footerEn();
}
