// ─────────────────────────────────────────────────────────────
//  src/pages/AlertPage.jsx
//  Free job alert subscription form
// ─────────────────────────────────────────────────────────────
import { useState } from "react";
import Card from "../components/shared/Card";
import { STATES_DATA, CATS_DATA } from "../data/mockData";
import { C } from "../styles/tokens";

const QUALIFICATIONS = ["8th Pass","10th Pass","12th Pass","ITI","Diploma","Graduate","Post Graduate","B.Ed","LLB","MBBS"];

export default function AlertPage() {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", state: "", edu: "", cats: [] });
  const [errors, setErrors] = useState({});
  const [done, setDone]   = useState(false);

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const toggleCat = (code) =>
    setForm((f) => ({
      ...f,
      cats: f.cats.includes(code) ? f.cats.filter((c) => c !== code) : [...f.cats, code],
    }));

  const validate = () => {
    const e = {};
    if (!form.name)   e.name   = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.mobile || form.mobile.length < 10) e.mobile = "Valid 10-digit mobile required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => { if (validate()) setDone(true); };

  const inputStyle = (key) => ({
    width: "100%", padding: "12px 16px",
    border: `1.5px solid ${errors[key] ? "#DC2626" : C.border}`,
    borderRadius: 10, fontSize: 13.5, outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
    background: errors[key] ? "#FEF2F2" : "white",
  });

  /* ── SUCCESS SCREEN ── */
  if (done) return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <Card style={{ padding: 50 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: 28, fontWeight: 700, color: C.navy, marginBottom: 10 }}>
          You're Subscribed!
        </h2>
        <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.75, marginBottom: 24 }}>
          We'll send you instant SMS and email alerts when new government jobs matching your profile are posted. Never miss a deadline again!
        </p>
        <div style={{ background: C.cream, borderRadius: 12, padding: 20, textAlign: "left", marginBottom: 24 }}>
          {[["Name", form.name], ["Email", form.email], ["Mobile", form.mobile], ["State", form.state || "All States"], ["Qualification", form.edu || "All"], ["Categories", form.cats.length ? form.cats.join(", ") : "All"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid rgba(255,107,26,0.1)`, fontSize: 13 }}>
              <span style={{ color: C.muted }}>{l}</span>
              <span style={{ fontWeight: 600, color: C.navy }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            onClick={() => setDone(false)}
            style={{ background: C.bg, color: C.navy, border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "11px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          >
            ✏️ Edit Preferences
          </button>
          <button
            onClick={() => { setForm({ name:"", email:"", mobile:"", state:"", edu:"", cats:[] }); setDone(false); }}
            style={{ background: C.saffron, color: "white", border: "none", borderRadius: 10, padding: "11px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}
          >
            ＋ Add Another Alert
          </button>
        </div>
      </Card>
    </div>
  );

  /* ── FORM ── */
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "36px 24px" }}>
      <Card style={{ padding: 40 }}>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: 28, fontWeight: 700, color: C.navy, marginBottom: 6 }}>
          🔔 Free <span style={{ color: C.saffron }}>Job Alert</span>
        </h2>
        <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
          Get daily SMS and email alerts for government jobs matching your education and state preferences. 100% free, unsubscribe anytime.
        </p>

        {/* Personal details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <div>
            <input placeholder="Full Name *" value={form.name} onChange={(e) => set("name", e.target.value)} style={inputStyle("name")} />
            {errors.name && <p style={{ fontSize: 11.5, color: "#DC2626", marginTop: 4 }}>{errors.name}</p>}
          </div>
          <div>
            <input placeholder="Mobile Number *" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} style={inputStyle("mobile")} />
            {errors.mobile && <p style={{ fontSize: 11.5, color: "#DC2626", marginTop: 4 }}>{errors.mobile}</p>}
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <input type="email" placeholder="Email Address *" value={form.email} onChange={(e) => set("email", e.target.value)} style={inputStyle("email")} />
          {errors.email && <p style={{ fontSize: 11.5, color: "#DC2626", marginTop: 4 }}>{errors.email}</p>}
        </div>

        {/* State + Education */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
          <select value={form.state} onChange={(e) => set("state", e.target.value)} style={{ padding: "12px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13.5, outline: "none", fontFamily: "inherit", color: form.state ? C.text : C.muted }}>
            <option value="">Select Your State</option>
            {STATES_DATA.map((s) => <option key={s.name}>{s.name}</option>)}
          </select>
          <select value={form.edu} onChange={(e) => set("edu", e.target.value)} style={{ padding: "12px 16px", border: `1.5px solid ${C.border}`, borderRadius: 10, fontSize: 13.5, outline: "none", fontFamily: "inherit", color: form.edu ? C.text : C.muted }}>
            <option value="">Select Qualification</option>
            {QUALIFICATIONS.map((q) => <option key={q}>{q}</option>)}
          </select>
        </div>

        {/* Category multi-select */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.navy, marginBottom: 10 }}>
            Job Categories <span style={{ fontSize: 12, fontWeight: 400, color: C.muted }}>(select all that apply)</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATS_DATA.map((c) => (
              <button
                key={c.code}
                onClick={() => toggleCat(c.code)}
                style={{
                  padding: "8px 16px", borderRadius: 8, fontSize: 12.5, fontWeight: 600,
                  border: `1.5px solid ${form.cats.includes(c.code) ? c.color : C.border}`,
                  background: form.cats.includes(c.code) ? c.bg : "white",
                  color: form.cats.includes(c.code) ? c.color : C.muted,
                  cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
                }}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Alert channels */}
        <div style={{ background: C.bg, borderRadius: 12, padding: "16px 18px", marginBottom: 24, display: "flex", gap: 20 }}>
          <span style={{ fontSize: 13, color: C.navy, fontWeight: 600 }}>Get alerts via:</span>
          {[["📧 Email","Always"],["📱 SMS","Free"],["🔔 App Notification","Soon"]].map(([l, s]) => (
            <span key={l} style={{ fontSize: 12.5, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
              {l} <span style={{ fontSize: 10, background: "#E8F5E9", color: "#059669", padding: "1px 6px", borderRadius: 100, fontWeight: 700 }}>{s}</span>
            </span>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: "100%", padding: 14,
            background: `linear-gradient(135deg,${C.saffron},#E85A0A)`,
            color: "white", border: "none", borderRadius: 12,
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          🔔 Subscribe for Free Job Alerts
        </button>
        <p style={{ fontSize: 11.5, color: C.muted, textAlign: "center", marginTop: 10 }}>
          No spam. Unsubscribe at any time. 100% Free.
        </p>
      </Card>
    </div>
  );
}
