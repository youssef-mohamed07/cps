import Image from "next/image";
import Link from "next/link";
import type { FooterConfig, FooterSocial } from "@/content/footer";
import { localizePath, type Locale } from "@/lib/i18n";
import { getSiteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { CtaArrow } from "@/components/motion/cta-arrow";

type FooterColumnLink = { label: string; href: string };

type SiteFooterProps = {
  locale: Locale;
  footer: FooterConfig;
  serviceLinks: FooterColumnLink[];
  boothTypeLinks: FooterColumnLink[];
};

function SocialIcon({ platform }: { platform: string }) {
  const key = platform.toLowerCase();
  if (key.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
        <path
          fill="currentColor"
          d="M6.5 8.5H3.5V20.5H6.5V8.5ZM5 3.5A1.75 1.75 0 1 0 5 7A1.75 1.75 0 0 0 5 3.5ZM20.5 20.5H17.5V14.3C17.5 12.7 16.9 11.8 15.6 11.8C14.2 11.8 13.5 12.7 13.5 14.3V20.5H10.5V8.5H13.5V10C14 9.1 15.2 8.2 17 8.2C19.5 8.2 20.5 9.8 20.5 12.8V20.5Z"
        />
      </svg>
    );
  }
  if (key.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
        <path
          fill="currentColor"
          d="M7 3H17A4 4 0 0 1 21 7V17A4 4 0 0 1 17 21H7A4 4 0 0 1 3 17V7A4 4 0 0 1 7 3ZM12 8A4 4 0 1 0 12 16A4 4 0 0 0 12 8ZM18 6.5A1 1 0 1 0 18 8.5A1 1 0 0 0 18 6.5Z"
        />
      </svg>
    );
  }
  if (key.includes("facebook")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
        <path
          fill="currentColor"
          d="M14 9H17V6H14C11.8 6 10 7.8 10 10V12H8V15H10V22H13V15H16L17 12H13V10C13 9.4 13.4 9 14 9Z"
        />
      </svg>
    );
  }
  if (key === "x" || key.includes("twitter")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
        <path
          fill="currentColor"
          d="M4 4H8.2L12.1 9.4L16.8 4H20L13.9 11.2L20.5 20H16.3L12 14.2L6.9 20H3.2L9.7 12.4L4 4Z"
        />
      </svg>
    );
  }
  if (key.includes("youtube")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social-icon">
        <path
          fill="currentColor"
          d="M21.6 7.2A2.7 2.7 0 0 0 19.7 5.3C18 5 12 5 12 5S6 5 4.3 5.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12A28 28 0 0 0 2.4 16.8 2.7 2.7 0 0 0 4.3 18.7C6 19 12 19 12 19S18 19 19.7 18.7A2.7 2.7 0 0 0 21.6 16.8 28 28 0 0 0 22 12 28 28 0 0 0 21.6 7.2ZM10 15.2V8.8L15.5 12L10 15.2Z"
        />
      </svg>
    );
  }
  return <span className="footer-social-fallback">{platform.slice(0, 1).toUpperCase()}</span>;
}

function socialLabel(link: FooterSocial) {
  return link.label || link.platform;
}

