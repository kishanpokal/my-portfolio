import {
  ArrowRight,
  Github,
  Sparkles,
  Zap,
  Eye,
  Play,
  Code2,
  Terminal,
  Cpu,
  Database,
  MonitorSmartphone
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { projects } from "@/data/projects";

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isPlayStore = project.demoUrl?.includes("play.google.com");
  
  // Determine if it's a live web preview
  const isWebPreview = project.demoUrl && project.demoUrl !== "#" && !isPlayStore;
  
  const num = String(index + 1).padStart(2, "0");

  const accentColors = {
    "from-emerald-500 to-teal-600": "#10b981",
    "from-red-500 to-rose-600": "#ef4444",
    "from-blue-500 to-cyan-600": "#b8860b",
    "from-purple-500 to-indigo-600": "#a855f7",
    "from-amber-500 to-orange-600": "#f59e0b",
    "from-rose-500 to-pink-600": "#f43f5e",
    "from-violet-500 to-purple-600": "#8b5cf6",
  };
  const accentHex = accentColors[project.accentColor] || "#b8860b";

  const getTagIcon = (tag) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes("android") || lowerTag.includes("mobile")) return <MonitorSmartphone size={14} />;
    if (lowerTag.includes("firebase") || lowerTag.includes("mysql") || lowerTag.includes("database")) return <Database size={14} />;
    if (lowerTag.includes("unity") || lowerTag.includes("java") || lowerTag.includes("kotlin") || lowerTag.includes("c#")) return <Cpu size={14} />;
    return <Terminal size={14} />;
  };

  return (
    <div
      className="group relative flex flex-col lg:flex-row rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-2xl transition-all duration-500 gap-8 w-full h-full max-h-[85vh] hover:border-primary/50"
      style={{
        boxShadow: `0 20px 40px -20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Background ambient glow */}
      <div 
        className="absolute -inset-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${accentHex}10 0%, transparent 50%)`,
        }}
      />

      {/* Left Column (Image & Info) */}
      <div className="flex-1 lg:w-[60%] flex flex-col space-y-6 overflow-hidden relative z-10">
        
        {/* Top Image / Preview Container */}
        <div 
          className="relative w-full h-[240px] md:h-[280px] rounded-xl overflow-hidden border border-border shadow-lg shrink-0 bg-background/80 flex flex-col transition-all duration-500 group-hover:border-primary/50 allow-system-cursor"
          onMouseEnter={() => {
            setIsHovered(true);
            if (isWebPreview) {
               window.dispatchEvent(new CustomEvent('toggle-custom-cursor', { detail: false }));
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            if (isWebPreview) {
               window.dispatchEvent(new CustomEvent('toggle-custom-cursor', { detail: true }));
            }
          }}
        >
          {/* macOS style browser bar for web projects */}
          {isWebPreview && (
            <div className="h-8 w-full bg-secondary/50 border-b border-border/40 flex items-center px-3 gap-1.5 shrink-0 z-30 relative backdrop-blur-md">
               <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-sm"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-sm"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-sm"></div>
               {isHovered ? (
                 <span className="ml-auto text-[10px] text-emerald-500 uppercase font-bold tracking-widest flex items-center gap-1.5 animate-in fade-in">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live
                 </span>
               ) : (
                 <span className="ml-auto text-[10px] text-muted-foreground/60 uppercase font-semibold tracking-wider flex items-center gap-1.5 animate-in fade-in">
                    <Eye size={12} /> Hover to preview
                 </span>
               )}
            </div>
          )}

          <div className="relative flex-1 overflow-hidden bg-muted/20">
            {/* The static image */}
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                isHovered && isWebPreview ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
            />
            
            {/* Live iframe preview */}
            {isWebPreview && (
              <div 
                className={`absolute inset-0 w-full h-full bg-background overflow-hidden transition-opacity duration-700 ease-in-out ${
                  isHovered ? "opacity-100 z-20 pointer-events-auto" : "opacity-0 -z-10 pointer-events-none"
                }`}
              >
                <iframe 
                  src={project.demoUrl} 
                  title={`Preview of ${project.title}`}
                  className="border-none pointer-events-none group-hover:pointer-events-auto"
                  style={{
                    width: "250%",
                    height: "250%",
                    transform: "scale(0.4)",
                    transformOrigin: "top left"
                  }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            )}

            {/* Status Badge - hides when live preview is active */}
            <div className={`absolute top-3 right-3 z-30 flex gap-2 transition-opacity duration-300 ${isHovered && isWebPreview ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider glass border ${
                  project.status.toLowerCase() === "completed"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                }`}
              >
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="flex-1 overflow-y-auto pr-3 space-y-5 custom-scrollbar pb-2">
          <div className="space-y-2 pt-1">
             <span
                className="text-[11px] font-black tracking-[0.2em] uppercase block"
                style={{ color: accentHex }}
              >
                {project.category}
              </span>
             <h3 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
               {project.title}
             </h3>
          </div>
          
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-medium">
            {project.description}
          </p>
        </div>

        {/* Small project number in bottom left */}
        <div className="absolute bottom-0 left-0 pt-4">
           <span className="text-4xl font-display font-black text-muted-foreground/20 select-none">
             {num}
           </span>
        </div>
      </div>

      {/* Right Column (Features, Tech Stack & Actions) */}
      <div className="lg:w-[40%] flex flex-col border-t lg:border-t-0 lg:border-l border-border/50 pt-6 lg:pt-0 lg:pl-8 relative z-10 overflow-hidden">
         <div className="flex-1 overflow-y-auto pr-2 space-y-8 custom-scrollbar pb-2">
            
            {/* Features Section */}
            <div>
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 flex items-center gap-2">
                  <Sparkles size={14} style={{ color: accentHex }}/> Key Features & Details
               </h4>
               <ul className="space-y-3">
                 {project.highlights.map((highlight, idx) => (
                   <li key={idx} className="flex items-start gap-3 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: accentHex, boxShadow: `0 0 10px ${accentHex}` }}
                      />
                      <span className="text-muted-foreground leading-relaxed font-medium text-left">
                        {highlight}
                      </span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Architecture Section */}
            <div>
               <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 flex items-center gap-2">
                  <Code2 size={14} style={{ color: accentHex }}/> Architecture
               </h4>
               
               <div className="flex flex-wrap gap-2.5">
                 {project.tags.map((tag, i) => (
                   <div 
                     key={i} 
                     className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-border/40 bg-secondary/50 hover:bg-secondary/80 hover:border-border/80 transition-all duration-300 backdrop-blur-sm"
                   >
                     <span style={{ color: accentHex }}>
                       {getTagIcon(tag)}
                     </span>
                     <span className="text-xs font-semibold text-foreground/90 whitespace-nowrap">
                       {tag}
                     </span>
                   </div>
                 ))}
               </div>
            </div>
         </div>

         <div className="mt-6 pt-6 border-t border-border/40 shrink-0">
            <div className="flex flex-col gap-3">
              {project.demoUrl !== "#" && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative group/btn inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: accentHex,
                  }}
                >
                  <div className="absolute inset-0 w-full h-full bg-foreground/10 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {isPlayStore ? (
                      <>
                        <Play size={16} className="fill-current" /> Play Store
                      </>
                    ) : (
                      <>
                        <Eye size={16} /> Live Demo
                      </>
                    )}
                  </span>
                </a>
              )}
              
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold border border-border/50 bg-secondary/50 text-foreground hover:border-border/80 hover:bg-secondary/80 transition-all duration-300"
                >
                  <Github size={16} /> Source Code
                </a>
              )}
            </div>
         </div>
      </div>
    </div>
  );
};

