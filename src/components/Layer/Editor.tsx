import * as S from "./styles";
import FlexableNote from "./FlexableNote";
import {
  BORDER_WIDTH,
  COLS,
  ROWS,
  NOTE_HEIGHT,
  NOTES_C_MAJOR,
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
        {NOTES_C_MAJOR.map((note, i) => (
          <Label note={note} height={NOTE_HEIGHT[layerType]} index={i} />
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
  return (
    <svg key={note} width="100%" height={height} x={0} y={height * index}>
      <rect
        width="100%"
        height={height - BORDER_WIDTH}
        fill="#00ad82"
        x={0}
        y={BORDER_WIDTH}
      />
      <text x={30} y={20} fontSize={12} textAnchor="middle" fill="white">
        {note}
      </text>
    </svg>
  );
};
