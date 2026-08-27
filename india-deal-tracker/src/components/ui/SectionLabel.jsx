// Single Responsibility: Render a section heading label only
export function SectionLabel({ text }) {
  return (
    <div
      style={{
        fontSize:      10,
        fontWeight:    800,
        color:         "#aaa",
        letterSpacing: 1.5,
        marginBottom:  8,
      }}
    >
      {text}
    </div>
  );
}
