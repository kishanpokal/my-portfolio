import React, { useState, useEffect } from 'react';
import { Briefcase, Code, User, Download, Calendar, Sparkles, Target, Github, Linkedin, Mail, GraduationCap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '@/data/projects';

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [counter, setCounter] = useState(0);

  const achievements = [
    { number: `${projects.length}+`, label: "Development Projects", icon: <Briefcase className="h-5 w-5" />, suffix: "" },
    { number: "10+", label: "Technologies Used", icon: <Code className="h-5 w-5" />, suffix: "" },
    { number: "2025", label: "B.Sc Computer Science", icon: <GraduationCap className="h-5 w-5" />, suffix: "" }
  ];

  const techStack = [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "Bootstrap"]
    },
    {
      category: "Backend",
      items: ["Java", "PHP", "Python", "Firebase", "MySQL"]
    },
    {
      category: "Database",
      items: ["MySQL", "Firebase Firestore", "Realtime Database"]
    },
    {
      category: "Android",
      items: ["Kotlin", "Jetpack Compose", "Android Studio", "Firebase"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "VS Code", "Android Studio", "NetBeans", "Eclipse", "Firebase Console", "Figma"]
    }
  ];

  const features = [
    "Strong foundation in programming fundamentals",
    "Experience building real-world software projects",
    "Android and web development experience",
    "Focus on clean and readable code",
    "Problem-solving mindset",
    "Continuous learning and self-improvement"
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/kishanpokal" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/kishanpokal956" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:kishanpokal1111@gmail.com" }
  ];

  const tabContent = {
    personal:
      "I'm Kishan Pokal, a Computer Science student from Gujarat University with a strong interest in Android development and Artificial Intelligence. I enjoy building practical applications that solve everyday problems. My goal is to create useful software that improves productivity and simplifies tasks for users. Currently, I am working on projects like a Smart Expense Tracker Android app and AI-powered assistants while continuously learning new technologies and improving my development skills.",
    professional:
      "I have worked on multiple academic and personal projects across web development and Android development. Some of my key projects include an Online Book Selling System, a Tourism Management System with booking features, and an AI-based voice assistant built with Python. Recently I have been focusing more on Android development using Kotlin and Firebase, building applications that include real-world features such as expense tracking, notifications, and data visualization.",
    approach:
      "My development approach focuses on solving real problems with simple and reliable solutions. I believe in writing clean and understandable code, designing user-friendly interfaces, and building applications step-by-step with continuous improvement. I also focus on learning by building projects, experimenting with new technologies, and improving my problem-solving skills through practical development experience."
  };

  useEffect(() => {
    const interval = setInterval(() => setCounter(prev => (prev + 1) % 4), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Kishan-resume.pdf';
    link.download = 'Kishan-resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <section id="about" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-16 px-2 sm:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={sectionVariants}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-primary/10 border border-primary/20 mb-5 transition-all duration-500 hover:bg-primary/15 group cursor-default">
            <div className="relative">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <span className="text-sm font-semibold text-primary tracking-wide">ABOUT ME</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">Transforming</span>
            <span className="block text-primary">Ideas Into Reality</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building practical applications with <span className="text-primary font-semibold">Android</span>, <span className="text-primary font-semibold">AI</span>, and <span className="text-primary font-semibold">web technologies</span> to solve real-world problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6">
            {/* About Card */}
            <motion.div
              className="bg-card/60 border border-border/50 rounded-2xl p-5 sm:p-7 glass shadow-lg transition-all duration-500 hover:shadow-xl hover:border-primary/30 relative overflow-hidden group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={cardVariants}
            >
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary rounded-full -translate-x-16 translate-y-16" />
              </div>

              <div className="relative">
                <div className="flex flex-col md:flex-row items-center gap-5 md:gap-7">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-3 border-primary/20 shadow-xl transition-all duration-500 group-hover:border-primary/40 relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img src="/profile-logo.png" alt="Kishan Pokal" className="w-full h-full object-cover" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-green-500 rounded-full border-3 border-background flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-1">Kishan Pokal</h2>
                    <p className="text-primary text-base font-semibold mb-3">Android App Developer | AI Learner</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          className={`p-2.5 rounded-xl bg-background/60 border border-border/50 transition-all duration-300 hover:border-primary/30 ${counter === index ? 'bg-primary/8 border-primary/40' : ''}`}
                          whileHover={{ scale: 1.03 }}
                        >
                          <div className="flex items-center gap-2 justify-center md:justify-start">
                            <span className="text-primary">{achievement.icon}</span>
                            <div>
                              <div className="font-bold text-sm sm:text-base">{achievement.number}{achievement.suffix}</div>
                              <div className="text-[10px] sm:text-xs text-muted-foreground">{achievement.label}</div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border/50 mb-4 mt-5">
                  {['personal', 'professional', 'approach'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2.5 px-3 text-sm font-medium transition-all duration-300 relative ${activeTab === tab
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="aboutTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[100px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm sm:text-base text-muted-foreground leading-relaxed space-y-4"
                    >
                      <p>{tabContent[activeTab]}</p>

                      {activeTab === 'personal' && (
                        <div className="mt-4 p-3 bg-primary/5 rounded-xl border border-primary/10">
                          <h4 className="text-primary font-semibold text-sm mb-2">Current Focus:</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• Android App Development</li>
                            <li>• AI-powered applications</li>
                            <li>• Building Smart Expense Tracker</li>
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="bg-card/60 border border-border/50 rounded-2xl p-5 sm:p-7 glass shadow-lg transition-all duration-500 hover:shadow-xl hover:border-primary/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={cardVariants}
            >
              <h3 className="text-lg sm:text-xl font-bold mb-5 flex items-center gap-2.5">
                <Code className="h-5 w-5 text-primary" />Tech Stack Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {techStack.map((stack, index) => (
                  <motion.div
                    key={index}
                    className="bg-background/60 border border-border/40 rounded-xl p-4 transition-all duration-300 hover:border-primary/30 group"
                    whileHover={{ y: -3, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-1.5 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform duration-300">
                        <Code className="h-3.5 w-3.5" />
                      </div>
                      <h4 className="font-semibold text-sm">{stack.category}</h4>
                    </div>
                    <div className="space-y-1.5">
                      {stack.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">
                          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />{item}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* CTA */}
            <motion.div
              className="bg-card/60 border border-border/50 rounded-2xl p-5 sm:p-6 glass shadow-lg transition-all duration-500 hover:shadow-xl hover:border-primary/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={cardVariants}
            >
              <h3 className="text-lg font-bold mb-4 text-center">Let's Work Together</h3>
              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2.5 sm:space-y-0">
                <motion.a
                  href="#contact"
                  className="flex-1 block w-full p-3 bg-primary text-primary-foreground rounded-xl text-center font-semibold transition-all duration-300 hover:bg-primary/90 group text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <User className="h-4 w-4 group-hover:scale-110 transition-transform" />Start a Project
                  </div>
                </motion.a>

                <motion.button
                  onClick={handleDownload}
                  className="flex-1 block w-full p-3 border border-border/60 rounded-xl text-center font-semibold transition-all duration-300 hover:bg-accent hover:border-primary/30 group text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />Download Resume
                  </div>
                </motion.button>
              </div>

              {/* Social Links */}
              <div className="mt-5 p-3.5 bg-background/60 rounded-xl border border-border/40">
                <h4 className="font-semibold mb-2 text-center text-sm">Quick Connect</h4>
                <div className="flex justify-center gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="p-2.5 bg-background rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Why Choose Me */}
            <motion.div
              className="bg-card/60 border border-border/50 rounded-2xl p-4 sm:p-5 glass shadow-lg transition-all duration-500 hover:shadow-xl hover:border-primary/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={cardVariants}
            >
              <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />Why Choose Me
              </h3>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2.5 p-1.5 rounded-lg transition-all duration-300 hover:bg-background/60"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              className="bg-card/60 border border-border/50 rounded-2xl p-4 sm:p-5 glass shadow-lg transition-all duration-500 hover:shadow-xl hover:border-green-500/30"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={cardVariants}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                  </div>
                  <span className="font-semibold text-sm">Available</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-400 bg-green-500/10 px-2.5 py-1 rounded-lg font-medium">
                  For new projects
                </span>
              </div>
              <div className="text-xs text-muted-foreground text-center bg-background/50 rounded-lg p-2">
                ⚡ Response time: Under 24 hours
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
