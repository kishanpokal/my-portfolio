import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Clean Sky Blue scroll indicator at top */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
