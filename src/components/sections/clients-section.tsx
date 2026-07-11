"use client";

import Image from "next/image";

type ClientItem = {
  quote: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

type ClientsSectionProps = {
  id?: string;
  eyebrow: string;
  title: string;
  support: string;
  items: ClientItem[];
};

const STAGGER_PATTERN = [0, 1.5, 3, 1.5] as const;

function QuoteIcon() {
  return (
    <svg
      className="clients-quote-icon"
      viewBox="0 0 32 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8.5 0C3.8 0 0 3.8 0 8.5c0 5.2 3.4 9.8 8.5 13.5C5.8 18.8 4.5 16.2 4.5 13.5 4.5 10.8 6.3 9 9 9h2.5L8.5 0Z"
        fill="#2192b4"
      />
      <path
        d="M23.5 0c-4.7 0-8.5 3.8-8.5 8.5 0 5.2 3.4 9.8 8.5 13.5-2.7-3.2-4-5.8-4-8.5 0-2.7 1.8-4.5 4.5-4.5H27L23.5 0Z"
        fill="#00e3fe"
        opacity="0.82"
      />
    </svg>
  );
}

type ClientCardProps = {
  item: ClientItem;
  stagger: number;
  hidden?: boolean;
};

function ClientCard({ item, stagger, hidden }: ClientCardProps) {
  return (
    <article
      className="clients-card"
      role="listitem"
      aria-hidden={hidden || undefined}
      style={{ marginTop: `${stagger}rem` }}
    >
      <div className="clients-card-top">
        <div className="clients-avatar">
          <Image
            src={item.image}
            alt={hidden ? "" : item.imageAlt}
            fill
            sizes="52px"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <QuoteIcon />
      </div>

      <blockquote className="clients-quote">
        <p>&ldquo;{item.quote}&rdquo;</p>
      </blockquote>

      <p className="clients-meta">
        {item.name}, {item.role}
      </p>
    </article>
  );
}

export function ClientsSection({
  id,
  eyebrow,
  title,
  support,
  items,
}: ClientsSectionProps) {
  const track = [...items, ...items];

  return (
    <section id={id} className="clients-section scroll-mt-24" aria-label={title}>
      <div className="site-container">
        <div className="clients-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display clients-title">{title}</h2>
          <p className="lede clients-support">{support}</p>
        </div>
      </div>

      <div className="clients-marquee" role="presentation">
        <div className="clients-track" role="list">
          {track.map((item, index) => (
            <ClientCard
              key={`${index}-${item.name}`}
              item={item}
              stagger={STAGGER_PATTERN[index % STAGGER_PATTERN.length]}
              hidden={index >= items.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
