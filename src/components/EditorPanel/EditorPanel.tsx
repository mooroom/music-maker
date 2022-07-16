import * as S from "./styles";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { unSelectLayer } from "../../store/layers";

export default function EditorPanel() {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: RootState) => state.layers);

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.TrackNameHeader>
          <IoClose onClick={() => dispatch(unSelectLayer())} />
          {selectedLayer && <span>악기 {selectedLayer.id + 1}</span>}
        </S.TrackNameHeader>
      </S.PanelHeader>
      <S.PanelTrack></S.PanelTrack>
    </S.PanelContainer>
  );
}
