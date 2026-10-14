import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  GraduationCap,
  Sparkles,
  Smartphone,
  Cpu,
  Layers,
  Gamepad2,
  CheckCircle,
  Award,
  Globe2,
} from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const AboutSection = () => {
  // Live IST Clock (Ahmedabad, India - UTC+5:30)
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setIstTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 bg-slate-50/60 dark:bg-[#0F131D]/40 relative transition-colors duration-200">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-12 sm:mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-sans">
            Who I Am &amp; <span className="font-serif italic font-normal text-gradient text-4xl sm:text-6xl">What I Do</span>.
          </h2>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground leading-relaxed">
            I'm a computer science graduate who loves building practical apps and exploring game mechanics.
          </p>
        </motion.div>

        {/* Bento Grid Layout (Simple English & Sky Blue accents) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: My Story */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="md:col-span-2 lg:col-span-2 rounded-3xl dark:bg-[#111622]/90 bg-white border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-lg dark:shadow-xl backdrop-blur-xl relative overflow-hidden group hover:border-sky-500/30 transition-all"
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-sky-400/40 p-0.5 shadow-sm dark:bg-[#0A0D14] bg-slate-100">
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
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">Kishan Pokal</h3>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-mono">B.Sc Computer Science Graduate (2025)</p>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                I enjoy turning ideas into real, working software. I started by learning core computer science fundamentals in C and C++, and then fell in love with mobile development using <span className="text-slate-900 dark:text-white font-semibold">Kotlin and Jetpack Compose</span> for Android.
              </p>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
                I've shipped a live personal finance app called <span className="text-slate-900 dark:text-white font-semibold">TrackEasy</span> directly to the Google Play Store, work with relational databases like <span className="text-slate-900 dark:text-white font-semibold">PostgreSQL</span>, containerize apps with <span className="text-slate-900 dark:text-white font-semibold">Docker</span>, and created an interactive 3D horror game in <span className="text-slate-900 dark:text-white font-semibold">Unity</span>.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-slate-200 dark:border-white/10">
              {["Android Native", "Kotlin", "Jetpack Compose", "PostgreSQL", "Docker", "Python AI", "Unity 3D"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono border bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Live Location & IST Clock */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="rounded-3xl dark:bg-[#111622]/90 bg-white border border-slate-200/90 dark:border-white/10 p-6 flex flex-col justify-between shadow-lg dark:shadow-xl backdrop-blur-xl hover:border-sky-500/30 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  Live Sync
                </span>
              </div>

              <h4 className="text-base font-bold text-foreground">Ahmedabad, India</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Gujarat • UTC+5:30 (IST)</p>

              <div className="mt-5 p-4 rounded-2xl dark:bg-[#0A0D14] bg-slate-50 border border-slate-200 dark:border-white/5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  <span>My Local Time</span>
                </div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-foreground tracking-wider">
                  {istTime || "Loading..."}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-sky-500" />
              <span>Available for Remote &amp; Full-Time Work</span>
            </p>
          </motion.div>

          {/* Card 3: Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="rounded-3xl dark:bg-[#111622]/90 bg-white border border-slate-200/90 dark:border-white/10 p-6 flex flex-col justify-between shadow-lg dark:shadow-xl backdrop-blur-xl hover:border-sky-500/30 transition-all"
          >
            <div>
              <div className="p-2.5 w-fit rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>

              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Education
              </span>
              <h4 className="text-base font-bold text-foreground mt-1">B.Sc Computer Science</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Gujarat University (Class of 2025)</p>

              <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-500" />
                  <span>Data Structures &amp; Algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-500" />
                  <span>Relational Databases &amp; SQL</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-500" />
                  <span>Operating Systems &amp; Linux</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Graduation</span>
              <span className="font-semibold text-sky-600 dark:text-sky-400 font-mono">2025</span>
            </div>
          </motion.div>

          {/* Card 4: What I Can Help You Build */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="col-span-1 md:col-span-3 lg:col-span-4 rounded-3xl dark:bg-[#111622]/70 bg-white border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 shadow-lg dark:shadow-xl"
          >
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-500" /> What I Can Help You Build
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl dark:bg-[#0A0D14]/80 bg-slate-50 border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-colors">
                <div className="p-2 w-fit rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 mb-3">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Native Android Apps</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Clean Android apps using Kotlin, Jetpack Compose, Room offline database, and Play Store publishing.
                </p>
              </div>

              <div className="p-4 rounded-2xl dark:bg-[#0A0D14]/80 bg-slate-50 border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-colors">
                <div className="p-2 w-fit rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">PostgreSQL &amp; Backend</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Relational database design in PostgreSQL, schema modeling, REST API integrations, and Firebase cloud services.
                </p>
              </div>

              <div className="p-4 rounded-2xl dark:bg-[#0A0D14]/80 bg-slate-50 border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-colors">
                <div className="p-2 w-fit rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Docker &amp; Deployment</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Containerizing apps and environments using Docker, managing dependencies, and streamlining local developer setups.
                </p>
              </div>

              <div className="p-4 rounded-2xl dark:bg-[#0A0D14]/80 bg-slate-50 border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-colors">
                <div className="p-2 w-fit rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 mb-3">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">3D Games &amp; AI</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Unity 3D gameplay, C# scripting, microphone audio mechanics, and fast on-device machine learning in Python.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
