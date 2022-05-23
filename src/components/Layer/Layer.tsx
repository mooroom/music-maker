import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { Scale } from "@tonaljs/tonal";
import { StyledComponent } from "styled-components";

const C4_MAJOR = Scale.get("C4 major").notes;
const C5_MAJOR = Scale.get("C5 major").notes;
const C6_MAJOR = Scale.get("C6 major").notes;
const notes = [...C4_MAJOR, ...C5_MAJOR, "C6"];

const rows = notes.length;
const cols = 32;

const borderWidth = 2;

const gridYLines = Array.from({ length: rows + 1 }, (_, i) => 30 * i);
const gridXLines = Array.from({ length: cols + 1 });

export default function Layer() {
  const [gridXLines, setGridXLines] = useState<number[]>([]);

  const layerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const layer = layerRef.current;
    if (layer) {
      const { width: layerWidth } = layer.getBoundingClientRect();
      const colWidth = Math.max(20, (layerWidth - 60) / cols);
      console.log(colWidth);
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
        <S.EditorBlock height={452} overflow="scroll">
          <S.LaneContainer></S.LaneContainer>
          <S.GridContainer>
            {gridYLines.map((v, i) => (
              <rect
                key={v + i}
                fill="#eee"
                width="100%"
                height={borderWidth}
                x={0}
                y={v}
              />
            ))}
            {gridXLines.map((v, i) => (
              <rect
                key={v + i}
                fill="#eee"
                width={borderWidth}
                height="100%"
                x={v}
                y={0}
              />
            ))}
          </S.GridContainer>
          <S.LabelContainer></S.LabelContainer>
        </S.EditorBlock>
      </S.WidgetContainer>
    </S.LayerBlock>
  );
}
