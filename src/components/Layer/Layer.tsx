import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { Scale } from "@tonaljs/tonal";
import { StyledComponent } from "styled-components";
import { LayerType } from "../../store/layers/types";
import { useDispatch } from "react-redux";

const C4_MAJOR = Scale.get("C4 major").notes;
const C5_MAJOR = Scale.get("C5 major").notes;
const C6_MAJOR = Scale.get("C6 major").notes;
const notes = [...C4_MAJOR, ...C5_MAJOR, "C6"];

const rows = notes.length;
const cols = 32;

const borderWidth = 2;

const gridYLines = Array.from({ length: rows + 1 }, (_, i) => 30 * i);
const gridXLines = Array.from({ length: cols + 1 });

interface Props {
  layerData: LayerType;
}

export default function Layer({ layerData }: Props) {
  const { id: layerId, sequence } = layerData;
  const dispatch = useDispatch();

  const [gridXLines, setGridXLines] = useState<number[]>([]);

  const layerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const layer = layerRef.current;
    if (layer) {
      const { width: layerWidth } = layer.getBoundingClientRect();
      const colWidth = Math.max(20, (layerWidth - 60) / cols);
      const newXLines = Array.from(
        { length: cols + 1 },
        (_, i) => colWidth * i + 60
      );
      setGridXLines(newXLines);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <S.LayerBlock ref={layerRef}>
      <S.WidgetContainer>
        <S.EditorBlock height={452}>
          <S.LaneContainer width={60} height={452}>
            {notes.map((note, i) => (
              <svg width="100%" height={30} x={0} y={30 * i}>
                <rect width="100%" height={28} fill="red" x={0} y={2} />
                <text
                  x={30}
                  y={20}
                  fontSize={12}
                  textAnchor="middle"
                  fill="white"
                >
                  {note}
                </text>
              </svg>
            ))}
          </S.LaneContainer>
          <S.GridContainer>
            {gridYLines.map((v, i) => (
              <rect
                key={v + i}
                fill="#000"
                width="100%"
                height={borderWidth}
                x={0}
                y={v}
              />
            ))}
            {gridXLines.map((v, i) => (
              <rect
                key={v + i}
                fill="#000"
                width={borderWidth}
                height="100%"
                x={v}
                y={0}
              />
            ))}
          </S.GridContainer>
          <S.LabelContainer></S.LabelContainer>
          <g></g>
        </S.EditorBlock>
        <S.MouseObserver></S.MouseObserver>
      </S.WidgetContainer>
    </S.LayerBlock>
  );
}
