import { useRef, useEffect, useState, useCallback, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_FRAMES = 240;
const FPS = 30; // Target frames per second for auto-playback

// Original dimensions of the new Setup.png (1672x941)
const IMAGE_WIDTH = 1672;
const IMAGE_HEIGHT = 941;
const IMAGE_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

// Mathematically precise coordinates for the actual green screen in the new 1672x941 Setup.png
const BASE_TOP_PCT = 25.01 / 100;
const BASE_LEFT_PCT = 29.35 / 100;
const BASE_WIDTH_PCT = 40.40 / 100;
const BASE_HEIGHT_PCT = 32.70 / 100;

/**
 * F1 PC Setup Monitor Intro
 * 
 * Auto-plays 240 WebP frames inside the screen of a PC setup image.
 * Uses advanced dynamic math to keep the canvas perfectly mapped to the monitor
 * even when the background image is cropped by object-fit: cover to fill a 100vh screen.
 */
export const F1ScrollIntro = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [canvasStyle, setCanvasStyle] = useState({
    top: 0, left: 0, width: 0, height: 0
  });

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, "0");
      img.src = `/frames/frame_${frameNum}.webp`;
      
      img.onload = () => {
        loaded++;
        if (loaded % 5 === 0 || loaded === TOTAL_FRAMES) {
          setLoadedCount(loaded);
        }
        if (loaded === TOTAL_FRAMES) {
          setTimeout(() => setIsReady(true), 500); // Small delay to let final bar animate
        }
      };
      
      img.onerror = () => {
        loaded++;
        if (loaded === TOTAL_FRAMES) setIsReady(true);
      };
      
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Calculate dynamic canvas coordinates to counter object-cover cropping
  useLayoutEffect(() => {
    const updateCanvasMapping = (containerWidth, containerHeight) => {
      const containerRatio = containerWidth / containerHeight;
      let renderedWidth, renderedHeight, offsetX, offsetY;

      // object-fit: cover logic
      if (containerRatio > IMAGE_RATIO) {
        // Container is wider than image aspect ratio -> image is cropped vertically
        renderedWidth = containerWidth;
        renderedHeight = containerWidth / IMAGE_RATIO;
        offsetX = 0;
        offsetY = (containerHeight - renderedHeight) / 2;
      } else {
        // Container is taller than image aspect ratio -> image is cropped horizontally
        renderedHeight = containerHeight;
        renderedWidth = containerHeight * IMAGE_RATIO;
        offsetX = (containerWidth - renderedWidth) / 2;
        offsetY = 0;
      }

      setCanvasStyle({
        top: offsetY + (renderedHeight * BASE_TOP_PCT),
        left: offsetX + (renderedWidth * BASE_LEFT_PCT),
        width: renderedWidth * BASE_WIDTH_PCT,
        height: renderedHeight * BASE_HEIGHT_PCT,
      });
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        updateCanvasMapping(entry.contentRect.width, entry.contentRect.height);
      }
    });

    if (containerRef.current) {
      updateCanvasMapping(containerRef.current.clientWidth, containerRef.current.clientHeight);
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // Canvas render function
  const renderFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const frameIdx = Math.max(0, Math.min(index, TOTAL_FRAMES - 1));
    const img = imagesRef.current[frameIdx];
    
    if (!img || !img.complete || !img.naturalWidth) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    }

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let renderW, renderH, drawX, drawY;

    if (canvasRatio > imgRatio) {
      renderW = width;
      renderH = width / imgRatio;
      drawX = 0;
      drawY = (height - renderH) / 2;
    } else {
      renderW = height * imgRatio;
      renderH = height;
      drawX = (width - renderW) / 2;
      drawY = 0;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, drawX, drawY, renderW, renderH);
  }, []);

  // Auto-play animation loop
  useEffect(() => {
    if (!isReady) return;

    let animationFrameId;
    let lastTime = performance.now();
    const interval = 1000 / FPS;

    const playLoop = (time) => {
      const deltaTime = time - lastTime;
      
      if (deltaTime >= interval) {
        currentFrameRef.current = (currentFrameRef.current + 1) % TOTAL_FRAMES;
        renderFrame(currentFrameRef.current);
        lastTime = time - (deltaTime % interval);
      }
      
      animationFrameId = requestAnimationFrame(playLoop);
    };

    animationFrameId = requestAnimationFrame(playLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isReady, renderFrame]);

  // Force re-render of canvas contents when the window is resized
  useEffect(() => {
    const handleResize = () => {
      if (isReady) {
        renderFrame(currentFrameRef.current);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady, renderFrame]);

  const loadProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <>
      <AnimatePresence>
        {!isReady && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background backdrop-blur-xl"
          >
            <div className="text-4xl sm:text-6xl font-mono font-extralight tracking-[0.2em] text-foreground/90 mb-8 tabular-nums">
              {loadProgress.toString().padStart(3, "0")}
              <span className="text-foreground/30 text-xl sm:text-2xl">%</span>
            </div>
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="mt-6 text-xs uppercase tracking-[0.5em] text-foreground/50 font-mono">
              Booting environment
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Strictly locked to 100vh so scrolling immediately moves to the next section */}
      <div className="w-full h-[100dvh] relative z-20 bg-[#0c0c0c] overflow-hidden">
        
        {/* Dynamic Object-Cover Container */}
        <div 
          ref={containerRef}
          className="relative w-full h-full overflow-hidden flex items-center justify-center"
        >
          {/* The PC Setup Asset Image */}
          <img 
            src="/assets/Setup.png" 
            alt="Developer Workspace Setup" 
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* The Overlay Screen Area mapped dynamically by JS math */}
          <div 
            className="absolute z-10 overflow-hidden bg-black flex items-center justify-center rounded-sm"
            style={{
              top: `${canvasStyle.top}px`,
              left: `${canvasStyle.left}px`,
              width: `${canvasStyle.width}px`,
              height: `${canvasStyle.height}px`,
              transform: 'perspective(1000px)',
            }}
          >
            {/* Canvas playing the F1 animation inside the monitor */}
            <canvas
              ref={canvasRef}
              className={`block w-full h-full transition-opacity duration-1000 ${
                isReady ? "opacity-100" : "opacity-0"
              }`}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Scroll down indicator */}
        {isReady && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          >
            <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5 backdrop-blur-md shadow-lg shadow-black/20 bg-black/40">
              <div className="w-1 h-2 bg-white/80 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default F1ScrollIntro;
