"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTelegramPlane, FaArrowRight } from "react-icons/fa";
import { SparklesIcon } from "@heroicons/react/24/solid";

export const HeroContent = () => {
  return (
    <div className="w-full flex flex-col items-center text-center gap-8 z-10">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-slate-900/70 border border-purple-200/80 dark:border-purple-800/60 shadow-sm backdrop-blur-md"
      >
        <SparklesIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-700 via-sky-700 to-emerald-700 dark:from-purple-400 dark:via-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
          Web Developer & Website Creator
        </span>
      </motion.div>

      {/* Hero Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-4xl flex flex-col items-center gap-4"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1]">
          Hello, I&apos;m{" "}
          <span className="bg-gradient-to-r from-purple-600 via-sky-600 to-emerald-500 dark:from-purple-400 dark:via-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
            Daniel
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-normal text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mt-2">
          I design and build modern digital experiences that look as good as they feel.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-2"
      >
        <Link
          href="#projects"
          className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium text-sm sm:text-base shadow-lg shadow-slate-900/10 dark:shadow-purple-950/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <span>View My Work</span>
          <FaArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="#contact"
          className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium text-sm sm:text-base border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] backdrop-blur-md transition-all duration-200"
        >
          <span>Let&apos;s Work Together</span>
          <FaTelegramPlane className="w-4 h-4 text-purple-600 dark:text-purple-400 group-hover:rotate-12 transition-transform" />
        </Link>
      </motion.div>

      {/* Subtle Visual Graphic / Floating Glass Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full max-w-3xl mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
      >
        <div className="glass-card p-5 rounded-2xl hover:translate-y-[-2px] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-purple-100/80 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold mb-3">
            01
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">Custom Design</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Unique, tailored visual architecture with soft aesthetic polish.</p>
        </div>

        <div className="glass-card p-5 rounded-2xl hover:translate-y-[-2px] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-sky-100/80 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400 font-bold mb-3">
            02
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">Modern Tech</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Built using Next.js, React, TypeScript, and Framer Motion.</p>
        </div>

        <div className="glass-card p-5 rounded-2xl hover:translate-y-[-2px] transition-transform">
          <div className="w-10 h-10 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold mb-3">
            03
          </div>
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">Fluid Motion</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Smooth interactions, 3D depth, and elegant micro-animations.</p>
        </div>
      </motion.div>
    </div>
  );
};
