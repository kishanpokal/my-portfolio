import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the very top that tracks page scroll progress. */
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
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-primary via-amber-400 to-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]"
      style={{ scaleX }}
    />
  );
};
