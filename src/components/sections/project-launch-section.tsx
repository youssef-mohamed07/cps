import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { localizePath, type Locale } from "@/lib/i18n";

type ProjectLaunchSectionProps = {
  locale: Locale;
  title: string;
  support: string;
  eyebrow?: string;
  ctaLabel?: string;
  href?: string;
};

export function ProjectLaunchSection({
  locale,
  title,
  support,
  eyebrow,
  ctaLabel,
  href = "/contact",
}: ProjectLaunchSectionProps) {
  const ar = locale === "ar";

  return (
    <section className="project-launch">
      <div className="site-container">
        <div className="project-launch-shell">
          <div className="project-launch-copy">
            <p className="eyebrow">
              {eyebrow ?? (ar ? "مشروع جديد" : "NEW PROJECT")}
            </p>
            <h2>{title}</h2>
            <p className="project-launch-support">{support}</p>
          </div>

          <Link href={localizePath(href, locale)} className="project-launch-action">
            <span>{ctaLabel ?? (ar ? "ابدأ مشروعاً" : "Start a Project")}</span>
            <CtaArrow tone="navy" size="lg" />
          </Link>
        </div>
      </div>
    </section>
  );
}
