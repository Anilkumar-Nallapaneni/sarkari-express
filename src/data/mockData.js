// ─────────────────────────────────────────────────────────────
//  src/data/mockData.js
//  Central data store – replace with real API calls later
// ─────────────────────────────────────────────────────────────

export const JOBS_DATA = [];

export const RESULTS_DATA = [
  { id: 1, title: "SSC CHSL Tier II 2024 Result", org: "Staff Selection Commission", date: "15 Mar 2025", type: "Final Result", badge: "NEW" },
  { id: 2, title: "IBPS PO Mains 2024 Result", org: "IBPS", date: "10 Mar 2025", type: "Mains Result", badge: "NEW" },
  { id: 3, title: "RRB Group D 2024 Final Result", org: "Railway Recruitment Board", date: "5 Mar 2025", type: "Final Result", badge: "NEW" },
  { id: 4, title: "UP Police Constable PET/PST Result 2024", org: "UPPRB", date: "1 Mar 2025", type: "PET Result", badge: "OUT" },
  { id: 5, title: "UPSC Prelims 2024 Final Cut Off", org: "UPSC", date: "20 Feb 2025", type: "Cut Off", badge: "OUT" },
  { id: 6, title: "SBI PO Mains 2024 Result", org: "State Bank of India", date: "18 Feb 2025", type: "Mains Result", badge: "OUT" },
  { id: 7, title: "SSC GD Constable 2024 Medical Result", org: "Staff Selection Commission", date: "12 Feb 2025", type: "Medical Result", badge: "OUT" },
  { id: 8, title: "BPSC 68th Combined Result 2024", org: "Bihar PSC", date: "8 Feb 2025", type: "Prelim Result", badge: "OUT" },
];

export const ADMIT_DATA = [
  { id: 1, title: "SSC CGL 2025 Tier I Admit Card", org: "Staff Selection Commission", examDate: "Sep 2025", releaseDate: "Aug 2025", badge: "SOON" },
  { id: 2, title: "UPSC Prelims 2025 Admit Card", org: "Union Public Service Commission", examDate: "May 2025", releaseDate: "Apr 2025", badge: "SOON" },
  { id: 3, title: "RRB NTPC 2025 Hall Ticket", org: "Railway Recruitment Board", examDate: "Jun 2025", releaseDate: "May 2025", badge: "SOON" },
  { id: 4, title: "SBI Clerk 2025 Call Letter", org: "State Bank of India", examDate: "May 2025", releaseDate: "Apr 2025", badge: "SOON" },
  { id: 5, title: "IBPS PO 2025 Prelim Admit Card", org: "IBPS", examDate: "Aug 2025", releaseDate: "Jul 2025", badge: "UPCOMING" },
  { id: 6, title: "UP Police Constable 2025 Admit Card", org: "UPPRB", examDate: "Aug 2025", releaseDate: "Jul 2025", badge: "UPCOMING" },
];

export const SYLLABUS_DATA = [
  { id: 1, title: "SSC CGL 2025 — Detailed Syllabus & Exam Pattern", org: "SSC", subjects: ["Quantitative Aptitude", "English Language", "General Intelligence", "General Awareness"], exams: 4, badge: "UPDATED" },
  { id: 2, title: "UPSC CSE 2025 — Full Syllabus (Prelim + Mains)", org: "UPSC", subjects: ["General Studies I", "General Studies II (CSAT)", "Essay", "Optional Subject"], exams: 3, badge: "UPDATED" },
  { id: 3, title: "RRB NTPC 2025 — CBT 1 & CBT 2 Syllabus", org: "RRB", subjects: ["Mathematics", "General Intelligence", "General Awareness", "Verbal Ability"], exams: 3, badge: "NEW" },
  { id: 4, title: "SBI Clerk 2025 — Prelim + Mains Syllabus", org: "SBI", subjects: ["Quantitative Aptitude", "Reasoning Ability", "English Language", "General/Financial Awareness"], exams: 2, badge: "NEW" },
  { id: 5, title: "UP Police Constable 2025 — Written Test Syllabus", org: "UPPRB", subjects: ["General Hindi", "General Knowledge", "Numerical Ability", "Mental Aptitude"], exams: 1, badge: "UPDATED" },
  { id: 6, title: "IBPS PO 2025 — Prelim + Mains + Interview Syllabus", org: "IBPS", subjects: ["Reasoning", "English", "Quantitative Aptitude", "Computer Awareness"], exams: 3, badge: "NEW" },
];

