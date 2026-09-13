"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

// Configuration variable / placeholder for WhatsApp phone number if needed in future
const WHATSAPP_PHONE_NUMBER = ""; // e.g. "1234567890"

const PREFILLED_MESSAGE = encodeURIComponent(
  "Hey Daniel, I wanted to ask you about building a website."
);

const WHATSAPP_URL = WHATSAPP_PHONE_NUMBER
  ? `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${PREFILLED_MESSAGE}`
  : `https://wa.me/?text=${PREFILLED_MESSAGE}`;

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 md:px-8 max-w-5xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 sm:p-14 rounded-3xl relative overflow-hidden flex flex-col items-center text-center gap-8 shadow-xl"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Get In Touch
          </span>
        </div>

        <div className="max-w-2xl flex flex-col gap-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Let&apos;s Build Something Extraordinary.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a website project, landing page idea, or custom digital experience in mind? Reach out directly to discuss your requirements.
          </p>
        </div>

        {/* Contact Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-lg mt-2">
          {/* Telegram Button */}
          <Link
            href="https://t.me/DanielXdev"
            target="_blank"
            rel="noreferrer"
            className="group w-full sm:w-1/2 glass-button px-6 py-4 rounded-2xl flex items-center justify-center gap-3 border border-purple-200/80 hover:border-purple-300 bg-white/80 hover:bg-white text-slate-800 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-lg group-hover:scale-110 transition-transform">
              <FaTelegramPlane />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-slate-500 font-medium">Telegram</span>
              <span className="text-sm font-bold text-slate-800">@DanielXdev</span>
            </div>
          </Link>

          {/* WhatsApp Button */}
          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group w-full sm:w-1/2 glass-button px-6 py-4 rounded-2xl flex items-center justify-center gap-3 border border-emerald-200/80 hover:border-emerald-300 bg-white/80 hover:bg-white text-slate-800 shadow-sm hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg group-hover:scale-110 transition-transform">
              <FaWhatsapp />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-slate-500 font-medium">WhatsApp</span>
              <span className="text-sm font-bold text-slate-800">Chat with Daniel</span>
            </div>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
