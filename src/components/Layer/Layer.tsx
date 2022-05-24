import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { Scale } from "@tonaljs/tonal";
import { StyledComponent } from "styled-components";
import { LayerType } from "../../store/layers/types";
import { useDispatch } from "react-redux";
import { updateSequence } from "../../store/layers";

const C4_MAJOR = Scale.get("C4 major").notes;
const C5_MAJOR = Scale.get("C5 major").notes;
const C6_MAJOR = Scale.get("C6 major").notes;
const notes = [...C4_MAJOR, ...C5_MAJOR, "C6"];

const rows = notes.length;
const cols = 32;

const borderWidth = 2;
const noteHeight = 30;

const gridYLines = Array.from({ length: rows + 1 }, (_, i) => 30 * i);
const gridXLines = Array.from({ length: cols + 1 });

interface Props {
  layerData: LayerType;
}

export default function Layer({ layerData }: Props) {
  const [gridXLines, setGridXLines] = useState<number[]>([]);
  const [colWidth, setColWidth] = useState(0);

  const layerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const layer = layerRef.current;
    if (layer) {
      const { width: layerWidth } = layer.getBoundingClientRect();
      const colWidth = Math.max(20, (layerWidth - 60) / cols);
      setColWidth(colWidth);
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

  const { id: layerId, sequence } = layerData;
  const dispatch = useDispatch();

  const translateCoord = (xy: "x" | "y", coord: number, length: number) =>
    Math.floor(coord / Math.floor(length / (xy === "x" ? cols : rows)));

  const handleMouseDown = (e: React.MouseEvent) => {
    const $target = e.target as HTMLDivElement;
    const {
      x: offsetX,
      y: offsetY,
      width,
      height,
    } = $target.getBoundingClientRect();

    const startCoordX = e.clientX - offsetX;
    const startCoordY = e.clientY - offsetY;
    const startGridX = translateCoord("x", startCoordX, width);
    const startGridY = translateCoord("y", startCoordY, height);

    const originRow = sequence[startGridY];
    const collidables: null | { origin: number }[] = new Array(32).fill(null);

    originRow.forEach((value, idx) => {
      if (value === 0) return;

      while (value !== 0) {
        collidables[value + idx - 1] = { origin: idx };
        value -= 1;
      }
    });

    const drawRect = (e: MouseEvent) => {
      const mouseCoordX = e.clientX - offsetX;
      const processingGridX = translateCoord("x", mouseCoordX, width);
    };

    const stopDrawRect = (e: MouseEvent) => {
      const mouseCoordX = e.clientX - offsetX;
      const endGridX = translateCoord("x", mouseCoordX, width);

      const sequenceCopy = JSON.parse(JSON.stringify(sequence));
      const noteLength = endGridX - startGridX + 1;

      // remove collidables
      if (noteLength === 1) {
        if (collidables[endGridX]) {
          sequenceCopy[startGridY][collidables[endGridX].origin] = 0;
        } else {
          sequenceCopy[startGridY][startGridX] = 1;
        }
      } else {
        for (let i = startGridX; i <= endGridX; i++) {
          if (collidables[i]) {
            sequenceCopy[startGridY][collidables[i].origin] = 0;
          }
        }
        sequenceCopy[startGridY][startGridX] = noteLength;
      }

      dispatch(updateSequence({ layerId, newSequence: sequenceCopy }));

      $target.removeEventListener("mousemove", drawRect);
      $target.removeEventListener("mouseup", stopDrawRect);
    };

    $target.addEventListener("mousemove", drawRect);
    $target.addEventListener("mouseup", stopDrawRect);
  };

  return (
    <S.LayerBlock ref={layerRef}>
      <S.WidgetContainer>
        <S.OverviewBlock>
          <S.LayerTitle>레이어 {layerId}</S.LayerTitle>
        </S.OverviewBlock>
        <S.EditorBlock height={452}>
          <S.LaneContainer width={60} height={452}>
            {notes.map((note, i) => (
              <svg width="100%" height={30} x={0} y={30 * i}>
                <rect width="100%" height={28} fill="#00ad82" x={0} y={2} />
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
          <g>
            {sequence.map((rowData, rowIdx) =>
              rowData.map((colData, colIdx) =>
                colData ? (
                  <NoteSvg
                    key={`${rowIdx}${colIdx}`}
                    coord={{ x: colIdx, y: rowIdx }}
                    length={colData}
                    noteWidth={colWidth}
                  />
                ) : null
              )
            )}
          </g>
        </S.EditorBlock>
        <S.MouseObserverBlock>
          <S.MouseObserver onMouseDown={handleMouseDown} />
        </S.MouseObserverBlock>
      </S.WidgetContainer>
    </S.LayerBlock>
  );
}

interface NoteSvgProps {
  coord: {
    x: number;
    y: number;
  };
  length: number;
  noteWidth: number;
}

const NoteSvg = ({ coord, length, noteWidth }: NoteSvgProps) => {
  const xPos = noteWidth * coord.x + 60;
  const yPos = noteHeight * coord.y;

  return (
    <svg x={xPos} y={yPos}>
      <rect
        x={2}
        y={2}
        width={noteWidth * length - borderWidth}
        height={noteHeight - borderWidth}
        fill="#02f5b8"
      />
    </svg>
  );
};
