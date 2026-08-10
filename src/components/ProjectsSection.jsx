import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProjectsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mb-20 md:mb-32"
        >
          <span className="text-primary tracking-widest text-sm font-semibold uppercase mb-4 block">Projects</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight">Selected work.</h2>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="group flex flex-col md:flex-row gap-8 md:gap-16 items-start"
            >
              {/* Image Side */}
              <div className="w-full md:w-[60%] relative rounded-2xl overflow-hidden bg-card border border-border aspect-[4/3] md:aspect-[16/10]">
                <div className="absolute inset-0 z-10 bg-background/0 group-hover:bg-background/10 transition-colors duration-700 pointer-events-none" />
                <img
                  src={project.image || project.thumbnail || '/placeholder-project.png'}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-[40%] flex flex-col pt-4 md:pt-8 relative">
                <span className="absolute -top-12 md:-top-24 -left-4 text-7xl md:text-9xl font-serif text-muted-foreground/10 select-none pointer-events-none">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs uppercase tracking-widest text-primary font-medium">
                    {project.category || 'Project'}
                  </span>
                  {project.status && (
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider",
                      project.status.toLowerCase() === 'completed' 
                        ? "border-green-500/20 text-green-500 bg-green-500/10" 
                        : "border-orange-500/20 text-orange-500 bg-orange-500/10"
                    )}>
                      {project.status}
                    </span>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground mb-8 line-clamp-3 md:line-clamp-none text-base md:text-lg">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags?.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-full border border-border text-xs text-secondary-foreground bg-secondary/50">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex flex-wrap gap-4 items-center">
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors text-sm group/link"
                    >
                      View Project <ArrowUpRight className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" /> Source Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="mt-32 md:mt-48 max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-10 md:p-16 text-center flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-serif text-foreground mb-6">Like what you see?</h3>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href="#contact" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                Contact Me
              </a>
              <a 
                href="https://github.com/kishanpokal" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border border-border text-foreground hover:bg-secondary rounded-full font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                <Github className="w-5 h-5" /> View GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
