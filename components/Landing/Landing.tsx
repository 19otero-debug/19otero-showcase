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
        <p className="mb-3 text-xs tracking-[0.6em] text-gray-400">
          @19OTERO
        </p>

        <h1 className="text-7xl font-light tracking-[0.25em] text-white md:text-8xl">
          SHOWCASE
        </h1>

        <button
          onClick={handleClick}
          disabled={leaving}
          className="
            mt-6
            cursor-pointer
            border
            border-white
            px-7
            py-2
            text-xs
            tracking-[0.35em]
            text-white
            transition-all
            duration-300
            hover:bg-white
            hover:text-black
            disabled:pointer-events-none
          "
        >
          SHOWCASE
        </button>
      </div>
    </main>
  );
}