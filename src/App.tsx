import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Synth, SynthOptions } from "tone";
import * as Tone from "tone";
import Editor from "./components/Editor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { Layer } from "./store/layers/types";
import { addLayer } from "./store/layers";
import { cloneDeep } from "lodash";

const noteCount = 7;
const beatCount = 8;

const noteWidth = 50;
const noteHeight = 30;

const gridBorderWidth = 6;

const initialNotes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const initialTempo = "8n";

function App() {
  // const [synths, setSynths] = useState<Synth<SynthOptions>[]>([]);
  // const [gridData, setGridData] = useState<number[][]>(initialGridData);
  const { layers: layersState, settings } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  // const gridDataRef = useRef<number[][]>(initialGridData);
  const beatRef = useRef(0);
  const LayerId = useRef(0);
  const sequencesRef = useRef<number[][][]>([]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    console.log("change!");
    const newSequences = layersState.layers.map((layer) => layer.sequence);
    sequencesRef.current = cloneDeep(newSequences);
  }, [layersState]);

  const handleAddLayer = () => {
    const newLayer: Layer = {
      id: LayerId.current++,
      type: "melody",
      sequence: Array(noteCount).fill(Array(beatCount).fill(0)),
      instruments: Array.from({ length: initialNotes.length }, () =>
        new Synth().toDestination()
      ),
    };
    dispatch(addLayer(newLayer));
  };

  const configLoop = () => {
    const repeat = (time: number) => {
      for (const layer of layersState.layers) {
        const { instruments, sequence } = layer;
        instruments.forEach((instrument, index) => {
          const currentSeq =
            sequencesRef.current[layer.id][index][beatRef.current];
          if (currentSeq) {
            instrument.triggerAttackRelease(
              initialNotes[index],
              Tone.Time(initialTempo).toSeconds() * currentSeq,
              time
            );
          }
        });
      }

      beatRef.current = (beatRef.current + 1) % beatCount;
    };

    Tone.Transport.bpm.value = bpm;
    Tone.Transport.scheduleRepeat(repeat, initialTempo);
  };

  const onPlay = () => {
    if (!started) {
      Tone.start();
      configLoop();
      setStarted(true);
    }

    if (!playing) {
      Tone.Transport.start();
      setPlaying(true);
    } else {
      Tone.Transport.stop();
      setPlaying(false);
    }
  };

  return (
    <div className="App">
      <button onClick={onPlay}>{playing ? "stop" : "play"}</button>
      <button onClick={handleAddLayer}>add layer</button>
      {layersState.layers.map((layer) => (
        <Editor key={layer.id} layerData={layer} />
      ))}
    </div>
  );
}

export default App;
