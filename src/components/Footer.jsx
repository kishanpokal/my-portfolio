import React from "react";
import { ArrowUp, Linkedin, Github, Instagram, Mail } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/kishanpokal956/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/KishanPokal", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/kishan._.pokal/", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Overview", href: "#hero" },
    { name: "Featured Projects", href: "#projects" },
    { name: "Development Process", href: "#approach" },
    { name: "Technical Skills", href: "#skills" },
    { name: "About Me", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="dark:bg-[#0A0D14] bg-slate-100/80 border-t dark:border-white/10 border-slate-200 pt-16 pb-12 px-4 sm:px-6 relative transition-colors duration-200">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 pb-14 border-b dark:border-white/10 border-slate-200">
          {/* Col 1: Branding & Photo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-sky-400/50 p-0.5 shadow-sm dark:bg-[#111622] bg-white">
                <img
                  src="/profile-logo.png"
                  alt="Kishan Pokal"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = "/profile-logo.svg";
                  }}
                />
              </div>
              <div>
                <span className="font-bold text-base tracking-tight text-foreground block">
                  Kishan Pokal
                </span>
                <span className="text-[11px] font-mono text-sky-600 dark:text-sky-400 font-semibold">
                  Android &amp; AI Developer
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Android and software developer building native mobile apps with Kotlin &amp; Compose, machine learning models, and 3D games.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                Open for Android &amp; Software Engineering roles
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => sound.hover()}
                    className="text-sm text-muted-foreground hover:text-sky-500 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect */}
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Get in Touch
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:kishanpokal1111@gmail.com"
                  onClick={() => sound.hover()}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-sky-500 transition-colors break-all font-mono"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 text-sky-500" />
                  <span>kishanpokal1111@gmail.com</span>
                </a>
              </li>
              <li>
                <div className="flex gap-2.5 pt-2">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.click()}
                        aria-label={social.label}
                        className="p-2.5 rounded-xl dark:bg-white/5 bg-white hover:bg-slate-50 dark:hover:bg-white/10 border dark:border-white/10 border-slate-200 text-muted-foreground hover:text-foreground shadow-xs transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Kishan Pokal. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full dark:bg-white/5 bg-white hover:bg-slate-50 dark:hover:bg-white/10 border dark:border-white/10 border-slate-200 text-foreground transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-sky-500" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;