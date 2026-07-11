import Image from "next/image";
import { clientLogos, logosEyebrow } from "@/content/clients";
import type { Locale } from "@/lib/i18n";

type LogosSectionProps = {
  locale: Locale;
};

export function LogosSection({ locale }: LogosSectionProps) {
  const label = logosEyebrow(locale);
  const track = [...clientLogos, ...clientLogos];

  return (
    <section className="logos-section" aria-label={label}>
      <div className="site-container">
        <p className="eyebrow logos-eyebrow">{label}</p>
      </div>

      <div className="logos-marquee" role="presentation">
        <ul className="logos-track">
          {track.map((logo, index) => (
            <li
              key={`${logo.src}-${index}`}
              className="logos-item"
              aria-hidden={index >= clientLogos.length}
            >
              <Image
                src={logo.src}
                alt={index < clientLogos.length ? logo.name : ""}
                width={160}
                height={48}
                className="logos-image"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
