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
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import { setStart, setStop, togglePlay } from "./store/controls";

const noteCount = 7;
const beatCount = 8;

const noteWidth = 50;
const noteHeight = 30;

const gridBorderWidth = 6;

const initialNotes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
const initialTempo = "8n";

function App() {
  const {
    layers: layersState,
    settings,
    controls,
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [bpm, setBpm] = useState(120);

  const beatRef = useRef(0);
  const LayerId = useRef(0);
  const sequencesRef = useRef<number[][][]>([]);

  useEffect(() => {
    Tone.start();
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
        console.log("Time: ", Tone.Transport.getSecondsAtTime(time));
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
    if (!controls.started) {
      configLoop();
      dispatch(setStart());
    }

    controls.playing ? Tone.Transport.pause() : Tone.Transport.start();
    dispatch(togglePlay());
  };

  const onStop = () => {
    Tone.Transport.dispose();
    dispatch(setStop());
  };

  return (
    <div className="App">
      <TopBar />
      <button onClick={handleAddLayer}>add layer</button>
      {layersState.layers.map((layer) => (
        <Editor key={layer.id} layerData={layer} />
      ))}
      <BottomBar onPlay={onPlay} onStop={onStop} />
    </div>
  );
}

export default App;
