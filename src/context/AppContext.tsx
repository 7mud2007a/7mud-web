"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  SiteSettings,
  NavigationItem,
  HeroContent,
  AboutContent,
  ServiceItem,
  ProjectItem,
  ContactInfo,
  defaultSiteSettings,
  defaultNavigation,
  defaultHeroContent,
  defaultAboutContent,
  defaultServices,
  defaultProjects,
  defaultContactInfo,
  getSiteSettings,
  getNavigation,
  getHeroContent,
  getAboutContent,
  getServices,
  getProjects,
  getContactInfo,
} from "@/lib/supabase/data";

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

  // Supabase dynamic content state
  siteSettings: SiteSettings;
  navigation: NavigationItem[];
  heroContent: HeroContent;
  aboutContent: AboutContent;
  services: ServiceItem[];
  projects: ProjectItem[];
  contactInfo: ContactInfo;
  refreshContent: () => Promise<void>;
  isLoadingContent: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Dynamic Content States
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [navigation, setNavigation] = useState<NavigationItem[]>(defaultNavigation);
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [isLoadingContent, setIsLoadingContent] = useState<boolean>(true);

  const fetchAllData = useCallback(async () => {
    setIsLoadingContent(true);
    try {
      const [
        settingsData,
        navData,
        heroData,
        aboutData,
        servicesData,
        projectsData,
        contactData,
      ] = await Promise.all([
        getSiteSettings(),
        getNavigation(),
        getHeroContent(),
        getAboutContent(),
        getServices(),
        getProjects(),
        getContactInfo(),
      ]);

      setSiteSettings(settingsData);
      setNavigation(navData);
      setHeroContent(heroData);
      setAboutContent(aboutData);
      setServices(servicesData);
      setProjects(projectsData);
      setContactInfo(contactData);

      if (settingsData.theme) {
        setThemeState(settingsData.theme);
      }
    } catch (err) {
      console.error("Error fetching site content from Supabase:", err);
    } finally {
      setIsLoadingContent(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    const savedLang = localStorage.getItem("7mud_lang") as Language;
    if (savedLang === "ar" || savedLang === "en") {
      setLanguageState(savedLang);
    }

    const savedTheme = localStorage.getItem("7mud_theme") as Theme;
    if (savedTheme === "dark" || savedTheme === "light") {
      setThemeState(savedTheme);
    }

    fetchAllData();
  }, [fetchAllData]);

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
        siteSettings,
        navigation,
        heroContent,
        aboutContent,
        services,
        projects,
        contactInfo,
        refreshContent: fetchAllData,
        isLoadingContent,
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
