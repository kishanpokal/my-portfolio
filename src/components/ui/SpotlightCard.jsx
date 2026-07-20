import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Drop-in replacement for a motion.div card that adds a cursor-following
 * radial "spotlight" glow. Highly optimized to prevent layout thrashing.
 */
export const SpotlightCard = ({ children, className, ...props }) => {
  const ref = useRef(null);
  const rafId = useRef(null);
  const rectRef = useRef(null);

  // Cache the rect on hover enter to avoid calling getBoundingClientRect on every mouse move
  const handlePointerEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handlePointerLeave = () => {
    rectRef.current = null;
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
  };

  const handleMove = (e) => {
    if (!ref.current || !rectRef.current) return;
    
    // Use requestAnimationFrame to batch DOM writes and prevent lag
    if (rafId.current) cancelAnimationFrame(rafId.current);
    
    rafId.current = requestAnimationFrame(() => {
      if (ref.current && rectRef.current) {
        ref.current.style.setProperty("--mx", `${e.clientX - rectRef.current.left}px`);
        ref.current.style.setProperty("--my", `${e.clientY - rectRef.current.top}px`);
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Invalidate cached rect on scroll
      rectRef.current = null;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handleMove}
      className={cn("spotlight group/spot", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className="spotlight-glow group-hover/spot:opacity-100"
      />
      {children}
    </motion.div>
  );
};
