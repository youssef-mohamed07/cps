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
  title: "Tell us about your booth",
  support:
    "Four quick steps — whether you're a brand, agency, or organizer. We use this to scope design, build, and install accurately.",
  steps: [
    {
      title: "You",
      description: "Who we should reach and how you prefer to be contacted.",
    },
    {
      title: "Organization",
      description: "Company or entity details — helps us understand context.",
    },
    {
      title: "Event & booth",
      description: "Show, footprint, format, and services you need from CPS.",
    },
    {
      title: "Scope & send",
      description: "Budget, timeline, goals — then submit your brief.",
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
    eventName: "Event name",
    eventLocation: "Venue / city",
    eventDate: "Event date or window",
    boothSize: "Stand size (e.g. 6×3 m or sqm)",
    boothType: "Booth type",
    services: "Services needed",
    hasExistingDesign: "Existing design or drawings?",
    budgetRange: "Estimated budget (SAR)",
    timeline: "When do you need install-ready?",
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
    eventName: "GITEX, LEAP, private launch…",
    eventLocation: "Riyadh Front, DWTC…",
    eventDate: "March 2026 or 12–15 Apr 2026",
    boothSize: "36 sqm / 6×6 m",
    description: "Brand goals, must-haves, competitors on the floor, AV needs…",
    referenceUrl: "Past booth, moodboard, RFP link…",
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
      { value: "custom", label: "Custom-built" },
      { value: "modular", label: "Modular / system" },
      { value: "double-deck", label: "Double-deck" },
      { value: "kiosk", label: "Kiosk / small stand" },
      { value: "pavilion", label: "Pavilion / large format" },
      { value: "portable", label: "Portable / pop-up" },
      { value: "unsure", label: "Not sure yet" },
    ],
    services: [
      { value: "design", label: "Booth design" },
      { value: "fabrication", label: "Fabrication" },
      { value: "install", label: "On-site install" },
      { value: "dismantle", label: "Dismantling" },
      { value: "storage", label: "Storage & reuse" },
      { value: "graphics", label: "Graphics & print" },
      { value: "av", label: "AV & screens" },
      { value: "furniture", label: "Furniture & fixtures" },
      { value: "project-management", label: "Full project management" },
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
    submit: "Send brief",
    submitting: "Sending…",
  },
  consent:
    "I agree CPS may contact me about this inquiry and store these details to prepare a quote.",
  updatesOptIn: "Keep me posted on CPS news and show-season tips (optional).",
  success: {
    title: "Brief received",
    message:
      "Thanks — our team will review your event details and reply with a clear next step, usually within one business day.",
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
  title: "احكيلنا عن جناحك",
  support:
    "أربع خطوات سريعة — سواء كنت علامة أو وكالة أو منظّم. بنستخدم البيانات دي لتقدير التصميم والبناء والتركيب بدقة.",
  steps: [
    {
      title: "أنت",
      description: "مين نتواصل معاه وإزاي تفضل التواصل.",
    },
    {
      title: "الجهة",
      description: "بيانات الشركة أو الجهة — تساعدنا نفهم السياق.",
    },
    {
      title: "الحدث والجناح",
      description: "المعرض، المساحة، النوع، والخدمات اللي محتاجها من CPS.",
    },
    {
      title: "النطاق والإرسال",
      description: "الميزانية، الجدول، الأهداف — وبعدين أرسل البريف.",
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
    eventName: "اسم الحدث",
    eventLocation: "الموقع / المدينة",
    eventDate: "تاريخ الحدث أو الفترة",
    boothSize: "مساحة الجناح (مثلاً 6×3 م أو م²)",
    boothType: "نوع الجناح",
    services: "الخدمات المطلوبة",
    hasExistingDesign: "في تصميم أو رسومات جاهزة؟",
    budgetRange: "الميزانية التقديرية (ريال)",
    timeline: "متى تحتاج الجناح جاهز للتركيب؟",
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
    eventName: "GITEX، LEAP، إطلاق خاص…",
    eventLocation: "واجهة الرياض، DWTC…",
    eventDate: "مارس 2026 أو 12–15 أبريل 2026",
    boothSize: "36 م² / 6×6 م",
    description: "أهداف العلامة، متطلبات أساسية، منافسين في المعرض، AV…",
    referenceUrl: "جناح سابق، moodboard، رابط RFP…",
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
      { value: "custom", label: "مخصص" },
      { value: "modular", label: "معياري / system" },
      { value: "double-deck", label: "طابقين" },
      { value: "kiosk", label: "كشك / stand صغير" },
      { value: "pavilion", label: "جناح وطني / كبير" },
      { value: "portable", label: "محمول / pop-up" },
      { value: "unsure", label: "مش متأكد" },
    ],
    services: [
      { value: "design", label: "تصميم الجناح" },
      { value: "fabrication", label: "تصنيع" },
      { value: "install", label: "تركيب في الموقع" },
      { value: "dismantle", label: "تفكيك" },
      { value: "storage", label: "تخزين وإعادة استخدام" },
      { value: "graphics", label: "جرافيك وطباعة" },
      { value: "av", label: "AV وشاشات" },
      { value: "furniture", label: "أثاث وتجهيزات" },
      { value: "project-management", label: "إدارة مشروع كاملة" },
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
    submit: "إرسال البريف",
    submitting: "جاري الإرسال…",
  },
  consent:
    "أوافق على أن CPS تتواصل معي بخصوص هذا الطلب وتخزّن هذه البيانات لإعداد عرض سعر.",
  updatesOptIn: "أبغى أتابع أخبار CPS ونصائح موسم المعارض (اختياري).",
  success: {
    title: "استلمنا البريف",
    message:
      "شكراً — فريقنا هيراجع تفاصيل الحدث ويرد بخطوة واضحة، عادة خلال يوم عمل.",
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
