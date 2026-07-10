"use client";

import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "portfolio-theme";

export function useTheme() {
  // Default to dark for the very first paint (matches the site's original
  // design intent); corrected immediately on mount from storage/system pref.
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      queueMicrotask(() => setThemeState(stored));
      applyTheme(stored);
    } else {
      const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
      const initial: Theme = prefersLight ? "light" : "dark";
      queueMicrotask(() => setThemeState(initial));
      applyTheme(initial);
    }
    queueMicrotask(() => setMounted(true));
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return { theme, setTheme, toggleTheme, mounted };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }
}
