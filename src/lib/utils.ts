type ClassValue = string | number | false | null | undefined;

/**
 * Tiny className joiner. Filters out falsy values and joins with a space.
 * Keeps the design system dependency-free while supporting conditional classes.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
