// Single Responsibility: EMI calculator UI only — math in emiCalculator util
import { useState } from "react";
import { sessionGet, sessionSet } from "../../services/storageService";
import { getEMISummary, compareAllTenures } from "../../utils/emiCalculator";
import { EMI_TENURES } from "../../constants/content";
import { Card } from "../ui/Card";
import { SectionLabel } from "../ui/SectionLabel";

export function EMITab({ dark }) {
  const [price,    setPrice]   = useState(() => sessionGet("emi_price",  ""));
  const [tenure,   setTenure]  = useState(() => sessionGet("emi_tenure", 6));
  const [rate,     setRate]    = useState(() => sessionGet("emi_rate",   14));
  const [isNoCost, setNoCost]  = useState(() => sessionGet("emi_nocost", false));

  const savePrice  = (v) => { setPrice(v);   sessionSet("emi_price",  v); };
  const saveTenure = (v) => { setTenure(v);  sessionSet("emi_tenure", v); };
  const saveRate   = (v) => { setRate(v);    sessionSet("emi_rate",   v); };
  const saveNoCost = (v) => { setNoCost(v);  sessionSet("emi_nocost", v); };

  const principal  = parseFloat(price) || 0;
  const summary    = principal > 0 ? getEMISummary(principal, rate, tenure, isNoCost) : null;
  const allTenures = principal > 0 ? compareAllTenures(principal, rate, EMI_TENURES, isNoCost) : [];

  const tc = dark ? "#f0f0f0" : "#1a1a2e";
  const sc = dark ? "#aaa"    : "#666";

  return (
    <div>
      <Card dark={dark}>
        <SectionLabel text="📊 EMI CALCULATOR — SEE THE REAL COST" />

        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: sc, marginBottom: 6, fontWeight: 600 }}>Product Price (₹)</div>
          <input
            value={price}
            onChange={(e) => savePrice(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter price e.g. 25000"
            style={{ width: "100%", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #ddd",
              fontSize: 15, outline: "none", background: dark ? "#2a2a4a" : "#fff",
              color: tc, boxSizing: "border-box", fontWeight: 700 }}
          />
        </div>

        {/* No-cost EMI toggle */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 14, background: dark ? "#2a2a4a" : "#F8F9FA", borderRadius: 12, padding: "10px 14px" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: tc }}>No-Cost EMI</div>
            <div style={{ fontSize: 11, color: sc }}>Banks often add 2% hidden processing fee</div>
          </div>
          <button onClick={() => saveNoCost(!isNoCost)} style={{
            width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
            background: isNoCost ? "#2E7D32" : "#ccc", position: "relative", transition: "all 0.2s",
          }}>
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#fff",
              position: "absolute", top: 3, left: isNoCost ? 23 : 3, transition: "all 0.2s" }} />
          </button>
        </div>

        {/* Interest rate slider — only for regular EMI */}
        {!isNoCost && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: sc, marginBottom: 6, fontWeight: 600 }}>
              Annual Interest Rate: <b style={{ color: tc }}>{rate}%</b>
            </div>
            <input type="range" min={8} max={36} step={0.5} value={rate}
              onChange={(e) => saveRate(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "#1a1a2e" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#ccc", marginTop: 2 }}>
              <span>8% (Bank)</span><span>24% (Avg)</span><span>36% (High)</span>
            </div>
          </div>
        )}

        {/* Tenure selector */}
        <div>
          <div style={{ fontSize: 12, color: sc, marginBottom: 8, fontWeight: 600 }}>Tenure (months)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {EMI_TENURES.map((t) => (
              <button key={t} onClick={() => saveTenure(t)} style={{
                padding: "7px 14px", borderRadius: 10,
                border: `2px solid ${tenure === t ? "#1a1a2e" : "#e0e0e0"}`,
                background: tenure === t ? "#1a1a2e" : "#fff",
                color: tenure === t ? "#FFD700" : "#555",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}>{t}m</button>
            ))}
          </div>
        </div>
      </Card>

      {/* Results — only shown when a price is entered */}
      {summary && (
        <>
          {/* EMI banner */}
          <div style={{ background: "linear-gradient(135deg,#1a1a2e,#0f3460)", borderRadius: 16,
            padding: "18px 20px", marginBottom: 12,
            display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 700 }}>MONTHLY EMI</div>
              <div style={{ color: "#FFD700", fontSize: 32, fontWeight: 900 }}>
                ₹{Math.round(summary.emi).toLocaleString()}
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 2 }}>for {tenure} months</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 700, marginBottom: 4 }}>TOTAL PAYMENT</div>
              <div style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>
                ₹{Math.round(summary.totalPayable).toLocaleString()}
              </div>
              {summary.totalInterest > 0 && (
                <div style={{ color: "#ff6b6b", fontSize: 12, marginTop: 2 }}>
                  +₹{Math.round(summary.totalInterest).toLocaleString()} interest
                </div>
              )}
              {summary.processingFee > 0 && (
                <div style={{ color: "#ff6b6b", fontSize: 12 }}>
                  +₹{Math.round(summary.processingFee).toLocaleString()} processing fee
                </div>
              )}
            </div>
          </div>

          {/* Breakdown */}
          <Card dark={dark}>
            <SectionLabel text="COST BREAKDOWN" />
            {[
              ["Product Price",     `₹${principal.toLocaleString()}`,                           tc],
              summary.totalInterest > 0
                ? ["Total Interest", `₹${Math.round(summary.totalInterest).toLocaleString()}`,  "#E53935"]
                : null,
              summary.processingFee > 0
                ? ["Processing Fee (est.)", `₹${Math.round(summary.processingFee).toLocaleString()}`, "#E65100"]
                : null,
              ["Actual Total",     `₹${Math.round(summary.totalPayable).toLocaleString()}`,    "#1565C0"],
              ["Extra vs cash",    `₹${Math.round(summary.extraVsCash).toLocaleString()} more`, "#E53935"],
            ].filter(Boolean).map(([label, val, color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #f0f0f0" }}>
                <span style={{ fontSize: 13, color: sc }}>{label}</span>
                <span style={{ fontSize: 14, fontWeight: 800, color }}>{val}</span>
              </div>
            ))}
          </Card>

          {/* Compare all tenures */}
          <Card dark={dark}>
            <SectionLabel text="COMPARE ALL TENURES" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {allTenures.map(({ months, emi: e, totalPayable, extraVsCash }) => {
                const active = tenure === months;
                return (
                  <button key={months} onClick={() => saveTenure(months)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px", borderRadius: 12,
                    border: `2px solid ${active ? "#1a1a2e" : "#eee"}`,
                    background: active ? "#1a1a2e" : (dark ? "#2a2a4a" : "#fafafa"),
                    cursor: "pointer",
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: active ? "#FFD700" : tc }}>
                      {months} months
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: active ? "#fff" : tc }}>
                      ₹{Math.round(e).toLocaleString()}/mo
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: active ? "#aac4ff" : "#E53935" }}>
                      +₹{Math.round(extraVsCash).toLocaleString()} extra
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
