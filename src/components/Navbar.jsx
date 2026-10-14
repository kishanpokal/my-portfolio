import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search, Volume2, VolumeX, FileText, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/SoundEngine";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#approach" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = ({ onOpenCommandPalette, theme, onToggleTheme, isModalOpen }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(sound.isEnabled());

  useEffect(() => {
    const sectionIds = ["hero", "projects", "approach", "skills", "about", "contact"];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      const scrollPosition = currentScrollY + window.innerHeight * 0.35;
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const active = sound.toggle();
    setSoundActive(active);
  };

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isModalOpen ? -100 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6",
          isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-md" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo with Avatar */}
          <a
            href="#hero"
            onClick={() => sound.click()}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-sky-400/50 p-0.5 shadow-sm group-hover:scale-105 transition-transform dark:bg-[#111622] bg-white">
              <img
                src="/profile-logo.png"
                alt="Kishan Pokal"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/profile-logo.svg";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-foreground group-hover:text-sky-400 transition-colors flex items-center gap-1.5">
                Kishan Pokal
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-muted-foreground hidden sm:block">
                Android &amp; AI Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Sky Blue Active Pill */}
          <nav className="hidden md:flex items-center p-1.5 rounded-full dark:bg-[#111622]/80 bg-white/90 border border-slate-200 dark:border-white/10 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => sound.hover()}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-semibold transition-all rounded-full flex items-center gap-1.5",
                    isActive
                      ? "text-[#0A0D14] font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-sky-400 rounded-full shadow-md shadow-sky-500/25"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[#0A0D14] animate-pulse" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Tools Cluster: Search + Sound + Theme + Resume */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Command Trigger */}
            <button
              onClick={() => {
                sound.click();
                onOpenCommandPalette();
              }}
              aria-label="Open Command Palette"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full dark:bg-[#111622]/80 bg-white hover:bg-slate-100 dark:hover:bg-[#161D2D] border border-slate-200 dark:border-white/10 text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm group"
            >
              <Search className="w-3.5 h-3.5 group-hover:text-sky-400 transition-colors" />
              <span className="hidden xl:inline text-[11px]">Search</span>
              <kbd className="hidden sm:inline-flex text-[9px] font-mono px-1.5 py-0.5 rounded dark:bg-black/40 bg-slate-100 text-muted-foreground border border-slate-200 dark:border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Sound Toggle (Desktop) */}
            <button
              onClick={handleSoundToggle}
              aria-label={soundActive ? "Mute audio" : "Enable audio"}
              className="hidden sm:flex p-2 rounded-full dark:bg-[#111622]/80 bg-white hover:bg-slate-100 dark:hover:bg-[#161D2D] border border-slate-200 dark:border-white/10 text-muted-foreground hover:text-foreground transition-colors shadow-sm"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-sky-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={() => {
                sound.toggleTheme();
                onToggleTheme();
              }}
              aria-label="Toggle theme"
              className="p-2 rounded-full dark:bg-[#111622]/80 bg-white hover:bg-slate-100 dark:hover:bg-[#161D2D] border border-slate-200 dark:border-white/10 text-foreground transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-sky-400" />
                ) : (
                  <Moon className="w-4 h-4 text-sky-500" />
                )}
              </motion.div>
            </button>

            {/* Resume Button */}
            <a
              href="/Kishan_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-sky-400 text-[#0A0D14] text-xs font-bold hover:bg-sky-300 shadow-md shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                sound.click();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle Mobile Menu"
              className="p-2 rounded-xl dark:bg-[#111622]/80 bg-white border border-slate-200 dark:border-white/10 text-foreground md:hidden transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl md:hidden pt-20 px-6 pb-8 flex flex-col justify-between"
          >
            <div className="space-y-4 pt-4">
              <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground px-2">
                Navigation
              </p>
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => {
                        sound.click();
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-2xl text-base font-bold transition-all",
                        isActive
                          ? "bg-sky-400 text-[#0A0D14] shadow-md shadow-sky-500/20"
                          : "text-foreground hover:bg-white/5"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {isActive && <span className="w-2 h-2 rounded-full bg-[#0A0D14] animate-pulse" />}
                        <span>{link.name}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-70" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    handleSoundToggle();
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl dark:bg-white/5 bg-slate-100 border border-slate-200 dark:border-white/10 text-foreground text-xs font-medium"
                >
                  {soundActive ? <Volume2 className="w-4 h-4 text-sky-400" /> : <VolumeX className="w-4 h-4" />}
                  <span>{soundActive ? "Sound ON" : "Sound OFF"}</span>
                </button>
                <button
                  onClick={() => {
                    onToggleTheme();
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl dark:bg-white/5 bg-slate-100 border border-slate-200 dark:border-white/10 text-foreground text-xs font-medium"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4 text-sky-400" /> : <Moon className="w-4 h-4 text-sky-500" />}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>

              <a
                href="/Kishan_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-sky-400 text-[#0A0D14] font-bold text-sm shadow-lg shadow-sky-500/25"
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
