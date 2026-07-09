import type { Dictionary } from "@/content/dictionaries.local";
import { getMailtoUrl, getSiteConfig, getWhatsAppUrl } from "@/lib/site-config";

type ContactSectionProps = {
  content: Dictionary["contact"];
};

export function ContactSection({ content }: ContactSectionProps) {
  const config = getSiteConfig();

  return (
    <section id="contact" className="contact-section scroll-mt-24">
      <div className="site-container contact-inner">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="display contact-title">{content.title}</h2>
          <div className="contact-actions">
            <a
              href={getMailtoUrl({ subject: "Project inquiry — CPS" })}
              className="btn-primary"
            >
              {content.emailLabel}
            </a>
            <a
              href={getWhatsAppUrl()}
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.whatsappLabel}
            </a>
          </div>
        </div>

        <div className="contact-meta">
          <a href={`mailto:${config.email}`} className="contact-link">
            {config.email}
          </a>
          <a href={`tel:${config.phone}`} className="contact-link" dir="ltr">
            {config.phoneDisplay}
          </a>
          <p className="contact-place">
            {config.address.city}, {config.address.countryName}
          </p>
        </div>
      </div>
    </section>
  );
}
