"use client";

import { useMemo } from "react";

export default function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 220 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      blur: Math.random() > 0.8,
    }));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: "#fff",
            opacity: star.opacity,
            boxShadow: star.blur
              ? "0 0 8px rgba(255,255,255,0.9)"
              : "none",
          }}
        />
      ))}
    </div>
  );
}