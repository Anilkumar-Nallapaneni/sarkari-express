// ─────────────────────────────────────────────────────────────
//  src/components/Navbar.jsx
//  Sticky top navigation bar with all page links
// ─────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { id: "home",     label: "🏠 Home"       },
  { id: "jobs",     label: "💼 All Jobs"   },
  { id: "mocktest", label: "🧪 Mock Tests" },
  { id: "results",  label: "📋 Results"    },
  { id: "admit",    label: "🎫 Admit Card" },
  { id: "syllabus", label: "📖 Syllabus"   },
  { id: "login",    label: "🔐 Login"      },
];

export default function Navbar({ page, setPage, goToJobs, savedCount = 0 }) {
  return (
    <nav className="navbar">
      <button className="navbar__brand" onClick={() => setPage("home")}> 
        <div className="navbar__brand-icon">SX</div>
        <span className="navbar__brand-name">Sarkari<span className="navbar__brand-accent">Xpress</span></span>
      </button>

      <div className="navbar__links">
        {NAV_LINKS.map((n) => (
          <button
            key={n.id}
            onClick={() => (n.id === "jobs" ? goToJobs() : setPage(n.id))}
            className={`navbar__link ${page === n.id ? "navbar__link--active" : ""}`}
          >
            {n.label}
          </button>
        ))}

        {/* <button className="navbar__alert-btn" onClick={() => setPage("alerts")}>🔔 Job Alert</button> */}

        <button className="navbar__saved-btn" onClick={() => setPage("saved")}> 
          🔖
          <span className="navbar__saved-count">{savedCount}</span>
        </button>
      </div>
    </nav>
  );
}
