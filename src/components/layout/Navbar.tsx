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
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 py-4 transition-all duration-300">
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
        <div className="flex sm:hidden items-center gap-2 pr-12">
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

        </div>
      </div>

      {/* Fixed menu control stays above the blurred navbar and the circular overlay. */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="sm:hidden fixed right-5 top-5 z-[120] flex h-10 w-10 items-center justify-center rounded-[25%] border border-transparent bg-[#223023] text-white shadow-[0_8px_25px_rgba(34,48,35,0.4)] transition-colors hover:bg-[#2c3e2e]"
        aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        aria-expanded={mobileMenuOpen}
      >
        <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
        <span className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
          <motion.svg
            viewBox="0 0 448 512"
            className="absolute h-[15px] w-[15px] fill-current"
            initial={false}
            animate={mobileMenuOpen ? { opacity: 0, y: -24 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
          </motion.svg>
          <motion.svg
            viewBox="0 0 320 512"
            className="absolute h-[16px] w-[12px] fill-current"
            initial={false}
            animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          >
            <path d="M310.6 361.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L160 301.3 54.7 406.7c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L114.7 256 9.4 150.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 210.7l105.3-105.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L205.3 256l105.3 105.4z" />
          </motion.svg>
        </span>
      </button>

      {/* Mobile menu: circular reveal inspired by the R2 navigation animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="sm:hidden fixed inset-0 z-[110] flex min-h-[100dvh] flex-col justify-center overflow-y-auto bg-[#223023]"
            initial={{ clipPath: "circle(0px at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(200% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0px at calc(100% - 40px) 40px)" }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-0 px-8 py-24">
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
                  className="border-0 py-3 text-[clamp(1.8rem,6vw,4.5rem)] font-bold uppercase tracking-[-0.02em] text-white/40 transition-all duration-300 hover:tracking-[0.02em] hover:text-white hover:[text-shadow:0_0_20px_rgba(255,255,255,0.4)]"
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
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-white/10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white/20"
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
