"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Beat } from "@/data/beats";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
} from "lucide-react";

interface MobileAudioPlayerProps {
  beat: Beat | null;
  autoPlay: boolean;
  onNext: () => void;
  onPrevious: () => void;
  shuffleEnabled: boolean;
  onToggleShuffle: () => void;
}

export default function MobileAudioPlayer({
  beat,
  autoPlay,
  onNext,
  onPrevious,
  shuffleEnabled,
  onToggleShuffle,
}: MobileAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current || !beat) return;

    const shouldResume = wasPlayingRef.current || autoPlay;

    audioRef.current.pause();
    audioRef.current.src = beat.audio;
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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;

    const time = Number(e.target.value);

    audioRef.current.currentTime = time;
    setCurrentTime(time);
    };
  if (!beat) return null;

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

      <div className="fixed bottom-4 left-4 right-4 z-50 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl">
        <div className="px-4 py-4">

          {/* Información */}
          <div className="mx-2 flex items-center gap-3">

            <div className="relative h-14 w-14 overflow-hidden rounded-xl">
              <Image
                src={beat.cover}
                alt={beat.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="w-[calc(100%-5.5rem)]">
              <h2 className="truncate text-sm font-semibold text-white">
                {beat.title}
              </h2>

              <p className="mt-1 text-xs text-neutral-400">
                {beat.genre} · {beat.bpm} BPM · {beat.key}
              </p>
            </div>

          </div>

          {/* Barra temporal (luego pondremos el Waveform real) */}
          <div className="mt-5 px-5">

        <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="block w-full accent-violet-500"
        />

        <div className="mt-1 flex justify-between text-[11px] text-neutral-400">
            <span>
            {Math.floor(currentTime / 60)}:
            {(Math.floor(currentTime % 60)).toString().padStart(2, "0")}
            </span>

            <span>
            {Math.floor(duration / 60)}:
            {(Math.floor(duration % 60)).toString().padStart(2, "0")}
            </span>
        </div>

        </div>

          {/* Controles */}
          <div className="mt-6 flex items-center justify-center gap-6">

            <button
              onClick={() => {
                wasPlayingRef.current = isPlaying;
                onPrevious();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={handlePlayPause}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30"
            >
              {isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} className="ml-1" />
              )}
            </button>

            <button
              onClick={() => {
                wasPlayingRef.current = isPlaying;
                onNext();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            >
              <SkipForward size={18} />
            </button>

          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={onToggleShuffle}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                shuffleEnabled
                  ? "border-violet-500 bg-violet-600 text-white"
                  : "border-white/10 bg-white/5 text-white"
              }`}
            >
              <Shuffle size={16} />
            </button>
          </div>

        </div>
      </div>
    </>
  );
}