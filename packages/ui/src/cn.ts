export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export const tokens = {
  colors: {
    navy900: "#1C2B3E",
    blue700: "#3C678E",
    blue600: "#2181BD",
    blue400: "#6DADD8",
    blue300: "#80CBF3",
    background: "#F7FAFC",
    surface: "#FFFFFF",
    border: "#DCE6EE",
    textPrimary: "#1C2B3E",
    textSecondary: "#526477",
  },
  radius: {
    md: "12px",
    lg: "16px",
    xl: "20px",
  },
  maxWidth: "1280px",
} as const;
