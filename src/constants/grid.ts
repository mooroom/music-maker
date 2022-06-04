import { Scale } from "@tonaljs/tonal";

const GRID_HEIGHT = 450;

const C4_MAJOR = Scale.get("C4 major").notes;
const C5_MAJOR = Scale.get("C5 major").notes;
const C6_MAJOR = Scale.get("C6 major").notes;

export const NOTES_C_MAJOR = [...C4_MAJOR, ...C5_MAJOR, "C6"];
export const NOTES_BEAT = ["kick", "clap", "hh_open", "hh_closed"];

export const NOTE_COUNT = {
  melody: NOTES_C_MAJOR.length,
  chord: NOTES_C_MAJOR.length,
  beat: NOTES_BEAT.length,
};

export const NOTE_HEIGHT = {
  melody: GRID_HEIGHT / NOTES_C_MAJOR.length,
  chord: GRID_HEIGHT / NOTES_C_MAJOR.length,
  beat: GRID_HEIGHT / NOTES_BEAT.length,
};

export const BORDER_WIDTH = 2;

export const LABEL_WIDTH = 60;

export const ROWS = {
  melody: NOTES_C_MAJOR.length,
  chord: NOTES_C_MAJOR.length,
  beat: NOTES_BEAT.length,
};
export const COLS = 32;

// export const BORDER_COLOR = "#eee";
export const BORDER_COLOR = "#000";
