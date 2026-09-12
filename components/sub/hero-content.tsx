"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { GlassButton } from "@/components/sub/glass-button";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-32 md:mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[12px] border border-[#7042f88b] opacity-[0.9] flex items-center w-fit"
        >
          <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
          <h1 className="Welcome-text text-[13px]">
            Web Developer & Website Creator
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-[600px] w-auto h-auto leading-tight"
        >
          <span>
            Crafting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              modern & interactive
            </span>{" "}
            web experiences.
          </span>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-base sm:text-lg text-gray-400 my-4 max-w-[600px]"
        >
          Hi, I&apos;m Daniel. I create high-quality, high-performance websites and modern web applications that elevate your digital presence.
        </motion.p>

        {/* Telegram and WhatsApp Glass Buttons */}
        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-wrap items-center gap-4 mt-2"
        >
          <GlassButton
            href="https://t.me/DanielXdev"
            text="Telegram @DanielXdev"
            icon={FaTelegramPlane}
            variant="telegram"
          />
          <GlassButton
            href="https://wa.me/?text=Hey%20Daniel%2C%20I%20wanted%20to%20ask%20you%20about%20building%20a%20website."
            text="WhatsApp Contact"
            icon={FaWhatsapp}
            variant="whatsapp"
          />
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-10 md:mt-0"
      >
        <Image
          src="/hero-bg.svg"
          alt="work icons"
          height={650}
          width={650}
          draggable={false}
          className="select-none"
        />
      </motion.div>
    </motion.div>
  );
};
