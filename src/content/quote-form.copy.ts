import type { Locale } from "@/lib/i18n";

export type QuoteFormOption = { value: string; label: string };

export type QuoteFormCopy = {
  eyebrow: string;
  title: string;
  support: string;
  labels: {
    name: string;
    company: string;
    email: string;
    phone: string;
    item: string;
    projectName: string;
    details: string;
    references: string;
  };
  placeholders: {
    name: string;
    company: string;
    email: string;
    phone: string;
    item: string;
    projectName: string;
    details: string;
    references: string;
  };
  submit: string;
  submitting: string;
  success: {
    eyebrow: string;
    title: string;
    message: string;
  };
  errors: {
    required: string;
    email: string;
    submit: string;
    fileTooLarge: string;
    tooManyFiles: string;
  };
};

const en: QuoteFormCopy = {
  eyebrow: "Get a Quote",
  title: "Ready to start your project?",
  support: "Tell us what you need and we'll follow up with next steps.",
  labels: {
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    item: "Item / Type",
    projectName: "Project or exhibition name",
    details: "Project details",
    references: "Reference files",
  },
  placeholders: {
    name: "Your full name",
    company: "Company or organization",
    email: "name@company.com",
    phone: "+966 5X XXX XXXX",
    item: "Select an option",
    projectName: "Optional — e.g. LEAP 2026 booth",
    details: "Scope, venue, dates, size, and anything we should know…",
    references: "PDF, images or drawings — optional, up to 5 files",
  },
  submit: "Request My Quote",
  submitting: "Sending…",
  success: {
    eyebrow: "Get a Quote",
    title: "Quote request received",
    message: "Our team will follow up with the next step.",
  },
  errors: {
    required: "This field is required.",
    email: "Enter a valid email address.",
    submit: "We could not send your request. Try again or contact us directly.",
    fileTooLarge: "Each file must be under 10MB.",
    tooManyFiles: "You can upload up to 5 files.",
  },
};

const ar: QuoteFormCopy = {
  eyebrow: "اطلب عرض سعر",
  title: "جاهز لبدء مشروعك؟",
  support: "أخبرنا بما تحتاجه وسنتواصل معك بالخطوة التالية.",
  labels: {
    name: "الاسم",
    company: "الشركة",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    item: "العنصر / النوع",
    projectName: "اسم المشروع أو المعرض",
    details: "تفاصيل المشروع",
    references: "ملفات مرجعية",
  },
  placeholders: {
    name: "الاسم الكامل",
    company: "الشركة أو الجهة",
    email: "name@company.com",
    phone: "+966 5X XXX XXXX",
    item: "اختر خياراً",
    projectName: "اختياري — مثال: جناح LEAP 2026",
    details: "النطاق، المكان، التواريخ، المساحة، وأي تفاصيل مهمة…",
    references: "PDF أو صور أو رسومات — اختياري، حتى 5 ملفات",
  },
  submit: "اطلب عرض السعر",
  submitting: "جارٍ الإرسال…",
  success: {
    eyebrow: "اطلب عرض سعر",
    title: "وصل طلبك",
    message: "سيتواصل معك فريقنا بالخطوة التالية.",
  },
  errors: {
    required: "هذا الحقل مطلوب.",
    email: "أدخل بريداً إلكترونياً صالحاً.",
    submit: "تعذر إرسال الطلب. حاول مرة أخرى أو تواصل معنا مباشرة.",
    fileTooLarge: "كل ملف يجب أن يكون أقل من 10MB.",
    tooManyFiles: "يمكنك رفع حتى 5 ملفات.",
  },
};

