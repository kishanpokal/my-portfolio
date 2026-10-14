import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Smartphone,
  GraduationCap,
  Mail,
  ExternalLink,
  Code2,
  Sparkles,
} from "lucide-react";
import { sound } from "@/lib/SoundEngine";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   UNIFIED DEVELOPER CARD (Single clean card, NO overlapping windows)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DeveloperCard = ({ activeLens }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 90, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), { stiffness: 90, damping: 25 });
  const x = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 90, damping: 25 });
  const y = useSpring(useTransform(mouseY, [-300, 300], [-10, 10]), { stiffness: 90, damping: 25 });

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
      className="relative w-full max-w-[440px] flex items-center justify-center mx-auto"
      style={{ perspective: "1000px" }}
    >
      {/* Subtle Sky Blue Ambient Glow */}
      <div className="absolute inset-0 bg-sky-500/10 blur-[80px] rounded-full pointer-events-none" />

      <motion.div
        style={{ rotateX, rotateY, x, y }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        className="relative z-10 w-full rounded-3xl border border-slate-200/90 dark:border-white/10 dark:bg-[#111622]/95 bg-white backdrop-blur-2xl p-6 sm:p-7 shadow-2xl hover:border-sky-500/30 transition-all"
      >
        {/* Top Window Bar */}
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-sky-400/80" />
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">KishanPokal.kt</span>
        </div>

        {/* Profile Header (Avatar + Name + Status in ONE clear layout) */}
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-sky-400/50 p-0.5 shadow-md dark:bg-[#0A0D14] bg-slate-100 flex-shrink-0">
            <img
              src="/profile-logo.png"
              alt="Kishan Pokal"
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.src = "/profile-logo.svg";
              }}
            />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">Kishan Pokal</h3>
            <p className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400 mt-0.5">
              Android &amp; AI Developer
            </p>
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span>Available for Roles • Ahmedabad, IN</span>
            </div>
          </div>
        </div>

        {/* Clean Kotlin Data Class (No overlapping window!) */}
        <div className="p-4 rounded-2xl dark:bg-[#0A0D14] bg-slate-900 border border-slate-800 dark:border-white/5 font-mono text-[11px] leading-relaxed text-slate-300">
          <div>
            <span className="text-sky-400 font-semibold">data class</span>{" "}
            <span className="text-white font-semibold">Developer</span>(
          </div>
          <div className="pl-3 text-slate-400">
            name = <span className="text-sky-300">"Kishan Pokal"</span>,
          </div>
          <div className="pl-3 text-slate-400">
            degree = <span className="text-sky-300">"B.Sc Computer Science"</span>,
          </div>
          <div className="pl-3 text-slate-400">
            focus = <span className="text-sky-300">"Android + PostgreSQL + Docker"</span>,
          </div>
          <div className="pl-3 text-slate-400">
            playStoreApp = <span className="text-sky-400 font-semibold">"TrackEasy"</span>
          </div>
          <div>)</div>
        </div>

        {/* Dynamic Proof Badges Based on Active Lens */}
        <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-slate-200 dark:border-white/5">
          {activeLens === "engineer" && (
            <>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                Kotlin
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                Jetpack Compose
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                PostgreSQL
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                Docker
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                Python AI
              </span>
            </>
          )}

          {activeLens === "recruiter" && (
            <>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-400 border border-sky-500/30">
                Google Play Publisher
              </span>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                B.Sc CS (2025)
              </span>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                8+ Shipped Builds
              </span>
            </>
          )}

          {activeLens === "creator" && (
            <>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-400 border border-sky-500/30">
                Maunam: Horror Game
              </span>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                Unity Engine
              </span>
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                Mic Sound Detection
              </span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO SECTION (Clear, Simple English, No 3D Link)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const HeroSection = () => {
  const [activeLens, setActiveLens] = useState("engineer"); // "engineer" | "recruiter" | "creator"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const lensData = {
    engineer: {
      heading: "Building clean Android apps & intelligent systems.",
      sub: "I'm a software developer specialized in Kotlin and Jetpack Compose for Android, machine learning with Python, and interactive mobile experiences.",
    },
    recruiter: {
      heading: "Reliable developer for mobile & software projects.",
      sub: "Computer Science graduate (2025) with a live production app published on the Google Play Store. Ready to contribute immediately to engineering teams.",
    },
    creator: {
      heading: "Creating 3D mobile games with sound mechanics.",
      sub: "Developer of 'Maunam: The Silent God' — a 3D horror game in Unity where making noise into your phone microphone alerts in-game monsters.",
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Upgraded Hero Background: Deep Radial Spotlight & Soft Ambient Dots */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft Center-Top Spotlight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-b from-sky-500/12 via-sky-500/5 to-transparent blur-[90px] rounded-full" />
        {/* Subtle dot matrix with radial fade */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-60"
          style={{
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Text Column */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Perspective Selector (Simple English) */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center p-1 rounded-full dark:bg-[#111622]/90 bg-white border border-slate-200 dark:border-white/10 backdrop-blur-md mb-6 shadow-sm flex-wrap justify-center"
            >
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 hidden sm:inline">
                View Mode:
              </span>
              {[
                { id: "engineer", label: "⚡ Developer" },
                { id: "recruiter", label: "👔 Recruiter" },
                { id: "creator", label: "🎮 Game Creator" },
              ].map((lens) => (
                <button
                  key={lens.id}
                  onClick={() => {
                    sound.click();
                    setActiveLens(lens.id);
                  }}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    activeLens === lens.id
                      ? "text-[#0A0D14] font-bold shadow-md"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {activeLens === lens.id && (
                    <motion.div
                      layoutId="active-lens-pill"
                      className="absolute inset-0 bg-sky-400 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{lens.label}</span>
                </button>
              ))}
            </motion.div>

            {/* Dynamic Headline in Plain Simple English */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLens}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-[1.18] tracking-tight mb-4 font-sans">
                  {activeLens === "engineer" && (
                    <>
                      Building Clean{" "}
                      <span className="font-serif italic font-normal text-gradient text-4xl sm:text-6xl md:text-7xl">
                        Android Apps
                      </span>{" "}
                      &amp; Systems.
                    </>
                  )}
                  {activeLens === "recruiter" && (
                    <>
                      Proven Results in{" "}
                      <span className="font-serif italic font-normal text-gradient text-4xl sm:text-6xl md:text-7xl">
                        Software &amp; Android
                      </span>{" "}
                      Engineering.
                    </>
                  )}
                  {activeLens === "creator" && (
                    <>
                      Creating 3D{" "}
                      <span className="font-serif italic font-normal text-gradient text-4xl sm:text-6xl md:text-7xl">
                        Mobile Horror Games
                      </span>{" "}
                      in Unity.
                    </>
                  )}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                  {lensData[activeLens].sub}
                </p>

                {/* Recruiter Quick Proof Bar */}
                {activeLens === "recruiter" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-3.5 rounded-2xl dark:bg-[#111622]/90 bg-white border border-sky-500/30 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <GraduationCap className="w-4 h-4 text-sky-500 flex-shrink-0" />
                      <span>B.Sc Computer Science (2025)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="/Kishan_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/15 text-sky-700 dark:text-sky-400 hover:bg-sky-500/25 border border-sky-500/30 font-semibold transition-all"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Resume (PDF) ↗</span>
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.kishan.trackeasy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-semibold transition-all"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-sky-500" />
                        <span>Play Store ↗</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Call To Action Buttons (Clean & Direct) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3.5 justify-center lg:justify-start flex-wrap mb-10"
            >
              {/* Primary: View Projects */}
              <a
                href="#projects"
                onClick={() => sound.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-sky-400 hover:bg-sky-300 text-[#0A0D14] font-bold text-sm shadow-lg shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Secondary: Download Resume */}
              <a
                href="/Kishan_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full dark:bg-[#111622] bg-white hover:bg-slate-100 dark:hover:bg-[#161D2D] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-semibold text-sm hover:border-sky-500/40 hover:scale-105 active:scale-95 transition-all shadow-md group"
              >
                <FileText className="w-4 h-4 text-sky-500" />
                <span>Download Resume</span>
              </a>

              {/* Direct Email link */}
              <a
                href="#contact"
                onClick={() => sound.click()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-200 dark:hover:border-white/10 text-sm font-medium transition-all"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Proof Metrics (Simple & Concrete) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-slate-200 dark:border-white/10 max-w-lg mx-auto lg:mx-0"
            >
              {/* Metric 1 */}
              <a
                href="https://play.google.com/store/apps/details?id=com.kishan.trackeasy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="group block text-left"
              >
                <div className="flex items-center gap-1 text-sky-400">
                  <p className="text-xl sm:text-2xl font-extrabold tracking-tight group-hover:underline">
                    Google Play
                  </p>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </div>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  Published Production App
                </p>
              </a>

              {/* Metric 2 */}
              <div className="text-left">
                <p className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  Android &amp; AI
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  Fast On-Device Models
                </p>
              </div>

              {/* Metric 3 */}
              <div className="text-left">
                <p className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                  8+ Projects
                </p>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">
                  Apps, Web &amp; Games Built
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Stage (ONE Unified Card, NO overlapping windows!) */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            <DeveloperCard activeLens={activeLens} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator pointing to #projects */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block">
        <a
          href="#projects"
          onClick={() => sound.click()}
          className="flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-sky-400 transition-colors"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">View Projects</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-sky-400" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;