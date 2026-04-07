import Badge from "../components/shared/Badge";

export default function JobDetailPage({ job, saved, onSave, onBack, goToMockTest }) {
  if (!job) return null;

  const statBox = (label, value) => (
    <div className="detail-card__stat" key={label}>
      <div className="detail-card__stat-label">{label}</div>
      <div className="detail-card__stat-value">{value}</div>
    </div>
  );

  return (
    <div className="detail-page">
      <button onClick={onBack} className="detail-page__back">
        ← Back to Jobs
      </button>

      <div className="detail-card">
        <div className="detail-card__header">
          <div className="detail-card__emoji">{job.emoji}</div>
          <div className="detail-card__header-info">
            <div className="detail-card__badges">
              <Badge type={job.badge} />
              <Badge type="NEW" text={job.state} />
              {job.urgent && <Badge type="HOT" text="⚠️ Urgent" />}
            </div>

            <h1 className="detail-card__title">{job.title}</h1>
            <p className="detail-card__org">{job.org} · {job.dept}</p>

            <div className="detail-card__actions">
              <button
                onClick={() => window.open(job.link, "_blank")}
                className="detail-card__apply-btn"
              >
                Apply on Official Site ↗
              </button>
              <button
                onClick={goToMockTest}
                className="detail-card__mock-btn"
              >
                🧪 Mock Test
              </button>
              <button
                onClick={() => {
                  // Simulate downloading advertisement PDF
                  const link = document.createElement('a');
                  link.href = '#'; // In a real app, this would be the actual PDF URL
                  link.download = `${job.title.replace(/\s+/g, '_')}_Advertisement.pdf`;
                  link.click();
                  
                  // Show success message
                  alert(`Downloading ${job.title} advertisement...`);
                }}
                className="detail-card__download-btn"
              >
                📄 Download Advertisement
              </button>
              <button
                onClick={() => {
                  // Simulate downloading syllabus PDF
                  const link = document.createElement('a');
                  link.href = '#'; // In a real app, this would be the actual PDF URL
                  link.download = `${job.title.replace(/\s+/g, '_')}_Syllabus.pdf`;
                  link.click();
                  
                  // Show success message
                  alert(`Downloading ${job.title} syllabus...`);
                }}
                className="detail-card__syllabus-btn"
              >
                📚 Download Syllabus
              </button>
              <button
                onClick={() => {
                  // Simulate downloading previous papers PDF
                  const link = document.createElement('a');
                  link.href = '#'; // In a real app, this would be the actual PDF URL
                  link.download = `${job.title.replace(/\s+/g, '_')}_Previous_Papers.pdf`;
                  link.click();
                  
                  // Show success message
                  alert(`Downloading ${job.title} previous papers...`);
                }}
                className="detail-card__papers-btn"
              >
                📝 Download Previous Papers
              </button>
              <button
                onClick={() => onSave(job.id)}
                className="detail-card__save-btn"
              >
                {saved ? "✓ Saved" : "🔖 Save Job"}
              </button>
            </div>
          </div>
        </div>

        <div className="detail-card__stats">
          {statBox("📋 Total Posts", job.posts.toLocaleString("en-IN"))}
          {statBox("💰 Salary", job.salary)}
          {statBox("🎓 Education", job.edu)}
          {statBox("🗓 Last Date", job.deadline)}
          {statBox("📅 Exam Date", job.examDate)}
        </div>

        <div className="detail-card__body">
          <div>
            <h3 className="detail-card__section-title">📄 About this Recruitment</h3>
            <p className="detail-card__desc">{job.desc}</p>

            <h3 className="detail-card__section-title">🔢 Age Limit</h3>
            <p className="detail-card__desc">
              Minimum: <strong>{job.ageMin} years</strong> &nbsp;|&nbsp; Maximum:
              <strong>{job.ageMax} years</strong>
            </p>
            <p className="detail-card__desc">Age relaxation applicable for SC/ST/OBC/PwD as per Govt. norms.</p>

            <h3 className="detail-card__section-title">💳 Application Fee</h3>
            <div className="fee-grid">
              {[
                ["General", job.appFee.gen],
                ["SC/ST", job.appFee.sc],
                ["Female", job.appFee.female],
              ].map(([cat, fee]) => (
                <div className="fee-box" key={cat}>
                  <div className="fee-box__cat">{cat}</div>
                  <div className={`fee-box__amount ${fee === 0 ? "fee-box__amount--free" : ""}`}>
                    {fee === 0 ? "FREE" : `₹${fee}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="detail-card__section-title">✅ How to Apply</h3>
            <div className="apply-steps">
              {job.steps.map((step, i) => (
                <div className="apply-step" key={i}>
                  <div className="apply-step__num">{i + 1}</div>
                  <span className="apply-step__text">{step}</span>
                </div>
              ))}
            </div>

            <div className="dates-box">
              <div className="dates-box__heading">⚠️ Important Dates</div>
              {[
                ["Notification Date", job.notifDate],
                ["Last Date to Apply", job.deadline],
                ["Exam Date", job.examDate],
              ].map(([label, value]) => (
                <div className="dates-box__row" key={label}>
                  <span className="dates-box__row-label">{label}</span>
                  <span className="dates-box__row-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="detail-card__footer-actions">
          <button
            onClick={() => window.open(job.link, "_blank")}
            className="btn-primary"
          >
            🌐 Apply on Official Website ↗
          </button>
        </div>
      </div>
    </div>
  );
}
