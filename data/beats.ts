export interface Beat {
  id: number;
  title: string;
  genre: string;
  bpm: number;
  key: string;
  cover: string;
  audio: string;
  createdAt: string;

  description: string;
  tags: string[];
}

export const beats: Beat[] = [
  {
    id: 1,
    title: "DID THAT",
    genre: "Breakcore",
    bpm: 192,
    key: "A# Minor",
    cover: "/covers/breakcore cover1.jpg",
    audio: "/beats/breakcore.mp3",
    createdAt: "2026-06-09",

    description:
      "breakcore emotional beautiful piano,",

    tags: [
      "breakcore",
      "ambient",
      "background",
      "experimental",
      "ambient",
      "filter",
      "pinkpantheress",
      "19otero"
    ],
  },

  {
    id: 2,
    title: "STUDIE",
    genre: "Rage",
    bpm: 138,
    key: "D Minor",
    cover: "/covers/studie cover.jpg",
    audio: "/beats/studie.mp3",
    createdAt: "2026-07-21",

    description:
      "Dark rage beat with distorted synths, aggressive drums and modern underground production.",

    tags: [
      "rage",
      "opium",
      "ken carson",
      "osamason",
      "underground",
      "dark",
      "hard",
      "19otero" 
    ],
  },

  {
    id: 3,
    title: "CANT EEN LIE",
    genre: "SINN6R type beat",
    bpm: 130,
    key: "F# Minor",
    cover: "/covers/cant een lie cover.jpg",
    audio: "/beats/cant een lie.mp3",
    createdAt: "2026-07-19",

    description:
      "Hard SINN6R type beat federal album teebo RicoAce",

    tags: [
      "Hard",
      "808",
      "UK",
      "underground",
      "SINN6R",
      "FEDERAL",
      "19otero",
      "runner"
    ],
  },

  {
    id: 4,
    title: "NEW GEN 5",
    genre: "Glokk40spazz type beat",
    bpm: 141,
    key: "C# Minor",
    cover: "/covers/new gen 5 cover1.jpg",
    audio: "/beats/new gen 5.mp3",
    createdAt: "2026-02-09",

    description:
      "Ambient.",

    tags: [
      "glokk40spaz",
      "nun 4 no shmuck",
      "melodic",
      "ambient",
      "sub",
      "19otero"
    ],
  },

  {
    id: 5,
    title: "GRIMES (ft. @3xnul)",
    genre: "Underground",
    bpm: 130,
    key: "A Minor",
    cover: "/covers/grimes cover.jpg",
    audio: "/beats/defenestradito.mp3",
    createdAt: "2026-07-04",

    description:
      "Dark",

    tags: [
      "feat",
      "stu",
      "dark",
      "pads",
      "dreamy",
      "heavenly",
      "defenestradito",
      "19otero"
    ],
  },

  {
    id: 6,
    title: "NOVA KAINE (ft. @3xnul)",
    genre: "Izaya Tiji type beat",
    bpm: 135,
    key: "G Major",
    cover: "/covers/nova kaine cover.jpg",
    audio: "/beats/NOVA KAINE @33nul @19otero 135.mp3",
    createdAt: "2026-07-03",

    description:
      "Trap",

    tags: [
      "feat",
      "trap",
      "izaya tiji",
      "spinz",
      "square",
      "zenology",
      "19otero"
    ],
  },

  {
    id: 7,
    title: "ULTIMATE",
    genre: "Denzel Curry Sample",
    bpm: 138,
    key: "D# Minor",
    cover: "/covers/ultimatum cover.jpg",
    audio: "/beats/ultimatum.mp3",
    createdAt: "2026-07-02",

    description:
      "Trap",

    tags: [
      "ultimate",
      "ultimatum",
      "denzel curry",
      "sample",
      "808",
      "piano",
      "19otero"
    ],
  },

{
    id: 8,
    title: "POW",
    genre: "Craz3teki type beat",
    bpm: 132,
    key: "G# Minor",
    cover: "/covers/pow cover.jpg",
    audio: "/beats/pow.mp3",
    createdAt: "2026-06-18",

    description:
      "Trap",

    tags: [
      "lead",
      "bounce",
      "triplets",
      "ding",
      "19otero"
    ],
  },


  {
    id: 9,
    title: "TERRY ROZIER",
    genre: "1oneam type beat",
    bpm: 130,
    key: "D# Minor",
    cover: "/covers/terry rozier cover1.jpg",
    audio: "/beats/terry rozier.mp3",
    createdAt: "2026-04-06",

    description:
      "Trap",

    tags: [
      "bounce",
      "lead",
      "underground",
      "like",
      "grah",
      "19otero"
    ],
  },

  {
    id: 10,
    title: "EXMPLE",
    genre: "wtvr",
    bpm: 135,
    key: "E Minor",
    cover: "/covers/default-cover.jpg",
    audio: "/beats/after-hours.mp3",
    createdAt: "2025-07-08",

    description:
      "Trap soul instrumental combining emotional chords with modern drums and smooth melodies.",

    tags: [
      "trap soul",
      "trap",
      "soul",
      "emotional",
      "melodic",
      "smooth",
      "19otero"
    ],
  },
];