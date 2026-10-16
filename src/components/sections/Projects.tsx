"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Monitor, CarFront, Utensils } from "lucide-react";

const projects = [
  { name: "R2 Car", descriptionAr: "موقع سيارات", descriptionEn: "Car website", icon: CarFront },
  { name: "Bitnaa Food", descriptionAr: "موقع طعام", descriptionEn: "Food website", icon: Utensils },
  { name: "R3 Car", descriptionAr: "موقع سيارات", descriptionEn: "Car website", icon: CarFront },
];

export const ProjectsSection: React.FC = () => {
  const { language } = useApp();
  const isAr = language === "ar";

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 relative overflow-hidden bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-neutral-800 dark:text-neutral-300 uppercase bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-1 rounded-full">
            {isAr ? "معرض الأعمال" : "PORTFOLIO"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white mt-4 mb-4">
            {isAr ? "أعمالي" : "My Projects"}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            {isAr ? "مجموعة من المواقع التي قمت بتصميمها وتطويرها" : "A selection of websites I've designed and built"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, idx) => {
            const ProjectIcon = project.icon || Monitor;
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-7 sm:p-8 flex flex-col min-h-56 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-sm">
                    <ProjectIcon className="w-6 h-6 text-neutral-900 dark:text-white" />
                  </div>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">0{idx + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-2">{project.name}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">{isAr ? project.descriptionAr : project.descriptionEn}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
