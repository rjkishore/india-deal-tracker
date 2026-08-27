// Single Responsibility: Render one selectable pill button only
// Interface Segregation: only takes what it needs — no extra props

export function Pill({ label, active, color, onClick, small = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding:      small ? "5px 10px" : "7px 14px",
        borderRadius: 20,
        border:       `1.5px solid ${active ? color : "#e0e0e0"}`,
        background:   active ? color : "transparent",
        color:        active ? "#fff" : "#555",
        fontWeight:   active ? 700 : 500,
        fontSize:     small ? 12 : 13,
        cursor:       "pointer",
        transition:   "all 0.13s",
        boxShadow:    active ? `0 3px 10px ${color}44` : "none",
        flexShrink:   0,
      }}
    >
      {label}
    </button>
  );
}
