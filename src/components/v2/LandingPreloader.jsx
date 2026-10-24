import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
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

    // At 4600ms: reveal the giant name across the equator
    const nameTimer = setTimeout(() => {
      setShowNameTitle(true);
      sound.kernelTick(720);
    }, 4600);

    // At 5100ms: trigger the split shutter launch
    const exitTimer = setTimeout(() => {
      hasFinishedRef.current = true;
      sound.kernelComplete();
      triggerShutterExit();
    }, 5100);

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
    // Duration matches the cubic-bezier split transition
    setTimeout(() => {
      onComplete?.();
    }, 1100);
  }, [isExiting, onComplete]);

  // Keyboard shortcut bypass [ESC / Space / Enter]
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.code === "Space") {
        e.preventDefault();
        sound.click();
        triggerShutterExit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [triggerShutterExit]);

  const toggleSound = (e) => {
    e.stopPropagation();
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
          TOP CURTAIN PANEL (Slides Up with Elastic Ease)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-[#0c0d10] z-20 flex flex-col justify-between overflow-hidden"
        initial={{ y: "0%" }}
        animate={{ y: isExiting ? "-102%" : "0%" }}
        transition={{
          duration: 1.05,
          ease: [0.83, 0, 0.17, 1], // Studio-grade luxury easing
        }}
      >
        {/* Subtle noise grain */}
        <div className="bg-noise-grain pointer-events-none absolute inset-0 opacity-[0.035]" />

        {/* Top Header: Normal Clean Bold Typography (Readable & High Contrast) */}
        <div className="relative z-30 mx-auto w-full max-w-[1280px] px-5 sm:px-8 md:px-10 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="headline text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#f2f0ec]">
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

        {/* Top Half of the Giant Editorial Split Monogram */}
        {/* Only appears after greetings finish so they never clash */}
        <div className="relative z-20 flex-1 flex items-end justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{
              opacity: showNameTitle ? 1 : 0,
              scale: showNameTitle ? 1 : 0.98,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="translate-y-1/2 flex items-center justify-center px-4 w-full text-center"
          >
            <span className="headline text-[clamp(2.75rem,8.5vw,8.5rem)] font-bold tracking-tight text-[#f2f0ec] uppercase whitespace-nowrap select-none leading-none">
              Kishan Pokal<span className="text-[#ff5a1f]">.</span>
            </span>
          </motion.div>
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
          CENTRAL GREETING OVERLAY (6 Languages: English, Hindi,
          Spanish, Japanese, French, Gujarati)
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white flex items-center gap-1.5"
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
                <span className="label-mono text-[10px] sm:text-xs text-[#8a8a85] tracking-widest uppercase">
                  {GREETINGS[greetingIndex].lang}
                </span>
                <span className="text-white/20 text-xs">•</span>
                <span className="label-mono text-[10px] text-[#ff5a1f] tracking-widest uppercase">
                  {GREETINGS[greetingIndex].code}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RAZOR SPLIT SEAM FILAMENT (Center Seam Line)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-[#ff5a1f] shadow-[0_0_15px_#ff5a1f] z-30 pointer-events-none"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: isExiting ? 1.5 : [0.2, 0.8, 0.4],
          opacity: isExiting ? [1, 0] : [0.2, 0.8, 0.2],
        }}
        transition={{
          scaleX: isExiting ? { duration: 0.7 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
          opacity: isExiting ? { duration: 0.6 } : { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BOTTOM CURTAIN PANEL (Slides Down with Elastic Ease)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0c0d10] z-20 flex flex-col justify-between overflow-hidden"
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

        {/* Bottom Half of the Giant Editorial Split Monogram */}
        {/* Only appears after greetings finish so they never clash */}
        <div className="relative z-20 flex-1 flex items-start justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{
              opacity: showNameTitle ? 1 : 0,
              scale: showNameTitle ? 1 : 0.98,
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="-translate-y-1/2 flex items-center justify-center px-4 w-full text-center"
          >
            <span className="headline text-[clamp(2.75rem,8.5vw,8.5rem)] font-bold tracking-tight text-[#f2f0ec] uppercase whitespace-nowrap select-none leading-none">
              Kishan Pokal<span className="text-[#ff5a1f]">.</span>
            </span>
          </motion.div>
        </div>

        {/* Bottom Metadata Bar: No Numbers/Counters, Clean Editorial Status Badges */}
        <div className="relative z-30 mx-auto w-full max-w-[1280px] px-5 sm:px-8 md:px-10 pb-6 flex items-end justify-between">
          <div className="flex flex-col gap-1 text-[11px] label-mono text-[#8a8a85]">
            <span className="text-[#f2f0ec]/90 font-medium">Ahmedabad, India</span>
            <span>{localTime ? `${localTime} IST` : "23.02° N, 72.57° E"}</span>
          </div>

          {/* Replaced Counter with Refined Creative Status Pill */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
            </span>
            <span className="label-mono text-[11px] text-[#f2f0ec] font-semibold tracking-wider">
              Android &amp; AI Engineer
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPreloader;
