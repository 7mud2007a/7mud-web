"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ArrowUp, Send, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].footer;
  const nav = translations[language].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappMessage =
    language === "ar"
      ? encodeURIComponent("مرحبا حمود أريد الاستفسار عن تصميم موقع")
      : encodeURIComponent("Hello 7mud, I'd like to inquire about building a website");

  const whatsappUrl = `https://wa.me/963951708141?text=${whatsappMessage}`;

  return (
    <footer className="relative border-t border-neutral-200 dark:border-neutral-900 bg-white dark:bg-black py-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-md">
            <BrandLogo />
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {t.tagline}
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-neutral-700 dark:text-neutral-300">
            <a href="#hero" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              {nav.home}
            </a>
            <a href="#services" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              {nav.services}
            </a>
            <a href="#pricing" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              {nav.pricing}
            </a>
            <a href="#contact" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              {nav.contact}
            </a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/dev7mud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @dev7mud"
              className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://t.me/Dev7mud"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram @Dev7mud"
              className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <Send className="w-4 h-4" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-800 dark:text-neutral-200 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-black transition-colors flex items-center gap-1 text-xs font-semibold"
              title={t.scrollTop}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Rights Section */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
          <p>{t.rights}</p>
        </div>
      </div>
    </footer>
  );
};
