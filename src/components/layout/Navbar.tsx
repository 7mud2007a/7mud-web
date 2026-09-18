"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Sun, Moon, Globe, Menu, X, ArrowUpRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const { language, theme, toggleLanguage, toggleTheme } = useApp();
  const t = translations[language].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: t.home, href: "#hero" },
    { label: t.stack, href: "#stack" },
    { label: t.services, href: "#services" },
    { label: t.projects, href: "#projects" },
    { label: t.estimator, href: "#estimator" },
    { label: t.testimonials, href: "#testimonials" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between ${
          scrolled
            ? "glass-panel shadow-lg shadow-black/5 dark:shadow-black/20 backdrop-blur-2xl"
            : "bg-white/40 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-white/10"
        }`}
      >
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center">
          <BrandLogo />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-colors"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "English" : "العربية"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass-panel hover:bg-slate-200/50 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* CTA Button */}
          <a href="#contact">
            <ShimmerButton variant="primary" className="!py-2 !px-4 !text-xs" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
              {t.startProject}
            </ShimmerButton>
          </a>
        </div>

        {/* Mobile Controls & Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-xl text-xs font-semibold glass-panel text-slate-800 dark:text-slate-200"
          >
            {language === "ar" ? "EN" : "عربي"}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl glass-panel text-slate-800 dark:text-slate-200"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl glass-panel text-slate-800 dark:text-slate-200"
            aria-label="Open Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-7xl mx-auto glass-panel rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-white/10">
          <nav className="flex flex-col gap-4">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 dark:text-slate-200 hover:text-purple-500 py-1 border-b border-slate-200/50 dark:border-white/5"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold text-sm"
              >
                <span>{t.startProject}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
