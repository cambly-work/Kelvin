"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Light/dark theme toggle. Reads the initial state from the <html> class
 * (set by the inline FOUC script in layout.tsx before paint), then toggles
 * .light on <html> and persists the choice to localStorage.
 */
export default function ThemeToggle() {
  const t = useTranslations("A11y");
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("kelvin-theme", next ? "light" : "dark");
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={light ? t("toggleThemeDark") : t("toggleThemeLight")}
      className="text-mut transition-colors hover:text-tx"
    >
      {light ? (
        /* moon */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        /* sun */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}
