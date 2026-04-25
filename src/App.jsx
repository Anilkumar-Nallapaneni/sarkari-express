// ─────────────────────────────────────────────────────────────
//  src/App.jsx
//  Root application component
//  Manages: page routing, saved-jobs state, job-detail state,
//           active filter, notification popup
// ─────────────────────────────────────────────────────────────
import { useState, useCallback } from "react";

// Layout
import Ticker      from "./components/Ticker";
import Navbar      from "./components/Navbar";
import Footer      from "./components/Footer";
import NotifPopup  from "./components/NotifPopup";

// Pages
import HomePage       from "./pages/HomePage";
import JobsPage       from "./pages/JobsPage";
import JobDetailPage  from "./pages/JobDetailPage";
import MockTestPage   from "./pages/MockTestPage";
import ResultsPage    from "./pages/ResultsPage";
import AdmitCardPage  from "./pages/AdmitCardPage";
import SyllabusPage   from "./pages/SyllabusPage";
import LoginPage      from "./pages/LoginPage";
import SavedJobsPage  from "./pages/SavedJobsPage";

// Data
import { JOBS_DATA }  from "./data/mockData";

// ── Initial saved jobs (IDs 1 and 5 pre-saved for demo) ──
const INITIAL_SAVED = [1, 5];

export default function App() {
  /* ── ROUTING ── */
  const [page,     setPage]     = useState("home");
  const [prevPage, setPrevPage] = useState("home");

  /* ── JOB DETAIL ── */
  const [viewJob, setViewJob] = useState(null);

  /* ── SAVED JOBS ── */
  const [savedJobs, setSavedJobs] = useState(INITIAL_SAVED);

  /* ── ACTIVE FILTER  (passed from HomePage → JobsPage) ── */
  const [filter, setFilter] = useState({ q: "", state: "", cat: "", lang: "all" });

  /* ── Navigate helper (scrolls to top) ── */
  const navigate = useCallback(
    (targetPage) => {
      setPrevPage(page);
      setPage(targetPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [page]
  );

  /* ── Open job detail ── */
  const onViewJob = useCallback(
    (job) => {
      setViewJob(job);
      setPrevPage(page);
      setPage("detail");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [page]
  );

  /* ── Toggle save ── */
  const onSave = useCallback((id) => {
    setSavedJobs((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  }, []);

  /* ── Apply filter then go to jobs page ── */
  const applyFilter = useCallback((newFilter) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  }, []);

  /* ── Go to jobs page with all filters reset ── */
  const goToJobs = useCallback(() => {
    setPrevPage(page);
    setFilter((prev) => ({ ...prev, q: "", state: "", cat: "" }));
    setPage("jobs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  /* ── Page renderer ── */
  const renderPage = () => {
    switch (page) {
      case "detail":
        return (
          <JobDetailPage
            job={viewJob}
            saved={savedJobs.includes(viewJob?.id)}
            onSave={onSave}
            onBack={() => navigate(prevPage)}
            goToMockTest={() => navigate("mocktest")}
            selectedLang={filter.lang || "all"}
            onLanguageChange={(lang) => applyFilter({ lang })}
          />
        );
      case "mocktest":
        return (
          <MockTestPage
            job={viewJob}
            onBack={() => navigate(viewJob ? "detail" : "home")}
          />
        );
      case "jobs":
        return (
          <JobsPage
            savedJobs={savedJobs}
            onSave={onSave}
            onViewJob={onViewJob}
            setPage={navigate}
            initialFilter={filter}
          />
        );
      case "results":
        return <ResultsPage />;
      case "admit":
        return <AdmitCardPage />;
      case "syllabus":
        return <SyllabusPage />;
      case "login":
        return <LoginPage />;
      case "saved":
        return (
          <SavedJobsPage
            savedJobs={savedJobs}
            onSave={onSave}
            onViewJob={onViewJob}
            setPage={navigate}
          />
        );
      case "home":
      default:
        return (
          <HomePage
            setPage={navigate}
            savedJobs={savedJobs}
            onSave={onSave}
            onViewJob={onViewJob}
            setFilter={applyFilter}
            selectedLang={filter.lang || "all"}
            onLanguageChange={(lang) => applyFilter({ lang })}
          />
        );
    }
  };

  return (
    <div className="app-root">
      {/* ── TOP BAR ── */}
      <Ticker />
      <Navbar page={page} setPage={navigate} goToJobs={goToJobs} savedCount={savedJobs.length} />

      {/* ── MAIN CONTENT ── */}
      <main className="app-main">
        {renderPage()}
      </main>

      {/* ── FOOTER ── */}
      <Footer setPage={navigate} />

      {/* ── NOTIFICATION POPUP (home page only) ── */}
      {page === "home" && (
        <NotifPopup
          job={JOBS_DATA[5]} // SSC CGL
          onViewJob={onViewJob}
        />
      )}
    </div>
  );
}
