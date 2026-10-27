"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ArrowUpLeft, CarFront, Utensils } from "lucide-react";

const projects = [
  {
    name: "Veltrion Motors",
    descriptionAr: "منصة عصرية وفاخرة لعالم السيارات",
    descriptionEn: "A modern, premium automotive experience",
    url: "https://veltrion-motors.onrender.com/",
    preview: "https://image.thum.io/get/width/1200/crop/700/noanimate/https://veltrion-motors.onrender.com/",
    icon: CarFront,
    categoryAr: "سيارات",
    categoryEn: "AUTOMOTIVE",
  },
  {
    name: "Bitnaa Food",
    descriptionAr: "موقع بطابع خاص لعالم الطعام",
    descriptionEn: "A dedicated experience for food lovers",
    url: "https://bitnaa-food.onrender.com",
    preview: "https://image.thum.io/get/width/1200/crop/700/noanimate/https://bitnaa-food.onrender.com/",
    icon: Utensils,
    categoryAr: "طعام ومطاعم",
    categoryEn: "FOOD & DINING",
  },
  {
    name: "R3 Car",
    descriptionAr: "واجهة عصرية لعروض السيارات",
    descriptionEn: "A modern interface for car listings",
    url: "https://r3-car.onrender.com",
    preview: "https://image.thum.io/get/width/1200/crop/700/noanimate/https://r3-car.onrender.com/",
    icon: CarFront,
    categoryAr: "سيارات",
    categoryEn: "AUTOMOTIVE",
  },
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
            {isAr ? "تصفّح بعض المواقع التي صممتها وطورتها — اضغط على أي مشروع لزيارته" : "Explore a few websites I've designed and built — select a project to visit it"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {projects.map((project, idx) => {
            const ProjectIcon = project.icon;
            return (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${isAr ? "زيارة الموقع" : "Visit website"}: ${project.name}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="group block overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
              >
                <div className="relative overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <div className="flex h-9 items-center gap-1.5 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-400/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-400/70" />
                    <span className="mx-3 flex-1 truncate rounded-md bg-white dark:bg-neutral-900 px-3 py-1 text-[10px] font-mono text-neutral-400">{project.url.replace("https://", "")}</span>
                  </div>
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.preview}
                      alt={isAr ? `معاينة لموقع ${project.name}` : `Preview of ${project.name} website`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute bottom-3 end-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/95 text-neutral-950 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-black/90 dark:text-white">
                    <ArrowUpLeft className="h-5 w-5" />
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-1 text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-400">
                      {isAr ? project.categoryAr : project.categoryEn}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">0{idx + 1} / 03</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm">
                      <ProjectIcon className="h-5 w-5 text-neutral-900 dark:text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold text-neutral-950 dark:text-white transition-colors group-hover:text-neutral-600 dark:group-hover:text-neutral-300">{project.name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{isAr ? project.descriptionAr : project.descriptionEn}</p>
                    </div>
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">{isAr ? "استكشف" : "Explore"}</span>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
