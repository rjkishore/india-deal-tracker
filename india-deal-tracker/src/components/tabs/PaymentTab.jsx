// Single Responsibility: Payment offers UI only
import { useState } from "react";
import { PLATFORMS, PLATFORM_META, PAYMENT_OFFERS } from "../../constants/platforms";
import { Card } from "../ui/Card";
import { SectionLabel } from "../ui/SectionLabel";
import { Disclaimer } from "../ui/Disclaimer";

const PAYMENT_TIPS = [
  ["🏦", "Stack offers",          "Combine bank card discount + UPI cashback for maximum savings"],
  ["⏰", "Activate before sale",   "Activate credit card offer 2–3 days before sale starts"],
  ["📱", "Use official app",       "Payment offers only work through official platform apps, not browser"],
  ["🔄", "No-cost EMI trap",       "'No-cost EMI' often hides processing fee — check total cost in EMI tab"],
];

export function PaymentTab({ dark }) {
  const [activePlatform, setActivePlatform] = useState("Amazon");
  const pl = PLATFORM_META[activePlatform];
  const tc = dark ? "#f0f0f0" : "#1a1a2e";
  const sc = dark ? "#aaa"    : "#666";

  return (
    <div>
      <Card dark={dark}>
        <SectionLabel text="SELECT PLATFORM" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {PLATFORMS.map((p) => {
            const m      = PLATFORM_META[p];
            const active = activePlatform === p;
            return (
              <button key={p} onClick={() => setActivePlatform(p)} style={{
                padding: "7px 13px", borderRadius: 12,
                border: `2px solid ${active ? m.color : "#e0e0e0"}`,
                background: active ? m.color : "#fff",
                color: active ? "#fff" : "#444",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 5,
                boxShadow: active ? `0 4px 12px ${m.color}44` : "none",
                transition: "all 0.15s",
              }}>{m.icon} {p}</button>
            );
          })}
        </div>
      </Card>

      <div style={{ background: `linear-gradient(135deg,${pl.color},${pl.color}bb)`,
        borderRadius: 16, padding: "14px 18px", marginBottom: 12,
        display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 32 }}>{pl.icon}</span>
        <div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700 }}>BEST PAYMENT METHODS FOR</div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>{activePlatform}</div>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 2 }}>Maximize your savings at checkout</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
        {(PAYMENT_OFFERS[activePlatform] || []).map((offer, i) => (
          <div key={i} style={{ background: dark ? "#1e1e2e" : "#fff", borderRadius: 14,
            padding: "14px 16px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
            border: `1.5px solid ${pl.color}22`, display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: pl.bg,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
              {offer.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: tc }}>{offer.method}</div>
              <div style={{ fontSize: 13, color: pl.color, fontWeight: 700, marginTop: 2 }}>{offer.saving}</div>
            </div>
            <div style={{ background: pl.color + "22", color: pl.color, borderRadius: 20,
              padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
              #{i + 1} Best
            </div>
          </div>
        ))}
      </div>

      <Disclaimer
        dark={dark}
        text="<b>Estimate Notice:</b> Payment offers shown are based on recent data and may have changed. Always verify the current offer on the platform or bank website before checkout."
      />

      <Card dark={dark} style={{ background: dark ? "#1e1e2e" : "#F8F9FA" }}>
        <SectionLabel text="💡 PAYMENT PRO TIPS" />
        {PAYMENT_TIPS.map(([icon, title, desc]) => (
          <div key={title} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: tc }}>{title}</div>
              <div style={{ fontSize: 12, color: sc, lineHeight: 1.4, marginTop: 1 }}>{desc}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
