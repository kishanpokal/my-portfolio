import React, { useState } from "react";
import { ArrowUpRight, Smartphone, Github, Layers, Eye, Filter, X } from "lucide-react";
import { sound } from "@/lib/SoundEngine";
import { ProjectModalV2 } from "./ProjectModalV2";

export const ProjectsV2 = ({ activeTechFilter = null, onSelectTechFilter = () => {} }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      num: "01",
      title: "TrackEasy",
      category: "Android App / Personal Finance",
      status: "Live on Google Play Store",
      statusColor: "text-emerald-400",
      image: "/projects/trackeasy.svg",
      description:
        "A personal expense and budget tracking application published on the Google Play Store. Engineered with Kotlin and Jetpack Compose, featuring an offline-first Room database with automatic cloud synchronization via Firebase.",
      highlights: [
        "Published and active on the official Google Play Store",
        "Reactive UI built with modern Jetpack Compose & Material 3",
        "Full offline support with local Room DB and Firebase cloud sync",
        "Clean MVVM architecture with Kotlin Coroutines and Flow",
      ],
      tags: ["Kotlin", "Jetpack Compose", "Firebase", "Room DB", "Coroutines"],
      primaryLink: {
        label: "Google Play Store",
        url: "https://play.google.com/store/apps/details?id=com.kishan.trackeasy",
        icon: Smartphone,
      },
    },
    {
      num: "02",
      title: "Maunam: The Silent God",
      category: "3D Mobile Game / Game AI",
      status: "In Active Development",
      statusColor: "text-[#ff5a1f]",
      image: "/projects/maunam.svg",
      description:
        "A 3D mobile horror game developed in Unity and C#. Utilizes real-time microphone acoustics detection to make physical silence essential—any sound detected from the player's microphone alerts the patrol AI.",
      highlights: [
        "First-person mobile atmospheric horror experience in Unity 3D",
        "Real-time mic noise analysis engine detecting player volume levels",
        "Behavior-tree monster AI with patrolling, investigative, and hunting states",
        "Custom mobile shaders & optimized occlusion culling for smooth framerates",
      ],
      tags: ["Unity 3D", "C#", "Game AI", "Acoustic Detection", "Mobile Shaders"],
    },
    {
      num: "03",
      title: "AttendMate Android",
      category: "Android Utility / University Tool",
      status: "Completed & Open Source",
      statusColor: "text-sky-400",
      image: "/projects/attendmate-android.svg",
      description:
        "An Android application engineered for university students to track lecture attendance, calculate safe-bunk allowances, and receive automated notifications before hitting mandatory attendance thresholds.",
      highlights: [
        "Course-by-course daily attendance tracking & analytics",
        "Smart safe-bunk algorithm with threshold warning alerts",
        "Clean, intuitive Android interface adhering to Material Design",
        "Cloud database synchronization with Firebase Firestore",
      ],
      tags: ["Kotlin", "Android SDK", "Firebase", "Material Design"],
      primaryLink: {
        label: "GitHub Repository",
        url: "https://github.com/kishanpokal/AttendMate2",
        icon: Github,
      },
    },
  ];

  const archivedBuilds = [
    {
      title: "ThreatLens AI",
      category: "Cybersecurity & ML",
      stack: "Python • PyTorch • FastAPI • React",
      desc: "Machine learning platform analyzing URLs and email bodies to detect malicious phishing attempts.",
      link: "https://github.com/kishanpokal/ThreatLens",
    },
    {
      title: "HabitFlow",
      category: "Productivity Web App",
      stack: "React • Tailwind CSS • Vercel",
      desc: "Daily habit tracking application with streak heatmaps, progress analytics, and local persistence.",
      link: "https://habitflowweb.vercel.app/",
    },
    {
      title: "Multiplayer Cricket Game",
      category: "Real-Time Web Game",
      stack: "React • TypeScript • Firebase",
      desc: "Browser-based multiplayer cricket game with matchmaking lobbies, real-time ball physics, and scoreboards.",
      link: "https://cricketbuzz-web.vercel.app/",
    },
  ];

  // Helper matching functions for live cross-filtering
  const isProjectMatch = (proj, filter) => {
    if (!filter) return false;
    const f = filter.toLowerCase().trim();
    return (
      proj.tags.some((t) => t.toLowerCase().includes(f) || f.includes(t.toLowerCase())) ||
      proj.title.toLowerCase().includes(f) ||
      proj.category.toLowerCase().includes(f) ||
      proj.description.toLowerCase().includes(f)
    );
  };

  const isArchiveMatch = (build, filter) => {
    if (!filter) return false;
    const f = filter.toLowerCase().trim();
    return (
      build.stack.toLowerCase().includes(f) ||
      build.title.toLowerCase().includes(f) ||
      build.category.toLowerCase().includes(f) ||
      build.desc.toLowerCase().includes(f)
    );
  };

  const matchingFlagshipCount = activeTechFilter
    ? projects.filter((p) => isProjectMatch(p, activeTechFilter)).length
    : 0;
  const matchingArchiveCount = activeTechFilter
    ? archivedBuilds.filter((b) => isArchiveMatch(b, activeTechFilter)).length
    : 0;
  const totalMatchCount = matchingFlagshipCount + matchingArchiveCount;

  return (
    <>
      <section id="projects" className="relative z-10 overflow-hidden bg-[#0c0d10] text-[#f2f0ec] py-16 sm:py-24 md:py-32">
        {/* Subtle Hairline Grid Overlay */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-ink mask-radial-fade opacity-60" />

        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-3 sm:gap-4 border-b border-white/10 pb-6 sm:pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="label-mono text-xs text-[#8a8a85]">Portfolio / Flagships</p>
              <h2 className="headline-minecraft mt-2 sm:mt-3 text-3xl sm:text-4xl md:text-6xl uppercase tracking-tight text-white">
                Projects<span className="text-[#ff5a1f]">.</span>
              </h2>
            </div>
            <p className="label-mono text-xs text-[#8a8a85]">03 Shipped &amp; Active</p>
          </div>

          {/* Active Cross-Filter Indicator Banner */}
          {activeTechFilter && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[#ff5a1f]/40 bg-[#ff5a1f]/10 px-4 py-3 backdrop-blur-md animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Filter className="w-3.5 h-3.5 text-[#ff5a1f] shrink-0" />
                <span className="label-mono text-white/90">Filtering Projects by Tech:</span>
                <span className="label-mono font-bold text-black bg-[#ff5a1f] px-2.5 py-0.5 rounded-sm text-[11px] shadow-xs">
                  {activeTechFilter}
                </span>
                <span className="label-mono text-[11px] text-[#a0a09b]">
                  ({totalMatchCount} project{totalMatchCount === 1 ? "" : "s"} match)
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  onSelectTechFilter(null);
                }}
                className="label-mono text-xs text-white/90 hover:text-[#ff5a1f] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                title="Clear tech filter"
              >
                <span>Clear Filter</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Flagship Cards Grid */}
          <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 lg:grid-cols-3">
            {projects.map((proj) => {
              const isMatch = isProjectMatch(proj, activeTechFilter);
              const isDimmed = activeTechFilter && !isMatch;

              return (
                <article
                  key={proj.num}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-sm border bg-[#12141a]/95 p-5 sm:p-6 md:p-7 transition-all duration-300 ${
                    isMatch
                      ? "border-[#ff5a1f] shadow-[0_0_28px_rgba(255,90,31,0.25)] ring-1 ring-[#ff5a1f] scale-[1.01]"
                      : isDimmed
                      ? "border-white/5 opacity-35 hover:opacity-100"
                      : "border-white/10 hover:border-[#ff5a1f] hover:-translate-y-1"
                  }`}
                >
                  {/* Matching Badge indicator */}
                  {isMatch && (
                    <div className="absolute top-3 right-3 z-20">
                      <span className="label-mono text-[9px] font-bold text-black bg-[#ff5a1f] px-2 py-0.5 rounded-sm shadow-xs flex items-center gap-1">
                        <span>● Matches {activeTechFilter}</span>
                      </span>
                    </div>
                  )}

                  {/* Giant Watermark Number */}
                  <span
                    aria-hidden="true"
                    className="headline pointer-events-none absolute -right-2 -top-6 select-none text-[100px] sm:text-[120px] font-bold text-white/[0.04] transition-colors duration-200 group-hover:text-white/[0.08]"
                  >
                    {proj.num}
                  </span>

                  <div className="relative z-10">
                    {/* Visual Preview Frame */}
                    <div className="relative mb-4 sm:mb-5 h-36 sm:h-44 w-full overflow-hidden rounded-sm border border-white/10 bg-black/40 flex items-center justify-center p-3 sm:p-4">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Category & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2">
                      <p className="label-mono text-[#8a8a85] text-[10px]">{proj.category}</p>
                      <span className={`label-mono text-[10px] flex items-center gap-1.5 ${proj.statusColor}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {proj.status}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="headline mt-3 sm:mt-4 text-xl sm:text-2xl uppercase tracking-tight text-white md:text-3xl">
                      {proj.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-[#a0a09b]">
                      {proj.description}
                    </p>

                    {/* Highlights */}
                    <ul className="mt-3.5 sm:mt-4 space-y-1.5 border-t border-white/10 pt-3.5 sm:pt-4 text-xs text-[#c4c4be]">
                      {proj.highlights.slice(0, 3).map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#ff5a1f] mt-0.5">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags & Action Link Buttons */}
                  <div className="relative z-10 mt-5 sm:mt-6 border-t border-white/10 pt-4 sm:pt-5">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags.map((tag) => {
                        const isTagActive = activeTechFilter?.toLowerCase() === tag.toLowerCase();
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              sound.click();
                              onSelectTechFilter(isTagActive ? null : tag);
                            }}
                            className={`label-mono rounded-sm border px-2 py-0.5 text-[9px] transition-all cursor-pointer ${
                              isTagActive
                                ? "border-[#ff5a1f] bg-[#ff5a1f] text-black font-bold scale-105"
                                : "border-white/10 bg-white/5 text-[#c4c4be] hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
                            }`}
                            title={`Filter projects by ${tag}`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Architecture Specs Modal Trigger */}
                      <button
                        type="button"
                        onClick={() => {
                          sound.click();
                          setSelectedProject(proj);
                        }}
                        className="label-mono inline-flex items-center justify-center gap-1.5 rounded-sm border border-white/20 bg-white/5 px-2.5 py-2.5 text-[10px] font-semibold text-white transition-colors duration-200 hover:border-white hover:bg-white/10"
                      >
                        <Layers className="w-3 h-3 text-[#ff5a1f]" />
                        <span>Inspect Specs</span>
                      </button>

                      {/* Primary Link (Play Store / GitHub) */}
                      {proj.primaryLink ? (
                        <a
                          href={proj.primaryLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.click()}
                          className="label-mono inline-flex items-center justify-center gap-1.5 rounded-sm bg-white px-2.5 py-2.5 text-[10px] font-bold text-black transition-colors duration-200 hover:bg-[#ff5a1f] hover:text-black"
                        >
                          <span>{proj.primaryLink.label.split(" ")[0]}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <div className="label-mono flex items-center justify-center text-[10px] text-[#8a8a85] py-2.5 border border-white/5 bg-white/[0.02]">
                          In Dev
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Secondary Archive Builds Row */}
          <div className="mt-12 sm:mt-16 border-t border-white/10 pt-8 sm:pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <p className="label-mono text-xs text-[#8a8a85]">Additional Builds &amp; Open Source</p>
              <a
                href="https://github.com/KishanPokal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.click()}
                className="label-mono text-xs text-[#ff5a1f] hover:underline flex items-center gap-1"
              >
                <span>View GitHub profile</span>
                <span>↗</span>
              </a>
            </div>

            <div className="grid gap-3.5 sm:gap-4 md:grid-cols-3">
              {archivedBuilds.map((build) => {
                const isMatch = isArchiveMatch(build, activeTechFilter);
                const isDimmed = activeTechFilter && !isMatch;

                return (
                  <a
                    key={build.title}
                    href={build.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className={`group block rounded-sm border bg-[#12141a]/50 p-4 sm:p-5 transition-all duration-200 ${
                      isMatch
                        ? "border-[#ff5a1f] shadow-[0_0_20px_rgba(255,90,31,0.22)] ring-1 ring-[#ff5a1f]/80"
                        : isDimmed
                        ? "border-white/5 opacity-35 hover:opacity-100"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="label-mono text-[10px] text-[#8a8a85]">{build.category}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8a8a85] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                    </div>
                    <h4 className="headline mt-2 text-base sm:text-lg uppercase text-white group-hover:text-[#ff5a1f] transition-colors">
                      {build.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-[#a0a09b] leading-relaxed">
                      {build.desc}
                    </p>
                    <p className="label-mono mt-3 text-[9px] text-[#8a8a85]">{build.stack}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study / Architectural Spec Modal */}
      {selectedProject && (
        <ProjectModalV2
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};
