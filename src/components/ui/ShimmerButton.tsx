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
    "relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 overflow-hidden cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary:
      "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm",
    secondary:
      "bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800",
    glass:
      "bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-800 text-neutral-950 dark:text-white hover:bg-neutral-200/80 dark:hover:bg-neutral-800/80",
    outline:
      "border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Light Shimmer Effect Layer */}
      <span className="absolute inset-0 w-full h-full animate-shimmer pointer-events-none opacity-30" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2 font-bold">
        {children}
        {icon && <span className="transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
      </span>
    </button>
  );
};
