"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Sun, Moon, Globe, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const { language, theme, toggleLanguage, toggleTheme, navigation, siteCopy } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleNavItems = navigation
    .filter((item) => item.enabled)
    .map((item) => ({
      label: language === "ar" ? item.label_ar : item.label_en,
      href: item.href,
    }));

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between border ${
          scrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-neutral-300 dark:border-neutral-800 shadow-md"
            : "bg-white/70 dark:bg-black/70 backdrop-blur-sm border-neutral-200 dark:border-neutral-800"
        }`}
      >
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center">
          <BrandLogo />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {visibleNavItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "English" : "العربية"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-neutral-100" />
            ) : (
              <Moon className="w-4 h-4 text-neutral-900" />
            )}
          </button>

          {/* CTA Button */}
          <a href="#contact">
            <ShimmerButton
              variant="primary"
              className="!py-2 !px-4 !text-xs"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              {language === "ar" ? siteCopy.nav_cta_ar : siteCopy.nav_cta_en}
            </ShimmerButton>
          </a>
        </div>

        {/* Mobile Controls & Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
          >
            {language === "ar" ? "EN" : "عربي"}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm transition-colors"
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative flex h-4 w-5 flex-col items-center justify-center">
              <motion.span
                className="absolute h-[2px] w-5 rounded-full bg-current"
                animate={mobileMenuOpen ? { y: 0, rotate: 45 } : { y: -6, rotate: 0 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.span
                className="absolute h-[2px] w-5 rounded-full bg-current"
                animate={mobileMenuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
              <motion.span
                className="absolute h-[2px] w-5 rounded-full bg-current"
                animate={mobileMenuOpen ? { y: 0, rotate: -45 } : { y: 6, rotate: 0 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu: circular reveal inspired by the R2 navigation animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="sm:hidden fixed inset-0 z-50 flex min-h-[100dvh] flex-col justify-center overflow-y-auto bg-white dark:bg-neutral-950"
            initial={{ clipPath: "circle(0px at calc(100% - 36px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 36px) 36px)" }}
            exit={{ clipPath: "circle(0px at calc(100% - 36px) 36px)" }}
            transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-8 py-24">
              {visibleNavItems.map((item, idx) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ x: -48, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -36, opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.12 + idx * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-neutral-200 py-4 text-2xl font-extrabold tracking-tight text-neutral-950 transition-colors hover:text-neutral-500 dark:border-neutral-800 dark:text-white dark:hover:text-neutral-400"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ x: -48, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -36, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.12 + visibleNavItems.length * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-4 text-sm font-bold text-white dark:bg-white dark:text-neutral-950"
              >
                <span>{language === "ar" ? "تواصل معي" : "Contact Me"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
