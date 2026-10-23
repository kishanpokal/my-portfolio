import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Music, X } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const CozyMusicPlayer = () => {
  const tracks = [
    {
      id: 1,
      title: "Snowfall",
      artist: "Øneheart & reidenshi",
      mood: "Dreamy & peaceful ambient",
      src: "/audio/track1-snowfall.mp3",
    },
    {
      id: 2,
      title: "A Walk",
      artist: "Tycho",
      mood: "Soft electronic & creative atmosphere",
      src: "/audio/track2-a-walk.mp3",
    },
    {
      id: 3,
      title: "Resonance",
      artist: "HOME",
      mood: "Warm synthwave & nostalgic chill",
      src: "/audio/track3-resonance.mp3",
    },
    {
      id: 4,
      title: "Near Light",
      artist: "Ólafur Arnalds",
      mood: "Emotional piano & ambient strings",
      src: "/audio/track4-near-light.mp3",
    },
    {
      id: 5,
      title: "Time",
      artist: "Hans Zimmer",
      mood: "Cinematic & thoughtful crescendo",
      src: "/audio/track5-time.mp3",
    },
  ];

  // Pick initial random track
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() =>
    Math.floor(Math.random() * tracks.length)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);
  const playerContainerRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

  // Pick next random track different from current
  const getRandomNextIndex = (currentIndex) => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } while (nextIndex === currentIndex && tracks.length > 1);
    return nextIndex;
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

  // When track index changes after user interaction, start playing automatically
  useEffect(() => {
    if (!hasInteracted) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = tracks[currentTrackIndex].src;
    playAudio();
  }, [currentTrackIndex]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35; // Soft comfortable cozy background level
    audio.muted = isMuted;

    const handleEnded = () => {
      const nextIdx = getRandomNextIndex(currentTrackIndex);
      setCurrentTrackIndex(nextIdx);
    };

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("play", handlePlay);
    };
  }, [currentTrackIndex, isMuted]);

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
    } else {
      audio.src = tracks[currentTrackIndex].src;
      playAudio();
    }
  };

  const handleShuffle = () => {
    sound.click();
    setHasInteracted(true);
    const nextIdx = getRandomNextIndex(currentTrackIndex);
    setCurrentTrackIndex(nextIdx);
  };

  const handleNext = () => {
    sound.click();
    setHasInteracted(true);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    sound.click();
    setHasInteracted(true);
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const selectTrack = (index) => {
    sound.click();
    setHasInteracted(true);
    setCurrentTrackIndex(index);
  };

  const toggleMute = () => {
    sound.click();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.muted = newMuted;
    }
  };

  return (
    <>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="auto"
      />

      <div ref={playerContainerRef} className="fixed bottom-5 left-5 z-50">
        {/* COLLAPSED STATE: Ultra-Creative Spinning Vinyl Turntable Icon */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              sound.click();
              setIsOpen(true);
            }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 focus:outline-none"
            title="Cozy Ambient Music (Click to open controls)"
            aria-label="Open Cozy Music Player"
          >
            {/* Ambient Warm Vinyl Glow when playing */}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full bg-[#ff5a1f]/25 blur-md animate-pulse pointer-events-none" />
            )}

            {/* Spinning Vinyl Record Disc */}
            <div
              className={`relative h-11 w-11 rounded-full border border-black/50 shadow-xl flex items-center justify-center transition-all ${
                isPlaying ? "animate-[spin_4s_linear_infinite]" : "group-hover:rotate-12"
              }`}
              style={{
                background:
                  "radial-gradient(circle at center, #232328 10%, #0e0f12 12%, #1b1c20 30%, #0c0d0f 32%, #1e1f24 55%, #0b0c0e 57%, #1a1b1f 78%, #090a0c 80%)",
                boxShadow: isPlaying
                  ? "0 0 16px rgba(255, 90, 31, 0.35), 0 6px 16px rgba(0,0,0,0.4)"
                  : "0 4px 12px rgba(0,0,0,0.25)",
              }}
            >
              {/* Concentric Vinyl Grooves */}
              <div className="absolute inset-1.5 rounded-full border border-white/[0.07] pointer-events-none" />
              <div className="absolute inset-2.5 rounded-full border border-white/[0.09] pointer-events-none" />
              <div className="absolute inset-3.5 rounded-full border border-white/[0.06] pointer-events-none" />

              {/* Center Vinyl Label (Sticker) */}
              <div className="relative flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-tr from-[#ff5a1f] to-[#ff7843] shadow-inner">
                {/* Center Spindle Hole */}
                <div className="h-1.5 w-1.5 rounded-full bg-[#0a0a0c] border border-black/60 shadow-sm" />
              </div>
            </div>

            {/* Miniature Stylus / Tonearm Needle */}
            <div
              className={`absolute -top-1 -right-0.5 origin-top-right transition-transform duration-500 ease-out pointer-events-none ${
                isPlaying ? "rotate-[14deg]" : "-rotate-[14deg]"
              }`}
            >
              <svg
                width="18"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
              >
                {/* Pivot Base */}
                <circle cx="14" cy="4" r="3.2" fill="#27272a" stroke="#71717a" strokeWidth="0.8" />
                <circle cx="14" cy="4" r="1.3" fill="#ff5a1f" />
                {/* Metallic Tonearm Rod */}
                <path
                  d="M13 5 L7.5 14.5 L4.5 17.5"
                  stroke="#d4d4d8"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                {/* Stylus Cartridge & Needle */}
                <rect
                  x="2"
                  y="16.5"
                  width="4"
                  height="2.5"
                  rx="0.5"
                  fill="#ff5a1f"
                  transform="rotate(-20 4 17.5)"
                />
              </svg>
            </div>

            {/* Tiny Floating Music Note when active */}
            {isPlaying && (
              <span className="absolute -top-1.5 left-1 text-[11px] text-[#ff5a1f] animate-bounce pointer-events-none">
                ♪
              </span>
            )}
          </button>
        )}

        {/* EXPANDED STATE: Sleek Floating Options Card */}
        {isOpen && (
          <div className="w-[290px] sm:w-[330px] rounded-xl border border-[#11111118] dark:border-white/10 bg-white/95 dark:bg-[#12141a]/95 p-4 shadow-2xl backdrop-blur-xl transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Top Bar with Title & Close Icon */}
            <div className="flex items-center justify-between border-b border-[#11111110] dark:border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#ff5a1f]/15 text-[#ff5a1f]">
                  <Music className="w-3.5 h-3.5" />
                </div>
                <span className="label-mono text-[10px] font-bold text-foreground">
                  Cozy Background Music
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

            {/* Current Track Info */}
            <div className="mt-3.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="headline text-base uppercase font-bold text-foreground truncate">
                  {currentTrack.title}
                </p>
                <span className="label-mono text-[9px] text-[#ff5a1f] shrink-0 font-semibold">
                  {currentTrackIndex + 1} / {tracks.length}
                </span>
              </div>
              <p className="label-mono text-[10.5px] font-semibold text-foreground/80 truncate">
                {currentTrack.artist}
              </p>
              {currentTrack.mood && (
                <p className="label-mono text-[9px] text-muted-foreground mt-0.5 truncate italic">
                  {currentTrack.mood}
                </p>
              )}

              {/* 5-track mini progress / selector dots */}
              <div className="flex items-center gap-1.5 mt-2.5">
                {tracks.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTrack(idx)}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentTrackIndex
                        ? "w-6 bg-[#ff5a1f]"
                        : "w-2 bg-black/15 dark:bg-white/20 hover:bg-[#ff5a1f]/60"
                    }`}
                    title={`${t.title} — ${t.artist}`}
                    aria-label={`Switch to ${t.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Control Options */}
            <div className="mt-3.5 flex items-center justify-between border-t border-[#11111110] dark:border-white/10 pt-3">
              {/* Shuffle Button */}
              <button
                type="button"
                onClick={handleShuffle}
                className="label-mono flex items-center gap-1 rounded-sm border border-[#11111114] dark:border-white/10 bg-[#eae7e1] dark:bg-white/5 px-2 py-1.5 text-[9px] font-bold text-foreground transition-all hover:border-[#ff5a1f] hover:text-[#ff5a1f] active:scale-95"
                title="Pick another random cozy track"
              >
                <Shuffle className="w-3 h-3 text-[#ff5a1f]" />
                <span>Shuffle</span>
              </button>

              {/* Prev / Play / Next playback group */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="rounded-full p-1.5 text-foreground/70 hover:text-[#ff5a1f] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  title="Previous track"
                  aria-label="Previous track"
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
                  title="Next track"
                  aria-label="Next track"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Mute Toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className="label-mono flex items-center gap-1 rounded-sm border border-[#11111114] dark:border-white/10 bg-[#eae7e1] dark:bg-white/5 px-2 py-1.5 text-[9px] font-bold text-foreground transition-all hover:border-[#ff5a1f] hover:text-[#ff5a1f] active:scale-95"
                title={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3 h-3 text-rose-500" />
                    <span>Muted</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3 text-[#ff5a1f]" />
                    <span>Mute</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
