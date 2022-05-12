import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const noteCount = 3;
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
console.log(initialGridData);

function App() {
  const [gridData, setGridData] = useState<number[][]>(initialGridData);

  const editorRef = useRef<SVGSVGElement>(null);

  const handleClickEditor = (e: React.MouseEvent) => {
    const $target = e.target as HTMLDivElement;
    const { x: offsetX, y: offsetY } = $target.getBoundingClientRect();
    const gridX = e.clientX - offsetX;
    const gridY = e.clientY - offsetY;

    const coordX = Math.floor(gridX / Math.floor(laneWidth / beatCount));
    const coordY = Math.floor(gridY / Math.floor(laneHeight / noteCount));

    setGridData(
      gridData.map((rowData, rowIdx) =>
        rowData.map((colData, colIdx) => {
          if (coordX === colIdx && coordY === rowIdx) {
            return colData ? 0 : 1;
          } else return colData;
        })
      )
    );

    console.log(`x: ${coordX}, y: ${coordY}`);
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
              colData ? <NoteSvg coord={{ x: colIdx, y: rowIdx }} /> : null
            )
          )}
        </svg>

        <div
          style={{ position: "absolute", inset: 0, cursor: "pointer" }}
          onClick={handleClickEditor}
        ></div>
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
}

const NoteSvg = ({ coord }: NoteSvgProps) => {
  const xPos = gridBorderWidth * (coord.x + 1) + noteWidth * coord.x;
  const yPos = gridBorderWidth * (coord.y + 1) + noteHeight * coord.y;

  return (
    <svg x={xPos} y={yPos}>
      <rect x={0} y={0} width={noteWidth} height={noteHeight} fill="#6dcbff" />
    </svg>
  );
};
