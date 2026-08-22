import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Mail,
  Box,
  ExternalLink,
} from "lucide-react";
import { sound } from "@/lib/SoundEngine";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3D HERO INTERACTIVE STAGE (60-30-10 Design)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const InteractiveHeroCard = ({ activeLens }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 80, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 80, damping: 22 });
  const x = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 80, damping: 22 });
  const y = useSpring(useTransform(mouseY, [-300, 300], [-15, 15]), { stiffness: 80, damping: 22 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[420px] aspect-square flex items-center justify-center mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* 10% Ambient lighting glow */}
      <div className="absolute inset-0 bg-primary/12 blur-[90px] rounded-full pointer-events-none" />

      <motion.div
        style={{ rotateX, rotateY, x, y }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Main Floating Profile Card (30% Secondary Card Structure) */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          className="relative z-10 w-[290px] sm:w-[320px] rounded-3xl border border-border bg-card/95 backdrop-blur-2xl p-6 shadow-2xl flex flex-col items-center gap-4"
        >
          {/* Avatar with real photo & 10% Accent Rim */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-primary/50 p-1 relative shadow-md bg-secondary">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 rounded-full animate-spin-slow opacity-40" />
            <div className="w-full h-full rounded-full bg-card overflow-hidden relative z-10 flex items-center justify-center">
              <img
                src="/profile-logo.png"
                alt="Kishan Pokal"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/profile-logo.svg";
                }}
              />
            </div>
          </div>

          <div className="text-center w-full">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Kishan Pokal</h3>
            <p className="text-xs sm:text-sm font-semibold text-primary">
              AI/ML & Android Engineer
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent my-0.5" />

          {/* Dynamic Lens Tags */}
          <div className="flex gap-1.5 justify-center w-full flex-wrap">
            {activeLens === "recruiter" && (
              <>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/30">
                  B.Sc CS (2025)
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border">
                  8+ Shipped Projects
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border">
                  Play Store Dev
                </span>
              </>
            )}

            {activeLens === "engineer" && (
              <>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/30">
                  Kotlin / Jetpack
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border">
                  Python & TensorFlow
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border">
                  React & Full-Stack
                </span>
              </>
            )}

            {activeLens === "creator" && (
              <>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/30">
                  Unity 3D Engine
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border">
                  Audio Mic Acoustics
                </span>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border">
                  Interactive Design
                </span>
              </>
            )}
          </div>

          {/* Floating Status Pill */}
          <div className="w-full flex items-center justify-between pt-1 text-[11px] text-muted-foreground border-t border-border/50">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for work
            </span>
            <span className="font-mono text-[10px]">Ahmedabad, IN</span>
          </div>
        </motion.div>

        {/* Floating Mini Code Snippet Pill (Desktop Only) */}
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -4, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
          className="hidden sm:block absolute -top-4 -right-6 lg:-right-10 w-[210px] rounded-xl border border-border bg-card/95 backdrop-blur-xl p-3 shadow-xl z-20"
        >
          <div className="flex gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-primary/80" />
            <div className="w-2 h-2 rounded-full bg-muted" />
            <div className="w-2 h-2 rounded-full bg-border" />
          </div>
          <div className="space-y-1 font-mono text-[10px] leading-relaxed text-muted-foreground">
            <p>
              <span className="text-primary font-semibold">val</span> developer = {"{"}
            </p>
            <p className="pl-3">name: <span className="text-foreground">'Kishan'</span>,</p>
            <p className="pl-3">stack: <span className="text-foreground">'AI + Mobile'</span>,</p>
            <p className="pl-3">available: <span className="text-primary">true</span></p>
            <p>{"}"}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const HeroSection = () => {
  const [activeLens, setActiveLens] = useState("engineer"); // "recruiter" | "engineer" | "creator"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const lensData = {
    recruiter: {
      heading: "Building reliable software that scales.",
      sub: "B.Sc Computer Science graduate with proven experience delivering production-grade Android apps to the Google Play Store and full-stack solutions.",
    },
    engineer: {
      heading: "Architecting intelligent systems & native mobile experiences.",
      sub: "Specializing in Kotlin & Jetpack Compose for Android, Python & TensorFlow for Machine Learning, and modern reactive full-stack web platforms.",
    },
    creator: {
      heading: "Crafting next-gen 3D horror games & interactive tech.",
      sub: "Creator of 'Maunam: The Silent God', implementing real-time microphone acoustics and advanced interactive gameplay in Unity Engine.",
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 bg-grid-pattern overflow-hidden"
    >
      <div className="container max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Text Column */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Perspective Lens Selector */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center p-1 rounded-full bg-secondary/80 border border-border backdrop-blur-md mb-6 shadow-sm flex-wrap justify-center"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2.5 hidden sm:inline">
                Perspective:
              </span>
              {[
                { id: "engineer", label: "⚡ Engineer" },
                { id: "recruiter", label: "👔 Recruiter" },
                { id: "creator", label: "🎨 Creator" },
              ].map((lens) => (
                <button
                  key={lens.id}
                  onClick={() => {
                    sound.click();
                    setActiveLens(lens.id);
                  }}
                  className={`relative px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                    activeLens === lens.id
                      ? "text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeLens === lens.id && (
                    <motion.div
                      layoutId="active-lens-pill"
                      className="absolute inset-0 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{lens.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Dynamic Animated Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLens}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-[1.1] tracking-tight mb-4">
                  {activeLens === "engineer" && (
                    <>
                      Architecting{" "}
                      <span className="text-gradient">Intelligent Systems</span> & Native Apps.
                    </>
                  )}
                  {activeLens === "recruiter" && (
                    <>
                      Proven Results in{" "}
                      <span className="text-gradient">AI Engineering</span> & App Delivery.
                    </>
                  )}
                  {activeLens === "creator" && (
                    <>
                      Crafting Next-Gen{" "}
                      <span className="text-gradient">3D Horror Games</span> & Mechanics.
                    </>
                  )}
                </h1>

                <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  {lensData[activeLens].sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Call To Action Buttons (60-30-10 Accent Execution) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start flex-wrap"
            >
              {/* Primary Work Button (10% Accent) */}
              <a
                href="#projects"
                onClick={() => sound.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:opacity-95 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* 3D Interactive Portfolio Button (Clean Attractive Link) */}
              <a
                href="https://kishanpokal-3d.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-semibold text-sm hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                <Box className="w-4 h-4 text-primary animate-pulse" />
                <span>Launch 3D Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              {/* Contact Button */}
              <a
                href="#contact"
                onClick={() => sound.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </motion.div>

            {/* Live Metrics Ticker */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-10 mt-10 border-t border-border/60 max-w-lg mx-auto lg:mx-0"
            >
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">8+</p>
                <p className="text-xs text-muted-foreground font-medium">Shipped Projects</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">10+</p>
                <p className="text-xs text-muted-foreground font-medium">Core Tech Stacks</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground font-medium">Passion & Quality</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Interactive 3D Stage */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <InteractiveHeroCard activeLens={activeLens} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block">
        <a
          href="#about"
          onClick={() => sound.click()}
          className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll Down</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;