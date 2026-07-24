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
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [shuffleQueue, setShuffleQueue] = useState<Beat[]>([]);

  const handleNextBeat = () => {
  if (!selectedBeat) return;

  if (shuffleEnabled) {
      let queue = [...shuffleQueue];

      if (queue.length === 0) {
        queue = generateShuffleQueue(selectedBeat);
      }

      const nextBeat = queue[0];

      setShuffleQueue(queue.slice(1));
      setSelectedBeat(nextBeat);

      return;
    }

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

  const toggleShuffle = () => {
    if (!shuffleEnabled) {
      setShuffleQueue(generateShuffleQueue(selectedBeat));
    }

    setShuffleEnabled((prev) => !prev);
  };

  const generateShuffleQueue = (currentBeat: Beat | null) => {
  const queue = [...beats];

  // Fisher-Yates
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  if (currentBeat) {
    const index = queue.findIndex((beat) => beat.id === currentBeat.id);

    if (index !== -1) {
      queue.splice(index, 1);
    }
  }

  return queue;
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
            shuffleEnabled={shuffleEnabled}
            onToggleShuffle={toggleShuffle}
          />
        </main>
      )}
    </>
  );
}