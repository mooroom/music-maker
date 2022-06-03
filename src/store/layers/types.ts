import { Player, Synth, SynthOptions } from "tone";

export interface LayerType {
  id: number;
  type: "melody" | "beat" | "chord";
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
