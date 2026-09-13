"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaTelegramPlane } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

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
            ? "bg-white/70 backdrop-blur-xl border border-white/80 shadow-lg shadow-slate-200/50"
            : "bg-white/40 backdrop-blur-lg border border-white/60 shadow-md shadow-slate-100/40"
        }`}
      >
        {/* Brand Identity */}
        <Link
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 via-sky-400 to-emerald-400 p-[2px]">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-bold text-slate-800 text-sm group-hover:scale-105 transition-transform">
              D
            </div>
          </div>
          <span className="font-semibold text-slate-800 tracking-tight text-lg group-hover:text-purple-600 transition-colors">
            Daniel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100/60 p-1 rounded-full border border-slate-200/50">
          {NAV_ITEMS.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-purple-700 font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm border border-purple-100"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA Contact Button */}
        <div className="hidden md:flex items-center">
          <Link
            href="https://t.me/DanielXdev"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50/80 hover:bg-purple-100/80 border border-purple-200/60 rounded-full backdrop-blur-md shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98]"
          >
            <FaTelegramPlane className="text-purple-600 text-base" />
            <span>Contact Me</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-slate-700 hover:bg-white/60 transition-colors focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto absolute top-20 left-4 right-4 bg-white/90 backdrop-blur-2xl border border-white/80 rounded-2xl p-6 shadow-xl shadow-slate-200/80 flex flex-col gap-4 md:hidden z-50"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-700 font-medium transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-100">
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
