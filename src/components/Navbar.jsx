import { useEffect, useState, useRef } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Github,
  Linkedin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Contact", href: "#contact", icon: Mail },
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative p-2.5 rounded-xl transition-all duration-300",
        "bg-background/60 border border-border/50",
        "hover:bg-primary/10 hover:border-primary/30",
        "text-foreground"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Toggle theme"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: -90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState("#hero");
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const lastScrollYRef = useRef(0);
  const audioRef = useRef(null);

  const musicUrl = "/music.mp3";

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.preload = "auto";

      const handleCanPlay = () => setIsAudioReady(true);
      audioRef.current.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("canplaythrough", handleCanPlay);
          audioRef.current = null;
        }
      };
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !isAudioReady) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }

    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Auto-hide on fast scroll down, show on scroll up
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 300) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollYRef.current = currentScrollY;

      // Active section detection
      const sections = navItems.map((item) => item.href);
      const scrollPosition = currentScrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.querySelector(sections[i]);
        if (element) {
          const offsetTop = element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Right Quick Actions */}
      <motion.div
        className="fixed top-4 right-4 z-40 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* GitHub */}
        <motion.a
          href="https://github.com/KishanPokal"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2.5 rounded-xl glass",
            "bg-background/70 dark:bg-background/60",
            "text-foreground hover:text-primary",
            "border border-border/50 hover:border-primary/30",
            "shadow-sm hover:shadow-md",
            "transition-all duration-300"
          )}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          title="GitHub Profile"
          aria-label="GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://www.linkedin.com/in/kishanpokal956/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2.5 rounded-xl glass",
            "bg-background/70 dark:bg-background/60",
            "text-blue-600 dark:text-blue-400 hover:text-blue-500",
            "border border-border/50 hover:border-blue-400/30",
            "shadow-sm hover:shadow-md",
            "transition-all duration-300"
          )}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          title="LinkedIn Profile"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4" />
        </motion.a>

        {/* Music */}
        <motion.button
          onClick={toggleMusic}
          disabled={!isAudioReady}
          className={cn(
            "p-2.5 rounded-xl glass",
            "bg-background/70 dark:bg-background/60",
            "text-foreground hover:text-primary",
            "border border-border/50 hover:border-primary/30",
            "shadow-sm hover:shadow-md",
            "transition-all duration-300",
            !isAudioReady && "opacity-40 cursor-not-allowed"
          )}
          whileHover={{ scale: isAudioReady ? 1.1 : 1, y: isAudioReady ? -2 : 0 }}
          whileTap={{ scale: isAudioReady ? 0.9 : 1 }}
          title={
            isAudioReady
              ? isMusicPlaying
                ? "Pause music"
                : "Play music"
              : "Loading music..."
          }
          aria-label={
            isAudioReady
              ? isMusicPlaying
                ? "Pause music"
                : "Play music"
              : "Loading music"
          }
        >
          {isMusicPlaying ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </motion.button>
      </motion.div>

      {/* ===== BOTTOM NAVIGATION BAR ===== */}
      <motion.nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "flex justify-center",
          "pb-[env(safe-area-inset-bottom,0px)]",
          "pointer-events-none"
        )}
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: showNavbar ? 0 : 100,
          opacity: showNavbar ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div
          className={cn(
            "pointer-events-auto",
            "mx-4 mb-4 sm:mb-5",
            "flex items-center gap-1",
            "px-2 py-2 sm:px-3 sm:py-2.5",
            "rounded-2xl",
            "glass",
            "bg-white/90 dark:bg-gray-900/80",
            "border border-gray-200/80 dark:border-gray-700/50",
            "shadow-[0_4px_24px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
            "transition-colors duration-300"
          )}
        >
          {/* Navigation Items */}
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={cn(
                  "relative flex flex-col items-center justify-center",
                  "min-w-[3rem] sm:min-w-[3.5rem] py-1.5 px-2 sm:px-3",
                  "rounded-xl",
                  "transition-all duration-300",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                aria-label={item.name}
              >
                {/* Active Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn(
                      "absolute inset-0 rounded-xl",
                      "bg-primary/10 dark:bg-primary/15",
                      "border border-primary/20 dark:border-primary/25"
                    )}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <item.icon
                  className={cn(
                    "relative z-10 w-[18px] h-[18px] sm:w-5 sm:h-5",
                    "transition-all duration-300",
                    isActive && "text-primary"
                  )}
                />
                <span
                  className={cn(
                    "relative z-10 text-[10px] sm:text-xs font-medium mt-0.5",
                    "transition-all duration-300",
                    isActive && "text-primary font-semibold"
                  )}
                >
                  {item.name}
                </span>
              </motion.a>
            );
          })}

          {/* Separator */}
          <div className="w-px h-8 bg-border/50 mx-1" />

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </motion.nav>
    </>
  );
};
