"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { servicesData } from "@/data/portfolioData";
import { Code2, Sparkles, ShoppingBag, Palette, Check, ArrowUpRight } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].services;

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6 text-purple-500" />,
    Sparkles: <Sparkles className="w-6 h-6 text-cyan-500" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6 text-emerald-500" />,
    Palette: <Palette className="w-6 h-6 text-indigo-500" />,
  };

  const whatsappMessage = encodeURIComponent("Hey Daniel, I wanted to ask you about building a website.");
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  return (
    <section id="services" className="py-24 px-4 sm:px-8 relative overflow-hidden bg-mesh-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel glass-panel-hover rounded-3xl p-8 flex flex-col justify-between relative group"
            >
              <div>
                {/* Icon & Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center shadow-sm">
                    {iconMap[service.iconName] || <Code2 className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    SERVICE #0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {service.title[language]}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {service.description[language]}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features[language].map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-500 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Action Button */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:text-purple-500 transition-colors group-hover:translate-x-1 rtl:group-hover:-translate-x-1 duration-300"
                >
                  <span>Request Proposal</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
