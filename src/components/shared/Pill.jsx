// ─────────────────────────────────────────────────────────────
//  src/components/shared/Pill.jsx
//  Rounded filter tab button
// ─────────────────────────────────────────────────────────────
export default function Pill({ children, active, onClick }) {
  return (
    <button
      className={`pill ${active ? "pill--active" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
