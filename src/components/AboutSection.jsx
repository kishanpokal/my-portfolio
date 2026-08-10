import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';

export const AboutSection = () => {
  const projectCount = projects.length > 0 ? `${projects.length}+` : '8+';

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="about" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-16 md:mb-24"
        >
          <span className="text-primary tracking-widest text-sm font-semibold uppercase mb-4 block">About</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight">The story behind the code.</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          {/* Left Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="w-full md:w-[30%] lg:w-[25%] space-y-6"
          >
            <div className="rounded-2xl overflow-hidden border border-border bg-card">
              <img 
                src="/profile-logo.png" 
                alt="Kishan Pokal" 
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-serif font-bold text-foreground">{projectCount}</span>
                <span className="text-xs text-muted-foreground mt-1">Projects</span>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-serif font-bold text-foreground">10+</span>
                <span className="text-xs text-muted-foreground mt-1">Technologies</span>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-serif font-bold text-foreground">2025</span>
                <span className="text-xs text-muted-foreground mt-1">B.Sc CS</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex-1 space-y-6 md:space-y-8 text-base md:text-lg text-muted-foreground leading-relaxed">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              I'm Kishan Pokal, a Computer Science graduate from <span className="text-primary">Gujarat University</span> with a deep passion for building software that solves real problems. My journey started with curiosity about how apps work, and quickly evolved into building them myself.
            </motion.p>
            
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              Today, I specialize in <span className="text-primary">Android development</span> with Kotlin and Jetpack Compose, <span className="text-primary">AI-powered applications</span> using Python and TensorFlow, and full-stack web development. I've shipped projects ranging from expense trackers to horror games with microphone-based gameplay mechanics.
            </motion.p>
            
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
            >
              When I'm not coding, I'm exploring new AI research papers, experimenting with game development in Unity, or designing intuitive user experiences. I believe the best software is built at the intersection of <span className="text-primary">technical excellence and genuine empathy for users</span>.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
