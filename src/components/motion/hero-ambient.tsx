"use client";

import { useReducedMotion } from "framer-motion";

/** Subtle architectural grid — CSS only, no heavy Lottie on mobile. */
export function HeroAmbient() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="hero-ambient" aria-hidden="true">
      <div className="hero-ambient-grid" />
      <div className="hero-ambient-glow" />
    </div>
  );
}
