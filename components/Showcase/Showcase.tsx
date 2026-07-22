"use client";

import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Beat, beats } from "@/data/beats";
import BeatCard from "./BeatCard";

interface ShowcaseProps {
  selectedBeat: Beat | null;
  onSelectBeat: (beat: Beat) => void;
}

const filters = ["ALL", "TRAP", "RAGE", "BREAKCORE"] as const;

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
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("ALL");

  const filteredBeats = useMemo(() => {
    if (activeFilter === "ALL") return beats;

    if (activeFilter === "TRAP") {
      return beats.filter((beat) =>
        beat.genre.toLowerCase().includes("trap")
      );
    }

    return beats.filter(
      (beat) => beat.genre.toUpperCase() === activeFilter
    );
  }, [activeFilter]);

  return (
    <main className="relative z-10 min-h-screen w-full">
      <div className="mx-auto max-w-[1800px] px-10 lg:px-12 xl:px-16 2xl:px-20 pt-24 pb-40">
        <header className="relative z-20 mb-32 text-center">
          <div className="flex flex-col items-center gap-10">

            <h1 className="text-5xl xl:text-6xl font-extralight tracking-[0.30em] text-white">
              SHOWCASE
            </h1>

            <p className="text-sm uppercase tracking-[0.45em] text-neutral-500">
              {filteredBeats.length} ORIGINAL PRODUCTIONS
            </p>

            <div className="flex justify-center">
              <div className="flex items-center gap-6">
                {filters.map((filter, index) => (
                  <>
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className="relative pb-2 text-xs font-medium uppercase tracking-[0.25em]"
                    >
                      <span
                        className={`transition-colors duration-300 ${
                          activeFilter === filter
                            ? "text-white"
                            : "text-neutral-500 hover:text-neutral-300"
                        }`}
                      >
                        {filter}
                      </span>

                      {activeFilter === filter && (
                        <motion.div
                          layoutId="filter-line"
                          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-violet-500"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 35,
                          }}
                        />
                      )}
                    </button>

                    {index < filters.length - 1 && (
                      <span className="select-none text-neutral-700">·</span>
                    )}
                  </>
                ))}
              </div>
            </div>

          </div>
        </header>

        <motion.section
          className="relative z-10 grid justify-center gap-x-10 gap-y-12"
          style={{
            marginTop: "70px",
            gridTemplateColumns: "repeat(auto-fit, 280px)",
          }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredBeats.map((beat) => (
            <motion.div key={beat.id} variants={cardVariants}>
              <BeatCard
                beat={beat}
                isSelected={selectedBeat?.id === beat.id}
                onPlay={() => onSelectBeat(beat)}
              />
            </motion.div>
          ))}
        </motion.section>
      </div>
    </main>
  );
}