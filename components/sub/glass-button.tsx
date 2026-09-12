"use client";

import React from "react";
import Link from "next/link";
import { IconType } from "react-icons";

interface GlassButtonProps {
  href: string;
  text: string;
  icon?: IconType;
  variant?: "telegram" | "whatsapp" | "primary";
}

export const GlassButton = ({
  href,
  text,
  icon: Icon,
  variant = "primary",
}: GlassButtonProps) => {
  const glowColors = {
    telegram: "hover:shadow-[0_0_25px_rgba(0,136,204,0.6)] border-[rgba(0,136,204,0.4)] hover:border-[#0088cc]",
    whatsapp: "hover:shadow-[0_0_25px_rgba(37,211,102,0.6)] border-[rgba(37,211,102,0.4)] hover:border-[#25D366]",
    primary: "hover:shadow-[0_0_25px_rgba(112,66,248,0.6)] border-[rgba(112,66,248,0.4)] hover:border-[#7042f8]",
  };

  const borderBeamGradient = {
    telegram: "from-transparent via-[#0088cc] to-transparent",
    whatsapp: "from-transparent via-[#25D366] to-transparent",
    primary: "from-transparent via-[#7042f8] to-transparent",
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[rgba(3,0,20,0.4)] backdrop-blur-md px-6 py-3 text-white font-medium shadow-md transition-all duration-300 border hover:-translate-y-0.5 active:translate-y-0 ${glowColors[variant]}`}
    >
      {/* Lightswind Border Beam Effect */}
      <span
        className={`absolute inset-0 z-0 bg-gradient-to-r ${borderBeamGradient[variant]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse`}
        style={{
          maskImage: "linear-gradient(black, black)",
          WebkitMaskImage: "linear-gradient(black, black)",
        }}
      />

      {/* Glass Inner Glow Overlay */}
      <span className="absolute inset-0 z-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      {/* Button Content */}
      <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
        {Icon && <Icon className="text-xl transition-transform duration-300 group-hover:scale-110" />}
        <span>{text}</span>
      </span>
    </Link>
  );
};
