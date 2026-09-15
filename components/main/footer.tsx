"use client";

import Link from "next/link";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
return (
<footer className="relative z-20 w-full border-t border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-slate-950/80 backdrop-blur-xl">
<div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-6 py-7 md:flex-row">

    {/* Brand */}
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 via-blue-400 to-emerald-300 p-[1px]">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-slate-950">
          <span className="text-sm font-bold text-slate-800 dark:text-white">
            D
          </span>
        </div>
      </div>

      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Daniel
      </span>
    </div>

    {/* Copyright */}
    <div className="text-center">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Daniel. All rights reserved.
      </p>
    </div>

    {/* Social links */}
    <div className="flex items-center gap-4">
      <Link
        href="https://t.me/DanielXdev"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:text-purple-600 dark:text-slate-400 dark:hover:text-purple-400"
      >
        <FaTelegramPlane className="h-5 w-5" />
      </Link>

      <Link
        href="https://wa.me/963951708141?text=Hey%20Daniel%2C%20I%20wanted%20to%20ask%20you%20about%20building%20a%20website."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
      >
        <FaWhatsapp className="h-5 w-5" />
      </Link>
    </div>

  </div>
</footer>

);
};