export const STATES_DATA = [
  { name: "Andhra Pradesh", code: "ap", icon: "🏛️", count: 184, color: "#1D4ED8" },
  { name: "Arunachal Pradesh", code: "ar", icon: "⛰️", count: 42, color: "#0E7490" },
  { name: "Assam", code: "as", icon: "🌿", count: 126, color: "#065F46" },
  { name: "Bihar", code: "bihar", icon: "🌾", count: 187, color: "#059669" },
  { name: "Chhattisgarh", code: "cg", icon: "🌲", count: 114, color: "#15803D" },
  { name: "Goa", code: "goa", icon: "🏖️", count: 39, color: "#0284C7" },
  { name: "Gujarat", code: "gj", icon: "🐯", count: 211, color: "#BE185D" },
  { name: "Haryana", code: "hr", icon: "🏞️", count: 143, color: "#1D4ED8" },
  { name: "Himachal Pradesh", code: "hp", icon: "🏔️", count: 88, color: "#0369A1" },
  { name: "Jharkhand", code: "jh", icon: "⛏️", count: 104, color: "#B45309" },
  { name: "Karnataka", code: "ka", icon: "🌿", count: 165, color: "#065F46" },
  { name: "Kerala", code: "kl", icon: "🌺", count: 122, color: "#6D28D9" },
  { name: "Madhya Pradesh", code: "mp", icon: "🦚", count: 276, color: "#D97706" },
  { name: "Maharashtra", code: "mh", icon: "🌊", count: 412, color: "#0284C7" },
  { name: "Manipur", code: "mn", icon: "🎋", count: 49, color: "#7C3AED" },
  { name: "Meghalaya", code: "ml", icon: "🌧️", count: 37, color: "#0F766E" },
  { name: "Mizoram", code: "mz", icon: "🌄", count: 34, color: "#4338CA" },
  { name: "Nagaland", code: "nl", icon: "🏞️", count: 31, color: "#0C4A6E" },
  { name: "Odisha", code: "or", icon: "🛕", count: 132, color: "#C2410C" },
  { name: "Punjab", code: "pb", icon: "🌾", count: 117, color: "#166534" },
  { name: "Rajasthan", code: "raj", icon: "🏜️", count: 253, color: "#DC2626" },
  { name: "Sikkim", code: "sk", icon: "⛰️", count: 27, color: "#0F766E" },
  { name: "Tamil Nadu", code: "tn", icon: "🌴", count: 198, color: "#7C3AED" },
  { name: "Telangana", code: "ts", icon: "💎", count: 153, color: "#9333EA" },
  { name: "Tripura", code: "tr", icon: "🌧️", count: 33, color: "#155E75" },
  { name: "Uttar Pradesh", code: "up", icon: "🏛️", count: 324, color: "#4F46E5" },
  { name: "Uttarakhand", code: "uk", icon: "⛰️", count: 89, color: "#0E7490" },
  { name: "West Bengal", code: "wb", icon: "🐅", count: 176, color: "#7E22CE" },
];

export const CATS_DATA = [
  { name: "Railway Jobs",     icon: "🚂", count: "18,000+", bg: "#FFF0E5", color: "#E55A00", code: "Railway"     },
  { name: "Banking Jobs",     icon: "🏦", count: "25,000+", bg: "#E8F5E9", color: "#059669", code: "Banking"     },
  { name: "Defence & Police", icon: "🎖️", count: "62,000+", bg: "#E3F2FD", color: "#1D4ED8", code: "Police"      },
  { name: "Teaching Jobs",    icon: "📚", count: "1.7 Lakh+",bg: "#F3E5F5", color: "#7C3AED", code: "Teaching"    },
  { name: "Medical / Health", icon: "⚕️", count: "9,800+",  bg: "#FFF8E1", color: "#D97706", code: "Medical"     },
  { name: "Engineering",      icon: "🔧", count: "15,400+", bg: "#E0F7FA", color: "#0284C7", code: "Engineering" },
  { name: "UPSC / PSC",       icon: "⚔️", count: "5,600+",  bg: "#FFF0F5", color: "#BE185D", code: "PSC"         },
  { name: "SSC Jobs",         icon: "📋", count: "32,000+", bg: "#F0FFF4", color: "#065F46", code: "SSC"         },
];

export const TICKERS = [
  "SSC CGL 2025 — 17,727 Posts Notification Released",
  "UPSC Civil Services 2025 — Last Date: 4 April",
  "RRB NTPC 2025 — 11,558 Vacancies Apply Now",
  "UP Police Constable — 60,244 Posts Open",
  "IBPS PO 2025 Registration Open — Apply Now",
  "Bihar BPSC Teacher — 1.77 Lakh Posts Phase IV",
  "Rajasthan RPSC RAS 2025 — Apply Before 18 April",
  "AIIMS Group B & C — 3,012 Posts Released",
];
