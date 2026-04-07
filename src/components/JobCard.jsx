// ─────────────────────────────────────────────────────────────
//  src/components/JobCard.jsx
//  Individual job listing card — used in JobsPage & HomePage
// ─────────────────────────────────────────────────────────────
import Badge from "./shared/Badge";

export default function JobCard({ job, saved, onSave, onView }) {
  return (
    <article
      className="job-card"
      onClick={() => onView(job)}
    >
      <div className="job-card__accent" />

      <div className="job-card__top">
        <div className="job-card__icon">{job.emoji}</div>

        <div className="job-card__info">
          <div className="job-card__title">{job.title}</div>
          <div className="job-card__org">{job.org} · {job.dept}</div>
          <div className="job-card__tags">
            <span className="job-card__tag job-card__tag--state">{job.state}</span>
            <span className="job-card__tag job-card__tag--posts">✅ {job.posts.toLocaleString("en-IN")} Posts</span>
            <span className="job-card__tag job-card__tag--edu">{job.edu}</span>
            <Badge type={job.badge} />
          </div>
        </div>

        <div className="job-card__right">
          <div className="job-card__deadline-label">Last Date</div>
          <div className={`job-card__deadline-date ${job.urgent ? "job-card__deadline-date--urgent" : ""}`}>
            {job.deadline}
          </div>
          <button
            className="job-card__apply-btn"
            onClick={(e) => { e.stopPropagation(); onView(job); }}
          >
            Apply Now ↗
          </button>
          <button
            className={`job-card__save-btn ${saved ? "job-card__save-btn--saved" : "job-card__save-btn--unsaved"}`}
            onClick={(e) => { e.stopPropagation(); onSave(job.id); }}
          >
            {saved ? "✓ Saved" : "🔖 Save"}
          </button>
        </div>
      </div>

      <div className="job-card__footer">
        <span>📍 {job.state}</span>
        <span>💰 {job.salary}</span>
        <span>🎓 {job.edu}</span>
        <span>📅 Notif: {job.notifDate}</span>
      </div>
    </article>
  );
}
