"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Beat, beats } from "@/data/beats";
import BeatCard from "./BeatCard";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa6";

interface ShowcaseProps {
  selectedBeat: Beat | null;
  onSelectBeat: (beat: Beat) => void;
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Showcase({
  selectedBeat,
  onSelectBeat,
}: ShowcaseProps) {
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBeats = useMemo(() => {
    if (searchQuery.trim() === "") return beats;

    const query = searchQuery.toLowerCase();

    return beats.filter((beat) => {
      return (
        beat.title.toLowerCase().includes(query) ||
        beat.genre.toLowerCase().includes(query) ||
        beat.key.toLowerCase().includes(query) ||
        beat.bpm.toString().includes(query) ||
        beat.description.toLowerCase().includes(query) ||
        beat.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [searchQuery]);

  const sortedBeats = useMemo(() => {
    return [...filteredBeats].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [filteredBeats, sortOrder]);

  return (
    <main className="relative z-10 min-h-screen w-full">
      <div className="mx-auto max-w-[1800px] px-4 pt-16 pb-40 sm:px-6 md:px-10 md:pt-24 lg:px-12 xl:px-16 2xl:px-20">
        <header className="relative z-20 mb-20 text-center md:mb-32">
          <div className="flex flex-col items-center gap-8 md:gap-10">
            <h1 className="text-3xl font-extralight tracking-[0.18em] text-white sm:text-4xl md:text-5xl md:tracking-[0.30em] xl:text-6xl">
              SHOWCASE
            </h1>

            <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 sm:text-xs md:text-sm md:tracking-[0.45em]">
              {sortedBeats.length} ORIGINAL PRODUCTIONS
            </p>

            <div className="w-full max-w-3xl px-1 sm:px-0">
              <input
                type="text"
                placeholder="Search by title, genre, BPM, key..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-4 text-base text-white placeholder:text-neutral-500 outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white/10 focus:shadow-[0_0_30px_rgba(139,92,246,0.15)] md:px-7 md:py-6 md:text-lg"
              />
            </div>

            <div className="mt-2 flex w-full max-w-3xl justify-center md:mt-3">
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
                className="cursor-pointer bg-transparent text-sm font-medium uppercase tracking-[0.25em] text-neutral-400 outline-none transition-all duration-300 hover:text-white md:text-base md:tracking-[0.35em]"
              >
                <option value="newest" className="bg-black">
                  NEWEST
                </option>

                <option value="oldest" className="bg-black">
                  OLDEST
                </option>
              </select>
            </div>
          </div>
        </header>

        <motion.section
          className="relative z-10 grid justify-center gap-x-10 gap-y-12"
          style={{
            marginTop: "50px",
            gridTemplateColumns: "repeat(auto-fit, 280px)",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {sortedBeats.length === 0 ? (
            <div className="col-span-full py-24 text-center">
              <p className="text-lg uppercase tracking-[0.25em] text-neutral-500">
                NO BEATS FOUND
              </p>
            </div>
          ) : (
            sortedBeats.map((beat) => (
              <motion.div key={beat.id} variants={cardVariants}>
                <BeatCard
                  beat={beat}
                  isSelected={selectedBeat?.id === beat.id}
                  onPlay={() => onSelectBeat(beat)}
                />
              </motion.div>
            ))
          )}
        </motion.section>

        <footer className="mt-32 border-t border-white/10 pt-12 pb-32 md:mt-40">
          <div className="flex flex-col items-center gap-8">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-500 md:tracking-[0.45em]">
              FOLLOW
            </p>

            <div className="flex items-center gap-8 text-neutral-500">
              <a
                href="https://instagram.com/prod.otero"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <FaInstagram size={22} />
              </a>

              <a
                href="https://youtube.com/@prod.19otero"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <FaYoutube size={22} />
              </a>

              <a
                href="https://tiktok.com/@19wockyslush"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                <FaTiktok size={20} />
              </a>
            </div>

            <p className="text-xs tracking-[0.25em] text-neutral-600">
              © 2026 19OTERO
            </p>
          </div>
        </footer>
      </div>

      <div className="sr-only">
        {beats.map((beat) => (
          <article key={beat.id}>
            <h2>{beat.title}</h2>

            <p>{beat.description}</p>

            <p>
              Genre: {beat.genre} | BPM: {beat.bpm} | Key: {beat.key}
            </p>

            <p>{beat.tags.join(", ")}</p>
          </article>
        ))}
      </div>
    </main>
  );
}