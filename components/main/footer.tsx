import Link from "next/link";
import Image from "next/image";
import { FaTelegramPlane, FaWhatsapp, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-4 border-t border-slate-200/60 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 via-sky-400 to-emerald-400 p-[2px] flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center p-1 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Daniel Logo"
                width={20}
                height={20}
                className="w-full h-full object-contain brightness-0 dark:invert"
              />
            </div>
          </div>

          <span className="font-semibold text-slate-800 dark:text-slate-100 tracking-tight text-base">
            Daniel — Web Developer & Website Creator
          </span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} Daniel. All rights reserved.
        </p>

        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
          <Link
            href="https://t.me/DanielXdev"
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            title="Telegram @DanielXdev"
          >
            <FaTelegramPlane className="w-5 h-5" />
          </Link>

          <Link
            href="https://wa.me/?text=Hey%20Daniel%2C%20I%20wanted%20to%20ask%20you%20about%20building%20a%20website."
            target="_blank"
            rel="noreferrer"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="WhatsApp Contact"
          >
            <FaWhatsapp className="w-5 h-5" />
          </Link>

          <Link
            href="https://www.instagram.com/danielxdev_/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            title="Instagram @danielxdev_"
          >
            <FaInstagram className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
