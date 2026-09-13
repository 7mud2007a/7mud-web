"use client";

import { motion } from "framer-motion";

const TECH_PILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Three.js / WebGL",
  "Framer Motion",
  "UI/UX Craft",
  "Performance Optimization",
];

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Main Info */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 w-fit">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                About Daniel
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Crafting premium digital experiences with precise visual detail & fluid animation.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              I am a dedicated Web Developer and Website Creator focused on engineering modern, responsive, and visually striking web platforms. My approach pairs modern technology stacks with soft interactive interfaces to deliver products that perform seamlessly.
            </p>

            <p className="text-base text-slate-600 leading-relaxed">
              Every project is custom-designed from the ground up, keeping high readability, smooth visual response, and high user conversion at the forefront.
            </p>

            {/* Skills & Tech Stack Chips */}
            <div className="flex flex-wrap gap-2 pt-4">
              {TECH_PILLS.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-1.5 rounded-xl bg-white/80 border border-slate-200/70 text-slate-700 text-xs sm:text-sm font-medium shadow-2xs hover:border-purple-300 hover:text-purple-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Highlight Card */}
          <div className="w-full md:w-80 glass-card p-6 rounded-2xl flex flex-col gap-4 border border-white/80 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800">
              Core Principles
            </h3>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex gap-3 items-start">
                <span className="font-bold text-purple-600 text-base">01</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Visual Quality</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Clean layouts, glass aesthetics, and readable typography.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="font-bold text-sky-600 text-base">02</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Interactive Polish</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Subtle motion effects and micro-interactions that feel alive.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="font-bold text-emerald-600 text-base">03</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Peak Speed</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Fast render performance and efficient code architecture.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
