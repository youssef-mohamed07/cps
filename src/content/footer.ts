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
  boothTypesTitle: string;
  showBoothTypes: boolean;
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
  locationsTitle: string;
  locations: FooterLink[];
};

function footerEn(): FooterConfig {
  return {
    logo: "/logo.png",
    logoAlt: "CPS — Creatives Professionals",
    description: "Exhibition booth design, fabrication, and install — end to end.",
    certifications: [],
    qualityBadges: [],
    cta: { label: "Request a Quote", href: "/contact" },
    servicesTitle: "Services",
    showServices: true,
    boothTypesTitle: "Booth Types",
    showBoothTypes: true,
    companyLinksTitle: "Menu",
    companyLinks: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Industries", href: "/industries" },
      { label: "Locations", href: "/locations" },
      { label: "Insights", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
    contactTitle: "Contact",
    officeAddress: "Riyadh, Saudi Arabia",
    phoneDisplay: "+966 50 000 0000",
    phoneHref: "+966500000000",
    email: "hello@cps.com",
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
      mailto: "hello@cps.com",
    },
    trust: {
      enabled: false,
      items: [
        { label: "Custom Booth Design" },
        { label: "Manufacturing" },
        { label: "Installation" },
        { label: "Worldwide Support" },
      ],
    },
    rights: "All rights reserved.",
    bottomLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
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
  };
}

function footerAr(): FooterConfig {
  return {
    logo: "/logo.png",
    logoAlt: "CPS — المبدعون المحترفون",
    description: "تصميم وتصنيع وتركيب أجنحة المعارض — من البداية للنهاية.",
    certifications: [],
    qualityBadges: [],
    cta: { label: "اطلب عرض سعر", href: "/contact" },
    servicesTitle: "الخدمات",
    showServices: true,
    boothTypesTitle: "أنواع الأجنحة",
    showBoothTypes: true,
    companyLinksTitle: "القائمة",
    companyLinks: [
      { label: "من نحن", href: "/about" },
      { label: "أعمالنا", href: "/work" },
      { label: "القطاعات", href: "/industries" },
      { label: "المواقع", href: "/locations" },
      { label: "رؤى", href: "/news" },
      { label: "تواصل", href: "/contact" },
    ],
    contactTitle: "تواصل",
    officeAddress: "الرياض، السعودية",
    phoneDisplay: "+966 50 000 0000",
    phoneHref: "+966500000000",
    email: "hello@cps.com",
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
      mailto: "hello@cps.com",
    },
    trust: {
      enabled: false,
      items: [
        { label: "تصميم أجنحة مخصص" },
        { label: "تصنيع" },
        { label: "تركيب" },
        { label: "دعم عالمي" },
      ],
    },
    rights: "جميع الحقوق محفوظة.",
    bottomLinks: [
      { label: "الخصوصية", href: "/privacy" },
      { label: "الشروط", href: "/terms" },
      { label: "ملفات الارتباط", href: "/cookies" },
    ],
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
  };
}

export function getFooterLocal(locale: Locale): FooterConfig {
  return locale === "ar" ? footerAr() : footerEn();
}
