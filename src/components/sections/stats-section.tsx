"use client";

import { StatsCounter } from "@/components/motion/stats-counter";

type StatItem = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail?: string;
};

type StatsSectionProps = {
  eyebrow: string;
  title: string;
  support?: string;
  items: StatItem[];
};

export function StatsSection({ eyebrow, title, items }: StatsSectionProps) {
  return (
    <section className="stats-section scroll-mt-24" aria-label={title}>
      <div className="site-container">
        <div className="stats-strip" role="list">
          <p className="sr-only">{eyebrow}</p>
          {items.map((item, index) => (
            <div key={item.label} className="stats-strip-item" role="listitem">
              <StatsCounter
                value={item.value}
                prefix={item.prefix}
                suffix={item.suffix}
                delay={index * 140}
              />
              <span className="stats-strip-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
