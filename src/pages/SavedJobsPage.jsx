import JobCard from "../components/JobCard";
import SectionHeader from "../components/shared/SectionHeader";
import EmptyState from "../components/shared/EmptyState";
import { JOBS_DATA } from "../data/mockData";

export default function SavedJobsPage({ savedJobs, onSave, onViewJob, setPage }) {
  const jobs = JOBS_DATA.filter((j) => savedJobs.includes(j.id));

  return (
    <div className="saved-page">
      <SectionHeader
        title="🔖 Saved"
        accent="Jobs"
        sub={`${jobs.length} job${jobs.length !== 1 ? "s" : ""} bookmarked`}
      />

      {jobs.length === 0 ? (
        <EmptyState
          icon="🔖"
          title="No saved jobs yet"
          sub="Browse jobs and click the 'Save' button to bookmark them here for quick access"
          action="Browse All Jobs"
          onAction={() => setPage("jobs")}
        />
      ) : (
        <>
          <div className="saved-summary-strip">
            <div>
              <div className="saved-summary-strip__stat-value saved-summary-strip__stat-value--gold">{jobs.length}</div>
              <div className="saved-summary-strip__stat-label">Saved Jobs</div>
            </div>
            <div>
              <div className="saved-summary-strip__stat-value saved-summary-strip__stat-value--saffron">
                {jobs.filter((j) => j.urgent).length}
              </div>
              <div className="saved-summary-strip__stat-label">Urgent Deadlines</div>
            </div>
            <div className="saved-summary-strip__actions">
              <button className="btn-primary" onClick={() => setPage("jobs")}>+ Find More Jobs</button>
            </div>
          </div>

          {jobs.some((j) => j.urgent) && (
            <div className="saved-page__urgent-warning">
              <span className="saved-page__urgent-icon">⚠️</span>
              <span className="saved-page__urgent-text">
                You have {jobs.filter((j) => j.urgent).length} job(s) with urgent deadlines — apply ASAP!
              </span>
            </div>
          )}

          <div className="jobs-stack">
            {jobs.map((j) => (
              <JobCard key={j.id} job={j} saved onSave={onSave} onView={onViewJob} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
