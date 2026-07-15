import {
  boothTypes,
  formatBoothTypeTitle,
  getBoothType,
  getLocation,
  getService,
  localizeBoothType,
  localizeLocation,
  localizeService,
  locations,
  services,
} from "@/content/catalog";
import type { Locale } from "@/lib/i18n";

export type ProgrammaticKind = "service" | "boothType";

export type ProgrammaticPageData = {
  kind: ProgrammaticKind;
  locationSlug: string;
  entitySlug: string;
  locationTitle: string;
  entityTitle: string;
  countryCode: string;
  path: string;
  title: string;
  lead: string;
  overview: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  highlights: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { slug: string; title: string; href: string }[];
  relatedBoothTypes: { slug: string; title: string; href: string }[];
  otherLocations: { slug: string; title: string; href: string }[];
};

function servicePath(locationSlug: string, serviceSlug: string) {
  return `/locations/${locationSlug}/services/${serviceSlug}`;
}

function boothTypePath(locationSlug: string, boothTypeSlug: string) {
  return `/locations/${locationSlug}/booth-types/${boothTypeSlug}`;
}

export function getAllProgrammaticServiceParams() {
  return locations.flatMap((location) =>
    services.map((service) => ({
      slug: location.slug,
      serviceSlug: service.slug,
    })),
  );
}

export function getAllProgrammaticBoothTypeParams() {
  return locations.flatMap((location) =>
    boothTypes.map((boothType) => ({
      slug: location.slug,
      boothTypeSlug: boothType.slug,
    })),
  );
}

/** CMS-first static params (falls back inside loaders when Sanity is empty). */
export async function getAllProgrammaticServiceParamsAsync() {
  const { loadLocations, loadServices } = await import(
    "@/sanity/load-collections"
  );
  const [cmsLocations, cmsServices] = await Promise.all([
    loadLocations("en"),
    loadServices("en"),
  ]);
  return cmsLocations.flatMap((location) =>
    cmsServices.map((service) => ({
      slug: location.slug,
      serviceSlug: service.slug,
    })),
  );
}

export async function getAllProgrammaticBoothTypeParamsAsync() {
  const { loadLocations, loadBoothTypes } = await import(
    "@/sanity/load-collections"
  );
  const [cmsLocations, cmsBoothTypes] = await Promise.all([
    loadLocations("en"),
    loadBoothTypes("en"),
  ]);
  return cmsLocations.flatMap((location) =>
    cmsBoothTypes.map((boothType) => ({
      slug: location.slug,
      boothTypeSlug: boothType.slug,
    })),
  );
}

