import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      {/* Mesh Background */}
      <div className="mesh-bg" aria-hidden="true" />

      <div className="relative z-10 max-w-md w-full text-center p-8 rounded-3xl bg-card border border-border shadow-2xl">
        <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 text-primary">
          <Sparkles className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          Error 404
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-3">
          Coordinates Lost.
        </h1>

        <p className="text-sm text-muted-foreground leading-relaxed mb-8">
          The module or page you are attempting to access does not exist in this deployment.
        </p>

        <a
          href="/"
          onClick={() => sound.click()}
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-gradient-to-r from-primary via-purple-600 to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:opacity-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Command Center</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
