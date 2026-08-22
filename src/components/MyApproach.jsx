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
    title: "AI & Machine Learning Pipeline",
    badge: "Machine Learning",
    icon: Cpu,
    color: "from-orange-500 to-amber-600",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    description:
      "A structured end-to-end pipeline for training predictive neural networks and deploying lightweight inference models to mobile and web environments.",
    steps: [
      {
        title: "1. Data Preprocessing & Cleansing",
        desc: "Raw data extraction, outlier filtering, feature normalization and tensor structuring using NumPy & Pandas.",
        tag: "Data Ingestion",
      },
      {
        title: "2. Model Architecture & Training",
        desc: "Deep learning models, CNNs, and supervised classifiers built in TensorFlow & Scikit-learn with cross-validation.",
        tag: "TensorFlow / Python",
      },
      {
        title: "3. Quantization & Edge Optimization",
        desc: "Weight quantization (INT8/FP16) via TensorFlow Lite to achieve sub-50ms inference on mobile hardware.",
        tag: "TFLite / Edge AI",
      },
      {
        title: "4. Deployment & Real-Time Sync",
        desc: "Seamless integration into native Android apps and web dashboards with continuous metrics evaluation.",
        tag: "Production Ready",
      },
    ],
  },
  {
    id: "android",
    title: "Android Native Clean Architecture",
    badge: "Mobile Architecture",
    icon: Smartphone,
    color: "from-amber-500 to-orange-600",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    description:
      "Production-proven MVVM architecture with unidirectional data flow (UDF), Kotlin Coroutines, and declarative Jetpack Compose UI.",
    steps: [
      {
        title: "1. Presentation Layer (Jetpack Compose)",
        desc: "Purely declarative UI components responding to immutable UI state with smooth 60fps recompositions.",
        tag: "Compose UI",
      },
      {
        title: "2. State & ViewModel Layer",
        desc: "StateFlow & SharedFlow with Kotlin Coroutines for asynchronous lifecycle-aware event handling.",
        tag: "StateFlow / MVVM",
      },
      {
        title: "3. Domain & Use Cases",
        desc: "Isolated business logic decoupled from framework dependencies for testability and clarity.",
        tag: "Clean Architecture",
      },
      {
        title: "4. Data & Repository Layer",
        desc: "Single source of truth combining Firebase Cloud Firestore, Room SQLite, and REST endpoints.",
        tag: "Firebase / Room",
      },
    ],
  },
  {
    id: "game",
    title: "3D Game Systems & Acoustic AI",
    badge: "Interactive & 3D",
    icon: Gamepad2,
    color: "from-rose-500 to-orange-500",
    textColor: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    description:
      "Innovative interactive systems built for 'Maunam: The Silent God', where real-time physical noise directly drives in-game entity behavior.",
    steps: [
      {
        title: "1. Real-Time Mic Frequency Analysis",
        desc: "Capturing player microphone input via Unity Audio API to detect Decibel spikes and room acoustics.",
        tag: "Audio Acoustics",
      },
      {
        title: "2. Entity Perception State Machine",
        desc: "Finite State Machine (Patrol, Alert, Hunt) triggered dynamically by microphone loudness thresholds.",
        tag: "AI Behavior Trees",
      },
      {
        title: "3. Spatial Audio & Volumetric Lighting",
        desc: "Immersive 3D binaural sound cues paired with atmospheric fog and dynamic shadow rendering in Unity.",
        tag: "Unity 3D Engine",
      },
      {
        title: "4. Performance Profiling",
        desc: "Draw call batching, texture atlas packing, and LOD optimization for smooth mobile gameplay.",
        tag: "Mobile Optimization",
      },
    ],
  },
];

export const MyApproach = () => {
  const [activeTab, setActiveTab] = useState("ai");

  const currentApproach = approaches.find((a) => a.id === activeTab) || approaches[0];

  return (
    <section id="approach" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
            How I architect & build software.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            A transparent look into my technical pipelines, architectural design patterns, and engineering workflows.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
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
                className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3.5 ${
                  isSelected
                    ? "bg-card border-primary shadow-md"
                    : "bg-secondary/60 hover:bg-secondary border-border/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${
                    isSelected ? appr.bgColor + " " + appr.textColor : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
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
            transition={{ duration: 0.35 }}
            className="rounded-3xl bg-card border border-border p-6 sm:p-10 shadow-sm relative overflow-hidden"
          >
            {/* Ambient Corner Flare (10% Accent) */}
            <div
              className={`absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br ${currentApproach.color} opacity-10 blur-3xl pointer-events-none`}
            />

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
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

            {/* 4-Step Pipeline Flow */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
              {currentApproach.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-secondary/50 border border-border/80 flex flex-col justify-between hover:border-border-hover transition-all"
                >
                  <div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-card text-muted-foreground border border-border/60 inline-block mb-3">
                      {step.tag}
                    </span>
                    <h4 className="text-sm font-bold text-foreground mb-2">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span>Phase 0{idx + 1}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
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
