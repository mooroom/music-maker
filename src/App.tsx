import React, { useRef } from "react";
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

const gridData = Array(noteCount).fill(Array(beatCount).fill(0));
console.log(gridData);

function App() {
  const editorRef = useRef<SVGSVGElement>(null);

  const handleClickEditor = (e: React.MouseEvent) => {
    const $target = e.target as SVGSVGElement;
    const { x: offsetX, y: offsetY } = $target.getBoundingClientRect();
    const gridX = e.clientX - offsetX;
    const gridY = e.clientY - offsetY;
    console.log(`x: ${gridX}, y: ${gridY}`);
  };

  return (
    <div className="App">
      <svg
        className="editor"
        width={laneWidth}
        height={laneHeight}
        onClick={handleClickEditor}
      >
        {gridHorizontal.map((v) => (
          <rect
            fill="#666"
            width={laneWidth}
            height={gridBorderWidth}
            x={0}
            y={v}
          />
        ))}
        {gridVertical.map((v) => (
          <rect
            fill="#666"
            width={gridBorderWidth}
            height={laneHeight}
            x={v}
            y={0}
          />
        ))}
      </svg>
    </div>
  );
}

export default App;
