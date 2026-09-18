"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2, Calendar, User } from "lucide-react";
import { ProjectItem } from "@/data/portfolioData";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const { language } = useApp();
  const t = translations[language].projects;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 z-10 overflow-hidden my-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
            <span className="text-xs font-mono tracking-wider uppercase px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              {project.category}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors"
              aria-label={t.modalClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Header */}
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3">
            {project.title[language]}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            {project.fullDesc[language]}
          </p>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 p-4 rounded-2xl bg-slate-100/60 dark:bg-white/5 border border-slate-200/50 dark:border-white/5">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.client}</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {project.client[language]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-500" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{t.duration}</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {project.duration[language]}
                </p>
              </div>
            </div>
          </div>

          {/* Highlights / Results */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              {t.results}
            </h4>
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-sm">
              {project.metrics[language]}
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              {t.techStack}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs rounded-lg bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              {t.modalClose}
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 transition-opacity shadow-md"
            >
              <span>{t.preview}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
