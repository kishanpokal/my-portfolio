import React, { useEffect, useRef, useState } from "react";

/**
 * Three-layer custom cursor that trails the mouse with spring physics.
 * Adapts dynamically with Sky Blue accents.
 */
export const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false);
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
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

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
        dotRef.current.style.backgroundColor = dark ? "#38BDF8" : "#0284C7";
        dotRef.current.style.boxShadow = dark
          ? "0 0 10px rgba(56,189,248,0.9)"
          : "0 0 0 1.5px #0A0D14, 0 0 8px rgba(2,132,199,0.7)";
      }

      // Update Ring
      if (ringRef.current) {
        ringRef.current.style.opacity = isHidden.current ? "0" : "1";
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x - 18}px, ${ringCoords.current.y - 18}px, 0) scale(${
          isHovered.current ? 1.4 : 1.0
        })`;
        ringRef.current.style.borderColor = dark
          ? isHovered.current ? "rgba(56, 189, 248, 0.9)" : "rgba(56, 189, 248, 0.4)"
          : isHovered.current ? "rgba(2, 132, 199, 0.95)" : "rgba(10, 13, 20, 0.65)";
        ringRef.current.style.borderWidth = dark ? "1.5px" : "2px";
        ringRef.current.style.backgroundColor = dark
          ? isHovered.current ? "rgba(56, 189, 248, 0.12)" : "transparent"
          : isHovered.current ? "rgba(2, 132, 199, 0.15)" : "transparent";
      }

      // Update Glow
      if (glowRef.current) {
        glowRef.current.style.opacity = isHidden.current ? "0" : "1";
        glowRef.current.style.transform = `translate3d(${glowCoords.current.x - 45}px, ${glowCoords.current.y - 45}px, 0)`;
        glowRef.current.style.background = dark
          ? "radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(2, 132, 199, 0.2) 0%, transparent 70%)";
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Subtle Ambient Mouse Glow (Follows pointer naturally, zero intrusive rings) */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 h-[120px] w-[120px] rounded-full will-change-transform"
        style={{ filter: "blur(20px)" }}
      />
    </>
  );
};

export default CursorGlow;
