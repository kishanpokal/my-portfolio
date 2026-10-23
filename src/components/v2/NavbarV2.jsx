import React, { useState } from "react";
import { Sun, Moon, Github, Menu, X, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const NavbarV2 = ({ theme, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "GitHub", href: "#github" },
    { label: "About", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
  ];

  const handleSoundToggle = () => {
    const active = sound.toggle();
    setSoundEnabled(active);
  };

  const handleLinkClick = () => {
    sound.click();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-2.5 sm:top-4 z-50 px-3 sm:px-4 md:px-6">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1280px] items-center justify-between rounded-sm border border-[#11111118] dark:border-white/10 bg-[#f2f0ec]/90 dark:bg-background/95 px-3 sm:px-4 py-2 sm:py-2.5 backdrop-blur-md shadow-xs"
      >
        {/* Brand */}
        <a
          href="#top"
          onClick={handleLinkClick}
          className="headline text-lg sm:text-xl font-bold tracking-tight text-[#111111] dark:text-foreground flex items-center gap-1 group"
        >
          <span>Kishan</span>
          <span className="text-[#ff5a1f] inline-block transition-transform duration-200 group-hover:scale-125">.</span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="label-mono flex items-center gap-1.5 text-[#5a5a54] dark:text-muted-foreground font-semibold transition-colors duration-200 hover:text-[#111111] dark:hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/KishanPokal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.click()}
              className="label-mono flex items-center gap-1.5 text-[#5a5a54] dark:text-muted-foreground font-semibold transition-colors duration-200 hover:text-[#111111] dark:hover:text-foreground"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
              <span className="text-[10px] text-muted-foreground/60">↗</span>
            </a>
          </li>
        </ul>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Audio Feedback Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            aria-label={soundEnabled ? "Disable UI sounds" : "Enable UI sounds"}
            title={soundEnabled ? "Sound: ON" : "Sound: OFF"}
            className="group relative flex h-9 w-9 items-center justify-center rounded-sm border border-[#1111111c] dark:border-border bg-white dark:bg-background text-[#111111] dark:text-foreground transition-all duration-200 hover:border-[#ff5a1f] hover:text-[#ff5a1f] shadow-2xs"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-[#ff5a1f]" />
            ) : (
              <VolumeX className="h-4 w-4 text-[#71716b] dark:text-muted-foreground" />
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => {
              sound.toggleTheme();
              onToggleTheme();
            }}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`THEME: ${theme.toUpperCase()}`}
            className="group relative flex h-9 w-9 items-center justify-center rounded-sm border border-[#1111111c] dark:border-border bg-white dark:bg-background text-[#111111] dark:text-foreground transition-all duration-200 hover:border-[#ff5a1f] hover:text-[#ff5a1f] shadow-2xs"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 transition-transform duration-200 group-hover:rotate-45 text-[#ff5a1f]" />
            ) : (
              <Moon className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12 text-[#111111]" />
            )}
          </button>

          {/* Connect Action Button */}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="label-mono hidden sm:inline-flex items-center gap-1.5 rounded-sm bg-[#111111] dark:bg-foreground px-4 py-2 font-bold text-[#f2f0ec] dark:text-background transition-colors duration-200 hover:bg-[#ff5a1f] hover:text-black shadow-xs"
          >
            <span>Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.click();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-[#1111111c] dark:border-border text-[#111111] dark:text-foreground lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-[1280px] rounded-sm border border-[#11111118] dark:border-border bg-[#f2f0ec]/98 dark:bg-background/98 p-4 sm:p-5 backdrop-blur-xl shadow-2xl lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col divide-y divide-[#11111110] dark:divide-white/5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="label-mono flex items-center justify-between py-3 text-xs sm:text-sm font-semibold text-[#5a5a54] dark:text-muted-foreground transition-colors hover:text-[#ff5a1f] dark:hover:text-foreground"
                >
                  <span>{link.label}</span>
                  <span className="text-[#ff5a1f] text-xs">→</span>
                </a>
              </li>
            ))}
            <li className="pt-3.5 flex items-center justify-between gap-3">
              <a
                href="https://github.com/KishanPokal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="label-mono flex items-center gap-1.5 text-xs font-semibold text-[#5a5a54] dark:text-muted-foreground hover:text-[#111111] dark:hover:text-foreground"
              >
                <Github className="w-4 h-4 text-[#ff5a1f]" />
                <span>GitHub ↗</span>
              </a>
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="label-mono rounded-sm bg-[#111111] dark:bg-foreground px-4 py-2 text-xs font-bold text-[#f2f0ec] dark:text-background hover:bg-[#ff5a1f] hover:text-black transition-colors"
              >
                Connect ↗
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
