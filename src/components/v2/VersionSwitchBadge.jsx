import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

export const VersionSwitchBadge = ({ current = "v2" }) => {
  if (current === "v2") {
    return (
      <div className="fixed bottom-5 right-5 z-50">
        <div className="flex items-center gap-2 rounded-full border border-border bg-background/95 px-4 py-2 text-xs shadow-xl backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
          <span className="label-mono font-medium text-foreground text-[10px]">
            Previewing Clean Editorial V2
          </span>
          <span className="text-muted-foreground/60">•</span>
          <Link
            to="/"
            className="label-mono flex items-center gap-1 font-semibold text-[#ff5a1f] hover:underline text-[10px]"
          >
            <span>Current site</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Link
        to="/v2"
        className="group flex items-center gap-2.5 rounded-full border border-border bg-background/95 px-4 py-2.5 text-xs shadow-xl backdrop-blur-md transition-all hover:border-[#ff5a1f] hover:scale-105"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
        </span>
        <span className="font-mono text-[11px] text-foreground font-semibold">
          Preview New Minimal V2
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-[#ff5a1f] transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
};
