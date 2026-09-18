"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "w-9 h-9",
  showText = true,
}) => {
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Glow backdrop on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 via-cyan-500/30 to-indigo-500/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Monolithic Geometric "7" SVG */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient
              id="brand7Gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            <linearGradient
              id="brand7Accent"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* Outer Cyber Frame */}
          <path
            d="M 10 15 L 90 15 L 85 28 L 22 28 L 22 30 L 78 30 L 42 88 L 26 88 L 58 35 L 10 35 Z"
            fill="url(#brand7Gradient)"
            className="dark:fill-[url(#brand7Gradient)] fill-slate-900"
          />

          {/* Angular Cyber Cut Lines */}
          <path
            d="M 28 20 L 82 20 L 78 26 L 24 26 Z"
            fill="url(#brand7Accent)"
            opacity="0.85"
          />

          <path
            d="M 46 88 L 52 88 L 74 52 L 68 52 Z"
            fill="url(#brand7Accent)"
            opacity="0.75"
          />

          {/* Precision Corner Accent Point */}
          <circle cx="86" cy="18" r="3" fill="#38bdf8" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 font-sans">
            7mud
          </span>
          <span className="text-[10px] tracking-widest text-slate-500 dark:text-slate-400 font-mono uppercase -mt-1">
            @DanielXdev
          </span>
        </div>
      )}
    </div>
  );
};
