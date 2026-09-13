import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <section id="hero" className="relative flex flex-col justify-center items-center min-h-screen pt-28 pb-16 px-4 md:px-8 max-w-6xl mx-auto overflow-hidden">
      <HeroContent />
    </section>
  );
};
