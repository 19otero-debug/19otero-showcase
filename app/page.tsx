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

  return (
    <>
      <StarField />

      {!entered ? (
        <Landing onEnter={() => setEntered(true)} />
      ) : (
        <>
          <Showcase
            selectedBeat={selectedBeat}
            onSelectBeat={setSelectedBeat}
          />

          <AudioPlayer
            beat={selectedBeat}
            onNext={handleNextBeat}
            onPrevious={handlePreviousBeat}
          />
        </>
      )}
    </>
  );
}