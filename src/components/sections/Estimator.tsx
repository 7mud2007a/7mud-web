"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { translations } from "@/data/translations";
import { estimatorOptions } from "@/data/portfolioData";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Calculator, Check, Clock, DollarSign, Send, MessageCircle } from "lucide-react";

export const EstimatorSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language].estimator;

  const [selectedType, setSelectedType] = useState(estimatorOptions.projectTypes[0].id);
  const [selectedTimeline, setSelectedTimeline] = useState(estimatorOptions.timelines[0].id);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    estimatorOptions.features[0].id,
  ]);

  const projectTypeObj = estimatorOptions.projectTypes.find((p) => p.id === selectedType) || estimatorOptions.projectTypes[0];
  const timelineObj = estimatorOptions.timelines.find((tl) => tl.id === selectedTimeline) || estimatorOptions.timelines[0];

  const featuresCost = selectedFeatures.reduce((acc, featId) => {
    const feat = estimatorOptions.features.find((f) => f.id === featId);
    return acc + (feat ? feat.cost : 0);
  }, 0);

  const rawTotal = (projectTypeObj.baseCost + featuresCost) * timelineObj.multiplier;
  const estimatedCost = Math.round(rawTotal);
  const estimatedDays = timelineObj.multiplier > 1.0 ? Math.ceil(projectTypeObj.baseDays * 0.7) : projectTypeObj.baseDays;

  const toggleFeature = (fId: string) => {
    if (selectedFeatures.includes(fId)) {
      setSelectedFeatures(selectedFeatures.filter((id) => id !== fId));
    } else {
      setSelectedFeatures([...selectedFeatures, fId]);
    }
  };

  const getWhatsAppMessage = () => {
    const selectedFeatureNames = selectedFeatures
      .map((fId) => estimatorOptions.features.find((f) => f.id === fId)?.label[language])
      .filter(Boolean)
      .join(", ");

    const text = `Hey Daniel, I used your website estimator!
Project Type: ${projectTypeObj.label[language]}
Timeline: ${timelineObj.label[language]}
Add-ons: ${selectedFeatureNames || "None"}
Estimated Budget: ~$${estimatedCost} USD (${estimatedDays} days)
I would like to discuss building this website!`;

    return encodeURIComponent(text);
  };

  const whatsappUrl = `https://wa.me/?text=${getWhatsAppMessage()}`;

  return (
    <section id="estimator" className="py-24 px-4 sm:px-8 relative overflow-hidden bg-mesh-gradient">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Project Type */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-mono flex items-center justify-center font-bold">1</span>
                {t.selectType}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {estimatorOptions.projectTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => setSelectedType(pt.id)}
                    className={`p-4 rounded-2xl border text-left rtl:text-right transition-all duration-300 flex flex-col justify-between ${
                      selectedType === pt.id
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-lg scale-[1.02]"
                        : "glass-panel text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                  >
                    <span className="font-semibold text-sm mb-2">{pt.label[language]}</span>
                    <span className="text-xs font-mono opacity-80">
                      From ${pt.baseCost} USD
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Timeline */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono flex items-center justify-center font-bold">2</span>
                {t.selectSpeed}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {estimatorOptions.timelines.map((tl) => (
                  <button
                    key={tl.id}
                    onClick={() => setSelectedTimeline(tl.id)}
                    className={`p-4 rounded-2xl border text-left rtl:text-right transition-all duration-300 ${
                      selectedTimeline === tl.id
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-lg scale-[1.02]"
                        : "glass-panel text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                  >
                    <span className="font-semibold text-sm">{tl.label[language]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono flex items-center justify-center font-bold">3</span>
                {t.selectFeatures}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {estimatorOptions.features.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`p-4 rounded-2xl border text-left rtl:text-right transition-all duration-300 flex items-center justify-between ${
                        isChecked
                          ? "bg-purple-500/10 border-purple-500/40 text-purple-900 dark:text-purple-200"
                          : "glass-panel text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? "bg-purple-600 border-purple-600 text-white"
                              : "border-slate-400 dark:border-white/20"
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs font-medium">{feat.label[language]}</span>
                      </div>
                      <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
                        +${feat.cost}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Summary Card (Sticky) */}
          <div className="lg:col-span-1">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 sticky top-28 border-2 border-purple-500/20 shadow-2xl flex flex-col justify-between h-auto">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    ESTIMATED BUDGET
                  </span>
                  <Calculator className="w-5 h-5 text-purple-500" />
                </div>

                {/* Investment Total */}
                <div className="mb-6">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{t.totalEstimate}</p>
                  <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    ${estimatedCost}{" "}
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-normal">
                      USD
                    </span>
                  </div>
                </div>

                {/* Timeline Total */}
                <div className="mb-8 p-4 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t.timelineEstimate}</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      ~ {estimatedDays} {t.days}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Booking WhatsApp Trigger */}
              <div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <ShimmerButton
                    variant="primary"
                    className="w-full !py-4 text-sm"
                    icon={<MessageCircle className="w-4 h-4" />}
                  >
                    {t.sendWhatsApp}
                  </ShimmerButton>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
