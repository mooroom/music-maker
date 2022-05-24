import * as S from "./styles";
import FlexableNote from "./FlexableNote";
import {
  BORDER_WIDTH,
  COLS,
  ROWS,
  NOTE_HEIGHT,
  NOTES_C_MAJOR,
  LABEL_WIDTH,
} from "../../constants/grid";

interface Props {
  colWidth: number;
  sequence: number[][];
}

const gridYLines = Array.from({ length: ROWS + 1 }, (_, i) => NOTE_HEIGHT * i);

export default function Editor({ colWidth, sequence }: Props) {
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
            fill="#eee"
            width="100%"
            height={BORDER_WIDTH}
            x={0}
            y={v}
          />
        ))}
        {gridXLines.map((v, i) => (
          <rect
            key={v + i}
            fill="#eee"
            width={BORDER_WIDTH}
            height="100%"
            x={v}
            y={0}
          />
        ))}
      </S.GridContainer>
      <S.LabelContainer width={60} height={452}>
        {NOTES_C_MAJOR.map((note, i) => (
          <svg width="100%" height={30} x={0} y={30 * i}>
            <rect width="100%" height={28} fill="#00ad82" x={0} y={2} />
            <text x={30} y={20} fontSize={12} textAnchor="middle" fill="white">
              {note}
            </text>
          </svg>
        ))}
      </S.LabelContainer>
      <g>
        {sequence.map((rowData, rowIdx) =>
          rowData.map((colData, colIdx) =>
            colData ? (
              <FlexableNote
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
  );
}
