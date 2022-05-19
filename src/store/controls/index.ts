import { createSlice } from "@reduxjs/toolkit";
import { ControlsState } from "./types";

const initialState: ControlsState = {
  started: false,
  playing: false,
};

export const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setStart: (state) => {
      state.started = true;
    },
    setStop: (state) => {
      state.started = false;
      state.playing = false;
    },
    togglePlay: (state) => {
      state.playing = !state.playing;
    },
  },
});

export const { togglePlay, setStart, setStop } = controlsSlice.actions;
