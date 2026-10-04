"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from 'motion/react';

type Theme = "light" | "dark" | "system";

const ThemeProviderContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: Theme;
}>({
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
});

export function ThemeProvider({
  children,
  defaultTheme = "system" as Theme,
  storageKey = "vite-ui-theme",
  ...props
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  [key: string]: any;
}) {
  // Keep the first client render identical to the server render.
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const readTheme = () => {
      try {
        const stored = localStorage.getItem(storageKey);
        setTheme(stored === "light" || stored === "dark" || stored === "system" ? stored : defaultTheme);
      } catch {
        setTheme(defaultTheme);
      }
    };
    readTheme();
    const syncTheme = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) readTheme();
    };
    window.addEventListener("storage", syncTheme);
    return () => window.removeEventListener("storage", syncTheme);
  }, [defaultTheme, storageKey]);

  const [resolvedTheme, setResolvedTheme] = useState<Theme>(defaultTheme === "system" ? "light" : defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const resolved = theme === "system" ? (media.matches ? "dark" : "light") : theme;
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      setResolvedTheme(resolved);
    };
    applyTheme();
    if (theme === "system") media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      try { localStorage.setItem(storageKey, newTheme); } catch { /* Still work when storage is blocked. */ }
      setTheme(newTheme);
    },
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
