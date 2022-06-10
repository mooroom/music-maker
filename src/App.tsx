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
import { COLS, NOTE_NAMES, NOTE_COUNT, LABEL_WIDTH } from "./constants/grid";
import useElementWidth from "./hooks/useElementWidth";

const initialTempo = "8n";

function App() {
  const {
    layers: layersState,
    settings,
    controls,
  } = useSelector((state: RootState) => state);

  const dispatch = useDispatch();
  const [layerWrapperRef, layerWidth] = useElementWidth();

  const beatRef = useRef(0);
  const LayerId = useRef(0);
  const sequencesRef = useRef<number[][][]>([]);

  const animationRef = useRef<number | null>(null);
  const playheadRef = useRef<HTMLDivElement | null>(null);

  // resize logic
  const playHeadProgress = () => {
    // W * (current_time / total_time)
    const W = layerWidth - LABEL_WIDTH;

    const xPos =
      (W *
        (Tone.Transport.getSecondsAtTime(Tone.now()) /
          (Tone.Time(initialTempo).toSeconds() * COLS))) %
      W;

    if (playheadRef.current)
      playheadRef.current.style.transform = `translateX(${
        LABEL_WIDTH + xPos
      }px)`;

    // console.log("---");
    // console.log(`x: ${xPos}`);
    // console.log("--");

    animationRef.current = requestAnimationFrame(playHeadProgress);
  };
  //

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
      sequence: Array.from({ length: NOTE_COUNT[type] }, () =>
        new Array(COLS).fill(0)
      ),
      instruments: createInstSeq(type),
    };
    dispatch(addLayer(newLayer));
  };

  const configLoop = () => {
    function repeat(time: number) {
      for (const layer of layersState.layers) {
        const { type, instruments, sequence } = layer;
        instruments.forEach((instrument, index) => {
          const currentSeq =
            sequencesRef.current[layer.id][index][beatRef.current];
          if (currentSeq) {
            if (type === "melody") {
              (instrument as Synth).triggerAttackRelease(
                NOTE_NAMES.melody[index],
                Tone.Time(initialTempo).toSeconds() * currentSeq,
                time
              );
            } else if (type === "beat") {
              (instrument as Player).start();
            } else if (type === "chord") {
              (instrument as Synth).triggerAttackRelease(
                NOTE_NAMES.chord[index],
                Tone.Time(initialTempo).toSeconds() * currentSeq,
                time
              );
            }
          }
        });
      }

      beatRef.current = (beatRef.current + 1) % COLS;
    }

    Tone.Transport.bpm.value = settings.bpm;
    Tone.Transport.scheduleRepeat(repeat, initialTempo);

    animationRef.current = requestAnimationFrame(playHeadProgress);
    console.log(animationRef.current);
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

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    } else {
      console.log("play!");
      Tone.Transport.start();
      animationRef.current = requestAnimationFrame(playHeadProgress);
    }

    dispatch(togglePlay());
  };

  const onStop = () => {
    console.log("stop!");
    if (animationRef.current) {
      console.log(animationRef.current);
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (playheadRef.current)
      playheadRef.current.style.transform = `translateX(${LABEL_WIDTH}px)`;
    beatRef.current = 0;

    Tone.Transport.stop();

    dispatch(setStop());
  };

  return (
    <div className="App">
      <TopBar />
      <Container>
        {!layersState.layers.length && (
          <EmptyMsg>레이어를 추가해주세요</EmptyMsg>
        )}
        <LayerWrapper ref={layerWrapperRef}>
          {layersState.layers.map((layer) => (
            <Layer key={layer.id} layerData={layer} layerWidth={layerWidth}>
              <Playhead
                ref={playheadRef}
                style={{
                  bottom: 0,
                  height: 450,
                }}
              />
            </Layer>
          ))}
        </LayerWrapper>
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

const LayerWrapper = styled.div``;

const Playhead = styled.div`
  position: absolute;
  left: 0;
  background: white;
  transition: opacity 0.2s;
  width: 2px;
`;
