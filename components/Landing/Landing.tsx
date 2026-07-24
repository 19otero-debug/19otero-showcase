"use client";

import { useEffect, useState } from "react";

type LandingProps = {
  onEnter: () => void;
};

export default function Landing({ onEnter }: LandingProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!leaving) return;

    const timeout = setTimeout(() => {
      onEnter();
    }, 400);

    return () => clearTimeout(timeout);
  }, [leaving, onEnter]);

  const handleClick = () => {
    setLeaving(true);
  };

  return (
    <main
      className={`relative z-10 flex min-h-screen items-center justify-center px-6 transition-all duration-500 ${
        leaving ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="text-center">
        <p className="mb-4 text-[10px] tracking-[0.45em] text-gray-400 sm:text-xs sm:tracking-[0.6em]">
          @19OTERO
        </p>

        <h1 className="text-5xl font-light tracking-[0.12em] text-white sm:text-6xl sm:tracking-[0.18em] md:text-8xl md:tracking-[0.25em]">
          SHOWCASE
        </h1>

        <button
        style={{
  position: "relative",
  zIndex: 9999,
}}
          onClick={handleClick}
          disabled={leaving}
          className="
            mt-10
            cursor-pointer
            rounded-full
            border-2
            border-white/40
            px-10
            py-4
            text-xl
            font-semibold
            tracking-[0.2em]
            uppercase
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:border-white
            hover:bg-white
            hover:text-black
            active:scale-95
            disabled:pointer-events-none
            sm:mt-12
            sm:px-16
            sm:py-5
            sm:text-2xl
            md:mt-14
            md:px-24
            md:py-8
            md:text-3xl
            md:tracking-[0.25em]
          "
        >
          ENTER
          
        </button>
      </div>
    </main>
  );
}