export function buildServiceLocationPage(
  locale: Locale,
  locationSlug: string,
  serviceSlug: string,
): ProgrammaticPageData | null {
  const locationRecord = getLocation(locationSlug);
  const serviceRecord = getService(serviceSlug);
  if (!locationRecord || !serviceRecord) return null;

  const location = localizeLocation(locationRecord, locale);
  const service = localizeService(serviceRecord, locale);
  const isArabic = locale === "ar";

  const title = isArabic
    ? `${service.title} في ${location.title}`
    : `${service.title} in ${location.title}`;

  const lead =
    service.heroLead ??
    (isArabic
      ? `خدمة ${service.title} لمعارض وفعاليات في ${location.title} — تصميم، إنتاج، وتنفيذ بمعايير CPS.`
      : `${service.title} for exhibitions and events in ${location.title} — designed, built, and delivered to CPS standards.`);

  const overview = isArabic
    ? `${service.overview} نقدّم هذه الخدمة في ${location.title} مع تنسيق محلي للوجستيات والمواقع وجداول التركيب. ${location.localExperience}`
    : `${service.overview} We deliver this service in ${location.title} with local logistics, venue coordination, and install planning. ${location.localExperience}`;

  const highlights = [
    {
      title: isArabic ? "تسليم محلي" : "Local delivery",
      description: isArabic
        ? `فرق وتنسيق في ${location.title} لتقليل مخاطر الجدول والتركيب.`
        : `Crews and coordination in ${location.title} to protect install windows and show-day readiness.`,
    },
    {
      title: isArabic ? "معايير CPS" : "CPS standards",
      description: isArabic
        ? "نفس جودة التصميم والتصنيع عبر مدن المملكة."
        : "The same design and fabrication quality across Saudi cities.",
    },
    ...(service.benefits[0]
      ? [
          {
            title: service.benefits[0].title,
            description: service.benefits[0].description,
          },
        ]
      : []),
  ];

  const faqs = [
    {
      question: isArabic
        ? `هل تقدّمون ${service.title} في ${location.title}؟`
        : `Do you offer ${service.title} in ${location.title}?`,
      answer: isArabic
        ? `نعم. CPS تنفّذ ${service.title} في ${location.title} مع تخطيط لوجستي وتركيب في الموقع.`
        : `Yes. CPS delivers ${service.title} in ${location.title} with logistics planning and on-site install support.`,
    },
    {
      question: isArabic
        ? "ما المدة المعتادة من الموجز إلى التسليم؟"
        : "What is a typical timeline from brief to delivery?",
      answer: isArabic
        ? "يعتمد على حجم الجناح وتقويم المعرض. نحدد مراحل واضحة للتصميم والتصنيع والتركيب منذ البداية."
        : "It depends on footprint and the show calendar. We lock clear stages for design, fabrication, and install from day one.",
    },
    ...(service.faq[0]
      ? [{ question: service.faq[0].question, answer: service.faq[0].answer }]
      : []),
  ];

  return {
    kind: "service",
    locationSlug,
    entitySlug: serviceSlug,
    locationTitle: location.title,
    entityTitle: service.title,
    countryCode: location.countryCode,
    path: servicePath(locationSlug, serviceSlug),
    title,
    lead,
    overview,
    image: service.image || location.image,
    imageAlt: service.imageAlt || location.imageAlt,
    keywords: isArabic
      ? [
          service.title,
          location.title,
          `أجنحة معارض ${location.title}`,
          `${service.title} ${location.title}`,
          "CPS",
        ]
      : [
          service.title,
          location.title,
          `exhibition booths ${location.title}`,
          `${service.title} ${location.title}`,
          "CPS",
        ],
    highlights,
    faqs,
    relatedServices: services
      .filter((item) => item.slug !== serviceSlug)
      .slice(0, 4)
      .map((item) => {
        const localized = localizeService(item, locale);
        return {
          slug: item.slug,
          title: localized.title,
          href: servicePath(locationSlug, item.slug),
        };
      }),
    relatedBoothTypes: boothTypes.slice(0, 4).map((item) => {
      const localized = localizeBoothType(item, locale);
      return {
        slug: item.slug,
        title: formatBoothTypeTitle(localized.title),
        href: boothTypePath(locationSlug, item.slug),
      };
    }),
    otherLocations: locations
      .filter((item) => item.slug !== locationSlug)
      .slice(0, 6)
      .map((item) => {
        const localized = localizeLocation(item, locale);
        return {
          slug: item.slug,
          title: localized.title,
          href: servicePath(item.slug, serviceSlug),
        };
      }),
  };
}

