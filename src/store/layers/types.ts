import { Synth, SynthOptions } from "tone";

export interface Layer {
  id: number;
  type: "melody" | "beat" | "chord";
  sequence: number[][];
  instruments: Synth<SynthOptions>[];
}

export interface LayersState {
  layers: Layer[];
}

export interface UpdateSequencePayload {
  layerId: number;
  newSequence: number[][];
}
