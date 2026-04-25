import Badge from "../components/shared/Badge";
import LanguageSelector from "../components/LanguageSelector";
import { INDIAN_LANGUAGES } from "../data/languageData";
import { getJobDetailText } from "../data/jobDetailI18n";

export default function JobDetailPage({
  job,
  saved,
  onSave,
  onBack,
  goToMockTest,
  selectedLang = "all",
  onLanguageChange,
}) {
  if (!job) return null;

  const t = getJobDetailText(selectedLang, job);
  const activeLanguage =
    INDIAN_LANGUAGES.find((lang) => lang.code === selectedLang) || INDIAN_LANGUAGES[0];

  const statBox = (label, value) => (
    <div className="detail-card__stat" key={label}>
      <div className="detail-card__stat-label">{label}</div>
      <div className="detail-card__stat-value">{value}</div>
    </div>
  );

  return (
    <div className="detail-page">
      <div className="detail-page__topbar">
        <button onClick={onBack} className="detail-page__back">
          ← {t.back}
        </button>
        <div className="detail-page__lang-selector">
          <div className="detail-page__lang-label">
            🌐 {t.langNotice}: <strong>{activeLanguage.native}</strong>
          </div>
          <LanguageSelector selectedLang={selectedLang} onLanguageChange={onLanguageChange} />
        </div>
      </div>

      <div className="detail-page__content">
        <div className="detail-page__main">
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

                {/* No action buttons here, moved to sidebar */}
              </div>
            </div>
          </div>

          <div className="detail-card__stats">
            {statBox(`📋 ${t.totalPosts}`, job.posts.toLocaleString("en-IN"))}
            {statBox(`💰 ${t.salary}`, job.salary)}
            {statBox(`🎓 ${t.education}`, job.edu)}
            {statBox(`🗓 ${t.lastDateShort}`, job.deadline)}
            {statBox(`📅 ${t.examDateShort}`, job.examDate)}
          </div>

          <div className="detail-card__body">
            <div>
              <h3 className="detail-card__section-title">📄 {t.about}</h3>
              <p className="detail-card__desc">{t.descText}</p>

              <h3 className="detail-card__section-title">🔢 {t.ageLimit}</h3>
              <p className="detail-card__desc">
                {t.min}: <strong>{job.ageMin} {t.years}</strong> &nbsp;|&nbsp; {t.max}:
                <strong>{job.ageMax} {t.years}</strong>
              </p>
              <p className="detail-card__desc">{t.ageNote}</p>

              <h3 className="detail-card__section-title">💳 {t.appFee}</h3>
              <div className="fee-grid">
                {[
                  [t.general, job.appFee.gen],
                  [t.scst, job.appFee.sc],
                  [t.female, job.appFee.female],
                ].map(([cat, fee]) => (
                  <div className="fee-box" key={cat}>
                    <div className="fee-box__cat">{cat}</div>
                    <div className={`fee-box__amount ${fee === 0 ? "fee-box__amount--free" : ""}`}>
                      {fee === 0 ? t.free : `₹${fee}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="detail-card__section-title">✅ {t.howToApply}</h3>
              <div className="apply-steps">
                {t.stepList.map((step, i) => (
                  <div className="apply-step" key={i}>
                    <div className="apply-step__num">{i + 1}</div>
                    <span className="apply-step__text">{step}</span>
                  </div>
                ))}
              </div>

              <div className="dates-box">
                <div className="dates-box__heading">⚠️ {t.dates}</div>
                {[
                  [t.notifDate, job.notifDate],
                  [t.lastDate, job.deadline],
                  [t.examDate, job.examDate],
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
              🌐 {t.officialWebsite} ↗
            </button>
          </div>
          </div>
        
        {/* Sidebar for ads and other content */}
        <div className="detail-page__sidebar">
          <div className="ad-banner">
            <div className="ad-banner__label">Advertisement</div>
            <div className="ad-banner__content">
              <div className="ad-banner__placeholder">
                📢 Download Advertisement PDF
              </div>
            </div>
          </div>
          
          <div className="sidebar-card">
            <h4 className="sidebar-card__title">📥 Quick Actions</h4>
            <div className="sidebar-actions-grid">
              <button
                onClick={() => window.open(job.link, "_blank")}
                className="btn-apply"
              >
                Apply on Official Site ↗
              </button>
              <button
                onClick={goToMockTest}
                className="btn-mock"
              >
                🧪 Mock Test
              </button>
              <button
                onClick={() => {
                  // Simulate downloading advertisement PDF
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = `${job.title.replace(/\s+/g, '_')}_Advertisement.pdf`;
                  link.click();
                  alert(`Downloading ${job.title} advertisement...`);
                }}
                className="btn-advertisement"
              >
                📄 Download Advertisement
              </button>
              <button
                onClick={() => {
                  // Simulate downloading syllabus PDF
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = `${job.title.replace(/\s+/g, '_')}_Syllabus.pdf`;
                  link.click();
                  alert(`Downloading ${job.title} syllabus...`);
                }}
                className="btn-syllabus"
              >
                📚 Download Syllabus
              </button>
              <button
                onClick={() => {
                  // Simulate downloading previous papers PDF
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = `${job.title.replace(/\s+/g, '_')}_Previous_Papers.pdf`;
                  link.click();
                  alert(`Downloading ${job.title} previous papers...`);
                }}
                className="btn-papers"
              >
                📝 Download Previous Papers
              </button>
              <button
                onClick={() => onSave(job.id)}
                className={`btn-save${saved ? ' saved' : ''}`}
              >
                {saved ? "✓ Saved" : "🔖 Save Job"}
              </button>
            </div>
          </div>
          
          <div className="sidebar-card">
            <h4 className="sidebar-card__title">🔔 Similar Jobs</h4>
            <ul className="sidebar-card__list">
              <li>
                <a href="#" className="sidebar-card__link">
                  SSC CHSL 2026
                </a>
              </li>
              <li>
                <a href="#" className="sidebar-card__link">
                  Railway Group D
                </a>
              </li>
              <li>
                <a href="#" className="sidebar-card__link">
                  UPSC Civil Services
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