export function buildBoothTypeLocationPage(
  locale: Locale,
  locationSlug: string,
  boothTypeSlug: string,
): ProgrammaticPageData | null {
  const locationRecord = getLocation(locationSlug);
  const boothTypeRecord = getBoothType(boothTypeSlug);
  if (!locationRecord || !boothTypeRecord) return null;

  const location = localizeLocation(locationRecord, locale);
  const boothType = localizeBoothType(boothTypeRecord, locale);
  const isArabic = locale === "ar";
  const boothTitle = formatBoothTypeTitle(boothType.title, location.title);

  const title = boothType.title.includes("{City}")
    ? boothTitle
    : isArabic
      ? `${boothTitle} في ${location.title}`
      : `${boothTitle} in ${location.title}`;

  const lead = boothType.excerpt
    ? boothType.excerpt
    : isArabic
      ? `${boothTitle} لمعارض ${location.title} — بناء يناسب المساحة والعلامة وتقويم الحدث.`
      : `${boothTitle} for shows in ${location.title} — built around footprint, brand, and the event calendar.`;

  const overview = isArabic
    ? `${boothType.description} نقدّم هذا النوع في ${location.title} مع تنسيق المواقع والتركيب واللوجستيات. ${location.localExperience}`
    : `${boothType.description} We deliver this format in ${location.title} with venue coordination, install crews, and logistics support. ${location.localExperience}`;

  const highlights = [
    {
      title: isArabic ? "ملاءمة السوق المحلي" : "Local market fit",
      description: isArabic
        ? `تصميم وتنفيذ مناسبين لمتطلبات المعارض في ${location.title}.`
        : `Design and delivery tuned to exhibition requirements in ${location.title}.`,
    },
    ...(boothType.advantages[0]
      ? [
          {
            title: boothType.advantages[0].title,
            description: boothType.advantages[0].description,
          },
        ]
      : []),
    {
      title: isArabic ? "من المفهوم إلى التركيب" : "From concept to install",
      description: isArabic
        ? "فريق واحد يملك التصميم والتصنيع والتنفيذ في الموقع."
        : "One team owns design, fabrication, and on-site execution.",
    },
  ];

  const faqs = [
    {
      question: isArabic
        ? `هل يمكن تنفيذ ${boothTitle} في ${location.title}؟`
        : `Can you build ${boothTitle} in ${location.title}?`,
      answer: isArabic
        ? `نعم. CPS تنفّذ ${boothTitle} في ${location.title} مع تخطيط للوصول والتركيب وفق قواعد المواقع.`
        : `Yes. CPS builds ${boothTitle} in ${location.title}, planning access and install around venue rules.`,
    },
    {
      question: isArabic
        ? "هل يناسب هذا النوع معارض متعددة؟"
        : "Is this format suitable for multiple shows?",
      answer: isArabic
        ? boothType.useCases.length
          ? `نعم — شائع في: ${boothType.useCases.join("، ")}.`
          : "نعم، حسب المساحة وأهداف العلامة."
        : boothType.useCases.length
          ? `Yes — commonly used for: ${boothType.useCases.join(", ")}.`
          : "Yes, depending on footprint and brand goals.",
    },
  ];

  return {
    kind: "boothType",
    locationSlug,
    entitySlug: boothTypeSlug,
    locationTitle: location.title,
    entityTitle: boothTitle,
    countryCode: location.countryCode,
    path: boothTypePath(locationSlug, boothTypeSlug),
    title,
    lead,
    overview,
    image: boothType.image || location.image,
    imageAlt: boothType.imageAlt || location.imageAlt,
    keywords: isArabic
      ? [
          boothTitle,
          location.title,
          `أجنحة ${location.title}`,
          `${boothTitle} ${location.title}`,
          "CPS",
        ]
      : [
          boothTitle,
          location.title,
          `exhibition booths ${location.title}`,
          `${boothTitle} ${location.title}`,
          "CPS",
        ],
    highlights,
    faqs,
    relatedServices: services.slice(0, 4).map((item) => {
      const localized = localizeService(item, locale);
      return {
        slug: item.slug,
        title: localized.title,
        href: servicePath(locationSlug, item.slug),
      };
    }),
    relatedBoothTypes: boothTypes
      .filter((item) => item.slug !== boothTypeSlug)
      .slice(0, 4)
      .map((item) => {
        const localized = localizeBoothType(item, locale);
        return {
          slug: item.slug,
          title: formatBoothTypeTitle(localized.title),
          href: boothTypePath(locationSlug, item.slug),
        };
      }),
    otherLocations: locations
      .filter((item) => item.slug !== locationSlug)
      .slice(0, 6)
      .map((item) => {
        const localized = localizeLocation(item, locale);
        return {
          slug: item.slug,
          title: localized.title,
          href: boothTypePath(item.slug, boothTypeSlug),
        };
      }),
  };
}
