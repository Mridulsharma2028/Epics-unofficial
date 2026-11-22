// Design tokens for the AarogyaNet AI prototype.
// Kept as a plain JS object (rather than only Tailwind classes) so every
// component can reference exact hex values consistently.
export const C = {
  bg: "#F6F2E7",
  bgAlt: "#EDE6D3",
  panel: "#FFFFFF",
  ink: "#132824",
  inkSoft: "#4C6059",
  teal: "#1F5C52",
  tealDeep: "#0E3B34",
  tealPale: "#DEEAE6",
  marigold: "#E0A22F",
  marigoldDeep: "#A97218",
  marigoldPale: "#FAECD1",
  brick: "#A23E2D",
  brickPale: "#F2DAD3",
  line: "#DED5BC",
  white: "#FFFFFF",
} as const;

// These map to CSS variables set by next/font in app/layout.tsx.
export const FONT_HEAD = "var(--font-head), ui-serif, Georgia, serif";
export const FONT_BODY = "var(--font-body), ui-sans-serif, system-ui, sans-serif";

export type Risk = "LOW" | "MODERATE" | "HIGH";
