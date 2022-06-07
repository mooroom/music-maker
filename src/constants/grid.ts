import { Scale } from "@tonaljs/tonal";

const GRID_HEIGHT = 450;

const C4_MAJOR = Scale.get("C4 major").notes;
const C5_MAJOR = Scale.get("C5 major").notes;

export const NOTE_NAMES = {
  melody: [...C4_MAJOR, ...C5_MAJOR, "C6"],
  chord: [...C4_MAJOR, ...C5_MAJOR, "C6"],
  beat: ["kick", "clap", "hh_open", "hh_closed"],
};

export const NOTE_COUNT = {
  melody: NOTE_NAMES.melody.length,
  chord: NOTE_NAMES.chord.length,
  beat: NOTE_NAMES.beat.length,
};

export const NOTE_HEIGHT = {
  melody: GRID_HEIGHT / NOTE_NAMES.melody.length,
  chord: GRID_HEIGHT / NOTE_NAMES.chord.length,
  beat: GRID_HEIGHT / NOTE_NAMES.beat.length,
};

export const BORDER_WIDTH = 2;

export const LABEL_WIDTH = 60;

export const ROWS = {
  melody: NOTE_NAMES.melody.length,
  chord: NOTE_NAMES.chord.length,
  beat: NOTE_NAMES.beat.length,
};

export const COLS = 32;

// export const BORDER_COLOR = "#eee";
export const BORDER_COLOR = "#000";
