import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/quote-form";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { industrySlug, localizeText, serviceArchitecture, cataloguePath, servicePath, sharedProcess, type ServiceArchitecture } from "@/content/service-architecture";
import { localizePath, type Locale } from "@/lib/i18n";
import type { CmsProject } from "@/sanity/transformers/collections";

export function ServiceArchitecturePage({ locale, service, projects }: { locale: Locale; service: ServiceArchitecture; projects: CmsProject[] }) {
  const ar = locale === "ar";
  const featured = service.showcase.items;
  const related = service.related.map((slug) => serviceArchitecture.find((entry) => entry.slug === slug)).filter((entry): entry is ServiceArchitecture => Boolean(entry));
  const filteredProjects = projects.filter((project) => project.serviceSlug === service.slug).slice(0, 3);
  return (
    <>
      <section className="service-architecture-hero">
        <Image src={service.image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="service-architecture-hero-shade" />
        <div className="site-container service-architecture-hero-inner">
          <p className="eyebrow eyebrow-on-dark">{localizeText(service.title, locale)}</p>
          <h1>{localizeText(service.hero.headline, locale)}</h1>
          <p className="service-architecture-hero-lead">{localizeText(service.hero.support, locale)}</p>
          <ul>{service.hero.bullets.map((bullet) => <li key={bullet.en}>{localizeText(bullet, locale)}</li>)}</ul>
          <div className="service-architecture-hero-actions">
            <Link href="#quote" className="hero-cta">{ar ? "ابدأ مشروعاً" : "Start a Project"}<CtaArrow tone="white" size="sm" /></Link>
            <Link href={localizePath(cataloguePath(service.slug), locale)} className="hero-cta-ghost">{localizeText(service.hero.catalogueCta, locale)}</Link>
          </div>
        </div>
      </section>

      <section className="service-trusted">
        <div className="site-container">
          <div className="service-trusted-copy"><p className="eyebrow">{ar ? "يثقون بنا" : "Trusted By"}</p><h2>{ar ? "نفذنا لأسماء رائدة في السعودية" : "Delivered for leading brands in Saudi Arabia"}</h2><p>{ar ? "مجموعة من العملاء الذين نفذت لهم CPS." : "A selection of clients CPS has produced for."}</p></div>
          <div className="service-trusted-list"><span>Ajlan & Bros</span><span>SNB</span><span>SAB</span><span>Sirar by STC</span><span>Al Hilal</span></div>
        </div>
      </section>

      <section className="service-showcase section-pad">
        <div className="site-container">
          <Reveal><div className="section-head"><p className="eyebrow">{localizeText(service.title, locale)}</p><h2 className="display">{localizeText(service.showcase.title, locale)}</h2></div></Reveal>
          <div className={`service-showcase-grid${featured.length === 4 ? " service-showcase-grid--four" : ""}`}>{featured.map((entry, index) => <Reveal key={entry.title.en} delay={index * 0.04}><article><span>{String(index + 1).padStart(2, "0")}</span><h3>{localizeText(entry.title, locale)}</h3><p>{localizeText(entry.description, locale)}</p></article></Reveal>)}</div>
          <Link href={localizePath(cataloguePath(service.slug), locale)} className="service-showcase-all">{localizeText(service.hero.catalogueCta, locale)}<CtaArrow size="sm" /></Link>
        </div>
      </section>

      <section className="service-why-blueprint">
        <div className="site-container service-why-blueprint-grid">
          <Reveal><div><p className="eyebrow eyebrow-on-dark">{ar ? "لماذا CPS" : "Why CPS"}</p><h2>{localizeText(service.why.headline, locale)}</h2><p>{localizeText(service.why.support, locale)}</p></div></Reveal>
          <div className="service-why-blueprint-items">{service.why.items.map((entry, index) => <Reveal key={entry.en} delay={index * 0.05}><article><span>{String(index + 1).padStart(2, "0")}</span><p>{localizeText(entry, locale)}</p></article></Reveal>)}</div>
        </div>
      </section>

      <ProcessTimeline eyebrow={ar ? "كيف نعمل" : "How We Work"} title={ar ? "من الموجز إلى التسليم" : "From brief to handover"} support={ar ? "خمس مراحل واضحة خلف كل مشروع." : "The same five-step process behind every project."} steps={sharedProcess.map((step) => ({ title: localizeText(step.title, locale), description: localizeText(step.description, locale) }))} />

      <section className="service-capabilities-link"><div className="site-container"><div><p className="eyebrow">{ar ? "كيف نبني" : "How We Build"}</p><h2>{ar ? "كل مشروع مدعوم بأرض إنتاج واحدة." : "Every project is backed by one production floor."}</h2></div><Link href={localizePath("/production-capabilities", locale)} className="btn-secondary">{ar ? "شاهد قدرات الإنتاج" : "See Production Capabilities"}</Link></div></section>

      <section className="service-benefits section-pad"><div className="site-container"><div className="section-head"><p className="eyebrow">{ar ? "الفوائد" : "Benefits"}</p><h2 className="display">{ar ? "ما تحصل عليه" : "What you get"}</h2></div><div className="service-benefits-grid">{service.benefits.map((entry, index) => <article key={entry.en}><span>{String(index + 1).padStart(2, "0")}</span><p>{localizeText(entry, locale)}</p></article>)}</div></div></section>

      <section className="service-industries"><div className="site-container service-industries-grid"><div><p className="eyebrow">{ar ? "القطاعات" : "Industries"}</p><h2>{ar ? "قطاعات نعمل معها" : "Sectors we build for"}</h2></div><div className="service-industries-links">{service.industries.map((entry) => <Link key={entry.en} href={localizePath(`/work?service=${service.slug}&industry=${industrySlug(entry)}`, locale)}>{localizeText(entry, locale)}<CtaArrow size="sm" /></Link>)}</div></div></section>

      {related.length ? <section className="service-related-blueprint section-pad"><div className="site-container"><div className="section-head"><p className="eyebrow">{ar ? "خدمات ذات صلة" : "Related Services"}</p><h2 className="display">{ar ? "أكمل مشروعك" : "Complete the build"}</h2></div><div className="service-related-blueprint-grid">{related.map((entry) => <Link key={entry.slug} href={localizePath(servicePath(entry.slug), locale)}><Image src={entry.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover" /><span>{localizeText(entry.title, locale)}</span></Link>)}</div></div></section> : null}

      <section className="service-projects section-pad"><div className="site-container"><div className="section-head"><p className="eyebrow">{ar ? "أعمالنا" : "Our Work"}</p><h2 className="display">{ar ? `مشاريع ${localizeText(service.title, locale)} حديثة` : `Recent ${localizeText(service.title, locale)} projects`}</h2><p className="lede">{ar ? "تُسحب المشاريع تلقائياً من أعمالنا حسب الخدمة." : "Projects are pulled automatically from our work and filtered to this service."}</p></div>{filteredProjects.length ? <div className="service-projects-grid">{filteredProjects.map((project) => <Link key={project.slug} href={localizePath(`/work/${project.slug}`, locale)}><Image src={project.image} alt={project.imageAlt} fill sizes="(max-width: 700px) 100vw, 33vw" className="object-cover" /><span>{project.title}</span></Link>)}</div> : <p className="catalogue-empty">{ar ? "ستظهر دراسات الحالة المنشورة لهذه الخدمة هنا." : "Published case studies for this service will appear here."}</p>}<Link className="service-showcase-all" href={localizePath(`/work?service=${service.slug}`, locale)}>{ar ? "عرض كل المشاريع" : "View all projects"}<CtaArrow size="sm" /></Link></div></section>

      <FaqSection
        eyebrow="FAQ"
        title={ar ? `أسئلة عن ${localizeText(service.title, locale)}` : `Questions about ${localizeText(service.title, locale)}`}
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

      <section id="quote" className="service-quote section-pad scroll-mt-24"><div className="site-container service-quote-grid"><div className="brief-form-intro"><p className="eyebrow">{ar ? "اطلب عرض سعر" : "Get a Quote"}</p><h2>{ar ? "جاهز لبدء مشروعك؟" : "Ready to start your project?"}</h2><p>{ar ? "أخبرنا بما تحتاجه وسنتواصل معك بالخطوة التالية." : "Tell us what you need and we will follow up with next steps."}</p></div><div className="brief-form-shell"><Suspense fallback={<div className="quote-form-loading" />}><QuoteForm locale={locale} serviceSlug={service.slug} serviceTitle={localizeText(service.title, locale)} categories={service.catalogue.categories} /></Suspense></div></div></section>

      <section className="service-closing"><div className="site-container"><h2>{ar ? `جاهز لبناء ${localizeText(service.closingNoun, locale)} التالي؟` : `Ready to build your next ${localizeText(service.closingNoun, locale)}?`}</h2><p>{ar ? "أخبرنا بما تبنيه وسنعود إليك بالخطوات التالية." : "Tell us what you are building and we will get back to you with next steps."}</p><Link href="#quote" className="btn-primary">{ar ? "ابدأ مشروعاً" : "Start a Project"}</Link></div></section>
    </>
  );
}
