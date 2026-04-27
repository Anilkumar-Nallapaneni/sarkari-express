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
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('fetched_at', { ascending: false });
        
        let mappedJobs = [];
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

        // Fetch Live Jobs directly from RSS to ensure the user sees them immediately 
        // even if Supabase insert fails due to RLS.
        try {
          const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://www.freejobalert.com/')}`;
          const response = await fetch(rssUrl);
          if (response.ok) {
            const result = await response.json();
            const STATES = [
              { name: "Andhra Pradesh", code: "ap" }, { name: "Arunachal Pradesh", code: "ar" }, { name: "Assam", code: "as" }, { name: "Bihar", code: "bihar" }, { name: "Chhattisgarh", code: "cg" }, { name: "Goa", code: "goa" }, { name: "Gujarat", code: "gj" }, { name: "Haryana", code: "hr" }, { name: "Himachal Pradesh", code: "hp" }, { name: "Jharkhand", code: "jh" }, { name: "Karnataka", code: "ka" }, { name: "Kerala", code: "kl" }, { name: "Madhya Pradesh", code: "mp" }, { name: "Maharashtra", code: "mh" }, { name: "Manipur", code: "mn" }, { name: "Meghalaya", code: "ml" }, { name: "Mizoram", code: "mz" }, { name: "Nagaland", code: "nl" }, { name: "Odisha", code: "or" }, { name: "Punjab", code: "pb" }, { name: "Rajasthan", code: "raj" }, { name: "Sikkim", code: "sk" }, { name: "Tamil Nadu", code: "tn" }, { name: "Telangana", code: "ts" }, { name: "Tripura", code: "tr" }, { name: "Uttar Pradesh", code: "up" }, { name: "Uttarakhand", code: "uk" }, { name: "West Bengal", code: "wb" }
            ];
            
            const extractJobMetadata = (title) => {
              let state = "Central Govt";
              let statecode = "central";
              let cat = "Other";
              
              const t = title.toLowerCase();
              
              for (const s of STATES) {
                if (t.includes(s.name.toLowerCase())) {
                  state = s.name;
                  statecode = s.code;
                  break;
                }
              }
              if (t.match(/\bup\b/) || t.includes("uppsc") || t.includes("uppbpb")) { state = "Uttar Pradesh"; statecode = "up"; }
              if (t.includes("rpsc") || t.includes("rsmssb")) { state = "Rajasthan"; statecode = "raj"; }
              if (t.includes("bpsc")) { state = "Bihar"; statecode = "bihar"; }
              if (t.includes("mpsc")) { state = "Maharashtra"; statecode = "mh"; }
              if (t.includes("ukpsc")) { state = "Uttarakhand"; statecode = "uk"; }
              if (t.includes("tnpsc")) { state = "Tamil Nadu"; statecode = "tn"; }
              
              if (t.includes("railway") || t.includes("rrb") || t.includes("rrc")) cat = "Railway";
              else if (t.includes("bank") || t.includes("ibps") || t.includes("sbi") || t.includes("rbi")) cat = "Banking";
              else if (t.includes("police") || t.includes("constable") || t.includes("defence") || t.includes("army") || t.includes("navy") || t.includes("air force") || t.includes("cisf") || t.includes("crpf") || t.includes("bsf")) cat = "Police";
              else if (t.includes("teach") || t.includes("tet") || t.includes("tgt") || t.includes("pgt") || t.includes("professor") || t.includes("school")) cat = "Teaching";
              else if (t.includes("medical") || t.includes("health") || t.includes("nurse") || t.includes("aiims") || t.includes("doctor")) cat = "Medical";
              else if (t.includes("engineer") || t.includes("je ") || t.includes("ae ") || t.includes("tech")) cat = "Engineering";
              else if (t.includes("psc") || t.includes("upsc")) cat = "PSC";
              else if (t.includes("ssc")) cat = "SSC";
              
              return { state, statecode, cat };
            };

            if (result.status === "ok" && result.items) {
              const liveRssJobs = result.items.map((item, i) => {
                const meta = extractJobMetadata(item.title);
                return {
                  id: 2000 + i, // High ID to avoid collision with mock data
                  source: 'FreeJobAlert',
                  title: item.title,
                  org: meta.cat === "Police" ? "Defence/Police" : (meta.cat === "Railway" ? "Indian Railways" : "Government Sector"),
                  dept: "",
                  state: meta.state,
                  statecode: meta.statecode,
                  posts: 1,
                  edu: "Check Notification",
                  salary: "As per rules",
                  deadline: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
                  notifdate: new Date().toISOString().split('T')[0],
                  examdate: "To be notified",
                  cat: meta.cat,
                  badge: "NEW",
                  urgent: false,
                  agemin: 18,
                  agemax: 35,
                  desc: item.content || item.description || "",
                  link: item.link || "#",
                  emoji: '🆕'
                };
              });

              // Merge avoiding exact title duplicates
              const existingTitles = new Set(mappedJobs.map(j => j.title));
              const uniqueLiveJobs = liveRssJobs.filter(j => !existingTitles.has(j.title));
              
              mappedJobs = [...uniqueLiveJobs, ...mappedJobs];
            }
          }
        } catch (rssError) {
          console.error("RSS Fetch Error:", rssError);
        }

        if (mappedJobs.length > 0) {
          setJobsData(mappedJobs);
        }
      } catch (err) {
        console.error("Error fetching live jobs:", err);
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
