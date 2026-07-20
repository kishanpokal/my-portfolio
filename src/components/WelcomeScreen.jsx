import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ASCII_ART } from "@/data/asciiArt";

// Custom high-performance canvas-based matrix digital rain + circular blueprint HUD
const CanvasCodeRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const resize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener("resize", resize);

    const chars = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZアカサタナハマヤラワ{}[]<>=/;".split("");
    const fontSize = 13;
    const columns = Math.floor(width / fontSize) + 1;
    const drops = Array(columns).fill(1).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 18, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // --- Draw Blueprint Grid ---
      ctx.strokeStyle = "rgba(239, 214, 172, 0.01)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // --- Draw Central HUD Target (Blueprint) ---
      const cx = width / 2;
      const cy = height / 2;
      ctx.strokeStyle = "rgba(239, 214, 172, 0.015)";
      ctx.lineWidth = 1.5;
      
      // Circles
      ctx.beginPath();
      ctx.arc(cx, cy, 220, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(239, 214, 172, 0.008)";
      ctx.beginPath();
      ctx.arc(cx, cy, 320, 0, Math.PI * 2);
      ctx.stroke();

      // Crosshairs
      ctx.strokeStyle = "rgba(239, 214, 172, 0.01)";
      ctx.beginPath();
      ctx.moveTo(cx - 360, cy);
      ctx.lineTo(cx + 360, cy);
      ctx.moveTo(cx, cy - 360);
      ctx.lineTo(cx, cy + 360);
      ctx.stroke();

      // --- Draw Falling Matrix Code Rain ---
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(239, 214, 172, 0.5)";
      ctx.fillStyle = "rgba(239, 214, 172, 0.18)";
      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Randomly draw a bright white head character
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#ffffff";
          ctx.fillText(text, x, y);
          ctx.fillStyle = "rgba(239, 214, 172, 0.18)";
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      ctx.shadowBlur = 0; // Reset shadow for other drawings
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none" />;
};

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(25)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, (Math.random() - 0.5) * 200],
          x: [0, (Math.random() - 0.5) * 100],
          opacity: [0, 0.8, 0],
          scale: [0, 1.5, 0],
        }}
        transition={{
          duration: Math.random() * 4 + 3,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

const GlowOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-96 h-96 rounded-full bg-primary/8 blur-[120px]"
      style={{ top: "15%", left: "10%" }}
      animate={{
        x: [0, 60, 0],
        y: [0, -40, 0],
        scale: [1, 1.25, 1],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-80 h-80 rounded-full bg-amber-500/8 blur-[100px]"
      style={{ bottom: "15%", right: "10%" }}
      animate={{
        x: [0, -50, 0],
        y: [0, 30, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
    />
  </div>
);

// Staggered letters spring entrance with soft glowing shadows
const AnimatedName = ({ name, active }) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 10,
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight flex justify-center select-none py-1 overflow-hidden drop-shadow-[0_0_20px_rgba(239,214,172,0.25)]"
      variants={containerVariants}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
    >
      {name.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={letterVariants}
          className={
            char === " "
              ? "mr-4"
              : "bg-gradient-to-r from-amber-400 via-amber-600 to-amber-300 bg-clip-text text-transparent inline-block font-display"
          }
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export const WelcomeScreen = ({ onWelcomeComplete }) => {
  const [phase, setPhase] = useState(0); // 0: init, 1: logo, 2: text, 3: exit
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState("");
  
  // Mouse coordinates for 3D parallax card tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const logMessages = [
    "Initializing core protocols...",
    "Connecting to neural pathways...",
    "Loading Android SDK components...",
    "Injecting AIML model weights...",
    "Building experience timeline...",
    "Fetching projects catalog...",
    "Optimizing rendering pipelines...",
    "System online. Welcome user..."
  ];

  // Track mouse coordinates to compute 3D tilt angles
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate coordinates normalized from -0.5 to 0.5 relative to screen center
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Compute tilt rotations
  const tiltX = mousePos.y * -20; // Max tilt 20 degrees
  const tiltY = mousePos.x * 20;

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * logMessages.length),
      logMessages.length - 1
    );
    setLogText(logMessages[idx]);
  }, [progress]);

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 200);
    const t1 = setTimeout(() => setPhase(2), 700);
    
    // Smooth progress increment (lengthened to 90ms for cinematic loading duration)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 90);

    const t2 = setTimeout(() => setPhase(3), 4800);
    const t3 = setTimeout(() => onWelcomeComplete(), 5500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(progressInterval);
    };
  }, [onWelcomeComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-[2px] overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(12px)",
          }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Main background shows through the translucent overlay */}

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(184,134,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(184,134,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

          {/* Sweeping laser scan line */}
          <motion.div
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent shadow-[0_0_12px_rgba(239,214,172,0.4)] pointer-events-none z-10"
            animate={{ y: ["-10vh", "110vh"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          />

          {/* Main loader panel with smooth 3D perspective mouse-tilt (glass border card removed) */}
          <motion.div
            className="relative z-20 flex flex-col items-center"
            style={{
              transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            }}
          >
            {/* Cybernetic Core (Logo) */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={phase >= 1 ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
                delay: 0.05,
              }}
            >
              {/* Concentric pulsing sonar rings */}
              <motion.div
                className="absolute -inset-6 rounded-full border border-amber-400/30"
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.div
                className="absolute -inset-6 rounded-full border border-amber-500/25"
                animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
              />

              {/* Inner ring (Dashed Cyan: rotating clockwise) */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-amber-400/35"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              {/* Outer ring (Thin Solid Violet: rotating counter-clockwise) */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-amber-500/25"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />

              {/* Glowing ASCII Art Logo */}
              <motion.div
                className="p-3 sm:p-4 rounded-3xl bg-stone-900/60 border border-primary/20 backdrop-blur-sm flex items-center justify-center shadow-2xl relative overflow-hidden max-w-[90vw] sm:max-w-md"
                style={{
                  boxShadow: `0 0 40px rgba(184,134,11,0.25), inset 0 1px 0 rgba(255,255,255,0.05)`,
                }}
                animate={{
                  boxShadow: [
                    "0 0 25px rgba(184,134,11,0.15)",
                    "0 0 50px rgba(184,134,11,0.35)",
                    "0 0 25px rgba(184,134,11,0.15)",
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Diagonal specular light sweep reflection */}
                <motion.div
                  className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  animate={{ left: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                />
                <pre className="font-mono text-[0.7px] leading-[0.7px] sm:text-[1.2px] sm:leading-[1.2px] md:text-[1.5px] md:leading-[1.5px] text-[#f5e6c8] drop-shadow-[0_0_3px_rgba(184,134,11,0.6)] font-bold select-none text-left tracking-[0.02em]">
                  {ASCII_ART}
                </pre>
              </motion.div>
            </motion.div>

            {/* Title Staggered Letter Entrance */}
            <AnimatedName name="Kishan Pokal" active={phase >= 2} />

            {/* Subtitle tag with glowing active indicator */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-400/20 bg-amber-400/5 text-amber-400 text-xs font-mono tracking-widest uppercase mb-6 select-none shadow-[0_0_15px_rgba(239,214,172,0.06)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AI/ML Engineer
            </motion.div>

            {/* Futuristic AI Initialization Loader */}
            <motion.div
              className="flex flex-col items-center gap-3 mt-4"
              initial={{ opacity: 0, y: 15 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {/* Digital Percentage Readout */}
              <div className="text-4xl font-mono font-light text-amber-400/90 tracking-widest drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                {Math.floor(progress).toString().padStart(3, '0')}<span className="text-amber-500/50 text-2xl">%</span>
              </div>
              
              {/* Segmented Data Nodes */}
              <div className="flex gap-1.5">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 w-3 sm:w-4 rounded-sm transition-all duration-300 ${
                      progress > (i / 12) * 100 
                        ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]' 
                        : 'bg-primary/20'
                    }`}
                  />
                ))}
              </div>
              
              {/* Status text */}
              <div className="text-[9px] uppercase tracking-[0.3em] text-amber-500/50 font-mono mt-1">
                {progress < 100 ? "Compiling Neural Pathways..." : "System Online"}
              </div>
            </motion.div>

          </motion.div>

          {/* Glowing cyber corner brackets */}
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 md:top-8 md:left-8 md:w-16 md:h-16 border-l border-t border-primary/20 rounded-tl-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 md:top-8 md:right-8 md:w-16 md:h-16 border-r border-t border-primary/20 rounded-tr-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-8 h-8 md:bottom-8 md:left-8 md:w-16 md:h-16 border-l border-b border-primary/20 rounded-bl-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-8 h-8 md:bottom-8 md:right-8 md:w-16 md:h-16 border-r border-b border-primary/20 rounded-br-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default WelcomeScreen;