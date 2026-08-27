// Single Responsibility: Search tab UI and logic only
import { PRESETS } from "../../constants/content";
import { PLATFORM_META, PLATFORMS } from "../../constants/platforms";
import { DISCOUNT_OPTIONS, SORT_OPTIONS } from "../../constants/filters";
import { buildDealUrl, buildHistoryUrl, buildCompareUrl } from "../../services/urlBuilder";
import { COMPARE_TOOLS } from "../../constants/content";
import { Card } from "../ui/Card";
import { SectionLabel } from "../ui/SectionLabel";

function FilterChips({ discount, rating, sort, budget }) {
  const discOpt = DISCOUNT_OPTIONS.find((d) => d.value === discount) || DISCOUNT_OPTIONS[4];
  const sortOpt = SORT_OPTIONS.find((s) => s.value === sort);
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
      <span style={{ background: discOpt.color, color: "#fff", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
        🏷️ {discount}%+
      </span>
      {rating !== "any" && (
        <span style={{ background: "#FFF8E1", color: "#F57F17", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
          ⭐ {rating}★+
        </span>
      )}
      <span style={{ background: "#E8EAF6", color: "#3949AB", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
        {sortOpt?.icon} {sortOpt?.label}
      </span>
      {budget && (
        <span style={{ background: "#E8F5E9", color: "#2E7D32", borderRadius: 20, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
          💰 Under ₹{budget.toLocaleString()}
        </span>
      )}
    </div>
  );
}

function PlatformCard({ platform, query, discount, rating, sort, budget, dark }) {
  const pl  = PLATFORM_META[platform];
  const url = buildDealUrl(platform, query, discount, rating, sort, budget);
  const tc  = dark ? "#f0f0f0" : "#1a1a2e";
  const sortOpt = SORT_OPTIONS.find((s) => s.value === sort);
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div style={{
        background: dark ? "#1e1e2e" : "#fff", borderRadius: 14, overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)", border: `1.5px solid ${pl.color}33`,
        display: "flex", alignItems: "stretch",
      }}>
        <div style={{ width: 5, background: pl.color, flexShrink: 0 }} />
        <div style={{ width: 48, background: pl.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
          {pl.icon}
        </div>
        <div style={{ flex: 1, padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: tc }}>{platform}</div>
            <div style={{ fontSize: 11, color: "#999", marginTop: 1 }}>{discount}%+ · {sortOpt?.label}</div>
          </div>
          <div style={{ background: pl.color, color: "#fff", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 800 }}>
            Open →
          </div>
        </div>
      </div>
    </a>
  );
}

function ResultsPanel({ query, discount, rating, sort, budget, dark }) {
  return (
    <div>
      <FilterChips discount={discount} rating={rating} sort={sort} budget={budget} />
      <SectionLabel text="OPEN ON PLATFORM — REAL DEALS" />
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 16 }}>
        {PLATFORMS.map((p) => (
          <PlatformCard key={p} platform={p} query={query} discount={discount}
            rating={rating} sort={sort} budget={budget} dark={dark} />
        ))}
      </div>
      <SectionLabel text="COMPARE PRICES" />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {COMPARE_TOOLS.map((t) => (
          <a key={t.tool} href={buildCompareUrl(t.tool, query)} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none", flex: "1 1 40%" }}>
            <div style={{ background: dark ? "#1e1e2e" : "#fff", borderRadius: 12, padding: "10px 12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: `1.5px solid ${t.color}33`,
              display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 12, color: dark ? "#ddd" : "#333" }}>{t.label}</span>
            </div>
          </a>
        ))}
      </div>
      <SectionLabel text="1-YEAR PRICE HISTORY" />
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        {["amazon","flipkart"].map((store) => (
          <a key={store} href={buildHistoryUrl(store, query)} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textDecoration: "none" }}>
            <div style={{ background: store === "amazon" ? "#FF9900" : "#2874F0", color: "#fff",
              borderRadius: 12, padding: "10px 0", textAlign: "center", fontWeight: 700, fontSize: 12 }}>
              {store === "amazon" ? "🛒 Amazon" : "🏪 Flipkart"}
            </div>
          </a>
        ))}
      </div>
      <a href={buildHistoryUrl("before", query)} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
        <div style={{ background: "#6A1B9A", color: "#fff", borderRadius: 12, padding: "10px 0", textAlign: "center", fontWeight: 700, fontSize: 12 }}>
          📉 PriceBefore — Multi-store 1-Year Chart
        </div>
      </a>
    </div>
  );
}

export function SearchTab({ query, discount, rating, sort, budget, dark, tc, sc,
  recent, watchlist, shareMsg, onSearch, onToggleWL, onShare, onOpenAI, onPreset }) {
  const discOpt = DISCOUNT_OPTIONS.find((d) => d.value === discount) || DISCOUNT_OPTIONS[4];

  return (
    <div>
      {/* Presets */}
      <div style={{ marginBottom: 14 }}>
        <SectionLabel text="⚡ ONE-TAP PRESETS" />
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {PRESETS.map((p) => (
            <button key={p.label} onClick={() => onPreset(p)} style={{
              flexShrink: 0, padding: "7px 13px", borderRadius: 20, border: "1.5px solid #e0e0e0",
              background: dark ? "#1e1e2e" : "#fff", color: tc, fontWeight: 600, fontSize: 12, cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            }}>{p.label}</button>
          ))}
        </div>
      </div>

      {/* Recent searches */}
      {!query && recent.length > 0 && (
        <Card dark={dark}>
          <SectionLabel text="🕐 RECENT SEARCHES" />
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {recent.map((r) => (
              <button key={r} onClick={() => onSearch(r)} style={{
                padding: "6px 12px", borderRadius: 20, border: "1px solid #e0e0e0",
                background: dark ? "#2a2a4a" : "#F0F4FF", color: tc, fontSize: 12, cursor: "pointer", fontWeight: 600,
              }}>🕐 {r}</button>
            ))}
          </div>
        </Card>
      )}

      {query ? (
        <>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: tc }}>
              "<span style={{ color: discOpt.color }}>{query}</span>"
            </div>
            <div style={{ display: "flex", gap: 7 }}>
              <button onClick={() => onToggleWL(query)} style={{
                background: watchlist.includes(query) ? "#FFE8ED" : dark ? "#2a2a4a" : "#f5f5f5",
                border: "none", borderRadius: 10, padding: "6px 10px", fontSize: 16, cursor: "pointer",
              }}>{watchlist.includes(query) ? "❤️" : "🤍"}</button>
              <button onClick={onShare} style={{
                background: dark ? "#2a2a4a" : "#f5f5f5", border: "none", borderRadius: 10,
                padding: "6px 10px", fontSize: 16, cursor: "pointer",
              }}>📤</button>
              <button onClick={onOpenAI} style={{
                background: "#1a1a2e", border: "none", borderRadius: 10,
                padding: "6px 10px", fontSize: 11, fontWeight: 700, color: "#FFD700", cursor: "pointer",
              }}>🤖 AI</button>
            </div>
          </div>
          {shareMsg && (
            <div style={{ background: "#E8F5E9", color: "#2E7D32", borderRadius: 10,
              padding: "7px 12px", marginBottom: 10, fontSize: 12, fontWeight: 600 }}>
              {shareMsg}
            </div>
          )}
          <ResultsPanel query={query} discount={discount} rating={rating} sort={sort} budget={budget} dark={dark} />
        </>
      ) : (
        <Card dark={dark} style={{ textAlign: "center", padding: "28px 20px" }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>🏷️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: tc, marginBottom: 6 }}>Search any product above</div>
          <div style={{ fontSize: 13, color: sc }}>Find real deals · Compare prices · Check 1-year history · AI review</div>
        </Card>
      )}
    </div>
  );
}
