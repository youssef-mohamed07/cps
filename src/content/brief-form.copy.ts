import type { Locale } from "@/lib/i18n";

export type BriefFormOption = { value: string; label: string };

export type BriefFormCopy = {
  eyebrow: string;
  title: string;
  support: string;
  steps: { title: string; description: string }[];
  labels: Record<string, string>;
  placeholders: Record<string, string>;
  options: {
    userTypes: BriefFormOption[];
    preferredContact: BriefFormOption[];
    industries: BriefFormOption[];
    companySizes: BriefFormOption[];
    boothTypes: BriefFormOption[];
    services: BriefFormOption[];
    hasExistingDesign: BriefFormOption[];
    budgetRanges: BriefFormOption[];
    timelines: BriefFormOption[];
    heardFrom: BriefFormOption[];
  };
  actions: {
    next: string;
    back: string;
    submit: string;
    submitting: string;
  };
  consent: string;
  updatesOptIn: string;
  success: {
    title: string;
    message: string;
    cta: string;
  };
  errors: {
    required: string;
    email: string;
    submit: string;
  };
  reviewTitle: string;
};

const en: BriefFormCopy = {
  eyebrow: "Project brief",
  title: "Tell us about your project",
  support:
    "Four quick steps — booths, events, fit-outs, displays, fabrication, print or delivery. We use this to scope the work accurately.",
  steps: [
    {
      title: "Contact details",
      description: "Who we should reach and how you prefer to be contacted.",
    },
    {
      title: "Company details",
      description: "Organization context that helps us scope the project correctly.",
    },
    {
      title: "Project details",
      description: "What you're building, where, and which CPS services you need.",
    },
    {
      title: "Budget & notes",
      description: "Timeline, budget range, and anything else we should know.",
    },
  ],
  labels: {
    userType: "I am a",
    fullName: "Full name",
    jobTitle: "Job title / role",
    email: "Work email",
    phone: "Phone / WhatsApp",
    preferredContact: "Preferred contact",
    companyName: "Company / organization",
    website: "Website",
    industry: "Industry",
    companySize: "Team size",
    country: "Country",
    city: "City",
    eventName: "Project or exhibition name",
    eventLocation: "Location / venue / city",
    eventDate: "Target date or window",
    boothSize: "Size / footprint (optional)",
    boothType: "Project type",
    services: "Services needed",
    hasExistingDesign: "Existing design or drawings?",
    budgetRange: "Estimated budget (SAR)",
    timeline: "When do you need it ready?",
    description: "Project goals & notes",
    referenceUrl: "Reference link (optional)",
    heardFrom: "How did you hear about CPS?",
  },
  placeholders: {
    fullName: "Your name",
    jobTitle: "Marketing Director, Procurement…",
    email: "name@company.com",
    phone: "+966 …",
    companyName: "Legal or trading name",
    website: "https://",
    country: "Saudi Arabia",
    city: "Riyadh",
    eventName: "GITEX, LEAP, showroom fit-out, retail rollout…",
    eventLocation: "Riyadh Front, DWTC, mall / office address…",
    eventDate: "March 2026 or 12–15 Apr 2026",
    boothSize: "36 sqm / 6×6 m / store count…",
    description:
      "Brand goals, must-haves, locations, materials, AV needs, delivery constraints…",
    referenceUrl: "Past project, moodboard, RFP link…",
  },
  options: {
    userTypes: [
      { value: "company", label: "Brand / company" },
      { value: "agency", label: "Agency / partner" },
      { value: "individual", label: "Individual / freelancer" },
      { value: "government", label: "Government entity" },
      { value: "association", label: "Association / NGO" },
      { value: "other", label: "Other" },
    ],
    preferredContact: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone call" },
      { value: "whatsapp", label: "WhatsApp" },
    ],
    industries: [
      { value: "technology", label: "Technology" },
      { value: "healthcare", label: "Healthcare & pharma" },
      { value: "energy", label: "Energy & industrial" },
      { value: "retail", label: "Retail & FMCG" },
      { value: "finance", label: "Finance" },
      { value: "government", label: "Government" },
      { value: "education", label: "Education" },
      { value: "hospitality", label: "Hospitality & F&B" },
      { value: "other", label: "Other" },
    ],
    companySizes: [
      { value: "1-10", label: "1–10" },
      { value: "11-50", label: "11–50" },
      { value: "51-200", label: "51–200" },
      { value: "201-1000", label: "201–1,000" },
      { value: "1000+", label: "1,000+" },
    ],
    boothTypes: [
      { value: "custom", label: "Exhibition booth" },
      { value: "modular", label: "Event structure / stage" },
      { value: "double-deck", label: "Fit-out / interior" },
      { value: "kiosk", label: "Retail display / kiosk" },
      { value: "pavilion", label: "Custom fabrication" },
      { value: "portable", label: "Print & signage" },
      { value: "unsure", label: "Rental / delivery / not sure yet" },
    ],
    services: [
      { value: "exhibitions-booths", label: "Exhibitions & Booths" },
      { value: "event-fabrication", label: "Event Fabrication" },
      { value: "fit-out-interiors", label: "Fit-Out & Interiors" },
      { value: "retail-displays", label: "Retail Displays" },
      { value: "custom-fabrication", label: "Custom Fabrication" },
      { value: "printing-signage", label: "Printing & Signage" },
      { value: "rental-solutions", label: "Rental Solutions" },
      { value: "installation-project-delivery", label: "Installation & Project Delivery" },
    ],
    hasExistingDesign: [
      { value: "yes", label: "Yes — we have drawings" },
      { value: "no", label: "No — need CPS to design" },
      { value: "unsure", label: "Not sure yet" },
    ],
    budgetRanges: [
      { value: "under-100k", label: "Under SAR 100k" },
      { value: "100k-250k", label: "SAR 100k – 250k" },
      { value: "250k-500k", label: "SAR 250k – 500k" },
      { value: "500k-1m", label: "SAR 500k – 1M" },
      { value: "1m+", label: "SAR 1M+" },
      { value: "undisclosed", label: "Prefer not to say" },
    ],
    timelines: [
      { value: "urgent", label: "Under 4 weeks" },
      { value: "1-2-months", label: "1–2 months" },
      { value: "2-3-months", label: "2–3 months" },
      { value: "3plus", label: "3+ months / planning ahead" },
      { value: "flexible", label: "Flexible" },
    ],
    heardFrom: [
      { value: "search", label: "Search engine" },
      { value: "referral", label: "Referral" },
      { value: "social", label: "Social media" },
      { value: "event", label: "Saw our work at a show" },
      { value: "partner", label: "Agency / partner" },
      { value: "other", label: "Other" },
    ],
  },
  actions: {
    next: "Continue",
    back: "Back",
    submit: "Send Your Project Details",
    submitting: "Sending…",
  },
  consent:
    "I agree CPS may contact me about this inquiry and store these details to prepare a quote.",
  updatesOptIn: "Keep me posted on CPS news and project tips (optional).",
  success: {
    title: "Details received",
    message:
      "Thanks — our team will review your project and reply with a clear next step, usually within one business day.",
    cta: "Back to top",
  },
  errors: {
    required: "This field is required.",
    email: "Enter a valid email address.",
    submit: "Something went wrong. Please try again or email us directly.",
  },
  reviewTitle: "Almost done — check your details and send.",
};

