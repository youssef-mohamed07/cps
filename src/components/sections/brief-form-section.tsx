import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/quote-form";
import { Reveal } from "@/components/motion/reveal";
import {
  contactServiceOptions,
  getQuoteFormCopy,
} from "@/content/quote-form.copy";
import type { Locale } from "@/lib/i18n";

type BriefFormSectionProps = {
  id?: string;
  locale: Locale;
};

/** Shared project form (Blueprint Get a Quote) on inner pages. */
export function BriefFormSection({
  id = "brief",
  locale,
}: BriefFormSectionProps) {
  const copy = getQuoteFormCopy(locale, "contact");

  return (
    <section id={id} className="section-pad brief-form-section scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="brief-form-layout">
            <div className="brief-form-intro">
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2 className="display">{copy.title}</h2>
              <p className="lede">{copy.support}</p>
            </div>

            <div className="brief-form-shell">
              <Suspense fallback={<div className="quote-form-loading" />}>
                <QuoteForm
                  locale={locale}
                  copy={copy}
                  options={contactServiceOptions[locale]}
                  contextLabel="Inner page brief"
                  requestType="contact"
                  preferUrlItem={false}
                />
              </Suspense>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
