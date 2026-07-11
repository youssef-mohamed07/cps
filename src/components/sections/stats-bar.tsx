"use client";

import { CountUp } from "@/components/motion/count-up";
import { MotionIcon } from "@/components/motion/motion-icon";
import { Reveal } from "@/components/motion/reveal";

type StatItem = { value: string; label: string };

type StatsBarProps = {
  items: StatItem[];
};

export function StatsBar({ items }: StatsBarProps) {
  return (
    <div className="stats-bar">
      <div className="site-container stats-bar-inner">
        {items.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.08}>
            <div className="stats-bar-item">
              <span className="stats-bar-icon">
                <MotionIcon name="trending" size={28} trigger="in" tone="cyan" />
              </span>
              <p className="stats-bar-value">
                <CountUp value={item.value} />
              </p>
              <p className="stats-bar-label">{item.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
