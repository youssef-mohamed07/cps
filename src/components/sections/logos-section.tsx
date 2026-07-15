import Image from "next/image";
import { logosEyebrow } from "@/content/clients";
import type { Locale } from "@/lib/i18n";
import { loadClients } from "@/sanity/load-collections";

type LogosSectionProps = {
  locale: Locale;
};

export async function LogosSection({ locale }: LogosSectionProps) {
  const label = logosEyebrow(locale);
  const logos = await loadClients(locale);
  const track = [...logos, ...logos];

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
              aria-hidden={index >= logos.length}
            >
              <Image
                src={logo.src}
                alt={index < logos.length ? logo.name : ""}
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
