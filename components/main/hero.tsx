"use client";

import React from "react";
import { HeroContent } from "../sub/hero-content";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen w-full pt-20 pb-10 px-4 md:px-8"
    >
      <HeroContent />
    </section>
  );
};
