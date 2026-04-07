// ─────────────────────────────────────────────────────────────
//  src/components/shared/Badge.jsx
//  Status badge — NEW / HOT / PRESTIGE / OUT / SOON / UPCOMING
// ─────────────────────────────────────────────────────────────

export default function Badge({ type = "NEW", text }) {
  return (
    <span className={`badge badge--${type.toLowerCase()}`}>
      {text || type}
    </span>
  );
}
