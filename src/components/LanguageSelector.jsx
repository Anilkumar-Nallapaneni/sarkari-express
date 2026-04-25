import { useState } from "react";
import { INDIAN_LANGUAGES } from "../data/languageData";

export default function LanguageSelector({ selectedLang, onLanguageChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = INDIAN_LANGUAGES.find((l) => l.code === selectedLang) || INDIAN_LANGUAGES[0];

  return (
    <div className="language-selector">
      <button
        className="language-selector__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="language-selector__icon">🌐</span>
        <span className="language-selector__current">{currentLang.native}</span>
        <span className={`language-selector__arrow ${isOpen ? "language-selector__arrow--up" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-selector__dropdown" role="listbox">
          <div className="language-selector__header">Select Language (28 States / 28 Languages)</div>
          <div className="language-selector__list">
            {INDIAN_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={`language-selector__option ${selectedLang === lang.code ? "language-selector__option--active" : ""}`}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                role="option"
                aria-selected={selectedLang === lang.code}
              >
                <span className="language-selector__option-native">{lang.native}</span>
                <span className="language-selector__option-name">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && <div className="language-selector__backdrop" onClick={() => setIsOpen(false)} />}
    </div>
  );
}