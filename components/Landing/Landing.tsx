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
      className={`relative z-10 flex min-h-screen items-center justify-center transition-all duration-500 ${
        leaving ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="text-center">
        <p className="mb-4 text-xs tracking-[0.6em] text-gray-400">
          @19OTERO
        </p>

        <h1 className="text-7xl font-light tracking-[0.25em] text-white md:text-8xl">
          SHOWCASE
        </h1>

        <button
          onClick={handleClick}
          disabled={leaving}
          className="
            mt-14
            cursor-pointer
            rounded-full
            border-2
            border-white/40
            px-24
            py-8
            text-3xl
            font-semibold
            tracking-[0.25em]
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
          "
        >
          ENTER
      </button>
      </div>
    </main>
  );
}