import * as Tone from "tone";
import { LayerType } from "./store/layers/types";

const BASE_URL = "/samplesound";

const beats = ["kick", "clap", "hh_open", "hh_closed"];

const createBeat = (inst: string) =>
  new Tone.Player(`${BASE_URL}/${inst}.wav`).toDestination();

const createBeatSeq = () => {
  return beats.map((inst) => createBeat(inst));
};

const creatSynthSeq = () => {
  return Array.from({ length: 15 }, () => new Tone.Synth().toDestination());
};

export const createInstSeq = (type: LayerType["type"]) => {
  switch (type) {
    case "beat":
      return createBeatSeq();
    case "melody":
      return creatSynthSeq();
    case "chord":
      return creatSynthSeq();
  }
};
