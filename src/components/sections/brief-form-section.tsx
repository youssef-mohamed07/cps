import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { getContactFormCopy } from "@/content/contact-form.copy";
import type { Locale } from "@/lib/i18n";

type BriefFormSectionProps = {
  id?: string;
  locale: Locale;
};

/** Shared role-based contact form used on inner pages and `/contact`. */
export function BriefFormSection({
  id = "brief",
  locale,
}: BriefFormSectionProps) {
  const copy = getContactFormCopy(locale);

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
              <ContactForm locale={locale} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
