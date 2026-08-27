// Single Responsibility: Sales calendar UI only
import { SALE_EVENTS, PRO_SHOPPING_TIPS } from "../../constants/content";
import { SALE_URLS, PLATFORM_META } from "../../constants/platforms";
import { Card } from "../ui/Card";
import { SectionLabel } from "../ui/SectionLabel";

export function SalesTab({ dark }) {
  const tc = dark ? "#f0f0f0" : "#1a1a2e";
  const sc = dark ? "#aaa"    : "#666";

  return (
    <div>
      <Card dark={dark}>
        <SectionLabel text="📅 UPCOMING SALE EVENTS — INDIA 2026" />
        <div style={{ fontSize: 12, color: sc, marginBottom: 12 }}>
          Tap to open platform and add products to your wishlist now!
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SALE_EVENTS.map((ev) => (
            <a key={ev.name} href={SALE_URLS[ev.platform] || "#"}
              target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: dark ? "#2a2a4a" : "#fafafa", borderRadius: 12,
                padding: "12px 14px", border: `1.5px solid ${ev.color}33`,
                display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{ev.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: tc }}>{ev.name}</div>
                      <div style={{ fontSize: 11, color: sc }}>
                        {PLATFORM_META[ev.platform]?.icon} {ev.platform} · {ev.date}
                      </div>
                    </div>
                  </div>
                  <div style={{ background: ev.color, color: "#fff", borderRadius: 20,
                    padding: "4px 10px", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    Prep →
                  </div>
                </div>
                <div style={{ background: ev.color + "11", borderRadius: 8,
                  padding: "6px 10px", fontSize: 11, color: dark ? "#ddd" : sc }}>
                  💡 {ev.tip}
                </div>
              </div>
            </a>
          ))}
        </div>
      </Card>

      <Card dark={dark}>
        <SectionLabel text="🏆 PRO SHOPPING TIPS" />
        {PRO_SHOPPING_TIPS.map(({ icon, title, desc }) => (
          <div key={title} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: tc }}>{title}</div>
              <div style={{ fontSize: 12, color: sc, marginTop: 1, lineHeight: 1.4 }}>{desc}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
