import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { Player, Synth } from "tone";
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
import { Scale } from "@tonaljs/tonal";
import { createInstSeq } from "./utils";

const noteCount = {
  melody: 15,
  beat: 4,
  chord: 15,
};

const beatCount = 32;

const initialTempo = "8n";

const C4_MAJOR = Scale.get("C4 major").notes;
const C5_MAJOR = Scale.get("C5 major").notes;
const C6_MAJOR = Scale.get("C6 major").notes;
const initialNotes = [...C4_MAJOR, ...C5_MAJOR, "C6"];

function App() {
  const {
    layers: layersState,
    settings,
    controls,
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const [eventId, setEventId] = useState<number | null>(null);

  const beatRef = useRef(0);
  const LayerId = useRef(0);
  const sequencesRef = useRef<number[][][]>([]);

  useEffect(() => {
    Tone.Transport.bpm.value = settings.bpm;
  }, [settings]);

  useEffect(() => {
    if (controls.started) onStop();

    const newSequences = layersState.layers.map((layer) => layer.sequence);
    sequencesRef.current = cloneDeep(newSequences);
  }, [layersState]);

  const handleAddLayer = (type: LayerType["type"]) => {
    const newLayer: LayerType = {
      id: LayerId.current++,
      type,
      sequence: Array(noteCount[type]).fill(Array(beatCount).fill(0)),
      instruments: createInstSeq(type),
    };
    dispatch(addLayer(newLayer));
  };

  const configLoop = () => {
    function repeat(time: number) {
      for (const layer of layersState.layers) {
        const { type, instruments, sequence } = layer;
        instruments.forEach((instrument, index) => {
          console.log(1);
          const currentSeq =
            sequencesRef.current[layer.id][index][beatRef.current];
          console.log(2);
          if (currentSeq) {
            if (type === "melody") {
              (instrument as Synth).triggerAttackRelease(
                initialNotes[index],
                Tone.Time(initialTempo).toSeconds() * currentSeq,
                time
              );
            } else if (type === "beat") {
              (instrument as Player).start();
            }
          }
        });
      }

      beatRef.current = (beatRef.current + 1) % beatCount;
    }

    Tone.Transport.bpm.value = settings.bpm;
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
        {!layersState.layers.length && (
          <EmptyMsg>레이어를 추가해주세요</EmptyMsg>
        )}

        {layersState.layers.map((layer) => (
          <Layer key={layer.id} layerData={layer} />
        ))}
      </Container>

      <BottomBar onPlay={onPlay} onStop={onStop} onAddLayer={handleAddLayer} />
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

const EmptyMsg = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #999;
`;
