// Single Responsibility: Filters UI only — no URL building, no search logic
import { DISCOUNT_OPTIONS, RATING_OPTIONS, SORT_OPTIONS, BUDGET_OPTIONS } from "../../constants/filters";
import { Card } from "../ui/Card";
import { Pill } from "../ui/Pill";
import { SectionLabel } from "../ui/SectionLabel";

export function FiltersTab({ discount, rating, sort, budget, dark, tc, query,
  setDiscount, setRating, setSort, setBudget, onReset, onApply }) {
  const discOpt = DISCOUNT_OPTIONS.find((d) => d.value === discount) || DISCOUNT_OPTIONS[4];

  return (
    <div>
      <Card dark={dark}>
        <SectionLabel text="MINIMUM DISCOUNT %" />
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 10 }}>
          {DISCOUNT_OPTIONS.map((opt) => (
            <Pill key={opt.value} label={opt.label} active={discount === opt.value}
              color={opt.color} onClick={() => setDiscount(opt.value)} />
          ))}
        </div>
        <div style={{ height: 5, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${discount}%`,
            background: `linear-gradient(90deg,#43A047,${discOpt.color})`,
            borderRadius: 4, transition: "width 0.3s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
          <span style={{ fontSize: 10, color: "#ccc" }}>0%</span>
          <span style={{ fontSize: 11, fontWeight: 800, color: discOpt.color }}>{discount}%+ selected</span>
          <span style={{ fontSize: 10, color: "#ccc" }}>100%</span>
        </div>
      </Card>

      <Card dark={dark}>
        <SectionLabel text="MINIMUM RATING ⭐" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {RATING_OPTIONS.map((opt) => (
            <Pill key={opt.value} label={opt.label} active={rating === opt.value}
              color="#F9A825" onClick={() => setRating(opt.value)} />
          ))}
        </div>
        {rating !== "any" && (
          <div style={{ marginTop: 8, fontSize: 12, color: "#F57F17", fontWeight: 600 }}>
            ✅ Only {rating}★+ rated products shown
          </div>
        )}
      </Card>

      <Card dark={dark}>
        <SectionLabel text="SORT BY" />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SORT_OPTIONS.map((opt) => (
            <Pill key={opt.value} label={`${opt.icon} ${opt.label}`} active={sort === opt.value}
              color="#1a1a2e" onClick={() => setSort(opt.value)} />
          ))}
        </div>
      </Card>

      <Card dark={dark}>
        <SectionLabel text="BUDGET 💰" />
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {BUDGET_OPTIONS.map((opt) => (
            <Pill key={opt.label} label={opt.label} active={budget === opt.max}
              color="#2E7D32" onClick={() => setBudget(opt.max)} />
          ))}
        </div>
      </Card>

      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onReset} style={{
          padding: "14px 16px", borderRadius: 14, border: "1.5px solid #ddd",
          background: dark ? "#1e1e2e" : "#fff", color: dark ? "#aaa" : "#888",
          fontWeight: 700, fontSize: 13, cursor: "pointer", flexShrink: 0,
        }}>🔄 Reset</button>
        <button onClick={onApply} style={{
          flex: 1, padding: "14px 0", borderRadius: 14, border: "none",
          background: "linear-gradient(135deg,#1a1a2e,#0f3460)",
          color: "#FFD700", fontWeight: 800, fontSize: 15, cursor: "pointer",
        }}>{query ? `🚀 Apply & Search "${query}"` : "🔍 Go search a product"}</button>
      </div>
    </div>
  );
}
