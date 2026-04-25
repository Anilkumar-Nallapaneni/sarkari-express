// ─────────────────────────────────────────────────────────────
//  src/components/Footer.jsx
//  Site footer — links, social, disclaimer
// ─────────────────────────────────────────────────────────────
const FOOTER_COLS = [
  ["Job Types",  ["Railway Jobs","Banking Jobs","Defence Jobs","Teaching Jobs","Police Jobs","PSC Jobs"]],
  ["Education",  ["10th Pass","12th Pass","Diploma","Graduate","Post Graduate","ITI"]],
  ["Info",       ["About Us","Contact Us","Privacy Policy","Advertise","Sitemap"]],
];
const SOCIAL = ["📘","📸","🐦","📺","💬"];

export default function Footer({ setPage }) {
  const link = (l) => () => setPage("home");
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">
          <div>
            <div className="footer__logo">IndiaGovtJobHub</div>
            <p className="footer__tagline">
              India's most modern govt job portal. Real-time notifications for all Central & State vacancies across 28 states.
            </p>
            <div className="footer__social">
              {SOCIAL.map((ico, i) => (
                <button
                  key={i}
                  className="footer__social-btn"
                  onClick={() => alert("Social media — coming soon!")}
                >
                  {ico}
                </button>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map(([heading, items]) => (
            <div key={heading} className="footer__col">
              <h4 className="footer__col-heading">{heading}</h4>
              <ul>
                {items.map((l) => (
                  <li key={l} className="footer__col-item">
                    <button className="footer__col-link" onClick={link(l)}>{l}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <span>© 2025 IndiaGovtJobHub. Not affiliated with any Govt. agency. All data from official portals.</span>
          <span>🇮🇳 Made in India with ❤️</span>
        </div>
      </div>
    </footer>
  );
}
