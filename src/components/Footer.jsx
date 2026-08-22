import React from "react";
import { ArrowUp, Linkedin, Github, Instagram, Mail, Box, ArrowUpRight } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/kishanpokal956/", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/KishanPokal", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/kishan._.pokal/", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Approach", href: "#approach" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border pt-16 pb-12 px-4 sm:px-6 relative">
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 sm:gap-12 pb-14 border-b border-border/60">
          {/* Col 1: Branding & Photo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/40 p-0.5 shadow-sm bg-card">
                <img
                  src="/profile-logo.png"
                  alt="Kishan Pokal"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = "/profile-logo.svg";
                  }}
                />
              </div>
              <span className="font-bold text-base tracking-tight text-foreground">
                Kishan Pokal
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Android & AI/ML engineer crafting intelligent architectures, native mobile applications, and immersive 3D experiences.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                All systems operational • Ready for new challenges
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
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect & 3D Portfolio */}
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Interactive & Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://kishanpokal-3d.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.click()}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-semibold"
                >
                  <Box className="w-4 h-4" />
                  <span>3D Interactive Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:kishanpokal1111@gmail.com"
                  onClick={() => sound.hover()}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
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
                        className="p-2 rounded-xl bg-secondary border border-border/80 text-muted-foreground hover:text-foreground transition-colors"
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
          <p>© {currentYear} Kishan Pokal. Designed & Engineered with precision.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 border border-border/80 text-foreground transition-all hover:scale-105 active:scale-95"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;