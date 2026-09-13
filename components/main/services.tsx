"use client";

import { motion } from "framer-motion";
import { HiOutlineDesktopComputer, HiOutlineSparkles, HiOutlineCode } from "react-icons/hi";

const SERVICES = [
  {
    icon: HiOutlineDesktopComputer,
    title: "Websites",
    description:
      "Modern responsive websites built with strong visual design, high usability, and tailored visual branding.",
    features: ["Responsive Layouts", "Soft Glass UI", "Custom Branding", "SEO & Performance"],
    gradient: "from-purple-500/10 to-sky-500/10",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    icon: HiOutlineSparkles,
    title: "Landing Pages",
    description:
      "High-converting and visually polished landing pages crafted to captivate visitors and drive engagement.",
    features: ["Interactive Animations", "Compelling CTA Design", "Mobile Optimization", "Fast Load Speed"],
    gradient: "from-sky-500/10 to-emerald-500/10",
    badgeColor: "bg-sky-100 text-sky-700",
  },
  {
    icon: HiOutlineCode,
    title: "Custom Development",
    description:
      "Custom web experiences engineered with modern web frameworks tailored to specific project requirements.",
    features: ["Next.js & React", "TypeScript Integration", "3D Canvas Effects", "Clean Architecture"],
    gradient: "from-emerald-500/10 to-purple-500/10",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 px-4 md:px-8 max-w-6xl mx-auto scroll-mt-20">
      <div className="flex flex-col items-center text-center gap-4 mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/60">
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
          <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            What I Do
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Services & Capabilities
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
          High-end web creation services tailored for modern brands, creators, and businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service, idx) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group border border-white/80 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Subtle Ambient Background Tint */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col gap-5">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-800 text-2xl group-hover:scale-110 transition-transform">
                  <IconComponent />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-4 border-t border-slate-200/50 space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
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
