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
  // Live IST Clock (Ahmedabad, India)
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-14 sm:mb-20 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering DNA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            The story behind the code.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            A software engineer who merges computer science fundamentals with modern Android frameworks, machine learning models, and interactive experiences.
          </p>
        </motion.div>

        {/* Bento Grid Layout (30% Secondary Card Containers + 10% Accents) */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Bento Card 1: Main Story Bio (Spans 2 cols, 2 rows on lg) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="md:col-span-2 lg:col-span-2 rounded-3xl bg-card border border-border p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-border-hover transition-all"
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40 p-0.5 shadow-sm bg-secondary">
                  <img
                    src="/profile-logo.png"
                    alt="Kishan Pokal"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = "/profile-logo.svg";
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">Kishan Pokal</h3>
                  <p className="text-xs text-muted-foreground font-mono">Gujarat University Graduate (2025)</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                My software journey began with deep curiosity about how intelligent systems function under the hood. From low-level algorithmic logic in C/C++ to building production-ready Android apps in <span className="text-foreground font-semibold">Kotlin & Jetpack Compose</span>, I focus on crafting software that feels effortless for users.
              </p>

              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Whether deploying apps to the Google Play Store, training neural networks with <span className="text-foreground font-semibold">Python & TensorFlow</span>, or designing microphone-based acoustic mechanics for horror games in <span className="text-foreground font-semibold">Unity Engine</span>, my work is driven by technical precision and thoughtful UX.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-border/60">
              {["Android Native", "AI & ML", "Game Dev", "Full-Stack Web", "Clean Architecture"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-secondary text-foreground text-xs font-medium border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bento Card 2: Live Location & IST Clock */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="rounded-3xl bg-card border border-border p-6 flex flex-col justify-between shadow-sm hover:border-border-hover transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Online
                </span>
              </div>

              <h4 className="text-base font-bold text-foreground">Ahmedabad, India</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Gujarat • UTC+5:30 (IST)</p>

              <div className="mt-5 p-3.5 rounded-2xl bg-secondary/80 border border-border/80 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Local Time</span>
                </div>
                <p className="text-xl sm:text-2xl font-mono font-bold text-foreground tracking-wider">
                  {istTime || "Loading..."}
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-primary" />
              <span>Open for worldwide remote collaboration</span>
            </p>
          </motion.div>

          {/* Bento Card 3: Education & Academic Milestone */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="rounded-3xl bg-card border border-border p-6 flex flex-col justify-between shadow-sm hover:border-border-hover transition-all"
          >
            <div>
              <div className="p-2.5 w-fit rounded-2xl bg-primary/10 text-primary mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>

              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary">
                Academics
              </span>
              <h4 className="text-base font-bold text-foreground mt-1">B.Sc Computer Science</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Gujarat University (Class of 2025)</p>

              <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span>Data Structures & Algorithms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span>Object-Oriented System Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-primary" />
                  <span>Database Management & SQL</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Degree Completed</span>
              <span className="font-semibold text-foreground">2025</span>
            </div>
          </motion.div>

          {/* Bento Card 4: Four Engineering Pillars (Spans 4 cols on lg) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="col-span-1 md:col-span-3 lg:col-span-4 rounded-3xl bg-secondary/40 border border-border p-6 sm:p-8 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" /> Core Competencies & Architecture Focus
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-card border border-border/80">
                <div className="p-2 w-fit rounded-xl bg-primary/10 text-primary mb-3">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Android Native</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Declarative UI with Jetpack Compose, Kotlin Coroutines, StateFlow, and Clean MVVM.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/80">
                <div className="p-2 w-fit rounded-xl bg-primary/10 text-primary mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">AI & Machine Learning</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Predictive modeling, neural networks with TensorFlow, Scikit-learn, and on-device TFLite.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/80">
                <div className="p-2 w-fit rounded-xl bg-primary/10 text-primary mb-3">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Game & Audio Systems</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  3D mechanics in Unity Engine, C# scripting, and real-time audio microphone detection.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-card border border-border/80">
                <div className="p-2 w-fit rounded-xl bg-primary/10 text-primary mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-foreground">Full-Stack Web</h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Interactive web interfaces with React, Tailwind CSS, real-time Firebase, and SQL/NoSQL DBs.
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
