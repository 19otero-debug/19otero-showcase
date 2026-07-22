export interface Beat {
  id: number;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  cover: string;
  audio: string;
}

export const beats: Beat[] = [
  {
    id: 1,
    title: "Did That",
    genre: "Breakcore",
    bpm: 192,
    key: "A# Minor",
    cover: "/covers/breakcore cover1.jpg",
    audio: "/beats/breakcore.mp3",
  },
  {
    id: 2,
    title: "Lucid",
    genre: "Rage",
    bpm: 150,
    key: "C# Minor",
    cover: "/covers/default-cover.jpg",
    audio: "/beats/lucid.mp3",
  },
  {
    id: 3,
    title: "Nebula",
    genre: "Ambient Trap",
    bpm: 130,
    key: "A Minor",
    cover: "/covers/default-cover.jpg",
    audio: "/beats/nebula.mp3",
  },
  {
    id: 4,
    title: "Eclipse",
    genre: "Melodic Trap",
    bpm: 145,
    key: "D Minor",
    cover: "/covers/default-cover.jpg",
    audio: "/beats/eclipse.mp3",
  },
  {
    id: 5,
    title: "Phantom",
    genre: "Dark Trap",
    bpm: 138,
    key: "G Minor",
    cover: "/covers/default-cover.jpg",
    audio: "/beats/phantom.mp3",
  },
  {
    id: 6,
    title: "After Hours",
    genre: "Trap Soul",
    bpm: 135,
    key: "E Minor",
    cover: "/covers/default-cover.jpg",
    audio: "/beats/after-hours.mp3",
  },
];