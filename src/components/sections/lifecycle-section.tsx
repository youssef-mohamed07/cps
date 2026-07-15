import Image from "next/image";
import type { ReactNode } from "react";
import { media } from "@/content/media";
import { lifecycleIcons } from "@/content/motion-icons";
import { Reveal } from "@/components/motion/reveal";

type LifecycleItem = { title: string; description: string };

type LifecycleSectionProps = {
  eyebrow: string;
  title: string;
  support: string;
  imageAlt: string;
  items: LifecycleItem[];
  image?: string;
  icons?: readonly string[];
};

const iconSvgs: Record<string, ReactNode> = {
  layers: (
    <>
      <path d="M24 8 42 16 24 24 6 16 24 8Z" />
      <path d="M6 24l18 8 18-8" />
      <path d="M6 32l18 8 18-8" />
    </>
  ),
  building: (
    <>
      <path d="M10 40V14l14-6 14 6v26" />
      <path d="M18 40V24h12v16" />
      <path d="M18 30h12M22 18h4M28 18h4" />
    </>
  ),
  factory: (
    <>
      <path d="M8 40V22l10 6V22l10 6V16l12-4v28H8Z" />
      <path d="M14 40v-6h6v6M24 40v-6h6v6" />
    </>
  ),
  tool: (
    <path d="M30 10a8 8 0 0 0-10 10l-10 10 4 4 10-10a8 8 0 0 0 10-10l-5 5-4-4 5-5Z" />
  ),
  check: (
    <>
      <circle cx="24" cy="24" r="14" />
      <path d="M16 24l5 5 11-12" />
    </>
  ),
  bulb: (
    <>
      <path d="M24 8a10 10 0 0 1 6 18c-1.2 1-2 2.4-2 4v2H20v-2c0-1.6-.8-3-2-4A10 10 0 0 1 24 8Z" />
      <path d="M20 36h8M21 40h6" />
    </>
  ),
  growth: (
    <>
      <path d="M8 38h32" />
      <path d="M12 38V26l8-8 6 6 10-12" />
      <path d="M30 12h6v6" />
    </>
  ),
  cog: (
    <>
      <circle cx="24" cy="24" r="5" />
      <path d="M24 10v4M24 34v4M10 24h4M34 24h4M13.5 13.5l2.8 2.8M31.7 31.7l2.8 2.8M13.5 34.5l2.8-2.8M31.7 16.3l2.8-2.8" />
    </>
  ),
  globe: (
    <>
      <circle cx="24" cy="24" r="14" />
      <path d="M10 24h28M24 10c4 4 6 9 6 14s-2 10-6 14c-4-4-6-9-6-14s2-10 6-14Z" />
    </>
  ),
};

function LifecycleIcon({ name }: { name: string }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconSvgs[name] ?? iconSvgs.layers}
    </svg>
  );
}

export function LifecycleSection({
  eyebrow,
  title,
  support,
  imageAlt,
  items,
  image = media.lifecycle,
  icons = lifecycleIcons,
}: LifecycleSectionProps) {
  return (
    <section className="section-pad lifecycle-section section-rule">
      <div className="site-container lifecycle-grid">
        <div className="lifecycle-copy">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display lifecycle-title">{title}</h2>
            <p className="lede">{support}</p>
          </Reveal>

          <ol className="lifecycle-list">
            {items.map((item, index) => (
              <li key={item.title} className="lifecycle-item">
                <Reveal delay={0.08 + index * 0.1} y={20}>
                  <div className="lifecycle-item-inner">
                    <span className="lifecycle-item-icon" aria-hidden="true">
                      <LifecycleIcon name={icons[index] ?? "layers"} />
                    </span>
                    <div className="lifecycle-item-body">
                      <span className="lifecycle-item-step">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="lifecycle-item-title">{item.title}</h3>
                      <p className="lifecycle-item-copy">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.12} className="lifecycle-media-wrap">
          <div className="lifecycle-media">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
