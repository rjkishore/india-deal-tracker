// Single Responsibility: Render a themed card container only
export function Card({ children, style = {}, dark = false }) {
  return (
    <div
      style={{
        background:   dark ? "#1e1e2e" : "#fff",
        borderRadius: 16,
        padding:      "14px 16px",
        marginBottom: 12,
        boxShadow:    "0 2px 10px rgba(0,0,0,0.07)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
