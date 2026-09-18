"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export const LogoIntro = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track scroll position over the intro container
  const { scrollY } = useScroll();

  // Scroll animations: shrink, move upward/away, and fade out when scrolling down
  const rawScale = useTransform(scrollY, [0, 400], [1, 0.35]);
  const rawY = useTransform(scrollY, [0, 400], [0, -120]);
  const rawOpacity = useTransform(scrollY, [0, 320], [1, 0]);

  // Apply spring physics to scroll transforms for inertia & smoothness
  const scale = useSpring(rawScale, { stiffness: 120, damping: 25 });
  const translateY = useSpring(rawY, { stiffness: 120, damping: 25 });
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 25 });

  // Mouse / Touch pointer tilt & translation with spring inertia
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(useTransform(pointerY, [-200, 200], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(pointerX, [-200, 200], [-15, 15]), springConfig);
  const moveX = useSpring(useTransform(pointerX, [-200, 200], [-25, 25]), springConfig);
  const moveY = useSpring(useTransform(pointerY, [-200, 200], [-25, 25]), springConfig);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    pointerX.set(e.clientX - centerX);
    pointerY.set(e.clientY - centerY);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center pt-28 pb-8 px-4 overflow-hidden touch-pan-y"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-purple-500/10 via-sky-500/10 to-emerald-500/10 dark:from-purple-500/20 dark:via-sky-500/20 dark:to-emerald-500/20 blur-3xl" />
      </div>

      {/* Main Container bound to scroll scale/y/opacity */}
      <motion.div
        style={{
          scale,
          y: translateY,
          opacity,
        }}
        className="flex flex-col items-center justify-center gap-6 w-full max-w-4xl z-10"
      >
        {/* Availability Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 dark:border-emerald-400/30 backdrop-blur-md shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300 tracking-wide">
            Available for 2 projects this month
          </span>
        </motion.div>

        {/* Large Visually Dominant Interactive Logo */}
        <div className="relative flex items-center justify-center py-4 cursor-grab active:cursor-grabbing perspective-1000">
          <motion.div
            style={{
              x: moveX,
              y: moveY,
              rotateX,
              rotateY,
            }}
            drag
            dragConstraints={{ left: -60, right: 60, top: -60, bottom: 60 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
            className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center"
          >
            {/* Continuous Slow Rotating Layer */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 45,
                ease: "linear",
              }}
              className="w-full h-full relative flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="Daniel Logo"
                width={320}
                height={320}
                priority
                className="object-contain w-full h-full brightness-0 dark:invert drop-shadow-xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
