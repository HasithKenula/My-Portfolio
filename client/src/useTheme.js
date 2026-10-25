import { useCallback, useEffect, useState } from 'react';

const root = document.documentElement;

const save = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage unavailable (private mode) — the choice just won't persist
  }
};

// Light/dark mode and accent palette. index.html sets the initial values before first paint.
export default function useTheme() {
  const [theme, setThemeState] = useState(root.dataset.theme || 'dark');
  const [accent, setAccentState] = useState(root.dataset.accent || 'ember');

  useEffect(() => {
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#001b2b' : '#f8f4e6');
  }, [theme]);

  useEffect(() => {
    root.dataset.accent = accent;
  }, [accent]);

  // Only persist explicit choices, so visitors who never pick keep following their OS setting.
  const setTheme = useCallback((value) => {
    setThemeState(value);
    save('theme', value);
  }, []);

  const setAccent = useCallback((value) => {
    setAccentState(value);
    save('accent', value);
  }, []);

  return { theme, setTheme, accent, setAccent };
}
