// ─────────────────────────────────────────────────────────────
//  src/components/shared/EmptyState.jsx
//  No-results / empty list placeholder
// ─────────────────────────────────────────────────────────────
export default function EmptyState({ icon, title, sub, action, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <div className="empty-state__title">{title}</div>
      <div className="empty-state__sub">{sub}</div>
      {action && (
        <button className="empty-state__action" onClick={onAction}>{action}</button>
      )}
    </div>
  );
}
