import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { flagshipProjects, archivedProjects } from "@/data/projects";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Sparkles,
  Smartphone,
  Gamepad2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Code2,
} from "lucide-react";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { sound } from "@/lib/SoundEngine";

export const ProjectsSection = ({ onModalStateChange }) => {
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  useEffect(() => {
    onModalStateChange?.(!!activeModalProject);
  }, [activeModalProject, onModalStateChange]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header (Simple English) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-12 sm:mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-sans">
            Featured <span className="font-serif italic font-normal text-gradient text-4xl sm:text-6xl">Projects</span>.
          </h2>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Here are my 3 main projects: a personal finance app on the Google Play Store, a 3D horror game, and a student attendance mobile tool.
          </p>
        </motion.div>

        {/* 3 Main Display Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence>
            {flagshipProjects.map((project, index) => {
              const isPlayStore = project.status?.toLowerCase().includes("google play");
              const isGame = project.category?.toLowerCase().includes("game");

              return (
                <motion.div
                  layout
                  key={project.id || index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-3xl dark:bg-[#111622]/90 bg-white border border-slate-200/90 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-500/40 p-6 flex flex-col justify-between shadow-lg dark:shadow-xl backdrop-blur-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  <div>
                    {/* Project Preview Image */}
                    <div className="relative rounded-2xl dark:bg-[#0A0D14] bg-slate-100 border border-slate-200 dark:border-white/5 overflow-hidden aspect-[16/10] mb-5 flex items-center justify-center group-hover:border-sky-500/30 transition-all duration-500 shadow-inner">
                      <img
                        src={project.image || "/projects/default-project.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/projects/default-project.svg";
                        }}
                      />
                    </div>

                    {/* Category & Status */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5 uppercase tracking-wider">
                        {isGame ? <Gamepad2 className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                        {project.category}
                      </span>

                      {project.status && (
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider flex items-center gap-1 ${
                            isPlayStore
                              ? "dark:bg-sky-500/20 bg-sky-50 text-sky-700 dark:text-sky-300 border-sky-500/30"
                              : "dark:bg-white/5 bg-slate-100 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          {project.status}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-sky-500 transition-colors">
                      {project.title}
                    </h3>

                    {/* Simple English Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5 font-normal">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 text-xs font-mono font-medium border border-slate-200 dark:border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-slate-200/90 dark:border-white/10 flex items-center justify-between gap-2">
                    {/* View Details Button */}
                    <button
                      onClick={() => {
                        sound.click();
                        setActiveModalProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors py-1 group/btn"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Project Details</span>
                      <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    {/* Primary Button */}
                    <div className="flex items-center gap-2">
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.click()}
                          className="p-2 rounded-xl dark:bg-[#0A0D14] bg-slate-100 hover:bg-slate-200 dark:hover:bg-[#161D2D] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="View GitHub Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}

                      {isPlayStore && project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.click()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-400 hover:bg-sky-300 text-[#0A0D14] text-xs font-bold shadow-md shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
                        >
                          <span>Play Store</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Collapsible Project Archive (The other builds go here) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
          className="mt-12 sm:mt-16 rounded-3xl dark:bg-[#111622]/80 bg-white border border-slate-200/90 dark:border-white/10 shadow-lg dark:shadow-none overflow-hidden"
        >
          {/* Drawer Trigger */}
          <button
            onClick={() => {
              sound.click();
              setIsArchiveOpen(!isArchiveOpen);
            }}
            className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl dark:bg-white/5 bg-sky-50 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-white/10 group-hover:border-sky-500/30 transition-colors">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-foreground">
                  View More Projects ({archivedProjects.length} Earlier Builds)
                </h4>
                <p className="text-xs text-muted-foreground">
                  Habit Tracker (HabitFlow), ThreatLens AI, Cricket Game, Book Store, and more
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              <span>{isArchiveOpen ? "Hide Earlier Projects" : "Show All Earlier Projects"}</span>
              {isArchiveOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {/* Drawer Content */}
          <AnimatePresence>
            {isArchiveOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-slate-200 dark:border-white/10 overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                        <th className="py-3.5 px-6">Year</th>
                        <th className="py-3.5 px-6">Project Name</th>
                        <th className="py-3.5 px-6 hidden md:table-cell">Stack</th>
                        <th className="py-3.5 px-6 hidden sm:table-cell">What It Does</th>
                        <th className="py-3.5 px-6 text-right">Links</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-normal text-slate-700 dark:text-slate-300">
                      {archivedProjects.map((arch, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors group/row"
                        >
                          <td className="py-4 px-6 font-mono text-sky-600 dark:text-sky-400 font-medium">
                            {arch.year}
                          </td>
                          <td className="py-4 px-6 font-bold text-foreground whitespace-nowrap">
                            {arch.title}
                          </td>
                          <td className="py-4 px-6 hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {arch.stack.map((s, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-muted-foreground hidden sm:table-cell max-w-sm">
                            {arch.summary}
                          </td>
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-2 justify-end">
                              {arch.githubUrl && arch.githubUrl !== "#" && (
                                <a
                                  href={arch.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => sound.click()}
                                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors"
                                  title="View GitHub Code"
                                >
                                  <Github className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {arch.demoUrl && arch.demoUrl !== "#" && (
                                <a
                                  href={arch.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => sound.click()}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-white/5 hover:bg-sky-100 dark:hover:bg-white/10 text-sky-600 dark:text-sky-400 border border-sky-200/60 dark:border-white/10 transition-colors text-[11px] font-medium"
                                  title="Open Demo"
                                >
                                  <span>Demo</span>
                                  <ArrowUpRight className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
