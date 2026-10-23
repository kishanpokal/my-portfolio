import React from "react";
import { ArrowUp } from "lucide-react";

export const FooterV2 = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 overflow-hidden bg-[#0c0d10] text-[#f2f0ec] pt-20">
      <div className="relative mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Identity */}
          <div className="col-span-2 md:col-span-1">
            <a href="#top" className="headline text-2xl font-bold tracking-tight text-white block">
              Kishan<span className="text-[#ff5a1f]">.</span>
            </a>
            <p className="mt-3 text-xs leading-relaxed text-[#8a8a85]">
              Android &amp; AI Developer building high-performance mobile architectures and intelligent applications.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Explore">
            <h3 className="label-mono text-xs font-bold text-white">Explore</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a href="#top" className="label-mono text-xs text-[#8a8a85] transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="label-mono text-xs text-[#8a8a85] transition-colors hover:text-white">
                  Projects
                </a>
              </li>
              <li>
                <a href="#experience" className="label-mono text-xs text-[#8a8a85] transition-colors hover:text-white">
                  Experience
                </a>
              </li>
              <li>
                <a href="#about" className="label-mono text-xs text-[#8a8a85] transition-colors hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#stack" className="label-mono text-xs text-[#8a8a85] transition-colors hover:text-white">
                  Stack
                </a>
              </li>
            </ul>
          </nav>

          {/* Flagships */}
          <nav aria-label="Flagships">
            <h3 className="label-mono text-xs font-bold text-white">Flagships</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.kishan.trackeasy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono flex items-center gap-1 text-xs text-[#8a8a85] transition-colors hover:text-white"
                >
                  <span>TrackEasy</span>
                  <span className="text-[10px] text-[#ff5a1f]">↗</span>
                </a>
              </li>
              <li>
                <span className="label-mono flex items-center gap-1 text-xs text-[#8a8a85]">
                  <span>Maunam (3D)</span>
                </span>
              </li>
              <li>
                <a
                  href="https://github.com/kishanpokal/AttendMate2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono flex items-center gap-1 text-xs text-[#8a8a85] transition-colors hover:text-white"
                >
                  <span>AttendMate</span>
                  <span className="text-[10px] text-[#ff5a1f]">↗</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Socials */}
          <nav aria-label="Socials">
            <h3 className="label-mono text-xs font-bold text-white">Socials</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              <li>
                <a
                  href="https://github.com/KishanPokal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono flex items-center gap-1 text-xs text-[#8a8a85] transition-colors hover:text-white"
                >
                  <span>GitHub</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/kishanpokal956/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-mono flex items-center gap-1 text-xs text-[#8a8a85] transition-colors hover:text-white"
                >
                  <span>LinkedIn</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:kishanpokal956@gmail.com"
                  className="label-mono flex items-center gap-1 text-xs text-[#8a8a85] transition-colors hover:text-white"
                >
                  <span>Email</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-mono text-[10px] text-[#8a8a85]">
            © {new Date().getFullYear()} Kishan Pokal. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="label-mono flex items-center gap-1.5 w-fit text-[11px] text-[#8a8a85] transition-colors hover:text-[#ff5a1f]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Massive Editorial Watermark Typography */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto -mb-[2vw] max-w-[1280px] select-none px-4 md:px-8 overflow-hidden"
      >
        <p className="headline-minecraft whitespace-nowrap text-center text-[10vw] leading-[0.8] tracking-tight text-white/[0.04] xl:text-[130px]">
          KISHAN POKAL
        </p>
      </div>
    </footer>
  );
};
