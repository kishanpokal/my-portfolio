import {
  ArrowUp,
  Linkedin,
  Instagram,
  Github,
  Mail,
  Phone,
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

  const contactInfo = [
    { icon: <Mail size={16} />, text: "kishanpokal1111@gmail.com", href: "mailto:kishanpokal1111@gmail.com" },
    { icon: <Phone size={16} />, text: "+91 7016781763", href: "tel:+917016781763" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="px-4 sm:px-6 py-10 pb-nav">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="glass bg-card/60 dark:bg-card/50 rounded-2xl p-6 sm:p-8 border border-border/50 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Branding */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">KISHAN</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Android & AI developer creating meaningful applications and solving real-world problems.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={itemVariants}>
              <h4 className="text-foreground font-medium mb-4 text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors duration-300 text-sm text-muted-foreground"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="text-foreground font-medium mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-2.5 text-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-muted-foreground mt-0.5">{info.icon}</span>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="hover:text-primary transition-colors duration-300 text-muted-foreground break-all"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{info.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Back to top */}
            <motion.div variants={itemVariants} className="flex flex-col justify-between">
              <div>
                <h4 className="text-foreground font-medium mb-4 text-sm uppercase tracking-wider">Portfolio</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Built with React, TailwindCSS & Framer Motion
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            className="mt-8 pt-6 border-t border-border/40 flex flex-col items-center text-xs text-muted-foreground space-y-3 sm:space-y-0 sm:flex-row sm:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <p>© {currentYear} Kishan Pokal. All rights reserved.</p>
            </div>

            <div className="flex items-center space-x-4">
              <motion.a
                href="#hero"
                aria-label="Back to top"
                className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp size={16} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};