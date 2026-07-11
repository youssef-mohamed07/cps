import type { Dictionary } from "@/content/dictionaries.local";
import { getMailtoUrl, getSiteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";

type ContactSectionProps = {
  content: Dictionary["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  const config = getSiteConfig();

  return (
    <section id="contact" className="contact-section scroll-mt-24">
      <div className="site-container contact-inner">
        <Reveal>
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="display contact-title">{content.title}</h2>
            <div className="contact-actions">
                <a
                  href={getMailtoUrl({ subject: "Quote request — CPS" })}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <MotionIcon name="email" size={22} trigger="hover" tone="white" />
                  {content.emailLabel}
                  <CtaArrow tone="white" />
                </a>
              <a
                href={getWhatsAppUrl()}
                className="btn-secondary inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MotionIcon name="phone" size={22} trigger="hover" />
                {content.whatsappLabel}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="contact-meta">
            <a href={`mailto:${config.email}`} className="contact-link contact-link-row">
              <MotionIcon name="email" size={28} trigger="hover" />
              {config.email}
            </a>
            <a
              href={`tel:${config.phone}`}
              className="contact-link contact-link-row"
              dir="ltr"
            >
              <MotionIcon name="phone" size={28} trigger="hover" />
              {config.phoneDisplay}
            </a>
            <p className="contact-place contact-link-row">
              <MotionIcon name="location" size={28} trigger="hover" />
              {config.address.city}, {config.address.countryName}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
