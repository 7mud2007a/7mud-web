import { LogoIntro } from "@/components/main/logo-intro";
import { Hero } from "@/components/main/hero";
import { About } from "@/components/main/about";
import { Services } from "@/components/main/services";
import { Projects } from "@/components/main/projects";
import { Contact } from "@/components/main/contact";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-8 sm:gap-16">
      <LogoIntro />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}
