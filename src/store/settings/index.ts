import { createSlice } from "@reduxjs/toolkit";
import { SettingsState } from "./types";

const initialState: SettingsState = {
  bpm: 120,
  totalBeats: 32,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBpm: (state, action) => {
      state.bpm = action.payload;
    },
    setTotalBeats: (state, action) => {
      state.totalBeats = action.payload;
    },
  },
});

export const { setBpm, setTotalBeats } = settingsSlice.actions;
