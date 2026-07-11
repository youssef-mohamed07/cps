/** Curated motion icon keys → local Lordicon JSON (free CDN mirrors). */
export const lottieIcons = {
  magnifier: "/lottie/magnifier.json",
  email: "/lottie/email.json",
  location: "/lottie/location.json",
  document: "/lottie/document.json",
  edit: "/lottie/edit.json",
  clock: "/lottie/clock.json",
  file: "/lottie/file.json",
  trending: "/lottie/trending.json",
  suitcase: "/lottie/suitcase.json",
  info: "/lottie/info.json",
  book: "/lottie/book.json",
  consultation: "/lottie/consultation.json",
  demand: "/lottie/demand.json",
  lock: "/lottie/lock.json",
  pencil: "/lottie/pencil.json",
} as const;

export type LottieIconKey = keyof typeof lottieIcons;

export type LineIconName =
  | "building"
  | "layers"
  | "shop"
  | "globe"
  | "growth"
  | "check"
  | "phone"
  | "arrow"
  | "factory"
  | "printer"
  | "bulb"
  | "cog"
  | "tool"
  | "quote";

export type MotionIconName = LottieIconKey | LineIconName;

/** Service slug → icon */
export const serviceIcons: Record<string, MotionIconName> = {
  "full-booth-management": "demand",
  "booth-design": "edit",
  design: "edit",
  "custom-fabrication": "factory",
  "installation-dismantling": "tool",
  "storage-reinstallation": "suitcase",
  "visual-branding-print": "printer",
  "lightbox-retail-display": "bulb",
};

/** Booth type slug → icon */
export const boothTypeIcons: Record<string, MotionIconName> = {
  custom: "building",
  modular: "layers",
  "double-deck": "layers",
  portable: "suitcase",
  kiosks: "shop",
  outdoor: "globe",
  pavilions: "building",
  sustainable: "growth",
};

export const lifecycleIcons: MotionIconName[] = ["layers", "factory", "tool", "check"];

export function isLottieKey(key: string): key is LottieIconKey {
  return key in lottieIcons;
}
