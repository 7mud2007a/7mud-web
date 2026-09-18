"use client";

import React from "react";

interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glass";
  className?: string;
  icon?: React.ReactNode;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  icon,
  ...props
}) => {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-medium text-sm transition-all duration-300 overflow-hidden cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary:
      "bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 hover:scale-[1.02]",
    secondary:
      "bg-slate-200/80 text-slate-900 dark:bg-slate-800/80 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700/80",
    glass:
      "glass-panel text-slate-900 dark:text-white hover:bg-white/10 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20",
    outline:
      "border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Light Shimmer Effect Layer */}
      <span className="absolute inset-0 w-full h-full animate-shimmer pointer-events-none opacity-40" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2 font-semibold">
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </span>
    </button>
  );
};
