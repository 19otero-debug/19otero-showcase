"use client";

import useWaveform from "@/hooks/useWaveform";

interface WaveformProps {
  audioSrc: string;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export default function Waveform({
  audioSrc,
  currentTime,
  duration,
  onSeek,
}: WaveformProps) {
  const { bars, loading } = useWaveform(audioSrc);
    console.log({ loading, bars });
  const progress = duration > 0 ? currentTime / duration : 0;

  if (loading) {
    return (
      <div className="h-16 w-full animate-pulse rounded-lg bg-white/5" />
    );
  }

  return (
    <div
      className="group flex h-16 w-full cursor-pointer items-end gap-[2px] pb-2"
      onClick={(e) => {
        if (!duration) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;

        onSeek(percent * duration);
      }}
    >
      {bars.map((height, index) => {
        const active = index / bars.length <= progress;

        return (
          <div
            key={index}
            className={`
              flex-1 rounded-full transition-all duration-200
              ${active ? "bg-violet-500" : "bg-white/20"}
              group-hover:bg-opacity-100
            `}
            style={{
              height: `${height}%`,
            }}
          />
        );
      })}
    </div>
  );
}