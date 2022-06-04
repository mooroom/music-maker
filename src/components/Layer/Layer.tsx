import React, { useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { StyledComponent } from "styled-components";
import { LayerType } from "../../store/layers/types";
import { useDispatch } from "react-redux";
import { updateSequence } from "../../store/layers";
import Editor from "./Editor";
import { ROWS, COLS } from "../../constants/grid";
import Header from "./Header";

interface Props {
  layerData: LayerType;
}

export default function Layer({ layerData }: Props) {
  const [colWidth, setColWidth] = useState(0);

  const layerRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    const layer = layerRef.current;
    if (layer) {
      const { width: layerWidth } = layer.getBoundingClientRect();
      const colWidth = Math.max(20, (layerWidth - 60) / COLS);
      setColWidth(colWidth);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { id: layerId, sequence, type: layerType } = layerData;
  const dispatch = useDispatch();

  const translateCoord = (xy: "x" | "y", coord: number, length: number) =>
    Math.floor(coord / (length / (xy === "x" ? COLS : ROWS[layerType])));

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
        <Header id={layerId} />
        <S.OverviewBlock></S.OverviewBlock>
        <Editor layerType={layerType} colWidth={colWidth} sequence={sequence} />
        <S.MouseObserverBlock>
          <S.MouseObserver onMouseDown={handleMouseDown} />
        </S.MouseObserverBlock>
      </S.WidgetContainer>
    </S.LayerBlock>
  );
}
