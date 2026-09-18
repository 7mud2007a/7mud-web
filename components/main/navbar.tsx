"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/theme-context";

const NAV_ITEMS = [
  { title: "Home", href: "#hero" },
  { title: "About", href: "#about" },
  { title: "Services", href: "#services" },
  { title: "Projects", href: "#projects" },
  { title: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, toggleTheme, isAnimating } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      const currentScroll = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= currentScroll) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    toggleTheme(rect);
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto w-full max-w-5xl rounded-full px-5 py-3 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/80 dark:border-slate-800/80 shadow-lg shadow-slate-200/50 dark:shadow-black/50"
            : "bg-white/40 dark:bg-slate-900/40 backdrop-blur-lg border border-white/60 dark:border-slate-800/60 shadow-md shadow-slate-100/40 dark:shadow-black/30"
        }`}
      >
        {/* Brand Identity */}
        <Link
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 via-sky-400 to-emerald-400 p-[2px] flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform overflow-hidden">
              <Image
                src="/logo.png"
                alt="Daniel Logo"
                width={24}
                height={24}
                className="w-full h-full object-contain brightness-0 dark:invert"
              />
            </div>
          </div>
          <span className="font-semibold text-slate-800 dark:text-slate-100 tracking-tight text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            Daniel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/60 dark:bg-slate-800/60 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-purple-700 dark:text-purple-300 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white dark:bg-slate-700/90 rounded-full shadow-sm border border-purple-100 dark:border-purple-800/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Actions (Theme Toggle & Contact CTA) */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggleClick}
            disabled={isAnimating}
            className="p-2.5 rounded-full text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 hover:scale-105 active:scale-95 transition-all shadow-sm focus:outline-none"
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            aria-label="Toggle theme"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {theme === "light" ? (
                <FiMoon className="text-purple-600 text-lg" />
              ) : (
                <FiSun className="text-amber-400 text-lg" />
              )}
            </motion.div>
          </button>

          {/* Desktop CTA Contact Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="https://t.me/DanielXdev"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-50/80 dark:bg-purple-950/40 hover:bg-purple-100/80 dark:hover:bg-purple-900/50 border border-purple-200/60 dark:border-purple-700/50 rounded-full backdrop-blur-md shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98]"
            >
              <FaTelegramPlane className="text-purple-600 dark:text-purple-400 text-base" />
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border border-white/80 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/80 dark:shadow-black/80 flex flex-col gap-4 md:hidden z-50"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-700 dark:hover:text-purple-300 font-medium transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="https://t.me/DanielXdev"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-sky-500 rounded-xl shadow-md transition-all active:scale-[0.98]"
              >
                <FaTelegramPlane className="text-base" />
                <span>Contact via Telegram</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
