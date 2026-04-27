import { useState } from "react";
import Card from "../components/shared/Card";
import Badge from "../components/shared/Badge";
import Pill from "../components/shared/Pill";
import SectionHeader from "../components/shared/SectionHeader";
import EmptyState from "../components/shared/EmptyState";
import { deriveResults } from "../utils/derivedData";

const RESULT_TYPES = ["All", "Final Result", "Mains Result", "Prelim Result", "Cut Off", "PET Result", "Medical Result"];

export default function ResultsPage({ jobsData = [] }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const dynamicResults = deriveResults(jobsData);

  const filtered = dynamicResults.filter((r) => {
    const query = search.toLowerCase();
    const matchType = filter === "All" || r.type === filter;
    const matchSearch = !search || r.title.toLowerCase().includes(query) || r.org.toLowerCase().includes(query);
    return matchType && matchSearch;
  });

  return (
    <div className="page-narrow">
      <SectionHeader title="Latest" accent="Results 2025" sub="Check your exam results, cut-off marks and scorecards" />

      <div className="search-bar search-bar--page syllabus-search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍  Search results by exam or organisation..."
          className="search-bar__input"
        />
      </div>

      <div className="filter-pills syllabus-filters">
        {RESULT_TYPES.map((t) => (
          <Pill key={t} active={filter === t} onClick={() => setFilter(t)}>{t}</Pill>
        ))}
      </div>

      <div className="result-count">
        <span className="result-count__text">{filtered.length} result(s) found</span>
      </div>

      <div className="jobs-stack">
        {filtered.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No results found"
            sub="Try a different filter or search term"
            action="Clear Filters"
            onAction={() => { setFilter("All"); setSearch(""); }}
          />
        ) : (
          filtered.map((r) => (
            <Card key={r.id} className="results-card">
              <div className="results-card__left">
                <div className="results-card__meta-row">
                  <Badge type={r.badge} text={r.badge === "NEW" ? "🆕 NEW" : "✅ OUT"} />
                  <span className="type-label">{r.type}</span>
                </div>
                <div className="results-card__title">📋 {r.title}</div>
                <div className="results-card__sub">{r.org} · Released: {r.date}</div>
              </div>
              <button
                onClick={() => alert(`Opening result page for:\n${r.title}\nOrganisation: ${r.org}\nDate: ${r.date}`)}
                className="results-card__btn"
              >
                View Result ↗
              </button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
