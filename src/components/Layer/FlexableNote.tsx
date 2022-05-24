import { NOTE_HEIGHT, BORDER_WIDTH } from "../../constants/grid";

interface Props {
  coord: {
    x: number;
    y: number;
  };
  length: number;
  noteWidth: number;
}

export default function FlexableNote({ coord, length, noteWidth }: Props) {
  const xPos = noteWidth * coord.x + 60;
  const yPos = NOTE_HEIGHT * coord.y;

  return (
    <svg x={xPos} y={yPos}>
      <rect
        x={BORDER_WIDTH}
        y={BORDER_WIDTH}
        width={noteWidth * length - BORDER_WIDTH}
        height={NOTE_HEIGHT - BORDER_WIDTH}
        fill="#02f5b8"
      />
    </svg>
  );
}
