import { STATES_DATA, CATS_DATA } from "../data/mockData";

export function deriveTickers(jobsData) {
  if (!jobsData || jobsData.length === 0) return ["Fetching live updates..."];
  return jobsData.slice(0, 10).map((j) => `${j.title} — ${j.posts} Posts`);
}

export function deriveResults(jobsData) {
  if (!jobsData) return [];
  return jobsData
    .filter((j) => {
      const t = j.title.toLowerCase();
      return t.includes("result") || t.includes("cut off") || t.includes("marks") || t.includes("score");
    })
    .map((j) => ({
      ...j,
      date: j.deadline, // Use deadline or notifdate as fallback
      type: "Result",
    }));
}

export function deriveAdmitCards(jobsData) {
  if (!jobsData) return [];
  return jobsData
    .filter((j) => {
      const t = j.title.toLowerCase();
      return t.includes("admit card") || t.includes("hall ticket") || t.includes("call letter");
    })
    .map((j) => ({
      ...j,
      examDate: j.examdate || "To be notified",
      releaseDate: j.notifdate || "Available Now",
    }));
}

export function deriveSyllabus(jobsData) {
  if (!jobsData) return [];
  return jobsData
    .filter((j) => {
      const t = j.title.toLowerCase();
      return t.includes("syllabus") || t.includes("pattern") || t.includes("exam scheme");
    })
    .map((j) => ({
      ...j,
      subjects: ["As per notification"], // Default if not parsed
      exams: 1,
    }));
}

export function deriveDynamicCategories(jobsData) {
  if (!jobsData) return CATS_DATA;
  const cats = [...CATS_DATA];
  return cats.map((c) => {
    const count = jobsData.filter((j) => j.cat === c.code).length;
    return { ...c, count: `${count}` };
  });
}

export function deriveDynamicStates(jobsData) {
  if (!jobsData) return STATES_DATA;
  const states = [...STATES_DATA];
  return states.map((s) => {
    const count = jobsData.filter((j) => j.state === s.name).length;
    return { ...s, count };
  });
}
