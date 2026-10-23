import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, Volume2, VolumeX, Shuffle, Music } from "lucide-react";
import { sound } from "@/lib/SoundEngine";

export const CozyMusicPlayer = () => {
  const tracks = [
    {
      id: 1,
      title: "Magical Moments",
      artist: "Purrple Cat",
      src: "/audio/track1-magical-moments.mp3",
    },
    {
      id: 2,
      title: "Cozy Cat Lofi",
      artist: "Chill Beats",
      src: "/audio/track2-cozy-cat.mp3",
    },
    {
      id: 3,
      title: "Peaceful Mind",
      artist: "Ambient Chill",
      src: "/audio/track3-empty-mind.mp3",
    },
  ];

  // Pick initial random track
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() =>
    Math.floor(Math.random() * tracks.length)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35); // Gentle cozy background volume
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

  // Pick next random track different from current
  const getRandomNextIndex = (currentIndex) => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * tracks.length);
    } while (nextIndex === currentIndex && tracks.length > 1);
    return nextIndex;
  };

  const handleNextTrack = () => {
    sound.click();
    const nextIdx = getRandomNextIndex(currentTrackIndex);
    setCurrentTrackIndex(nextIdx);
    if (audioRef.current) {
      audioRef.current.src = tracks[nextIdx].src;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const togglePlay = () => {
    sound.click();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    sound.click();
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.muted = newMuted;
  };

  // Set up audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.muted = isMuted;

    const handleEnded = () => {
      // Auto-shuffle on track finish
      const nextIdx = getRandomNextIndex(currentTrackIndex);
      setCurrentTrackIndex(nextIdx);
      audio.src = tracks[nextIdx].src;
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentTrackIndex, volume, isMuted]);

  return (
    <>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        preload="metadata"
      />

      {/* Floating Cozy Music Bar (Bottom-Left) */}
      <div className="fixed bottom-5 left-5 z-40">
        <div className="flex items-center gap-2.5 rounded-full border border-[#11111118] dark:border-white/10 bg-white/95 dark:bg-[#12141a]/95 px-3.5 py-2 text-xs shadow-xl backdrop-blur-md transition-all duration-200 hover:border-[#ff5a1f]/50">
          {/* Animated Equalizer Wave / Music Icon */}
          <button
            type="button"
            onClick={togglePlay}
            className="flex items-center gap-1 text-[#ff5a1f] pr-1 focus:outline-none"
            title={isPlaying ? "Pause music" : "Play cozy background music"}
          >
            {isPlaying ? (
              <div className="flex items-end gap-[2px] h-3.5 w-3.5 pb-0.5">
                <span className="w-1 bg-[#ff5a1f] rounded-full animate-bounce h-3" />
                <span className="w-1 bg-[#ff5a1f] rounded-full animate-bounce h-2 delay-100" />
                <span className="w-1 bg-[#ff5a1f] rounded-full animate-bounce h-3.5 delay-200" />
              </div>
            ) : (
              <Music className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </button>

          {/* Track Info */}
          <div className="flex flex-col max-w-[120px] sm:max-w-[160px] truncate leading-tight">
            <span className="label-mono text-[9px] font-bold text-foreground truncate">
              {isPlaying ? currentTrack.title : "Cozy Background Music"}
            </span>
            <span className="label-mono text-[8px] text-muted-foreground truncate">
              {isPlaying ? `Track ${currentTrackIndex + 1}/3 • ${currentTrack.artist}` : "Click to shuffle & play"}
            </span>
          </div>

          <div className="flex items-center gap-1 pl-1 border-l border-[#11111114] dark:border-white/10">
            {/* Play / Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] dark:bg-white text-white dark:text-black transition-transform hover:scale-105"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
            </button>

            {/* Random Shuffle / Next Button */}
            <button
              type="button"
              onClick={handleNextTrack}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-[#ff5a1f]"
              title="Shuffle to another random cozy track"
              aria-label="Next track"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>

            {/* Mute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-[#ff5a1f]"
              title={isMuted ? "Unmute" : "Mute"}
              aria-label="Toggle Mute"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
