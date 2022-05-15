import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const noteCount = 7;
const beatCount = 8;

const noteWidth = 50;
const noteHeight = 30;

const gridBorderWidth = 6;

const laneWidth = gridBorderWidth * (beatCount + 1) + noteWidth * beatCount;
const laneHeight = gridBorderWidth * (noteCount + 1) + noteHeight * noteCount;

const gridHorizontal = Array.from(
  { length: noteCount + 1 },
  (v, k) => (noteHeight + gridBorderWidth) * k
);

const gridVertical = Array.from(
  { length: beatCount + 1 },
  (v, k) => (noteWidth + gridBorderWidth) * k
);

const initialGridData = Array(noteCount).fill(Array(beatCount).fill(0));

function App() {
  const [gridData, setGridData] = useState<number[][]>(initialGridData);

  const translateToGridXY = (xy: "x" | "y", coord: number) =>
    Math.floor(
      coord /
        Math.floor(xy === "x" ? laneWidth / beatCount : laneHeight / noteCount)
    );

  const handleMouseDown = (e: React.MouseEvent) => {
    const $target = e.target as HTMLDivElement;
    const { x: offsetX, y: offsetY } = $target.getBoundingClientRect();

    const startCoordX = e.clientX - offsetX;
    const startCoordY = e.clientY - offsetY;
    const startGridX = translateToGridXY("x", startCoordX);
    const startGridY = translateToGridXY("y", startCoordY);

    // get collidables
    const originRow = gridData[startGridY];
    const collidables: null | { origin: number }[] = new Array(beatCount).fill(
      null
    );

    originRow.forEach((value, idx) => {
      if (value === 0) return;

      while (value !== 0) {
        collidables[value + idx - 1] = { origin: idx };
        value -= 1;
      }
    });
    console.log("collidables: ", collidables);

    const drawRect = (e: MouseEvent) => {
      const mouseCoordX = e.clientX - offsetX;
      const processingGridX = translateToGridXY("x", mouseCoordX);
    };

    const stopDrawRect = (e: MouseEvent) => {
      const mouseCoordX = e.clientX - offsetX;
      const endGridX = translateToGridXY("x", mouseCoordX);

      console.log(
        `start X: ${startGridX}, start Y: ${startGridY}, end X: ${endGridX}`
      );

      const gridDataCopy = JSON.parse(JSON.stringify(gridData));
      const noteLength = endGridX - startGridX + 1;

      // remove collidables
      if (noteLength === 1) {
        if (collidables[endGridX]) {
          gridDataCopy[startGridY][collidables[endGridX].origin] = 0;
        } else {
          gridDataCopy[startGridY][startGridX] = 1;
        }
      } else {
        for (let i = startGridX; i <= endGridX; i++) {
          if (collidables[i]) {
            gridDataCopy[startGridY][collidables[i].origin] = 0;
          }
        }
        gridDataCopy[startGridY][startGridX] = noteLength;
      }

      setGridData(gridDataCopy);

      $target.removeEventListener("mousemove", drawRect);
      $target.removeEventListener("mouseup", stopDrawRect);
    };

    $target.addEventListener("mousemove", drawRect);
    $target.addEventListener("mouseup", stopDrawRect);
  };

  return (
    <div className="App">
      <div style={{ position: "relative", display: "flex" }}>
        <svg className="editor" width={laneWidth} height={laneHeight}>
          {gridHorizontal.map((v, i) => (
            <rect
              key={v + i}
              fill="#666"
              width={laneWidth}
              height={gridBorderWidth}
              x={0}
              y={v}
            />
          ))}
          {gridVertical.map((v, i) => (
            <rect
              key={v + i}
              fill="#666"
              width={gridBorderWidth}
              height={laneHeight}
              x={v}
              y={0}
            />
          ))}
          {gridData.map((rowData, rowIdx) =>
            rowData.map((colData, colIdx) =>
              colData ? (
                <NoteSvg
                  key={`${rowIdx}${colIdx}`}
                  coord={{ x: colIdx, y: rowIdx }}
                  length={colData}
                />
              ) : null
            )
          )}
        </svg>

        <div
          className="mouse_observer"
          style={{ position: "absolute", inset: 0, cursor: "pointer" }}
          onMouseDown={handleMouseDown}
        ></div>
        {/* <div
          className="playhead_container"
          style={{ position: "absolute", inset: 0 }}
        >
          <div className="playhead"></div>
        </div> */}
      </div>
    </div>
  );
}

export default App;

interface NoteSvgProps {
  coord: {
    x: number;
    y: number;
  };
  length: number;
}

const NoteSvg = ({ coord, length }: NoteSvgProps) => {
  const xPos = gridBorderWidth * (coord.x + 1) + noteWidth * coord.x;
  const yPos = gridBorderWidth * (coord.y + 1) + noteHeight * coord.y;

  return (
    <svg x={xPos} y={yPos}>
      <rect
        x={0}
        y={0}
        width={noteWidth * length + gridBorderWidth * (length - 1)}
        height={noteHeight}
        fill="#6dcbff"
      />
    </svg>
  );
};
