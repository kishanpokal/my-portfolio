import React, { useEffect, useRef, useState } from "react";

/**
 * Three-layer custom cursor that trails the mouse with spring physics.
 * Adapts dynamically with high-contrast visibility in Light Mode and radiant glow in Dark Mode.
 */
export const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const glowRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  const mouseCoords = useRef({ x: -100, y: -100 });
  const glowCoords = useRef({ x: -100, y: -100 });
  const ringCoords = useRef({ x: -100, y: -100 });
  const dotCoords = useRef({ x: -100, y: -100 });
  const isHovered = useRef(false);
  const isHidden = useRef(false);

  useEffect(() => {
    // Detect dark mode changes
    const checkDark = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Only enable for desktop (fine pointers) and respect reduced motion settings
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return () => observer.disconnect();

    setEnabled(true);
    document.body.classList.add("custom-cursor-enabled");

    const onMouseMove = (e) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.closest(".clickable");

      isHovered.current = !!interactive;
    };

    window.addEventListener("pointermove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    let animationFrameId;

    const tick = () => {
      const targetX = mouseCoords.current.x;
      const targetY = mouseCoords.current.y;
      const dark = document.documentElement.classList.contains("dark");

      // Spring physics
      dotCoords.current.x += (targetX - dotCoords.current.x) * 0.45;
      dotCoords.current.y += (targetY - dotCoords.current.y) * 0.45;

      ringCoords.current.x += (targetX - ringCoords.current.x) * 0.16;
      ringCoords.current.y += (targetY - ringCoords.current.y) * 0.16;

      glowCoords.current.x += (targetX - glowCoords.current.x) * 0.055;
      glowCoords.current.y += (targetY - glowCoords.current.y) * 0.055;

      // Update Dot
      if (dotRef.current) {
        dotRef.current.style.opacity = isHidden.current ? "0" : "1";
        dotRef.current.style.transform = `translate3d(${dotCoords.current.x - 3.5}px, ${dotCoords.current.y - 3.5}px, 0)`;
        dotRef.current.style.backgroundColor = dark ? "#FF6B4A" : "#D9480F";
        dotRef.current.style.boxShadow = dark
          ? "0 0 10px rgba(255,107,74,0.9)"
          : "0 0 0 1.5px #1A1918, 0 0 8px rgba(217,72,15,0.7)";
      }

      // Update Ring
      if (ringRef.current) {
        ringRef.current.style.opacity = isHidden.current ? "0" : "1";
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x - 18}px, ${ringCoords.current.y - 18}px, 0) scale(${
          isHovered.current ? 1.4 : 1.0
        })`;
        ringRef.current.style.borderColor = dark
          ? isHovered.current ? "rgba(255, 107, 74, 0.9)" : "rgba(255, 107, 74, 0.4)"
          : isHovered.current ? "rgba(217, 72, 15, 0.95)" : "rgba(26, 25, 24, 0.65)";
        ringRef.current.style.borderWidth = dark ? "1.5px" : "2px";
        ringRef.current.style.backgroundColor = dark
          ? isHovered.current ? "rgba(255, 107, 74, 0.12)" : "transparent"
          : isHovered.current ? "rgba(217, 72, 15, 0.15)" : "transparent";
      }

      // Update Glow
      if (glowRef.current) {
        glowRef.current.style.opacity = isHidden.current ? "0" : "1";
        glowRef.current.style.transform = `translate3d(${glowCoords.current.x - 45}px, ${glowCoords.current.y - 45}px, 0)`;
        glowRef.current.style.background = dark
          ? "radial-gradient(circle, rgba(255, 107, 74, 0.15) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(217, 72, 15, 0.2) 0%, transparent 70%)";
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        .custom-cursor-enabled,
        .custom-cursor-enabled *:not(input, textarea) {
          cursor: none !important;
        }
      `}</style>

      {/* Layer 1: Ambient Glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99997] h-[90px] w-[90px] rounded-full will-change-transform"
        style={{ filter: "blur(6px)" }}
      />

      {/* Layer 2: Interactive Outer Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99998] h-[36px] w-[36px] rounded-full will-change-transform transition-all duration-150 ease-out"
      />

      {/* Layer 3: Center Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99999] h-[7px] w-[7px] rounded-full will-change-transform"
      />
    </>
  );
};

export default CursorGlow;
