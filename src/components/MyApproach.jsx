import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Smartphone,
  Gamepad2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { sound } from "@/lib/SoundEngine";

const approaches = [
  {
    id: "ai",
    title: "AI & Machine Learning Workflow",
    badge: "Machine Learning",
    icon: Cpu,
    color: "from-sky-500 to-blue-600",
    textColor: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    description:
      "How I collect data, train machine learning models, and make them run fast on mobile phones and web browsers.",
    steps: [
      {
        title: "1. Data Preparation",
        desc: "Cleaning raw datasets, handling missing values, and preparing numerical features using Python, NumPy, and Pandas.",
        tag: "Data Cleaning",
      },
      {
        title: "2. Model Training",
        desc: "Training deep learning models in PyTorch and TensorFlow with validation checks to make sure they are accurate.",
        tag: "PyTorch & TensorFlow",
      },
      {
        title: "3. Speed & Size Optimization",
        desc: "Converting models with TensorFlow Lite (TFLite) so they run smoothly on mobile phones in less than 50ms.",
        tag: "On-Device Speed",
      },
      {
        title: "4. App Integration",
        desc: "Connecting the trained model directly into Android apps and web APIs with clean, tested code.",
        tag: "Ready for Users",
      },
    ],
  },
  {
    id: "android",
    title: "Android Clean App Architecture",
    badge: "Android Mobile",
    icon: Smartphone,
    color: "from-sky-500 to-cyan-600",
    textColor: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    description:
      "How I build Android apps using Jetpack Compose and clean MVVM architecture so the app is fast, reliable, and easy to maintain.",
    steps: [
      {
        title: "1. UI Layer (Jetpack Compose)",
        desc: "Building modern declarative screens that respond instantly to user interactions at 60fps.",
        tag: "Modern Compose UI",
      },
      {
        title: "2. State & ViewModel Layer",
        desc: "Managing app state and user events safely using Kotlin Coroutines and StateFlow.",
        tag: "Coroutines & Flow",
      },
      {
        title: "3. App Business Logic",
        desc: "Keeping calculations and core rules separate from UI code so everything is easy to test.",
        tag: "Clean Code",
      },
      {
        title: "4. Local & Cloud Storage",
        desc: "Storing data locally in Room database for offline use and syncing with Firebase Cloud in real time.",
        tag: "Room & Firebase",
      },
    ],
  },
  {
    id: "game",
    title: "3D Game Systems (Maunam)",
    badge: "Game Development",
    icon: Gamepad2,
    color: "from-cyan-500 to-sky-600",
    textColor: "text-sky-600 dark:text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    description:
      "How I created the gameplay mechanics for 'Maunam', where real-life microphone sound directly influences in-game enemy monsters.",
    steps: [
      {
        title: "1. Real-Time Mic Sound Sampling",
        desc: "Reading the player's microphone in real time to measure noise levels and voice spikes.",
        tag: "Mic Detection",
      },
      {
        title: "2. Monster Alert States",
        desc: "Monster AI switches between Patrol, Suspicious, and Attack depending on how much noise the player makes.",
        tag: "Enemy AI",
      },
      {
        title: "3. 3D Spatial Audio & Lighting",
        desc: "Dark atmospheric fog and realistic 3D sound effects created in Unity Engine.",
        tag: "Unity 3D Audio",
      },
      {
        title: "4. Mobile Performance Optimization",
        desc: "Optimizing 3D models and textures so the game runs smoothly without draining the phone battery.",
        tag: "Mobile 60fps",
      },
    ],
  },
];

export const MyApproach = () => {
  const [activeTab, setActiveTab] = useState("ai");

  const currentApproach = approaches.find((a) => a.id === activeTab) || approaches[0];

  return (
    <section id="approach" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative transition-colors duration-200">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Development Process</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-sans">
            How I <span className="font-serif italic font-normal text-gradient text-4xl sm:text-6xl">Build</span> Software.
          </h2>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground leading-relaxed">
            A clear look at how I design and code Android apps, machine learning pipelines, and 3D games.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
          {approaches.map((appr) => {
            const Icon = appr.icon;
            const isSelected = activeTab === appr.id;
            return (
              <button
                key={appr.id}
                onClick={() => {
                  sound.click();
                  setActiveTab(appr.id);
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                  isSelected
                    ? "dark:bg-[#111622] bg-white border-sky-500 shadow-xl shadow-sky-500/10 text-foreground"
                    : "dark:bg-[#111622]/60 bg-white/70 hover:bg-white dark:hover:bg-[#111622] dark:border-white/10 border-slate-200/80 text-muted-foreground hover:text-foreground shadow-sm"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    isSelected ? appr.bgColor + " " + appr.textColor : "dark:bg-white/5 bg-slate-100 text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {appr.badge}
                  </p>
                  <p className="text-sm font-bold text-foreground mt-0.5">{appr.title}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Approach Showcase Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentApproach.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl dark:bg-[#111622]/95 bg-white dark:border-white/10 border-slate-200/90 p-6 sm:p-10 shadow-xl dark:shadow-2xl backdrop-blur-xl relative"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${currentApproach.bgColor} ${currentApproach.textColor} border ${currentApproach.borderColor}`}
                >
                  {currentApproach.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                {currentApproach.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                {currentApproach.description}
              </p>
            </div>

            {/* 4 Steps (Rock-solid layout with ample height, high contrast, zero clipping) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
              {currentApproach.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl dark:bg-[#161D2D]/90 bg-slate-50/90 dark:border-white/10 border-slate-200/90 flex flex-col justify-between hover:border-sky-400/50 transition-all group min-h-[190px] shadow-sm"
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-md dark:bg-sky-500/10 bg-sky-50 text-sky-600 dark:text-sky-400 border dark:border-sky-500/20 border-sky-200 inline-block shadow-xs">
                      {step.tag}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-sky-500 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t dark:border-white/5 border-slate-200 flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Step 0{idx + 1}</span>
                    <CheckCircle2 className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MyApproach;
