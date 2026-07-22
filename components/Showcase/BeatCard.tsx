import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Beat } from "@/data/beats";

interface BeatCardProps {
  beat: Beat;
  isSelected: boolean;
  onPlay: () => void;
}

export default function BeatCard({
  beat,
  isSelected,
  onPlay,
}: BeatCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${
        isSelected
          ? "border-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.35)]"
          : "border-white/10 hover:border-violet-500/40"
      }`}
    >
      {/* COVER */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={beat.cover}
          alt={beat.title}
          fill
          sizes="(max-width:768px) 100vw, 20vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

        {/* Shine */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="
              absolute
              -left-[60%]
              top-0
              h-full
              w-1/3
              -skew-x-12
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              opacity-0
              transition-all
              duration-700
              ease-out
              group-hover:left-[150%]
              group-hover:opacity-100
            "
          />
        </div>

        {/* Play Button */}
        <button
          onClick={onPlay}
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-16
            w-16
            -translate-x-1/2
            -translate-y-1/2
            scale-90
            items-center
            justify-center
            rounded-full
            bg-violet-600/95
            text-white
            opacity-0
            shadow-xl
            shadow-violet-600/40
            transition-all
            duration-300
            group-hover:scale-100
            group-hover:opacity-100
            hover:bg-violet-500
          "
        >
          <Play size={28} className="ml-1" />
        </button>

        {/* INFO */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-6 text-center">
          <h2 className="truncate text-xl font-bold text-white">
            {beat.title}
          </h2>

          <p className="mt-1 text-sm text-neutral-300">
            {beat.genre}
          </p>

          <div className="mt-3 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.18em] text-neutral-400">
            <span>{beat.bpm} BPM</span>
            <span>•</span>
            <span>{beat.key}</span>
          </div>
        </div>

        {/* Selected Border */}
        {isSelected && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-violet-500"
            animate={{
              boxShadow: [
                "0 0 18px rgba(139,92,246,0.25)",
                "0 0 38px rgba(139,92,246,0.45)",
                "0 0 18px rgba(139,92,246,0.25)",
              ],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </article>
  );
}