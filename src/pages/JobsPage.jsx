import { useState, useMemo } from "react";
import JobCard from "../components/JobCard";
import Sidebar from "../components/Sidebar";
import Pill from "../components/shared/Pill";
import Pagination from "../components/shared/Pagination";
import EmptyState from "../components/shared/EmptyState";
import { JOBS_DATA, CATS_DATA } from "../data/mockData";

const STATE_OPTIONS = ["All","Central Govt","Uttar Pradesh","Bihar","Rajasthan","Maharashtra","Delhi","Tamil Nadu","Karnataka","Gujarat","Haryana","Uttarakhand","Kerala"];
const EDU_OPTIONS   = ["All","10th Pass","12th Pass","ITI/Diploma","Graduate","Post Graduate"];
const PER_PAGE      = 6;

export default function JobsPage({ savedJobs, onSave, onViewJob, setPage: navigatePage, initialFilter = {} }) {
  const [q,             setQ]           = useState(initialFilter.q     || "");
  const [stateF,        setStateF]      = useState(initialFilter.state || "All");
  const [catF,          setCatF]        = useState(initialFilter.cat   || "All");
  const [eduF,          setEduF]        = useState("All");
  const [sortBy,        setSortBy]      = useState("newest");
  const [currentPage,   setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let r = [...JOBS_DATA];
    if (q)              r = r.filter((j) => j.title.toLowerCase().includes(q.toLowerCase()) || j.org.toLowerCase().includes(q.toLowerCase()) || j.state.toLowerCase().includes(q.toLowerCase()));
    if (stateF !== "All" && stateF) r = r.filter((j) => j.state === stateF);
    if (catF   !== "All" && catF)   r = r.filter((j) => j.cat   === catF);
    if (eduF   !== "All")           r = r.filter((j) => j.edu.toLowerCase().includes(eduF.toLowerCase().replace(" pass", "")));
    if (sortBy === "posts")    r.sort((a, b) => b.posts - a.posts);
    if (sortBy === "deadline") r.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    return r;
  }, [q, stateF, catF, eduF, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const shown      = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const hasFilter  = q || stateF !== "All" || catF !== "All" || eduF !== "All";

  const clearFilters = () => { setQ(""); setStateF("All"); setCatF("All"); setEduF("All"); setCurrentPage(1); };
  const onPageChange = (n) => { setCurrentPage(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="page-layout">
      <div>
        <div className="search-bar search-bar--page">
          <input
            value={q}
              onChange={(e) => { setQ(e.target.value); setCurrentPage(1); }}
          />

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="search-bar__select">
            <option value="newest">Sort: Newest</option>
            <option value="posts">Sort: Most Posts</option>
            <option value="deadline">Sort: Deadline Soon</option>
          </select>

          {hasFilter && (
            <button className="search-bar__clear-btn" onClick={clearFilters}>✕ Clear Filters</button>
          )}
        </div>

        <div className="filter-row">
          <div className="filter-row__label">State</div>
          <div className="filter-pills">
            {STATE_OPTIONS.map((s) => (
              <Pill key={s} active={stateF === s} onClick={() => { setStateF(s); setCurrentPage(1); }}>{s}</Pill>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-row__label">Category</div>
          <div className="filter-pills">
            { ["All", ...CATS_DATA.map((c) => c.code)].map((c) => (
              <Pill key={c} active={catF === c} onClick={() => { setCatF(c); setCurrentPage(1); }}>{c}</Pill>
            )) }
          </div>
        </div>

        <div className="filter-row">
          <div className="filter-row__label">Education</div>
          <div className="filter-pills">
            {EDU_OPTIONS.map((e) => (
              <Pill key={e} active={eduF === e} onClick={() => { setEduF(e); setCurrentPage(1); }}>{e}</Pill>
            ))}
          </div>
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
              <JobCard key={j.id} job={j} saved={savedJobs.includes(j.id)} onSave={onSave} onView={onViewJob} />
            ))
          )}
        </div>

        <Pagination current={currentPage} total={totalPages} onChange={onPageChange} />
      </div>

      <Sidebar setPage={navigatePage} latestJobs={JOBS_DATA} onViewJob={onViewJob} />
    </div>
  );
}
