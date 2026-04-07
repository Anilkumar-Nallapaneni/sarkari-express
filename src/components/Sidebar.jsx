// Sidebar component
// ─────────────────────────────────────────────────────────────
//  src/components/Sidebar.jsx
//  Right sidebar — Job Alert form, Latest jobs, Quick links
// ─────────────────────────────────────────────────────────────
import { useState } from "react";
import Card from "./shared/Card";
import AdBanner from "./shared/AdBanner";
import Badge from "./shared/Badge";

const QUICK_LINKS = [
  ["📋 Latest Results",  "results"],
  ["🎫 Admit Cards",     "admit"],
  ["📖 Syllabus",        "syllabus"],
  ["🔔 Job Alerts",      "alerts"],
  ["🔖 Saved Jobs",      "saved"],
];

const MOCK_TESTS = [
  { title: "SSC CGL Mock Test", duration: "20 min", questions: 25 },
  { title: "Railway Technician Test", duration: "18 min", questions: 20 },
  { title: "Bank PO Prelims Practice", duration: "22 min", questions: 30 },
];

export default function Sidebar({ setPage, latestJobs = [], onViewJob }) {
  const [name,   setName]   = useState("");
  const [mobile, setMobile] = useState("");
  const [email,  setEmail]  = useState("");
  const [sent,   setSent]   = useState(false);

  const isFormFilled = Boolean(name && mobile && email);

  const handleSubscribe = () => {
    if (isFormFilled) setSent(true);
  };

  const sectionTitle = (label) => (
    <div className="sidebar-card__heading">{label}</div>
  );

  return (
    <aside className="sidebar">

      {/* ── AD ── */}
      <AdBanner sidebar />

      {/* ── FREE JOB ALERT ── */}
      <Card className="sidebar-card">
        {sectionTitle("🔔 Free Job Alert")}
        <p className="sidebar-card__sub">Instant alerts for govt jobs matching your profile.</p>

        {sent ? (
          <div className="instant-alerts__success">
            <span className="instant-alerts__icon">✅</span>
            Subscribed! Instant alerts on the way.
          </div>
        ) : (
          <>
            <input
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="instant-alerts__input"
            />
            <input
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="instant-alerts__input"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="instant-alerts__input"
            />
            <button
              onClick={handleSubscribe}
              className={`instant-alerts__btn ${isFormFilled ? "" : "instant-alerts__btn:disabled"}`}
              disabled={!isFormFilled}
            >
              Subscribe Free →
            </button>
          </>
        )}
      </Card>

      {/* ── LATEST JOBS ── */}
      <Card className="sidebar-card">
        {sectionTitle("🔴 Just Added")}
        {latestJobs.slice(0, 5).map((j) => (
          <button
            key={j.id}
            type="button"
            className="sidebar__latest-item"
            onClick={() => onViewJob(j)}
          >
            <div className="sidebar__latest-title">
              {j.emoji} {j.title.length > 34 ? `${j.title.slice(0, 34)}…` : j.title}
            </div>
            <div className="sidebar__latest-meta">
              {j.state} · {j.posts.toLocaleString("en-IN")} Posts · Last: {j.deadline}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}><Badge type={j.badge} /></div>
          </button>
        ))}
      </Card>

      {/* ── QUICK LINKS ── */}
      <Card className="sidebar-card">
        {sectionTitle("📌 Quick Links")}
        {QUICK_LINKS.map(([label, target]) => (
          <button
            key={label}
            type="button"
            className="sidebar__link-btn"
            onClick={() => setPage(target)}
          >
            <span>{label}</span>
            <span className="sidebar__link-arrow">›</span>
          </button>
        ))}
      </Card>

      {/* ── MOCK TESTS ── */}
      <Card className="sidebar-card">
        {sectionTitle("🧪 Mock Tests")}
        <div className="sidebar__mock-list">
          {MOCK_TESTS.map((test) => (
            <div key={test.title} className="sidebar__mock-item">
              <div>
                <div className="sidebar__mock-title">{test.title}</div>
                <div className="sidebar__mock-meta">{test.questions} questions · {test.duration}</div>
              </div>
              <button
                type="button"
                className="sidebar__mock-btn"
                onClick={() => alert(`Starting ${test.title}...`)}
              >
                Start
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* ── SECOND AD ── */}
      <AdBanner sidebar label="AdSense 300×200 Second Slot" />

      {/* ── APP DOWNLOAD ── */}
      <div className="sidebar__download">
        <div className="sidebar__download-heading">📱 Download App</div>
        <p className="sidebar__download-text">Instant alerts. Never miss a deadline!</p>
        <button type="button" className="alert-form__btn sidebar__download-btn">📥 Get on Google Play</button>
      </div>

    </aside>
  );
}
