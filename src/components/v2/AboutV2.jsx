import React from "react";
import { GraduationCap } from "lucide-react";

export const AboutV2 = () => {
  return (
    <section id="about" className="relative mx-auto max-w-[1280px] px-6 py-24 md:px-10 md:py-32">
      {/* Background Subtle Dots/Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grid-subtle mask-radial-fade opacity-40" />

      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Massive Editorial Year Display in Minecraft Typography */}
        <div className="lg:col-span-5 space-y-4">
          <p className="label-mono text-[#5a5a54] dark:text-muted-foreground font-medium">
            Academic Timeline / 2022 to 2027
          </p>

          <p
            aria-hidden="true"
            className="headline-minecraft text-[20vw] leading-[0.85] select-none text-[#111111] dark:text-foreground/90 lg:text-[150px]"
          >
            2027<span className="text-[#ff5a1f]">.</span>
          </p>

          <div className="space-y-1.5 pt-2">
            <p className="label-mono text-xs text-[#111111] dark:text-foreground font-bold">
              Master in Computer Science (2025 — 2027)
            </p>
            <p className="label-mono text-[11px] text-[#5a5a54] dark:text-muted-foreground">
              B.Sc in Computer Science (2022 — 2025)
            </p>
            <p className="label-mono text-[10px] text-[#71716b] dark:text-muted-foreground">
              Gujarat, India
            </p>
          </div>
        </div>

        {/* Right Column: Degrees & Engineering Principles */}
        <div className="flex flex-col gap-6 lg:col-span-7">
          {/* Degree 1: Master in Computer Science (2027) */}
          <div className="rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-background/80 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center justify-between">
              <span className="label-mono rounded-sm border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 px-2.5 py-1 text-[10px] font-bold text-[#ff5a1f]">
                Master's Degree (In Progress)
              </span>
              <span className="label-mono text-xs text-[#71716b] dark:text-muted-foreground font-semibold">
                2025 — 2027
              </span>
            </div>

            <h2 className="headline mt-4 text-2xl uppercase tracking-tight text-[#111111] dark:text-foreground md:text-3xl">
              Master in Computer Science
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#2d3139] dark:text-muted-foreground">
              Pursuing postgraduate studies specializing in advanced Artificial Intelligence, Machine Learning architectures, distributed computing, and high-performance mobile operating systems.
            </p>
          </div>

          {/* Degree 2: B.Sc, Computer Science (2025) */}
          <div className="rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-background/80 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
            <div className="flex items-center justify-between">
              <span className="label-mono rounded-sm border border-[#11111110] dark:border-white/10 bg-[#eae7e1] dark:bg-secondary px-2.5 py-1 text-[10px] font-bold text-[#111111] dark:text-foreground">
                Bachelor's Degree (Completed)
              </span>
              <span className="label-mono text-xs text-[#71716b] dark:text-muted-foreground font-semibold">
                2022 — 2025
              </span>
            </div>

            <h3 className="headline mt-4 text-2xl uppercase tracking-tight text-[#111111] dark:text-foreground md:text-3xl">
              B.Sc, Computer Science
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-[#2d3139] dark:text-muted-foreground">
              Comprehensive undergraduate foundation covering Data Structures &amp; Algorithms, Object-Oriented Software Engineering, Operating Systems, Database Management (DBMS), and Computer Networks.
            </p>
          </div>

          {/* Core Principles */}
          <div className="rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-transparent p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
            <h4 className="label-mono text-xs font-bold text-[#111111] dark:text-foreground mb-4">
              Core Engineering Focus
            </h4>
            <ul className="space-y-3 text-sm leading-relaxed text-[#5a5a54] dark:text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-[#ff5a1f] font-mono text-base mt-[-2px] font-bold">→</span>
                <span>
                  <strong className="text-[#111111] dark:text-foreground font-semibold">Native Android Craft:</strong> Deep emphasis on Kotlin, Jetpack Compose, Coroutines, StateFlow, and modern Architecture Components.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff5a1f] font-mono text-base mt-[-2px] font-bold">→</span>
                <span>
                  <strong className="text-[#111111] dark:text-foreground font-semibold">Applied Machine Learning:</strong> Practical model training and deployment using Python, PyTorch, Scikit-Learn, and lightweight edge inference.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff5a1f] font-mono text-base mt-[-2px] font-bold">→</span>
                <span>
                  <strong className="text-[#111111] dark:text-foreground font-semibold">Offline-First Reliability:</strong> Building resilient mobile systems that remain responsive without network access via local caching and sync.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
