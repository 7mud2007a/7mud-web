"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { ArrowUpRight, Sparkles, Code2, Zap, ShieldCheck } from "lucide-react";

export const Hero: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].hero;

  const whatsappMessage = encodeURIComponent("Hey Daniel, I wanted to ask you about building a website.");
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 sm:px-8 overflow-hidden bg-mesh-gradient">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[700px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-purple-600/15 via-cyan-500/15 to-emerald-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/20 text-xs sm:text-sm font-medium mb-8 text-slate-800 dark:text-slate-200 shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 dark:from-purple-300 dark:via-cyan-200 dark:to-emerald-300 font-semibold">
            {t.statusBadge}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-4xl mb-6"
        >
          {t.titlePrefix}{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-cyan-500 to-indigo-600 dark:from-purple-400 dark:via-cyan-300 dark:to-indigo-300">
            {t.titleHighlight}
          </span>{" "}
          {t.titleSuffix}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-10 leading-relaxed font-sans"
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
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

          <a href="#projects" className="w-full sm:w-auto">
            <ShimmerButton
              variant="glass"
              className="w-full sm:w-auto px-8 py-4 text-base"
            >
              {t.ctaSecondary}
            </ShimmerButton>
          </a>
        </motion.div>

        {/* Floating Glass Liquid Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl rounded-3xl glass-panel p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-white/20 dark:border-white/10"
        >
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/60 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 ml-2">
                7mud.engine.ts v15.2
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                STATUS: 100% ONLINE
              </span>
            </div>
          </div>

          {/* Metric Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left rtl:sm:text-right">
            <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
                <Zap className="w-5 h-5" />
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {t.metric1Value}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {t.metric1Label}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <div className="flex items-center gap-2 mb-2 text-cyan-600 dark:text-cyan-400">
                <Code2 className="w-5 h-5" />
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {t.metric2Value}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {t.metric2Label}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
              <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  {t.metric3Value}
                </span>
              </div>
              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {t.metric3Label}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
