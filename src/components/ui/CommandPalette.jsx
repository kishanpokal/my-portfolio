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
  Layers,
} from "lucide-react";
import { flagshipProjects, archivedProjects } from "@/data/projects";
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
      setCopiedEmail(false),
      onClose();
    }, 1200);
  };

  const handleToggleSound = () => {
    const res = sound.toggle();
    setSoundEnabled(res);
    toast({
      title: res ? "Sound effects turned ON 🔊" : "Sound effects turned OFF 🔇",
    });
  };

  const navigationItems = [
    { name: "Overview / Hero", href: "#hero", icon: Sparkles, desc: "Go to top intro & identity" },
    { name: "Featured Projects", href: "#projects", icon: FolderGit2, desc: "TrackEasy, Maunam & AttendMate" },
    { name: "Development Process", href: "#approach", icon: Layers, desc: "How I write code & build apps" },
    { name: "Technical Skills", href: "#skills", icon: Cpu, desc: "Languages, frameworks & tools" },
    { name: "About Me", href: "#about", icon: User, desc: "Bio, education & live IST clock" },
    { name: "Contact & Message", href: "#contact", icon: Mail, desc: "Send me a message or copy email" },
  ];

  const actions = [
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
      desc: isDark ? "Clean Daylight Studio" : "Deep Obsidian Slate",
      icon: isDark ? Sun : Moon,
      onClick: () => {
        sound.toggleTheme();
        onToggleTheme();
        onClose();
      },
    },
    {
      name: soundEnabled ? "Mute UI Sound Effects" : "Enable UI Sound Effects",
      desc: soundEnabled ? "Turn off audio feedback" : "Turn on audio feedback",
      icon: soundEnabled ? VolumeX : Volume2,
      onClick: handleToggleSound,
    },
    {
      name: "Google Play Store (TrackEasy)",
      desc: "Published production Android app",
      icon: ExternalLink,
      href: "https://play.google.com/store/apps/details?id=com.kishan.trackeasy",
      external: true,
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

  const allProjects = [...flagshipProjects, ...archivedProjects];

  const filteredNav = navigationItems.filter(
    (i) => i.name.toLowerCase().includes(query.toLowerCase()) || i.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = allProjects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(query.toLowerCase())) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-2xl dark:bg-[#111622] bg-white border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh] my-auto"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-5 py-4 border-b border-slate-200 dark:border-white/10 dark:bg-[#0A0D14] bg-slate-50 gap-3">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, skills, or quick actions..."
                className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-base focus:outline-none font-medium"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex text-[10px] font-mono font-semibold px-2 py-1 rounded dark:bg-white/5 bg-slate-200/80 text-muted-foreground border border-slate-200 dark:border-white/10">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-3.5 space-y-4 max-h-[60vh] dark:bg-[#111622] bg-white">
              {/* Navigation */}
              {filteredNav.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Navigation
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredNav.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleSelectNav(item.href)}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 text-foreground transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {filteredProjects.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Projects ({filteredProjects.length})
                  </p>
                  <div className="space-y-1 mt-1">
                    {filteredProjects.map((p) => (
                      <button
                        key={p.title}
                        onClick={() => handleSelectNav("#projects")}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 text-foreground transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                            <FolderGit2 className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{p.title}</p>
                            <p className="text-xs text-muted-foreground">{p.category}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md dark:bg-white/5 bg-sky-50 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
                          {p.status || p.year}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {filteredActions.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
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
                            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 text-foreground transition-colors text-left group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-xl dark:bg-white/5 bg-slate-100 text-foreground">
                                <action.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground">{action.name}</p>
                                <p className="text-xs text-muted-foreground">{action.desc}</p>
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-sky-500 transition-colors" />
                          </a>
                        );
                      }
                      return (
                        <button
                          key={action.name}
                          onClick={action.onClick}
                          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 text-foreground transition-colors text-left group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl dark:bg-white/5 bg-slate-100 text-foreground">
                              <action.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{action.name}</p>
                              <p className="text-xs text-muted-foreground">{action.desc}</p>
                            </div>
                          </div>
                          <span className="text-xs text-sky-600 dark:text-sky-400 font-bold">Execute</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-slate-200 dark:border-white/10 dark:bg-[#0A0D14] bg-slate-50 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span>Use keyboard or click</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">Press ESC to close</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400">Kishan Pokal</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
