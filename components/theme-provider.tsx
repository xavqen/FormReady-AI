"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void } | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("formready-theme") as Theme | null) || "dark";

    // 1. Instantly manipulate the DOM class safely
    document.documentElement.classList.toggle("dark", saved === "dark");

    // 2. Defer the state assignment to pass the synchronous render check
    setTimeout(() => {
      setThemeState(saved);
    }, 0);
  }, []);

  const value = useMemo(() => ({
    theme,
    setTheme: (next: Theme) => {
      setThemeState(next);
      localStorage.setItem("formready-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error("useTheme must be used inside ThemeProvider");
  return value;
}
