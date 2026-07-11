import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PageHero } from "@/components/sections/page-hero";
import { localizePath, type Locale } from "@/lib/i18n";

type LegalPageProps = {
  locale: Locale;
  title: string;
  lead: string;
  body: readonly string[];
};

export function LegalPage({ locale, title, lead, body }: LegalPageProps) {
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: title },
        ]}
      />
      <PageHero
        eyebrow={locale === "ar" ? "معلومات قانونية" : "Legal information"}
        title={title}
        lead={lead}
      />
      <section className="section-pad legal-page">
        <div className="site-container legal-page-layout">
          <aside className="legal-page-aside">
            <p className="eyebrow">{locale === "ar" ? "سياسة CPS" : "CPS policy"}</p>
            <p>
              {locale === "ar"
                ? "نسخة واضحة ومختصرة من سياستنا الحالية."
                : "A clear, concise version of our current policy."}
            </p>
          </aside>
          <div className="legal-page-copy">
            {body.map((paragraph, index) => (
              <article key={paragraph.slice(0, 24)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{paragraph}</p>
              </article>
            ))}
            <Link href={localizePath("/contact", locale)} className="btn-secondary">
              {locale === "ar" ? "تواصل معنا" : "Contact us"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
