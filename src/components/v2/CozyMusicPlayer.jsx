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
        {/* COLLAPSED STATE: Sleek Minimalist Circular Icon */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              sound.click();
              setIsOpen(true);
            }}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[#11111118] dark:border-white/10 bg-white/95 dark:bg-[#12141a]/95 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#ff5a1f]"
            title="Cozy Background Music (Click to open)"
            aria-label="Open Cozy Music Player"
          >
            {isPlaying ? (
              /* Animated Dancing Equalizer Bars */
              <div className="flex items-end gap-[2.5px] h-4 w-4 pb-0.5">
                <span className="w-1 bg-[#ff5a1f] rounded-full animate-bounce h-3.5" />
                <span className="w-1 bg-[#ff5a1f] rounded-full animate-bounce h-2 delay-100" />
                <span className="w-1 bg-[#ff5a1f] rounded-full animate-bounce h-4 delay-200" />
              </div>
            ) : (
              /* Idle Music Note with hover effect */
              <Music className="w-4 h-4 text-foreground transition-colors group-hover:text-[#ff5a1f]" />
            )}

            {/* Glowing Accent Indicator if playing */}
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5a1f]" />
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
