"use client";
import Waveform from "./Waveform";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Volume2,
  Shuffle,
} from "lucide-react";
import { Beat } from "@/data/beats";


interface AudioPlayerProps {
  beat: Beat | null;
  autoPlay: boolean;
  onNext: () => void;
  onPrevious: () => void;
  shuffleEnabled: boolean;
  onToggleShuffle: () => void;
}

export default function AudioPlayer({
  beat,
  autoPlay,
  onNext,
  onPrevious,
  shuffleEnabled,
  onToggleShuffle,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!audioRef.current || !beat) return;

    const shouldResume = wasPlayingRef.current || autoPlay;

    audioRef.current.pause();
    audioRef.current.src = beat.audio;
    audioRef.current.volume = volume;
    audioRef.current.load();

    setCurrentTime(0);
    setDuration(0);

    if (shouldResume) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    } else {
      setIsPlaying(false);
    }
  }, [beat, autoPlay]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // No actuar si el usuario está escribiendo
      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.code === "Space") {
        e.preventDefault();

        if (!audioRef.current) return;

        if (audioRef.current.paused) {
          audioRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              wasPlayingRef.current = true;
            })
            .catch(console.error);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
          wasPlayingRef.current = false;
        }
      }
      if (e.code === "ArrowRight") {
        e.preventDefault();

        wasPlayingRef.current = !audioRef.current?.paused;
        onNext();

        return;
      }

      if (e.code === "ArrowLeft") {
        e.preventDefault();

        wasPlayingRef.current = !audioRef.current?.paused;
        onPrevious();

        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNext, onPrevious]);


  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  if (!beat) return null;

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    wasPlayingRef.current = isPlaying;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSeek = (value: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        onLoadedMetadata={() =>
          setDuration(audioRef.current?.duration || 0)
        }
        onTimeUpdate={() =>
          setCurrentTime(audioRef.current?.currentTime || 0)
        }
        onEnded={() => {
          wasPlayingRef.current = true;
          onNext();
        }}
      />
      

      <div className="sticky bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/85 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-8 py-5">

          <div className="flex items-center gap-6">

            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={beat.id}
                initial={{
                  opacity: 0,
                  scale: 1.08,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={beat.cover}
                  alt={beat.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

            <div className="min-w-0 flex-1">

              <AnimatePresence mode="wait">
                <motion.div
                  key={beat.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <h2 className="truncate text-xl font-semibold text-white">
                    {beat.title}
                  </h2>

                  <p className="mt-2 text-sm text-neutral-400">
                    {beat.genre} · {beat.bpm} BPM · {beat.key
                      .replace(" MINOR", "m")
                      .replace(" MAJOR", "")}
                </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center gap-4">

                <span className="w-10 text-xs text-neutral-400">
                  {formatTime(currentTime)}
                </span>

                <div className="flex-1">
                  <Waveform
                    audioSrc={beat.audio}
                    currentTime={currentTime}
                    duration={duration}
                    onSeek={handleSeek}
                  />
                </div>

                <span className="w-10 text-right text-xs text-neutral-400">
                  {formatTime(duration)}
                </span>

              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0">

              {/* Previous */}

              <button
                onClick={() => {
                  wasPlayingRef.current = isPlaying;
                  onPrevious();
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:scale-105 hover:border-violet-500 hover:bg-violet-500/15"
              >
                <SkipBack size={18} />
              </button>

              {/* Play */}

              <button
                onClick={handlePlayPause}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30 transition hover:scale-105 hover:bg-violet-500"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isPlaying ? (
                    <motion.div
                      key="pause"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Pause size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="play"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Play size={24} className="ml-1" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              {/* Next */}
              <button
                onClick={() => {
                  wasPlayingRef.current = isPlaying;
                  onToggleShuffle();
                }}
                className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-200 hover:scale-105 ${
                  shuffleEnabled
                    ? "border-violet-500 bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                    : "border-white/10 bg-white/5 text-white hover:border-violet-500 hover:bg-violet-500/15"
                }`}
              >
                <Shuffle size={18} />
              </button>
              <button
                onClick={() => {
                  wasPlayingRef.current = isPlaying;
                  onNext();
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:scale-105 hover:border-violet-500 hover:bg-violet-500/15"
              >
                <SkipForward size={18} />
              </button>

              {/* Volumen */}

              <div className="flex items-center gap-3 w-56">

                <Volume2
                  size={18}
                  className="text-neutral-400 shrink-0"
                />

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="h-1 w-full cursor-pointer accent-violet-500"
                />

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}