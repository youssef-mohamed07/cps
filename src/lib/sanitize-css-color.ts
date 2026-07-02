const INVISIBLE_CHARS = /[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF\u2060\u00AD]/g;

/** Strip invisible Unicode and extract the first valid CSS color token. */
export function sanitizeCssColor(value: string | undefined | null): string | undefined {
  if (!value) return undefined;

  const cleaned = value.replace(INVISIBLE_CHARS, "").trim();
  const hex = cleaned.match(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/);
  if (hex) return hex[0];

  const rgb = cleaned.match(
    /^rgba?\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+(?:\s*,\s*[\d.]+\s*)?\)/i,
  );
  if (rgb) return rgb[0];

  const hsl = cleaned.match(
    /^hsla?\(\s*[\d.]+\s*,\s*[\d.]+%\s*,\s*[\d.]+%(?:\s*,\s*[\d.]+\s*)?\)/i,
  );
  if (hsl) return hsl[0];

  return undefined;
}

export function sanitizeBrandColors(
  colors: { accent?: string; primary?: string } | undefined,
): { accent?: string; primary?: string } | undefined {
  if (!colors) return undefined;

  const accent = sanitizeCssColor(colors.accent);
  const primary = sanitizeCssColor(colors.primary);

  if (!accent && !primary) return undefined;
  return { ...(accent ? { accent } : {}), ...(primary ? { primary } : {}) };
}
