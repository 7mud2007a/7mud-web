import { Hero } from "@/components/main/hero";
import { About } from "@/components/main/about";
import { Services } from "@/components/main/services";
import { Projects } from "@/components/main/projects";
import { Contact } from "@/components/main/contact";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col gap-12 sm:gap-20">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </main>
  );
}
