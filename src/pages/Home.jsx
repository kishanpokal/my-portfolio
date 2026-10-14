import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { MyApproach } from "../components/MyApproach";
import { SkillsSection } from "../components/SkillsSection";
import { AboutSection } from "../components/AboutSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { CommandPalette } from "../components/ui/CommandPalette";
import { ScrollProgress } from "../components/effects/ScrollProgress";
import { CursorGlow } from "../components/effects/CursorGlow";

export const Home = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio_theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Listen for Cmd+K / Ctrl+K keyboard shortcuts globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-foreground">
      {/* Global Fixed Film-Grain Noise Texture */}
      <div className="bg-noise-grain" aria-hidden="true" />

      {/* Top Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Desktop Fluid Cursor Glow */}
      <CursorGlow />

      {/* Ambient Mesh Backdrop */}
      <div className="mesh-bg" aria-hidden="true" />

      {/* Floating Island Navigation — Hidden automatically when case study or command palette is open */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        isModalOpen={isCaseStudyOpen || isCommandPaletteOpen}
      />

      {/* Main Flow Sections: 15-Second Executive Sequencing */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Identity & Perspective Hero */}
        <HeroSection />

        {/* 2. Selected Works (Flagship Proof of Work) */}
        <ProjectsSection onModalStateChange={setIsCaseStudyOpen} />

        {/* 3. Methodology & Architecture (Engineering Pipelines) */}
        <MyApproach />

        {/* 4. Tech Stack Bento Grid (4-Domain Architectural Grid) */}
        <SkillsSection />

        {/* 5. Engineering DNA (About & Academic Foundation) */}
        <AboutSection />

        {/* 6. Collaboration (Unified Contact & Inquiry Hub) */}
        <ContactSection />
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Universal Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onToggleTheme={toggleTheme}
        isDark={theme === "dark"}
      />
    </div>
  );
};

export default Home;
