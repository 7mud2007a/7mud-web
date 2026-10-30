"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/Services";
import { ProjectsSection } from "@/components/sections/Projects";
import { ContactSection } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { MeshBackground } from "@/components/ui/MeshBackground";

export default function Home() {
  return (
    <main className="home-with-mesh min-h-screen flex flex-col relative overflow-hidden bg-transparent">
      <MeshBackground />
      <Navbar />
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
