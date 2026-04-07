// ─────────────────────────────────────────────────────────────
//  src/components/NotifPopup.jsx
//  Bottom-right job notification toast popup
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from "react";

export default function NotifPopup({ job, onViewJob }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!visible || !job) return null;

  return (
    <div className="notif-popup">
      <button className="notif-popup__close" onClick={() => setVisible(false)}>×</button>

      <div className="notif-popup__title">
        🔥 New: {job.title.length > 30 ? job.title.slice(0, 30) + "…" : job.title}
      </div>
      <div className="notif-popup__sub">
        {job.posts.toLocaleString("en-IN")} Posts · Last date: {job.deadline}
      </div>
      <button
        className="notif-popup__link"
        onClick={() => { onViewJob(job); setVisible(false); }}
      >
        View Details →
      </button>
    </div>
  );
}
