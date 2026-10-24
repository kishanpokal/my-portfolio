import React, { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { NavbarV2 } from "../components/v2/NavbarV2";
import { HeroV2 } from "../components/v2/HeroV2";
import { ProjectsV2 } from "../components/v2/ProjectsV2";
import { ExperienceV2 } from "../components/v2/ExperienceV2";
import { GitHubV2 } from "../components/v2/GitHubV2";
import { AboutV2 } from "../components/v2/AboutV2";
import { StackV2 } from "../components/v2/StackV2";
import { ContactV2 } from "../components/v2/ContactV2";
import { FooterV2 } from "../components/v2/FooterV2";
import { CozyMusicPlayer } from "../components/v2/CozyMusicPlayer";
import { LandingPreloader } from "../components/v2/LandingPreloader";

export const HomeV2 = () => {
  // Always trigger the preloader on page load
  const [showPreloader, setShowPreloader] = useState(true);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("portfolio_theme_v2") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.body.style.backgroundColor = "#0b0b0b";
      document.body.style.color = "#f2f0ec";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.body.style.backgroundColor = "#f2f0ec";
      document.body.style.color = "#111111";
    }
    localStorage.setItem("portfolio_theme_v2", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleReboot = useCallback(() => {
    setShowPreloader(true);
  }, []);

  // Shared Interactive Tech Stack ⇄ Project Filter State
  const [activeTechFilter, setActiveTechFilter] = useState(null);

  // Top 2px Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 ${
        theme === "dark" ? "v2-dark dark bg-[#0b0b0b] text-[#f2f0ec]" : "v2-light bg-[#f2f0ec] text-[#111111]"
      }`}
    >
      {/* 2px Accent Scroll Progress Bar at the Top */}
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-[2.5px] origin-left bg-[#ff5a1f]"
        style={{ scaleX }}
      />

      {/* Subtle Noise Grain Texture */}
      <div className="bg-noise-grain pointer-events-none fixed inset-0 z-40 opacity-[0.035]" />

      {/* Subtle Ambient Grid Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-grid-subtle mask-radial-hero opacity-60"
      />

      {/* Floating Editorial Header */}
      <NavbarV2 theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content Sections with gentle camera lens focus reveal */}
      <motion.main
        className="relative z-10 flex flex-col"
        initial={{ scale: 1.02, opacity: 0.96 }}
        animate={{
          scale: showPreloader ? 1.02 : 1,
          opacity: 1,
        }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 1. Hero */}
        <HeroV2 />

        {/* 2. Selected Works (Inverted Ink Surface) with Live Tech Filtering */}
        <ProjectsV2
          activeTechFilter={activeTechFilter}
          onSelectTechFilter={setActiveTechFilter}
        />

        {/* 3. Career Milestones & Experience */}
        <ExperienceV2 />

        {/* 4. GitHub & Open Source Activity */}
        <GitHubV2 />

        {/* 5. Education & Background */}
        <AboutV2 />

        {/* 6. Technical Stack Definition Rows with Interactive Cross-Filter */}
        <StackV2
          activeTechFilter={activeTechFilter}
          onSelectTechFilter={setActiveTechFilter}
        />

        {/* 7. Contact & Collaboration */}
        <ContactV2 />
      </motion.main>

      {/* Inverted Editorial Footer */}
      <FooterV2 onReboot={handleReboot} />

      {/* Floating Cozy Background Music Player */}
      <CozyMusicPlayer />

      {/* Human-Crafted Editorial Split-Curtain Preloader */}
      {showPreloader && (
        <LandingPreloader onComplete={() => setShowPreloader(false)} />
      )}
    </div>
  );
};
