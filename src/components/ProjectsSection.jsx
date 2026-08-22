import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Sparkles,
  Smartphone,
  Globe,
  Gamepad2,
  BookOpen,
  Box,
} from "lucide-react";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { sound } from "@/lib/SoundEngine";

const projectFilters = [
  { id: "all", label: "All Projects" },
  { id: "android", label: "Android Apps", match: "Android" },
  { id: "game", label: "3D Game / AI", match: "Game" },
  { id: "web", label: "Web Apps", match: "Web" },
];

export const ProjectsSection = ({ onModalStateChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeModalProject, setActiveModalProject] = useState(null);

  useEffect(() => {
    onModalStateChange?.(!!activeModalProject);
  }, [activeModalProject, onModalStateChange]);

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === "all") return true;
    const filter = projectFilters.find((f) => f.id === selectedFilter);
    return filter?.match ? p.category.includes(filter.match) : true;
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Featured engineering projects.
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-xl">
              Android applications shipped to the Google Play Store, 3D interactive games, and full-stack web platforms.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  sound.click();
                  setSelectedFilter(filter.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === filter.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* 3D Interactive Portfolio Feature Card — 60-30-10 Radiant Accent */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-10 sm:mb-12 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/5 border border-primary/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:border-primary/50 transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-primary/15 text-primary border border-primary/30 flex-shrink-0">
              <Box className="w-7 h-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary bg-primary/15 px-2.5 py-0.5 rounded-full border border-primary/30">
                  Featured 3D Experience
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Interactive 3D Virtual Showcase
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
                Step into an immersive 3D virtual environment featuring spatial physics, acoustic audio mechanics, and interactive project stages.
              </p>
            </div>
          </div>

          <a
            href="https://kishanpokal-3d.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <span>Launch 3D Portfolio</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Projects Cards Grid (30% Card Containers) */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const isAndroid = project.category?.toLowerCase().includes("android");
              const isGame = project.category?.toLowerCase().includes("game");

              return (
                <motion.div
                  layout
                  key={project.id || index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-3xl bg-card border border-border hover:border-border-hover p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <div>
                    {/* Device Mockup Visual Window (Fits complete square/rectangular shape edge-to-edge) */}
                    <div className="relative rounded-2xl bg-secondary/80 border border-border/90 overflow-hidden aspect-[16/10] mb-6 flex items-center justify-center group-hover:scale-[1.01] transition-transform duration-500 shadow-inner">
                      <img
                        src={project.image || project.thumbnail || "/projects/default-project.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/projects/default-project.svg";
                        }}
                      />
                    </div>

                    {/* Meta Row: Category & Status */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-semibold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                        {isAndroid && <Smartphone className="w-3.5 h-3.5" />}
                        {isGame && <Gamepad2 className="w-3.5 h-3.5 text-primary" />}
                        {!isAndroid && !isGame && <Globe className="w-3.5 h-3.5 text-primary" />}
                        {project.category}
                      </span>

                      {project.status && (
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                            project.status.toLowerCase() === "completed"
                              ? "bg-primary/15 text-primary border-primary/30"
                              : "bg-secondary text-muted-foreground border-border"
                          }`}
                        >
                          {project.status}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags?.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-secondary text-foreground text-xs font-medium border border-border/60"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags && project.tags.length > 4 && (
                        <span className="px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground text-xs">
                          +{project.tags.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Bottom */}
                  <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        sound.click();
                        setActiveModalProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Case Study & Architecture</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && project.githubUrl !== "#" && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.click()}
                          className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground transition-colors"
                          aria-label="View Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && project.demoUrl !== "#" && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.click()}
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
                        >
                          <span>{isAndroid ? "Play Store" : "Live Demo"}</span>
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

        {/* Global CTA Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mt-20 sm:mt-28 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10 border border-primary/20 p-8 sm:p-12 text-center flex flex-col items-center"
        >
          <h3 className="text-2xl sm:text-4xl font-bold text-foreground mb-3">
            Have a project or vision in mind?
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mb-8 leading-relaxed">
            I'm currently available for software engineering roles, mobile app development, and AI integration projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#contact"
              onClick={() => sound.click()}
              className="px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/25"
            >
              Let's Discuss Opportunities
            </a>
            <a
              href="https://github.com/KishanPokal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="px-6 py-3.5 rounded-full bg-card hover:bg-secondary border border-border text-foreground font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Explore GitHub Repositories</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
