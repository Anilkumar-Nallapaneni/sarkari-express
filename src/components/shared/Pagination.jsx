// ─────────────────────────────────────────────────────────────
//  src/components/shared/Pagination.jsx
//  Page navigator — Prev / numbered pages / Next
// ─────────────────────────────────────────────────────────────
export default function Pagination({ current, total, onChange }) {
  if (total <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pagination__btn"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
      >
        ← Prev
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          className={`pagination__btn ${current === n ? "pagination__btn--active" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <button
        className="pagination__btn"
        disabled={current === total}
        onClick={() => onChange(current + 1)}
      >
        Next →
      </button>
    </div>
  );
}
