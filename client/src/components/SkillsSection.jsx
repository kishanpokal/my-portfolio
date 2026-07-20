import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TECH_ICONS } from "@/data/techIcons.jsx";

const skills = [
  // Programming
  { name: "Java", category: "programming", icon: "java", description: "Object-oriented programming for robust backend and Android applications." },
  { name: "Kotlin", category: "programming", icon: "kotlin", description: "Modern, concise language for Android and multiplatform development." },
  { name: "Python", category: "programming", icon: "python", description: "Used for AI/ML modeling, scripting, and backend automation." },
  { name: "C++", category: "programming", icon: "cpp", description: "System programming, performance-critical apps, and game development." },
  { name: "C", category: "programming", icon: "c", description: "Low-level system development and fundamental computer science." },
  { name: "C#", category: "programming", icon: "csharp", description: "Primary language for game development in the Unity Engine." },
  { name: "JavaScript", category: "programming", icon: "javascript", description: "Core scripting language for dynamic web app development." },
  { name: "TypeScript", category: "programming", icon: "typescript", description: "Strict syntactical superset of JavaScript adding static typing." },

  // Frontend
  { name: "HTML5", category: "frontend", icon: "html", description: "Standard markup language for structuring responsive web pages." },
  { name: "CSS3", category: "frontend", icon: "css", description: "Styling and layout design for modern responsive websites." },
  { name: "React", category: "frontend", icon: "react", description: "Component-based library for building interactive user interfaces." },
  { name: "Bootstrap", category: "frontend", icon: "bootstrap", description: "Rapid styling framework with responsive grid components." },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwind", description: "Utility-first CSS framework for custom responsive designs." },

  // Backend
  { name: "PHP", category: "backend", icon: "php", description: "Server-side scripting language for dynamic web development." },
  { name: "REST APIs", category: "backend", icon: "postman", description: "Design and testing of network endpoints and web services." },
  { name: "Docker", category: "backend", icon: "docker", description: "Containerization platform to build, ship, and run apps anywhere." },

  // Mobile & Game
  { name: "Android Studio", category: "mobile", icon: "androidstudio", description: "IDE for native Android application building and emulation." },
  { name: "Jetpack Compose", category: "mobile", icon: "jetpackcompose", description: "Android's modern declarative UI toolkit for native layouts." },
  { name: "Unity", category: "mobile", icon: "unity", description: "Cross-platform game development engine for 2D/3D games." },

  // Database
  { name: "MySQL", category: "database", icon: "mysql", description: "Relational database management system for structured data." },
  { name: "SQL", category: "database", icon: "sql", description: "Structured Query Language for querying and managing databases." },
  { name: "PostgreSQL", category: "database", icon: "postgresql", description: "Powerful, open-source object-relational database system." },
  { name: "Firebase", category: "database", icon: "firebase", description: "Backend-as-a-service platform for real-time data sync and auth." },
  { name: "MongoDB", category: "database", icon: "mongodb", description: "Source-available cross-platform document-oriented NoSQL database." },

  // AI & Data
  { name: "TensorFlow", category: "ai", icon: "tensorflow", description: "Open-source machine learning framework for training neural networks." },
  { name: "Scikit-learn", category: "ai", icon: "scikitlearn", description: "Python machine learning library for data mining and analysis." },
  { name: "Machine Learning", category: "ai", icon: "ai", description: "Developing statistical models and predictive algorithms." },

  // Tools
  { name: "Git", category: "tools", icon: "git", description: "Distributed version control system for tracking codebase changes." },
  { name: "GitHub", category: "tools", icon: "github", description: "Platform for remote hosting, collaboration, and CI/CD." },
  { name: "VS Code", category: "tools", icon: "vscode", description: "Preferred lightweight code editor for web and script files." },
  { name: "Linux", category: "tools", icon: "linux", description: "Command-line operations, shell scripting, and server setup." },
  { name: "Figma", category: "tools", icon: "figma", description: "Collaborative design tool for UI/UX wireframing and prototyping." },
  { name: "Eclipse", category: "tools", icon: "eclipse", description: "Classic extensible Java IDE for building desktop/web applications." },
  { name: "NetBeans", category: "tools", icon: "netbeans", description: "Oracle's official Java IDE for desktop and enterprise apps." },
  { name: "Postman", category: "tools", icon: "postman", description: "API client for designing, building, and testing API requests." },
  { name: "Premiere Pro", category: "tools", icon: "premiere", description: "Professional video editing and post-production software." },
  { name: "Canva", category: "tools", icon: "canva", description: "Graphic design platform for creating visuals and templates." },
];

const categories = [
  { id: "all", label: "All Skills" },
  { id: "programming", label: "Programming" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile & Game" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI & Data" },
  { id: "tools", label: "Tools" },
];

