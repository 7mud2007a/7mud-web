import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { AmbientBackground } from "@/components/main/ambient-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#f8fafc",
};

export const metadata: Metadata = {
  ...siteConfig,
  title: "Daniel — Web Developer & Website Creator",
  description: "I design and build modern digital experiences that look as good as they feel.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "bg-[#f8fafc] text-slate-900 overflow-y-scroll overflow-x-hidden min-h-screen relative antialiased",
          inter.className
        )}
      >
        <AmbientBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
