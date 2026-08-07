import { useEffect, useRef, useState } from "react";

/**
 * A premium three-layer custom cursor that trails the mouse with spring physics.
 * Bypasses React state updates for absolute 60/120fps mousemove performance.
 *
 * Layers:
 * 1. Large Soft Glow (100px) - Slower lag trail
 * 2. Glassmorphic Outer Ring (40px) - Medium lag trail, includes light-reflection lens flare
 * 3. Sharp Inner Dot (6px) - Immediate response (no lag)
 */
export const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  // Use refs to track position variables without triggering React re-renders
  const mouseCoords = useRef({ x: -100, y: -100 });
  const glowCoords = useRef({ x: -100, y: -100 });
  const ringCoords = useRef({ x: -100, y: -100 });
  const dotCoords = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isHidden = useRef(false);

  useEffect(() => {
    // Only enable for desktop (fine pointers) and respect reduced motion settings
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-enabled");

    // Track mouse move
    const onMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };

    // Track hover state for buttons, links, and project cards
    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.closest(".proj-card") ||
        target.closest(".clickable");

      isHovered.current = !!interactive;
    };

    window.addEventListener("pointermove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    
    const onToggleCursor = (e) => {
      isHidden.current = !e.detail;
    };
    window.addEventListener("toggle-custom-cursor", onToggleCursor);

    let animationFrameId;

    // Direct DOM styling update loop
    const tick = () => {
      const targetX = mouseCoords.current.x;
      const targetY = mouseCoords.current.y;

      // Spring physics (damping factors)
      // Dot follows immediately (0.45)
      dotCoords.current.x += (targetX - dotCoords.current.x) * 0.45;
      dotCoords.current.y += (targetY - dotCoords.current.y) * 0.45;

      // Ring follows with medium damping (0.16)
      ringCoords.current.x += (targetX - ringCoords.current.x) * 0.16;
      ringCoords.current.y += (targetY - ringCoords.current.y) * 0.16;

      // Outer glow follows with slow damping (0.055)
      glowCoords.current.x += (targetX - glowCoords.current.x) * 0.055;
      glowCoords.current.y += (targetY - glowCoords.current.y) * 0.055;

      // Update Dot DOM
      if (dotRef.current) {
        dotRef.current.style.opacity = isHidden.current ? "0" : "1";
        dotRef.current.style.transform = `translate3d(${dotCoords.current.x - 3}px, ${dotCoords.current.y - 3}px, 0)`;
      }

      // Update Ring DOM
      if (ringRef.current) {
        ringRef.current.style.opacity = isHidden.current ? "0" : "1";
        const scale = 1.0;
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x - 20}px, ${ringCoords.current.y - 20}px, 0) scale(${scale})`;
        ringRef.current.style.borderColor = isHovered.current
          ? "rgba(6, 182, 212, 0.35)"
          : "rgba(255, 255, 255, 0.15)";
        ringRef.current.style.backgroundColor = isHovered.current
          ? "rgba(6, 182, 212, 0.06)"
          : "rgba(255, 255, 255, 0.03)";
      }

      // Update Glow DOM
      if (glowRef.current) {
        glowRef.current.style.opacity = isHidden.current ? "0" : "1";
        const scale = 1.0;
        glowRef.current.style.transform = `translate3d(${glowCoords.current.x - 50}px, ${glowCoords.current.y - 50}px, 0) scale(${scale})`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("toggle-custom-cursor", onToggleCursor);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Inject cursor hiding rules into document style */}
      <style>{`
        .custom-cursor-enabled,
        .custom-cursor-enabled *:not(.allow-system-cursor, .allow-system-cursor *) {
          cursor: none !important;
        }
      `}</style>

      {/* Layer 1: Large Soft Glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99997] h-[100px] w-[100px] rounded-full will-change-transform transition-transform duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 65%)",
          filter: "blur(4px)",
        }}
      />

      {/* Layer 2: Glassmorphic Ring (with highlight lens reflection) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99998] h-[40px] w-[40px] rounded-full border border-white/15 bg-white/[0.03] saturate-[150%] will-change-transform transition-all duration-300 ease-out shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_12px_rgba(6,182,212,0.06)]"
      >
        {/* Inner lens flare highlight */}
        <div
          className="absolute rounded-full bg-white/40 filter blur-[1.5px]"
          style={{
            top: "7px",
            left: "9px",
            width: "10px",
            height: "3px",
            transform: "rotate(-20deg)",
          }}
        />
      </div>

      {/* Layer 3: Sharp Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-[6px] w-[6px] rounded-full bg-[#06b6d4]/90 shadow-[0_0_6px_rgba(6,182,212,0.6)] will-change-transform"
      />
    </>
  );
};
export default CursorGlow;
