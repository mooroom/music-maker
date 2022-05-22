import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Synth } from "tone";
import * as Tone from "tone";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { LayerType } from "./store/layers/types";
import { addLayer } from "./store/layers";
import { cloneDeep } from "lodash";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import { setStart, setStop, togglePlay } from "./store/controls";
import styled from "styled-components";
import Layer from "./components/Layer";

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
  const [eventId, setEventId] = useState<number | null>(null);

  const beatRef = useRef(0);
  const LayerId = useRef(0);
  const sequencesRef = useRef<number[][][]>([]);

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  useEffect(() => {
    const newSequences = layersState.layers.map((layer) => layer.sequence);
    sequencesRef.current = cloneDeep(newSequences);
  }, [layersState]);

  const handleAddLayer = () => {
    const newLayer: LayerType = {
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
    console.log(1);
    function repeat(time: number) {
      console.log(3);
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
    }

    console.log(2);
    Tone.Transport.bpm.value = bpm;
    const eid = Tone.Transport.scheduleRepeat(repeat, initialTempo);
    console.log(`eid: ${eid}`);
    setEventId(eid);
  };

  const onPlay = () => {
    if (!controls.started) {
      Tone.start();
      console.log("configLoop!");
      configLoop();
      dispatch(setStart());
    }

    if (controls.playing) {
      console.log("pause!");
      Tone.Transport.pause();
    } else {
      console.log("play!");
      Tone.Transport.start();
    }

    dispatch(togglePlay());
  };

  const onStop = () => {
    console.log("stop!");
    Tone.Transport.stop();
    if (eventId !== null) {
      console.log(`clear: ${eventId}`);
      Tone.Transport.clear(eventId);
    }
    beatRef.current = 0;
    dispatch(setStop());
  };

  return (
    <div className="App">
      <TopBar />
      <Container>
        {/* <button onClick={handleAddLayer}>add layer</button>
        {layersState.layers.map((layer) => (
          <Editor key={layer.id} layerData={layer} />
        ))} */}
        <Layer />
      </Container>

      <BottomBar onPlay={onPlay} onStop={onStop} />
    </div>
  );
}

export default App;

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: calc(100% - 140px);
  margin: 0 auto;
  padding: 40px;
  overflow-y: scroll;
`;
