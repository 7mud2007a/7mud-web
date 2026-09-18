"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Cpu, Gauge, Layers, Server, Shield, Sparkles } from "lucide-react";

export const BentoGridSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].bento;

  const techIcons = [
    { name: "Next.js 15", color: "from-slate-700 to-slate-900 dark:from-white dark:to-slate-300" },
    { name: "TypeScript", color: "from-blue-600 to-cyan-500" },
    { name: "Tailwind CSS", color: "from-cyan-500 to-teal-400" },
    { name: "Framer Motion", color: "from-purple-600 to-pink-500" },
    { name: "Node.js", color: "from-emerald-600 to-green-500" },
    { name: "PostgreSQL", color: "from-indigo-600 to-blue-500" },
  ];

  return (
    <section id="stack" className="py-24 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-purple-600 dark:text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Tech Stack Arsenal (Spans 2 cols on md/lg) */}
          <SpotlightCard className="md:col-span-2 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {t.techCardTitle}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-6 max-w-xl">
                {t.techCardDesc}
              </p>
            </div>

            {/* Interactive Tech Badge Pills */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              {techIcons.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold bg-white/60 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-2"
                >
                  <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`} />
                  {item.name}
                </span>
              ))}
            </div>
          </SpotlightCard>

          {/* Card 2: 100/100 Lighthouse Performance */}
          <SpotlightCard className="flex flex-col justify-between min-h-[300px]" spotlightColor="rgba(52, 211, 153, 0.15)">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {t.perfCardTitle}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
                {t.perfCardDesc}
              </p>
            </div>

            {/* Lighthouse Circular Ring */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="relative flex items-center justify-center w-14 h-14 rounded-full border-4 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                100
              </div>
              <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
                <p className="font-bold text-emerald-600 dark:text-emerald-400">PERFORMANCE</p>
                <p>SEO: 100 | Best Practices: 100</p>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 3: Liquid Glass Design System */}
          <SpotlightCard className="flex flex-col justify-between min-h-[300px]" spotlightColor="rgba(56, 189, 248, 0.15)">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {t.designCardTitle}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
                {t.designCardDesc}
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/20 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Backdrop-blur-2xl</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 font-semibold">HyperOS 4</span>
            </div>
          </SpotlightCard>

          {/* Card 4: Cloud Architecture & Backend (Spans 2 cols on md/lg) */}
          <SpotlightCard className="md:col-span-2 flex flex-col justify-between min-h-[300px]" spotlightColor="rgba(129, 140, 248, 0.15)">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                {t.archCardTitle}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mb-6 max-w-xl">
                {t.archCardDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-center text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                PostgreSQL DB
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-center text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                Redis Caching
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-center text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                REST & GraphQL
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 text-center text-xs font-mono font-medium text-slate-800 dark:text-slate-200">
                Docker / Cloud
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
