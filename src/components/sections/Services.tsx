"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Layout, Sliders, Database, Zap, Sparkles, Code2, ShoppingBag, Palette } from "lucide-react";

export const ServicesSection: React.FC = () => {
  const { language, services } = useApp();
  const isAr = language === "ar";

  const badgeText = isAr ? "مميزات العمل معي" : "WHAT YOU GET";
  const titleText = isAr ? "ما الذي تحصل عليه عند العمل معي؟" : "Key Features & Advantages";
  const subtitleText = isAr
    ? "خدمات متكاملة تضمن حصولك على موقع ويب احترافي يدعم نمو أعمالك."
    : "Comprehensive web development services ensuring a professional site that grows your business.";

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-6 h-6 text-neutral-900 dark:text-white" />,
    Sparkles: <Sparkles className="w-6 h-6 text-neutral-900 dark:text-white" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6 text-neutral-900 dark:text-white" />,
    Palette: <Palette className="w-6 h-6 text-neutral-900 dark:text-white" />,
    Layout: <Layout className="w-6 h-6 text-neutral-900 dark:text-white" />,
    Sliders: <Sliders className="w-6 h-6 text-neutral-900 dark:text-white" />,
    Database: <Database className="w-6 h-6 text-neutral-900 dark:text-white" />,
    Zap: <Zap className="w-6 h-6 text-neutral-900 dark:text-white" />,
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-8 relative overflow-hidden bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-neutral-800 dark:text-neutral-300 uppercase bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-1 rounded-full">
            {badgeText}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white mt-4 mb-4">
            {titleText}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            {subtitleText}
          </p>
        </div>

        {/* Services 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, idx) => {
            const title = isAr ? service.title_ar : service.title_en;
            const description = isAr ? service.description_ar : service.description_en;

            return (
              <motion.div
                key={service.id || idx}
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
                      {iconMap[service.icon_name] || <Layout className="w-6 h-6 text-neutral-900 dark:text-white" />}
                    </div>
                    <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-neutral-950 dark:text-white mb-3">
                    {title}
                  </h3>

                  <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
