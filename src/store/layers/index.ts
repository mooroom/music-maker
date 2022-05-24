import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayerType, LayersState, UpdateSequencePayload } from "./types";

const initialState: LayersState = {
  layers: [],
};

export const layersSlice = createSlice({
  name: "layers",
  initialState,
  reducers: {
    addLayer: (state, action: PayloadAction<LayerType>) => {
      state.layers.push(action.payload);
    },
    removeLayer: (state, action) => {
      state.layers = state.layers.filter(
        (layer) => layer.id !== action.payload
      );
    },
    updateSequence: (state, action: PayloadAction<UpdateSequencePayload>) => {
      const { layerId, newSequence } = action.payload;
      const layer = state.layers.find((layer) => layer.id === layerId);
      if (layer) layer.sequence = newSequence;
    },
  },
});

export const { addLayer, removeLayer, updateSequence } = layersSlice.actions;
