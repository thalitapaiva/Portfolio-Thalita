import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Blue tech mark for browser tab favicon. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1524",
          borderRadius: 8,
          border: "1.5px solid #2181bd",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#80cbf3",
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: -1,
            lineHeight: 1,
          }}
        >
          {"{ }"}
        </div>
      </div>
    ),
    { ...size },
  );
}
