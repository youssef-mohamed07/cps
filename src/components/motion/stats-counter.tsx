"use client";

import { useEffect, useRef, useState } from "react";

type StatsCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
};

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - 2 ** (-10 * t);
}

export function StatsCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000,
  delay = 0,
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const [counting, setCounting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let delayTimer: ReturnType<typeof setTimeout> | undefined;

    delayTimer = setTimeout(() => {
      setCounting(true);
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        setDisplay(Math.round(value * easeOutExpo(progress)));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setCounting(false);
        }
      };

      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      cancelAnimationFrame(frame);
    };
  }, [started, value, duration, delay, reduceMotion]);

  return (
    <span
      ref={ref}
      className={`stats-value${counting ? " is-counting" : ""}`}
    >
      {prefix ? <span className="stats-value-prefix">{prefix}</span> : null}
      <span className="stats-value-num">{display.toLocaleString()}</span>
      {suffix ? <span className="stats-value-suffix">{suffix}</span> : null}
    </span>
  );
}
