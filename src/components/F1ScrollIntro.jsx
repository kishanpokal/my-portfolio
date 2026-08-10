import { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 240;
const FPS = 30;

// Setup.png is 1672x941 (~16:9)
const IMAGE_WIDTH = 1672;
const IMAGE_HEIGHT = 941;
const IMAGE_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

// Pixel-perfect inner screen bounds (inset 5px from bezels):
// X: 305→1319, Y: 218→595 in the 1672×941 image
const SCREEN_TOP = 218 / IMAGE_HEIGHT;
const SCREEN_LEFT = 305 / IMAGE_WIDTH;
const SCREEN_WIDTH = (1319 - 305) / IMAGE_WIDTH;
const SCREEN_HEIGHT = (595 - 218) / IMAGE_HEIGHT;

export const F1ScrollIntro = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [canvasStyle, setCanvasStyle] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.webp`;
      img.onload = () => {
        loaded++;
        if (loaded % 5 === 0 || loaded === TOTAL_FRAMES) setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setTimeout(() => setIsReady(true), 400);
      };
      img.onerror = () => { loaded++; if (loaded === TOTAL_FRAMES) setIsReady(true); };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Map canvas position over the monitor screen using object-cover math
  useLayoutEffect(() => {
    const map = (cw, ch) => {
      const cr = cw / ch;
      let rw, rh, ox, oy;
      if (cr > IMAGE_RATIO) {
        // wider container → vertically cropped
        rw = cw; rh = cw / IMAGE_RATIO; ox = 0; oy = (ch - rh) / 2;
      } else {
        // taller container → horizontally cropped
        rh = ch; rw = ch * IMAGE_RATIO; ox = (cw - rw) / 2; oy = 0;
      }
      setCanvasStyle({
        top: oy + rh * SCREEN_TOP,
        left: ox + rw * SCREEN_LEFT,
        width: rw * SCREEN_WIDTH,
        height: rh * SCREEN_HEIGHT,
      });
    };

    const ro = new ResizeObserver(entries => {
      for (const e of entries) map(e.contentRect.width, e.contentRect.height);
    });
    if (containerRef.current) {
      map(containerRef.current.clientWidth, containerRef.current.clientHeight);
      ro.observe(containerRef.current);
    }
    return () => ro.disconnect();
  }, []);

  // Render a frame onto the canvas
  const renderFrame = useCallback((idx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[Math.max(0, Math.min(idx, TOTAL_FRAMES - 1))];
    if (!img?.complete || !img.naturalWidth) return;

    const { width, height } = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    // Draw frame with cover-fill logic
    const ir = img.naturalWidth / img.naturalHeight;
    const cr = width / height;
    let rw, rh, dx, dy;
    if (cr > ir) { rw = width; rh = width / ir; dx = 0; dy = (height - rh) / 2; }
    else { rw = height * ir; rh = height; dx = (width - rw) / 2; dy = 0; }
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, dx, dy, rw, rh);
  }, []);

  // Auto-play loop
  useEffect(() => {
    if (!isReady) return;
    let raf; let last = performance.now(); const interval = 1000 / FPS;
    const loop = (t) => {
      if (t - last >= interval) {
        currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
        renderFrame(currentFrameRef.current);
        last = t - ((t - last) % interval);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isReady, renderFrame]);

  // Re-render on resize
  useEffect(() => {
    const h = () => isReady && renderFrame(currentFrameRef.current);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [isReady, renderFrame]);

  const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <>
      {/* ── Global Loading Screen ── */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background backdrop-blur-xl"
          >
            <div className="text-4xl sm:text-6xl font-mono font-extralight tracking-[0.2em] text-foreground/90 mb-8 tabular-nums">
              {pct.toString().padStart(3, "0")}
              <span className="text-foreground/30 text-xl sm:text-2xl">%</span>
            </div>
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="mt-6 text-xs uppercase tracking-[0.5em] text-foreground/50 font-mono">
              Booting environment
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Section: 100dvh, edge-to-edge ── */}
      <div className="w-full h-[100dvh] relative z-20 bg-[#0a0a0a] overflow-hidden">

        {/* Background setup image — object-cover fills the viewport */}
        <div
          ref={containerRef}
          className="absolute inset-0 w-full h-full overflow-hidden"
        >
          <img
            src="/assets/Setup.png"
            alt="Developer Workspace Setup"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
          />

          {/* Canvas overlay pinned to the monitor screen */}
          <div
            className="absolute z-10 overflow-hidden"
            style={{
              top: `${canvasStyle.top}px`,
              left: `${canvasStyle.left}px`,
              width: `${canvasStyle.width}px`,
              height: `${canvasStyle.height}px`,
              // Slight overscan hides sub-pixel green bleed on zoom
              transform: "scale(1.03)",
              transformOrigin: "center center",
            }}
          >
            <canvas
              ref={canvasRef}
              className={`block w-full h-full transition-opacity duration-1000 ${isReady ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </div>

        {/* Mobile overlay: name + tagline so there's readable content on small screens */}
        {isMobile && isReady && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute inset-x-0 bottom-0 z-20 px-6 pb-20 pt-32"
            style={{ background: "linear-gradient(to top, rgba(10,10,10,0.95) 30%, transparent 100%)" }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              Kishan Pokal
            </h1>
            <p className="mt-2 text-sm text-white/60 max-w-xs">
              Creating together, growing together.
            </p>
          </motion.div>
        )}

        {/* Scroll indicator */}
        {isReady && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
          >
            <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5 backdrop-blur-md bg-black/30">
              <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default F1ScrollIntro;
