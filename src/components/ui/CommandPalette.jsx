import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  Cpu,
  User,
  Mail,
  FileText,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  ExternalLink,
  Copy,
  Check,
  X,
  ArrowRight,
  Sparkles,
  Box,
} from "lucide-react";
import { projects } from "@/data/projects";
import { sound } from "@/lib/SoundEngine";
import { useToast } from "@/hooks/use-toast";

export const CommandPalette = ({ isOpen, onClose, onToggleTheme, isDark }) => {
  const [query, setQuery] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());
  const inputRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      sound.commandOpen();
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    sound.click();
    navigator.clipboard.writeText("kishanpokal1111@gmail.com");
    setCopiedEmail(true);
    toast({
      title: "Email copied! 📋",
      description: "kishanpokal1111@gmail.com copied to clipboard.",
    });
    setTimeout(() => {
      setCopiedEmail(false);
      onClose();
    }, 1200);
  };

  const handleToggleSound = () => {
    const res = sound.toggle();
    setSoundEnabled(res);
    toast({
      title: res ? "Sound effects enabled 🔊" : "Sound effects muted 🔇",
    });
  };

  const navigationItems = [
    { name: "Home / Overview", href: "#hero", icon: Sparkles, desc: "Go to hero & overview" },
    { name: "About & Engineering Journey", href: "#about", icon: User, desc: "Read bio, background & timeline" },
    { name: "Skills & Tech Matrix", href: "#skills", icon: Cpu, desc: "Explore technologies & tools" },
    { name: "Engineering Approach & Architecture", href: "#approach", icon: Sparkles, desc: "AI pipelines & Android architecture" },
    { name: "Selected Works & Projects", href: "#projects", icon: FolderGit2, desc: "View all apps & case studies" },
    { name: "Contact & Collaboration", href: "#contact", icon: Mail, desc: "Send a direct message" },
  ];

  const actions = [
    {
      name: "Launch 3D Interactive Portfolio",
      desc: "Explore virtual interactive universe",
      icon: Box,
      href: "https://kishanpokal-3d.vercel.app/",
      external: true,
    },
    {
      name: "Copy Email Address",
      desc: "kishanpokal1111@gmail.com",
      icon: copiedEmail ? Check : Copy,
      onClick: handleCopyEmail,
    },
    {
      name: "Download Resume",
      desc: "Open PDF in new tab",
      icon: FileText,
      href: "/Kishan_resume.pdf",
      external: true,
    },
    {
      name: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
      desc: isDark ? "Daylight Architectural Studio" : "Titanium & Solar Flame Luxe",
      icon: isDark ? Sun : Moon,
      onClick: () => {
        sound.toggleTheme();
        onToggleTheme();
        onClose();
      },
    },
    {
      name: soundEnabled ? "Mute UI Sound Effects" : "Enable UI Sound Effects",
      desc: soundEnabled ? "Turn off audio feedback" : "Turn on delicate synth feedback",
      icon: soundEnabled ? VolumeX : Volume2,
      onClick: handleToggleSound,
    },
    {
      name: "GitHub Profile",
      desc: "github.com/KishanPokal",
      icon: ExternalLink,
      href: "https://github.com/KishanPokal",
      external: true,
    },
    {
      name: "LinkedIn Profile",
      desc: "linkedin.com/in/kishanpokal956",
      icon: ExternalLink,
      href: "https://www.linkedin.com/in/kishanpokal956/",
      external: true,
    },
  ];

  const filteredNav = navigationItems.filter(
    (i) => i.name.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredActions = actions.filter(
    (a) => a.name.toLowerCase().includes(query.toLowerCase()) || a.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectNav = (href) => {
    sound.click();
    onClose();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden flex items-start justify-center pt-20 sm:pt-24 pb-12 px-4">
          {/* Backdrop (Crisp light blur in daylight mode, obsidian in dark mode) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#141418] border border-[#E2DBD0] dark:border-[#2B2B36] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh] my-auto"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-5 py-4 border-b border-[#E2DBD0] dark:border-[#2B2B36] bg-[#FAF8F5] dark:bg-[#181820] gap-3">
              <Search className="w-5 h-5 text-[#6B655D] dark:text-[#94918C] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, 3D portfolio, project, or skill..."
                className="w-full bg-transparent text-[#1A1918] dark:text-[#F4F3F1] placeholder:text-[#6B655D] dark:placeholder:text-[#94918C] text-base focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-[#6B655D] dark:text-[#94918C] hover:text-[#1A1918] dark:hover:text-[#F4F3F1]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex text-[10px] font-mono font-semibold px-2 py-1 rounded bg-[#EBE5DB] dark:bg-[#24242C] text-[#6B655D] dark:text-[#94918C] border border-[#E2DBD0] dark:border-[#2B2B36]">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-3.5 space-y-4 max-h-[60vh] bg-white dark:bg-[#141418]">
              {/* Navigation Group */}
              {filteredNav.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B655D] dark:text-[#94918C]">
                    Navigation
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredNav.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleSelectNav(item.href)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-[#F1ECE4] dark:hover:bg-[#1C1C22] text-[#1A1918] dark:text-[#F4F3F1] transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-[#F95738]/10 dark:bg-[#FF6B4A]/15 text-[#F95738] dark:text-[#FF6B4A]">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1A1918] dark:text-[#F4F3F1]">{item.name}</p>
                            <p className="text-xs text-[#6B655D] dark:text-[#94918C]">{item.desc}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#6B655D] dark:text-[#94918C] group-hover:text-[#F95738] dark:group-hover:text-[#FF6B4A] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Group */}
              {filteredProjects.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B655D] dark:text-[#94918C]">
                    Projects ({filteredProjects.length})
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredProjects.slice(0, 4).map((p) => (
                      <button
                        key={p.title}
                        onClick={() => handleSelectNav("#projects")}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-[#F1ECE4] dark:hover:bg-[#1C1C22] text-[#1A1918] dark:text-[#F4F3F1] transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-[#10B981]/15 text-[#10B981]">
                            <FolderGit2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1A1918] dark:text-[#F4F3F1]">{p.title}</p>
                            <p className="text-xs text-[#6B655D] dark:text-[#94918C]">{p.category} • {p.tags.slice(0, 3).join(", ")}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-[#EBE5DB] dark:bg-[#24242C] text-[#6B655D] dark:text-[#94918C] border border-[#E2DBD0] dark:border-[#2B2B36]">
                          {p.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Group */}
              {filteredActions.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B655D] dark:text-[#94918C]">
                    Quick Actions
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredActions.map((action) => {
                      if (action.href) {
                        return (
                          <a
                            key={action.name}
                            href={action.href}
                            target={action.external ? "_blank" : undefined}
                            rel={action.external ? "noopener noreferrer" : undefined}
                            onClick={() => {
                              sound.click();
                              onClose();
                            }}
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-[#F1ECE4] dark:hover:bg-[#1C1C22] text-[#1A1918] dark:text-[#F4F3F1] transition-colors text-left group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl bg-[#EBE5DB] dark:bg-[#24242C] text-[#1A1918] dark:text-[#F4F3F1]">
                                <action.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-[#1A1918] dark:text-[#F4F3F1]">{action.name}</p>
                                <p className="text-xs text-[#6B655D] dark:text-[#94918C]">{action.desc}</p>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-[#6B655D] dark:text-[#94918C] group-hover:text-[#1A1918] dark:group-hover:text-[#F4F3F1] transition-colors" />
                          </a>
                        );
                      }
                      return (
                        <button
                          key={action.name}
                          onClick={action.onClick}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-[#F1ECE4] dark:hover:bg-[#1C1C22] text-[#1A1918] dark:text-[#F4F3F1] transition-colors text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-[#EBE5DB] dark:bg-[#24242C] text-[#1A1918] dark:text-[#F4F3F1]">
                              <action.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-[#1A1918] dark:text-[#F4F3F1]">{action.name}</p>
                              <p className="text-xs text-[#6B655D] dark:text-[#94918C]">{action.desc}</p>
                            </div>
                          </div>
                          <span className="text-xs text-[#F95738] dark:text-[#FF6B4A] font-bold">Execute</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="px-5 py-3 border-t border-[#E2DBD0] dark:border-[#2B2B36] bg-[#FAF8F5] dark:bg-[#101014] flex items-center justify-between text-xs text-[#6B655D] dark:text-[#94918C]">
              <div className="flex items-center gap-4">
                <span>Navigation &amp; Actions</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Press ESC to dismiss</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-[#F95738] dark:text-[#FF6B4A]">Kishan Pokal</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
