// Single Responsibility: Render a styled warning/disclaimer banner only
export function Disclaimer({ text, dark = false }) {
  return (
    <div
      style={{
        background:   dark ? "#2a2010" : "#FFFDE7",
        border:       "1.5px solid #F9A825",
        borderRadius: 12,
        padding:      "10px 14px",
        marginBottom: 12,
        display:      "flex",
        gap:          8,
        alignItems:   "flex-start",
      }}
    >
      <span style={{ fontSize: 15, flexShrink: 0 }}>⚠️</span>
      <div
        style={{
          fontSize:   11,
          color:      dark ? "#ffe082" : "#795548",
          lineHeight: 1.5,
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
}
