import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#080610',
        cardBg: '#110d24',
        cardHover: '#181333',
        borderPurple: '#2d1e4d',
        purpleAccent: '#a855f7',
        purpleBright: '#c084fc',
        codeBg: '#0d0a1a',
        textLight: '#f8fafc',
        textMuted: '#94a3b8',
      },
    },
  },
  plugins: [],
};
export default config;