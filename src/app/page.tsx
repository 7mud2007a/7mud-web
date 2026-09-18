"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { BentoGridSection } from "@/components/sections/BentoGrid";
import { ServicesSection } from "@/components/sections/Services";
import { ProjectsSection } from "@/components/sections/Projects";
import { EstimatorSection } from "@/components/sections/Estimator";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      <Hero />
      <BentoGridSection />
      <ServicesSection />
      <ProjectsSection />
      <EstimatorSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
