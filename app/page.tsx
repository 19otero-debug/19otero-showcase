"use client";

import { useState } from "react";

import StarField from "@/components/Background/StarField";
import Landing from "@/components/Landing/Landing";
import Showcase from "@/components/Showcase/Showcase";
import AudioPlayer from "@/components/Showcase/AudioPlayer";

import { Beat, beats } from "@/data/beats";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);

  const handleNextBeat = () => {
    if (!selectedBeat) return;

    const currentIndex = beats.findIndex(
      (beat) => beat.id === selectedBeat.id
    );

    const nextIndex = (currentIndex + 1) % beats.length;

    setSelectedBeat(beats[nextIndex]);
  };

  const handlePreviousBeat = () => {
    if (!selectedBeat) return;

    const currentIndex = beats.findIndex(
      (beat) => beat.id === selectedBeat.id
    );

    const previousIndex =
      (currentIndex - 1 + beats.length) % beats.length;

    setSelectedBeat(beats[previousIndex]);
  };

  const handleShuffleBeat = () => {
    if (beats.length === 0) return;

    if (!selectedBeat) {
      setSelectedBeat(beats[Math.floor(Math.random() * beats.length)]);
      setAutoPlay(true);
      return;
    }

    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * beats.length);
    } while (beats[randomIndex].id === selectedBeat.id);

    setSelectedBeat(beats[randomIndex]);
  };

  return (
    <>
      <StarField />

      {!entered ? (
        <Landing onEnter={() => setEntered(true)} />
      ) : (
        <main className="pb-32">
          <Showcase
            selectedBeat={selectedBeat}
            onSelectBeat={(beat) => {
              setSelectedBeat(beat);
              setAutoPlay(true);
            }}
          />

          <AudioPlayer
            beat={selectedBeat}
            autoPlay={autoPlay}
            onNext={handleNextBeat}
            onPrevious={handlePreviousBeat}
            onShuffle={handleShuffleBeat}
          />
        </main>
      )}
    </>
  );
}