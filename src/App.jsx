// ─────────────────────────────────────────────────────────────
//  src/App.jsx
//  Root application component
//  Manages: page routing, saved-jobs state, job-detail state,
//           active filter, notification popup
// ─────────────────────────────────────────────────────────────
import { useState, useCallback, useEffect } from "react";
import { supabase } from "./supabaseClient";

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
import { fetchAllLiveJobs, getSampleJobsByState } from "./utils/jobFetcher";
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

  /* ── LIVE JOBS DATA ── */
  const [jobsData, setJobsData] = useState(JOBS_DATA);

  useEffect(() => {
    async function fetchLiveJobs() {
      let mappedJobs = [];
      try {
        // First try to fetch from Supabase database
        const { data } = await supabase
          .from('jobs')
          .select('*')
          .order('fetched_at', { ascending: false })
          .limit(100);
        
        if (data && data.length > 0) {
          mappedJobs = data.map(dbJob => ({
            id: dbJob.id,
            source: dbJob.source,
            title: dbJob.title,
            org: dbJob.organization || 'Government Sector',
            dept: dbJob.department || '',
            state: dbJob.state || 'Central Govt',
            statecode: dbJob.state_code || 'central',
            posts: dbJob.posts || 1,
            edu: dbJob.education || 'All',
            salary: dbJob.salary || 'As per rules',
            deadline: dbJob.deadline || new Date().toISOString().split('T')[0],
            notifdate: dbJob.notification_date || dbJob.fetched_at?.split('T')[0] || new Date().toISOString().split('T')[0],
            examdate: dbJob.exam_date || 'To be notified',
            cat: dbJob.category || 'Other',
            badge: dbJob.badge || 'NEW',
            urgent: dbJob.is_urgent || false,
            agemin: dbJob.age_min || 18,
            agemax: dbJob.age_max || 35,
            desc: dbJob.description || '',
            link: dbJob.official_link || '#',
            emoji: '🏛️'
          }));
        }

        // Fetch Live Jobs from RSS feeds via jobFetcher
        try {
          console.log('🔄 Fetching live jobs from RSS feeds...');
          const rssJobs = await fetchAllLiveJobs();
          if (rssJobs && rssJobs.length > 0) {
            console.log(`✅ Found ${rssJobs.length} jobs from RSS feeds`);
            const existingTitles = new Set(mappedJobs.map(j => j.title.toLowerCase()));
            const uniqueRssJobs = rssJobs.filter(j => !existingTitles.has(j.title.toLowerCase()));
            mappedJobs = [...uniqueRssJobs, ...mappedJobs];
          }
        } catch (rssError) {
          console.error("RSS Fetch Error:", rssError);
        }

        // Fetch from external API as backup
        try {
          console.log('🔄 Fetching from external API...');
          const response = await fetch('https://sarkari-express.vercel.app/api/jobs');
          const result = await response.json();
          
          if (result.success && result.jobs && result.jobs.length > 0) {
            console.log(`✅ Found ${result.jobs.length} jobs from external API`);
            const existingTitles = new Set(mappedJobs.map(j => j.title.toLowerCase()));
            const uniqueApiJobs = result.jobs.filter(j => !existingTitles.has(j.title.toLowerCase()));
            mappedJobs = [...uniqueApiJobs, ...mappedJobs];
          }
        } catch (apiError) {
          console.error("API Fetch Error:", apiError);
        }

        // If no jobs from database or RSS, use sample jobs for all states
        if (mappedJobs.length === 0) {
          console.log('📋 Using sample jobs for all Indian states...');
          mappedJobs = getSampleJobsByState();
        }

        if (mappedJobs.length > 0) {
          setJobsData(mappedJobs);
        }
      } catch (err) {
        console.error("Error fetching live jobs:", err);
        // Fallback to sample jobs on error
        setJobsData(getSampleJobsByState());
      }
    }
    fetchLiveJobs();
  }, []);

  /* ── ACTIVE FILTER  (passed from HomePage → JobsPage) ── */
  const [filter, setFilter] = useState({ q: "", state: "", cat: "" });

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
            setPage={navigate}
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
            jobsData={jobsData}
          />
        );
      case "results":
        return <ResultsPage jobsData={jobsData} />;
      case "admit":
        return <AdmitCardPage jobsData={jobsData} />;
      case "syllabus":
        return <SyllabusPage jobsData={jobsData} />;
      case "login":
        return <LoginPage />;
      case "saved":
        return (
          <SavedJobsPage
            savedJobs={savedJobs}
            onSave={onSave}
            onViewJob={onViewJob}
            setPage={navigate}
            jobsData={jobsData}
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
            jobsData={jobsData}
          />
        );
    }
  };

  return (
    <div className="app-root">
      {/* ── TOP BAR ── */}
      <Ticker jobsData={jobsData} />
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
