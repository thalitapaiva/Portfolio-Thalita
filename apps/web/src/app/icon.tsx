import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Project-management clipboard, readable at browser-tab sizes. */
export default function Icon() {
  return new ImageResponse(
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#2563eb" />
      <rect
        x="8"
        y="8"
        width="16"
        height="18"
        rx="3"
        stroke="white"
        strokeWidth="1.8"
      />
      <rect
        x="12"
        y="5.5"
        width="8"
        height="5"
        rx="1.6"
        fill="#2563eb"
        stroke="white"
        strokeWidth="1.8"
      />
      <path
        d="M12 18L15 21L20.5 15.5"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
    { ...size },
  );
}
