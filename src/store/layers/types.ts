import { Player, Synth, SynthOptions } from "tone";

export type LayerTypeName = "melody" | "beat" | "chord";

export interface LayerType {
  id: number;
  type: LayerTypeName;
  sequence: number[][];
  instruments: Synth<SynthOptions>[] | Player[];
}

export interface LayersState {
  layers: LayerType[];
}

export interface UpdateSequencePayload {
  layerId: number;
  newSequence: number[][];
}
