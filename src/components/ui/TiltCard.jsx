import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A card that tilts in 3D toward the cursor and carries a spotlight glow.
 * Tilt is disabled (spotlight kept) when the user prefers reduced motion.
 */
export const TiltCard = ({ children, className, max = 7, ...props }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const range = reduce ? 0 : max;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [range, -range]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-range, range]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
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
