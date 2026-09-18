"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Send, MessageCircle, CheckCircle, ArrowUpRight } from "lucide-react";

export const ContactSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].contact;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
  };

  const whatsappMessage =
    language === "ar"
      ? encodeURIComponent("مرحبا حمود أريد الاستفسار عن تصميم موقع")
      : encodeURIComponent("Hello 7mud, I'd like to inquire about building a website");

  const whatsappUrl = `https://wa.me/963951708141?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 relative overflow-hidden bg-neutral-50 dark:bg-black border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-neutral-800 dark:text-neutral-300 uppercase bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 px-3 py-1 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white mt-4 mb-4">
            {t.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct Channels Cards (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-6">
              {t.quickConnect}
            </h3>

            {/* WhatsApp Card */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex items-center justify-between group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 block shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                    {t.whatsappLabel}
                  </h4>
                  <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {t.whatsappSub}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
            </a>

            {/* Telegram Card */}
            <a
              href="https://t.me/Dev7mud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex items-center justify-between group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 block shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                    {t.telegramLabel}
                  </h4>
                  <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {t.telegramSub}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
            </a>

            {/* Instagram Card */}
            <a
              href="https://instagram.com/dev7mud"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex items-center justify-between group hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 block shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-900 dark:text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-neutral-950 dark:text-white">
                    {t.instagramLabel}
                  </h4>
                  <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {t.instagramSub}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors" />
            </a>
          </div>

          {/* Contact Form (Spans 7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center mb-4 border border-neutral-200 dark:border-neutral-700">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-2">
                  {language === "ar" ? "شكراً لك!" : "Thank You!"}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm max-w-md">
                  {t.successMsg}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-300 mb-2">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-300 mb-2">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-300 mb-2">
                    {t.messageLabel}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={t.messagePlaceholder}
                    className="w-full px-4 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white transition-all resize-none"
                  />
                </div>

                <ShimmerButton
                  type="submit"
                  variant="primary"
                  className="w-full !py-4 text-base"
                  icon={<Send className="w-4 h-4" />}
                >
                  {t.sendBtn}
                </ShimmerButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
