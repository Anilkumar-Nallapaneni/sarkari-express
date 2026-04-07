// ─────────────────────────────────────────────────────────────
//  src/components/shared/Card.jsx
//  White surface card with hover lift + border glow
// ─────────────────────────────────────────────────────────────
export default function Card({ children, onClick, className = "", style = {} }) {
  const baseClass = onClick ? "card card--hoverable" : "card";

  return (
    <div
      className={`${baseClass} ${className}`.trim()}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
