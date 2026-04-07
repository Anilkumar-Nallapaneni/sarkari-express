// ─────────────────────────────────────────────────────────────
//  src/components/shared/AdBanner.jsx
//  Placeholder for Google AdSense ad slots
//  Replace the inner div with your actual AdSense <ins> code
// ─────────────────────────────────────────────────────────────

/**
 * @param {string}  label   - display text for the placeholder
 * @param {boolean} sidebar - true = dark 300x250 sidebar variant
 * @param {string}  slot    - AdSense slot ID (optional, for future use)
 */
export default function AdBanner({ label, sidebar = false, slot }) {
  const defaultLabel = sidebar ? "AdSense 300×250 Sidebar" : "Google AdSense 728×90 — Top Banner";
  return (
    <div className={`ad-banner ${sidebar ? "ad-banner--sidebar" : ""}`}>
      <span className="ad-banner__icon">📣</span>
      <span className="ad-banner__label">{label || defaultLabel}</span>
    </div>
  );
}
