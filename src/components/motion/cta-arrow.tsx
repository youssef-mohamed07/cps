type CtaArrowProps = {
  className?: string;
  tone?: "navy" | "white" | "cyan" | "inherit";
  size?: "sm" | "md" | "lg";
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
      className={`cta-arrow ${sizeClass[size]} cta-arrow--${tone} ${className}`.trim()}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" focusable="false">
        <path
          d="M4 12H18"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <path
          d="M13 6L19 12 13 18"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </span>
  );
}
