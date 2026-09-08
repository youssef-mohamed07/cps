import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/quote-form";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { blueprintClientLogos } from "@/content/clients";
import { getQuoteFormCopy } from "@/content/quote-form.copy";
import {
  industrySlug,
  localizeText,
  serviceArchitecture,
  cataloguePath,
  servicePath,
  sharedProcess,
  type ServiceArchitecture,
} from "@/content/service-architecture";
import { localizePath, type Locale } from "@/lib/i18n";
import type { CmsProject } from "@/sanity/transformers/collections";

const industriesHeadline: Record<string, { en: string; ar: string }> = {
  "exhibitions-booths": {
    en: "Sectors we build exhibition booths for",
    ar: "قطاعات نبني لها أجنحة المعارض",
  },
  "event-fabrication": {
    en: "Sectors we build event structures for",
    ar: "قطاعات نبني لها هياكل الفعاليات",
  },
  "fit-out-interiors": {
    en: "Sectors we fit out for",
    ar: "قطاعات نجهّز لها المساحات",
  },
  "retail-displays": {
    en: "Sectors we produce displays for",
    ar: "قطاعات ننتج لها عروض التجزئة",
  },
  "custom-fabrication": {
    en: "Sectors we fabricate for",
    ar: "قطاعات نصنّع لها",
  },
  "printing-signage": {
    en: "Sectors we produce signage for",
    ar: "قطاعات ننتج لها اللافتات",
  },
  "rental-solutions": {
    en: "Sectors we rent to",
    ar: "قطاعات نقدّم لها التأجير",
  },
  "installation-project-delivery": {
    en: "Sectors we deliver for",
    ar: "قطاعات نسلّم لها المشاريع",
  },
};

const projectsHeadline: Record<string, { en: string; ar: string }> = {
  "exhibitions-booths": {
    en: "Recent exhibitions & booths projects",
    ar: "مشاريع معارض وأجنحة حديثة",
  },
  "event-fabrication": {
    en: "Recent event fabrication projects",
    ar: "مشاريع تجهيز فعاليات حديثة",
  },
  "fit-out-interiors": {
    en: "Recent fit-out & interiors projects",
    ar: "مشاريع تجهيز داخلي حديثة",
  },
  "retail-displays": {
    en: "Recent retail displays projects",
    ar: "مشاريع عروض تجزئة حديثة",
  },
  "custom-fabrication": {
    en: "Recent custom fabrication projects",
    ar: "مشاريع تصنيع مخصص حديثة",
  },
  "printing-signage": {
    en: "Recent printing & signage projects",
    ar: "مشاريع طباعة ولافتات حديثة",
  },
  "rental-solutions": {
    en: "Recent rental solutions projects",
    ar: "مشاريع حلول تأجير حديثة",
  },
  "installation-project-delivery": {
    en: "Recent installation & project delivery projects",
    ar: "مشاريع تركيب وتسليم حديثة",
  },
};

const projectsCta: Record<string, { en: string; ar: string }> = {
  "exhibitions-booths": {
    en: "View All Exhibitions & Booths Projects",
    ar: "عرض كل مشاريع المعارض والأجنحة",
  },
  "event-fabrication": {
    en: "View All Event Fabrication Projects",
    ar: "عرض كل مشاريع تجهيز الفعاليات",
  },
  "fit-out-interiors": {
    en: "View All Fit-Out & Interiors Projects",
    ar: "عرض كل مشاريع التجهيز الداخلي",
  },
  "retail-displays": {
    en: "View All Retail Displays Projects",
    ar: "عرض كل مشاريع عروض التجزئة",
  },
  "custom-fabrication": {
    en: "View All Custom Fabrication Projects",
    ar: "عرض كل مشاريع التصنيع المخصص",
  },
  "printing-signage": {
    en: "View All Printing & Signage Projects",
    ar: "عرض كل مشاريع الطباعة واللافتات",
  },
  "rental-solutions": {
    en: "View All Rental Solutions Projects",
    ar: "عرض كل مشاريع حلول التأجير",
  },
  "installation-project-delivery": {
    en: "View All Installation & Project Delivery Projects",
    ar: "عرض كل مشاريع التركيب وتسليم المشاريع",
  },
};