// Horizontal continuous marquee row for Dribbble Ticker style
const TickerRow = ({ items, speed = 25, direction = "left" }) => {
  const duplicatedItems = [...items, ...items, ...items];
  
  return (
    <div className="w-full overflow-hidden flex relative py-1.5 select-none pointer-events-auto">
      <motion.div
        className="flex gap-4 flex-shrink-0"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {duplicatedItems.map((skill, index) => {
          const entry = TECH_ICONS[skill.icon];
          const Icon = entry?.Icon;
          const color = entry?.color || "#b8860b";
          
          return (
            <motion.div
              key={`${skill.name}-${index}`}
              className="flex items-center gap-2.5 px-4.5 py-2.5 rounded-full border border-border/50 bg-card/30 backdrop-blur-md transition-all duration-300"
              whileHover={{ 
                scale: 1.12, 
                y: -4,
                borderColor: color,
                boxShadow: `0 0 15px ${color}3a`,
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }}
              transition={{ type: "spring", stiffness: 450, damping: 20 }}
            >
              {Icon && <Icon className="w-5 h-5 flex-shrink-0" style={{ color }} />}
              <span className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors truncate">
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const InfiniteScrollSkills = ({ shiftRow1, shiftRow2, shiftRow3 }) => {
  // Split skills into three rows for alternating scrolling directions
  const row1 = skills.filter((_, i) => i % 3 === 0);
  const row2 = skills.filter((_, i) => i % 3 === 1);
  const row3 = skills.filter((_, i) => i % 3 === 2);

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Horizontal blur mask overlays for clean edge transitions */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-background via-background/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-background via-background/70 to-transparent z-10 pointer-events-none" />

      <div className="space-y-6">
        <motion.div style={{ x: shiftRow1 }}>
          <TickerRow items={row1} speed={28} direction="left" />
        </motion.div>
        
        <motion.div style={{ x: shiftRow2 }}>
          <TickerRow items={row2} speed={34} direction="right" />
        </motion.div>
        
        <motion.div style={{ x: shiftRow3 }}>
          <TickerRow items={row3} speed={30} direction="left" />
        </motion.div>
      </div>
    </div>
  );
};

// Compact square card for Mobile grid view with gentle floating bobbing animation
const SkillCard = ({ skill, index }) => {
  const entry = TECH_ICONS[skill.icon];
  const Icon = entry?.Icon;
  const color = entry?.color || "#b8860b";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{
        delay: Math.min(index * 0.02, 0.2),
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      whileHover={{ y: -6, scale: 1.04 }}
      className="group relative flex flex-col items-center justify-center
                 rounded-2xl border border-border/50 bg-card/50 glass-subtle
                 p-2.5 aspect-square overflow-hidden
                 transition-colors duration-300 hover:border-primary/40 text-center"
      style={{ "--tech": color }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
                   transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(80px circle at 50% 30%, ${color}20, transparent 70%)`,
        }}
      />
      {/* Floating inner container for mobile grid cards */}
      <motion.div
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          duration: 3 + (index % 3) * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1
        }}
        className="w-full h-full flex flex-col items-center justify-center gap-2"
      >
        {Icon && (
          <Icon
            className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110"
            style={{ color }}
          />
        )}
        <span className="relative z-10 text-center text-[9.5px] font-medium leading-tight text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 px-0.5">
          {skill.name}
        </span>
      </motion.div>
    </motion.div>
  );
};

const DetailedSkillCard = ({ skill, index }) => {
  const entry = TECH_ICONS[skill.icon];
  const Icon = entry?.Icon;
  const color = entry?.color || "#b8860b";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        delay: Math.min(index * 0.04, 0.3),
        type: "spring",
        stiffness: 140,
        damping: 16,
      }}
      whileHover={{ y: -4 }}
      className="group relative flex items-start gap-4 p-5 rounded-2xl border border-border/50 bg-card/45 backdrop-blur-md transition-all duration-300 hover:border-primary/30 shadow-md text-left"
    >
      {/* Icon Frame */}
      <div 
        className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:border-primary/20 transition-all duration-300"
      >
        {Icon && <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" style={{ color }} />}
      </div>

      {/* Detail Block */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-base group-hover:text-primary transition-colors duration-300 mb-1 truncate">
          {skill.name}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {skill.description}
        </p>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);

  // Monitor viewport size to switch between scrolling tickers and square grids
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track the scroll position of the skills section to drive the horizontal parallax shifts
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Calculate parallax offsets (Row 1/3 shift opposite to Row 2)
  const shiftRow1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const shiftRow2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const shiftRow3 = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-20 md:py-28 px-4 bg-transparent overflow-hidden w-full"
    >
      {/* Header and Filters (Centered Container) */}
      <div className="container mx-auto max-w-6xl mb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5 border border-primary/20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="h-4 w-4" />
            Technical Skills
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            The languages, frameworks, and tools I use to build Android apps,
            web applications, and AI-powered systems.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-5 py-2.5 rounded-full font-medium text-sm transition-colors duration-300 ${
                activeCategory === category.id
                  ? "text-primary-foreground font-semibold"
                  : "bg-secondary/50 text-foreground hover:bg-secondary/70 border border-border/40"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeCategory === category.id && (
                <motion.span
                  layoutId="skillFilterPill"
                  className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Skills View Routing */}
      <AnimatePresence mode="wait">
        {activeCategory === "all" ? (
          isMobile ? (
            <motion.div
              key="mobile-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="container mx-auto max-w-6xl grid grid-cols-3 sm:grid-cols-4 gap-3 px-2"
            >
              {skills.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="desktop-ticker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <InfiniteScrollSkills shiftRow1={shiftRow1} shiftRow2={shiftRow2} shiftRow3={shiftRow3} />
            </motion.div>
          )
        ) : (
          <motion.div
            key="filtered"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="container mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {filteredSkills.map((skill, index) => (
              <DetailedSkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default SkillsSection;
