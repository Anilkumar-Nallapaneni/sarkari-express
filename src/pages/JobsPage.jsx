import { useState, useMemo } from "react";
import JobCard from "../components/JobCard";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/shared/Pagination";
import EmptyState from "../components/shared/EmptyState";
import { CATS_DATA, STATES_DATA } from "../data/mockData";

const STATE_OPTIONS = ["All", "Central Govt", ...STATES_DATA.map((s) => s.name)];
const EDU_OPTIONS   = ["All","10th Pass","12th Pass","ITI/Diploma","Graduate","Post Graduate"];
const PER_PAGE      = 6;

export default function JobsPage({ savedJobs, onSave, onViewJob, setPage: navigatePage, initialFilter = {}, jobsData = [] }) {
  const [q,             setQ]           = useState(initialFilter.q     || "");
  const [stateF,        setStateF]      = useState(initialFilter.state || "All");
  const [catF,          setCatF]        = useState(initialFilter.cat   || "All");
  const [eduF,          setEduF]        = useState("All");
  const [sortBy,        setSortBy]      = useState("newest");
  const [currentPage,   setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let r = [...jobsData];
    if (q)              r = r.filter((j) => j.title.toLowerCase().includes(q.toLowerCase()) || j.org.toLowerCase().includes(q.toLowerCase()) || j.state.toLowerCase().includes(q.toLowerCase()));
    if (stateF !== "All" && stateF) r = r.filter((j) => j.state === stateF);
    if (catF   !== "All" && catF)   r = r.filter((j) => j.cat   === catF);
    if (eduF   !== "All")           r = r.filter((j) => j.edu.toLowerCase().includes(eduF.toLowerCase().replace(" pass", "")));
    if (sortBy === "posts")    r.sort((a, b) => b.posts - a.posts);
    if (sortBy === "deadline") r.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    return r;
  }, [q, stateF, catF, eduF, sortBy, jobsData]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown      = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const hasFilter  = q || stateF !== "All" || catF !== "All" || eduF !== "All";

  const clearFilters = () => { setQ(""); setStateF("All"); setCatF("All"); setEduF("All"); setCurrentPage(1); };
  const onPageChange = (n) => { setCurrentPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="page-layout">
      <div>
        <div className="search-bar search-bar--page" style={{ flexWrap: 'wrap', gap: '10px' }}>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setCurrentPage(1); }}
            placeholder="Search jobs..."
            style={{ minWidth: '200px' }}
          />

          <select value={stateF} onChange={(e) => { setStateF(e.target.value); setCurrentPage(1); }} className="search-bar__select">
            {STATE_OPTIONS.map(s => <option key={s} value={s}>{s === "All" ? "All States" : s}</option>)}
          </select>
          
          <select value={catF} onChange={(e) => { setCatF(e.target.value); setCurrentPage(1); }} className="search-bar__select">
            {["All Categories", ...CATS_DATA.map(c => c.code)].map(c => <option key={c} value={c === "All Categories" ? "All" : c}>{c}</option>)}
          </select>
          
          <select value={eduF} onChange={(e) => { setEduF(e.target.value); setCurrentPage(1); }} className="search-bar__select">
            {EDU_OPTIONS.map(e => <option key={e} value={e}>{e === "All" ? "All Education" : e}</option>)}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="search-bar__select">
            <option value="newest">Sort: Newest</option>
            <option value="posts">Sort: Most Posts</option>
            <option value="deadline">Sort: Deadline Soon</option>
          </select>

          {hasFilter && (
            <button className="search-bar__clear-btn" onClick={clearFilters}>✕ Clear Filters</button>
          )}
        </div>

        <div className="result-count">
          <span className="result-count__text">
            {filtered.length} vacanc{filtered.length === 1 ? "y" : "ies"} found{q ? ` for "${q}"` : ""}
          </span>
          <span className="result-count__page">Page {currentPage} / {totalPages}</span>
        </div>

        <div className="jobs-stack">
          {shown.length === 0 ? (
            <EmptyState icon="🔍" title="No jobs found" sub="Try adjusting your filters or search term" action="Clear All Filters" onAction={clearFilters} />
          ) : (
            shown.map((j) => (
              <JobCard
                key={j.id}
                job={j}
                saved={savedJobs.includes(j.id)}
                onSave={onSave}
                onView={onViewJob}
              />
            ))
          )}
        </div>

        <Pagination current={currentPage} total={totalPages} onChange={onPageChange} />
      </div>

      <Sidebar setPage={navigatePage} latestJobs={jobsData} onViewJob={onViewJob} />
    </div>
  );
}
