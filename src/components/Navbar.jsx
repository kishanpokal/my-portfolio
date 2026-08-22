import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Search, Volume2, VolumeX, FileText, ArrowUpRight, Sparkles, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/SoundEngine";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Approach", href: "#approach" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = ({ onOpenCommandPalette, theme, onToggleTheme, isModalOpen }) => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(sound.isEnabled());

  // Rock-solid, glitch-free Section Active & Scroll Tracking (runs at 60fps with zero listener churning)
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "approach", "projects", "contact"];

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Find current active section based on viewport position
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
    handleScroll(); // Initial check
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
          isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/80 shadow-md" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo with Real Photo Avatar */}
          <a
            href="#hero"
            onClick={() => sound.click()}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/50 p-0.5 shadow-sm group-hover:scale-105 transition-transform bg-card">
              <img
                src="/profile-logo.png"
                alt="Kishan Pokal"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.src = "/profile-logo.svg";
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                Kishan Pokal
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </span>
              <span className="text-[10px] font-mono text-muted-foreground hidden sm:block">
                AI/ML & Android Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links with Glowing Active Pill */}
          <nav className="hidden md:flex items-center p-1.5 rounded-full bg-secondary/80 border border-border backdrop-blur-md shadow-inner">
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
                      ? "text-white font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 rounded-full shadow-md shadow-orange-500/30"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Tools Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* 3D Interactive Portfolio Link Button */}
            <a
              href="https://kishanpokal-3d.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500/15 to-amber-500/15 hover:from-orange-500/25 hover:to-amber-500/25 text-primary border border-primary/40 text-xs font-bold transition-all hover:scale-105 shadow-sm"
            >
              <Box className="w-3.5 h-3.5 animate-pulse" />
              <span>3D Portfolio</span>
              <ArrowUpRight className="w-3 h-3 opacity-80" />
            </a>

            {/* Quick Command Trigger */}
            <button
              onClick={() => {
                sound.click();
                onOpenCommandPalette();
              }}
              aria-label="Open Command Palette"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground text-xs font-medium transition-all shadow-sm group"
            >
              <Search className="w-3.5 h-3.5 group-hover:text-primary transition-colors" />
              <span className="hidden xl:inline text-[11px]">Search</span>
              <kbd className="hidden sm:inline-flex text-[9px] font-mono px-1.5 py-0.5 rounded bg-card text-muted-foreground border border-border">
                ⌘K
              </kbd>
            </button>

            {/* Sound Toggle (Desktop) */}
            <button
              onClick={handleSoundToggle}
              aria-label={soundActive ? "Mute audio" : "Enable audio"}
              className="hidden sm:flex p-2 rounded-full bg-secondary/80 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-colors shadow-sm"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-primary" />
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
              className="p-2 rounded-full bg-secondary/80 hover:bg-secondary border border-border text-foreground transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-primary" />
                ) : (
                  <Moon className="w-4 h-4 text-primary" />
                )}
              </motion.div>
            </button>

            {/* Resume Button */}
            <a
              href="/Kishan_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold hover:opacity-95 shadow-md shadow-orange-500/25 transition-all hover:scale-105"
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
              className="p-2 rounded-xl bg-secondary/80 border border-border text-foreground md:hidden transition-colors"
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
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25"
                          : "text-foreground hover:bg-secondary"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                        <span>{link.name}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 opacity-70" />
                    </a>
                  );
                })}
              </div>

              {/* 3D Portfolio mobile link */}
              <a
                href="https://kishanpokal-3d.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-primary/40 text-primary font-bold text-sm"
              >
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-primary animate-pulse" />
                  <span>3D Interactive Portfolio</span>
                </div>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="space-y-3 pt-6 border-t border-border">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    handleSoundToggle();
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary text-foreground text-xs font-medium"
                >
                  {soundActive ? <Volume2 className="w-4 h-4 text-primary" /> : <VolumeX className="w-4 h-4" />}
                  <span>{soundActive ? "Sound ON" : "Sound OFF"}</span>
                </button>
                <button
                  onClick={() => {
                    onToggleTheme();
                  }}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-secondary text-foreground text-xs font-medium"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4 text-primary" /> : <Moon className="w-4 h-4 text-primary" />}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>

              <a
                href="/Kishan_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-500/25"
              >
                <FileText className="w-4 h-4" />
                <span>View Complete Resume (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
