"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "ar" | "en";
export type Theme = "dark" | "light";

interface AppContextType {
  language: Language;
  theme: Theme;
  dir: "rtl" | "ltr";
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load persisted settings or system preference
    const savedLang = localStorage.getItem("7mud_lang") as Language;
    if (savedLang === "ar" || savedLang === "en") {
      setLanguageState(savedLang);
    }

    const savedTheme = localStorage.getItem("7mud_theme") as Theme;
    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
    } else {
      setThemeState("dark");
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.setAttribute("lang", language);
    root.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    localStorage.setItem("7mud_lang", language);
  }, [language, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("7mud_theme", theme);
  }, [theme, mounted]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setTheme = (th: Theme) => setThemeState(th);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "ar" ? "en" : "ar"));
  };

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <AppContext.Provider
      value={{
        language,
        theme,
        dir,
        setLanguage,
        setTheme,
        toggleLanguage,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
