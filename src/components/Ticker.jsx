import { useState, useEffect } from "react";
import { TICKERS } from "../data/mockData";

export default function Ticker() {
  const [idx,  setIdx]  = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % TICKERS.length);
        setFade(true);
      }, 300);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker">
      <span className="ticker__live-badge">LIVE</span>

      <span className={`ticker__text ${fade ? "ticker__text--visible" : "ticker__text--hidden"}`}>
        ▶ {TICKERS[idx]}
      </span>

      <span className="ticker__count">{idx + 1} / {TICKERS.length} alerts</span>
    </div>
  );
}
