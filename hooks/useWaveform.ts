"use client";

import { useEffect, useRef, useState } from "react";

const CACHE = new Map<string, number[]>();

const BARS = 120;

export default function useWaveform(audioSrc: string) {
  const [bars, setBars] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    async function generateWaveform() {
      if (!audioSrc) return;

      // Ya calculada anteriormente
      if (CACHE.has(audioSrc)) {
        setBars(CACHE.get(audioSrc)!);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(audioSrc);
        console.log("MP3:", audioSrc, response.status);
        const arrayBuffer = await response.arrayBuffer();

        const audioContext = new AudioContext();

        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const rawData = audioBuffer.getChannelData(0);

        const samples = BARS;

        const blockSize = Math.floor(rawData.length / samples);

        const waveform: number[] = [];

        for (let i = 0; i < samples; i++) {
          let sum = 0;

          const start = i * blockSize;

          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[start + j]);
          }

          waveform.push(sum / blockSize);
        }

        const max = Math.max(...waveform);

        const normalized = waveform.map((v) =>
          Math.max(8, (v / max) * 100)
        );
        console.log("Waveform generada:", normalized.length, normalized);
        CACHE.set(audioSrc, normalized);

        if (!cancelled.current) {
          setBars(normalized);
        }

        await audioContext.close();
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled.current) {
          setLoading(false);
        }
      }
    }

    generateWaveform();

    return () => {
      cancelled.current = true;
    };
  }, [audioSrc]);

  return {
    bars,
    loading,
  };
}