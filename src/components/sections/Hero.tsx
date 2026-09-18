"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { ArrowUpRight } from "lucide-react";

export const Hero: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].hero;

  const whatsappMessage =
    language === "ar"
      ? encodeURIComponent("مرحبا حمود أريد الاستفسار عن تصميم موقع")
      : encodeURIComponent("Hello 7mud, I'd like to inquire about building a website");

  const whatsappUrl = `https://wa.me/963951708141?text=${whatsappMessage}`;

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-16 px-4 sm:px-8 overflow-hidden bg-white dark:bg-black text-neutral-950 dark:text-white">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm font-medium mb-8 text-neutral-800 dark:text-neutral-200 shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neutral-900 dark:bg-white"></span>
          </span>
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            {t.statusBadge}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-neutral-950 dark:text-white leading-[1.15] max-w-4xl mb-6"
        >
          {t.titlePrefix}{" "}
          <span className="underline underline-offset-8 decoration-neutral-300 dark:decoration-neutral-700">
            {t.titleHighlight}
          </span>{" "}
          {t.titleSuffix}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mb-10 leading-relaxed font-sans font-normal"
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
            <ShimmerButton
              variant="primary"
              className="w-full sm:w-auto px-8 py-4 text-base"
              icon={<ArrowUpRight className="w-5 h-5" />}
            >
              {t.ctaPrimary}
            </ShimmerButton>
          </a>

          <a href="#pricing" className="w-full sm:w-auto">
            <ShimmerButton
              variant="outline"
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              {t.ctaSecondary}
            </ShimmerButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
