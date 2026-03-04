import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  // Frontend
  { name: "HTML", level: 85, category: "frontend", icon: "html" },
  { name: "CSS", level: 80, category: "frontend", icon: "css" },
  { name: "JavaScript", level: 75, category: "frontend", icon: "javascript" },
  { name: "Bootstrap", level: 75, category: "frontend", icon: "bootstrap" },

  // Backend
  { name: "Java", level: 85, category: "backend", icon: "java" },
  { name: "PHP", level: 70, category: "backend", icon: "php" },
  { name: "Python", level: 75, category: "backend", icon: "python" },
  { name: "Firebase", level: 80, category: "backend", icon: "firebase" },
  { name: "MySQL", level: 80, category: "backend", icon: "mysql" },

  // Database
  { name: "MySQL", level: 80, category: "database", icon: "mysql" },
  { name: "Firebase Firestore", level: 80, category: "database", icon: "firebase" },
  { name: "Realtime Database", level: 80, category: "database", icon: "firebase" },

  // Android
  { name: "Kotlin", level: 80, category: "android", icon: "kotlin" },
  { name: "Jetpack Compose", level: 75, category: "android", icon: "jetpackcompose" },
  { name: "Android Studio", level: 85, category: "android", icon: "androidstudio" },
  { name: "Firebase", level: 80, category: "android", icon: "firebase" },

  // Tools & Platforms
  { name: "Git", level: 75, category: "tools", icon: "git" },
  { name: "GitHub", level: 80, category: "tools", icon: "github" },
  { name: "VS Code", level: 85, category: "tools", icon: "vscode" },
  { name: "Android Studio", level: 85, category: "tools", icon: "androidstudio" },
  { name: "NetBeans", level: 70, category: "tools", icon: "netbeans" },
  { name: "Eclipse", level: 70, category: "tools", icon: "eclipse" },
  { name: "Firebase Console", level: 80, category: "tools", icon: "firebase" },
  { name: "Figma", level: 70, category: "tools", icon: "figma" },
];

const categories = [
  { id: "all", label: "All Skills", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "frontend", label: "Frontend", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "backend", label: "Backend", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "database", label: "Database", color: "bg-gradient-to-r from-teal-500 to-cyan-600" },
  { id: "android", label: "Android", color: "bg-gradient-to-r from-emerald-500 to-green-600" },
  { id: "tools", label: "Tools & Platforms", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
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

const SkillBar = ({ level }) => (
  <div className="w-full h-3 bg-secondary/20 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${level}%` }}
      transition={{ duration: 1.5, delay: 0.2 }}
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
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex gap-8 mb-8"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <img src={iconImages[skill.icon]} alt={skill.name} className="w-8 h-8 object-contain" />
            </div>
            <span className="text-sm font-medium text-center">{skill.name}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex gap-8"
        animate={{ x: ["-100%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...duplicatedSkills].reverse().map((skill, index) => (
          <div key={`${skill.name}-reverse-${index}`} className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <img src={iconImages[skill.icon]} alt={skill.name} className="w-8 h-8 object-contain" />
            </div>
            <span className="text-sm font-medium text-center">{skill.name}</span>
          </div>
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
    <section id="skills" className="py-28 px-4 bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            My Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies I use to build Android apps, web applications, and backend systems.
          </p>

          {/* Featured Skills Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {["Android", "Kotlin", "Java", "C++", "React/TSX", "Firebase"].map((feat, i) => (
              <span key={i} className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 shadow-sm">
                {feat}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full font-medium border border-transparent hover:shadow-lg ${activeCategory === category.id
                ? `${category.color} text-white shadow-md`
                : "bg-secondary/50 text-foreground hover:bg-secondary/70"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {activeCategory === "all" ? (
          <InfiniteScrollSkills skills={skills} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg group"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center">
                      <img src={iconImages[skill.icon]} alt={skill.name} className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {skill.name}
                        </h3>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${skill.level > 75 ? 'bg-emerald-500/10 text-emerald-500' :
                          skill.level > 50 ? 'bg-amber-500/10 text-amber-500' :
                            'bg-pink-500/10 text-pink-500'
                          }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <SkillBar level={skill.level} />
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
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