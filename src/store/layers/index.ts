import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LayerType, LayersState, UpdateSequencePayload } from "./types";

const initialState: LayersState = {
  layers: [],
  selectedLayer: null,
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
    selectLayer: (state, action: PayloadAction<number>) => {
      const selected = state.layers.find((v) => v.id === action.payload);
      if (selected) state.selectedLayer = selected;
    },
  },
});

export const { addLayer, removeLayer, updateSequence, selectLayer } =
  layersSlice.actions;