const ar: BriefFormCopy = {
  eyebrow: "بريف المشروع",
  title: "احكيلنا عن مشروعك",
  support:
    "أربع خطوات سريعة — أجنحة أو فعاليات أو تجهيز داخلي أو عروض أو تصنيع أو طباعة أو تسليم. بنستخدم البيانات دي لتقدير العمل بدقة.",
  steps: [
    {
      title: "بيانات التواصل",
      description: "مين نتواصل معاه وإزاي تفضّل طريقة التواصل.",
    },
    {
      title: "بيانات الجهة",
      description: "سياق الشركة أو الجهة عشان نقدّر المشروع صح.",
    },
    {
      title: "تفاصيل المشروع",
      description: "إيه اللي بتبنيه، فين، وإيه خدمات CPS اللي محتاجها.",
    },
    {
      title: "الميزانية والملاحظات",
      description: "الجدول والميزانية وأي تفاصيل إضافية نحتاجها.",
    },
  ],
  labels: {
    userType: "أنا",
    fullName: "الاسم الكامل",
    jobTitle: "المسمى / الدور",
    email: "البريد الوظيفي",
    phone: "الهاتف / واتساب",
    preferredContact: "طريقة التواصل المفضلة",
    companyName: "الشركة / الجهة",
    website: "الموقع",
    industry: "القطاع",
    companySize: "حجم الفريق",
    country: "الدولة",
    city: "المدينة",
    eventName: "اسم المشروع أو المعرض",
    eventLocation: "الموقع / القاعة / المدينة",
    eventDate: "التاريخ المستهدف أو الفترة",
    boothSize: "المساحة / الحجم (اختياري)",
    boothType: "نوع المشروع",
    services: "الخدمات المطلوبة",
    hasExistingDesign: "في تصميم أو رسومات جاهزة؟",
    budgetRange: "الميزانية التقديرية (ريال)",
    timeline: "متى تحتاج التسليم جاهزاً؟",
    description: "أهداف المشروع وملاحظات",
    referenceUrl: "رابط مرجعي (اختياري)",
    heardFrom: "عرفت CPS ازاي؟",
  },
  placeholders: {
    fullName: "اسمك",
    jobTitle: "مدير التسويق، المشتريات…",
    email: "name@company.com",
    phone: "+966 …",
    companyName: "الاسم التجاري أو القانوني",
    website: "https://",
    country: "السعودية",
    city: "الرياض",
    eventName: "GITEX، LEAP، تجهيز صالة عرض، طرح متاجر…",
    eventLocation: "واجهة الرياض، DWTC، مول / عنوان مكتب…",
    eventDate: "مارس 2026 أو 12–15 أبريل 2026",
    boothSize: "36 م² / 6×6 م / عدد الفروع…",
    description: "أهداف العلامة، متطلبات أساسية، مواقع، مواد، AV، قيود تسليم…",
    referenceUrl: "مشروع سابق، moodboard، رابط RFP…",
  },
  options: {
    userTypes: [
      { value: "company", label: "علامة / شركة" },
      { value: "agency", label: "وكالة / شريك" },
      { value: "individual", label: "فرد / مستقل" },
      { value: "government", label: "جهة حكومية" },
      { value: "association", label: "جمعية / NGO" },
      { value: "other", label: "أخرى" },
    ],
    preferredContact: [
      { value: "email", label: "بريد" },
      { value: "phone", label: "مكالمة" },
      { value: "whatsapp", label: "واتساب" },
    ],
    industries: [
      { value: "technology", label: "تقنية" },
      { value: "healthcare", label: "رعاية صحية ودواء" },
      { value: "energy", label: "طاقة وصناعة" },
      { value: "retail", label: "تجزئة وFMCG" },
      { value: "finance", label: "مالية" },
      { value: "government", label: "حكومي" },
      { value: "education", label: "تعليم" },
      { value: "hospitality", label: "ضيافة ومطاعم" },
      { value: "other", label: "أخرى" },
    ],
    companySizes: [
      { value: "1-10", label: "1–10" },
      { value: "11-50", label: "11–50" },
      { value: "51-200", label: "51–200" },
      { value: "201-1000", label: "201–1,000" },
      { value: "1000+", label: "1,000+" },
    ],
    boothTypes: [
      { value: "custom", label: "جناح معرض" },
      { value: "modular", label: "هيكل فعالية / منصة" },
      { value: "double-deck", label: "تجهيز داخلي" },
      { value: "kiosk", label: "عرض تجزئة / كشك" },
      { value: "pavilion", label: "تصنيع مخصص" },
      { value: "portable", label: "طباعة ولافتات" },
      { value: "unsure", label: "تأجير / تسليم / مش متأكد" },
    ],
    services: [
      { value: "exhibitions-booths", label: "المعارض والأجنحة" },
      { value: "event-fabrication", label: "تصنيع وتجهيز الفعاليات" },
      { value: "fit-out-interiors", label: "التجهيزات الداخلية" },
      { value: "retail-displays", label: "عروض ونقاط البيع" },
      { value: "custom-fabrication", label: "التصنيع المخصص" },
      { value: "printing-signage", label: "الطباعة واللافتات" },
      { value: "rental-solutions", label: "حلول التأجير" },
      { value: "installation-project-delivery", label: "التركيب وتسليم المشاريع" },
    ],
    hasExistingDesign: [
      { value: "yes", label: "نعم — عندنا رسومات" },
      { value: "no", label: "لا — محتاجين CPS يصمّم" },
      { value: "unsure", label: "مش متأكدين" },
    ],
    budgetRanges: [
      { value: "under-100k", label: "أقل من 100 ألف ر.س" },
      { value: "100k-250k", label: "100 – 250 ألف ر.س" },
      { value: "250k-500k", label: "250 – 500 ألف ر.س" },
      { value: "500k-1m", label: "500 ألف – 1 مليون ر.س" },
      { value: "1m+", label: "أكثر من 1 مليون ر.س" },
      { value: "undisclosed", label: "أفضل عدم الإفصاح" },
    ],
    timelines: [
      { value: "urgent", label: "أقل من 4 أسابيع" },
      { value: "1-2-months", label: "1–2 شهر" },
      { value: "2-3-months", label: "2–3 أشهر" },
      { value: "3plus", label: "3+ أشهر / تخطيط مبكر" },
      { value: "flexible", label: "مرن" },
    ],
    heardFrom: [
      { value: "search", label: "بحث" },
      { value: "referral", label: "توصية" },
      { value: "social", label: "سوشيال" },
      { value: "event", label: "شفنا شغلكم في معرض" },
      { value: "partner", label: "وكالة / شريك" },
      { value: "other", label: "أخرى" },
    ],
  },
  actions: {
    next: "التالي",
    back: "رجوع",
    submit: "أرسل تفاصيل مشروعك",
    submitting: "جاري الإرسال…",
  },
  consent:
    "أوافق على أن CPS تتواصل معي بخصوص هذا الطلب وتخزّن هذه البيانات لإعداد عرض سعر.",
  updatesOptIn: "أبغى أتابع أخبار CPS ونصائح المشاريع (اختياري).",
  success: {
    title: "استلمنا التفاصيل",
    message:
      "شكراً — فريقنا هيراجع مشروعك ويرد بخطوة واضحة، عادة خلال يوم عمل.",
    cta: "العودة للأعلى",
  },
  errors: {
    required: "هذا الحقل مطلوب.",
    email: "أدخل بريداً إلكترونياً صحيحاً.",
    submit: "حدث خطأ. حاول مرة أخرى أو راسلنا مباشرة.",
  },
  reviewTitle: "خطوة أخيرة — راجع التفاصيل وأرسل.",
};

export function getBriefFormCopy(locale: Locale): BriefFormCopy {
  return locale === "ar" ? ar : en;
}
