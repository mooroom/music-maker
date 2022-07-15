import * as S from "./styles";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function EditorPanel() {
  const { selectedLayer } = useSelector((state: RootState) => state.layers);

  return (
    <S.PanelContainer>
      <S.PanelHeader>
        <S.TrackNameHeader>
          <IoClose />
          {selectedLayer && <span>악기 {selectedLayer.id + 1}</span>}
        </S.TrackNameHeader>
      </S.PanelHeader>
      <S.PanelTrack></S.PanelTrack>
    </S.PanelContainer>
  );
}
