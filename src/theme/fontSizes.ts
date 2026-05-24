/**
 * Centralized Font Size Configuration for Safe Journey Web Application.
 * Centralizing font sizes here makes it extremely simple to tweak sizes across
 * all screens, ensuring perfect visual hierarchy and consistent sizing guidelines.
 */
export const FONT_SIZES = {
  // Ultra-small labels, captions, footnotes (10px - 12px)
  caption: '10px',
  footnote: '11px',
  xs: '12px',

  // Secondary elements, subtitles, list descriptions (13px - 14px)
  sm: '13px',
  base: '14px',

  // Paragraph texts, general menus, large items (15px - 16px)
  md: '15px',
  lg: '16px',

  // Subheadings, card titles, emphasis tags (18px - 20px)
  xl: '18px',
  xxl: '20px',

  // Section headers, form titles (24px - 26px)
  h3: '24px',
  h2: '26px',

  // Large landing titles, page headings (32px - 36px)
  h1: '32px',

  // Hero main headlines, high-impact titles (42px)
  hero: '42px',
} as const;

export type FontSizeKey = keyof typeof FONT_SIZES;
export default FONT_SIZES;
