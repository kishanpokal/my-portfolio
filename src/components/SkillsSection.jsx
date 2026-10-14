import React from "react";
import { motion } from "framer-motion";
import { TECH_ICONS } from "@/data/techIcons";
import {
  Sparkles,
  Smartphone,
  Cpu,
  Globe,
  Terminal,
  Server,
  Layers,
} from "lucide-react";
import { sound } from "@/lib/SoundEngine";

// Helper to resolve icon from TECH_ICONS with fallback
const SkillBrandIcon = ({ iconKey }) => {
  const entry = TECH_ICONS[iconKey];
  if (entry?.Icon) {
    const IconComp = entry.Icon;
    return <IconComp className="w-4 h-4 flex-shrink-0" style={{ color: entry.color || "#38BDF8" }} />;
  }
  return <Terminal className="w-4 h-4 text-sky-500 flex-shrink-0" />;
};

const skillCategories = [
  {
    id: "mobile",
    title: "Android & Mobile Development",
    icon: Smartphone,
    description: "Building fast, native Android apps with clean UI and real-time cloud sync.",
    skills: [
      { name: "Kotlin", icon: "kotlin" },
      { name: "Jetpack Compose", icon: "jetpackcompose" },
      { name: "Java", icon: "java" },
      { name: "Android Studio", icon: "androidstudio" },
      { name: "Firebase", icon: "firebase" },
      { name: "Room Database", icon: "sql" },
      { name: "Coroutines & Flow", icon: "kotlin" },
      { name: "Material Design 3", icon: "jetpackcompose" },
    ],
  },
  {
    id: "backend",
    title: "Backend, Databases & Web",
    icon: Globe,
    description: "Building scalable databases, REST endpoints, and modern web applications.",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "REST APIs", icon: "postman" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    icon: Cpu,
    description: "Training neural network models and optimizing them for fast performance.",
    skills: [
      { name: "Python", icon: "python" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "TensorFlow Lite", icon: "tensorflow" },
      { name: "Scikit-Learn", icon: "scikitlearn" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Pandas & NumPy", icon: "python" },
      { name: "Model Quantization", icon: "ai" },
    ],
  },
  {
    id: "devops-tools",
    title: "DevOps, Tools & Game Dev",
    icon: Server,
    description: "Containerization, system scripting, version control, and 3D game engines.",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Git & GitHub", icon: "github" },
      { name: "Linux", icon: "linux" },
      { name: "Unity 3D", icon: "unity" },
      { name: "C#", icon: "csharp" },
      { name: "C / C++", icon: "cpp" },
      { name: "Postman", icon: "postman" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

export const SkillsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 bg-background relative transition-colors duration-200">
      <div className="container max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-12 sm:mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Skills &amp; Tools</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight font-sans">
            Technical <span className="font-serif italic font-normal text-gradient text-4xl sm:text-6xl">Skills</span> &amp; Tools.
          </h2>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground leading-relaxed">
            The programming languages, frameworks, databases, and DevOps tools I work with daily.
          </p>
        </motion.div>

        {/* 4 Clean Balanced Cards (2x2 Grid, Flawless in Dark & Light modes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {skillCategories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="rounded-3xl dark:bg-[#111622]/90 bg-white dark:border-white/10 border-slate-200/90 p-6 sm:p-7 shadow-lg dark:shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between hover:border-sky-400/50 group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl dark:bg-white/5 bg-sky-50 dark:border-white/10 border-sky-100 text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-sky-500 transition-colors">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Pills Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-3">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        onMouseEnter={() => sound.hover()}
                        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-default dark:bg-white/[0.03] bg-slate-50/90 hover:bg-slate-100 dark:hover:bg-white/[0.08] dark:border-white/10 border-slate-200/90 hover:border-sky-400/40"
                      >
                        <SkillBrandIcon iconKey={skill.icon} />
                        <span className="font-medium text-xs truncate text-slate-800 dark:text-slate-200">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-4 mt-5 border-t dark:border-white/5 border-slate-200 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>{cat.skills.length} Technologies</span>
                  <span className="text-sky-600 dark:text-sky-400 font-medium">Production Ready</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
