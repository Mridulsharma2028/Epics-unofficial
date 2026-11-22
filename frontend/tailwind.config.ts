import type { Config } from "tailwindcss";

// NOTE: This prototype primarily styles components with inline style objects
// (see lib/theme.ts for the design-token palette) so that exact hex values
// from the design system are guaranteed pixel-for-pixel. Tailwind is wired up
// here for base resets and is available for any new components the team
// builds on top of this prototype.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
