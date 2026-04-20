import Badge from "./shared/Badge";

export default function Sidebar({ setPage, latestJobs, onViewJob }) {
  return (
    <aside className="sidebar">
      {/* Job Alert Form */}
      <div className="sidebar-card">
        <div className="sidebar-card__heading">📢 Job Alert</div>
        <div className="sidebar-card__sub">
          Get instant notifications for new government jobs matching your preferences.
        </div>
        <form className="sidebar__form" style={{ marginTop: "16px" }}>
          <input
            type="email"
            placeholder="Enter your email"
            className="search-bar__input"
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "1.5px solid var(--border)",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "12px"
            }}
          />
          <button type="submit" className="btn-primary btn-block">
            Subscribe Now →
          </button>
        </form>
      </div>

      {/* Latest Jobs */}
      <div className="sidebar-card">
        <div className="sidebar-card__heading">⚡ Latest Jobs</div>
        <div className="sidebar-card__sub">
          Fresh government job notifications from across India.
        </div>
        <div>
          {latestJobs.slice(0, 5).map((job) => (
            <div
              key={job.id}
              className="sidebar__latest-item"
              onClick={() => onViewJob(job)}
            >
              <div className="sidebar__latest-title">
                {job.emoji} {job.title.length > 35 ? `${job.title.slice(0, 35)}…` : job.title}
              </div>
              <div className="sidebar__latest-meta">
                {job.state} · {job.posts.toLocaleString("en-IN")} posts
              </div>
              <Badge type={job.badge} />
            </div>
          ))}
        </div>
        <button
          onClick={() => setPage("jobs")}
          className="btn-primary btn-block"
          style={{ marginTop: "16px" }}
        >
          View All Jobs →
        </button>
      </div>

      {/* Quick Links */}
      <div className="sidebar-card">
        <div className="sidebar-card__heading">🔗 Quick Links</div>
        <div className="sidebar-card__sub">
          Access important government job resources instantly.
        </div>
        <div>
          <button className="sidebar__link-btn" onClick={() => setPage("results")}>
            Results <span className="sidebar__link-arrow">→</span>
          </button>
          <button className="sidebar__link-btn" onClick={() => setPage("admit")}>
            Admit Cards <span className="sidebar__link-arrow">→</span>
          </button>
          <button className="sidebar__link-btn" onClick={() => setPage("syllabus")}>
            Syllabus <span className="sidebar__link-arrow">→</span>
          </button>
          <button className="sidebar__link-btn" onClick={() => setPage("saved")}>
            Saved Jobs <span className="sidebar__link-arrow">→</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

