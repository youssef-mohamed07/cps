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
    storyHeadline: string;
    story: string;
    storySecond: string;
    valuesTitle: string;
    valuesSupport: string;
    values: { title: string; description: string }[];
    studioTitle: string;
    studioSupport: string;
    studioItems: { title: string; description: string }[];
    closingLine?: string;
    industriesTitle: string;
    industriesItems: string[];
    industriesMore: string;
    industriesLogosTitle: string;
    faqItems: { question: string; answer: string }[];
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
    support?: string;
    clientsLine?: string;
    reasons?: { title: string; description: string }[];
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
  industriesPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  locationsPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  newsPage: {
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
    businessHours?: string;
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
      badge: "Production. Fabrication. Fit-Out.",
      headline: "Exhibitions. Events.\nInteriors. Displays.\nBuilt under one roof.",
      support:
        "One production facility. Eight services. Built and installed in-house.",
      primaryCta: "Start a Project",
      secondaryCta: "See What We Build",
    },
    lifecycle: {
      eyebrow: "Who We Are",
      title: "One production partner. Multiple capabilities.",
      support: "One team carries every project from technical drawing to final install.",
      imageAlt: "CPS production and installation craft",
      items: [
        {
          title: "Multiple environments",
          description:
            "Exhibition booths, event structures, branded interiors, retail displays, signage and custom fabrication — all under one roof",
        },
        {
          title: "In-house production",
          description:
            "In-house production across wood, metal, acrylic, printing and installation",
        },
        {
          title: "One point of contact",
          description: "One point of contact from concept through handover",
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
      body: "CPS is a production, fabrication and fit-out company delivering exhibitions, events, interiors, displays and signage across Saudi Arabia.",
    },
    aboutPage: {
      eyebrow: "About CPS",
      title: "We build ideas into reality.",
      lead: "A production, fabrication and fit-out company working across Saudi Arabia.",
      storyTitle: "Our story",
      storyHeadline: "One production partner. Multiple capabilities.",
      story:
        "Exhibition booths, event structures, branded environments, retail displays, signage and custom-built solutions — all under one roof. CPS connects technical development, fabrication and final on-site execution through one accountable team.",
      storySecond:
        "Our in-house capabilities span wood, metal, acrylic, printing and installation, giving every project tighter quality control and a clearer path to handover.",
      valuesTitle: "Key differentiators",
      valuesSupport: "What stays consistent across every CPS project.",
      values: [
        {
          title: "In-house production",
          description: "In-house production across every major discipline.",
        },
        {
          title: "One accountable team",
          description:
            "One team from technical drawing through installation and handover.",
        },
        {
          title: "Nationwide delivery",
          description: "Nationwide site survey, delivery and dismantling.",
        },
        {
          title: "Proven with leading brands",
          description:
            "Confirmed KSA clients across banking, telecom and retail sectors.",
        },
      ],
      studioTitle: "Where every project gets built",
      studioSupport: "Our own production floor and team, from raw material to finished installation.",
      studioItems: [
        {
          title: "Fully Equipped Workshop",
          description: "Everything needed to fabricate in-house, start to finish.",
        },
        {
          title: "Skilled In-House Team",
          description: "Craftsmen and technicians, not subcontracted labor.",
        },
        {
          title: "Quality Control at Every Stage",
          description: "Checked before it ever leaves the factory.",
        },
        {
          title: "Built for Scale",
          description: "Capable of handling multiple projects at once.",
        },
      ],
      closingLine:
        "One production partner. Multiple capabilities. Built around your project.",
      industriesTitle: "Trusted Across Industries",
      industriesItems: [
        "Banking & Finance",
        "Government & Public Sector",
        "Real Estate & Construction",
        "Telecom & Technology",
        "Oil, Gas & Energy",
      ],
      industriesMore: "+15 others",
      industriesLogosTitle: "Trusted Across Industries",
      faqItems: [
        {
          question: "Is CPS a design company, a production company, or both?",
          answer:
            "Both. We handle design, fabrication, branding, installation and handover in-house across exhibitions, events, interiors, displays and signage.",
        },
        {
          question: "Do you work with clients outside Saudi Arabia?",
          answer:
            "Our current focus is delivering across Saudi Arabia. If your project is elsewhere, reach out and we'll confirm what's possible.",
        },
        {
          question: "What industries do you typically work with?",
          answer:
            "We work across a wide range of sectors, including finance, government, real estate, telecom, energy, healthcare, and retail.",
        },
        {
          question: "How is CPS different from other production companies?",
          answer:
            "Everything is handled by one in-house team — no subcontractors, no handoffs between vendors. What you approve is exactly what gets built.",
        },
        {
          question: "Can CPS handle projects of any size?",
          answer:
            "Yes — from single displays and kiosks to large-scale interiors, events and pavilions. Our team and facilities are built for scale.",
        },
        {
          question: "How do I start a project with CPS?",
          answer:
            "Reach out through our contact form — we'll schedule a brief to understand your goals, scope and timeline.",
        },
      ],
    },
    services: {
      eyebrow: "What We Do",
      title: "Eight services. One production floor.",
      support: "Browse by service to see featured work — or jump straight to the full catalogue.",
      cta: "See All Services",
      items: [
        {
          title: "Exhibitions & Booths",
          description: "Custom exhibition environments, modular solutions and large-scale pavilions.",
          image: media.boothTypes.custom,
          imageAlt: "Custom exhibition environment",
          slug: "exhibitions-booths",
        },
        {
          title: "Event Fabrication",
          description: "Stages, scenic structures, branded environments and experiential builds.",
          image: media.boothTypes.outdoor,
          imageAlt: "Event fabrication",
          slug: "event-fabrication",
        },
        {
          title: "Fit-Out & Interiors",
          description: "Commercial interiors, offices, showrooms, retail and branded spaces.",
          image: media.about.studio,
          imageAlt: "Commercial interior fit-out",
          slug: "fit-out-interiors",
        },
        {
          title: "Retail Displays",
          description: "Gondolas, product displays, POS/POP units, kiosks and window displays.",
          image: media.boothTypes.kiosk,
          imageAlt: "Retail display",
          slug: "retail-displays",
        },
        {
          title: "Custom Fabrication",
          description: "Wood, metal, acrylic, CNC and mixed-material bespoke fabrication.",
          image: media.services.fabrication,
          imageAlt: "Custom fabrication workshop",
          slug: "custom-fabrication",
        },
        { title: "Printing & Signage", description: "Large-format graphics, environmental branding and signage systems.", image: media.services.branding, imageAlt: "Printing and signage", slug: "printing-signage" },
        { title: "Rental Solutions", description: "Reusable event, exhibition and display assets.", image: media.services.storage, imageAlt: "Rental inventory", slug: "rental-solutions" },
        { title: "Installation & Project Delivery", description: "Technical planning, logistics, installation, storage and maintenance.", image: media.services.installation, imageAlt: "On-site installation", slug: "installation-project-delivery" },
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
      title: "One team, from concept to final install",
      support:
        "Everything stays in-house, so nothing gets lost between subcontractors.",
      clientsLine: "Delivered for Ajlan & Bros, SNB, SAB, Sirar by STC, Al Hilal",
      reasons: [
        {
          title: "In-house production",
          description: "Wood, metal, acrylic, printing and signage are produced by one accountable team.",
        },
        {
          title: "Nationwide delivery",
          description: "Site survey, installation and dismantling are coordinated across Saudi Arabia.",
        },
        {
          title: "One point of contact",
          description: "One team owns the work from technical drawing through installation and handover.",
        },
        {
          title: "Proven delivery",
          description: "Delivered for leading Saudi brands across banking, telecom and retail.",
        },
      ],
      primary: {
        title: "In-house production",
        description:
          "In-house production across wood, metal, acrylic, printing and signage — one accountable floor.",
        cta: "Start a Project",
        href: "/contact",
      },
      secondary: {
        title: "Nationwide delivery",
        description:
          "Site survey, installation and dismantling — with a single point of contact from technical drawing to handover.",
        cta: "See our capabilities",
        href: "/production-capabilities",
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
      title: "Questions about CPS",
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
      eyebrow: "Our Work",
      title: "Recent work",
      support: "A look at what has gone out the door recently, across services.",
      items: workItems("en"),
      viewAll: "View All Projects",
    },
    workPage: {
      eyebrow: "Work",
      title: "Selected projects",
      lead: "Exhibitions, events, interiors and displays produced across services and sectors.",
    },
    industriesPage: {
      eyebrow: "Sectors",
      title: "Industries",
      lead: "Booth solutions shaped around the realities of each sector.",
    },
    locationsPage: {
      eyebrow: "Cities",
      title: "Locations",
      lead: "Presence across Saudi Arabia’s key exhibition cities.",
    },
    newsPage: {
      eyebrow: "Insights",
      title: "Insights",
      lead: "Practical thinking from the show floor and the production floor.",
    },
    projectPage: {
      challenge: "Challenge",
      approach: "CPS Solution",
      outcome: "Outcome",
      gallery: "Gallery",
      next: "Next project",
      back: "All work",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's plan your next project",
      support:
        "Share what you're building — booth, event, fit-out, display or fabrication — and we'll reply with a clear next step.",
      emailLabel: "Start a Project",
      whatsappLabel: "WhatsApp",
    },
    briefForm: getBriefFormCopy("en"),
    contactPage: {
      eyebrow: "Contact",
      title: "Start with a conversation.",
      lead: "Share your project details — we’ll reply with a clear next step.",
      businessHours: "Sun–Thu, 9:00–18:00 AST",
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
        { label: "Riyadh", href: "/locations/riyadh" },
        { label: "Jeddah", href: "/locations/jeddah" },
        { label: "Dammam", href: "/locations/dammam" },
        { label: "Khobar", href: "/locations/khobar" },
        { label: "Makkah", href: "/locations/makkah" },
        { label: "Madinah", href: "/locations/madinah" },
        { label: "NEOM", href: "/locations/neom" },
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
      badge: "إنتاج. تصنيع. تجهيز داخلي.",
      headline: "معارض. فعاليات.\nمساحات داخلية. عروض.\nكلها تحت سقف واحد.",
      support:
        "منشأة إنتاج واحدة. ثماني خدمات. تصنيع وتركيب داخلي.",
      primaryCta: "ابدأ مشروعاً",
      secondaryCta: "شاهد ما نبنيه",
    },
    lifecycle: {
      eyebrow: "من نحن",
      title: "شريك إنتاج واحد. قدرات متعددة.",
      support: "فريق واحد يحمل كل مشروع من الرسم الفني إلى التركيب النهائي.",
      imageAlt: "حرفية الإنتاج والتركيب لدى CPS",
      items: [
        {
          title: "بيئات متعددة",
          description:
            "أجنحة معارض وهياكل فعاليات وتجهيزات داخلية تحمل الهوية وعروض تجزئة ولافتات وتصنيع مخصص — كلها تحت سقف واحد",
        },
        {
          title: "إنتاج داخلي",
          description: "إنتاج داخلي يشمل الخشب والمعدن والأكريليك والطباعة والتركيب",
        },
        {
          title: "نقطة اتصال واحدة",
          description: "نقطة اتصال واحدة من الفكرة حتى التسليم",
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
      body: "CPS شركة إنتاج وتصنيع وتجهيز داخلي تنفذ المعارض والفعاليات والمساحات الداخلية والعروض واللافتات في أنحاء السعودية.",
    },
    aboutPage: {
      eyebrow: "عن CPS",
      title: "نحوّل الأفكار إلى واقع.",
      lead: "شركة إنتاج وتصنيع وتجهيز داخلي تعمل في أنحاء المملكة العربية السعودية.",
      storyTitle: "قصتنا",
      storyHeadline: "شريك إنتاج واحد. قدرات متعددة.",
      story:
        "أجنحة معارض وهياكل فعاليات وبيئات تحمل الهوية وعروض تجزئة ولافتات وحلول مصنعة حسب الطلب — كلها تحت سقف واحد. تربط CPS التطوير الفني بالتصنيع والتنفيذ النهائي في الموقع عبر فريق واحد مسؤول.",
      storySecond:
        "تشمل قدراتنا الداخلية الخشب والمعدن والأكريليك والطباعة والتركيب، ما يمنح كل مشروع رقابة جودة أدق ومساراً أوضح إلى التسليم.",
      valuesTitle: "ما يميزنا",
      valuesSupport: "ما يبقى ثابتاً عبر كل مشروع لدى CPS.",
      values: [
        {
          title: "إنتاج داخلي",
          description: "إنتاج داخلي عبر كل التخصصات الرئيسية.",
        },
        {
          title: "فريق واحد مسؤول",
          description: "فريق واحد من الرسم الفني حتى التركيب والتسليم.",
        },
        {
          title: "تسليم على مستوى المملكة",
          description: "معاينة موقع وتوصيل وتفكيك على مستوى المملكة.",
        },
        {
          title: "خبرة مع علامات رائدة",
          description: "عملاء مؤكدون في السعودية عبر البنوك والاتصالات والتجزئة.",
        },
      ],
      studioTitle: "حيث يُنفذ كل مشروع",
      studioSupport: "أرض إنتاجنا وفريقنا، من المادة الخام إلى التركيب المكتمل.",
      studioItems: [
        {
          title: "ورشة مجهزة بالكامل",
          description: "كل ما يلزم للتصنيع داخلياً من البداية للنهاية.",
        },
        {
          title: "فريق داخلي ماهر",
          description: "حرفيون وفنيون، وليس عمالة متعاقدة من الخارج.",
        },
        {
          title: "رقابة جودة في كل مرحلة",
          description: "يُراجع قبل أن يغادر المصنع.",
        },
        {
          title: "مبني للتوسّع",
          description: "قادر على إدارة عدة مشاريع في الوقت نفسه.",
        },
      ],
      closingLine: "شريك إنتاج واحد. قدرات متعددة. مبنية حول مشروعك.",
      industriesTitle: "موثوقون عبر القطاعات",
      industriesItems: [
        "البنوك والمالية",
        "الحكومة والقطاع العام",
        "العقارات والإنشاءات",
        "الاتصالات والتقنية",
        "النفط والغاز والطاقة",
      ],
      industriesMore: "+١٥ قطاعاً آخر",
      industriesLogosTitle: "موثوقون عبر القطاعات",
      faqItems: [
        {
          question: "هل CPS شركة تصميم أم إنتاج أم الاثنين؟",
          answer:
            "الاثنين. نتولى التصميم والتصنيع والهوية والتركيب والتسليم داخلياً عبر المعارض والفعاليات والمساحات الداخلية والعروض واللافتات.",
        },
        {
          question: "هل تعملون مع عملاء خارج السعودية؟",
          answer:
            "تركيزنا الحالي هو التنفيذ عبر السعودية. إذا كان مشروعك في مكان آخر، تواصل معنا وسنؤكد ما هو ممكن.",
        },
        {
          question: "ما القطاعات التي تعملون معها عادة؟",
          answer:
            "نعمل عبر قطاعات واسعة، بما في ذلك المالية والحكومة والعقارات والاتصالات والطاقة والرعاية الصحية والتجزئة.",
        },
        {
          question: "ما الذي يميّز CPS عن شركات الإنتاج الأخرى؟",
          answer:
            "كل شيء يتولاه فريق داخلي واحد — بدون مقاولين من الباطن وبدون تسليمات بين مزوّدين. ما تعتمده هو بالضبط ما يُبنى.",
        },
        {
          question: "هل تستطيع CPS التعامل مع مشاريع بأي حجم؟",
          answer:
            "نعم — من العروض والأكشاك إلى المساحات الداخلية والفعاليات والأجنحة واسعة النطاق. فريقنا ومرافقنا مبنية للتوسع.",
        },
        {
          question: "كيف أبدأ مشروعاً مع CPS؟",
          answer:
            "تواصل عبر نموذج الاتصال — وسنحدد موعداً لنبريف لفهم أهدافك ونطاق العمل والجدول.",
        },
      ],
    },
    services: {
      eyebrow: "ماذا نقدم",
      title: "ثمان خدمات. أرض إنتاج واحدة.",
      support: "تصفح حسب الخدمة لمشاهدة الأعمال المميزة أو انتقل مباشرة إلى الكتالوج الكامل.",
      cta: "كل الخدمات",
      items: [
        {
          title: "المعارض والأجنحة",
          description: "بيئات معارض مخصصة وحلول معيارية وأجنحة واسعة النطاق.",
          image: media.boothTypes.custom,
          imageAlt: "بيئة معرض مخصصة",
          slug: "exhibitions-booths",
        },
        {
          title: "تصنيع وتجهيز الفعاليات",
          description: "منصات وهياكل مشهدية وبيئات تحمل الهوية وتجارب تفاعلية.",
          image: media.boothTypes.outdoor,
          imageAlt: "تجهيز فعالية",
          slug: "event-fabrication",
        },
        {
          title: "التجهيزات الداخلية",
          description: "مساحات تجارية ومكاتب وصالات عرض ومتاجر وبيئات تحمل الهوية.",
          image: media.about.studio,
          imageAlt: "تجهيز مساحة تجارية",
          slug: "fit-out-interiors",
        },
        {
          title: "عروض ونقاط البيع",
          description: "جندولات وحوامل منتجات ووحدات نقاط بيع وأكشاك وواجهات عرض.",
          image: media.boothTypes.kiosk,
          imageAlt: "عرض تجزئة",
          slug: "retail-displays",
        },
        {
          title: "التصنيع المخصص",
          description: "تصنيع بالخشب والمعدن والأكريليك وCNC والمواد المختلطة.",
          image: media.services.fabrication,
          imageAlt: "ورشة تصنيع مخصص",
          slug: "custom-fabrication",
        },
        { title: "الطباعة واللافتات", description: "رسومات كبيرة وهوية بيئية وأنظمة لافتات.", image: media.services.branding, imageAlt: "الطباعة واللافتات", slug: "printing-signage" },
        { title: "حلول التأجير", description: "أصول قابلة لإعادة الاستخدام للفعاليات والمعارض والعرض.", image: media.services.storage, imageAlt: "مخزون التأجير", slug: "rental-solutions" },
        { title: "التركيب وتسليم المشاريع", description: "تخطيط فني ولوجستيات وتركيب وتخزين وصيانة.", image: media.services.installation, imageAlt: "التركيب في الموقع", slug: "installation-project-delivery" },
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
      title: "فريق واحد من الفكرة حتى التركيب النهائي",
      support: "كل شيء يبقى داخلياً، فلا يضيع شيء بين المقاولين الفرعيين.",
      clientsLine: "نُفّذ لـ Ajlan & Bros وSNB وSAB وSirar by STC وAl Hilal",
      reasons: [
        {
          title: "إنتاج داخلي",
          description: "ينتج فريق واحد مسؤول أعمال الخشب والمعدن والأكريليك والطباعة واللافتات.",
        },
        {
          title: "تسليم على مستوى المملكة",
          description: "ننسق معاينة الموقع والتركيب والتفكيك في أنحاء السعودية.",
        },
        {
          title: "نقطة اتصال واحدة",
          description: "يتولى فريق واحد العمل من الرسم الفني حتى التركيب والتسليم.",
        },
        {
          title: "سجل تسليم مثبت",
          description: "نفذنا لعلامات سعودية رائدة في قطاعات البنوك والاتصالات والتجزئة.",
        },
      ],
      primary: {
        title: "إنتاج داخلي",
        description:
          "إنتاج داخلي يشمل الخشب والمعدن والأكريليك والطباعة واللافتات — أرض إنتاج واحدة مسؤولة.",
        cta: "ابدأ مشروعاً",
        href: "/contact",
      },
      secondary: {
        title: "تسليم على مستوى المملكة",
        description:
          "معاينة موقع وتركيب وتفكيك — مع نقطة اتصال واحدة من الرسم الفني حتى التسليم.",
        cta: "شاهد قدراتنا",
        href: "/production-capabilities",
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
      title: "أسئلة عن CPS",
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
      eyebrow: "أعمالنا",
      title: "أحدث الأعمال",
      support: "نظرة على ما خرج من منشأتنا مؤخرًا عبر مختلف الخدمات.",
      items: workItems("ar"),
      viewAll: "كل المشاريع",
    },
    workPage: {
      eyebrow: "الأعمال",
      title: "مشاريع مختارة",
      lead: "معارض وفعاليات ومساحات داخلية وعروض نُفذت عبر خدمات وقطاعات متعددة.",
    },
    industriesPage: {
      eyebrow: "قطاعاتنا",
      title: "القطاعات",
      lead: "حلول أجنحة مبنية حول تحديات كل قطاع.",
    },
    locationsPage: {
      eyebrow: "المدن",
      title: "المواقع",
      lead: "حضور عبر أبرز مدن المملكة العربية السعودية.",
    },
    newsPage: {
      eyebrow: "رؤى",
      title: "رؤى",
      lead: "أفكار عملية من أرض المعارض وورشة الإنتاج.",
    },
    projectPage: {
      challenge: "التحدي",
      approach: "حل CPS",
      outcome: "النتيجة",
      gallery: "المعرض",
      next: "المشروع التالي",
      back: "كل الأعمال",
    },
    contact: {
      eyebrow: "تواصل",
      title: "لنخطّط لمشروعك القادم",
      support:
        "شاركنا ما تبنيه — جناح أو فعالية أو تجهيز داخلي أو عرض أو تصنيع — ونعود بخطوة تالية واضحة.",
      emailLabel: "ابدأ مشروعاً",
      whatsappLabel: "واتساب",
    },
    briefForm: getBriefFormCopy("ar"),
    contactPage: {
      eyebrow: "تواصل",
      title: "نبدأ بمحادثة.",
      lead: "شاركنا تفاصيل مشروعك — نعود بخطوة تالية واضحة.",
      businessHours: "الأحد–الخميس، 9:00–18:00",
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
        { label: "الرياض", href: "/locations/riyadh" },
        { label: "جدة", href: "/locations/jeddah" },
        { label: "الدمام", href: "/locations/dammam" },
        { label: "الخبر", href: "/locations/khobar" },
        { label: "مكة", href: "/locations/makkah" },
        { label: "المدينة", href: "/locations/madinah" },
        { label: "نيوم", href: "/locations/neom" },
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
