/**
 * Brand settings. Every component reads colours, fonts, radii and shadows from here.
 * Change `colors.accent` (and `accentTint`) to re-colour the whole video.
 */
export const brand = {
  productName: 'InboxPilot', // product name shown everywhere
  merchantName: 'Northline Apparel', // fictional merchant
  tagline: 'AI-assisted conversations. Human-controlled orders.',

  colors: {
    background: '#F6F3EC', // warm ivory
    text: '#18201E', // charcoal
    textMuted: '#59645F',
    accent: '#00897B', // MAIN ACCENT (teal)
    accentTint: '#DDF4EC', // light tint used behind accent elements
    onAccent: '#FFFFFF', // text on accent backgrounds
    surface: '#FFFFFF',
    surfaceSoft: '#FAF8F3',
    border: '#E6E1D5',
    warning: '#8A5A00',
    warningTint: '#FFEFD0',
    danger: '#A8341C',
    dangerTint: '#FCE5DE',
  },

  /** Channel dot colours (simple original markers, not official logos). */
  channelColors: {
    messenger: '#2F7BF5',
    instagram: '#D6336C',
    whatsapp: '#1E9E55',
  },

  fonts: {
    family: 'Inter',
    fallback: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    /** Files live in public/fonts. Add or swap files here. */
    files: [
      {weight: 400, file: 'fonts/inter-latin-400-normal.woff2'},
      {weight: 600, file: 'fonts/inter-latin-600-normal.woff2'},
      {weight: 700, file: 'fonts/inter-latin-700-normal.woff2'},
      {weight: 800, file: 'fonts/inter-latin-800-normal.woff2'},
    ],
  },

  /**
   * Logo. 'tinted' = a one-colour glyph (alpha mask) drawn on an accent tile,
   * so it follows the accent colour. 'original' = show the file as-is.
   */
  logo: {
    src: 'logos/inboxpilot-mark.svg',
    mode: 'tinted' as 'tinted' | 'original',
  },

  radii: {sm: 12, md: 20, lg: 28, xl: 44, pill: 999},

  shadows: {
    card: '0 2px 6px rgba(24,32,30,0.05), 0 14px 34px rgba(24,32,30,0.09)',
    float: '0 4px 10px rgba(24,32,30,0.06), 0 30px 70px rgba(24,32,30,0.16)',
    phone: '0 40px 90px rgba(24,32,30,0.28), 0 8px 20px rgba(24,32,30,0.12)',
  },
};

/** Derived colours that follow the accent automatically. */
export const derived = {
  accentDark: `color-mix(in srgb, ${brand.colors.accent} 68%, black)`,
  accentGlow: `color-mix(in srgb, ${brand.colors.accent} 28%, transparent)`,
};

export const fontFamily = `"${brand.fonts.family}", ${brand.fonts.fallback}`;