export function ServiceArchitecturePage({
  locale,
  service,
  projects,
}: {
  locale: Locale;
  service: ServiceArchitecture;
  projects: CmsProject[];
}) {
  const ar = locale === "ar";
  const quoteForm = getQuoteFormCopy(locale, "service");
  const catalogueOptions = service.catalogue.categories.flatMap((category) =>
    category.items.map((entry) => ({
      value: entry.slug,
      label: localizeText(entry.title, locale),
    })),
  );
  const featured = service.showcase.items;
  const totalCatalogueItems = service.catalogue.categories.reduce(
    (acc, cat) => acc + cat.items.length,
    0,
  );
  const related = service.related
    .map((slug) => serviceArchitecture.find((entry) => entry.slug === slug))
    .filter((entry): entry is ServiceArchitecture => Boolean(entry));
  const filteredProjects = projects
    .filter((project) => project.serviceSlug === service.slug)
    .slice(0, 3);
  const displayProjects =
    filteredProjects.length > 0 ? filteredProjects : projects.slice(0, 3);
  const hasSpecificProjects = filteredProjects.length > 0;
  const industryTitle = industriesHeadline[service.slug];
  const projectTitle = hasSpecificProjects
    ? projectsHeadline[service.slug]
    : {
        en: "Featured CPS Projects & Builds",
        ar: "مشاريع وأعمال مميزة من CPS",
      };
  const projectCta = hasSpecificProjects
    ? projectsCta[service.slug]
    : {
        en: "View All Projects",
        ar: "عرض كل المشاريع",
      };
  const allProjectsHref = hasSpecificProjects
    ? `/work?service=${service.slug}`
    : `/work`;
  const closingNoun = localizeText(service.closingNoun, locale);

  return (
    <>
      <section className="service-architecture-hero">
        <Image src={service.image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="service-architecture-hero-shade" />
        <div className="site-container service-architecture-hero-inner">
          <p className="eyebrow eyebrow-on-dark">{localizeText(service.title, locale)}</p>
          <h1>{localizeText(service.hero.headline, locale)}</h1>
          <p className="service-architecture-hero-lead">
            {localizeText(service.hero.support, locale)}
          </p>
          <ul>
            {service.hero.bullets.map((bullet) => (
              <li key={bullet.en}>{localizeText(bullet, locale)}</li>
            ))}
          </ul>
          <div className="service-architecture-hero-actions">
            <Link href="#quote" className="hero-cta">
              {ar ? "ابدأ مشروعاً" : "Start a Project"}
              <CtaArrow tone="white" size="sm" />
            </Link>
            <Link
              href={localizePath(cataloguePath(service.slug), locale)}
              className="hero-cta-ghost"
            >
              {localizeText(service.hero.catalogueCta, locale)}
            </Link>
          </div>
        </div>
      </section>

      <section className="service-trusted">
        <div className="site-container">
          <div className="service-trusted-copy">
            <p className="eyebrow">{ar ? "يثقون بنا" : "Trusted By"}</p>
            <h2 className="display">
              {ar
                ? "نفذنا لأسماء رائدة في السعودية"
                : "Delivered for leading brands in Saudi Arabia"}
            </h2>
            <p>
              {ar
                ? "مجموعة من العملاء الذين نفذت لهم CPS."
                : "A selection of clients CPS has produced for."}
            </p>
          </div>
          <div className="service-trusted-logos">
            {blueprintClientLogos.map((logo) => (
              <div key={logo.name} className="service-trusted-logo">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={140}
                  height={48}
                  className="object-contain"
                  unoptimized={logo.src.endsWith(".svg")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-showcase">
        <div className="site-container">
          <Reveal>
            <div className="service-showcase-header">
              <div className="service-showcase-header-copy">
                <p className="eyebrow">{localizeText(service.title, locale)}</p>
                <h2 className="display">{localizeText(service.showcase.title, locale)}</h2>
              </div>
              <Link
                href={localizePath(cataloguePath(service.slug), locale)}
                className="service-showcase-header-cta"
              >
                <span>{localizeText(service.hero.catalogueCta, locale)}</span>
                <CtaArrow size="sm" />
              </Link>
            </div>
          </Reveal>

          <div className="service-showcase-grid">
            {featured.map((entry, index) => (
              <Reveal
                key={entry.title.en}
                delay={index * 0.04}
                className="service-showcase-item-reveal"
              >
                <Link
                  href={localizePath(cataloguePath(service.slug), locale)}
                  className="service-showcase-card"
                >
                  <div className="service-showcase-card-header">
                    <span className="service-showcase-card-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="service-showcase-card-accent-dot"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="service-showcase-card-body">
                    <h3 className="service-showcase-card-title">
                      {localizeText(entry.title, locale)}
                    </h3>
                    <p className="service-showcase-card-desc">
                      {localizeText(entry.description, locale)}
                    </p>
                  </div>
                  <div className="service-showcase-card-footer">
                    <span className="service-showcase-card-link">
                      <span>{ar ? "استكشف في الكتالوج" : "Explore in catalogue"}</span>
                      <CtaArrow size="sm" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal
              delay={featured.length * 0.04}
              className="service-showcase-item-reveal"
            >
              <Link
                href={localizePath(cataloguePath(service.slug), locale)}
                className="service-showcase-card service-showcase-card-featured"
              >
                <div className="service-showcase-card-header">
                  <span className="service-showcase-badge">
                    {ar ? "الكتالوج الشامل" : "Full Catalogue"}
                  </span>
                  {totalCatalogueItems > 0 ? (
                    <span className="service-showcase-count-pill">
                      +{totalCatalogueItems} {ar ? "قدرة" : "Capabilities"}
                    </span>
                  ) : null}
                </div>
                <div className="service-showcase-card-body">
                  <h3 className="service-showcase-card-title">
                    {localizeText(service.catalogue.title, locale)}
                  </h3>
                  <p className="service-showcase-card-desc">
                    {localizeText(service.catalogue.support, locale)}
                  </p>
                </div>
                <div className="service-showcase-card-footer">
                  <span className="service-showcase-cta-action">
                    <span>{localizeText(service.hero.catalogueCta, locale)}</span>
                    <CtaArrow tone="cyan" size="sm" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="service-why-blueprint">
        <div className="site-container">
          <Reveal>
            <div className="service-why-blueprint-head">
              <p className="eyebrow eyebrow-on-dark">{ar ? "لماذا CPS" : "Why CPS"}</p>
              <h2 className="display display-on-dark">
                {localizeText(service.why.headline, locale)}
              </h2>
              <p className="service-why-blueprint-support">
                {localizeText(service.why.support, locale)}
              </p>
            </div>
          </Reveal>

          <div className="service-why-blueprint-grid">
            {service.why.items.map((entry, index) => (
              <Reveal key={entry.en} delay={index * 0.04}>
                <article className="service-why-blueprint-card">
                  <div className="service-why-blueprint-card-top">
                    <span
                      className="service-why-blueprint-card-number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="service-why-blueprint-card-icon"
                      aria-hidden="true"
                    >
                      {index === 0 ? (
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M3 21h18M5 21V7l7-4 7 4v14M9 10h2v4H9v-4zm6 0h2v4h-2v-4z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : index === 1 ? (
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 3v4M12 17v4M3 12h4M17 12h4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : index === 2 ? (
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 4v5M12 4v3M16 4v5M4 13h16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="service-why-blueprint-card-text">
                    {localizeText(entry, locale)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline
        eyebrow={ar ? "كيف نعمل" : "How We Work"}
        title={ar ? "من الموجز إلى التسليم" : "From brief to handover"}
        support={
          ar
            ? "نفس العملية من خمس خطوات خلف كل مشروع، مهما كانت الخدمة."
            : "The same five-step process behind every project, whatever the service."
        }
        steps={sharedProcess.map((step) => ({
          title: localizeText(step.title, locale),
          description: localizeText(step.description, locale),
        }))}
      />

      <section className="service-capabilities-link">
        <div className="site-container">
          <div>
            <p className="eyebrow">{ar ? "كيف نبني" : "How We Build"}</p>
            <h2 className="display">
              {ar
                ? "كل مشروع مدعوم بأرض إنتاج واحدة."
                : "Every project is backed by one production floor."}
            </h2>
          </div>
          <Link
            href={localizePath("/production-capabilities", locale)}
            className="btn-secondary"
          >
            {ar ? "شاهد قدرات الإنتاج" : "See Production Capabilities"}
          </Link>
        </div>
      </section>

      <section className="service-benefits">
        <div className="site-container">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">{ar ? "الفوائد" : "Benefits"}</p>
              <h2 className="display">{ar ? "ما تحصل عليه" : "What you get"}</h2>
            </div>
          </Reveal>
          <div className="service-benefits-grid">
            {service.benefits.map((entry, index) => (
              <Reveal key={entry.en} delay={index * 0.04}>
                <article className="service-benefit-card">
                  <div className="service-benefit-card-top">
                    <span
                      className="service-benefit-card-number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="service-benefit-card-check"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20" fill="none">
                        <path
                          d="M4 10.5l4 4L16 6.5"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="service-benefit-card-text">
                    {localizeText(entry, locale)}
                  </h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-industries">
        <div className="site-container service-industries-grid">
          <Reveal>
            <div className="service-industries-head">
              <p className="eyebrow">{ar ? "القطاعات" : "Industries"}</p>
              <h2 className="display">
                {industryTitle
                  ? ar
                    ? industryTitle.ar
                    : industryTitle.en
                  : ar
                    ? `قطاعات نبني لها ${localizeText(service.title, locale)}`
                    : `Sectors we build ${localizeText(service.title, locale).toLowerCase()} for`}
              </h2>
              <p className="service-industries-lead">
                {ar
                  ? "خبرات تصنيع متخصصة مصممة لتلبية متطلبات ومعايير كل قطاع بدقة."
                  : "Tailored fabrication expertise engineered to meet specific industry standards and footprints."}
              </p>
            </div>
          </Reveal>
          <div className="service-industries-links">
            {service.industries.map((entry, index) => (
              <Reveal key={entry.en} delay={index * 0.03}>
                <Link
                  href={localizePath(
                    `/work?service=${service.slug}&industry=${industrySlug(entry)}`,
                    locale,
                  )}
                  className="service-industry-tile"
                >
                  <span className="service-industry-tile-name">
                    <span
                      className="service-industry-tile-dot"
                      aria-hidden="true"
                    />
                    {localizeText(entry, locale)}
                  </span>
                  <span
                    className="service-industry-tile-arrow"
                    aria-hidden="true"
                  >
                    <CtaArrow size="sm" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-projects">
        <div className="site-container">
          <Reveal>
            <div className="service-projects-header">
              <div className="service-projects-header-copy">
                <p className="eyebrow">{ar ? "أعمالنا" : "Our Work"}</p>
                <h2 className="display">
                  {localizeText(projectTitle, locale)}
                </h2>
              </div>
              <Link
                href={localizePath(allProjectsHref, locale)}
                className="service-projects-header-cta"
              >
                <span>{localizeText(projectCta, locale)}</span>
                <CtaArrow size="sm" />
              </Link>
            </div>
          </Reveal>

          {displayProjects.length ? (
            <div className="service-projects-grid">
              {displayProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.05}>
                  <Link
                    href={localizePath(`/work/${project.slug}`, locale)}
                    className="service-project-card"
                  >
                    <div className="service-project-card-media">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="service-project-card-shade" />
                    </div>
                    <div className="service-project-card-content">
                      {project.category ? (
                        <span className="service-project-card-tag">
                          {project.category}
                        </span>
                      ) : null}
                      <h3 className="service-project-card-title">{project.title}</h3>
                      <span className="service-project-card-action">
                        <span>{ar ? "عرض دراسة الحالة" : "View Case Study"}</span>
                        <CtaArrow tone="cyan" size="sm" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <FaqSection
        eyebrow="FAQ"
        title={
          ar
            ? `أسئلة عن ${localizeText(service.title, locale)}`
            : `Questions about ${localizeText(service.title, locale)}`
        }
        support={
          ar
            ? "إجابات مباشرة عن الجداول والنطاق والتنفيذ قبل ما تبدأ."
            : "Straight answers on timelines, scope, and delivery — before you start."
        }
        items={service.faq.map((entry) => ({
          question: localizeText(entry.question, locale),
          answer: localizeText(entry.answer, locale),
        }))}
        className="service-faq"
      />

      {related.length ? (
        <section className="service-related-blueprint">
          <div className="site-container">
            <Reveal>
              <div className="service-related-head">
                <p className="eyebrow">{ar ? "خدمات ذات صلة" : "Related Services"}</p>
                <h2 className="display">{ar ? "أكمل مشروعك" : "Complete the build"}</h2>
                <p className="service-related-lead">
                  {ar
                    ? "حلول متكاملة تكمّل مساحتك وتضمن تناغم التصميم والإنتاج."
                    : "Integrated capabilities to complement your space with unified fabrication standards."}
                </p>
              </div>
            </Reveal>
            <div className="service-related-blueprint-grid">
              {related.map((entry, index) => (
                <Reveal key={entry.slug} delay={index * 0.04}>
                  <Link
                    href={localizePath(servicePath(entry.slug), locale)}
                    className="service-related-card"
                  >
                    <div className="service-related-card-media">
                      <Image
                        src={entry.image}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="service-related-card-shade" />
                    </div>
                    <div className="service-related-card-content">
                      <span className="service-related-card-tag">
                        {ar ? "خدمة مكملة" : "Complementary"}
                      </span>
                      <h3 className="service-related-card-title">
                        {localizeText(entry.title, locale)}
                      </h3>
                      <span className="service-related-card-action">
                        <span>{ar ? "استكشف الخدمة" : "Explore Service"}</span>
                        <CtaArrow size="sm" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="quote" className="service-quote section-pad scroll-mt-24">
        <div className="site-container service-quote-grid">
          <div className="brief-form-intro">
            <p className="eyebrow">{quoteForm.eyebrow}</p>
            <h2 className="display">{quoteForm.title}</h2>
            <p>{quoteForm.support}</p>
          </div>
          <div className="brief-form-shell">
            <Suspense fallback={<div className="quote-form-loading" />}>
              <QuoteForm
                locale={locale}
                copy={quoteForm}
                options={catalogueOptions}
                contextLabel={`${localizeText(service.title, locale)} (${service.slug})`}
                requestType={
                  service.slug === "installation-project-delivery"
                    ? "service-add-on"
                    : "quote"
                }
              />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="service-closing">
        <div className="site-container">
          <h2 className="display display-on-dark">
            {ar
              ? `جاهز لبناء ${closingNoun} القادم؟`
              : `Ready to build your next ${closingNoun}?`}
          </h2>
          <p>
            {ar
              ? "أخبرنا بما تبنيه وسنعود إليك بالخطوة التالية."
              : "Tell us what you're building and we'll get back to you with next steps."}
          </p>
          <Link href={localizePath("/contact", locale)} className="btn-primary">
            {ar ? "ابدأ مشروعاً" : "Start a Project"}
            <CtaArrow size="sm" />
          </Link>
        </div>
      </section>
    </>
  );
}