/** Contact page: same fields, Blueprint submit CTA. */
export function getQuoteFormCopy(
  locale: Locale,
  variant: "service" | "contact" | "delivery" = "service",
): QuoteFormCopy {
  const base = locale === "ar" ? ar : en;
  if (variant === "delivery") {
    return {
      ...base,
      eyebrow: locale === "ar" ? "طلب خدمة مشروع قائم" : "Existing project support",
      title: locale === "ar" ? "ما الذي يحتاجه مشروعك في الموقع؟" : "What does your existing project need?",
      support: locale === "ar"
        ? "أرسل حالة الهيكل أو الأصول والموقع والموعد المطلوب لنحدد خطة التركيب أو النقل أو التخزين أو الصيانة."
        : "Share the structure or asset condition, location and required date so we can plan installation, logistics, storage or maintenance.",
      labels: {
        ...base.labels,
        item: locale === "ar" ? "خدمة التسليم المطلوبة" : "Delivery service needed",
        projectName: locale === "ar" ? "المشروع أو الهيكل القائم (اختياري)" : "Existing project or structure (optional)",
        details: locale === "ar" ? "حالة المشروع ومتطلبات الموقع" : "Project condition and site requirements",
      },
      placeholders: {
        ...base.placeholders,
        item: locale === "ar" ? "اختر خدمة التركيب أو التسليم" : "Select an installation or delivery service",
        projectName: locale === "ar" ? "اسم المشروع أو نوع الهيكل" : "Project name or structure type",
        details: locale === "ar"
          ? "الموقع، الموعد، الأبعاد، حالة الهيكل، متطلبات الدخول وأي رسومات متاحة…"
          : "Site, required date, dimensions, structure condition, access constraints and available drawings…",
      },
    };
  }
  if (variant === "contact") {
    return {
      ...base,
      eyebrow: locale === "ar" ? "تفاصيل المشروع" : "Project details",
      title:
        locale === "ar" ? "احكيلنا عن مشروعك" : "Tell us about your project",
      support:
        locale === "ar"
          ? "نموذج سريع — نرد عليك بالخطوة التالية."
          : "A short form — we'll reply with a clear next step.",
      labels: {
        ...base.labels,
        item: locale === "ar" ? "الخدمة / النوع" : "Service / Type",
        projectName:
          locale === "ar" ? "اسم المشروع (اختياري)" : "Project name (optional)",
        references:
          locale === "ar"
            ? "ملفات مرجعية (اختياري)"
            : "Reference files (optional)",
      },
      placeholders: {
        ...base.placeholders,
        item: locale === "ar" ? "اختر الخدمة" : "Select a service",
        projectName:
          locale === "ar"
            ? "اختياري — اسم المعرض أو المشروع"
            : "Optional — exhibition or project name",
      },
      submit:
        locale === "ar" ? "أرسل تفاصيل مشروعك" : "Send Your Project Details",
      success: {
        eyebrow: locale === "ar" ? "تواصل" : "Contact",
        title: locale === "ar" ? "تم استلام التفاصيل" : "Details received",
        message:
          locale === "ar"
            ? "شكراً — فريقنا هيراجع الطلب ويرد عليك قريباً."
            : "Thanks — our team will review this and reply shortly.",
      },
    };
  }
  return {
    ...base,
    labels: {
      ...base.labels,
      projectName:
        locale === "ar"
          ? "اسم المشروع أو المعرض (اختياري)"
          : "Project or exhibition name (optional)",
      references:
        locale === "ar"
          ? "ملفات مرجعية (اختياري)"
          : "Reference files (optional)",
    },
  };
}

export const contactServiceOptions: Record<Locale, QuoteFormOption[]> = {
  en: [
    { value: "exhibitions-booths", label: "Exhibitions & Booths" },
    { value: "event-fabrication", label: "Event Fabrication" },
    { value: "fit-out-interiors", label: "Fit-Out & Interiors" },
    { value: "retail-displays", label: "Retail Displays" },
    { value: "custom-fabrication", label: "Custom Fabrication" },
    { value: "printing-signage", label: "Printing & Signage" },
    { value: "rental-solutions", label: "Rental Solutions" },
    {
      value: "installation-project-delivery",
      label: "Installation & Project Delivery",
    },
  ],
  ar: [
    { value: "exhibitions-booths", label: "المعارض والأجنحة" },
    { value: "event-fabrication", label: "تصنيع وتجهيز الفعاليات" },
    { value: "fit-out-interiors", label: "التجهيزات الداخلية" },
    { value: "retail-displays", label: "عروض ونقاط البيع" },
    { value: "custom-fabrication", label: "التصنيع المخصص" },
    { value: "printing-signage", label: "الطباعة واللافتات" },
    { value: "rental-solutions", label: "حلول التأجير" },
    {
      value: "installation-project-delivery",
      label: "التركيب وتسليم المشاريع",
    },
  ],
};
