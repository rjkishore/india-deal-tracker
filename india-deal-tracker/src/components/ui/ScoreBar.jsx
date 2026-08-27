// Single Responsibility: Render one labelled score progress bar only
export function ScoreBar({ label, value, color }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontSize: 12, color: "#666" }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 800, color }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
        <div
          style={{
            height:     "100%",
            width:      `${value}%`,
            background: color,
            borderRadius: 4,
            transition: "width 0.6s",
          }}
        />
      </div>
    </div>
  );
}
