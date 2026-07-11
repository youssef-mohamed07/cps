"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionIcon } from "@/components/motion/motion-icon";

type CtaArrowProps = {
  className?: string;
  tone?: "navy" | "white" | "cyan" | "inherit";
};

export function CtaArrow({ className = "", tone = "inherit" }: CtaArrowProps) {
  const reduce = useReducedMotion();

  return (
    <motion.span
      className={`cta-arrow ${className}`.trim()}
      aria-hidden="true"
      whileHover={reduce ? undefined : { x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <MotionIcon name="arrow" size={18} trigger="hover" tone={tone} />
    </motion.span>
  );
}
