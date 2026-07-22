import { ImageResponse } from "next/og";

import { api } from "@/lib/api";
import { SITE } from "@/lib/constants";

export const runtime = "edge";
export const alt = "Thalita Paiva — Portfólio";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function OpengraphImage() {
  const profile = await api.getProfile();
  const name = profile?.fullName ?? SITE.name;
  const label = profile?.heroLabel ?? "PORTFOLIO / SOFTWARE / PRODUCT";
  const monogram = profile?.monogram ?? SITE.shortName;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #F7FAFC 0%, #FFFFFF 55%, rgba(128,203,243,0.35) 100%)",
          color: "#1C2B3E",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(33,129,189,0.16) 0%, rgba(33,129,189,0) 55%), radial-gradient(circle at 10% 90%, rgba(109,173,216,0.18) 0%, rgba(109,173,216,0) 50%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1C2B3E",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: 2,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            {monogram}
          </div>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#3C678E",
              fontSize: 20,
              display: "flex",
            }}
          >
            {label}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, zIndex: 1 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.02,
              display: "flex",
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#526477",
              maxWidth: 900,
              lineHeight: 1.3,
              display: "flex",
            }}
          >
            {profile?.headline ?? "Software & Product — interfaces claras, backends confiáveis."}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              color: "#526477",
              fontFamily: "ui-monospace, monospace",
              fontSize: 20,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#2181BD",
                display: "flex",
              }}
            />
            Frontend · Backend · Produto
          </div>
          <div
            style={{
              color: "#3C678E",
              fontFamily: "ui-monospace, monospace",
              fontSize: 20,
              letterSpacing: 3,
              display: "flex",
            }}
          >
            {"//"} portfolio
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
