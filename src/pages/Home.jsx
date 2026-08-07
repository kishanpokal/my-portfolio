import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { F1ScrollIntro } from "@/components/F1ScrollIntro";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      {/* Scroll + cursor UX layer */}
      <ScrollProgress />
      <CursorGlow />

      {/* Background Effects */}
      {/* StarBackground is now rendered globally in App.jsx */}

      {/* Film-grain overlay for depth */}
      <div className="grain" aria-hidden="true" />

      {/* F1 Scroll-Driven Frame Animation Intro */}
      <F1ScrollIntro />

      {/* Navbar (Bottom) */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 pb-nav">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
