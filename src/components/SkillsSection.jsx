import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

import htmlIcon from "@/assets/icons/html.png";
import cssIcon from "@/assets/icons/css.png";
import jsIcon from "@/assets/icons/javascript.png";
import tsIcon from "@/assets/icons/typescript.png";
import reactIcon from "@/assets/icons/react.png";
import bootstrapIcon from "@/assets/icons/bootstrap.svg";
import tailwindIcon from "@/assets/icons/tailwindcss.svg";
import javaIcon from "@/assets/icons/java.png";
import pythonIcon from "@/assets/icons/python.png";
import cIcon from "@/assets/icons/c.svg";
import cppIcon from "@/assets/icons/cpp.svg";
import phpIcon from "@/assets/icons/php.svg";
import kotlinIcon from "@/assets/icons/kotlin.svg";
import gitIcon from "@/assets/icons/git.png";
import githubIcon from "@/assets/icons/github.png";
import firebaseIcon from "@/assets/icons/firebase.png";
import vscodeIcon from "@/assets/icons/vscode.png";
import androidstudioIcon from "@/assets/icons/androidstudio.svg";
import linuxIcon from "@/assets/icons/linux.svg";
import postmanIcon from "@/assets/icons/postman.svg";
import figmaIcon from "@/assets/icons/figma.svg";
import SQLIcon from "@/assets/icons/sql.png";
import MySQLIcon from "@/assets/icons/mysql.png";
import eclipseIcon from "@/assets/icons/eclipse.svg";
import netbeansIcon from "@/assets/icons/netbeans.svg";
import jetpackcomposeIcon from "@/assets/icons/jetpackcompose.svg";

const skills = [
  // Programming
  { name: "Java", level: 85, category: "programming", icon: "java" },
  { name: "Kotlin", level: 80, category: "programming", icon: "kotlin" },
  { name: "Python", level: 75, category: "programming", icon: "python" },
  { name: "JavaScript", level: 75, category: "programming", icon: "javascript" },
  { name: "C++", level: 70, category: "programming", icon: "cpp" },
  { name: "C", level: 70, category: "programming", icon: "c" },

  // Frontend
  { name: "HTML5", level: 85, category: "frontend", icon: "html" },
  { name: "CSS3", level: 80, category: "frontend", icon: "css" },
  { name: "JavaScript", level: 75, category: "frontend", icon: "javascript" },
  { name: "Bootstrap", level: 75, category: "frontend", icon: "bootstrap" },

  // Backend
  { name: "PHP", level: 70, category: "backend", icon: "php" },
  { name: "JSP/Servlets", level: 65, category: "backend", icon: "java" },
  { name: "REST APIs", level: 75, category: "backend", icon: "postman" },

  // Mobile Development
  { name: "Android Development", level: 85, category: "mobile", icon: "androidstudio" },
  { name: "Kotlin", level: 80, category: "mobile", icon: "kotlin" },
  { name: "XML UI", level: 75, category: "mobile", icon: "androidstudio" },
  { name: "Firebase", level: 80, category: "mobile", icon: "firebase" },

  // Database
  { name: "MySQL", level: 80, category: "database", icon: "mysql" },
  { name: "Firebase", level: 80, category: "database", icon: "firebase" },

  // AI & Data
  { name: "Machine Learning Basics", level: 60, category: "ai", icon: "python" },
  { name: "Data Analysis with Python", level: 70, category: "ai", icon: "python" },

  // Tools
  { name: "Git", level: 75, category: "tools", icon: "git" },
  { name: "GitHub", level: 80, category: "tools", icon: "github" },
  { name: "VS Code", level: 85, category: "tools", icon: "vscode" },
  { name: "NetBeans", level: 70, category: "tools", icon: "netbeans" },
  { name: "Eclipse", level: 70, category: "tools", icon: "eclipse" },
  { name: "Android Studio", level: 85, category: "tools", icon: "androidstudio" },
];

