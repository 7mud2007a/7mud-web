"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "w-9 h-9",
  showText = true,
}) => {
  const { language } = useApp();

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Monolithic Geometric Monochrome "7" SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient
              id="brand7GradientDark"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a3a3a3" />
            </linearGradient>

            <linearGradient
              id="brand7AccentDark"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#e5e5e5" />
              <stop offset="100%" stopColor="#737373" />
            </linearGradient>
          </defs>

          {/* Outer Monochromatic Frame */}
          <path
            d="M 10 15 L 90 15 L 85 28 L 22 28 L 22 30 L 78 30 L 42 88 L 26 88 L 58 35 L 10 35 Z"
            fill="currentColor"
            className="text-neutral-900 dark:text-white"
          />

          {/* Angular Precision Cut Lines */}
          <path
            d="M 28 20 L 82 20 L 78 26 L 24 26 Z"
            fill="currentColor"
            className="text-neutral-400 dark:text-neutral-500"
            opacity="0.85"
          />

          <path
            d="M 46 88 L 52 88 L 74 52 L 68 52 Z"
            fill="currentColor"
            className="text-neutral-400 dark:text-neutral-500"
            opacity="0.75"
          />

          {/* Precision Corner Accent Point */}
          <circle
            cx="86"
            cy="18"
            r="3"
            fill="currentColor"
            className="text-neutral-900 dark:text-white"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-neutral-950 dark:text-white font-sans leading-none">
            {language === "ar" ? "حمود" : "7mud"}
          </span>
          <span className="text-[10px] tracking-widest text-neutral-500 dark:text-neutral-400 font-mono uppercase mt-1">
            {language === "ar" ? "تصميم وتطوير ويب" : "Web Developer"}
          </span>
        </div>
      )}
    </div>
  );
};
