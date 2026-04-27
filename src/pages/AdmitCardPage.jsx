// ─────────────────────────────────────────────────────────────
//  src/pages/AdmitCardPage.jsx
//  Hall ticket / Call letter tracker
// ─────────────────────────────────────────────────────────────
import { useState } from "react";
import Card from "../components/shared/Card";
import Badge from "../components/shared/Badge";
import Pill from "../components/shared/Pill";
import SectionHeader from "../components/shared/SectionHeader";
import { deriveAdmitCards } from "../utils/derivedData";
import { C } from "../styles/tokens";

const STATUS_FILTERS = ["All", "SOON", "UPCOMING"];

export default function AdmitCardPage({ jobsData = [] }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const dynamicAdmitCards = deriveAdmitCards(jobsData);

  const filtered = dynamicAdmitCards.filter((a) => {
    const matchStatus = filter === "All" || a.badge === filter;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.org.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 24px" }}>
      <SectionHeader title="Admit" accent="Cards 2025" sub="Download hall tickets and call letters for upcoming exams" />

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔍  Search admit cards by exam or organisation..."
        style={{
          width: "100%", padding: "11px 16px", marginBottom: 18,
          border: `1.5px solid ${C.border}`, borderRadius: 10,
          fontSize: 13.5, outline: "none", fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      />

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {STATUS_FILTERS.map((s) => (
          <Pill key={s} active={filter === s} onClick={() => setFilter(s)}>
            {s === "SOON" ? "🔜 Releasing Soon" : s === "UPCOMING" ? "📅 Upcoming" : "All"}
          </Pill>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {filtered.map((a) => (
          <Card key={a.id} style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
              <Badge type={a.badge} />
              <span style={{ fontSize: 11.5, color: C.muted, fontFamily: "monospace" }}>Exam: {a.examDate}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 4, lineHeight: 1.35 }}>
              🎫 {a.title}
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
              {a.org} · Expected Release: <strong style={{ color: C.navy }}>{a.releaseDate}</strong>
            </div>
            <button
              onClick={() => alert(`Admit Card: ${a.title}\nOrganisation: ${a.org}\nExam Date: ${a.examDate}\nExpected Release: ${a.releaseDate}\n\nVisit the official website to download when available.`)}
              style={{
                width: "100%", padding: "10px",
                background: a.badge === "SOON" ? C.navy : "#E2E8F0",
                color: a.badge === "SOON" ? "white" : C.muted,
                border: "none", borderRadius: 8,
                fontSize: 12.5, fontWeight: 700,
                cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {a.badge === "SOON" ? "📥 Notify Me When Available" : "⏳ Not Released Yet"}
            </button>
          </Card>
        ))}
      </div>

      {/* Info banner */}
      <div style={{
        marginTop: 28, background: C.cream, borderRadius: 12,
        padding: "18px 22px", border: "1px solid rgba(255,107,26,0.15)",
        display: "flex", gap: 14, alignItems: "flex-start",
      }}>
        <span style={{ fontSize: 22, flexShrink: 0 }}>💡</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 4 }}>How to Download Admit Card</div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
            1. Click "Notify Me" to get an email when the admit card releases.<br />
            2. Visit the official organisation website on the release date.<br />
            3. Enter your registration number and date of birth.<br />
            4. Download and print 2 copies of your admit card.
          </div>
        </div>
      </div>
    </div>
  );
}
