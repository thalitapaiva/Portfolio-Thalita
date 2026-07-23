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
        sans: ['"Mona Sans Variable"', '"Mona Sans"', "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SF Mono", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.04)",
        soft: "0 12px 40px rgba(28, 43, 62, 0.1)",
        focus: "0 0 0 4px rgba(33, 129, 189, 0.25)",
      },
      maxWidth: {
        content: "1120px",
        wide: "1280px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        "350": "350ms",
        "400": "400ms",
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
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 450ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-up": "fade-up 650ms cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
