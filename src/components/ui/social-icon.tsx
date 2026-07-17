type SocialIconProps = {
  platform: string;
  className?: string;
};

/** Shared brand social glyphs used in footer + contact. */
export function SocialIcon({ platform, className = "social-icon" }: SocialIconProps) {
  const key = platform.toLowerCase();

  if (key.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M6.5 8.5H3.5V20.5H6.5V8.5ZM5 3.5A1.75 1.75 0 1 0 5 7A1.75 1.75 0 0 0 5 3.5ZM20.5 20.5H17.5V14.3C17.5 12.7 16.9 11.8 15.6 11.8C14.2 11.8 13.5 12.7 13.5 14.3V20.5H10.5V8.5H13.5V10C14 9.1 15.2 8.2 17 8.2C19.5 8.2 20.5 9.8 20.5 12.8V20.5Z"
        />
      </svg>
    );
  }

  if (key.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M7 3H17A4 4 0 0 1 21 7V17A4 4 0 0 1 17 21H7A4 4 0 0 1 3 17V7A4 4 0 0 1 7 3ZM12 8A4 4 0 1 0 12 16A4 4 0 0 0 12 8ZM18 6.5A1 1 0 1 0 18 8.5A1 1 0 0 0 18 6.5Z"
        />
      </svg>
    );
  }

  if (key.includes("facebook")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M14 9H17V6H14C11.8 6 10 7.8 10 10V12H8V15H10V22H13V15H16L17 12H13V10C13 9.4 13.4 9 14 9Z"
        />
      </svg>
    );
  }

  if (key === "x" || key.includes("twitter")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M4 4H8.2L12.1 9.4L16.8 4H20L13.9 11.2L20.5 20H16.3L12 14.2L6.9 20H3.2L9.7 12.4L4 4Z"
        />
      </svg>
    );
  }

  if (key.includes("youtube")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <path
          fill="currentColor"
          d="M21.6 7.2A2.7 2.7 0 0 0 19.7 5.3C18 5 12 5 12 5S6 5 4.3 5.3A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 2 12A28 28 0 0 0 2.4 16.8 2.7 2.7 0 0 0 4.3 18.7C6 19 12 19 12 19S18 19 19.7 18.7A2.7 2.7 0 0 0 21.6 16.8 28 28 0 0 0 22 12 28 28 0 0 0 21.6 7.2ZM10 15.2V8.8L15.5 12L10 15.2Z"
        />
      </svg>
    );
  }

  return <span className="social-icon-fallback">{platform.slice(0, 1).toUpperCase()}</span>;
}
