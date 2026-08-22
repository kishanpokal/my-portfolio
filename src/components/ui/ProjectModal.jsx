import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle2, Layers, Smartphone, Globe, Gamepad2, Sparkles } from "lucide-react";
import { TECH_ICONS } from "@/data/techIcons";
import { sound } from "@/lib/SoundEngine";

export const ProjectModal = ({ project, isOpen, onClose }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      sound.playBeep(580, 0.05, "sine", 0.02);
      document.body.style.overflow = "hidden";
      if (contentRef.current) {
        contentRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const isAndroid = project.category?.toLowerCase().includes("android");
  const isGame = project.category?.toLowerCase().includes("game");
  const isWeb = project.category?.toLowerCase().includes("web");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
          {/* Full Screen Dim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 dark:bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container Card — Fits 100% inside screen viewport (60-30-10 Design) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-2xl bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[86vh] overflow-hidden"
          >
            {/* 1. Header Image Banner (Fixed at top of modal) */}
            <div className="relative w-full h-40 sm:h-48 md:h-52 bg-secondary/80 flex items-center justify-center overflow-hidden border-b border-border flex-shrink-0">
              {/* Close Button */}
              <button
                onClick={() => {
                  sound.click();
                  onClose();
                }}
                className="absolute top-3 right-3 z-30 p-2 rounded-full bg-background/90 hover:bg-background text-foreground border border-border/80 backdrop-blur-md transition-all shadow-md hover:scale-105 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 sm:gap-2">
                <span className="px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-background/90 backdrop-blur-md border border-border text-foreground flex items-center gap-1.5 shadow-sm">
                  {isAndroid && <Smartphone className="w-3 h-3 text-primary" />}
                  {isWeb && <Globe className="w-3 h-3 text-primary" />}
                  {isGame && <Gamepad2 className="w-3 h-3 text-primary" />}
                  {project.category}
                </span>
                {project.status && (
                  <span
                    className={`px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold border backdrop-blur-md shadow-sm ${
                      project.status.toLowerCase() === "completed"
                        ? "bg-primary/15 text-primary border-primary/30"
                        : "bg-secondary text-muted-foreground border-border"
                    }`}
                  >
                    {project.status}
                  </span>
                )}
              </div>

              {/* Project Mockup Visual Image */}
              <img
                src={project.image || project.thumbnail || "/projects/default-project.svg"}
                alt={project.title}
                className="w-full h-full object-contain p-2 sm:p-3"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/projects/default-project.svg";
                }}
              />
            </div>

            {/* 2. Scrollable Middle Body */}
            <div ref={contentRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1.5">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Key Architectural Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Key Architecture & Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-secondary/50 border border-border/60 text-xs text-foreground/90 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies Stack Matrix */}
              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary" /> Technologies & Frameworks
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tech) => {
                    const iconKey = tech.toLowerCase().replace(/[^a-z0-9]/g, "");
                    const iconEntry = Object.entries(TECH_ICONS).find(([k]) =>
                      k.includes(iconKey) || iconKey.includes(k)
                    )?.[1];
                    const IconComponent = iconEntry?.Icon;
                    const brandColor = iconEntry?.color || "#F95738";

                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary border border-border text-xs font-medium text-foreground"
                      >
                        {IconComponent && (
                          <IconComponent className="w-3 h-3" style={{ color: brandColor }} />
                        )}
                        <span>{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3. Fixed Bottom Action Buttons */}
            <div className="flex-shrink-0 p-3.5 sm:p-4 border-t border-border bg-card/95 flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {project.demoUrl && project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm"
                  >
                    <span>{isAndroid ? "View on Google Play" : "Open Live Demo"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold text-xs transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => {
                  sound.click();
                  onClose();
                }}
                className="px-4 py-2 rounded-full text-muted-foreground hover:text-foreground text-xs font-medium transition-colors ml-auto"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
