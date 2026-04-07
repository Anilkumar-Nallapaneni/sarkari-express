// ─────────────────────────────────────────────────────────────
//  src/components/shared/SectionHeader.jsx
//  Reusable section title + optional "View All" action link
// ─────────────────────────────────────────────────────────────
export default function SectionHeader({ title, accent, sub, action, onAction }) {
  return (
    <div className="section-header">
      <div>
        <h2 className="section-header__title">
          {title} <span className="section-header__title-accent">{accent}</span>
        </h2>
        {sub && <p className="section-header__sub">{sub}</p>}
      </div>
      {action && (
        <button className="section-header__action" onClick={onAction}>
          {action} →
        </button>
      )}
    </div>
  );
}
