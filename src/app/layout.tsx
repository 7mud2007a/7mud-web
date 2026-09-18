import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "7mud — Ultra-Luxury Web Developer & Digital Agency (@DanielXdev)",
  description:
    "Ultra-luxury web application development, HyperOS liquid glassmorphism, and engineering performance by Daniel (@DanielXdev).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-slate-50 dark:bg-[#08080a] text-slate-900 dark:text-slate-100 antialiased font-sans selection:bg-purple-500/30">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
