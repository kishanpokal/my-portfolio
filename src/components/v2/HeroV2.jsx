import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Smartphone, FileText, Clock } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const HeroV2 = () => {
  const [localTime, setLocalTime] = useState("");

  // Live IST Time Clock (Ahmedabad, IN)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const lineVariants = {
    hidden: { y: "110%" },
    visible: (custom) => ({
      y: "0%",
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay: custom * 0.12,
      },
    }),
  };

  return (
    <section id="top" className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-32 md:px-10 md:pb-28 md:pt-40">
      {/* Top Metadata & Availability Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#11111118] dark:border-white/10 pb-6">
        <div className="flex items-center gap-2 label-mono text-[#5a5a54] dark:text-muted-foreground font-medium">
          <Clock className="w-3.5 h-3.5 text-[#ff5a1f]" />
          <span>Ahmedabad, IN {localTime ? `• ${localTime} IST` : ""}</span>
        </div>

        <p className="label-mono flex items-center gap-2 rounded-full border border-[#11111114] dark:border-white/10 bg-white/80 dark:bg-secondary/50 px-3 py-1 text-xs text-[#111111] dark:text-foreground shadow-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
          </span>
          <span>Available for Android &amp; AI roles</span>
        </p>
      </div>

      {/* Kinetic Masked Headline in Minecraft Pixel Typography */}
      <h1 className="headline-minecraft mt-8 text-[9vw] uppercase leading-[1.05] tracking-tight text-[#111111] dark:text-white md:mt-12 md:text-[clamp(38px,5.6vw,84px)]">
        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="block"
          >
            I build Android
          </motion.span>
        </span>

        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="block"
          >
            apps &amp; intelligent
          </motion.span>
        </span>

        <span className="block overflow-hidden pb-[0.06em]">
          <motion.span
            custom={2}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="block"
          >
            systems<span className="text-[#ff5a1f]">.</span>
          </motion.span>
        </span>
      </h1>

      {/* Two-Column Editorial Intro & Actions */}
      <div className="mt-12 grid gap-10 md:grid-cols-12 md:items-start lg:mt-16">
        {/* Left Column: Quick Credibility Tags & Profile Pill */}
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3.5 rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-secondary/80 p-3 shadow-xs">
            <div className="h-12 w-12 rounded-xl overflow-hidden border border-[#11111114] dark:border-white/10 bg-slate-100 dark:bg-secondary/80 p-0.5 shadow-xs shrink-0">
              <img
                src="/profile-logo.png"
                alt="Kishan Pokal"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/profile-logo.svg";
                }}
              />
            </div>
            <div>
              <p className="headline text-base uppercase font-bold text-[#111111] dark:text-foreground">
                Kishan Pokal
              </p>
              <p className="label-mono text-[10px] text-[#5a5a54] dark:text-muted-foreground font-semibold">
                Android &amp; AI Developer
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="label-mono text-[#71716b] dark:text-muted-foreground text-[10px]">Academic &amp; Build Highlights</p>
            <div className="flex flex-wrap gap-2">
              <span className="label-mono rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-secondary/50 px-2.5 py-1 text-[10px] text-[#111111] dark:text-foreground font-semibold shadow-xs">
                Google Play Publisher
              </span>
              <span className="label-mono rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-secondary/50 px-2.5 py-1 text-[10px] text-[#111111] dark:text-foreground font-semibold shadow-xs">
                Master in CS '27 (B.Sc '25)
              </span>
              <span className="label-mono rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-secondary/50 px-2.5 py-1 text-[10px] text-[#111111] dark:text-foreground font-semibold shadow-xs">
                Kotlin &amp; Jetpack Compose
              </span>
              <span className="label-mono rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-secondary/50 px-2.5 py-1 text-[10px] text-[#111111] dark:text-foreground font-semibold shadow-xs">
                PyTorch &amp; Python ML
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Action Buttons */}
        <div className="md:col-span-7 space-y-6">
          <p className="text-base sm:text-lg leading-relaxed text-[#1a1a18] dark:text-foreground/90 font-normal">
            I&#x27;m a software developer focused on building high-performance native Android applications with <span className="text-[#111111] dark:text-white font-semibold">Kotlin &amp; Jetpack Compose</span>, production machine learning workflows, and interactive experiences. Creator of <span className="text-[#ff5a1f] font-semibold">TrackEasy</span> (published on Google Play) and <span className="text-[#ff5a1f] font-semibold">Maunam</span>.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              onClick={() => sound.click()}
              className="label-mono inline-flex items-center gap-2 rounded-sm bg-[#111111] dark:bg-foreground px-5 py-3 font-bold text-[#f2f0ec] dark:text-background transition-colors duration-200 hover:bg-[#ff5a1f] hover:text-black shadow-sm"
            >
              <span>Selected Works</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.kishan.trackeasy"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="label-mono inline-flex items-center gap-2 rounded-sm border border-[#11111124] dark:border-white/10 bg-white dark:bg-background px-4 py-3 text-[#111111] dark:text-foreground font-semibold transition-colors duration-200 hover:border-[#ff5a1f] hover:text-[#ff5a1f] shadow-xs"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>TrackEasy on Play Store</span>
              <span className="text-[10px]">↗</span>
            </a>

            <a
              href="/Kishan_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="label-mono inline-flex items-center gap-2 rounded-sm border border-[#11111124] dark:border-white/10 bg-white dark:bg-background px-4 py-3 text-[#5a5a54] dark:text-muted-foreground font-semibold transition-colors duration-200 hover:border-black hover:text-[#111111] shadow-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