export const ProjectsSection = () => {
  const scrollContainerRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const reduce = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollRange, setScrollRange] = useState(0);

  const [elementTop, setElementTop] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const useHorizontal = isDesktop && !reduce;

  // Track absolute scroll position of the window
  const { scrollY } = useScroll();

  // Calculate the horizontal scroll limits dynamically based on window size and document offsets
  useEffect(() => {
    if (!useHorizontal) return;

    const calculatePositions = () => {
      if (scrollContainerRef.current) {
        const rect = scrollContainerRef.current.getBoundingClientRect();
        // Calculate the absolute pixel offset from top of document
        const absoluteTop = rect.top + window.scrollY;
        setElementTop(absoluteTop);
      }
      if (scrollTrackRef.current) {
        // Here we calculate how far we need to translate 'x'
        const range = scrollTrackRef.current.scrollWidth - window.innerWidth;
        setScrollRange(Math.max(0, range));
      }
    };

    calculatePositions();
    window.addEventListener("resize", calculatePositions);
    return () => window.removeEventListener("resize", calculatePositions);
  }, [useHorizontal]);

  // Translate track from 0px to -scrollRange over exactly [elementTop, elementTop + 3 * windowHeight]
  // This matches the 400vh container height (100vh for the initial view + 300vh of scrolling)
  const x = useTransform(
    scrollY,
    [elementTop, elementTop + 3 * windowHeight],
    [0, -scrollRange],
    { clamp: true }
  );

  // Navigation button logic
  const handleNavigate = (direction) => {
    if (!useHorizontal || !scrollTrackRef.current) return;
    
    // Measure exact width of one card + gap from the DOM
    const trackElement = scrollTrackRef.current;
    const firstCard = trackElement.children[0];
    if (!firstCard) return;

    const gap = parseFloat(window.getComputedStyle(trackElement).gap) || 0;
    const exactCardWidth = firstCard.offsetWidth + gap;

    // Total vertical scroll height for the section is 3 * window.innerHeight
    // Total horizontal scroll distance is scrollRange
    const ratio = (3 * window.innerHeight) / scrollRange;
    const verticalScrollAmount = exactCardWidth * ratio;

    const startScroll = elementTop;
    const endScroll = elementTop + (3 * window.innerHeight);
    const currentScroll = window.scrollY;
    
    let targetScroll = currentScroll + (direction === 'next' ? verticalScrollAmount : -verticalScrollAmount);
    
    // Clamp the scroll so it never leaves the projects section
    if (targetScroll < startScroll) targetScroll = startScroll;
    if (targetScroll > endScroll) targetScroll = endScroll;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="projects"
      className="relative bg-transparent"
    >
      <style>{`
        /* Custom scrollbar for the project info area to keep cards clean */
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl pt-20 md:pt-28 pb-4">
        <motion.div
          className="text-center mb-6 lg:mb-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5 border border-primary/20">
            <Sparkles className="h-4 w-4" />
            My Projects
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-foreground">My </span>
            <span className="text-gradient">Work</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work. Explore the details, tools used, and live demos of each project.
          </p>
          {useHorizontal && (
            <p className="mt-4 text-xs font-medium text-primary/80 flex items-center justify-center gap-2 bg-primary/5 py-1.5 px-4 rounded-full border border-primary/10 w-max mx-auto animate-pulse">
              <ArrowRight className="h-3.5 w-3.5" /> Scroll down to explore sideways
            </p>
          )}
        </motion.div>
      </div>

      {useHorizontal ? (
        /* ---- Desktop: side-by-side horizontal scroll container ---- */
        <div
          ref={scrollContainerRef}
          className="relative w-full"
          style={{
            // Defines the height of the scroll container to dictate the scroll duration.
            height: "400vh",
          }}
        >
          {/* Sticky container stays pinned to screen while parent is scrolled. */}
          <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
            <motion.div
              ref={scrollTrackRef}
              style={{ x }}
              className="flex gap-8 md:gap-12 px-8 md:px-[10vw] py-12 items-center h-[90vh] w-max"
            >
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-[80vw] max-w-[1000px] h-[80vh] min-h-[500px] flex-shrink-0"
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </motion.div>
            
            {/* Desktop Navigation Buttons */}
            {useHorizontal && (
              <div className="absolute bottom-12 right-12 z-50 flex gap-4">
                <button 
                  onClick={() => handleNavigate('prev')}
                  className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300 shadow-xl"
                  aria-label="Previous project"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <button 
                  onClick={() => handleNavigate('next')}
                  className="w-12 h-12 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300 shadow-xl"
                  aria-label="Next project"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ---- Mobile / Tablet: standard vertical stack (better for touch) ---- */
        <div className="container mx-auto px-4 sm:px-6 w-full relative py-8 pb-20">
          <div className="flex flex-col gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* CTA section */}
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl pb-20 md:pb-28">
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          <div className="bg-background/70 border border-border/50 rounded-[2rem] p-8 sm:p-12 max-w-4xl mx-auto glass">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5 border border-primary/20">
              <Zap className="h-4 w-4" />
              Get In Touch
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Like what you see?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-base sm:text-lg">
              I&apos;m always open to discussing new opportunities and interesting projects. Let&apos;s build something great together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/30 text-sm sm:text-base"
              >
                Contact Me
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="https://github.com/kishanpokal"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold border border-border/60 text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-sm sm:text-base"
              >
                <Github size={16} />
                View GitHub
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
