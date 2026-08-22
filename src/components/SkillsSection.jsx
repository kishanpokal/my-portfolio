import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_ICONS } from "@/data/techIcons";
import { Search, Sparkles, Filter, X, Check } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

const skillsData = [
  // Programming
  { name: "Java", category: "programming", icon: "java", level: "Advanced", desc: "Object-oriented programming, core Java patterns & Android backends." },
  { name: "Kotlin", category: "mobile", icon: "kotlin", level: "Advanced", desc: "Primary language for Android, coroutines, and Jetpack Compose." },
  { name: "Python", category: "ai", icon: "python", level: "Advanced", desc: "AI/ML modeling, automation scripts, and data preprocessing." },
  { name: "C++", category: "programming", icon: "cpp", level: "Intermediate", desc: "System performance, low-level data structures & game algorithms." },
  { name: "C", category: "programming", icon: "c", level: "Intermediate", desc: "Foundational computer science, memory management & pointer logic." },
  { name: "C#", category: "mobile", icon: "csharp", level: "Proficient", desc: "Core language for Unity 3D game logic and entity state machines." },
  { name: "JavaScript", category: "frontend", icon: "javascript", level: "Advanced", desc: "Dynamic web apps, DOM manipulation, asynchronous ES6+." },
  { name: "TypeScript", category: "frontend", icon: "typescript", level: "Proficient", desc: "Strict typing for scalable React applications and robust interfaces." },

  // Frontend
  { name: "React", category: "frontend", icon: "react", level: "Advanced", desc: "Modern hook-based state management, Framer Motion, responsive SPAs." },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwind", level: "Advanced", desc: "Modern utility-first styling, design tokens, and responsive UI." },
  { name: "HTML5", category: "frontend", icon: "html", level: "Expert", desc: "Semantic markup, accessibility standards, and SEO architecture." },
  { name: "CSS3", category: "frontend", icon: "css", level: "Expert", desc: "Custom animations, grid/flexbox layouts, responsive design." },
  { name: "Bootstrap", category: "frontend", icon: "bootstrap", level: "Proficient", desc: "Rapid prototyping and responsive grid frameworks." },

  // Mobile & Game
  { name: "Android Studio", category: "mobile", icon: "androidstudio", level: "Advanced", desc: "Full Android app lifecycle, profiling, Gradle & APK builds." },
  { name: "Jetpack Compose", category: "mobile", icon: "jetpackcompose", level: "Advanced", desc: "Modern declarative Android UI, material design 3." },
  { name: "Unity 3D", category: "mobile", icon: "unity", level: "Proficient", desc: "3D physics, spatial audio, particle systems, mobile game deployment." },

  // AI & Machine Learning
  { name: "TensorFlow", category: "ai", icon: "tensorflow", level: "Proficient", desc: "Deep learning models, CNNs, neural network training & export." },
  { name: "Scikit-learn", category: "ai", icon: "scikitlearn", level: "Proficient", desc: "Supervised & unsupervised ML, regression, classification pipelines." },
  { name: "Machine Learning", category: "ai", icon: "ai", level: "Proficient", desc: "Data feature engineering, model validation, and evaluation metrics." },

  // Backend & Systems
  { name: "PHP", category: "backend", icon: "php", level: "Intermediate", desc: "Server-side scripting, authentication & MySQL database integration." },
  { name: "REST APIs", category: "backend", icon: "postman", level: "Advanced", desc: "API endpoint design, JSON serialization, and Postman testing." },
  { name: "Docker", category: "tools", icon: "docker", level: "Intermediate", desc: "Containerized application workflows and reproducible environments." },

  // Database
  { name: "Firebase", category: "database", icon: "firebase", level: "Advanced", desc: "Real-time Firestore, Firebase Auth, Cloud Storage & Analytics." },
  { name: "MySQL", category: "database", icon: "mysql", level: "Advanced", desc: "Relational database schema design, queries, and optimization." },
  { name: "SQL", category: "database", icon: "sql", level: "Advanced", desc: "Complex joins, indexing, aggregation, and data modeling." },
  { name: "PostgreSQL", category: "database", icon: "postgresql", level: "Proficient", desc: "Enterprise-grade relational database management." },
  { name: "MongoDB", category: "database", icon: "mongodb", level: "Proficient", desc: "Document-oriented NoSQL schema design and CRUD operations." },

  // Tools & DevOps
  { name: "Git", category: "tools", icon: "git", level: "Advanced", desc: "Version control branching, rebasing, and collaborative workflows." },
  { name: "GitHub", category: "tools", icon: "github", level: "Advanced", desc: "Repository management, CI/CD actions, and project tracking." },
  { name: "VS Code", category: "tools", icon: "vscode", level: "Expert", desc: "Primary development IDE with extensions and debugging setup." },
  { name: "Linux", category: "tools", icon: "linux", level: "Proficient", desc: "Terminal scripting, file permissions, and environment configs." },
  { name: "Figma", category: "tools", icon: "figma", level: "Proficient", desc: "UI/UX wireframing, component design systems, and prototyping." },
  { name: "Postman", category: "tools", icon: "postman", level: "Advanced", desc: "API client testing, environment variables, automated request suites." },
];

const categories = [
  { id: "all", label: "All Skills" },
  { id: "mobile", label: "Android & Mobile" },
  { id: "ai", label: "AI & Data" },
  { id: "frontend", label: "Frontend & Web" },
  { id: "backend", label: "Backend & Systems" },
  { id: "database", label: "Databases" },
  { id: "tools", label: "Tools & DevOps" },
];

export const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory =
        selectedCategory === "all" ||
        skill.category === selectedCategory ||
        (selectedCategory === "frontend" && skill.category === "programming" && (skill.name === "JavaScript" || skill.name === "TypeScript"));
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tech Stack Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight">
              Technologies & toolchains.
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-xl">
              Languages, libraries, and frameworks I use to build performant mobile, web, and AI applications.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by skill or keyword..."
              className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-secondary/80 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.click();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const entry = TECH_ICONS[skill.icon];
              const Icon = entry?.Icon;
              const brandColor = entry?.color || "#F95738";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={skill.name}
                  className="group relative rounded-2xl bg-card border border-border p-5 hover:border-border-hover transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md overflow-hidden"
                >
                  {/* Subtle brand glow on hover */}
                  <div
                    className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 pointer-events-none"
                    style={{ backgroundColor: brandColor }}
                  />

                  <div>
                    {/* Top Row: Icon + Skill Level */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div
                        className="p-2.5 rounded-xl bg-secondary border border-border/80 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center"
                        style={{ color: brandColor }}
                      >
                        {Icon && <Icon className="w-6 h-6" />}
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border/60">
                        {skill.level}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>

                  {/* Bottom Category Tag */}
                  <div className="pt-3 mt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span className="capitalize">{skill.category}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-primary transition-opacity font-sans text-xs flex items-center gap-0.5">
                      Verified <Check className="w-3 h-3 text-primary" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 bg-card border border-border rounded-3xl p-8">
            <p className="text-foreground font-semibold">No skills found matching "{searchQuery}"</p>
            <p className="text-xs text-muted-foreground mt-1">Try another keyword or select "All Skills".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-secondary text-xs font-medium text-foreground hover:bg-secondary/80"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
