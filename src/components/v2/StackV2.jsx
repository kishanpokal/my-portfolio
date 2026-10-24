import React from "react";
import { ArrowUpRight, X, Sparkles } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const StackV2 = ({ activeTechFilter = null, onSelectTechFilter = () => {} }) => {
  const stackCategories = [
    {
      category: "Languages",
      items: "Kotlin / Python / Java / JavaScript / TypeScript / C# / SQL",
    },
    {
      category: "Mobile & Android",
      items: "Jetpack Compose / Android SDK / Room DB / Retrofit / Coroutines & Flow / Material 3 / MVVM",
    },
    {
      category: "Machine Learning & AI",
      items: "PyTorch / TensorFlow / Scikit-Learn / OpenCV / Pandas / NumPy / Feature Engineering",
    },
    {
      category: "Backend & Storage",
      items: "FastAPI / Node.js / Express / Firebase / PostgreSQL / SQLite / REST APIs",
    },
    {
      category: "Interactive & 3D",
      items: "Unity 3D / C# Scripting / Game AI / Real-Time Mic Audio / Mobile Shaders",
    },
    {
      category: "Tools & DevOps",
      items: "Android Studio / Git & GitHub / Docker / Postman / Vercel / Gradle / Linux",
    },
  ];

  const handleTechClick = (tech) => {
    sound.click();
    const isCurrentlyActive =
      activeTechFilter &&
      (activeTechFilter.toLowerCase() === tech.toLowerCase() ||
        tech.toLowerCase().includes(activeTechFilter.toLowerCase()) ||
        activeTechFilter.toLowerCase().includes(tech.toLowerCase()));

    if (isCurrentlyActive) {
      onSelectTechFilter(null);
    } else {
      onSelectTechFilter(tech);
      // Smoothly scroll up to the projects section to see the highlighted builds
      const projectsEl = document.getElementById("projects");
      if (projectsEl) {
        projectsEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section id="stack" className="relative overflow-hidden border-y border-[#11111118] dark:border-border bg-[#eae7e0] dark:bg-secondary/40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-40" />

      <div className="relative mx-auto grid max-w-[1280px] gap-8 sm:gap-10 px-4 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32 md:grid-cols-12">
        {/* Left Column: Heading & Cross-filter Status */}
        <div className="md:col-span-4">
          <p className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground font-medium">Technical Capabilities</p>
          <h2 className="headline-minecraft mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight text-[#111111] dark:text-foreground">
            Stack<span className="text-[#ff5a1f]">.</span>
          </h2>
          <p className="mt-3 sm:mt-4 max-w-xs text-xs sm:text-sm text-[#5a5a54] dark:text-muted-foreground leading-relaxed">
            Technologies and tools I reach for regularly. <span className="text-[#ff5a1f] font-semibold">Click any technology</span> to cross-highlight matching projects above.
          </p>

          {/* Active Filter Indicator Pill */}
          {activeTechFilter && (
            <div className="mt-5 inline-flex flex-col gap-1.5 p-3 rounded-lg border border-[#ff5a1f]/30 bg-[#ff5a1f]/10 backdrop-blur-sm">
              <span className="label-mono text-[10px] uppercase font-bold text-[#ff5a1f] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#ff5a1f]" />
                Active Project Filter
              </span>
              <div className="flex items-center gap-2">
                <span className="label-mono text-xs font-bold text-[#111111] dark:text-white bg-[#ff5a1f] px-2 py-0.5 rounded text-black font-semibold">
                  {activeTechFilter}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.click();
                    onSelectTechFilter(null);
                  }}
                  className="label-mono text-[11px] text-[#5a5a54] dark:text-muted-foreground hover:text-[#ff5a1f] transition-colors underline cursor-pointer"
                >
                  Clear filter
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Clean Definition Rows with Interactive Tech Chips */}
        <dl className="md:col-span-8 flex flex-col divide-y divide-[#11111118] dark:divide-border">
          {stackCategories.map((group) => (
            <div
              key={group.category}
              className="grid gap-2 sm:gap-3 py-4 sm:py-5 sm:grid-cols-[180px_1fr] sm:items-baseline transition-colors hover:bg-black/[0.02] dark:hover:bg-secondary/30 px-2 sm:px-3 rounded-sm"
            >
              <dt className="label-mono text-[11px] sm:text-xs font-bold text-[#ff5a1f] sm:text-[#5a5a54] sm:dark:text-muted-foreground">
                {group.category}
              </dt>
              <dd className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {group.items.split(" / ").map((item) => {
                  const isSelected =
                    activeTechFilter &&
                    (activeTechFilter.toLowerCase() === item.toLowerCase() ||
                      item.toLowerCase().includes(activeTechFilter.toLowerCase()) ||
                      activeTechFilter.toLowerCase().includes(item.toLowerCase()));

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleTechClick(item)}
                      className={`group inline-flex items-center gap-1.5 px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-md border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#ff5a1f] text-black border-[#ff5a1f] shadow-md shadow-[#ff5a1f]/25 scale-[1.03] ring-1 ring-[#ff5a1f]"
                          : "border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] text-[#111111] dark:text-[#f2f0ec] hover:border-[#ff5a1f]/60 hover:text-[#ff5a1f] hover:bg-[#ff5a1f]/10"
                      }`}
                      title={`Filter projects built with ${item} and jump to Projects`}
                    >
                      <span>{item}</span>
                      {isSelected ? (
                        <X className="w-3 h-3 text-black" />
                      ) : (
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all text-[#ff5a1f]" />
                      )}
                    </button>
                  );
                })}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
