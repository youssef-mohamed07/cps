import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { localizePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";
import type { ReactNode } from "react";

/* ── Inline SVG icons (48×48 viewBox, stroke-only) ── */
const whyCpsIcons: Record<string, ReactNode> = {
  factory: (
    <>
      <path d="M8 40V22l10 6V22l10 6V16l12-4v28H8Z" />
      <path d="M14 40v-6h6v6M24 40v-6h6v6" />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="14" />
      <path d="M10 24h28M24 10c4 4 6 9 6 14s-2 10-6 14c-4-4-6-9-6-14s2-10 6-14Z" />
    </>
  ),
  check: (
    <>
      <circle cx="24" cy="24" r="14" />
      <path d="M16 24l5 5 11-12" />
    </>
  ),
  growth: (
    <>
      <path d="M8 38h32" />
      <path d="M12 38V26l8-8 6 6 10-12" />
      <path d="M30 12h6v6" />
    </>
  ),
};

const whyCpsIconKeys = ["factory", "globe", "check", "growth"];

function WhyCpsIcon({ name }: { name: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {whyCpsIcons[name] ?? whyCpsIcons.factory}
    </svg>
  );
}

type WhyCpsSectionProps = {
  locale: Locale;
  content: Dictionary["whyCps"];
};

/** Homepage Why CPS section with the four Blueprint reasons. */
export function WhyCpsSection({ locale, content }: WhyCpsSectionProps) {
  const reasons = content.reasons ?? [
    { title: content.primary.title, description: content.primary.description },
    { title: content.secondary.title, description: content.secondary.description },
  ];

  return (
    <section id="why-cps" className="section-pad why-cps-section scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="section-head">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 className="display">{content.title}</h2>
            {content.support ? <p className="lede">{content.support}</p> : null}
            {content.clientsLine ? (
              <p className="why-cps-clients-line">{content.clientsLine}</p>
            ) : null}
          </div>
        </Reveal>

        <div className="why-cps-reasons">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={0.06 + index * 0.07}>
              <article className="why-cps-reason">
                <div className="why-cps-reason-head">
                  <span className="why-cps-reason-icon" aria-hidden="true">
                    <WhyCpsIcon name={whyCpsIconKeys[index] ?? "factory"} />
                  </span>
                  <span className="why-cps-reason-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="why-cps-actions">
            <Link href={localizePath(content.primary.href, locale)} className="btn-primary">
              <span>{content.primary.cta}</span>
              <CtaArrow size="md" />
            </Link>
            <Link href={localizePath(content.secondary.href, locale)} className="btn-secondary">
              <span>{content.secondary.cta}</span>
              <CtaArrow size="md" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
