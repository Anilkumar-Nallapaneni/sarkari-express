import { useState } from "react";
import Card from "../components/shared/Card";
import Badge from "../components/shared/Badge";
import Pill from "../components/shared/Pill";
import SectionHeader from "../components/shared/SectionHeader";
import EmptyState from "../components/shared/EmptyState";
import { SYLLABUS_DATA } from "../data/mockData";

const ORG_FILTERS = ["All", "SSC", "UPSC", "RRB", "SBI", "IBPS", "UPPRB"];

export default function SyllabusPage() {
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = SYLLABUS_DATA.filter((s) => {
    const matchOrg = filter === "All" || s.org === filter;
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase());
    return matchOrg && matchSearch;
  });

  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <div className="page-narrow">
      <SectionHeader
        title="Exam"
        accent="Syllabus 2025"
        sub="Updated syllabus and exam patterns for all major government exams"
      />

      <div className="search-bar search-bar--page syllabus-search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍  Search syllabus by exam name..."
          className="search-bar__input"
        />
      </div>

      <div className="filter-pills syllabus-filters">
        {ORG_FILTERS.map((o) => (
          <Pill key={o} active={filter === o} onClick={() => setFilter(o)}>
            {o}
          </Pill>
        ))}
      </div>

      <div className="syllabus-list">
        {filtered.length === 0 ? (
          <EmptyState
            icon="📖"
            title="No syllabus found"
            sub="Try a different filter"
            action="Clear"
            onAction={() => {
              setFilter("All");
              setSearch("");
            }}
          />
        ) : (
          filtered.map((s) => (
            <Card key={s.id} className="syllabus-card">
              <div className="syllabus-card__header" onClick={() => toggle(s.id)}>
                <div className="syllabus-card__info">
                  <div className="syllabus-card__meta">
                    <Badge type={s.badge} />
                    <span className="syllabus-card__stage-info">{s.org}</span>
                    <span className="syllabus-card__stage-info">
                      {s.exams} stage{s.exams > 1 ? "s" : ""} · {s.subjects.length} subjects
                    </span>
                  </div>
                  <div className="syllabus-card__title">📖 {s.title}</div>
                </div>
                <span className={`syllabus-card__arrow ${open === s.id ? "syllabus-card__arrow--open" : ""}`}>
                  ›
                </span>
              </div>

              {open === s.id && (
                <div className="syllabus-card__body">
                  <div className="syllabus-card__body-inner">
                    <div className="syllabus-card__subjects-label">Subjects / Topics Covered:</div>
                    <div className="syllabus-card__subjects">
                      {s.subjects.map((sub, i) => (
                        <span key={sub} className={`subject-chip subject-chip--${(i % 4) + 1}`}>
                          {sub}
                        </span>
                      ))}
                    </div>

                    <div className="syllabus-card__stages-note">
                      <strong>Exam Stages:</strong> This exam has <strong>{s.exams}</strong> stage{s.exams > 1 ? "s" : ""}.
                      {s.exams >= 2 ? " Candidates must clear each stage to proceed." : " Single stage written examination."}
                    </div>

                    <div className="syllabus-card__actions">
                      <button onClick={() => alert(`Downloading syllabus PDF for:\n${s.title}`)} className="btn-download">
                        📥 Download Full Syllabus PDF
                      </button>
                      <button onClick={() => alert(`Opening previous year papers for:\n${s.title}`)} className="btn-papers">
                        📝 Previous Year Papers
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
