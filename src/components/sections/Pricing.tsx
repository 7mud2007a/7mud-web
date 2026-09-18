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

  const cleanWhatsapp = (contactInfo.whatsapp_number || "963951708141").replace(/[^0-9]/g, "");
  const whatsappMessage =
    language === "ar"
      ? encodeURIComponent("مرحبا أريد الاستفسار عن باقات تصميم المواقع")
      : encodeURIComponent("Hello, I'd like to inquire about website packages");

  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${whatsappMessage}`;

  return (
    <section id="pricing" className="py-20 px-4 sm:px-8 relative overflow-hidden bg-neutral-100/60 dark:bg-black border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto">
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

        {/* Pricing 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {t.packages.map((pkg, idx) => {
            const isPopular = pkg.isPopular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 shadow-sm ${
                  isPopular
                    ? "bg-neutral-950 text-white dark:bg-neutral-900 dark:text-white border-2 border-neutral-950 dark:border-neutral-700 ring-2 ring-neutral-400/20"
                    : "bg-white dark:bg-neutral-900/60 text-neutral-950 dark:text-white border border-neutral-200 dark:border-neutral-800"
                }`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`text-[11px] font-bold font-mono tracking-wider uppercase px-3.5 py-1 rounded-full border shadow-sm ${
                        isPopular
                          ? "bg-white text-neutral-950 border-neutral-300"
                          : "bg-neutral-900 text-white border-neutral-700"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Card Title & Subtitle */}
                  <div className="mb-6 pt-2">
                    <h3 className="text-xl font-bold mb-1">{pkg.title}</h3>
                    <p
                      className={`text-xs font-mono ${
                        isPopular ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400"
                      }`}
                    >
                      {pkg.subtitle}
                    </p>
                  </div>

                  {/* Price Display */}
                  <div className="mb-8">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight">
                      {pkg.price}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm font-medium">
                        <span
                          className={`p-1 rounded-full mt-0.5 ${
                            isPopular
                              ? "bg-neutral-800 text-white dark:bg-neutral-800 dark:text-neutral-200"
                              : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-200"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <span
                          className={
                            isPopular
                              ? "text-neutral-200"
                              : "text-neutral-700 dark:text-neutral-300"
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-neutral-200/20 dark:border-neutral-800">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <ShimmerButton
                      variant={isPopular ? "secondary" : "primary"}
                      className="w-full !py-3.5 text-sm"
                      icon={<ArrowUpRight className="w-4 h-4" />}
                    >
                      {t.ctaBtn}
                    </ShimmerButton>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
