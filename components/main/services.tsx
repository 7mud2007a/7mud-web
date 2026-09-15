"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineDesktopComputer,
  HiOutlineSparkles,
  HiOutlineCode,
  HiCheckCircle,
  HiArrowRight,
  HiStar,
} from "react-icons/hi";

const FEATURED_INCLUSIONS = [
  "Custom UI/UX Design",
  "Fully Responsive Website",
  "Professional Frontend Development",
  "Custom Backend Development",
  "Complete Database Integration",
  "Login & Authentication System",
  "User Registration",
  "User Management",
  "Admin Dashboard when required",
  "User Roles & Permissions",
  "API Integrations",
  "Custom Features & Functionality",
  "Performance Optimization",
  "Basic SEO Setup",
  "Production Deployment",
];

const STANDARD_SERVICES = [
  {
    icon: HiOutlineDesktopComputer,
    title: "Websites",
    description:
      "Modern responsive websites built with strong visual design, high usability, and tailored visual branding.",
    features: ["Responsive Layouts", "Soft Glass UI", "Custom Branding", "SEO & Performance"],
    gradient: "from-purple-500/10 to-sky-500/10",
  },
  {
    icon: HiOutlineSparkles,
    title: "Landing Pages",
    description:
      "High-converting and visually polished landing pages crafted to captivate visitors and drive engagement.",
    features: ["Interactive Animations", "Compelling CTA Design", "Mobile Optimization", "Fast Load Speed"],
    gradient: "from-sky-500/10 to-emerald-500/10",
  },
  {
    icon: HiOutlineCode,
    title: "Custom Development",
    description:
      "Custom web experiences engineered with modern web frameworks tailored to specific project requirements.",
    features: ["Next.js & React", "TypeScript Integration", "3D Canvas Effects", "Clean Architecture"],
    gradient: "from-emerald-500/10 to-purple-500/10",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="flex flex-col items-center text-center gap-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/60">
          <span className="w-2 h-2 rounded-full bg-sky-600 dark:bg-sky-400 animate-pulse" />
          <span className="text-xs font-semibold text-sky-700 dark:text-sky-300 uppercase tracking-wider">
            What I Do
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Services & Capabilities
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
          High-end web creation services tailored for modern brands, creators, and businesses.
        </p>
      </div>

      {/* FEATURED SERVICE CARD: Custom Website Development */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -4 }}
        className="glass-panel rounded-3xl p-6 sm:p-10 md:p-12 mb-16 relative overflow-hidden border border-white/90 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        {/* Subtle Background Accent Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-200/50 dark:from-purple-900/30 via-sky-200/30 dark:via-sky-900/20 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-200/40 dark:from-emerald-900/20 via-sky-100/30 dark:via-sky-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Side: Offer Details & Pricing */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-sky-600 text-white text-xs font-extrabold tracking-wider uppercase shadow-sm">
                <HiStar className="w-3.5 h-3.5" />
                CUSTOM BUILD
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-200/60 dark:border-purple-800/60">
                  Custom Design
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-xs font-semibold border border-sky-200/60 dark:border-sky-800/60">
                  Full Stack
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200/60 dark:border-emerald-800/60">
                  Database Ready
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
                Custom Website Development
              </h3>
              <p className="text-purple-700 dark:text-purple-400 font-semibold text-base sm:text-lg mt-2">
                From an idea to a complete website built specifically for your project.
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              A fully custom website designed and developed around your goals, from the user interface and experience to the backend, database, authentication, and custom functionality.
            </p>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70 shadow-sm flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                STARTING FROM
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-purple-700 via-sky-600 to-emerald-600 dark:from-purple-400 dark:via-sky-400 dark:to-emerald-400 bg-clip-text text-transparent">
                  $500+
                </span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                Final price depends on project requirements.
              </span>
            </div>

            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-sky-600 to-emerald-600 text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
            >
              <span>Start Your Project</span>
              <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Side: What The Service Includes (15 Features Grid) */}
          <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-2xl border border-white/80 dark:border-slate-800 shadow-sm bg-white/60 dark:bg-slate-900/60">
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <span>What The Service Includes</span>
              <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-200/50 dark:border-purple-800/50">
                Full Package
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURED_INCLUSIONS.map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
                  <HiCheckCircle className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Standard Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STANDARD_SERVICES.map((service, idx) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group border border-white/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-100 text-2xl group-hover:scale-110 transition-transform">
                  <IconComponent />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
