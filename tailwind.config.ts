import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#030A16",
          secondary: "#061225",
        },
        surface: {
          DEFAULT: "#0A1930",
          elevated: "#10233F",
        },
        navy: {
          DEFAULT: "#0B1F3A",
        },
        accent: {
          DEFAULT: "#2563EB",
          light: "#38BDF8",
          luminous: "#60A5FA",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
        },
        border: {
          DEFAULT: "rgba(148, 163, 184, 0.16)",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Inter", "Arial", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 1s infinite",
        aurora: "aurora 12s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "scroll-arrow": "scroll-arrow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        aurora: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1) rotate(0deg)" },
          "50%": { opacity: "0.7", transform: "scale(1.1) rotate(3deg)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "scroll-arrow": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
