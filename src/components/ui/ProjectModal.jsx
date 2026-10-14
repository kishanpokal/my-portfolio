import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Smartphone,
  Gamepad2,
  Sparkles,
} from "lucide-react";
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

  const isPlayStore = project.status?.toLowerCase().includes("google play");
  const isGame = project.category?.toLowerCase().includes("game");

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
          {/* Dim Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-2xl dark:bg-[#111622] bg-white border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[86vh] overflow-hidden"
          >
            {/* Header Visual */}
            <div className="relative w-full h-40 sm:h-48 md:h-52 dark:bg-[#0A0D14] bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-200 dark:border-white/10 flex-shrink-0">
              {/* Close Button */}
              <button
                onClick={() => {
                  sound.click();
                  onClose();
                }}
                className="absolute top-3 right-3 z-30 p-2 rounded-full dark:bg-[#111622]/80 bg-white/90 hover:bg-white dark:hover:bg-[#111622] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all shadow-md hover:scale-105 active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Status Badge */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 sm:gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold dark:bg-[#111622]/90 bg-white/90 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-sm">
                  {isGame ? <Gamepad2 className="w-3 h-3 text-sky-500" /> : <Smartphone className="w-3 h-3 text-sky-500" />}
                  {project.category}
                </span>
                {project.status && (
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold border backdrop-blur-md shadow-sm ${
                      isPlayStore
                        ? "dark:bg-sky-500/20 bg-sky-50 text-sky-700 dark:text-sky-300 border-sky-500/30"
                        : "dark:bg-white/5 bg-slate-100 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10"
                    }`}
                  >
                    {project.status}
                  </span>
                )}
              </div>

              {/* Mockup Image */}
              <img
                src={project.image || "/projects/default-project.svg"}
                alt={project.title}
                className="w-full h-full object-contain p-3 sm:p-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/projects/default-project.svg";
                }}
              />
            </div>

            {/* Scrollable Body */}
            <div ref={contentRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Key Features */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500" /> Key Features &amp; Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 p-2.5 rounded-xl dark:bg-white/[0.03] bg-slate-50 border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-500" /> Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tech) => {
                    const iconKey = tech.toLowerCase().replace(/[^a-z0-9]/g, "");
                    const iconEntry = Object.entries(TECH_ICONS).find(([k]) =>
                      k.includes(iconKey) || iconKey.includes(k)
                    )?.[1];
                    const IconComponent = iconEntry?.Icon;
                    const brandColor = iconEntry?.color || "#38BDF8";

                    return (
                      <div
                        key={tech}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg dark:bg-white/5 bg-slate-100 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200"
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

            {/* Bottom Buttons */}
            <div className="flex-shrink-0 p-3.5 sm:p-4 border-t border-slate-200 dark:border-white/10 dark:bg-[#111622]/95 bg-white flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {project.demoUrl && project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-sky-400 hover:bg-sky-300 text-[#0A0D14] font-bold text-xs shadow-md shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <span>{isPlayStore ? "Open Google Play Store" : "Open Live App"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full dark:bg-white/5 bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
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
                className="px-4 py-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-medium transition-colors ml-auto"
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
