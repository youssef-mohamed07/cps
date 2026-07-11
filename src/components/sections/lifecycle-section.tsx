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
};

const iconSvgs: Record<string, ReactNode> = {
  layers: (
    <>
      <path d="M24 8 42 16 24 24 6 16 24 8Z" />
      <path d="M6 24l18 8 18-8" />
      <path d="M6 32l18 8 18-8" />
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
}: LifecycleSectionProps) {
  return (
    <section className="section-pad lifecycle-section section-rule">
      <div className="site-container lifecycle-grid">
        <div className="lifecycle-copy">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display lifecycle-title">{title}</h2>
            <p className="lede">{support}</p>

            <ol className="lifecycle-list">
              {items.map((item, index) => (
                <li key={item.title} className="lifecycle-item">
                  <div className="lifecycle-item-inner">
                    <span className="lifecycle-item-icon" aria-hidden="true">
                      <LifecycleIcon
                        name={lifecycleIcons[index] ?? "layers"}
                      />
                    </span>
                    <div className="lifecycle-item-body">
                      <span className="lifecycle-item-step">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="lifecycle-item-title">{item.title}</h3>
                      <p className="lifecycle-item-copy">{item.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="lifecycle-media-wrap">
          <div className="lifecycle-media">
            <Image
              src={media.lifecycle}
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
