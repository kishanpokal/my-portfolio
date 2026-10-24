import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Music, X } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const CozyMusicPlayer = () => {
  const tracks = [
    {
      id: 1,
      title: "Snowfall",
      labelColor: "from-sky-400 via-cyan-500 to-blue-600",
      accent: "#38bdf8",
      src: "/audio/track1-snowfall.mp3",
    },
    {
      id: 2,
      title: "A Walk",
      labelColor: "from-amber-400 via-orange-500 to-yellow-600",
      accent: "#f59e0b",
      src: "/audio/track2-a-walk.mp3",
    },
    {
      id: 3,
      title: "Resonance",
      labelColor: "from-purple-400 via-fuchsia-500 to-indigo-600",
      accent: "#c084fc",
      src: "/audio/track3-resonance.mp3",
    },
    {
      id: 4,
      title: "Near Light",
      labelColor: "from-emerald-400 via-teal-500 to-green-600",
      accent: "#34d399",
      src: "/audio/track4-near-light.mp3",
    },
    {
      id: 5,
      title: "Time",
      labelColor: "from-orange-500 via-rose-600 to-red-700",
      accent: "#ff5a1f",
      src: "/audio/track5-time.mp3",
    },
  ];

  // Pick initial random track
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() =>
    Math.floor(Math.random() * tracks.length)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_music_volume");
      return saved !== null ? parseFloat(saved) : 0.35;
    }
    return 0.35;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Turntable mechanical transition state
  const [tonearmRaised, setTonearmRaised] = useState(false);
  const [discAnimState, setDiscAnimState] = useState("seated"); // "seated" | "slide-up" | "slide-in"
  const [isChangingTrack, setIsChangingTrack] = useState(false);

  const audioRef = useRef(null);
  const playerContainerRef = useRef(null);
  const transitionTimeoutsRef = useRef([]);

  const currentTrack = tracks[currentTrackIndex];

  // Helper to clear any pending animation timeouts
  const clearAnimationTimeouts = () => {
    transitionTimeoutsRef.current.forEach((t) => clearTimeout(t));
    transitionTimeoutsRef.current = [];
  };

  // Safe playback trigger
  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play prevented:", err);
          setIsPlaying(false);
        });
    }
  };

  // Format mm:ss timestamps
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Pick next random track different from current
  const getRandomNextIndex = (currentIndex) => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } while (nextIndex === currentIndex && tracks.length > 1);
    return nextIndex;
  };

  // Mechanical Turntable Record Change Sequence:
  // 1. Tonearm lifts UP
  // 2. Old disc slides UP and out
  // 3. New disc slides IN from below
  // 4. Tonearm moves over and lowers DOWN onto the groove
  // 5. Disc starts spinning & music plays!
  const triggerMechanicalTrackChange = (nextIndex) => {
    sound.click();
    setHasInteracted(true);
    clearAnimationTimeouts();
    setCurrentTime(0);
    setDuration(0);

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setIsChangingTrack(true);

    // Step 1: Tonearm side lifts UP immediately
    setTonearmRaised(true);

    // Step 2: Old disc slides UP and out (after arm clears)
    const t1 = setTimeout(() => {
      setDiscAnimState("slide-up");

      // Step 3: Swap to new track and position new disc below
      const t2 = setTimeout(() => {
        setCurrentTrackIndex(nextIndex);
        setDiscAnimState("slide-in");

        // Step 4: New disc slides into place on turntable
        const t3 = setTimeout(() => {
          setDiscAnimState("seated");

          // Step 5: Tonearm pivots DOWN onto the new disc
          const t4 = setTimeout(() => {
            setTonearmRaised(false);

            // Step 6: Needle engages! Start running & playing!
            const t5 = setTimeout(() => {
              setIsChangingTrack(false);
              const aud = audioRef.current;
              if (aud) {
                aud.src = tracks[nextIndex].src;
                aud.load();
                aud
                  .play()
                  .then(() => setIsPlaying(true))
                  .catch(() => setIsPlaying(false));
              }
            }, 200);
            transitionTimeoutsRef.current.push(t5);
          }, 180);
          transitionTimeoutsRef.current.push(t4);
        }, 220);
        transitionTimeoutsRef.current.push(t3);
      }, 190);
      transitionTimeoutsRef.current.push(t2);
    }, 170);
    transitionTimeoutsRef.current.push(t1);
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => clearAnimationTimeouts();
  }, []);

  // Audio setup
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;

    const handleTimeUpdate = () => {
      if (!isSeeking && audio) {
        setCurrentTime(audio.currentTime || 0);
      }
    };

    const handleLoadedMetadata = () => {
      if (audio && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleDurationChange = () => {
      if (audio && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      const nextIdx = getRandomNextIndex(currentTrackIndex);
      triggerMechanicalTrackChange(nextIdx);
    };

    const handlePause = () => {
      if (!isChangingTrack) setIsPlaying(false);
    };
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, [currentTrackIndex, isMuted, volume, isChangingTrack, isSeeking]);

  // Close when clicking outside of the expanded player
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (playerContainerRef.current && !playerContainerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const togglePlay = () => {
    sound.click();
    setHasInteracted(true);
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setTonearmRaised(true);
    } else {
      setTonearmRaised(false);
      audio.src = tracks[currentTrackIndex].src;
      playAudio();
    }
  };

  const handleShuffle = () => {
    const nextIdx = getRandomNextIndex(currentTrackIndex);
    triggerMechanicalTrackChange(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    triggerMechanicalTrackChange(nextIdx);
  };

  const handlePrev = () => {
    const nextIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    triggerMechanicalTrackChange(nextIdx);
  };

  const selectTrack = (index) => {
    if (index === currentTrackIndex && isPlaying) return;
    triggerMechanicalTrackChange(index);
  };

  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = clickX / rect.width;
    if (audioRef.current && duration > 0) {
      const targetTime = percent * duration;
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_music_volume", String(newVol));
    }
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    sound.click();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
      if (!newMuted) {
        const activeVol = volume > 0 ? volume : 0.35;
        audioRef.current.volume = activeVol;
        if (volume === 0) setVolume(0.35);
      }
    }
  };

  // Reusable Realistic Vinyl Disc Component
  const renderVinylDisc = (size = 44) => {
    const isSpinning = isPlaying && !isChangingTrack;
    return (
      <div
        className="relative flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          transform:
            discAnimState === "slide-up"
              ? "translateY(-24px) scale(0.82)"
              : discAnimState === "slide-in"
              ? "translateY(24px) scale(0.82)"
              : "translateY(0) scale(1)",
          opacity: discAnimState === "seated" ? 1 : 0.15,
        }}
      >
        {/* Realistic Vinyl Body with Grooves & Running Sheen */}
        <div
          className={`relative w-full h-full rounded-full border border-black/70 shadow-2xl flex items-center justify-center overflow-hidden ${
            isSpinning ? "animate-[spin_4s_linear_infinite]" : ""
          }`}
          style={{
            background:
              "radial-gradient(circle at center, #26272c 0%, #101114 14%, #1f2025 28%, #0d0e10 42%, #222328 58%, #0b0c0d 74%, #18191c 90%, #08090a 100%)",
            boxShadow: isSpinning
              ? `0 0 18px ${currentTrack.accent}45, 0 6px 16px rgba(0,0,0,0.55)`
              : "0 4px 12px rgba(0,0,0,0.35)",
          }}
        >
          {/* Dual-Cone Specular Light Sheen (Authentic moving light reflection) */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-55"
            style={{
              background:
                "conic-gradient(from 45deg, rgba(255,255,255,0.24) 0deg, transparent 38deg, rgba(255,255,255,0.18) 90deg, transparent 128deg, rgba(255,255,255,0.24) 180deg, transparent 218deg, rgba(255,255,255,0.18) 270deg, transparent 308deg, rgba(255,255,255,0.24) 360deg)",
            }}
          />

          {/* Micro Vinyl Groove Rings */}
          <div className="absolute inset-[13%] rounded-full border border-white/[0.09] pointer-events-none" />
          <div className="absolute inset-[24%] rounded-full border border-white/[0.07] pointer-events-none" />
          <div className="absolute inset-[35%] rounded-full border border-white/[0.09] pointer-events-none" />

          {/* Center Label (Custom Gradient Per Track) */}
          <div
            className={`relative rounded-full bg-gradient-to-tr ${currentTrack.labelColor} shadow-inner flex items-center justify-center border border-white/25`}
            style={{
              width: `${Math.round(size * 0.38)}px`,
              height: `${Math.round(size * 0.38)}px`,
            }}
          >
            <div className="absolute inset-[1.5px] rounded-full border border-black/25" />
            {/* Center Spindle Hole */}
            <div
              className="rounded-full bg-[#0a0a0c] border border-black shadow-inner"
              style={{
                width: `${Math.max(4, Math.round(size * 0.12))}px`,
                height: `${Math.max(4, Math.round(size * 0.12))}px`,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  // Reusable Tonearm Component
  const renderTonearm = (isLarge = false) => {
    // Rotation logic:
    // When raised (changing music or paused): rotate(-32deg) - lifted high
    // When playing: rotate(14deg) - needle on the groove
    // When idle: rotate(-12deg) - on the arm rest
    const angle = tonearmRaised
      ? -32
      : isPlaying && !isChangingTrack
      ? 14
      : -12;

    return (
      <div
        className="absolute pointer-events-none transition-transform duration-500 ease-out origin-top-right drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]"
        style={{
          top: isLarge ? "-4px" : "-2px",
          right: isLarge ? "-2px" : "-1px",
          transform: `rotate(${angle}deg)`,
        }}
      >
        <svg
          width={isLarge ? "32" : "20"}
          height={isLarge ? "40" : "25"}
          viewBox="0 0 24 30"
          fill="none"
        >
          {/* Base Pivot */}
          <circle cx="19" cy="5" r="4.5" fill="#222328" stroke="#71717a" strokeWidth="1" />
          <circle cx="19" cy="5" r="2" fill={currentTrack.accent} />
          {/* Counterweight */}
          <rect x="17" y="0.5" width="4" height="2.2" rx="0.5" fill="#a1a1aa" />
          {/* Metallic Tonearm Rod */}
          <path
            d="M18 7 L10 20 L6 24"
            stroke="#e4e4e7"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Stylus Cartridge & Needle */}
          <rect
            x="3"
            y="23"
            width="5.5"
            height="3.2"
            rx="0.8"
            fill={currentTrack.accent}
            stroke="#090a0c"
            strokeWidth="0.6"
            transform="rotate(-20 5.5 24.5)"
          />
        </svg>
      </div>
    );
  };

  return (
    <>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
      />

      <div ref={playerContainerRef} className="fixed bottom-3.5 left-3.5 sm:bottom-5 sm:left-5 z-50">
        {/* COLLAPSED STATE: Ultra-Creative Spinning Vinyl Turntable Icon */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              sound.click();
              setIsOpen(true);
            }}
            className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none p-1"
            title="Cozy Ambient Music (Click to open controls)"
            aria-label="Open Cozy Music Player"
          >
            {/* Ambient Vinyl Warm Glow when running */}
            {isPlaying && !isChangingTrack && (
              <span
                className="absolute inset-0 rounded-full blur-md animate-pulse pointer-events-none"
                style={{ backgroundColor: `${currentTrack.accent}35` }}
              />
            )}

            {/* Turntable Platter Base Ring */}
            <div className="relative flex items-center justify-center rounded-full p-0.5 sm:p-1 bg-black/40 border border-black/40 backdrop-blur-sm shadow-xl">
              {renderVinylDisc(40)}
              {renderTonearm(false)}
            </div>

            {/* Floating Music Note when active */}
            {isPlaying && !isChangingTrack && (
              <span
                className="absolute -top-1.5 left-0.5 text-[11px] animate-bounce pointer-events-none font-bold"
                style={{ color: currentTrack.accent }}
              >
                ♪
              </span>
            )}
          </button>
        )}

        {/* EXPANDED STATE: Sleek Floating Options Card with Animated Deck */}
        {isOpen && (
          <div className="w-[min(340px,calc(100vw-28px))] rounded-2xl border border-[#11111118] dark:border-white/10 bg-white/95 dark:bg-[#12141a]/95 p-3.5 sm:p-4 shadow-2xl backdrop-blur-xl transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Top Bar with Title & Close Icon */}
            <div className="flex items-center justify-between border-b border-[#11111110] dark:border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center justify-center h-6 w-6 rounded-full text-white shadow-sm"
                  style={{ backgroundColor: currentTrack.accent }}
                >
                  <Music className="w-3.5 h-3.5" />
                </div>
                <span className="label-mono text-[10px] font-bold text-foreground">
                  Cozy Turntable Player
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setIsOpen(false);
                }}
                className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground"
                aria-label="Collapse player"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Turntable Visual Deck (Shows the real running disc & animated tonearm!) */}
            <div className="mt-3.5 flex items-center justify-center py-2 px-3 rounded-xl bg-gradient-to-b from-black/[0.04] to-black/[0.08] dark:from-white/[0.03] dark:to-white/[0.06] border border-[#11111110] dark:border-white/5 relative overflow-hidden">
              <div className="relative flex items-center justify-center p-3">
                {renderVinylDisc(68)}
                {renderTonearm(true)}
              </div>
            </div>

            {/* Current Track Title Only */}
            <div className="mt-3">
              <div className="flex items-baseline justify-between gap-2">
                <p className="headline text-lg uppercase font-bold text-foreground truncate tracking-wide">
                  {currentTrack.title}
                </p>
                <span
                  className="label-mono text-[10px] shrink-0 font-bold"
                  style={{ color: currentTrack.accent }}
                >
                  {currentTrackIndex + 1} / {tracks.length}
                </span>
              </div>

              {/* 5-track mini progress / selector dots */}
              <div className="flex items-center gap-1.5 mt-2.5">
                {tracks.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTrack(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentTrackIndex
                        ? "w-6"
                        : "w-2 bg-black/15 dark:bg-white/20 hover:bg-black/30 dark:hover:bg-white/40"
                    }`}
                    style={{
                      backgroundColor: idx === currentTrackIndex ? t.accent : undefined,
                    }}
                    title={t.title}
                    aria-label={`Switch to ${t.title}`}
                  />
                ))}
              </div>

              {/* Hairline Interactive Scrubber with Real-Time Timestamps */}
              <div className="mt-3 space-y-1">
                <div
                  role="slider"
                  tabIndex={0}
                  aria-valuemin={0}
                  aria-valuemax={Math.round(duration || 100)}
                  aria-valuenow={Math.round(currentTime)}
                  onClick={handleSeek}
                  className="group relative flex h-3.5 w-full cursor-pointer items-center"
                  title="Click anywhere to seek"
                >
                  {/* Background Track */}
                  <div className="h-1 w-full rounded-full bg-black/10 dark:bg-white/10 group-hover:h-1.5 transition-all overflow-hidden">
                    {/* Filled Progress Bar */}
                    <div
                      className="h-full rounded-full transition-all duration-75 ease-linear"
                      style={{
                        width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                        backgroundColor: currentTrack.accent,
                      }}
                    />
                  </div>

                  {/* Scrubber Knob / Thumb */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full border border-white bg-[#111111] dark:bg-white shadow-md transition-transform group-hover:scale-125"
                    style={{
                      left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                      borderColor: currentTrack.accent,
                    }}
                  />
                </div>

                {/* Real-time Timestamps (mm:ss / mm:ss) */}
                <div className="flex items-center justify-between text-[10px] font-mono font-medium text-muted-foreground px-0.5">
                  <span>{formatTime(currentTime)}</span>
                  <span className="opacity-70">{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            {/* Interactive Control Options */}
            <div className="mt-3 flex items-center justify-between border-t border-[#11111110] dark:border-white/10 pt-3">
              {/* Shuffle Button */}
              <button
                type="button"
                onClick={handleShuffle}
                className="label-mono flex items-center gap-1 rounded-sm border border-[#11111114] dark:border-white/10 bg-[#eae7e1] dark:bg-white/5 px-2 py-1.5 text-[9px] font-bold text-foreground transition-all hover:border-[#ff5a1f] hover:text-[#ff5a1f] active:scale-95"
                title="Shuffle and change to a random vinyl record"
              >
                <Shuffle className="w-3 h-3 text-[#ff5a1f]" />
                <span className="hidden xs:inline">Shuffle</span>
              </button>

              {/* Prev / Play / Next playback group */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="rounded-full p-1.5 text-foreground/70 hover:text-[#ff5a1f] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  title="Previous record"
                  aria-label="Previous record"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] dark:bg-white text-white dark:text-black shadow-sm transition-transform hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-full p-1.5 text-foreground/70 hover:text-[#ff5a1f] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  title="Next record"
                  aria-label="Next record"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Volume Slider & Mute Toggle */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="rounded-full p-1 text-muted-foreground hover:text-[#ff5a1f] transition-colors"
                  title={isMuted ? "Unmute sound" : "Mute sound"}
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-500" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-[#ff5a1f]" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="h-1 w-12 sm:w-14 cursor-pointer accent-[#ff5a1f] bg-black/10 dark:bg-white/15 rounded-lg appearance-none"
                  title={`Volume: ${isMuted ? 0 : Math.round(volume * 100)}%`}
                  aria-label="Volume slider"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
