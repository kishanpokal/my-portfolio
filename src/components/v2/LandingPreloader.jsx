import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

// 6 Top World & Native Languages Requested by Kishan
const GREETINGS = [
  { text: "Hello", lang: "English", code: "EN" },
  { text: "नमस्ते", lang: "Hindi", code: "HI" },
  { text: "Hola", lang: "Spanish", code: "ES" },
  { text: "こんにちは", lang: "Japanese", code: "JA" },
  { text: "Bonjour", lang: "French", code: "FR" },
  { text: "નમસ્તે", lang: "Gujarati", code: "GU" },
];

export const LandingPreloader = ({ onComplete }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [showNameTitle, setShowNameTitle] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => sound.isEnabled());
  const [localTime, setLocalTime] = useState("");
  const hasFinishedRef = useRef(false);

  // Live IST Time in Ahmedabad, India
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 5-Second Greeting Cycle across the 6 Languages (~750ms each)
  useEffect(() => {
    const intervalTime = 750; // 750ms * 6 greetings = 4500ms
    const greetingTimer = setInterval(() => {
      setGreetingIndex((prev) => {
        if (prev < GREETINGS.length - 1) {
          sound.kernelTick(480 + (prev + 1) * 35);
          return prev + 1;
        } else {
          clearInterval(greetingTimer);
          return prev;
        }
      });
    }, intervalTime);

    // At 4600ms: greetings are done. Reveal the center Minecraft name & laser line
    const nameTimer = setTimeout(() => {
      setShowNameTitle(true);
      sound.kernelTick(720);
    }, 4600);

    // At 5150ms: trigger the split shutter launch
    const exitTimer = setTimeout(() => {
      hasFinishedRef.current = true;
      sound.kernelComplete();
      triggerShutterExit();
    }, 5150);

    return () => {
      clearInterval(greetingTimer);
      clearTimeout(nameTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  // Trigger organic shutter opening
  const triggerShutterExit = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio-user-gesture"));
    }
    setTimeout(() => {
      onComplete?.();
    }, 1100);
  }, [isExiting, onComplete]);

  // Keyboard shortcut bypass [ESC / Space / Enter]
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.code === "Space") {
        e.preventDefault();
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("portfolio-user-gesture"));
        }
        sound.click();
        triggerShutterExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerShutterExit]);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("portfolio-user-gesture"));
    }
    const active = sound.toggle();
    setSoundEnabled(active);
  };

  return (
    <div
      onClick={triggerShutterExit}
      className="fixed inset-0 z-[9999] overflow-hidden select-none cursor-pointer"
      title="Click or press ESC to enter"
      aria-label="Portfolio Introduction"
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TOP CURTAIN PANEL (Exact 50vh, Slides Up on Exit)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0c0d10] z-20 overflow-hidden"
        initial={{ y: "0%" }}
        animate={{ y: isExiting ? "-102%" : "0%" }}
        transition={{
          duration: 1.05,
          ease: [0.83, 0, 0.17, 1], // Studio-grade luxury easing
        }}
      >
        {/* Subtle noise grain */}
        <div className="bg-noise-grain pointer-events-none absolute inset-0 opacity-[0.035]" />

        {/* Top Header: Normal Clean Standard Typography (NOT Minecraft — Perfectly Readable) */}
        <div className="absolute top-0 inset-x-0 z-30 mx-auto w-full max-w-[1280px] px-5 sm:px-8 md:px-10 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-sans text-sm sm:text-base font-bold tracking-tight text-[#f2f0ec]">
              Kishan Pokal<span className="text-[#ff5a1f]">.</span>
            </span>
            <span className="label-mono hidden sm:inline-block text-[11px] text-[#8a8a85] border-l border-white/15 pl-3">
              Portfolio &amp; Selected Works '26
            </span>
          </div>

          <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="label-mono flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] text-[#f2f0ec] hover:border-[#ff5a1f] hover:text-[#ff5a1f] transition-colors"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3 h-3 text-[#ff5a1f]" />
                  <span className="hidden sm:inline">Sound On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-[#8a8a85]" />
                  <span className="hidden sm:inline">Sound Off</span>
                </>
              )}
            </button>

            {/* Skip Pill */}
            <button
              onClick={triggerShutterExit}
              type="button"
              className="label-mono group flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] text-[#8a8a85] hover:border-white hover:text-white transition-colors"
            >
              <span>Skip</span>
              <span className="text-[9px] text-[#8a8a85] group-hover:text-white">[ESC]</span>
            </button>
          </div>
        </div>

        {/* Top Half of the MINECRAFT Split Name */}
        {/* Pinned strictly to bottom edge (50vh) with guaranteed inline transform for pixel-perfect waist cut */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ transform: "translateY(calc(50% - 6px))" }}
        >
          <div
            className={`transition-opacity duration-200 ${
              showNameTitle ? "opacity-100" : "opacity-0"
            } flex items-center justify-center px-4 w-full text-center`}
          >
            <span className="headline-minecraft text-[clamp(2.4rem,7.5vw,7.2rem)] font-normal tracking-tight text-[#f2f0ec] uppercase whitespace-nowrap select-none leading-none">
              Kishan Pokal<span className="text-[#ff5a1f]">.</span>
            </span>
          </div>
        </div>

        {/* SVG Elastic Tension Curve (Bottom Lip of Top Curtain) */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute -bottom-12 sm:-bottom-20 left-0 w-full h-12 sm:h-20 fill-[#0c0d10] pointer-events-none z-30"
        >
          <motion.path
            initial={{ d: "M 0 0 Q 720 0 1440 0 L 1440 0 L 0 0 Z" }}
            animate={{
              d: isExiting
                ? "M 0 0 Q 720 120 1440 0 L 1440 0 L 0 0 Z"
                : "M 0 0 Q 720 0 1440 0 L 1440 0 L 0 0 Z",
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
          />
        </svg>
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CENTRAL GREETING OVERLAY (Clean — ZERO HORIZONTAL LINE)
          Languages: English, Hindi, Spanish, Japanese, French, Gujarati
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <AnimatePresence>
        {!showNameTitle && !isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-40 pointer-events-none flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5a1f] animate-ping" />
                <motion.h2
                  key={greetingIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white flex items-center gap-2"
                >
                  <span>{GREETINGS[greetingIndex].text}</span>
                  <span className="text-[#ff5a1f]">.</span>
                </motion.h2>
              </div>

              <motion.div
                key={`lang-${greetingIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3.5 flex items-center gap-2"
              >
                <span className="label-mono text-[10px] sm:text-xs text-[#8a8a85] tracking-widest uppercase font-medium">
                  {GREETINGS[greetingIndex].lang}
                </span>
                <span className="text-white/20 text-xs">•</span>
                <span className="label-mono text-[10px] text-[#ff5a1f] tracking-widest uppercase font-semibold">
                  {GREETINGS[greetingIndex].code}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RAZOR SPLIT SEAM LINE (At Exact 50vh)
          ONLY appears when the Minecraft name appears for the split!
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {showNameTitle && (
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#ff5a1f] shadow-[0_0_20px_#ff5a1f] z-30 pointer-events-none"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isExiting ? 1.4 : 1,
            opacity: isExiting ? [1, 0] : 1,
          }}
          transition={{
            scaleX: { duration: 0.45, ease: "easeOut" },
            opacity: isExiting ? { duration: 0.6 } : { duration: 0.25 },
          }}
        />
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BOTTOM CURTAIN PANEL (Exact 50vh, Slides Down on Exit)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0c0d10] z-20 overflow-hidden"
        initial={{ y: "0%" }}
        animate={{ y: isExiting ? "102%" : "0%" }}
        transition={{
          duration: 1.05,
          ease: [0.83, 0, 0.17, 1],
        }}
      >
        {/* Subtle noise grain */}
        <div className="bg-noise-grain pointer-events-none absolute inset-0 opacity-[0.035]" />

        {/* SVG Elastic Tension Curve (Top Lip of Bottom Curtain) */}
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="absolute -top-12 sm:-top-20 left-0 w-full h-12 sm:h-20 fill-[#0c0d10] pointer-events-none z-30 rotate-180"
        >
          <motion.path
            initial={{ d: "M 0 0 Q 720 0 1440 0 L 1440 0 L 0 0 Z" }}
            animate={{
              d: isExiting
                ? "M 0 0 Q 720 120 1440 0 L 1440 0 L 0 0 Z"
                : "M 0 0 Q 720 0 1440 0 L 1440 0 L 0 0 Z",
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
          />
        </svg>

        {/* Bottom Half of the MINECRAFT Split Name */}
        {/* Pinned strictly to top edge (50vh) with matching inline transform */}
        <div
          className="absolute inset-x-0 top-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ transform: "translateY(calc(-50% - 6px))" }}
        >
          <div
            className={`transition-opacity duration-200 ${
              showNameTitle ? "opacity-100" : "opacity-0"
            } flex items-center justify-center px-4 w-full text-center`}
          >
            <span className="headline-minecraft text-[clamp(2.4rem,7.5vw,7.2rem)] font-normal tracking-tight text-[#f2f0ec] uppercase whitespace-nowrap select-none leading-none">
              Kishan Pokal<span className="text-[#ff5a1f]">.</span>
            </span>
          </div>
        </div>

        {/* Bottom Metadata Bar: Clean Editorial Status Badges (Pinned to Bottom) */}
        <div className="absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[1280px] px-5 sm:px-8 md:px-10 pb-6 flex items-end justify-between">
          <div className="flex flex-col gap-1 text-[11px] label-mono text-[#8a8a85]">
            <span className="text-[#f2f0ec]/90 font-medium">Ahmedabad, India</span>
            <span>{localTime ? `${localTime} IST` : "23.02° N, 72.57° E"}</span>
          </div>

          {/* Refined Creative Status Pill */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
            </span>
            <span className="label-mono text-[11px] text-[#f2f0ec] font-semibold tracking-wider">
              Android &amp; Software Engineer
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPreloader;
