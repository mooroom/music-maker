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
      state.playing = true;
    },
    setStop: (state) => {
      state.started = false;
      state.playing = false;
    },
    setPause: (state) => {
      state.playing = false;
    },
  },
});

export const { setPause, setStart, setStop } = controlsSlice.actions;
