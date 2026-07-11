type CtaArrowProps = {
  className?: string;
  tone?: "navy" | "white" | "cyan" | "inherit";
  size?: "sm" | "md" | "lg";
};

const toneColor: Record<NonNullable<CtaArrowProps["tone"]>, string> = {
  navy: "#0f3355",
  white: "#ffffff",
  cyan: "#00e3fe",
  inherit: "currentColor",
};

const sizeClass: Record<NonNullable<CtaArrowProps["size"]>, string> = {
  sm: "is-sm",
  md: "is-md",
  lg: "is-lg",
};

/** Shared site arrow — bold, visible, RTL-aware via CSS. */
export function CtaArrow({
  className = "",
  tone = "inherit",
  size = "md",
}: CtaArrowProps) {
  return (
    <span
      className={`cta-arrow ${sizeClass[size]} ${className}`.trim()}
      aria-hidden="true"
      style={{ color: toneColor[tone] }}
    >
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path
          d="M3.5 12H18.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M13 5.5L19.5 12 13 18.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
