import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Smartphone, Github, CheckCircle2, Cpu, Database, Layers } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const ProjectModalV2 = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sound.click();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl overflow-hidden rounded-sm border border-white/20 bg-[#0e1017] text-[#f2f0ec] shadow-2xl p-4 sm:p-8 max-h-[92vh] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 sm:pb-5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="label-mono text-[11px] sm:text-xs text-[#8a8a85]">{project.category}</span>
              <span className={`label-mono text-[10px] flex items-center gap-1.5 ${project.statusColor}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {project.status}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="rounded-sm border border-white/10 p-1.5 text-[#8a8a85] transition-colors hover:border-[#ff5a1f] hover:text-[#ff5a1f]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header */}
          <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="headline text-2xl uppercase tracking-tight text-white sm:text-4xl">
                {project.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#a0a09b] max-w-xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.primaryLink && (
              <a
                href={project.primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono inline-flex items-center justify-center gap-2 rounded-sm bg-[#ff5a1f] px-5 py-3 text-xs sm:text-sm font-bold text-black transition-transform hover:scale-105 shrink-0 w-full sm:w-auto"
              >
                <span>{project.primaryLink.label}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Architectural Breakdown Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-[#ff5a1f]">
                <Layers className="w-4 h-4" />
                <span className="label-mono text-[10px] text-white">Architecture</span>
              </div>
              <p className="mt-2 text-xs text-[#c4c4be]">
                Clean MVVM with Unidirectional Data Flow (UDF), Kotlin Coroutines &amp; StateFlow.
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-[#ff5a1f]">
                <Database className="w-4 h-4" />
                <span className="label-mono text-[10px] text-white">Storage &amp; Sync</span>
              </div>
              <p className="mt-2 text-xs text-[#c4c4be]">
                Offline-first Room SQLite with atomic migrations and background Firebase syncing.
              </p>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-[#ff5a1f]">
                <Cpu className="w-4 h-4" />
                <span className="label-mono text-[10px] text-white">Performance</span>
              </div>
              <p className="mt-2 text-xs text-[#c4c4be]">
                Zero crash rate in production, sub-50ms cold startup, minimal memory footprint.
              </p>
            </div>
          </div>

          {/* Deep Highlights List */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <h4 className="label-mono text-xs font-bold text-white mb-4">
              Engineering Highlights &amp; Solved Challenges
            </h4>
            <ul className="space-y-3 text-xs text-[#a0a09b] leading-relaxed">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff5a1f] shrink-0 mt-0.5" />
                  <span className="text-[#c4c4be]">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology Badges */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="label-mono rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-[#c4c4be]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
