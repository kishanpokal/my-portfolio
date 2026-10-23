import React from "react";

export const ExperienceV2 = () => {
  const experiences = [
    {
      type: "Shipped Production App",
      period: "2024 — Present",
      role: "Lead Mobile Developer & Publisher",
      organization: "Google Play Store • TrackEasy",
      summary:
        "Architected, implemented, and released TrackEasy to Google Play. Built an offline-first budget engine using Jetpack Compose and Kotlin Coroutines, handling persistent Room storage and seamless cloud reconciliation with Firebase.",
      highlights: [
        "Maintained 100% crash-free session stability across production releases",
        "Adopted modern unidirectional data flow (UDF) and strict clean architecture",
        "Implemented real-time expense analytics and automated budget threshold warnings",
      ],
    },
    {
      type: "Academic Capstone & AI",
      period: "2024 — 2025",
      role: "AI & Software Engineering Researcher",
      organization: "B.Sc Computer Science",
      summary:
        "Focused on applied Machine Learning and mobile security. Engineered ThreatLens, an intelligent phishing and threat detection system using Python, FastAPI, and neural network models for lexical and content URL parsing.",
      highlights: [
        "Trained classification models achieving high accuracy on threat datasets",
        "Exposed REST APIs via FastAPI consumed by interactive client applications",
        "Conducted performance benchmarking for inference latency on consumer devices",
      ],
    },
    {
      type: "Game Engineering & Interactive",
      period: "2024 — Present",
      role: "Solo Game Developer & AI Programmer",
      organization: "Maunam: The Silent God",
      summary:
        "Designing a first-person 3D mobile horror game in Unity and C#. Implemented a specialized audio input system that listens to microphone levels in real time to alter in-game monster behavior and environmental alertness.",
      highlights: [
        "Engineered mic-frequency sampling to trigger dynamic chase and search states",
        "Built behavior tree AI with hierarchical patrol zones and line-of-sight algorithms",
        "Optimized 3D rendering pipeline for consistent 60 FPS on Android mobile hardware",
      ],
    },
  ];

  return (
    <section id="experience" className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32">
      {/* Background Subtle Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grid-subtle mask-radial-fade opacity-50" />

      {/* Section Header */}
      <div className="flex flex-col justify-between gap-3 sm:gap-4 border-b border-[#11111118] dark:border-border pb-6 sm:pb-8 sm:flex-row sm:items-end">
        <div>
          <p className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground">Career / Milestones</p>
          <h2 className="headline-minecraft mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight text-[#111111] dark:text-foreground">
            Experience<span className="text-[#ff5a1f]">.</span>
          </h2>
        </div>
        <p className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground font-semibold">03 Key Milestones</p>
      </div>

      {/* Timeline Articles with Crisp White Paper Cards in Light Mode */}
      <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
        {experiences.map((exp, idx) => (
          <article
            key={idx}
            className="group relative rounded-sm border border-[#11111114] dark:border-white/10 bg-white dark:bg-[#12141a]/90 p-5 sm:p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-200 hover:border-[#111111] dark:hover:border-white"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="label-mono rounded-sm border border-[#11111110] dark:border-white/10 bg-[#eae7e1] dark:bg-secondary px-2.5 py-1 text-[10px] font-bold text-[#111111] dark:text-foreground">
                    {exp.type}
                  </span>
                  <span className="label-mono text-xs text-[#71716b] dark:text-muted-foreground font-medium">{exp.period}</span>
                </div>

                <h3 className="headline mt-3 sm:mt-4 text-xl sm:text-2xl uppercase tracking-tight md:text-3xl text-[#111111] dark:text-foreground">
                  {exp.role}
                </h3>
                <p className="label-mono mt-1 text-xs text-[#ff5a1f] font-semibold">
                  {exp.organization}
                </p>
              </div>
            </div>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed text-[#2d3139] dark:text-foreground/80 max-w-3xl">
              {exp.summary}
            </p>

            <ul className="mt-4 sm:mt-5 space-y-2 border-t border-[#11111110] dark:border-white/10 pt-3.5 sm:pt-4 text-xs sm:text-sm text-[#5a5a54] dark:text-muted-foreground max-w-3xl">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-[#ff5a1f] mt-1 text-xs shrink-0">■</span>
                  <span className="text-[#2d3139] dark:text-muted-foreground">{h}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};
