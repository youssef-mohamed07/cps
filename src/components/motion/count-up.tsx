"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  className?: string;
};

function parseValue(raw: string) {
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return { target: 0, suffix: raw, numeric: false };
  return { target: Number(match[1]), suffix: match[2] ?? "", numeric: true };
}

export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const { target, suffix, numeric } = parseValue(value);
  const [display, setDisplay] = useState(reduce || !numeric ? value : "0");

  useEffect(() => {
    if (!numeric || reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${Math.round(target * eased)}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, numeric, reduce, suffix, target, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
