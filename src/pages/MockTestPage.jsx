import Badge from "../components/shared/Badge";

export default function MockTestPage({ job, onBack }) {
  if (!job) {
    return (
      <div className="detail-page">
        <button onClick={onBack} className="detail-page__back">
          ← Back
        </button>
        <div className="detail-card">
          <div className="detail-card__body">
            <h2 className="detail-card__section-title">Select a job first to view the mock test</h2>
            <p className="detail-card__desc">
              Use the Jobs page or Job detail view to open a tailored mock test for a specific recruitment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const questions = [
    {
      question: `For ${job.title}, which section is most important for first-round preparation?`,
      options: ["Quantitative Aptitude", "General Awareness", "Reasoning"],
    },
    {
      question: `Which study mode suits ${job.org} recruitment best?`,
      options: ["Mock tests + revision", "Only reading syllabus", "Last-minute cramming"],
    },
    {
      question: `How many mock questions should you target per day for ${job.cat} jobs?`,
      options: ["20", "50", "100"],
    },
  ];

  return (
    <div className="detail-page">
      <button onClick={onBack} className="detail-page__back">
        ← Back to Job Details
      </button>

      <div className="detail-card detail-card--wide">
        <div className="detail-card__header">
          <div className="detail-card__emoji">{job.emoji}</div>
          <div className="detail-card__header-info">
            <div className="detail-card__badges">
              <Badge type={job.badge} />
              <Badge type="NEW" text={job.state} />
              {job.urgent && <Badge type="HOT" text="⚠️ Urgent" />}
            </div>
            <h1 className="detail-card__title">{job.title} — Mock Test</h1>
            <p className="detail-card__org">{job.org} · {job.dept}</p>
            <div className="detail-card__summary">
              <span>{job.education ? job.education : job.edu}</span>
              <span>{job.posts.toLocaleString("en-IN")} Posts</span>
              <span>Exam: {job.examDate}</span>
            </div>
          </div>
        </div>

        <div className="detail-card__body detail-card__body--single">
          <div>
            <h3 className="detail-card__section-title">📝 Sample Mock Test</h3>
            <p className="detail-card__desc">
              This mock test is tailored to the {job.cat} vacancy and helps you prepare for the {job.title} recruitment.
            </p>
            <div className="mock-exam__grid">
              {questions.map((item, index) => (
                <div key={index} className="mock-exam__card">
                  <div className="mock-exam__question">{index + 1}. {item.question}</div>
                  <div className="mock-exam__options">
                    {item.options.map((option) => (
                      <button key={option} type="button" className="mock-exam__option">
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mock-exam__note">
              Tip: Practice at least one full mock test every day to build speed and accuracy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
