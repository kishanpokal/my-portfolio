import React from "react";
import { Github, ArrowUpRight, Code2 } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const GitHubV2 = () => {
  const repos = [
    {
      name: "AttendMate2",
      desc: "Native Android application built with Kotlin for university attendance tracking, bunk calculations, and cloud synchronization.",
      lang: "Kotlin",
      langColor: "bg-purple-500",
      url: "https://github.com/kishanpokal/AttendMate2",
    },
    {
      name: "ThreatLens",
      desc: "Machine learning cybersecurity platform parsing URLs and emails with Python & FastAPI to identify zero-day phishing attacks.",
      lang: "Python",
      langColor: "bg-blue-500",
      url: "https://github.com/kishanpokal/ThreatLens",
    },
    {
      name: "habit-tracker-web",
      desc: "Clean habit building web app with streak heatmaps, daily goal notifications, and responsive minimalist UI.",
      lang: "JavaScript",
      langColor: "bg-amber-400",
      url: "https://github.com/kishanpokal/habit-tracker-web",
    },
    {
      name: "Cricket-Game",
      desc: "Multiplayer browser game featuring dynamic batting/bowling physics, room codes, and real-time multiplayer state via Firebase.",
      lang: "TypeScript",
      langColor: "bg-sky-600",
      url: "https://github.com/kishanpokal/Cricket-Game",
    },
  ];

  return (
    <section id="github" className="relative overflow-hidden border-y border-[#11111118] dark:border-border bg-[#eae7e0] dark:bg-secondary/30 py-16 sm:py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-40" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:gap-6 border-b border-[#11111118] dark:border-border pb-6 sm:pb-8 md:flex-row md:items-end">
          <div>
            <p className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground">Open Source / Repositories</p>
            <h2 className="headline-minecraft mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight text-[#111111] dark:text-foreground">
              GitHub<span className="text-[#ff5a1f]">.</span>
            </h2>
          </div>

          <a
            href="https://github.com/KishanPokal"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="label-mono group inline-flex items-center justify-center gap-2 rounded-sm bg-[#111111] dark:bg-foreground px-5 py-3 text-xs sm:text-sm font-bold text-[#f2f0ec] dark:text-background transition-colors duration-200 hover:bg-[#ff5a1f] hover:text-black w-full sm:w-fit shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>github.com/KishanPokal</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* 2x2 Grid of Clean Repos with White Paper Cards in Light Mode */}
        <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="group flex flex-col justify-between rounded-sm border border-[#11111114] dark:border-border bg-white dark:bg-background p-5 sm:p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-200 hover:border-black dark:hover:border-foreground"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#ff5a1f]" />
                    <span className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground font-semibold">Public Repo</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#5a5a54] dark:text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff5a1f]" />
                </div>

                <h3 className="headline mt-3 sm:mt-4 text-lg sm:text-xl uppercase tracking-tight text-[#111111] dark:text-foreground group-hover:text-[#ff5a1f] transition-colors md:text-2xl">
                  {repo.name}
                </h3>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-[#5a5a54] dark:text-muted-foreground">
                  {repo.desc}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 flex items-center gap-2 border-t border-[#11111114] dark:border-border/60 pt-3.5 sm:pt-4">
                <span className={`h-2.5 w-2.5 rounded-full ${repo.langColor}`} />
                <span className="label-mono text-xs text-[#111111] dark:text-foreground font-bold">{repo.lang}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
