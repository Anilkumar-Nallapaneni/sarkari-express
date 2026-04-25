import { useMemo, useState } from "react";
import JobCard from "../components/JobCard";
import Sidebar from "../components/Sidebar";
import AdBanner from "../components/shared/AdBanner";
import SectionHeader from "../components/shared/SectionHeader";
import Card from "../components/shared/Card";
import Badge from "../components/shared/Badge";
import LanguageSelector from "../components/LanguageSelector";
import { JOBS_DATA, STATES_DATA, CATS_DATA } from "../data/mockData";
import { getJobLanguageCodes } from "../data/languageData";

export default function HomePage({
  setPage,
  savedJobs,
  onSave,
  onViewJob,
  setFilter,
  selectedLang = "all",
  onLanguageChange,
}) {
  const [q, setQ]         = useState("");
  const [state, setState] = useState("All States");
  const lang = selectedLang;

  const languageFilteredJobs = useMemo(() => {
    if (!lang || lang === "all") return JOBS_DATA;
    return JOBS_DATA.filter((job) => getJobLanguageCodes(job).includes(lang));
  }, [lang]);

  const handleSearch = () => {
    setFilter({ q, state: state === "All States" ? "" : state, cat: "", edu: "All", lang });
    setPage("jobs");
  };

  const handleLanguageChange = (languageCode) => {
    onLanguageChange?.(languageCode);
    setFilter({ lang: languageCode });
  };

  return (
    <div>
      {/* Top bar with language selector */}
      <div className="top-bar">
        <div className="top-bar__inner">
          <div className="top-bar__tagline">🇮🇳 IndiaGovtJobHub - Your Gateway to Government Jobs</div>
          <LanguageSelector selectedLang={lang} onLanguageChange={handleLanguageChange} />
        </div>
      </div>

      <section className="hero">
        <div className="hero__inner">
          <div>
            <div className="hero__live-pill">
              <span className="hero__live-dot" />
              {languageFilteredJobs.length}+ Active Job Notifications Today
            </div>

            <h1 className="hero__title">
              Find Your<br />
              <span className="hero__title-accent">IndiaGovtJobHub</span> Dream<br />
              Job Faster.
            </h1>

            <p className="hero__subtitle">
              India&apos;s most modern govt job portal — 28 states, real-time updates, smart alerts, all in one beautiful place.
            </p>

            <div className="search-bar search-bar--page hero__search">
              <span>🔍</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search — SSC, UPSC, Railway, Police, Bank..."
                className="search-bar__input"
              />
              <select value={state} onChange={(e) => setState(e.target.value)} className="search-bar__select">
                {["All States", ...STATES_DATA.map((s) => s.name)].map((sItem) => (
                  <option key={sItem}>{sItem}</option>
                ))}
              </select>
              <button onClick={handleSearch} className="search-bar__btn">Search →</button>
            </div>

            <div className="stats-row">
              {[
                { value: "2.4L+", label: "Active Jobs" },
                { value: "28", label: "States" },
                { value: "50K+", label: "Daily Users" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="hero__stat-value">{item.value}</div>
                  <div className="hero__stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__card">
            <div className="hero__card-heading">
              <span className="hero__card-dot" />
              Just Added
            </div>
            {languageFilteredJobs.slice(0, 6).map((j) => (
              <div
                key={j.id}
                className="latest-card__item"
                role="button"
                tabIndex={0}
                onClick={() => onViewJob(j)}
              >
                <div className="latest-card__item-row">
                  <span className="latest-card__item-title">
                    {j.emoji} {j.title.length > 36 ? `${j.title.slice(0, 36)}…` : j.title}
                  </span>
                  <Badge type={j.badge} />
                </div>
                <div className="latest-card__item-meta">
                  {j.state} · {j.posts.toLocaleString("en-IN")} Posts · Last: {j.deadline}
                </div>
              </div>
            ))}
            <button onClick={() => { setFilter({ q: "", state: "", cat: "", edu: "All", lang }); setPage("jobs"); }} className="btn-primary btn-block">
              View All Jobs →
            </button>
          </div>
        </div>
      </section>

      <div className="ad-top-strip">📢 Advertisement — Google AdSense 728×90 Top Banner</div>

      <div className="page-layout">
        <div>
          <div className="home__block">
            <SectionHeader title="Browse by" accent="State" sub="Click any state to see all vacancies" action="All States" onAction={() => { setFilter({ q: "", state: "", cat: "", edu: "All", lang }); setPage("jobs"); }} />
            <div className="state-grid">
              {STATES_DATA.map((s) => (
                <Card key={s.name} onClick={() => { setFilter({ state: s.name, q: "", cat: "", edu: "All", lang }); setPage("jobs"); }} className="state-card">
                  <div className="state-card__icon state-card__icon--centered">{s.icon}</div>
                  <div className="state-card__name">{s.name}</div>
                  <div className="state-card__count">{s.count} jobs</div>
                </Card>
              ))}
            </div>
          </div>

          <div className="home__block">
            <SectionHeader title="Job" accent="Categories" sub="Browse by job type" action="All Categories" onAction={() => { setFilter({ q: "", state: "", cat: "", edu: "All", lang }); setPage("jobs"); }} />
            <div className="cat-grid">
              {CATS_DATA.map((c) => {
                const cls = `cat-card__icon cat-card__icon--${c.code.toLowerCase().replace(/\s+/g, "-")}`;
                return (
                  <Card key={c.name} onClick={() => { setFilter({ cat: c.code, q: "", state: "", edu: "All", lang }); setPage("jobs"); }} className="cat-card">
                    <div className={cls}>{c.icon}</div>
                    <div>
                      <div className="cat-card__name">{c.name}</div>
                      <div className="cat-card__count">{c.count} posts</div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="home__ad-block"><AdBanner /></div>

          <SectionHeader
            title="Latest"
            accent="IndiaGovtJobHub Jobs"
            sub={`${languageFilteredJobs.length} vacancies found`}
            action="View All"
            onAction={() => {
              setFilter({ q: "", state: "", cat: "", edu: "All", lang });
              setPage("jobs");
            }}
          />
          <div className="jobs-stack">
            {languageFilteredJobs.slice(0, 5).map((j) => (
              <JobCard
                key={j.id}
                job={j}
                saved={savedJobs.includes(j.id)}
                onSave={onSave}
                onView={onViewJob}
                selectedLang={lang}
              />
            ))}
          </div>
          <button
            onClick={() => {
              setFilter({ q: "", state: "", cat: "", edu: "All", lang });
              setPage("jobs");
            }}
            className="btn-primary btn-block home__load-all-btn"
          >
            Load All {languageFilteredJobs.length} Jobs →
          </button>
        </div>

        <Sidebar setPage={setPage} latestJobs={languageFilteredJobs} onViewJob={onViewJob} />
      </div>
    </div>
  );
}
