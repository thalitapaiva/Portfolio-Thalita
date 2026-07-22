import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        navy: {
          900: "var(--navy-900)",
        },
        brand: {
          700: "var(--blue-700)",
          600: "var(--blue-600)",
          400: "var(--blue-400)",
          300: "var(--blue-300)",
        },
        background: "var(--background)",
        surface: "var(--surface)",
        border: "var(--border)",
        foreground: "var(--text-primary)",
        muted: "var(--text-secondary)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "hero-mobile": ["2.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-desktop": ["4rem", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28, 43, 62, 0.04), 0 4px 12px rgba(28, 43, 62, 0.06)",
        soft: "0 8px 24px rgba(28, 43, 62, 0.08)",
        focus: "0 0 0 3px rgba(33, 129, 189, 0.35)",
      },
      maxWidth: {
        content: "1200px",
        wide: "1280px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 300ms ease-out both",
        "fade-up": "fade-up 400ms cubic-bezier(0.4, 0, 0.2, 1) both",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
