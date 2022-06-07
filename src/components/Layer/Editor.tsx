import * as S from "./styles";
import FlexableNote from "./FlexableNote";
import {
  BORDER_WIDTH,
  COLS,
  ROWS,
  NOTE_HEIGHT,
  NOTE_NAMES,
  LABEL_WIDTH,
  BORDER_COLOR,
} from "../../constants/grid";
import { LayerType } from "../../store/layers/types";

interface Props {
  layerType: LayerType["type"];
  colWidth: number;
  sequence: number[][];
}

export default function Editor({ layerType, colWidth, sequence }: Props) {
  const gridYLines = Array.from(
    { length: ROWS[layerType] + 1 },
    (_, i) => NOTE_HEIGHT[layerType] * i
  );

  const gridXLines = Array.from(
    { length: COLS + 1 },
    (_, i) => colWidth * i + LABEL_WIDTH
  );

  return (
    <S.EditorBlock height={452}>
      <S.LaneContainer></S.LaneContainer>
      <S.GridContainer>
        {gridYLines.map((v, i) => (
          <rect
            key={v + i}
            fill={BORDER_COLOR}
            width="100%"
            height={BORDER_WIDTH}
            x={0}
            y={v}
          />
        ))}
        {gridXLines.map((v, i) => (
          <rect
            key={v + i}
            fill={BORDER_COLOR}
            width={BORDER_WIDTH}
            height="100%"
            x={v}
            y={0}
          />
        ))}
      </S.GridContainer>
      <S.LabelContainer width={60} height={452}>
        {NOTE_NAMES[layerType].map((note, i) => (
          <Label
            key={note}
            note={note}
            height={NOTE_HEIGHT[layerType]}
            index={i}
          />
        ))}
      </S.LabelContainer>
      <g>
        {sequence.map((rowData, rowIdx) =>
          rowData.map((colData, colIdx) =>
            colData ? (
              <FlexableNote
                key={`${rowIdx}${colIdx}`}
                layerType={layerType}
                coord={{ x: colIdx, y: rowIdx }}
                length={colData}
                noteWidth={colWidth}
              />
            ) : null
          )
        )}
      </g>
    </S.EditorBlock>
  );
}

interface LabelProps {
  note: string;
  height: number;
  index: number;
}

const Label = ({ note, height, index }: LabelProps) => {
  const FONT_SIZE = 12;

  return (
    <svg width="100%" height={height} x={0} y={height * index}>
      <rect
        width="100%"
        height={height - BORDER_WIDTH}
        fill="#00ad82"
        x={0}
        y={BORDER_WIDTH}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="white"
        fontSize={FONT_SIZE}
        style={{ transform: `translateY(${BORDER_WIDTH}px)` }}
      >
        {note}
      </text>
    </svg>
  );
};
