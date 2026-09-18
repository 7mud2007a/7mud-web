"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { servicesData } from "@/data/portfolioData";
import { Layout, Sliders, Database, Zap } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].services;

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Layout className="w-6 h-6 text-neutral-900 dark:text-white" />,
    Sparkles: <Sliders className="w-6 h-6 text-neutral-900 dark:text-white" />,
    ShoppingBag: <Database className="w-6 h-6 text-neutral-900 dark:text-white" />,
    Palette: <Zap className="w-6 h-6 text-neutral-900 dark:text-white" />,
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-8 relative overflow-hidden bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-neutral-800 dark:text-neutral-300 uppercase bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-1 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white mt-4 mb-4">
            {t.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Services 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 shadow-sm"
            >
              <div>
                {/* Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-sm">
                    {iconMap[service.iconName] || <Layout className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-3">
                  {service.title[language]}
                </h3>

                <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                  {service.description[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
