import {
  ArrowUp,
  Linkedin,
  Instagram,
  Github,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/kishanpokal956/", label: "LinkedIn" },
    { icon: <Instagram size={18} />, href: "https://www.instagram.com/kishan._.pokal/", label: "Instagram" },
    { icon: <Github size={18} />, href: "https://github.com/KishanPokal", label: "GitHub" },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-serif text-foreground tracking-tight mb-2">Kishan Pokal</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Android & AI/ML engineer creating meaningful applications and solving real-world problems.
              </p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2"
                  whileHover={{ y: -2 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:ml-auto">
            <h4 className="text-foreground font-medium text-sm mb-6">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href={link.href}
                    className="inline-block text-muted-foreground hover:text-foreground transition-colors text-sm"
                    whileHover={{ x: 4 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="md:ml-auto">
            <h4 className="text-foreground font-medium text-sm mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <motion.a
                  href="mailto:kishanpokal1111@gmail.com"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                  whileHover={{ x: 4 }}
                >
                  <Mail size={16} />
                  <span>kishanpokal1111@gmail.com</span>
                </motion.a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Kishan Pokal. All rights reserved.</p>
          
          <motion.a
            href="#hero"
            aria-label="Back to top"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors p-2"
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};