function FooterNavColumn({
  locale,
  title,
  links,
  maxLinks,
  viewAllHref,
  viewAllLabel,
}: {
  locale: Locale;
  title: string;
  links: FooterColumnLink[];
  maxLinks?: number;
  viewAllHref?: string;
  viewAllLabel?: string;
}) {
  const visible = maxLinks ? links.slice(0, maxLinks) : links;
  const showViewAll = Boolean(viewAllHref && viewAllLabel);

  return (
    <nav className="footer-col" aria-label={title}>
      <h3 className="footer-col-title">{title}</h3>
      <ul className="footer-link-list">
        {visible.map((link) => (
          <li key={link.href + link.label}>
            <Link href={localizePath(link.href, locale)} className="footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {showViewAll && viewAllHref && viewAllLabel ? (
        <Link href={localizePath(viewAllHref, locale)} className="footer-view-all">
          {viewAllLabel}
        </Link>
      ) : null}
    </nav>
  );
}

export function SiteFooter({
  locale,
  footer,
  serviceLinks,
  boothTypeLinks,
}: SiteFooterProps) {
  const config = getSiteConfig();
  const year = new Date().getFullYear();
  const whatsappHref = getWhatsAppUrl();
  const viewAllLabel = locale === "ar" ? "عرض الكل" : "View all";

  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <div className="footer-brand">
          <div className="footer-brand-copy">
            <Link href={localizePath("/", locale)} className="footer-logo" aria-label={config.name}>
              <Image
                src={footer.logo}
                alt={footer.logoAlt}
                width={180}
                height={64}
                className="footer-logo-image"
              />
            </Link>
            <p className="footer-description">{footer.description}</p>
          </div>
          <div className="footer-brand-actions">
            <Link href={localizePath(footer.cta.href, locale)} className="footer-cta">
              <span>{footer.cta.label}</span>
              <CtaArrow size="md" />
            </Link>
            {footer.socialLinks.length ? (
              <ul className="footer-social">
                {footer.socialLinks.map((link) => (
                  <li key={link.platform + link.url}>
                    <a
                      href={link.url}
                      className="footer-social-link"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={socialLabel(link)}
                      title={socialLabel(link)}
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="footer-menu">
          <FooterNavColumn
            locale={locale}
            title={footer.companyLinksTitle}
            links={footer.companyLinks}
          />

          {footer.showServices && serviceLinks.length ? (
            <FooterNavColumn
              locale={locale}
              title={footer.servicesTitle}
              links={serviceLinks}
              maxLinks={4}
              viewAllHref="/services"
              viewAllLabel={viewAllLabel}
            />
          ) : null}

          {footer.showBoothTypes && boothTypeLinks.length ? (
            <FooterNavColumn
              locale={locale}
              title={footer.boothTypesTitle}
              links={boothTypeLinks}
              maxLinks={4}
              viewAllHref="/booth-types"
              viewAllLabel={viewAllLabel}
            />
          ) : null}

          <section className="footer-col" aria-label={footer.contactTitle}>
            <h3 className="footer-col-title">{footer.contactTitle}</h3>
            <div className="footer-contact">
              {footer.officeAddress ? (
                <p className="footer-contact-block">{footer.officeAddress}</p>
              ) : null}
              {footer.phoneDisplay ? (
                <a href={`tel:${footer.phoneHref}`} className="footer-link" dir="ltr">
                  {footer.phoneDisplay}
                </a>
              ) : null}
              {footer.email ? (
                <a href={`mailto:${footer.email}`} className="footer-link">
                  {footer.email}
                </a>
              ) : null}
              <a href={whatsappHref} className="footer-link" target="_blank" rel="noreferrer">
                {footer.whatsappLabel}
              </a>
            </div>
          </section>
        </div>

        {footer.locations.length ? (
          <nav className="footer-locations" aria-label={footer.locationsTitle}>
            <p className="footer-locations-label">{footer.locationsTitle}</p>
            <ul className="footer-locations-list">
              {footer.locations.map((link, index) => (
                <li key={link.href}>
                  {index > 0 ? (
                    <span className="footer-locations-sep" aria-hidden="true">
                      ·
                    </span>
                  ) : null}
                  <Link href={localizePath(link.href, locale)} className="footer-location-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      <div className="footer-bottom">
        <div className="site-container footer-bottom-inner">
          <p>
            © {year} {config.legalName || config.name}. {footer.rights}
          </p>
          <nav className="footer-bottom-links" aria-label="Legal">
            {footer.bottomLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={
                  link.href.endsWith(".xml")
                    ? link.href
                    : localizePath(link.href, locale)
                }
                className="footer-bottom-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
