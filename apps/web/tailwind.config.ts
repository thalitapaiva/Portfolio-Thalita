import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
      },
      screens: {
        "2xl": "72rem",
      },
    },
    extend: {
      colors: {
        brand: {
          700: "var(--blue-700)",
          600: "var(--blue-600)",
          500: "var(--blue-500)",
          300: "var(--blue-300)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          muted: "var(--accent-muted)",
        },
        background: "var(--background)",
        surface: "var(--surface)",
        border: "var(--border)",
        foreground: "var(--text-primary)",
        muted: "var(--text-secondary)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.04)",
        soft: "0 12px 40px rgba(15, 23, 42, 0.08)",
        focus: "0 0 0 4px rgba(37, 99, 235, 0.25)",
      },
      maxWidth: {
        content: "72rem",
        wide: "72rem",
        "6xl": "72rem",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "code-1": {
          "0%": { opacity: "0" },
          "2.5%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-2": {
          "16.2%": { opacity: "0" },
          "18.75%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-3": {
          "32.5%": { opacity: "0" },
          "35%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-4": {
          "48.75%": { opacity: "0" },
          "51.25%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-5": {
          "65%": { opacity: "0" },
          "72.5%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "code-6": {
          "81.25%": { opacity: "0" },
          "83.75%": { opacity: "1" },
          "97.5%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        breath: {
          "0%, 100%": { transform: "scale(0.95)" },
          "50%": { transform: "scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5%)" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 450ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-up": "fade-up 650ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "code-1": "code-1 10s infinite",
        "code-2": "code-2 10s infinite",
        "code-3": "code-3 10s infinite",
        "code-4": "code-4 10s infinite",
        "code-5": "code-5 10s infinite",
        "code-6": "code-6 10s infinite",
        breath: "breath 4s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