const categories = [
  { id: "all", label: "All Skills", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "programming", label: "Programming", color: "bg-gradient-to-r from-blue-500 to-indigo-500" },
  { id: "frontend", label: "Frontend", color: "bg-gradient-to-r from-cyan-500 to-blue-500" },
  { id: "backend", label: "Backend", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "mobile", label: "Mobile Dev", color: "bg-gradient-to-r from-emerald-500 to-green-600" },
  { id: "database", label: "Database", color: "bg-gradient-to-r from-teal-500 to-cyan-600" },
  { id: "ai", label: "AI & Data", color: "bg-gradient-to-r from-purple-600 to-blue-600" },
  { id: "tools", label: "Tools", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
];

const iconImages = {
  html: htmlIcon,
  css: cssIcon,
  javascript: jsIcon,
  typescript: tsIcon,
  react: reactIcon,
  bootstrap: bootstrapIcon,
  tailwind: tailwindIcon,
  java: javaIcon,
  python: pythonIcon,
  c: cIcon,
  cpp: cppIcon,
  php: phpIcon,
  kotlin: kotlinIcon,
  firebase: firebaseIcon,
  git: gitIcon,
  github: githubIcon,
  vscode: vscodeIcon,
  linux: linuxIcon,
  postman: postmanIcon,
  figma: figmaIcon,
  sql: SQLIcon,
  mysql: MySQLIcon,
  androidstudio: androidstudioIcon,
  eclipse: eclipseIcon,
  netbeans: netbeansIcon,
  jetpackcompose: jetpackcomposeIcon,
};

const SkillBar = ({ level, inView }) => (
  <div className="w-full h-2.5 bg-secondary/20 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={inView ? { width: `${level}%` } : { width: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`h-full rounded-full ${level > 75 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
        level > 50 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' :
          'bg-gradient-to-r from-red-400 to-pink-500'
        }`}
    />
  </div>
);

const InfiniteScrollSkills = ({ skills }) => {
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="overflow-hidden py-6">
      <motion.div
        className="flex gap-6 mb-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={`${skill.name}-${index}`}
            className="flex-shrink-0 flex flex-col items-center gap-2"
            whileHover={{ scale: 1.15, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 glass-subtle">
              <img src={iconImages[skill.icon]} alt={skill.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            </div>
            <span className="text-xs font-medium text-center text-muted-foreground">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex gap-6"
        animate={{ x: ["-100%", "0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...duplicatedSkills].reverse().map((skill, index) => (
          <motion.div
            key={`${skill.name}-reverse-${index}`}
            className="flex-shrink-0 flex flex-col items-center gap-2"
            whileHover={{ scale: 1.15, y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-card/80 border border-border/50 flex items-center justify-center shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 glass-subtle">
              <img src={iconImages[skill.icon]} alt={skill.name} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
            </div>
            <span className="text-xs font-medium text-center text-muted-foreground">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = activeCategory === "all"
    ? skills.filter((skill, index, self) => index === self.findIndex(s => s.name === skill.name))
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 px-4 bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-14"
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

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            My Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Technologies I use to build Android apps, web applications, and backend systems.
          </p>

          {/* Featured Skills Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-2.5 mt-7"
          >
            {["Android", "Kotlin", "Java", "C++", "React/TSX", "Firebase"].map((feat, i) => (
              <motion.span
                key={i}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {feat}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium border border-transparent transition-all duration-300 text-sm ${activeCategory === category.id
                ? `${category.color} text-white shadow-md`
                : "bg-secondary/50 text-foreground hover:bg-secondary/70 border-border/30"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {activeCategory === "all" ? (
          <InfiniteScrollSkills skills={skills} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.06, type: "spring", stiffness: 120, damping: 15 }}
                  className="bg-card/80 p-5 rounded-2xl border border-border/40 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg group glass-subtle"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-md">
                      <img src={iconImages[skill.icon]} alt={skill.name} className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                          {skill.name}
                        </h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${skill.level > 75 ? 'bg-emerald-500/10 text-emerald-500' :
                          skill.level > 50 ? 'bg-amber-500/10 text-amber-500' :
                            'bg-pink-500/10 text-pink-500'
                          }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <SkillBar level={skill.level} inView={true} />
                      <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                        <span>Basic</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};