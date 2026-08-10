import { motion } from "framer-motion";
import { TECH_ICONS } from "@/data/techIcons.jsx";
import { cn } from "@/lib/utils";

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

const categoryGroups = [
  { id: "programming", label: "Programming" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile & Game" },
  { id: "database", label: "Database" },
  { id: "ai", label: "AI & Data" },
  { id: "tools", label: "Tools" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16 md:mb-24">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">
            SKILLS
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">
            Technologies & tools.
          </h2>
        </div>

        <motion.div
          className="space-y-12 md:space-y-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {categoryGroups.map((group, groupIndex) => {
            const categorySkills = skills.filter(s => s.category === group.id);
            if (categorySkills.length === 0) return null;

            return (
              <motion.div 
                key={group.id} 
                variants={itemVariants}
                className={cn(
                  "pt-8 md:pt-12",
                  groupIndex !== 0 && "border-t border-border/50"
                )}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">
                  {group.label}
                </h3>
                
                <div className="flex flex-wrap gap-x-8 gap-y-6">
                  {categorySkills.map((skill) => {
                    const entry = TECH_ICONS[skill.icon];
                    const Icon = entry?.Icon;
                    const color = entry?.color || "#C8A2FF";

                    return (
                      <motion.div
                        key={skill.name}
                        className="flex items-center gap-2.5 group cursor-default"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {Icon && (
                          <Icon 
                            className="w-5 h-5 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" 
                            style={{ color }} 
                          />
                        )}
                        <span className="text-base text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

