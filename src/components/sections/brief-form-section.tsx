import { BriefForm } from "@/components/forms/brief-form";
import { Reveal } from "@/components/motion/reveal";
import type { BriefFormCopy } from "@/content/brief-form.copy";
import type { Locale } from "@/lib/i18n";

type BriefFormSectionProps = {
  id?: string;
  locale: Locale;
  copy: BriefFormCopy;
};

export function BriefFormSection({ id = "brief", locale, copy }: BriefFormSectionProps) {
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
              <BriefForm locale={locale} copy={copy} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
