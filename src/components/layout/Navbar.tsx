"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useApp } from "@/context/AppContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Globe, ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, navigation, siteCopy } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    const button = menuButtonRef.current;
    setMobileMenuOpen((open) => !open);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const visibleNavItems = navigation
    .filter((item) => item.enabled)
    .map((item, index) => ({
      label: index === 2 ? (language === "ar" ? "أعمالي" : "My Work") : (language === "ar" ? item.label_ar : item.label_en),
      href: index === 2 ? "#projects" : item.href,
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
        ref={menuButtonRef}
        onClick={toggleMobileMenu}
        className="relative z-[102] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm transition-colors"
        aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        aria-expanded={mobileMenuOpen}
      >
        <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
        <span className="relative flex h-5 w-5 items-center justify-center">
          <Menu className={"absolute h-5 w-5 transition-all duration-200 " + (mobileMenuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100")} />
          <X className={"absolute h-5 w-5 transition-all duration-200 " + (mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0")} />
        </span>
      </button>


        </div>
      </div>


      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="sm:hidden fixed inset-0 z-[9999] flex min-h-[100svh] flex-col overflow-y-auto bg-white text-neutral-950 dark:bg-black dark:text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="flex min-h-20 items-center justify-end px-6 pt-4">
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-300 bg-neutral-100 text-neutral-950 shadow-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-white" aria-label={language === "ar" ? "إغلاق القائمة" : "Close menu"}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-1 px-8 pb-16">
                {visibleNavItems.map((item) => (
                  <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block rounded-xl px-3 py-4 text-[clamp(1.8rem,6vw,4.5rem)] font-bold text-neutral-950 transition-colors hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900">
                    {item.label}
                  </a>
                ))}
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-4 text-sm font-bold text-white dark:bg-white dark:text-black">
                  <span>{language === "ar" ? "تواصل معي" : "Contact Me"}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
};
