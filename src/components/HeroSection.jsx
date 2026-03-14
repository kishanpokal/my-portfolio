import { ArrowDown, MousePointerClick, Sparkles, Code, Palette, Rocket, Award, Download, Calendar, Shield, Zap, Users, TrendingUp, Briefcase, Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { projects } from "@/data/projects";

// Dynamic project count — automatically updates when projects are added/removed
const PROJECT_COUNT = projects.length;

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");

  const codeSnippets = [
    "import { AndroidAIMLEngineer } from 'kishan.dev';",
    "",
    "const developer = new AndroidAIMLEngineer({",
    "  name: 'Kishan Pokal',",
    "  stack: ['Android Development', 'Artificial Intelligence', 'Java', 'Firebase', 'Python'],",
    "  focus: 'Building Android apps and AI-powered tools that solve real-world problems',",
    "  status: 'Open to internships and junior developer opportunities'",
    "});",
    "",
    "await developer.launchPortfolio();",
    "// Featured: Android Apps, AI Tools, Open Source",
    "",
    "developer.connect();",
    "console.log('🚀 Let\\'s build something exceptional together!');"
  ];

  const achievements = [
    { number: `${PROJECT_COUNT}+`, label: "Software Projects", icon: <Code className="h-3.5 w-3.5" /> },
    { number: "Android", label: "App Development", icon: <Zap className="h-3.5 w-3.5" /> },
    { number: "AI &", label: "Automation", icon: <Sparkles className="h-3.5 w-3.5" /> },
    { number: "Active", label: "Learner", icon: <Award className="h-3.5 w-3.5" /> }
  ];

  useEffect(() => {
    const currentLine = codeSnippets[currentCodeLine];
    if (displayedCode.length < currentLine.length) {
      setTimeout(() => {
        setDisplayedCode(currentLine.slice(0, displayedCode.length + 1));
      }, 30);
    } else {
      setTimeout(() => {
        if (currentCodeLine < codeSnippets.length - 1) {
          setCurrentCodeLine(prev => prev + 1);
          setDisplayedCode("");
        } else {
          setTimeout(() => {
            setCurrentCodeLine(0);
            setDisplayedCode("");
          }, 5000);
        }
      }, 800);
    }
  }, [displayedCode, currentCodeLine]);

  const handleViewResume = () => {
    window.open('/Kishan-resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/10" ref={ref}>

      {/* Background Grid + Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.08)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-primary/8 to-purple-500/8 rounded-full"
            style={{
              width: Math.random() * 80 + 30 + 'px',
              height: Math.random() * 80 + 30 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 50],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [0.08, 0.2, 0.08],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}

        <motion.div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-primary/8 to-purple-600/8 blur-[120px]" animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400/8 to-emerald-500/8 blur-[120px]" animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, delay: 2 }} />
      </div>

      <div className="container max-w-7xl mx-auto w-full mt-8 sm:mt-0">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >

          {/* Left - Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 glass-subtle"
              variants={itemVariants}
            >
              <Briefcase className="h-4 w-4" /> Open to Internship Opportunities
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
              variants={itemVariants}
            >
              <span className="block text-foreground">I'm Kishan Pokal</span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2"
                animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{ backgroundSize: '200% 100%' }}
              >
                Android & AIML Engineer
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-muted-foreground mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              I am a <span className="text-primary font-semibold">Computer Science student</span> from Gujarat University passionate about building Android applications and AI-powered tools. Currently working on projects like Smart Expense Tracker and AI assistants while exploring modern technologies such as Kotlin, Firebase, and Machine Learning.
            </motion.p>

            {/* Achievements Grid */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8"
              variants={itemVariants}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="text-center p-3 sm:p-4 rounded-xl bg-background/60 border border-border/50 glass-subtle hover:border-primary/30 transition-all duration-300 group cursor-default"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1.5">
                    <span className="text-primary group-hover:scale-110 transition-transform duration-300">{achievement.icon}</span>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">{achievement.number}</div>
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground font-medium">{achievement.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="group relative overflow-hidden px-7 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2.5"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Code className="h-4 w-4" />
                <span>View Projects</span>
                <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="#contact"
                className="group relative overflow-hidden px-7 py-3.5 rounded-xl font-semibold border border-primary/40 text-foreground hover:border-primary transition-all duration-300 bg-background/80 glass-subtle text-sm flex items-center justify-center gap-2.5"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail className="h-4 w-4" />
                <span>Get In Touch</span>
              </motion.a>

              <motion.button
                onClick={handleViewResume}
                className="group relative overflow-hidden px-6 py-3.5 rounded-xl font-semibold border border-border text-muted-foreground hover:border-primary/30 transition-all duration-300 bg-background/60 glass-subtle text-sm flex items-center justify-center gap-2"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <Download className="h-4 w-4" />
                <span>View Resume</span>
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-5 text-center lg:text-left"
              variants={itemVariants}
            >
              <div className="text-sm text-muted-foreground">
                🚀 <span className="text-primary font-semibold">Available</span> for Internships and Junior Developer Roles
              </div>
            </motion.div>
          </div>

          {/* Right - Code Terminal */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end w-full"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-md">
              <motion.div
                className="bg-background/90 border border-border/60 rounded-2xl p-6 sm:p-8 glass shadow-2xl w-full group hover:border-primary/20 transition-all duration-500"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-sm font-mono font-semibold text-muted-foreground">portfolio.js</div>
                  </div>
                  <div className="w-3 h-3 bg-green-400/20 rounded-full animate-pulse"></div>
                </div>

                {/* Code Block */}
                <div className="font-mono text-xs sm:text-sm bg-primary/5 rounded-xl border border-primary/10 min-h-[260px] flex">
                  <div className="p-4 sm:p-5 w-full">
                    <div className="grid grid-cols-1 gap-0.5 h-full content-start">
                      {codeSnippets.map((line, index) => (
                        <div
                          key={index}
                          className={`
                            min-h-[18px] flex items-start
                            ${index < currentCodeLine ? 'opacity-100' : 'opacity-0'}
                            ${index === currentCodeLine ? 'opacity-100' : ''}
                            transition-opacity duration-150 ease-in-out
                            ${line.includes("import") ? "text-purple-400 font-semibold" :
                              line.includes("const") || line.includes("new") ? "text-blue-400 font-semibold" :
                                line.includes("React") || line.includes("Node.js") || line.includes("TypeScript") ? "text-cyan-400" :
                                  line.includes("AndroidAIMLEngineer") ? "text-emerald-400 font-semibold" :
                                    line.includes("//") ? "text-muted-foreground italic" :
                                      line.includes("await") || line.includes("connect") ? "text-yellow-400" :
                                        line.includes("'") ? "text-amber-400" :
                                          "text-foreground"}
                          `}
                        >
                          {index < currentCodeLine ? line : ''}
                          {index === currentCodeLine ? (
                            <>
                              {displayedCode}
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="ml-0.5 text-primary inline-block"
                              >
                                ▊
                              </motion.span>
                            </>
                          ) : ''}
                          {line === '' && '‎'}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <motion.div
                  className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center border-2 border-background shadow-xl"
                  animate={{ y: [0, -5, 0], rotate: [0, -2, 0], scale: [1, 1.03, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Code className="h-5 w-5 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -top-3 -left-3 bg-background/90 glass px-3 py-1.5 rounded-xl border border-border/60 shadow-lg flex items-center gap-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.5, type: "spring" }}
                >
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-semibold text-foreground">Solutions</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-background/90 glass px-3 py-1.5 rounded-xl border border-border/60 shadow-lg text-center"
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: 2, type: "spring" }}
                >
                  <div className="text-[10px] font-mono text-muted-foreground">Built with</div>
                  <div className="text-xs font-bold text-foreground">Modern Tech</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-24 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, 6, 0, -6] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <motion.div
          className="text-xs text-primary mb-2.5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 glass border border-border/50 shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <MousePointerClick className="h-3 w-3" />
          <span>Explore Portfolio</span>
        </motion.div>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};