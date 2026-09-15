"use client";

import { ProjectCard } from "@/components/sub/project-card";
import { PROJECTS } from "@/constants";

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="flex flex-col items-center text-center gap-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/60">
          <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
          <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
            Featured Projects
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Selected Craft & Works
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
          A showcase of custom interactive web platforms built for optimal visual impact and fluid user interaction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <ProjectCard
            key={project.title}
            index={idx}
            title={project.title}
            description={project.description}
            image={project.image}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
};
