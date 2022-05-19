import { configureStore } from "@reduxjs/toolkit";
import { controlsSlice } from "./controls";
import { layersSlice } from "./layers";
import { settingsSlice } from "./settings";

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    layers: layersSlice.reducer,
    controls: controlsSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
