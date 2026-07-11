"use client";

import { Player } from "@lordicon/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  isLottieKey,
  lottieIcons,
  type LineIconName,
  type MotionIconName,
} from "@/content/motion-icons";

type Trigger = "hover" | "in" | "loop" | "none";

type MotionIconProps = {
  name: MotionIconName;
  size?: number;
  trigger?: Trigger;
  className?: string;
  label?: string;
  /** Brand color for Lottie / line icons */
  tone?: "navy" | "white" | "cyan" | "inherit";
};

const toneColor: Record<NonNullable<MotionIconProps["tone"]>, string> = {
  navy: "#0f3355",
  white: "#ffffff",
  cyan: "#00e3fe",
  inherit: "currentColor",
};

const iconCache = new Map<string, object>();

function LineIcon({
  name,
  size,
}: {
  name: LineIconName;
  size: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const paths: Record<LineIconName, ReactNode> = {
    building: (
      <>
        <path d="M10 40V14l14-6 14 6v26" />
        <path d="M18 40V24h12v16" />
        <path d="M18 30h12M22 18h4M28 18h4" />
      </>
    ),
    layers: (
      <>
        <path d="M24 8 42 16 24 24 6 16 24 8Z" />
        <path d="M6 24l18 8 18-8" />
        <path d="M6 32l18 8 18-8" />
      </>
    ),
    shop: (
      <>
        <path d="M8 18h32l-2 22H10L8 18Z" />
        <path d="M10 18c0-6 4-10 14-10s14 4 14 10" />
        <path d="M20 28h8v12h-8z" />
      </>
    ),
    globe: (
      <>
        <circle cx="24" cy="24" r="14" />
        <path d="M10 24h28M24 10c4 4 6 9 6 14s-2 10-6 14c-4-4-6-9-6-14s2-10 6-14Z" />
      </>
    ),
    growth: (
      <>
        <path d="M8 38h32" />
        <path d="M12 38V26l8-8 6 6 10-12" />
        <path d="M30 12h6v6" />
      </>
    ),
    check: (
      <>
        <circle cx="24" cy="24" r="14" />
        <path d="M16 24l5 5 11-12" />
      </>
    ),
    phone: (
      <>
        <path d="M16 8h6l2 8-4 2a20 20 0 0 0 8 8l2-4 8 2v6a4 4 0 0 1-4 4A24 24 0 0 1 12 12a4 4 0 0 1 4-4Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M10 24h24" />
        <path d="M26 14l12 10-12 10" />
      </>
    ),
    factory: (
      <>
        <path d="M8 40V22l10 6V22l10 6V16l12-4v28H8Z" />
        <path d="M14 40v-6h6v6M24 40v-6h6v6" />
      </>
    ),
    printer: (
      <>
        <path d="M14 14h20v8H14z" />
        <path d="M10 22h28v14H10z" />
        <path d="M16 30h16v12H16z" />
        <path d="M18 26h4" />
      </>
    ),
    bulb: (
      <>
        <path d="M24 8a10 10 0 0 1 6 18c-1.2 1-2 2.4-2 4v2H20v-2c0-1.6-.8-3-2-4A10 10 0 0 1 24 8Z" />
        <path d="M20 36h8M21 40h6" />
      </>
    ),
    cog: (
      <>
        <circle cx="24" cy="24" r="5" />
        <path d="M24 10v4M24 34v4M10 24h4M34 24h4M13.5 13.5l2.8 2.8M31.7 31.7l2.8 2.8M13.5 34.5l2.8-2.8M31.7 16.3l2.8-2.8" />
      </>
    ),
    tool: (
      <>
        <path d="M30 10a8 8 0 0 0-10 10l-10 10 4 4 10-10a8 8 0 0 0 10-10l-5 5-4-4 5-5Z" />
      </>
    ),
    quote: (
      <>
        <path d="M12 20c0-4 3-8 8-8v6c-2 0-4 1-4 4h6v12H12V20Z" />
        <path d="M28 20c0-4 3-8 8-8v6c-2 0-4 1-4 4h6v12H28V20Z" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}

export function MotionIcon({
  name,
  size = 48,
  trigger = "hover",
  className = "",
  label,
  tone = "navy",
}: MotionIconProps) {
  const reduce = useReducedMotion();
  const playerRef = useRef<Player | null>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [iconData, setIconData] = useState<object | null>(null);
  const isLottie = isLottieKey(name);
  const color = toneColor[tone];

  useEffect(() => {
    if (!isLottie) return;
    const src = lottieIcons[name];
    const cached = iconCache.get(src);
    if (cached) {
      setIconData(cached);
      return;
    }
    let cancelled = false;
    fetch(src)
      .then((res) => res.json())
      .then((data) => {
        iconCache.set(src, data);
        if (!cancelled) setIconData(data);
      })
      .catch(() => {
        if (!cancelled) setIconData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [isLottie, name]);

  useEffect(() => {
    if (!isLottie || !iconData || reduce || trigger === "none") return;
    const el = wrapRef.current;
    if (!el) return;

    if (trigger === "loop") {
      playerRef.current?.playFromBeginning();
      return;
    }

    if (trigger === "in") {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            playerRef.current?.playFromBeginning();
            io.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(el);
      return () => io.disconnect();
    }
  }, [iconData, isLottie, reduce, trigger]);

  const play = () => {
    if (reduce) return;
    playerRef.current?.playFromBeginning();
  };

  return (
    <span
      ref={wrapRef}
      className={`motion-icon ${className}`.trim()}
      style={{ width: size, height: size, color }}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      onMouseEnter={trigger === "hover" ? play : undefined}
      onFocus={trigger === "hover" ? play : undefined}
    >
      {isLottie && iconData ? (
        <Player
          ref={playerRef}
          icon={iconData}
          size={size}
          colorize={tone === "inherit" ? undefined : color}
          onComplete={() => {
            if (trigger === "loop" && !reduce) {
              playerRef.current?.playFromBeginning();
            }
          }}
        />
      ) : (
        <motion.span
          className="motion-line-icon"
          style={{ width: size, height: size, display: "inline-flex", color }}
          whileHover={reduce ? undefined : { scale: 1.06 }}
          transition={{ duration: 0.2 }}
        >
          <LineIcon name={isLottie ? "cog" : (name as LineIconName)} size={size} />
        </motion.span>
      )}
    </span>
  );
}
