"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { projectsData, ProjectItem } from "@/data/portfolioData";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { ExternalLink, Eye, Layers, Sparkles } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].projects;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === "all") return true;
    return project.category === activeCategory;
  });

  const categories = [
    { id: "all", label: t.all },
    { id: "fullstack", label: t.fullstack },
    { id: "landing", label: t.landing },
    { id: "ecommerce", label: t.ecommerce },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono tracking-widest text-indigo-600 dark:text-indigo-400 uppercase bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-md scale-105"
                  : "glass-panel text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Background Ambient Color Mesh Gradient */}
                <div
                  className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${project.gradient} rounded-full blur-3xl opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div>
                  {/* Category Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-slate-200/80 dark:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-300/50 dark:border-white/10">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      {project.metrics[language].split("|")[0]}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">
                    {project.title[language]}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {project.shortDesc[language]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200/80 dark:border-white/5 text-slate-700 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{t.details}</span>
                  </button>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 transition-opacity"
                  >
                    <span>{t.preview}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
