import { NOTE_HEIGHT, BORDER_WIDTH, GRID_COLOR } from "../../constants/grid";
import { LayerTypeName } from "../../store/layers/types";

interface Props {
  layerType: LayerTypeName;
  coord: {
    x: number;
    y: number;
  };
  length: number;
  noteWidth: number;
}

export default function FlexableNote({
  layerType,
  coord,
  length,
  noteWidth,
}: Props) {
  const xPos = noteWidth * coord.x + 60;
  const yPos = NOTE_HEIGHT[layerType] * coord.y;

  return (
    <svg x={xPos} y={yPos}>
      <rect
        x={BORDER_WIDTH}
        y={BORDER_WIDTH}
        width={noteWidth * length - BORDER_WIDTH}
        height={NOTE_HEIGHT[layerType] - BORDER_WIDTH}
        fill={GRID_COLOR[layerType].note}
      />
    </svg>
  );
}
