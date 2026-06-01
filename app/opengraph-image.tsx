import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/seo";

export const runtime = "nodejs";
export const alt = "FormReady AI - Photo Signature PDF Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg,#020617,#111827,#2563eb)", color: "white", padding: 80, fontFamily: "Inter, Arial" }}>
      <div style={{ fontSize: 36, fontWeight: 700, opacity: 0.85 }}>{siteConfig.name}</div>
      <div style={{ marginTop: 28, fontSize: 72, lineHeight: 1.05, fontWeight: 900, letterSpacing: -3 }}>Fix photo, signature & PDF size for any online form</div>
      <div style={{ marginTop: 32, display: "flex", gap: 18, fontSize: 28 }}>
        <span style={{ border: "1px solid rgba(255,255,255,.3)", borderRadius: 999, padding: "12px 22px" }}>Private</span>
        <span style={{ border: "1px solid rgba(255,255,255,.3)", borderRadius: 999, padding: "12px 22px" }}>Fast</span>
        <span style={{ border: "1px solid rgba(255,255,255,.3)", borderRadius: 999, padding: "12px 22px" }}>Form-ready</span>
      </div>
    </div>,
    size
  );
}
