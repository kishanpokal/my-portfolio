import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ChevronDown, Mail } from "lucide-react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CUSTOM 3D HERO ANIMATION
   - Interactive mouse parallax
   - Glassmorphic ID card
   - Floating code window
   - Glowing elements tailored for Kishan Pokal
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CustomHeroAnimation = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [12, -12]), { stiffness: 60, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-12, 12]), { stiffness: 60, damping: 20 });
  const x = useSpring(useTransform(mouseX, [-400, 400], [-25, 25]), { stiffness: 60, damping: 20 });
  const y = useSpring(useTransform(mouseY, [-400, 400], [-25, 25]), { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[450px] aspect-square flex items-center justify-center mx-auto" style={{ perspective: "1200px" }}>
      {/* Soft background glow tied to the animation */}
      <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        style={{ rotateX, rotateY, x, y }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Main Floating Profile Card */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
          className="absolute z-10 w-[280px] sm:w-[320px] rounded-3xl border border-border/50 bg-card/90 backdrop-blur-2xl p-6 shadow-2xl flex flex-col items-center gap-5"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border border-primary/30 p-1 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent rounded-full animate-spin-slow" />
            <div className="w-full h-full rounded-full bg-secondary overflow-hidden relative z-10">
               <img src="/profile-logo.png" alt="Kishan Pokal" className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Kishan+Pokal&background=1C1C1F&color=C8A2FF&size=128" }} />
            </div>
          </div>
          
          <div className="text-center w-full">
            <h3 className="font-serif text-3xl text-foreground mb-1">Kishan Pokal</h3>
            <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-400">
              Software Engineer
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-border/80 to-transparent my-1" />
          
          <div className="flex gap-2 justify-center w-full flex-wrap">
            {['Kotlin', 'React', 'Python', 'AI/ML'].map((tech) => (
              <span key={tech} className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-secondary/60 text-secondary-foreground border border-border/30">
                {tech}
              </span>
            ))}
          </div>

          {/* Floating Status Pill (Attached to Card) */}
          <motion.div
            animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
            transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -left-4 sm:-left-8 rounded-2xl border border-primary/20 bg-card/95 backdrop-blur-xl px-4 py-3 shadow-xl z-20 flex items-center gap-3"
          >
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </div>
            <p className="text-xs font-semibold text-foreground tracking-wide">Available for work</p>
          </motion.div>
        </motion.div>

        {/* Floating Code Snippet Window */}
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
          className="absolute -top-[5%] -right-[20%] sm:-right-[30%] lg:-right-[35%] w-[240px] rounded-xl border border-border/40 bg-card/95 backdrop-blur-xl p-4 shadow-2xl z-20"
        >
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed text-muted-foreground">
            <p><span className="text-pink-400">const</span> <span className="text-blue-400">developer</span> = {'{'}</p>
            <p className="pl-4">name: <span className="text-green-300">'Kishan Pokal'</span>,</p>
            <p className="pl-4">role: <span className="text-green-300">'AI/ML & App Dev'</span>,</p>
            <p className="pl-4">coffee: <span className="text-orange-300">true</span></p>
            <p>{'}'};</p>
          </div>
        </motion.div>


        {/* Decorative elements */}
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-[10%] left-[10%] text-primary/30"
        >
           ✦
        </motion.div>
        <motion.div 
           animate={{ rotate: -360 }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute bottom-[10%] right-[10%] text-pink-400/30 text-2xl"
        >
           ✧
        </motion.div>

      </motion.div>
    </div>
  );
};


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO SECTION
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background"
    >
      <div className="container max-w-7xl mx-auto w-full relative z-10 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left — Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Status badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/8 border border-primary/15 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-medium text-primary/90">
                Open to Opportunities
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.25rem] text-foreground leading-[1.05] tracking-tight mb-6"
            >
              I craft intelligent
              <br />
              <span className="text-gradient">
                systems
              </span>{" "}
              that{" "}
              <span className="italic text-foreground/90">matter.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground font-medium mb-3"
            >
              Kishan Pokal — AI/ML Engineer & Developer
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Computer Science graduate from Gujarat University, building
              performant Android apps and AI-powered experiences that solve real
              problems.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <motion.a
                href="#projects"
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm
                           bg-gradient-to-r from-primary via-[#A78BFA] to-[#E879F9]
                           text-white shadow-lg shadow-primary/25
                           hover:shadow-xl hover:shadow-primary/40
                           transition-shadow duration-300
                           w-full sm:w-auto justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </motion.a>

              <motion.a
                href="#contact"
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm
                           border border-border/80 text-foreground
                           hover:border-primary/40 hover:bg-primary/5
                           transition-all duration-300
                           w-full sm:w-auto justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Get In Touch
                <Mail size={16} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — Custom 3D Animation */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center w-full lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          >
            <CustomHeroAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-[11px] uppercase tracking-widest font-medium">
            Scroll
          </span>
          <ChevronDown size={18} />
        </motion.a>
      </motion.div>
    </section>
  );
};