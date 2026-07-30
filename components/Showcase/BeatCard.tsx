"use client";

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
      className={`group relative w-full max-w-[150px] sm:max-w-[320px] overflow-hidden rounded-2xl sm:rounded-3xl border transition-all duration-500 sm:hover:-translate-y-2 ${
        isSelected
          ? "border-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.35)]"
          : "border-white/10 sm:hover:border-violet-500/40"
      }`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={beat.cover}
          alt={beat.title}
          fill
          sizes="(max-width:640px) 150px, 280px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
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

        <button
          onClick={onPlay}
          aria-label={`Play ${beat.title}`}
          className="
            absolute
            left-1/2
            top-1/2
            flex
            h-10
            w-10
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-violet-600/90
            text-white
            shadow-xl
            backdrop-blur-sm
            opacity-90
            sm:h-16
            sm:w-16
            sm:opacity-0
            sm:scale-90
            sm:group-hover:scale-100
            sm:group-hover:opacity-100
          "
        >
          <Play size={18} className="ml-0.5 sm:hidden" />
          <Play size={28} className="ml-1 hidden sm:block" />
        </button>

        <div className="absolute inset-x-0 bottom-0 px-2 pb-3 pt-3 text-center sm:px-6 sm:pb-8">
          <h2 className="truncate text-xs font-bold text-white sm:text-xl">
            {beat.title}
          </h2>

          <p className="mt-0.5 text-[9px] text-neutral-300 sm:mt-1 sm:text-sm">
            {beat.genre}
          </p>

          <div className="mt-1 flex items-center justify-center gap-1 text-[7px] uppercase tracking-[0.08em] text-neutral-400 sm:mt-3 sm:gap-3 sm:text-xs sm:tracking-[0.18em]">
            <span>{beat.bpm}</span>
            <span>•</span>
            <span>{beat.key}</span>
          </div>
        </div>

        {isSelected && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-violet-500"
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