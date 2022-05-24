import { Scale } from "@tonaljs/tonal";

const C4_MAJOR = Scale.get("C4 major").notes;
const C5_MAJOR = Scale.get("C5 major").notes;
const C6_MAJOR = Scale.get("C6 major").notes;
export const NOTES_C_MAJOR = [...C4_MAJOR, ...C5_MAJOR, "C6"];

export const BORDER_WIDTH = 2;
export const NOTE_HEIGHT = 30;

export const LABEL_WIDTH = 60;

export const ROWS = NOTES_C_MAJOR.length;
export const COLS = 32;
