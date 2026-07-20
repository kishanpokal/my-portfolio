import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SECTION_IDS = ["hero", "about", "skills", "projects", "contact"];

const SECTION_GLOWS = [
  "radial-gradient(ellipse 60vw 60vw at 50% 20%, hsl(38 90% 38% / 0.06), transparent 70%)",
  "radial-gradient(ellipse 50vw 50vw at 20% 40%, hsl(36 60% 55% / 0.05), transparent 70%)",
  "radial-gradient(ellipse 60vw 60vw at 80% 30%, hsl(40 30% 90% / 0.04), transparent 70%)",
  "radial-gradient(ellipse 60vw 60vw at 30% 65%, hsl(30 50% 40% / 0.05), transparent 70%)",
  "radial-gradient(ellipse 55vw 55vw at 75% 70%, hsl(25 60% 35% / 0.05), transparent 70%)",
];

// 3D Math Utilities
const project = (x, y, z, fov, viewerDistance) => {
  const factor = fov / (viewerDistance + z);
  return {
    x: x * factor,
    y: y * factor,
    scale: factor,
    depth: z
  };
};

const rotateX = (point, angle) => ({
  x: point.x,
  y: point.y * Math.cos(angle) - point.z * Math.sin(angle),
  z: point.y * Math.sin(angle) + point.z * Math.cos(angle)
});

const rotateY = (point, angle) => ({
  x: point.x * Math.cos(angle) + point.z * Math.sin(angle),
  y: point.y,
  z: -point.x * Math.sin(angle) + point.z * Math.cos(angle)
});

const rotateZ = (point, angle) => ({
  x: point.x * Math.cos(angle) - point.y * Math.sin(angle),
  y: point.x * Math.sin(angle) + point.y * Math.cos(angle),
  z: point.z
});

// Shape Definitions
const SHAPES = {
  cube: {
    vertices: [
      {x:-1, y:-1, z:-1}, {x:1, y:-1, z:-1}, {x:1, y:1, z:-1}, {x:-1, y:1, z:-1},
      {x:-1, y:-1, z:1}, {x:1, y:-1, z:1}, {x:1, y:1, z:1}, {x:-1, y:1, z:1}
    ],
    edges: [
      [0,1], [1,2], [2,3], [3,0],
      [4,5], [5,6], [6,7], [7,4],
      [0,4], [1,5], [2,6], [3,7]
    ]
  },
  tetrahedron: {
    vertices: [
      {x:1, y:1, z:1}, {x:-1, y:-1, z:1}, {x:-1, y:1, z:-1}, {x:1, y:-1, z:-1}
    ],
    edges: [
      [0,1], [1,2], [2,0], [0,3], [1,3], [2,3]
    ]
  },
  octahedron: {
    vertices: [
      {x:1, y:0, z:0}, {x:-1, y:0, z:0}, {x:0, y:1, z:0},
      {x:0, y:-1, z:0}, {x:0, y:0, z:1}, {x:0, y:0, z:-1}
    ],
    edges: [
      [0,2], [2,1], [1,3], [3,0],
      [4,0], [4,1], [4,2], [4,3],
      [5,0], [5,1], [5,2], [5,3]
    ]
  }
};

