import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CodeRain = () => {
  const chars = "01アカサタナハマヤラワ{}[]<>=/;";
  const columns = 20;

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.06] pointer-events-none">
      {[...Array(columns)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 text-primary text-xs font-mono leading-tight select-none"
          style={{ left: `${(i / columns) * 100}%` }}
          initial={{ y: "-100%" }}
          animate={{ y: "120%" }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
        >
          {[...Array(30)].map((_, j) => (
            <div key={j} className="opacity-70">
              {chars[Math.floor(Math.random() * chars.length)]}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
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
      className="absolute w-80 h-80 rounded-full bg-primary/10 blur-[100px]"
      style={{ top: "20%", left: "10%" }}
      animate={{
        x: [0, 80, 0],
        y: [0, -60, 0],
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute w-60 h-60 rounded-full bg-purple-500/10 blur-[80px]"
      style={{ bottom: "20%", right: "15%" }}
      animate={{
        x: [0, -60, 0],
        y: [0, 40, 0],
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    />
    <motion.div
      className="absolute w-40 h-40 rounded-full bg-cyan-400/8 blur-[60px]"
      style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
      animate={{
        scale: [0.8, 1.4, 0.8],
        opacity: [0.1, 0.4, 0.1],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
    />
  </div>
);

export const WelcomeScreen = ({ onWelcomeComplete }) => {
  const [phase, setPhase] = useState(0); // 0: init, 1: logo, 2: text, 3: exit
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Phase 0 → 1: Initial delay
    const t0 = setTimeout(() => setPhase(1), 200);
    // Phase 1 → 2: Logo appears, then text
    const t1 = setTimeout(() => setPhase(2), 800);
    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    // Phase 2 → 3: Exit
    const t2 = setTimeout(() => setPhase(3), 3200);
    // Complete
    const t3 = setTimeout(() => onWelcomeComplete(), 3800);

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
          }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Backgrounds */}
          <CodeRain />
          <FloatingParticles />
          <GlowOrbs />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center">
            {/* Logo / Icon */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={
                phase >= 1
                  ? { scale: 1, rotate: 0 }
                  : { scale: 0, rotate: -180 }
              }
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: 0.1,
              }}
            >
              {/* Rotating ring */}
              <motion.div
                className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border border-primary/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />

              {/* Logo container */}
              <motion.div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-primary via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-primary/30 relative overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(139,92,246,0.3)",
                    "0 0 40px rgba(139,92,246,0.5)",
                    "0 0 20px rgba(139,92,246,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <span className="text-3xl sm:text-4xl font-black text-white relative z-10 tracking-tight">
                  KP
                </span>
              </motion.div>

              {/* Orbiting dots */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-primary/60"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI) / 2) * 55,
                    y: Math.sin((i * Math.PI) / 2) * 55,
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1.2, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>

            {/* Name */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={
                phase >= 2
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 tracking-tight">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Kishan Pokal
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={
                  phase >= 2
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <p className="text-muted-foreground text-sm sm:text-base tracking-[0.3em] uppercase font-medium">
                  Android & AIML Engineer
                </p>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="mt-10 w-48 sm:w-60"
              initial={{ opacity: 0, y: 20 }}
              animate={
                phase >= 2
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="h-1 bg-primary/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <motion.p
                className="text-xs text-muted-foreground/60 mt-3 text-center font-mono"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading portfolio...
              </motion.p>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};