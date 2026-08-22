import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the very top that tracks page scroll progress (60-30-10 Accent). */
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
      className="fixed inset-x-0 top-0 z-[70] h-[2.5px] origin-left bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 shadow-[0_0_10px_rgba(249,87,56,0.5)]"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
