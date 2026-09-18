"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ExternalLink, FolderGit2 } from "lucide-react";

export const ProjectsSection: React.FC = () => {
  const { language, projects } = useApp();
  const isAr = language === "ar";

  if (!projects || projects.length === 0) return null;

  const badgeText = isAr ? "أعمالي ومشاريعي" : "FEATURED PROJECTS";
  const titleText = isAr ? "مشاريع قمت بتطويرها حديثاً" : "Recent Work & Web Applications";
  const subtitleText = isAr
    ? "تصفح بعض النماذج الحية لمواقع ومنصات إلكترونية صممتها وطورتها باحترافية."
    : "Explore live interactive web projects designed and developed with precision.";

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-8 relative overflow-hidden bg-neutral-50 dark:bg-black border-t border-neutral-200 dark:border-neutral-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-neutral-800 dark:text-neutral-300 uppercase bg-neutral-200/80 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 px-3 py-1 rounded-full">
            {badgeText}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white mt-4 mb-4">
            {titleText}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            {subtitleText}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => {
            const title = isAr ? project.title_ar : project.title_en;
            const description = isAr ? project.description_ar : project.description_en;

            return (
              <motion.div
                key={project.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm group"
              >
                <div>
                  {/* Image / Header */}
                  {project.image_url ? (
                    <div className="h-48 bg-neutral-100 dark:bg-neutral-950 overflow-hidden relative border-b border-neutral-200 dark:border-neutral-800">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image_url}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-400">
                      <FolderGit2 className="w-10 h-10" />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                        {title}
                      </h3>
                      {project.is_featured && (
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black font-bold">
                          {isAr ? "مميز" : "Featured"}
                        </span>
                      )}
                    </div>

                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(project.technologies || []).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer External Links */}
                <div className="px-6 pb-6 pt-0 flex items-center gap-3">
                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      <span>{isAr ? "معاينة مباشرة" : "Live Demo"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                      title="GitHub Repository"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
