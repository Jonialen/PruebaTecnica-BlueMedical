// src/hooks/useTheme.ts
import { create } from "zustand";
import { useEffect } from "react";

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: false,
  toggle: () => set((state) => {
    const newIsDark = !state.isDark;
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    return { isDark: newIsDark };
  }),
  setTheme: (isDark) => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    set({ isDark });
  },
}));

export const useTheme = () => {
  const { isDark, toggle, setTheme } = useThemeStore();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initialTheme = stored === "dark";
    setTheme(initialTheme);
    
    if (initialTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [setTheme]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return { isDark, toggle };
};