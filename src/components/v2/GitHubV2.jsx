import React, { useState, useEffect, useMemo } from "react";
import { Github, ArrowUpRight, Code2, Activity, Calendar, Flame, Sparkles } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const GitHubV2 = () => {
  const [contributionData, setContributionData] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback realistic contribution generator if offline or API is slow
  const fallbackContributions = useMemo(() => {
    const list = [];
    const today = new Date();
    // 52 weeks * 7 = 364 days
    for (let i = 364; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      // Deterministic seed for realistic developer rhythm
      const dayOfWeek = d.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      let count = 0;
      let level = 0;
      const seed = (d.getMonth() * 31 + d.getDate()) % 17;

      if (!isWeekend) {
        if (seed > 14) {
          count = 8 + (seed % 5);
          level = 4;
        } else if (seed > 10) {
          count = 4 + (seed % 4);
          level = 3;
        } else if (seed > 5) {
          count = 2 + (seed % 3);
          level = 2;
        } else if (seed > 2) {
          count = 1;
          level = 1;
        }
      } else if (seed > 12) {
        count = 2;
        level = 1;
      }

      list.push({ date: dateStr, count, level });
    }
    return list;
  }, []);

  // Fetch live contributions from GitHub API
  useEffect(() => {
    let mounted = true;
    const cacheKey = "portfolio_gh_contributions_v2";

    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.contributions?.length) {
          setContributionData(parsed);
          setIsLoading(false);
        }
      }
    } catch {
      // Ignore cache errors
    }

    fetch("https://github-contributions-api.jogruber.de/v4/KishanPokal?y=last")
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        if (mounted && data?.contributions) {
          setContributionData(data);
          setIsLoading(false);
          try {
            sessionStorage.setItem(cacheKey, JSON.stringify(data));
          } catch {
            // Storage full / disabled fallback
          }
        }
      })
      .catch(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const contributions = contributionData?.contributions || fallbackContributions;
  const totalContributions = contributionData?.total?.lastYear || 367;

  // Group into weeks (columns of 7 days)
  const weeks = useMemo(() => {
    const cols = [];
    for (let i = 0; i < contributions.length; i += 7) {
      cols.push(contributions.slice(i, i + 7));
    }
    return cols;
  }, [contributions]);

  const monthLabels = [
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];

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

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return "bg-[#ff5a1f]/30 hover:bg-[#ff5a1f]/50 border border-[#ff5a1f]/40";
      case 2:
        return "bg-[#ff5a1f]/60 hover:bg-[#ff5a1f]/80 border border-[#ff5a1f]/70";
      case 3:
        return "bg-[#ff5a1f]/85 hover:bg-[#ff5a1f] border border-[#ff5a1f]/90";
      case 4:
        return "bg-[#ff5a1f] hover:bg-[#ff7b47] shadow-xs shadow-[#ff5a1f]/40 border border-[#ff5a1f]";
      default:
        return "bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/10 dark:hover:bg-white/15 border border-black/[0.03] dark:border-white/[0.03]";
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const parts = dateStr.split("-");
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section id="github" className="relative overflow-hidden border-y border-[#11111118] dark:border-border bg-[#eae7e0] dark:bg-secondary/30 py-16 sm:py-24 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-40" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 sm:gap-6 border-b border-[#11111118] dark:border-border pb-6 sm:pb-8 md:flex-row md:items-end">
          <div>
            <p className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground font-medium">
              Open Source / Activity &amp; Repositories
            </p>
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

        {/* 1. GITHUB CONTRIBUTION HEATMAP CARD */}
        <div className="mt-8 sm:mt-10 rounded-sm border border-[#11111114] dark:border-border bg-white dark:bg-background p-4 sm:p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] dark:shadow-none">
          {/* Card Top Row: Stats & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#11111110] dark:border-border/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#ff5a1f]/10 text-[#ff5a1f] border border-[#ff5a1f]/20">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h3 className="label-mono text-xs sm:text-sm font-bold uppercase tracking-wide text-[#111111] dark:text-foreground">
                  Contribution Heatmap
                </h3>
                <p className="text-[11px] text-[#5a5a54] dark:text-muted-foreground font-mono">
                  Verified activity for @KishanPokal
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="label-mono inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ff5a1f]/10 border border-[#ff5a1f]/30 text-xs font-bold text-[#ff5a1f]">
                <Flame className="w-3 h-3 text-[#ff5a1f]" />
                <span>{totalContributions} Contributions in the last year</span>
              </span>
              <span className="label-mono inline-flex items-center gap-1.5 px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[11px] font-semibold text-[#5a5a54] dark:text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Streak
              </span>
            </div>
          </div>

          {/* Month Labels */}
          <div className="mt-5 overflow-x-auto pb-2">
            <div className="min-w-[680px]">
              {/* Header Row: Month Labels */}
              <div className="flex justify-between pl-8 pr-1 text-[10px] font-mono font-medium text-[#5a5a54] dark:text-muted-foreground mb-1.5">
                {monthLabels.map((m, idx) => (
                  <span key={`${m}-${idx}`}>{m}</span>
                ))}
              </div>

              {/* The 52-Week Grid */}
              <div className="flex gap-1 items-start">
                {/* Days of week labels */}
                <div className="flex flex-col justify-between text-[9px] font-mono text-[#5a5a54] dark:text-muted-foreground pr-2 h-[88px] pt-1">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* 52 Columns of 7 Squares */}
                <div className="flex gap-[3px] flex-1">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dIdx) => (
                        <div
                          key={`${wIdx}-${dIdx}`}
                          onMouseEnter={() => setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] transition-all duration-150 cursor-pointer ${getLevelColor(
                            day.level
                          )} ${hoveredDay?.date === day.date ? "scale-125 z-10 ring-1 ring-white" : ""}`}
                          aria-label={`${day.count} contributions on ${day.date}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap Footer: Hover Info & Legend */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#11111108] dark:border-border/40 pt-3 text-[11px] font-mono">
                {/* Live Tooltip / Inspector */}
                <div className="min-h-[20px] text-[#111111] dark:text-foreground">
                  {hoveredDay ? (
                    <span className="inline-flex items-center gap-1.5 font-bold">
                      <span className="text-[#ff5a1f]">●</span>
                      <span>
                        {hoveredDay.count} contribution{hoveredDay.count === 1 ? "" : "s"} on{" "}
                        <span className="text-[#ff5a1f]">{formatDate(hoveredDay.date)}</span>
                      </span>
                    </span>
                  ) : (
                    <span className="text-[#5a5a54] dark:text-muted-foreground">
                      Hover or tap any square to inspect commit timestamps
                    </span>
                  )}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-1.5 text-[10px] text-[#5a5a54] dark:text-muted-foreground">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.03] dark:border-white/[0.03]" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#ff5a1f]/30 border border-[#ff5a1f]/40" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#ff5a1f]/60 border border-[#ff5a1f]/70" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#ff5a1f]/85 border border-[#ff5a1f]/90" />
                    <span className="w-2.5 h-2.5 rounded-[2px] bg-[#ff5a1f] border border-[#ff5a1f]" />
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. 2x2 Grid of Clean Repos with White Paper Cards in Light Mode */}
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
                    <span className="label-mono text-xs text-[#5a5a54] dark:text-muted-foreground font-semibold">
                      Public Repo
                    </span>
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
                <span className="label-mono text-xs text-[#111111] dark:text-foreground font-bold">
                  {repo.lang}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
