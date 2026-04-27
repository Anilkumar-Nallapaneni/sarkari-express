import { useState, useEffect } from "react";
import { deriveTickers } from "../utils/derivedData";

export default function Ticker({ jobsData = [] }) {
  const dynamicTickers = deriveTickers(jobsData);
  const [idx,  setIdx]  = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % dynamicTickers.length);
        setFade(true);
      }, 300);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker">
      <span className="ticker__live-badge">LIVE</span>

      <span className={`ticker__text ${fade ? "ticker__text--visible" : "ticker__text--hidden"}`}>
        ▶ {dynamicTickers[idx]}
      </span>

      <span className="ticker__count">{idx + 1} / {dynamicTickers.length} alerts</span>
    </div>
  );
}
