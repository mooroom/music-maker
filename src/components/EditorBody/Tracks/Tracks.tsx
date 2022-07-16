import { useDispatch, useSelector } from "react-redux";
import { editor_ruler_text } from "../../../constants/color";
import { RootState } from "../../../store";
import { selectLayer } from "../../../store/layers";
import Ruler from "../Ruler";
import * as S from "./styles";

export default function Tracks() {
  const dispatch = useDispatch();
  const { layers, selectedLayer } = useSelector(
    (state: RootState) => state.layers
  );

  return (
    <S.TracksContainer>
      <Ruler />
      <S.BlockTracks>
        <S.EditorGrid tracksCount={layers.length}>
          <defs>
            <pattern
              id="editor-grid-pattern"
              x={0}
              y={0}
              width={80}
              height={3000}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={0.5} height={3000} fill="#DBDBDB" />
            </pattern>
          </defs>
          <rect
            fill="url(#editor-grid-pattern)"
            x={0}
            y={0}
            width="100%"
            height="100%"
          />
        </S.EditorGrid>
        {layers.map((layer) => (
          <S.BlockTrack
            selected={layer.id === selectedLayer?.id}
            onClick={() => dispatch(selectLayer(layer.id))}
          ></S.BlockTrack>
        ))}
      </S.BlockTracks>
    </S.TracksContainer>
  );
}