export const StarBackground = () => {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SECTION_IDS.indexOf(entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    let tries = 0;
    const attach = () => {
      const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
      if (els.length) els.forEach((el) => observer.observe(el));
      else if (tries++ < 40) setTimeout(attach, 150);
    };
    attach();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    // --- Interactive Mouse ---
    const mouse = { x: width / 2, y: height / 2, active: false };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => { mouse.active = false; };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // --- Scroll Parallax ---
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // --- Generate 3D World (Floating Tech Symbols) ---
    const numSymbols = isMobile ? 150 : 350;
    const SYMBOLS = ['0', '1', '{ }', '< />', 'AI', 'ML', 'λ', '[]', '()', '=>', 'npm', 'dev'];
    const colors = [
      "184, 134, 11",   // Primary Gold
      "212, 162, 76",   // Bright Gold
      "140, 100, 5",    // Dark Gold
      "245, 230, 200",  // Off-white Gold
    ];

    const wrapHeight = height * 4; 
    const maxZ = 2000;

    const symbols = Array.from({ length: numSymbols }, () => {
      return {
        char: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        x: (Math.random() - 0.5) * width * 3, 
        y: Math.random() * wrapHeight,          
        z: Math.random() * maxZ,                
        baseScale: 25 + Math.random() * 30,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        vRotX: (Math.random() - 0.5) * 0.04,
        vRotY: (Math.random() - 0.5) * 0.04,
        vRotZ: (Math.random() - 0.5) * 0.04,
        vy: 2 + Math.random() * 6, // Unstable falling speed
        colorBase: colors[Math.random() * colors.length | 0]
      };
    });

    const fov = 800;
    const viewerDistance = 800;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      const diff = targetScrollY - currentScrollY;
      currentScrollY += diff * 0.08;
      scrollVelocity = diff * 0.08;

      // Sort by Z for proper depth rendering
      symbols.sort((a, b) => b.z - a.z);
      
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];

        // Raining Effect (Unstable constant falling)
        // No scroll acceleration applied to falling speed per user request.
        symbol.y += symbol.vy;

        // 1. Update Rotation (Tumble effect on scroll + ambient)
        symbol.rotX += symbol.vRotX + (scrollVelocity * 0.002);
        symbol.rotY += symbol.vRotY + (scrollVelocity * 0.002);
        symbol.rotZ += symbol.vRotZ + (scrollVelocity * 0.001);

        // 2. Parallax and Infinite Wrap
        // We removed currentScrollY from the Y position so they NEVER fly upwards.
        let worldY = symbol.y;
        worldY = ((worldY % wrapHeight) + wrapHeight) % wrapHeight - (wrapHeight / 2);

        let worldX = symbol.x;
        if (mouse.active) {
          const approxScreenX = worldX * (fov / (viewerDistance + symbol.z)) + width/2;
          const approxScreenY = worldY * (fov / (viewerDistance + symbol.z)) + height/2;
          const dx = approxScreenX - mouse.x;
          const dy = approxScreenY - mouse.y;
          const distSq = dx*dx + dy*dy;
          if (distSq < 100000) { 
            const push = (100000 - distSq) / 100000;
            worldX += (dx / Math.sqrt(distSq)) * push * 40; 
          }
        }

        // Chaotic fluttering (unstable horizontal movement while raining)
        worldX += Math.cos(time * (symbol.vy * 0.5) + symbol.y * 0.01) * (symbol.vy * 2);

        // Skip if strictly behind the camera
        if (symbol.z < -viewerDistance + 10) continue;

        // Project to 2D Screen
        const proj = project(worldX, worldY, symbol.z, fov, viewerDistance);
        proj.x += width / 2;
        proj.y += height / 2;
        
        // Culling (skip drawing if off-screen)
        const bounding = symbol.baseScale * proj.scale;
        if (proj.x < -bounding || proj.x > width + bounding || proj.y < -bounding || proj.y > height + bounding) {
          continue;
        }

        // Depth-based opacity & Scroll Flash
        const depthRatio = Math.max(0.05, 1 - (symbol.z / maxZ));
        const speedFlash = Math.min(0.5, Math.abs(scrollVelocity) * 0.015);
        const opacity = depthRatio * 0.6 + speedFlash;
        
        ctx.save();
        ctx.translate(proj.x, proj.y);
        
        // True 3D rotation mapping:
        // rotZ is 2D spin. rotX and rotY compress the text to simulate pitching/yawing.
        const scaleX = proj.scale * Math.cos(symbol.rotY);
        const scaleY = proj.scale * Math.cos(symbol.rotX);
        
        // Don't let scale hit absolute 0 or ctx flips out
        ctx.scale(Math.abs(scaleX) + 0.01, Math.abs(scaleY) + 0.01);
        ctx.rotate(symbol.rotZ);
        
        ctx.font = `600 ${symbol.baseScale}px "JetBrains Mono", monospace`;
        
        // Glow effect
        ctx.shadowBlur = speedFlash > 0.1 ? 15 : 0;
        ctx.shadowColor = `rgba(${symbol.colorBase}, 0.8)`;
        
        ctx.fillStyle = `rgba(${symbol.colorBase}, ${opacity})`;
        ctx.fillText(symbol.char, 0, 0);
        
        ctx.restore();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {SECTION_GLOWS.map((glow, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{ background: glow }}
          initial={false}
          animate={{ opacity: active === i ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      ))}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,hsl(var(--primary)/0.03),transparent_60%)]" />
    </div>
  );
};

export default StarBackground;
