import React from "react";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      {/* Mesh Background */}
      <div className="mesh-bg" aria-hidden="true" />
      <div className="bg-noise-grain" aria-hidden="true" />

      <div className="relative z-10 max-w-md w-full text-center p-8 rounded-3xl dark:bg-[#111622]/90 bg-white border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 rounded-3xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mx-auto mb-6 text-sky-400">
          <Sparkles className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400">
          Error 404
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
        </p>

        <a
          href="/"
          onClick={() => sound.click()}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-sky-400 hover:bg-sky-300 text-[#0A0D14] font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
