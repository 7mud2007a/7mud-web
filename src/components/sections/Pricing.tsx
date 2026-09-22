"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Check, ArrowUpRight } from "lucide-react";
import { translations } from "@/data/translations";

export const PricingSection: React.FC = () => {
  const { language, contactInfo } = useApp();
  const t = translations[language].pricing;

  const rawWhatsapp = contactInfo.whatsapp_number || "0930431817";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "").replace(/^0/, "963");
  const whatsappMessage =
    language === "ar"
      ? encodeURIComponent("مرحبا أريد الاستفسار عن خدمة تصميم وتطوير المواقع")
      : encodeURIComponent("Hello, I'd like to inquire about website development services");

  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`;

  return (
    <section id="pricing" className="py-20 px-4 sm:px-8 relative overflow-hidden bg-neutral-100/60 dark:bg-black border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-neutral-800 dark:text-neutral-300 uppercase bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 px-3 py-1 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white mt-4 mb-4">
            {t.title}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Single Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 shadow-lg bg-neutral-950 text-white dark:bg-neutral-900 dark:text-white border-2 border-neutral-950 dark:border-neutral-700 ring-2 ring-neutral-400/20"
        >
          <div>
            {/* Card Header & Price */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 mb-8 border-b border-neutral-800">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  {t.cardTitle}
                </h3>
              </div>
              <div className="flex items-baseline">
                <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                  {t.price}
                </span>
              </div>
            </div>

            {/* Features List (2-column layout on sm+) */}
            <div className="mb-8">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-sm font-medium">
                    <span className="p-1 rounded-full mt-0.5 bg-neutral-800 text-white shrink-0">
                      <Check className="w-4 h-4 text-neutral-200" />
                    </span>
                    <span className="text-neutral-200 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Note & CTA */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col gap-6">
            <p className="text-xs sm:text-sm text-neutral-400 font-mono text-center">
              {t.note}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block"
            >
              <ShimmerButton
                variant="secondary"
                className="w-full !py-4 text-base"
                icon={<ArrowUpRight className="w-5 h-5" />}
              >
                {t.ctaBtn}
              </ShimmerButton>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
